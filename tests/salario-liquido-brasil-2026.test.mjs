// tests/salario-liquido-brasil-2026.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  regrasINSS2026,
  regrasIRRF2026,
  calcularINSS,
  calcularIRRF,
  calcularSalarioLiquido,
  formatarMoedaBRL,
  formatarPercentualBRL,
  parseMoedaBRL,
} from '../src/engines/salarioLiquidoBrasil2026.ts';

test('Regras INSS 2026 — Estrutura de Configuração', () => {
  assert.equal(regrasINSS2026.anoVigencia, 2026);
  assert.equal(regrasINSS2026.salarioMinimo, 1621.00);
  assert.equal(regrasINSS2026.tetoSalarial, 8475.55);
  assert.equal(regrasINSS2026.tetoContribuicao, 988.09);
  assert.equal(regrasINSS2026.faixas.length, 4);
});

test('Regras IRRF 2026 — Estrutura de Configuração e Novo IR', () => {
  assert.equal(regrasIRRF2026.anoVigencia, 2026);
  assert.equal(regrasIRRF2026.deducaoPorDependente, 189.59);
  assert.equal(regrasIRRF2026.descontoSimplificado, 607.20);
  assert.equal(regrasIRRF2026.limiteIsencaoTotal2026, 5000.00);
  assert.equal(regrasIRRF2026.tetoFaixaTransicao2026, 7350.00);
});

test('Teste A — Salário: R$ 3.000,00 | Dependentes: 0', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 3000.00,
    dependentes: 0,
  });

  // INSS:
  // Faixa 1 (até 1621,00): 1621,00 * 7,5% = 121,575
  // Faixa 2 (1621,01 até 2902,84): 1281,84 * 9% = 115,3656
  // Faixa 3 (2902,85 até 3000,00): 97,16 * 12% = 11,6592
  // Total = 121,575 + 115,3656 + 11,6592 = 248,5998 -> 248,60
  assert.equal(res.inss.totalDesconto, 248.60);

  // IRRF:
  // Salário bruto <= R$ 5.000,00 -> Isenção Total 2026
  assert.equal(res.irrf.irrfFinal, 0.00);
  assert.equal(res.irrf.isencaoTotal2026, true);

  // Total Descontos: 248,60
  assert.equal(res.totalDescontos, 248.60);

  // Salário Líquido: 3000 - 248,60 = 2751,40
  assert.equal(res.salarioLiquido, 2751.40);
});

test('Teste B — Salário: R$ 5.000,00 | Dependentes: 0', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 5000.00,
    dependentes: 0,
  });

  // INSS:
  // Faixa 1: 1621 * 7,5% = 121,575
  // Faixa 2: 1281,84 * 9% = 115,3656
  // Faixa 3: (4354,27 - 2902,84) = 1451,43 * 12% = 174,1716
  // Faixa 4: (5000,00 - 4354,27) = 645,73 * 14% = 90,4022
  // Total = 501,5144 -> 501,51
  assert.equal(res.inss.totalDesconto, 501.51);

  // IRRF: Salário <= 5000 -> Isenção Total
  assert.equal(res.irrf.irrfFinal, 0.00);
  assert.equal(res.irrf.isencaoTotal2026, true);

  // Salário Líquido: 5000 - 501,51 = 4498,49
  assert.equal(res.salarioLiquido, 4498.49);
});

test('Teste C — Salário: R$ 5.000,00 | Dependentes: 2', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 5000.00,
    dependentes: 2,
  });

  assert.equal(res.inss.totalDesconto, 501.51);
  assert.equal(res.irrf.totalDeducaoDependentes, 379.18);
  assert.equal(res.irrf.irrfFinal, 0.00);
  assert.equal(res.salarioLiquido, 4498.49);
});

test('Teste D — Salário: R$ 10.000,00 | Dependentes: 0', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 10000.00,
    dependentes: 0,
  });

  // INSS: Atingiu o teto
  assert.equal(res.inss.totalDesconto, 988.09);
  assert.equal(res.inss.atingiuTeto, true);

  // IRRF:
  // Base = 10000 - 988,09 = 9011,91 (dedução legal > 607,20 simplificado)
  // Imposto Base = 9011,91 * 27,5% - 908,73 = 2478,27525 - 908,73 = 1569,55
  // Salário > 7350,00 -> Sem redutor de transição
  assert.equal(res.irrf.irrfFinal, 1569.55);

  // Total Descontos: 988,09 + 1569,55 = 2557,64
  assert.equal(res.totalDescontos, 2557.64);

  // Salário Líquido: 10000 - 2557,64 = 7442,36
  assert.equal(res.salarioLiquido, 7442.36);
});

test('Teste E — Salário: R$ 20.000,00 | Dependentes: 0', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 20000.00,
    dependentes: 0,
  });

  assert.equal(res.inss.totalDesconto, 988.09);
  assert.equal(res.inss.atingiuTeto, true);

  // IRRF:
  // Base = 20000 - 988,09 = 19011,91
  // Imposto = 19011,91 * 27,5% - 908,73 = 5228,27525 - 908,73 = 4319,55
  assert.equal(res.irrf.irrfFinal, 4319.55);

  // Total Descontos = 988,09 + 4319,55 = 5307,64
  assert.equal(res.totalDescontos, 5307.64);
  assert.equal(res.salarioLiquido, 14692.36);
});

test('Teste F — Salário com Outras Deduções e Pensão Alimentícia', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 10000.00,
    dependentes: 1,
    pensaoAlimenticia: 1000.00,
    outrasDeducoes: 300.00, // plano de saúde ou desconto geral
  });

  assert.equal(res.inss.totalDesconto, 988.09);
  // Base IRRF = 10000 - 988,09 (inss) - 189,59 (dep) - 1000 (pensão) = 7822,32
  // Imposto = 7822,32 * 27,5% - 908,73 = 2151,138 - 908,73 = 1242,41
  assert.equal(res.irrf.irrfFinal, 1242.41);
  assert.equal(res.pensaoAlimenticia, 1000.00);
  assert.equal(res.outrasDeducoes, 300.00);

  // Total Descontos = 988,09 + 1242,41 + 1000 + 300 = 3530,50
  assert.equal(res.totalDescontos, 3530.50);
  assert.equal(res.salarioLiquido, 6469.50);
});

test('Teste G — Salário com Horas Extras (50% e 100%)', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 4400.00,
    horasSemanais: 44, // 220 horas -> Valor hora normal = 4400 / 220 = R$ 20,00
    horasExtras50: 10,  // 10 * (20 * 1,5) = R$ 300,00
    horasExtras100: 5,  // 5 * (20 * 2,0) = R$ 200,00
    // Total HE = 500,00; DSR = (500 / 25) * 5 = 100,00
    // Bruto Total = 4400 + 500 + 100 = R$ 5.000,00
  });

  assert.equal(res.valorHoraNormal, 20.00);
  assert.equal(res.valorHorasExtras50, 300.00);
  assert.equal(res.valorHorasExtras100, 200.00);
  assert.equal(res.valorDSRHorasExtras, 100.00);
  assert.equal(res.salarioBrutoTotal, 5000.00);

  // Como o bruto total ficou em R$ 5.000,00, o INSS é sobre 5.000,00 (501,51)
  assert.equal(res.inss.totalDesconto, 501.51);
  // E o IRRF é isento pelo limite de R$ 5.000,00 de 2026!
  assert.equal(res.irrf.irrfFinal, 0.00);
  assert.equal(res.salarioLiquido, 4498.49);
});

test('Teste H — Salário Proporcional aos Dias Trabalhados (15 dias)', () => {
  const res = calcularSalarioLiquido({
    salarioBrutoMensal: 3000.00,
    diasTrabalhados: 15,
  });

  // Salário base proporcional: (3000 / 30) * 15 = 1500,00
  assert.equal(res.salarioBaseProporcional, 1500.00);
  assert.equal(res.salarioBrutoTotal, 1500.00);

  // INSS sobre 1500,00: 1500 * 7,5% = 112,50
  assert.equal(res.inss.totalDesconto, 112.50);

  // IRRF: isento
  assert.equal(res.irrf.irrfFinal, 0.00);

  // Salário Líquido: 1500 - 112,50 = 1387,50
  assert.equal(res.salarioLiquido, 1387.50);
});

test('Teste de Formatação Brasileira Obrigatório', () => {
  // 5000 -> R$ 5.000,00
  assert.equal(formatarMoedaBRL(5000), 'R$ 5.000,00');
  assert.equal(parseMoedaBRL('5000'), 5000);
  assert.equal(formatarMoedaBRL(parseMoedaBRL('5000')), 'R$ 5.000,00');

  // 10000.50 -> R$ 10.000,50
  assert.equal(formatarMoedaBRL(10000.50), 'R$ 10.000,50');
  assert.equal(parseMoedaBRL('10000.50'), 10000.50);
  assert.equal(formatarMoedaBRL(parseMoedaBRL('10000.50')), 'R$ 10.000,50');

  // Formato com R$ e separadores brasileiros
  assert.equal(parseMoedaBRL('R$ 10.000,50'), 10000.50);
  assert.equal(parseMoedaBRL('R$ 5.000,00'), 5000);

  // Percentual
  assert.equal(formatarPercentualBRL(7.5, 1), '7,5%');
  assert.equal(formatarPercentualBRL(14.0, 1), '14,0%');
});
