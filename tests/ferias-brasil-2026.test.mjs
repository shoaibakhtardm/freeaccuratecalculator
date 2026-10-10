// tests/ferias-brasil-2026.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularFerias,
  formatarMoedaBRL,
  formatarPercentualBRL,
  parseMoedaBRL,
} from '../src/engines/feriasBrasil2026.ts';

test('Férias 2026 — Cenário 1: Salário R$ 3.000,00 | 30 Dias Integrais | Sem Abono | Sem Dependentes', () => {
  const res = calcularFerias({
    salarioBrutoMensal: 3000,
    diasFerias: 30,
    venderFerias: false,
    dependentes: 0,
  });

  assert.equal(res.salarioContratual, 3000.00);
  assert.equal(res.diasGozados, 30);
  assert.equal(res.diasAbono, 0);
  assert.equal(res.valorFeriasGozadas, 3000.00);
  assert.equal(res.valorTercoConstitucionalFerias, 1000.00);
  assert.equal(res.totalBrutoRecebido, 4000.00);
  assert.equal(res.baseCalculoINSS, 4000.00);

  // INSS sobre 4.000,00:
  // Faixa 1 (1621,00 * 7,5%) = 121,575
  // Faixa 2 (1281,84 * 9%) = 115,3656
  // Faixa 3 (1097,16 * 12%) = 131,6592
  // Total = 368,5998 -> 368,60
  assert.equal(res.inss.totalDesconto, 368.60);

  // IRRF: Bruto tributável = 4.000,00 <= 5.000,00 (Isenção Total do Novo IR 2026)
  assert.equal(res.irrf.irrfFinal, 0.00);
  assert.equal(res.irrf.isencaoTotal2026, true);

  // Total de descontos e valor líquido
  assert.equal(res.totalDescontos, 368.60);
  assert.equal(res.valorLiquidoReceber, 3631.40);
});

test('Férias 2026 — Cenário 2: Salário R$ 3.000,00 | Venda de 10 Dias (Abono) | 20 Dias de Gozo', () => {
  const res = calcularFerias({
    salarioBrutoMensal: 3000,
    venderFerias: true,
    diasAbono: 10,
    dependentes: 0,
  });

  assert.equal(res.diasGozados, 20);
  assert.equal(res.diasAbono, 10);

  // Proventos Gozados: (3000 / 30) * 20 = 2.000,00
  assert.equal(res.valorFeriasGozadas, 2000.00);
  assert.equal(res.valorTercoConstitucionalFerias, 666.67);

  // Abono Pecuniário (Isento de INSS e IRRF)
  assert.equal(res.valorAbonoPecuniario, 1000.00);
  assert.equal(res.valorTercoConstitucionalAbono, 333.33);

  // Total Bruto Global: 2000 + 666.67 + 1000 + 333.33 = 4000.00
  assert.equal(res.totalBrutoRecebido, 4000.00);

  // Base do INSS incide SOMENTE sobre férias gozadas + terço = 2666.67
  assert.equal(res.baseCalculoINSS, 2666.67);

  // INSS sobre 2666,67:
  // Faixa 1 (1621,00 * 7,5%) = 121,575
  // Faixa 2 (1045,67 * 9%) = 94,1103
  // Total = 215,6853 -> 215,69
  assert.equal(res.inss.totalDesconto, 215.69);

  // IRRF: Bruto tributável = 2.666,67 <= 5.000,00 -> Isenção 2026
  assert.equal(res.irrf.irrfFinal, 0.00);

  // Líquido com Abono = 4000 - 215,69 = 3784,31
  // (Observe a economia tributária de R$ 152,91 em comparação ao gozo integral de 30 dias!)
  assert.equal(res.valorLiquidoReceber, 3784.31);
});

test('Férias 2026 — Cenário 3: Salário R$ 5.000,00 | 30 Dias Integrais | Transição IRRF 2026', () => {
  const res = calcularFerias({
    salarioBrutoMensal: 5000,
    diasFerias: 30,
    venderFerias: false,
    dependentes: 0,
  });

  assert.equal(res.valorFeriasGozadas, 5000.00);
  assert.equal(res.valorTercoConstitucionalFerias, 1666.67);
  assert.equal(res.totalBrutoRecebido, 6666.67);
  assert.equal(res.baseCalculoINSS, 6666.67);

  // INSS sobre 6.666,67
  assert.equal(res.inss.totalDesconto, 734.85);

  // IRRF com redutor de transição 2026 (Bruto entre R$ 5.000,01 e R$ 7.350,00)
  assert.ok(res.irrf.redutor2026 > 0);
  assert.equal(res.irrf.irrfFinal, 631.53);

  // Total de descontos e valor líquido
  assert.equal(res.totalDescontos, 1366.38);
  assert.equal(res.valorLiquidoReceber, 5300.29);
});

test('Férias 2026 — Cenário 4: Salário R$ 10.000,00 | Teto do INSS Atingido', () => {
  const res = calcularFerias({
    salarioBrutoMensal: 10000,
    diasFerias: 30,
    dependentes: 0,
  });

  assert.equal(res.valorFeriasGozadas, 10000.00);
  assert.equal(res.valorTercoConstitucionalFerias, 3333.33);
  assert.equal(res.totalBrutoRecebido, 13333.33);

  // Base de 13.333,33 supera o teto de 8.475,55 -> INSS trava no teto de R$ 988,09
  assert.equal(res.inss.totalDesconto, 988.09);
  assert.equal(res.inss.atingiuTeto, true);

  // IRRF apurado integralmente (acima da faixa de transição de R$ 7.350,00)
  assert.ok(res.irrf.irrfFinal > 2000);
  assert.equal(res.irrf.redutor2026, 0);

  assert.equal(res.valorLiquidoReceber, 9859.03);
});

test('Férias 2026 — Cenário 5: Adiantamento da 1ª Parcela do 13º Salário (50%)', () => {
  const res = calcularFerias({
    salarioBrutoMensal: 4000,
    diasFerias: 30,
    adiantar13o: true,
  });

  // Adiantamento 13º = 50% de R$ 4.000,00 = R$ 2.000,00
  assert.equal(res.valorAdiantamento13o, 2000.00);
  assert.equal(res.solicitouAdiantamento13, true);

  // Férias (4000) + 1/3 (1333.33) + 13º adiantado (2000) = 7333.33
  assert.equal(res.totalBrutoRecebido, 7333.33);

  // O adiantamento do 13º NÃO entra na base do INSS das férias
  assert.equal(res.baseCalculoINSS, 5333.33);
});

test('Férias 2026 — Cenário 6: Dependentes Legais Reduzindo o IRRF', () => {
  const semDep = calcularFerias({
    salarioBrutoMensal: 6000,
    diasFerias: 30,
    dependentes: 0,
  });

  const com2Dep = calcularFerias({
    salarioBrutoMensal: 6000,
    diasFerias: 30,
    dependentes: 2,
  });

  // Ambos têm a mesma base de INSS
  assert.equal(semDep.inss.totalDesconto, com2Dep.inss.totalDesconto);

  // O contribuinte com 2 dependentes paga menos ou igual IRRF e tem maior valor líquido
  assert.ok(com2Dep.irrf.irrfFinal <= semDep.irrf.irrfFinal);
  assert.ok(com2Dep.valorLiquidoReceber >= semDep.valorLiquidoReceber);
});

test('Férias 2026 — Cenário 7: Formatação e Utilitários de Moeda', () => {
  assert.equal(formatarMoedaBRL(5000), 'R$ 5.000,00');
  assert.equal(formatarMoedaBRL(1234567.89), 'R$ 1.234.567,89');
  assert.equal(formatarPercentualBRL(14.0, 1), '14,0%');
  assert.equal(parseMoedaBRL('R$ 4.500,50'), 4500.50);
  assert.equal(parseMoedaBRL('5000'), 5000);
});
