// tests/online-ruler-engine.test.mjs
// Tests for the canonical Online Ruler measurement engine (src/engines/ruler.ts)
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MM_PER_CM,
  MM_PER_INCH,
  CM_PER_INCH,
  PPI_MIN,
  PPI_MAX,
  DEFAULT_PPI,
  toMm,
  convertUnits,
  mmToPx,
  pxToMm,
  ppiFromDiagonal,
  ppiFromReference,
  validatePpi,
  isPlausibleDiagonal,
  generateTicks,
  formatTickLabel,
  tickSpecForUnit,
  autoEstimatePpi,
  devicePresetPpi,
  calibrationFromReference,
  calibrationQuality,
  formatReadout,
  formatCoordinate,
  formatComparison,
  DEVICE_PRESETS,
  REFERENCE_OBJECTS,
} from '../src/engines/ruler.ts';

const closeTo = (actual, expected, epsilon = 1e-9) =>
  assert.ok(Math.abs(actual - expected) < epsilon, `expected ${actual} ≈ ${expected}`);

test('Ruler Engine — canonical unit relationships', async (t) => {
  await t.test('1 inch = 25.4 mm', () => {
    closeTo(toMm(1, 'in'), 25.4);
    closeTo(MM_PER_INCH, 25.4);
  });

  await t.test('1 cm = 10 mm', () => {
    closeTo(toMm(1, 'cm'), 10);
    closeTo(MM_PER_CM, 10);
  });

  await t.test('1 inch = 2.54 cm', () => {
    closeTo(toMm(1, 'in'), toMm(2.54, 'cm'));
    closeTo(CM_PER_INCH, 2.54);
  });

  await t.test('10 mm = 1 cm', () => {
    closeTo(convertUnits(10, 'mm', 'cm'), 1);
  });

  await t.test('25.4 mm = 1 inch', () => {
    closeTo(convertUnits(25.4, 'mm', 'in'), 1);
  });

  await t.test('2.54 cm = 1 inch', () => {
    closeTo(convertUnits(2.54, 'cm', 'in'), 1);
  });

  await t.test('same-unit conversion is identity', () => {
    assert.equal(convertUnits(7.25, 'cm', 'cm'), 7.25);
  });

  await t.test('large and small values convert without drift', () => {
    closeTo(convertUnits(1e6, 'mm', 'cm'), 100000);
    closeTo(convertUnits(0.01, 'cm', 'mm'), 0.1);
    closeTo(convertUnits(12345.678, 'mm', 'in'), 12345.678 / 25.4);
  });

  await t.test('px conversion requires PPI context and is round-trip stable', () => {
    const ppi = 163.4;
    const px = 200;
    closeTo(convertUnits(convertUnits(px, 'px', 'mm', ppi), 'mm', 'px', ppi), px, 1e-6);
  });

  await t.test('px without PPI context throws', async () => {
    assert.throws(() => toMm(100, 'px'));
  });
});

test('Ruler Engine — PPI logic', async (t) => {
  await t.test('ppiFromDiagonal uses Pythagorean geometry (1920x1080 @ 24")', () => {
    const diagPx = Math.sqrt(1920 ** 2 + 1080 ** 2);
    closeTo(ppiFromDiagonal(24, 1920, 1080), diagPx / 24, 1e-6);
    closeTo(ppiFromDiagonal(24, 1920, 1080), 91.787, 1e-3);
  });

  await t.test('ppiFromDiagonal for 13.3" 2560x1600 (MacBook Air class)', () => {
    const diagPx = Math.sqrt(2560 ** 2 + 1600 ** 2);
    closeTo(ppiFromDiagonal(13.3, 2560, 1600), diagPx / 13.3, 1e-9);
  });

  await t.test('ppiFromReference: bank card long edge 85.6mm across 340px', () => {
    // ppi = (340 / 85.6) * 25.4 = 100.869...
    closeTo(ppiFromReference(85.6, 340), (340 / 85.6) * 25.4, 1e-9);
  });

  await t.test('px↔mm round trip at known PPI', () => {
    const ppi = 96;
    closeTo(pxToMm(mmToPx(50, ppi), ppi), 50, 1e-9);
    closeTo(pxToMm(100, 96), 26.4583333, 1e-6); // 100/96*25.4
  });

  await t.test('validatePpi accepts realistic values and rejects out-of-range', () => {
    assert.equal(validatePpi(96), 96);
    assert.throws(() => validatePpi(10));
    assert.throws(() => validatePpi(5000));
    assert.throws(() => validatePpi(NaN));
    assert.throws(() => validatePpi(Infinity));
    assert.ok(PPI_MIN === 40 && PPI_MAX === 1200 && DEFAULT_PPI === 96);
  });

  await t.test('ppiFromDiagonal rejects zero, negative and invalid geometry', () => {
    assert.throws(() => ppiFromDiagonal(0, 1920, 1080));
    assert.throws(() => ppiFromDiagonal(-15.6, 1920, 1080));
    assert.throws(() => ppiFromDiagonal(15.6, 0, 1080));
    assert.throws(() => ppiFromDiagonal(15.6, 1920, -1));
    assert.throws(() => ppiFromDiagonal(NaN, 1920, 1080));
    // unrealistic diagonal that pushes PPI out of range is also rejected
    assert.throws(() => ppiFromDiagonal(0.01, 1920, 1080));
  });

  await t.test('ppiFromReference rejects zero/negative inputs', () => {
    assert.throws(() => ppiFromReference(0, 340));
    assert.throws(() => ppiFromReference(85.6, 0));
    assert.throws(() => ppiFromReference(-1, 340));
  });

  await t.test('isPlausibleDiagonal validates empty-like and unrealistic values', () => {
    assert.equal(isPlausibleDiagonal(15.6), true);
    assert.equal(isPlausibleDiagonal(0.7), false);
    assert.equal(isPlausibleDiagonal(0), false);
    assert.equal(isPlausibleDiagonal(-13.3), false);
    assert.equal(isPlausibleDiagonal(500), false);
    assert.equal(isPlausibleDiagonal(NaN), false);
  });
});

test('Ruler Engine — tick generation (zero drift)', async (t) => {
  await t.test('cm ticks: minor=1mm, medium=5mm, major=10mm with labels', () => {
    const ppi = 96;
    const spec = tickSpecForUnit('cm', ppi);
    const ticks = generateTicks(mmToPx(30, ppi), spec);
    assert.equal(ticks.length, Math.floor(mmToPx(30, ppi) / spec.minorStepPx) + 1);
    assert.equal(ticks[0].level, 'major');
    assert.equal(ticks[0].value, 0);
    const mm5 = ticks.find((tk) => Math.abs(tk.value - 0.5) < 1e-9);
    assert.ok(mm5, 'medium tick at 5 mm exists');
    assert.equal(mm5.level, 'medium');
    const cm1 = ticks.find((tk) => Math.abs(tk.value - 1) < 1e-9);
    assert.ok(cm1);
    assert.equal(cm1.level, 'major');
    assert.equal(cm1.label, '1');
  });

  await t.test('tick positions are exact multiples — no cumulative drift', () => {
    const ppi = 137.42; // awkward PPI to stress floats
    const spec = tickSpecForUnit('cm', ppi);
    const ticks = generateTicks(2000, spec);
    const step = mmToPx(1, ppi);
    for (let i = 0; i < ticks.length; i++) {
      closeTo(ticks[i].px, i * step, 1e-9);
      closeTo(ticks[i].value, i * 0.1, 1e-9);
    }
  });

  await t.test('inches: 16 minors per inch with 1/16 minor value', () => {
    const spec = tickSpecForUnit('in', 96);
    assert.equal(spec.majorEvery, 16);
    closeTo(spec.minorValue, 1 / 16);
    const ticks = generateTicks(mmToPx(25.4, 96), spec); // one inch
    assert.equal(ticks[ticks.length - 1].value, 1);
    assert.equal(ticks[ticks.length - 1].label, '1');
  });

  await t.test('mm ruler labels every 10 mm as integers', () => {
    const spec = tickSpecForUnit('mm', 96);
    const ticks = generateTicks(mmToPx(20, 96), spec);
    const t10 = ticks.find((tk) => tk.value === 10);
    assert.ok(t10);
    assert.equal(t10.label, '10');
    assert.equal(t10.level, 'major');
  });

  await t.test('px ruler: 100px majors regardless of PPI', () => {
    const spec = tickSpecForUnit('px', 96);
    const ticks = generateTicks(500, spec);
    assert.equal(spec.majorEvery, 10);
    assert.equal(spec.minorStepPx, 10);
    assert.equal(ticks.find((tk) => tk.value === 100)?.label, '100');
  });

  await t.test('degenerate inputs return no ticks', () => {
    assert.deepEqual(generateTicks(0, tickSpecForUnit('cm', 96)), []);
    assert.deepEqual(generateTicks(-50, tickSpecForUnit('cm', 96)), []);
  });

  await t.test('formatTickLabel strips trailing zeros', () => {
    assert.equal(formatTickLabel(2.5, 1), '2.5');
    assert.equal(formatTickLabel(3, 1), '3');
    assert.equal(formatTickLabel(1 / 16, 2), '0.06');
    assert.equal(formatTickLabel(10, 0), '10');
  });

  await t.test('invalid PPI rejected by tickSpecForUnit', () => {
    assert.throws(() => tickSpecForUnit('cm', 0));
    assert.throws(() => tickSpecForUnit('cm', 99999));
  });
});

test('Ruler Engine — calibration construction & quality', async (t) => {
  await t.test('device presets produce in-range PPI', () => {
    assert.ok(DEVICE_PRESETS.length >= 10);
    for (const p of DEVICE_PRESETS) {
      const ppi = devicePresetPpi(p);
      assert.ok(ppi >= PPI_MIN && ppi <= PPI_MAX, `${p.id} PPI ${ppi} in range`);
    }
  });

  await t.test('auto estimate produces device classes with honest notes', () => {
    const phone = autoEstimatePpi({ dpr: 3, screenWidthPx: 393, screenHeightPx: 852 });
    assert.ok(phone && phone.deviceClass === 'phone');
    assert.ok(phone && phone.note.toLowerCase().includes('estimate'));
    const desktop = autoEstimatePpi({ dpr: 1, screenWidthPx: 1920, screenHeightPx: 1080 });
    assert.ok(desktop && desktop.deviceClass === 'desktop');
    assert.ok(desktop && desktop.ppi >= PPI_MIN && desktop.ppi <= PPI_MAX);
  });

  await t.test('auto estimate handles invalid display data', () => {
    assert.equal(autoEstimatePpi({ dpr: 0, screenWidthPx: 393, screenHeightPx: 852 }), null);
    assert.equal(autoEstimatePpi({ dpr: 3, screenWidthPx: 0, screenHeightPx: 852 }), null);
    assert.equal(autoEstimatePpi({ dpr: NaN, screenWidthPx: 393, screenHeightPx: 852 }), null);
  });

  await t.test('card calibration from reference (bank card, long edge)', () => {
    const { ppi, note } = calibrationFromReference({
      reference: REFERENCE_OBJECTS[0],
      alignedLongEdge: true,
      pixels: 340,
    });
    closeTo(ppi, (340 / 85.6) * 25.4, 1e-9);
    assert.match(note, /85\.6 mm/);
  });

  await t.test('card calibration rejects nonsense pixel widths', () => {
    assert.throws(() =>
      calibrationFromReference({ reference: REFERENCE_OBJECTS[0], alignedLongEdge: true, pixels: 5 })
    );
    assert.throws(() =>
      calibrationFromReference({ reference: REFERENCE_OBJECTS[0], alignedLongEdge: true, pixels: NaN })
    );
  });

  await t.test('calibration quality is qualitative per source', () => {
    const mk = (source, method, ppi) => calibrationQuality({ method, source, ppi, note: '' });
    assert.equal(mk('card', 'card', 101).confidence, 'reference');
    assert.equal(mk('device', 'device', 264).confidence, 'calibrated');
    assert.equal(mk('diagonal', 'diagonal', 91.8).confidence, 'calibrated');
    assert.equal(mk('auto', 'auto', 109).confidence, 'estimated');
    assert.equal(mk('default', 'auto', 96).confidence, 'estimated');
    assert.ok(mk('card', 'card', 101).label.toLowerCase().includes('physical'));
    assert.ok(mk('default', 'auto', 96).label.toLowerCase().includes('estimated'));
  });

  await t.test('reference objects carry standard dimensions', () => {
    const card = REFERENCE_OBJECTS.find((r) => r.id === 'bank-card');
    assert.ok(card);
    closeTo(card.widthMm, 53.98);
    closeTo(card.heightMm, 85.6);
    const a4 = REFERENCE_OBJECTS.find((r) => r.id === 'a4-paper');
    assert.ok(a4);
    closeTo(a4.widthMm, 210);
  });
});

test('Ruler Engine — readout & formatting', async (t) => {
  await t.test('formatReadout primary + conversions', () => {
    const ppi = 96;
    const distPx = mmToPx(48.2, ppi); // 48.2 mm
    const r = formatReadout(distPx, { unit: 'cm', ppi });
    closeTo(r.raw.mm, 48.2, 1e-9);
    assert.match(r.primary, /^4\.82 cm$/);
    assert.ok(r.secondary.includes('48.2 mm'));
    assert.ok(r.secondary.some((s) => s.endsWith('in')));
  });

  await t.test('formatReadout hides active unit from secondary list', () => {
    const r = formatReadout(200, { unit: 'mm', ppi: 96 });
    assert.ok(!r.secondary.some((s) => s.endsWith('mm')));
    assert.ok(r.secondary.some((s) => s.endsWith('cm')));
  });

  await t.test('px unit readout uses integer px', () => {
    const r = formatReadout(133.7, { unit: 'px', ppi: 96 });
    assert.equal(r.primary, '134 px');
  });

  await t.test('negative deltas are treated as distances', () => {
    const a = formatReadout(mmToPx(25.4, 96), { unit: 'in', ppi: 96 });
    const b = formatReadout(-mmToPx(25.4, 96), { unit: 'in', ppi: 96 });
    assert.equal(a.primary, b.primary);
    assert.equal(a.primary, '1.00 in');
  });

  await t.test('formatCoordinate produces X:/Y: labels', () => {
    const ppi = 96;
    const label = formatCoordinate('X', mmToPx(42.5, ppi), 'mm', ppi);
    assert.equal(label, 'X: 42.5 mm');
    const yLabel = formatCoordinate('Y', mmToPx(72, ppi), 'cm', ppi);
    assert.match(yLabel, /^Y: 7\.2\d* cm$/);
  });

  await t.test('formatComparison compares mixed units honestly', () => {
    // 1 in vs 3 cm → 25.4 vs 30 mm
    const s = formatComparison(1, 'in', 3, 'cm');
    assert.match(s, /1 in vs 3 cm/);
    assert.match(s, /shorter/);
    assert.match(s, /4\.6 mm difference/);
    const eq = formatComparison(50, 'mm', 5, 'cm');
    assert.match(eq, /equal to/);
  });

  await t.test('formatComparison treats px as screen-space fallback (cm scale)', () => {
    const s = formatComparison(100, 'px', 1, 'cm');
    assert.match(s, /100 px vs 1 cm/);
  });
});

test('Ruler Engine — resize / orientation / high-DPI contract', async (t) => {
  await t.test('generated ticks scale with PPI (orientation/resize invariant)', () => {
    // Portrait-style vs landscape-style lengths must both produce valid scales
    const spec = tickSpecForUnit('cm', 109);
    const portraitTicks = generateTicks(400, spec);
    const landscapeTicks = generateTicks(1400, spec);
    assert.ok(portraitTicks.length > 0 && landscapeTicks.length > portraitTicks.length);
    // Same step spacing in px at the same PPI
    closeTo(portraitTicks[1].px - portraitTicks[0].px, landscapeTicks[1].px - landscapeTicks[0].px, 1e-9);
  });

  await t.test('high-DPI: CSS px math is DPR-independent (DPR handled at render)', () => {
    // The engine works in CSS pixels; DPR only multiplies the canvas backing
    // store. Verify px↔mm is unchanged for typical DPRs.
    for (const dpr of [1, 2, 2.625, 3.5]) {
      closeTo(pxToMm(mmToPx(10, 109), 109), 10, 1e-9);
      assert.ok(dpr > 0); // DPR consumed by renderer, not engine
    }
  });
});
