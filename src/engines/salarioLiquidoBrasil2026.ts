// src/engines/salarioLiquidoBrasil2026.ts
/**
 * Motor Oficial de Cálculo de Salário Líquido Brasil 2026
 * Contempla as tabelas e diretrizes oficiais vigentes para o ano-calendário de 2026:
 * - INSS progressivo (Portaria Interministerial MPS/MF nº 13/2026)
 * - IRRF com tabela progressiva e novo redutor de isenção de 2026
 * - Deduções por dependente, pensão alimentícia, previdência privada e outras deduções
 * - Regime CLT: Horas extras (50%, 100%, custom), DSR, adicional noturno, vale-transporte
 * - Salário proporcional a dias trabalhados (base 30 dias CLT)
 */

export interface FaixaINSS {
  limite: number;
  aliquota: number;
}

export interface RegrasINSSConfig {
  anoVigencia: number;
  salarioMinimo: number;
  tetoSalarial: number;
  tetoContribuicao: number;
  faixas: FaixaINSS[];
}

export interface FaixaIRRF {
  limite: number;
  aliquota: number;
  parcelaDeduzir: number;
}

export interface RegrasIRRFConfig {
  anoVigencia: number;
  deducaoPorDependente: number;
  descontoSimplificado: number;
  limiteIsencaoTotal2026: number;
  reducaoIsencaoMaxima2026: number;
  tetoFaixaTransicao2026: number;
  formulaTransicao: {
    constante: number;
    fatorMultiplicador: number;
  };
  tabelaBase: FaixaIRRF[];
}

/**
 * Parâmetros Oficiais de Contribuição Previdenciária do INSS para 2026
 * Baseado na Portaria Interministerial MPS/MF nº 13/2026.
 */
export const regrasINSS2026: RegrasINSSConfig = {
  anoVigencia: 2026,
  salarioMinimo: 1621.00,
  tetoSalarial: 8475.55,
  tetoContribuicao: 988.09, // 121.575 + 115.3656 + 174.1716 + 576.9792 = 988.0914
  faixas: [
    { limite: 1621.00, aliquota: 0.075 },
    { limite: 2902.84, aliquota: 0.090 },
    { limite: 4354.27, aliquota: 0.120 },
    { limite: 8475.55, aliquota: 0.140 },
  ],
};

/**
 * Parâmetros Oficiais do IRRF para 2026
 * Tabela progressiva mensal e nova regra de redução/isenção de até R$ 5.000,00
 * com transição progressiva até R$ 7.350,00.
 */
export const regrasIRRF2026: RegrasIRRFConfig = {
  anoVigencia: 2026,
  deducaoPorDependente: 189.59,
  descontoSimplificado: 607.20,
  limiteIsencaoTotal2026: 5000.00,
  reducaoIsencaoMaxima2026: 312.89,
  tetoFaixaTransicao2026: 7350.00,
  formulaTransicao: {
    constante: 978.62,
    fatorMultiplicador: 0.133145,
  },
  tabelaBase: [
    { limite: 2428.80, aliquota: 0.000, parcelaDeduzir: 0.00 },
    { limite: 2826.65, aliquota: 0.075, parcelaDeduzir: 182.16 },
    { limite: 3751.05, aliquota: 0.150, parcelaDeduzir: 394.16 },
    { limite: 4664.68, aliquota: 0.225, parcelaDeduzir: 675.49 },
    { limite: Infinity, aliquota: 0.275, parcelaDeduzir: 908.73 },
  ],
};

export interface DetalheFaixaINSS {
  faixaNumero: number;
  descricao: string;
  baseFaixa: number;
  aliquota: number;
  valorDesconto: number;
}

export interface ResultadoINSS {
  totalDesconto: number;
  aliquotaEfetiva: number;
  atingiuTeto: boolean;
  tetoMaximo: number;
  detalhamentoFaixas: DetalheFaixaINSS[];
}

/**
 * Calcula o desconto do INSS com base no cálculo progressivo oficial de 2026.
 */
export function calcularINSS(salarioBruto: number, regras: RegrasINSSConfig = regrasINSS2026): ResultadoINSS {
  const bruto = Math.max(0, Number(salarioBruto) || 0);

  if (bruto <= 0) {
    return {
      totalDesconto: 0,
      aliquotaEfetiva: 0,
      atingiuTeto: false,
      tetoMaximo: regras.tetoContribuicao,
      detalhamentoFaixas: [],
    };
  }

  let totalDesconto = 0;
  let limiteAnterior = 0;
  const detalhamentoFaixas: DetalheFaixaINSS[] = [];

  for (let i = 0; i < regras.faixas.length; i++) {
    const faixa = regras.faixas[i];
    if (bruto > limiteAnterior) {
      const baseTributavelFaixa = Math.min(bruto, faixa.limite) - limiteAnterior;
      const valorFaixa = baseTributavelFaixa * faixa.aliquota;
      totalDesconto += valorFaixa;

      detalhamentoFaixas.push({
        faixaNumero: i + 1,
        descricao: i === 0
          ? `Até ${formatarMoedaBRL(faixa.limite)}`
          : `De ${formatarMoedaBRL(limiteAnterior + 0.01)} até ${formatarMoedaBRL(faixa.limite)}`,
        baseFaixa: arredondar2(baseTributavelFaixa),
        aliquota: faixa.aliquota,
        valorDesconto: arredondar2(valorFaixa),
      });

      limiteAnterior = faixa.limite;
    } else {
      break;
    }
  }

  const atingiuTeto = bruto >= regras.tetoSalarial;
  const descontoFinal = atingiuTeto ? regras.tetoContribuicao : arredondar2(totalDesconto);
  const aliquotaEfetiva = bruto > 0 ? (descontoFinal / bruto) * 100 : 0;

  return {
    totalDesconto: descontoFinal,
    aliquotaEfetiva: arredondar2(aliquotaEfetiva),
    atingiuTeto,
    tetoMaximo: regras.tetoContribuicao,
    detalhamentoFaixas,
  };
}

export interface ResultadoIRRF {
  salarioTributavelBruto: number;
  descontoINSS: number;
  totalDeducaoDependentes: number;
  deducaoPensao: number;
  outrasDeducoesLegais: number;
  totalDeducoesLegais: number;
  descontoSimplificado: number;
  tipoDeducaoUtilizada: 'legal' | 'simplificado';
  valorDeducaoUtilizada: number;
  baseCalculo: number;
  aliquotaNominal: number;
  parcelaDeduzir: number;
  impostoBase: number;
  redutor2026: number;
  isencaoTotal2026: boolean;
  irrfFinal: number;
  aliquotaEfetiva: number;
}

/**
 * Calcula o IRRF com base na Tabela Progressiva e na nova regra de redução/isenção de 2026.
 */
export function calcularIRRF(
  salarioBrutoTributavel: number,
  descontoINSS: number,
  dependentes: number = 0,
  pensaoAlimenticia: number = 0,
  outrasDeducoesLegais: number = 0,
  regras: RegrasIRRFConfig = regrasIRRF2026
): ResultadoIRRF {
  const bruto = Math.max(0, Number(salarioBrutoTributavel) || 0);
  const inss = Math.max(0, Number(descontoINSS) || 0);
  const qtdDependentes = Math.max(0, Math.floor(Number(dependentes) || 0));
  const pensao = Math.max(0, Number(pensaoAlimenticia) || 0);
  const outras = Math.max(0, Number(outrasDeducoesLegais) || 0);

  const totalDeducaoDependentes = qtdDependentes * regras.deducaoPorDependente;
  const totalDeducoesLegais = inss + totalDeducaoDependentes + pensao + outras;
  const descontoSimplificado = regras.descontoSimplificado;

  // A Receita Federal aplica automaticamente a dedução mais vantajosa para o trabalhador
  const usaSimplificado = descontoSimplificado > totalDeducoesLegais;
  const tipoDeducaoUtilizada: 'legal' | 'simplificado' = usaSimplificado ? 'simplificado' : 'legal';
  const valorDeducaoUtilizada = usaSimplificado ? descontoSimplificado : totalDeducoesLegais;

  const baseCalculo = Math.max(0, bruto - valorDeducaoUtilizada);

  // 1. Tabela progressiva base
  let aliquotaNominal = 0;
  let parcelaDeduzir = 0;

  for (const faixa of regras.tabelaBase) {
    if (baseCalculo <= faixa.limite) {
      aliquotaNominal = faixa.aliquota;
      parcelaDeduzir = faixa.parcelaDeduzir;
      break;
    }
  }

  const impostoBase = Math.max(0, (baseCalculo * aliquotaNominal) - parcelaDeduzir);

  // 2. Aplicação das Novas Regras do IR 2026 (Lei do Novo IR / Redução especial)
  let redutor2026 = 0;
  let isencaoTotal2026 = false;
  let irrfFinal = impostoBase;

  if (bruto <= regras.limiteIsencaoTotal2026) {
    // Rendimento bruto mensal de até R$ 5.000,00: isenção total na fonte
    isencaoTotal2026 = true;
    redutor2026 = impostoBase;
    irrfFinal = 0;
  } else if (bruto <= regras.tetoFaixaTransicao2026) {
    // Faixa de transição suave: R$ 5.000,01 a R$ 7.350,00
    // Fórmula oficial: 978,62 - (0,133145 * Renda Mensal)
    const formulaRedutora = regras.formulaTransicao.constante - (regras.formulaTransicao.fatorMultiplicador * bruto);
    redutor2026 = Math.max(0, arredondar2(formulaRedutora));
    irrfFinal = Math.max(0, arredondar2(impostoBase - redutor2026));
  } else {
    // Acima de R$ 7.350,00: imposto apurado pela tabela progressiva base integral
    redutor2026 = 0;
    irrfFinal = arredondar2(impostoBase);
  }

  const aliquotaEfetiva = bruto > 0 ? (irrfFinal / bruto) * 100 : 0;

  return {
    salarioTributavelBruto: arredondar2(bruto),
    descontoINSS: arredondar2(inss),
    totalDeducaoDependentes: arredondar2(totalDeducaoDependentes),
    deducaoPensao: arredondar2(pensao),
    outrasDeducoesLegais: arredondar2(outras),
    totalDeducoesLegais: arredondar2(totalDeducoesLegais),
    descontoSimplificado: arredondar2(descontoSimplificado),
    tipoDeducaoUtilizada,
    valorDeducaoUtilizada: arredondar2(valorDeducaoUtilizada),
    baseCalculo: arredondar2(baseCalculo),
    aliquotaNominal,
    parcelaDeduzir: arredondar2(parcelaDeduzir),
    impostoBase: arredondar2(impostoBase),
    redutor2026: arredondar2(redutor2026),
    isencaoTotal2026,
    irrfFinal: arredondar2(irrfFinal),
    aliquotaEfetiva: arredondar2(aliquotaEfetiva),
  };
}

export interface ParametrosCalculoSalario {
  salarioBrutoMensal: number;
  dependentes?: number;
  outrasDeducoes?: number; // Outros descontos gerais em folha (plano de saúde, adiantamentos)
  // Opções Avançadas:
  diasTrabalhados?: number; // Proporcionalidade (1 a 30)
  horasSemanais?: number; // 44h (220h/mês), 40h (200h/mês), etc.
  horasExtras50?: number; // Quantidade de horas extras a 50%
  horasExtras100?: number; // Quantidade de horas extras a 100%
  adicionalNoturnoValor?: number;
  pensaoAlimenticia?: number; // Dedutível de IRRF
  descontoValeTransporte?: number; // Desconto informado ou até 6% do salário base
  outrosDescontosFolha?: number; // Outros descontos (vale-refeição coparticipação, sindicato)
}

export interface ResultadoSalarioLiquido {
  // Entradas Base
  salarioContratual: number;
  diasTrabalhados: number;
  salarioBaseProporcional: number;
  
  // Proventos e Horas Extras
  valorHoraNormal: number;
  valorHorasExtras50: number;
  valorHorasExtras100: number;
  valorDSRHorasExtras: number;
  valorAdicionalNoturno: number;
  totalProventosAdicionais: number;
  salarioBrutoTotal: number;

  // Descontos Legais Obrigatórios
  inss: ResultadoINSS;
  irrf: ResultadoIRRF;
  descontoVT: number;
  pensaoAlimenticia: number;
  outrasDeducoes: number;
  outrosDescontosFolha: number;
  totalDescontos: number;

  // Resultado Final
  salarioLiquido: number;
  percentualDescontosSobreBruto: number;
}

/**
 * Realiza o cálculo integrado e transparente do Salário Líquido Brasileiro para 2026.
 */
export function calcularSalarioLiquido(params: ParametrosCalculoSalario): ResultadoSalarioLiquido {
  const salarioContratual = Math.max(0, Number(params.salarioBrutoMensal) || 0);
  const diasTrabalhados = params.diasTrabalhados !== undefined && params.diasTrabalhados > 0 && params.diasTrabalhados < 30
    ? Math.min(30, Math.max(1, Math.floor(params.diasTrabalhados)))
    : 30;

  // Salário base proporcional a dias trabalhados (padrão comercial CLT: mês de 30 dias)
  const salarioBaseProporcional = diasTrabalhados === 30
    ? salarioContratual
    : arredondar2((salarioContratual / 30) * diasTrabalhados);

  // Carga horária mensal padrão
  const horasSemanais = Number(params.horasSemanais) || 44;
  const divisorMensal = horasSemanais === 40 ? 200 : horasSemanais === 36 ? 180 : horasSemanais === 30 ? 150 : 220;
  const valorHoraNormal = salarioContratual > 0 ? salarioContratual / divisorMensal : 0;

  // Horas Extras
  const qtdHe50 = Math.max(0, Number(params.horasExtras50) || 0);
  const qtdHe100 = Math.max(0, Number(params.horasExtras100) || 0);

  const valorHorasExtras50 = arredondar2(qtdHe50 * (valorHoraNormal * 1.5));
  const valorHorasExtras100 = arredondar2(qtdHe100 * (valorHoraNormal * 2.0));
  
  // DSR (Descanso Semanal Remunerado) sobre Horas Extras:
  // Média padrão comercial: (Total Horas Extras / 25 dias úteis) * 5 domingos e feriados (1/5 = 20%)
  const totalHorasExtras = valorHorasExtras50 + valorHorasExtras100;
  const valorDSRHorasExtras = totalHorasExtras > 0 ? arredondar2((totalHorasExtras / 25) * 5) : 0;

  const valorAdicionalNoturno = Math.max(0, Number(params.adicionalNoturnoValor) || 0);

  const totalProventosAdicionais = arredondar2(totalHorasExtras + valorDSRHorasExtras + valorAdicionalNoturno);
  const salarioBrutoTotal = arredondar2(salarioBaseProporcional + totalProventosAdicionais);

  // 1. INSS (incide sobre o salário base + horas extras + DSR + adicional noturno)
  const inss = calcularINSS(salarioBrutoTotal);

  // 2. IRRF (incide sobre o bruto tributável deduzido de INSS, dependentes e pensão)
  const dependentes = Math.max(0, Number(params.dependentes) || 0);
  const pensaoAlimenticia = Math.max(0, Number(params.pensaoAlimenticia) || 0);
  const outrasDeducoes = Math.max(0, Number(params.outrasDeducoes) || 0);
  const outrosDescontosFolha = Math.max(0, Number(params.outrosDescontosFolha) || 0);

  const irrf = calcularIRRF(
    salarioBrutoTotal,
    inss.totalDesconto,
    dependentes,
    pensaoAlimenticia,
    0 // outras deduções tributárias
  );

  // Vale-Transporte: limite de 6% do salário base ou valor informado
  const descontoVT = Math.max(0, Number(params.descontoValeTransporte) || 0);

  // Total de descontos
  const totalDescontos = arredondar2(
    inss.totalDesconto +
    irrf.irrfFinal +
    descontoVT +
    pensaoAlimenticia +
    outrasDeducoes +
    outrosDescontosFolha
  );

  const salarioLiquido = Math.max(0, arredondar2(salarioBrutoTotal - totalDescontos));
  const percentualDescontosSobreBruto = salarioBrutoTotal > 0
    ? arredondar2((totalDescontos / salarioBrutoTotal) * 100)
    : 0;

  return {
    salarioContratual: arredondar2(salarioContratual),
    diasTrabalhados,
    salarioBaseProporcional,
    valorHoraNormal: arredondar2(valorHoraNormal),
    valorHorasExtras50,
    valorHorasExtras100,
    valorDSRHorasExtras,
    valorAdicionalNoturno,
    totalProventosAdicionais,
    salarioBrutoTotal,
    inss,
    irrf,
    descontoVT,
    pensaoAlimenticia,
    outrasDeducoes,
    outrosDescontosFolha,
    totalDescontos,
    salarioLiquido,
    percentualDescontosSobreBruto,
  };
}

// -------------------------------------------------------------
// Funções Utilitárias de Formatação Padrão Brasileiro (pt-BR)
// -------------------------------------------------------------

/**
 * Arredonda um valor para duas casas decimais com precisão bancária.
 */
export function arredondar2(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/**
 * Formata um valor numérico para a moeda brasileira (ex: R$ 5.000,00).
 */
export function formatarMoedaBRL(valor: number): string {
  const num = Number(valor);
  if (isNaN(num) || !isFinite(num)) return 'R$ 0,00';
  const fixo = Math.abs(arredondar2(num)).toFixed(2);
  const partes = fixo.split('.');
  const inteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimal = partes[1];
  const sinal = num < 0 ? '-' : '';
  return `${sinal}R$ ${inteira},${decimal}`;
}

/**
 * Formata um percentual no padrão brasileiro (ex: 7,5% ou 14,0%).
 */
export function formatarPercentualBRL(valor: number, casasDecimais: number = 2): string {
  const num = Number(valor);
  if (isNaN(num) || !isFinite(num)) return '0,0%';
  const fixo = arredondar2(num).toFixed(casasDecimais);
  return `${fixo.replace('.', ',')}%`;
}

/**
 * Interpreta string ou número em formato brasileiro (R$ 5.000,00 / 10000.50 / 5000) para Float.
 */
export function parseMoedaBRL(entrada: string | number): number {
  if (typeof entrada === 'number') {
    return isNaN(entrada) || !isFinite(entrada) ? 0 : entrada;
  }
  if (!entrada) return 0;

  let limpo = String(entrada).trim();
  // Remove prefixos como R$, espaços, símbolos não numéricos exceto vírgula e ponto
  limpo = limpo.replace(/[R$\s]/g, '');

  if (!limpo) return 0;

  // Se possui ambos ponto e vírgula (ex: 5.000,00 ou 1,000.50)
  if (limpo.includes('.') && limpo.includes(',')) {
    if (limpo.lastIndexOf(',') > limpo.lastIndexOf('.')) {
      // Padrão brasileiro: 5.000,50 -> remove pontos, troca vírgula por ponto
      limpo = limpo.replace(/\./g, '').replace(',', '.');
    } else {
      // Padrão internacional: 5,000.50 -> remove vírgulas
      limpo = limpo.replace(/,/g, '');
    }
  } else if (limpo.includes(',')) {
    // Apenas vírgula: 5000,50 -> 5000.50
    limpo = limpo.replace(',', '.');
  }

  const num = parseFloat(limpo);
  return isNaN(num) || !isFinite(num) ? 0 : num;
}
