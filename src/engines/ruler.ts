// src/engines/ruler.ts
//
// The ONE authoritative measurement engine for the Free Accurate Calculator
// Online Ruler (/ruler/).
//
// Every unit conversion, PPI calibration, tick generation, and readout
// formatting decision flows through this module. UI components (toolbar,
// ruler canvas, calibration dialog, guides, crosshair, measurement overlay)
// must consume the engine — never duplicate its math.
//
// Design rules:
//   * Millimeter is the canonical internal unit. 1 inch = 25.4 mm exactly.
//   * PPI (pixels per inch) is the single bridge between CSS pixels and
//     physical distance: mm = px / ppi * 25.4.
//   * Tick generation is deterministic and drift-free: ticks are derived from
//     integer step indices (never accumulated floating-point addition), so the
//     ruler renders identically after resize, rotation, or zoom changes.
//   * No browser/DOM access lives in this file — it is pure and unit-testable
//     in Node.

/** Exact physical constants — the ONLY place these appear in the codebase. */
export const MM_PER_INCH = 25.4;
export const MM_PER_CM = 10;
export const CM_PER_INCH = MM_PER_INCH / MM_PER_CM; // 2.54

export type RulerUnit = 'cm' | 'mm' | 'in' | 'px';

export const RULER_UNITS: readonly RulerUnit[] = ['cm', 'mm', 'in', 'px'];

export type CalibrationMethod = 'auto' | 'device' | 'diagonal' | 'card' | 'object';
export type CalibrationSource = 'auto' | 'device' | 'diagonal' | 'card' | 'object' | 'default';

/** Qualitative confidence labels — never fabricate fake numeric accuracy percentages. */
export type CalibrationConfidence = 'estimated' | 'calibrated' | 'reference';

export interface CalibrationState {
  method: CalibrationMethod;
  source: CalibrationSource;
  /** CSS pixels per physical inch. The single bridge value. */
  ppi: number;
  /** Human-readable note shown in the calibration status UI. */
  note: string;
}

/** Qualitative status descriptor for the calibration indicator. */
export interface CalibrationQuality {
  confidence: CalibrationConfidence;
  label: string;
  explanation: string;
}

/** Device presets — a small, responsibly maintainable catalog. */
export interface DevicePreset {
  id: string;
  label: string;
  /** Diagonal in inches. */
  diagonalIn: number;
  /** Native resolution in CSS pixels (portrait orientation). */
  widthPx: number;
  heightPx: number;
}

/**
 * Curated device presets (portrait CSS pixel geometry + physical diagonal).
 *
 * Every entry records the device's CSS-pixel viewport (width × height as the
 * browser reports them) and its true panel diagonal in inches. `widthPx` and
 * `heightPx` are CSS pixels, NOT raw hardware pixels — a preset is a fast,
 * model-aware starting point, but panel variance means a physical card
 * (ISO 85.60 × 53.98 mm) or the screen diagonal remains the most trustworthy
 * calibration. PPI is derived on demand via `devicePresetPpi()`.
 */
export const DEVICE_PRESETS: readonly DevicePreset[] = [
  // ---- Flagship Phones ---------------------------------------------------
  { id: 'iphone-16-pro-max', label: 'iPhone 16 Pro Max (6.9″, 430×932 pt)', diagonalIn: 6.9, widthPx: 430, heightPx: 932 },
  { id: 'iphone-16-pro', label: 'iPhone 16 Pro (6.3″, 393×852 pt)', diagonalIn: 6.3, widthPx: 393, heightPx: 852 },
  { id: 'iphone-16', label: 'iPhone 16 / 15 / 14 / 13 (6.1″, 390×844 pt)', diagonalIn: 6.1, widthPx: 390, heightPx: 844 },
  { id: 'iphone-15-pro-max', label: 'iPhone 15 Plus / Pro Max (6.7″, 430×932 pt)', diagonalIn: 6.7, widthPx: 430, heightPx: 932 },
  { id: 'iphone-se-3', label: 'iPhone SE 3 (4.7″, 375×667 pt)', diagonalIn: 4.7, widthPx: 375, heightPx: 667 },
  { id: 'galaxy-s24-ultra', label: 'Samsung Galaxy S24 Ultra (6.8″, 384×824 dp)', diagonalIn: 6.8, widthPx: 384, heightPx: 824 },
  { id: 'galaxy-s24', label: 'Samsung Galaxy S24 (6.2″, 360×780 dp)', diagonalIn: 6.2, widthPx: 360, heightPx: 780 },
  { id: 'galaxy-z-fold-5', label: 'Samsung Galaxy Z Fold 5 / 6 (7.6″, 690×829 dp)', diagonalIn: 7.6, widthPx: 690, heightPx: 829 },
  { id: 'pixel-9-pro-xl', label: 'Google Pixel 9 Pro XL (6.8″, 448×998 dp)', diagonalIn: 6.8, widthPx: 448, heightPx: 998 },
  { id: 'pixel-9', label: 'Google Pixel 9 / 8 (6.2″, 412×915 dp)', diagonalIn: 6.2, widthPx: 412, heightPx: 915 },
  // ---- Tablets ----------------------------------------------------------
  { id: 'ipad-pro-m4-13', label: 'iPad Pro 13″ M4 (1032×1376 pt)', diagonalIn: 13.0, widthPx: 1032, heightPx: 1376 },
  { id: 'ipad-pro-m4-11', label: 'iPad Pro 11″ M4 (834×1210 pt)', diagonalIn: 11.1, widthPx: 834, heightPx: 1210 },
  { id: 'ipad-air', label: 'iPad Air 11″ (820×1180 pt)', diagonalIn: 10.9, widthPx: 820, heightPx: 1180 },
  { id: 'ipad-mini', label: 'iPad mini 6 (8.3″, 744×1133 pt)', diagonalIn: 8.3, widthPx: 744, heightPx: 1133 },
  // ---- Laptops ----------------------------------------------------------
  { id: 'macbook-pro-16', label: 'MacBook Pro 16″ (1728×1117 pt)', diagonalIn: 16.2, widthPx: 1728, heightPx: 1117 },
  { id: 'macbook-pro-14', label: 'MacBook Pro 14″ (1512×982 pt)', diagonalIn: 14.2, widthPx: 1512, heightPx: 982 },
  { id: 'macbook-air-15', label: 'MacBook Air 15″ (1440×932 pt)', diagonalIn: 15.3, widthPx: 1440, heightPx: 932 },
  { id: 'macbook-air-13', label: 'MacBook Air 13″ (1280×832 pt)', diagonalIn: 13.6, widthPx: 1280, heightPx: 832 },
  { id: 'win-laptop-14', label: 'Windows laptop 14″ FHD (1250×810, 125%)', diagonalIn: 14.0, widthPx: 1250, heightPx: 810 },
  { id: 'win-laptop-15', label: 'Windows laptop 15.6″ FHD (1366×768, 100%)', diagonalIn: 15.6, widthPx: 1366, heightPx: 768 },
  // ---- Monitors ---------------------------------------------------------
  { id: 'monitor-24-fhd', label: 'Monitor 24″ FHD (1920×1080)', diagonalIn: 24, widthPx: 1920, heightPx: 1080 },
  { id: 'monitor-27-qhd', label: 'Monitor 27″ QHD (2560×1440)', diagonalIn: 27, widthPx: 2560, heightPx: 1440 },
  { id: 'monitor-27-4k', label: 'Monitor 27″ 4K UHD (3840×2160)', diagonalIn: 27, widthPx: 3840, heightPx: 2160 },
  { id: 'monitor-32-4k', label: 'Monitor 32″ 4K UHD (3840×2160)', diagonalIn: 32, widthPx: 3840, heightPx: 2160 },
];

/** Converts decimal inches to a clean fraction string, e.g. 2.625 -> "2 5/8″" */
export function toFractionalInch(inches: number, maxDenominator: number = 16): string {
  if (!isFinite(inches) || inches < 0) return '0″';
  const whole = Math.floor(inches);
  const remainder = inches - whole;
  if (remainder < 1 / (maxDenominator * 2)) {
    return `${whole}″`;
  }
  const fractionNum = Math.round(remainder * maxDenominator);
  if (fractionNum === maxDenominator) {
    return `${whole + 1}″`;
  }
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(fractionNum, maxDenominator);
  const num = fractionNum / divisor;
  const den = maxDenominator / divisor;
  return whole > 0 ? `${whole} ${num}/${den}″` : `${num}/${den}″`;
}

/** Standard physical reference objects (ISO 216 / ANSI / ISO/IEC 7810 ID-1). */
export interface ReferenceObject {
  id: string;
  label: string;
  /** Short axis in mm. */
  widthMm: number;
  /** Long axis in mm. */
  heightMm: number;
}

export const REFERENCE_OBJECTS: readonly ReferenceObject[] = [
  { id: 'bank-card', label: 'Bank / credit card (ISO ID-1)', widthMm: 53.98, heightMm: 85.6 },
  { id: 'id-card', label: 'ID card (ISO ID-1 — same as bank card)', widthMm: 53.98, heightMm: 85.6 },
  { id: 'a4-paper', label: 'A4 paper (short edge 210 mm)', widthMm: 210, heightMm: 297 },
  { id: 'us-letter', label: 'US Letter paper (short edge 215.9 mm)', widthMm: 215.9, heightMm: 279.4 },
  { id: 'coin-quarter', label: 'US quarter coin (24.26 mm)', widthMm: 24.26, heightMm: 24.26 },
  { id: 'coin-euro', label: '€1 coin (23.25 mm)', widthMm: 23.25, heightMm: 23.25 },
];

/** Sensible PPI range used for validation of user/auto inputs. */
export const PPI_MIN = 40;
export const PPI_MAX = 1200;
export const DEFAULT_PPI = 96;

// ---------------------------------------------------------------------------
// Pure math helpers
// ---------------------------------------------------------------------------

/** Convert a distance in one unit to millimeters (canonical internal unit). */
export function toMm(value: number, unit: RulerUnit): number {
  switch (unit) {
    case 'mm':
      return value;
    case 'cm':
      return value * MM_PER_CM;
    case 'in':
      return value * MM_PER_INCH;
    case 'px':
      throw new Error('px is a screen-space unit — use pxToMm/ppi-aware helpers instead');
    default:
      throw new Error(`Unknown unit: ${unit as string}`);
  }
}

/** Convert millimeters to a target display unit. */
export function fromMm(mm: number, unit: RulerUnit, ppi: number = DEFAULT_PPI): number {
  switch (unit) {
    case 'mm':
      return mm;
    case 'cm':
      return mm / MM_PER_CM;
    case 'in':
      return mm / MM_PER_INCH;
    case 'px':
      return mmToPx(mm, ppi);
    default:
      throw new Error(`Unknown unit: ${unit as string}`);
  }
}

/** Cross-unit conversion (mm/cm/in only — px needs a PPI context). */
export function convertUnits(value: number, from: RulerUnit, to: RulerUnit, ppi: number = DEFAULT_PPI): number {
  if (from === to) return value;
  if (from === 'px' || to === 'px') {
    const mm = from === 'px' ? pxToMm(value, ppi) : toMm(value, from);
    return fromMm(mm, to, ppi);
  }
  return fromMm(toMm(value, from), to);
}

/** Physical distance (mm) → screen distance (CSS px) at a given PPI. */
export function mmToPx(mm: number, ppi: number): number {
  return (mm / MM_PER_INCH) * ppi;
}

/** Screen distance (CSS px) → physical distance (mm) at a given PPI. */
export function pxToMm(px: number, ppi: number): number {
  return (px / ppi) * MM_PER_INCH;
}

/**
 * Derive PPI from a screen's physical diagonal (inches) and CSS pixel
 * resolution using the Pythagorean theorem. Mathematically valid geometry:
 *   diagonalPx = sqrt(widthPx² + heightPx²)
 *   ppi        = diagonalPx / diagonalIn
 */
export function ppiFromDiagonal(diagonalIn: number, widthPx: number, heightPx: number): number {
  if (!isFinite(diagonalIn) || diagonalIn <= 0) throw new RangeError('Diagonal must be a positive number of inches');
  if (!isFinite(widthPx) || widthPx <= 0) throw new RangeError('Width must be a positive number of pixels');
  if (!isFinite(heightPx) || heightPx <= 0) throw new RangeError('Height must be a positive number of pixels');
  const diagonalPx = Math.sqrt(widthPx * widthPx + heightPx * heightPx);
  const ppi = diagonalPx / diagonalIn;
  validatePpi(ppi);
  return ppi;
}

/** Derive PPI from a physical reference: `referenceMm` spans `pixels` CSS px. */
export function ppiFromReference(referenceMm: number, pixels: number): number {
  if (!isFinite(referenceMm) || referenceMm <= 0) throw new RangeError('Reference length must be positive');
  if (!isFinite(pixels) || pixels <= 0) throw new RangeError('Pixel length must be positive');
  const ppi = (pixels / referenceMm) * MM_PER_INCH;
  validatePpi(ppi);
  return ppi;
}

/** Validate a PPI value against the realistic physical range. Throws RangeError. */
export function validatePpi(ppi: number): number {
  if (!isFinite(ppi)) throw new RangeError('PPI must be a finite number');
  if (ppi < PPI_MIN || ppi > PPI_MAX) {
    throw new RangeError(`PPI ${Math.round(ppi)} is outside the realistic range ${PPI_MIN}–${PPI_MAX}`);
  }
  return ppi;
}

/** True when a diagonal entry is a plausible screen size in inches (1–200). */
export function isPlausibleDiagonal(diagonalIn: number): boolean {
  return isFinite(diagonalIn) && diagonalIn > 1 && diagonalIn <= 200;
}

// ---------------------------------------------------------------------------
// Tick generation — deterministic, zero-drift
// ---------------------------------------------------------------------------

export interface TickSpec {
  /** Pixels between minor ticks at the current scale. */
  minorStepPx: number;
  /** How many minor steps per medium tick (e.g. 5 for mm/cm rulers). */
  mediumEvery: number;
  /** How many minor steps per major, labeled tick (e.g. 10). */
  majorEvery: number;
  /** Value (in display unit) of one minor step. */
  minorValue: number;
  /** Decimals used for major tick labels. */
  labelDecimals: number;
  /** Ruler runs horizontally (left→right) or vertically (top→bottom). */
  vertical: boolean;
}

export interface GeneratedTick {
  /** Pixel offset along the ruler edge, starting at 0. */
  px: number;
  /** Value in the active display unit. */
  value: number;
  level: 'minor' | 'medium' | 'major';
  label: string | null;
}

/**
 * Generate ticks for a ruler of `lengthPx` CSS pixels. Tick positions come
 * from `i * stepPx` (integer index × step), never from accumulation, so
 * floating-point drift cannot smear the scale across the ruler.
 */
export function generateTicks(lengthPx: number, spec: TickSpec): GeneratedTick[] {
  if (!isFinite(lengthPx) || lengthPx <= 0 || !isFinite(spec.minorStepPx) || spec.minorStepPx <= 0) {
    return [];
  }
  const ticks: GeneratedTick[] = [];
  const count = Math.floor(lengthPx / spec.minorStepPx);
  for (let i = 0; i <= count; i++) {
    const px = i * spec.minorStepPx;
    const value = i * spec.minorValue;
    const isMajor = i % spec.majorEvery === 0;
    const isMedium = !isMajor && i % spec.mediumEvery === 0;
    ticks.push({
      px,
      value,
      level: isMajor ? 'major' : isMedium ? 'medium' : 'minor',
      label: isMajor ? formatTickLabel(value, spec.labelDecimals) : null,
    });
  }
  return ticks;
}

/** Number → clean label (strips trailing zeros; e.g. 2.50 → "2.5", 3.00 → "3"). */
export function formatTickLabel(value: number, decimals: number): string {
  const fixed = value.toFixed(decimals);
  return fixed.includes('.') ? fixed.replace(/\.?0+$/, '') : fixed;
}

/** Choose tick geometry for a physical unit at the current PPI. */
export function tickSpecForUnit(unit: RulerUnit, ppi: number): TickSpec {
  validatePpi(ppi);
  switch (unit) {
    case 'cm':
      // 1 mm minor, 5 mm medium, 1 cm major.
      return {
        minorStepPx: mmToPx(1, ppi),
        mediumEvery: 5,
        majorEvery: 10,
        minorValue: 0.1,
        labelDecimals: 1,
        vertical: false,
      };
    case 'mm':
      // 1 mm minor, 5 mm medium, 10 mm major.
      return {
        minorStepPx: mmToPx(1, ppi),
        mediumEvery: 5,
        majorEvery: 10,
        minorValue: 1,
        labelDecimals: 0,
        vertical: false,
      };
    case 'in': {
      // 1/16″ minor, 1/8″ medium, 1″ major.
      const sixteenthPx = mmToPx(MM_PER_INCH / 16, ppi);
      return {
        minorStepPx: sixteenthPx,
        mediumEvery: 2,
        majorEvery: 16,
        minorValue: 1 / 16,
        labelDecimals: 2,
        vertical: false,
      };
    }
    case 'px':
      // Screen-space ruler: 10 px minor, 50 px medium, 100 px major.
      return {
        minorStepPx: 10,
        mediumEvery: 5,
        majorEvery: 10,
        minorValue: 10,
        labelDecimals: 0,
        vertical: false,
      };
    default:
      throw new Error(`Unknown unit: ${unit as string}`);
  }
}

// ---------------------------------------------------------------------------
// Calibration construction
// ---------------------------------------------------------------------------

export interface AutoEstimateInput {
  /** window.devicePixelRatio */
  dpr: number;
  /** Reported device screen width in CSS px (screen.width). */
  screenWidthPx: number;
  /** Reported device screen height in CSS px (screen.height). */
  screenHeightPx: number;
}

export interface AutoEstimateResult {
  ppi: number;
  deviceClass: 'phone' | 'tablet' | 'laptop' | 'desktop';
  note: string;
}

/**
 * Auto estimate. Browsers do NOT expose physical screen size, so this uses
 * reported screen resolution + DPR heuristics with honest, class-based
 * diagonal assumptions. The result is clearly an estimate — never a promise.
 */
export function autoEstimatePpi(input: AutoEstimateInput): AutoEstimateResult | null {
  const { dpr, screenWidthPx, screenHeightPx } = input;
  if (!isFinite(dpr) || dpr <= 0 || !isFinite(screenWidthPx) || screenWidthPx <= 0 || !isFinite(screenHeightPx) || screenHeightPx <= 0) {
    return null;
  }

  // Physical-ish pixel diagonal (device pixels), since DPR reflects zoomed
  // CSS pixel density on high-DPI screens.
  const physicalPxWidth = screenWidthPx * dpr;
  const physicalPxHeight = screenHeightPx * dpr;
  const diagonalPx = Math.sqrt(physicalPxWidth * physicalPxWidth + physicalPxHeight * physicalPxHeight);

  // Class-based diagonal assumptions (consensus typical values).
  let assumedDiagonalIn: number;
  let deviceClass: AutoEstimateResult['deviceClass'];
  if (Math.min(screenWidthPx, screenHeightPx) <= 500) {
    assumedDiagonalIn = 6.5;
    deviceClass = 'phone';
  } else if (Math.min(screenWidthPx, screenHeightPx) <= 900) {
    assumedDiagonalIn = 10.5;
    deviceClass = 'tablet';
  } else if (Math.max(screenWidthPx, screenHeightPx) <= 1700) {
    assumedDiagonalIn = 14;
    deviceClass = 'laptop';
  } else {
    assumedDiagonalIn = 24;
    deviceClass = 'desktop';
  }

  const ppiRaw = diagonalPx / assumedDiagonalIn;
  if (!isFinite(ppiRaw)) return null;
  const ppi = ppiRaw < PPI_MIN ? PPI_MIN : ppiRaw > PPI_MAX ? PPI_MAX : ppiRaw;
  return {
    ppi,
    deviceClass,
    note: `Estimated for a typical ${assumedDiagonalIn}″ ${deviceClass} screen from reported display data.`,
  };
}

export function devicePresetPpi(preset: DevicePreset): number {
  return ppiFromDiagonal(preset.diagonalIn, preset.widthPx, preset.heightPx);
}

export interface CardCalibrationInput {
  /** Which standard reference the user aligned. */
  reference: ReferenceObject;
  /** True when the user aligned the card's LONG edge (heightMm). */
  alignedLongEdge: boolean;
  /** Measured on-screen pixel length of the aligned edge. */
  pixels: number;
}

/** Build a calibration from a physical reference object. */
export function calibrationFromReference(
  input: CardCalibrationInput
): { ppi: number; note: string } {
  const mm = input.alignedLongEdge ? input.reference.heightMm : input.reference.widthMm;
  const ppi = ppiFromReference(mm, input.pixels);
  return {
    ppi,
    note: `Calibrated with a physical reference: ${mm} mm across ${Math.round(input.pixels)} px.`,
  };
}

/** Human-facing calibration quality — qualitative by design. */
export function calibrationQuality(state: CalibrationState): CalibrationQuality {
  switch (state.source) {
    case 'card':
    case 'object':
      return {
        confidence: 'reference',
        label: 'Calibrated with physical reference',
        explanation:
          'Physical-card calibration provides a direct screen-to-object reference. This is the most trustworthy mode: any remaining error usually comes from how precisely the card edge was aligned.',
      };
    case 'device':
      return {
        confidence: 'calibrated',
        label: 'Calibrated with device data',
        explanation:
          'Calibration is based on your entered screen dimensions. Real panels can differ slightly from nominal specifications, so treat results as close approximations.',
      };
    case 'diagonal':
      return {
        confidence: 'calibrated',
        label: 'Calibrated with screen diagonal',
        explanation:
          'Calibration is based on your entered screen dimensions. Manufacturers measure the panel diagonal, which this method converts to pixels per inch using your screen resolution.',
      };
    case 'auto':
      return {
        confidence: 'estimated',
        label: 'Estimated (auto)',
        explanation:
          'Browsers cannot read the physical size of your display, so this is an estimate from reported screen data. Calibrate with a bank card for much better real-world accuracy.',
      };
    case 'default':
      return {
        confidence: 'estimated',
        label: 'Estimated — ready to calibrate',
        explanation:
          "Using standard web density (96 PPI). Click 'Calibrate' and match a bank card to make this ruler 100% accurate for your specific screen.",
      };
    default:
      return {
        confidence: 'estimated',
        label: 'Estimated',
        explanation: 'This scale is an estimate. Calibrate with a physical reference for better accuracy.',
      };
  }
}

// ---------------------------------------------------------------------------
// Measurement readout
// ---------------------------------------------------------------------------

export interface ReadoutOptions {
  unit: RulerUnit;
  ppi: number;
  decimals?: number;
}

/** Format a pixel delta as a full multi-unit measurement readout. */
export function formatReadout(
  deltaPx: number,
  options: ReadoutOptions
): { primary: string; secondary: string[]; raw: { cm: number; mm: number; in: number; px: number } } {
  const { unit, ppi } = options;
  const decimals = options.decimals ?? 2;
  const mm = pxToMm(Math.abs(deltaPx), ppi);
  const raw = {
    cm: mm / MM_PER_CM,
    mm,
    in: mm / MM_PER_INCH,
    px: Math.abs(deltaPx),
  };
  const fmt = (v: number, d: number) => v.toFixed(d);
  const primary =
    unit === 'px'
      ? `${fmt(raw.px, 0)} px`
      : `${fmt(raw[unit], decimals)} ${unit}`;
  const secondary: string[] = [];
  if (unit !== 'mm') secondary.push(`${fmt(raw.mm, 1)} mm`);
  if (unit !== 'cm') secondary.push(`${fmt(raw.cm, 2)} cm`);
  if (unit !== 'in') secondary.push(`${fmt(raw.in, 2)} in`);
  return { primary, secondary, raw };
}

/** Compact coordinate label for guides/crosshair, e.g. "X: 42.5 mm". */
export function formatCoordinate(axis: 'X' | 'Y', deltaPx: number, unit: RulerUnit, ppi: number): string {
  const { primary } = formatReadout(deltaPx, { unit, ppi, decimals: unit === 'mm' ? 1 : 2 });
  return `${axis}: ${primary}`;
}

/**
 * Object comparison readout, e.g. "2 cm vs 1 in". Pure unit math — kept
 * lightweight and separate from the converter tools on purpose.
 */
export function formatComparison(valueA: number, unitA: RulerUnit, valueB: number, unitB: RulerUnit): string {
  const mmA = toMm(valueA, unitA === 'px' ? 'cm' : unitA);
  const mmB = toMm(valueB, unitB === 'px' ? 'cm' : unitB);
  const diffMm = mmA - mmB;
  const sign = diffMm > 0.0001 ? 'longer' : diffMm < -0.0001 ? 'shorter' : 'equal to';
  const fmtMm = Math.abs(diffMm) < 100 ? Math.abs(diffMm).toFixed(1) : Math.abs(diffMm).toFixed(0);
  return `${valueA} ${unitA} vs ${valueB} ${unitB} — ${valueA} ${unitA} is ${sign} ${valueB} ${unitB} (${fmtMm} mm difference)`;
}

