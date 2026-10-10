// src/engines/feriasBrasil2026.ts
/**
 * Motor Oficial de Cálculo de Férias Brasil 2026 (CLT e Constituição Federal)
 * 
 * Legislação e Parâmetros Aplicáveis:
 * - Constituição Federal de 1988 (Art. 7º, XVII - Terço Constitucional de Férias)
 * - Consolidação das Leis do Trabalho (CLT - Artigos 129 a 145)
 * - Lei nº 13.467/2017 (Reforma Trabalhista - Fracionamento de férias em até 3 períodos)
 * - Lei nº 4.749/1965 e Decreto nº 57.155/1965 (Adiantamento da 1ª parcela do 13º nas férias)
 * - Lei nº 8.212/1991 (Art. 28, § 9º, 'e' - Isenção previdenciária sobre Abono Pecuniário)
 * - Portaria Interministerial MPS/MF nº 13/2026 (Tabela Progressiva de Contribuição do INSS 2026)
 * - Tabela do IRRF 2026 com Redutor Oficial de Isenção até R$ 5.000,00 e transição suave até R$ 7.350,00
 * - Jurisprudência: Súmula 125 do STJ e Soluções de Consulta Cosit/RFB (Não incidência de IRRF sobre Abono Pecuniário)
 * - STF Tema 985 (Incidência de contribuição previdenciária sobre o terço constitucional de férias gozadas)
 */

import {
  regrasINSS2026,
  regrasIRRF2026,
  calcularINSS,
  calcularIRRF,
  arredondar2,
  formatarMoedaBRL,
  formatarPercentualBRL,
  parseMoedaBRL,
  type ResultadoINSS,
  type ResultadoIRRF,
} from './salarioLiquidoBrasil2026.ts';

export {
  regrasINSS2026,
  regrasIRRF2026,
  calcularINSS,
  calcularIRRF,
  arredondar2,
  formatarMoedaBRL,
  formatarPercentualBRL,
  parseMoedaBRL,
};

export interface ParametrosCalculoFerias {
  /** Salário bruto mensal contratual registrado em carteira (R$) */
  salarioBrutoMensal: number;
  /** Média mensal de adicionais no período aquisitivo (Horas extras, adicional noturno, periculosidade, insalubridade, comissões) */
  mediaHorasExtras?: number;
  /** Quantidade de dias corridos de férias a serem gozados (ex: 30, 20, 15, 10) */
  diasFerias?: number;
  /** Indica se o empregado optou por vender 1/3 das férias (Abono Pecuniário - CLT art. 143) */
  venderFerias?: boolean;
  /** Quantidade de dias de férias vendidos como abono pecuniário (máximo de 1/3 do direito = 10 dias) */
  diasAbono?: number;
  /** Solicitação de adiantamento da 1ª parcela (50%) do 13º salário (Lei nº 4.749/1965) */
  adiantar13o?: boolean;
  /** Número de dependentes legais para dedução no Imposto de Renda (R$ 189,59 cada em 2026) */
  dependentes?: number;
  /** Pensão alimentícia judicial incidente sobre as férias (dedutível de IRRF) */
  pensaoAlimenticia?: number;
  /** Outros descontos autorizados em folha (adiantamentos anteriores, consignados, etc.) */
  outrasDeducoes?: number;
}

export interface DetalhamentoItemRubrica {
  descricao: string;
  referencia: string;
  provento: number;
  desconto: number;
  tributavelINSS: boolean;
  tributavelIRRF: boolean;
  baseLegal: string;
}

export interface ResultadoCalculoFerias {
  // Entradas Validadas
  salarioContratual: number;
  mediaAdicionais: number;
  remuneracaoBaseCalculo: number;
  diasGozados: number;
  diasAbono: number;
  totalDiasContemplados: number;
  solicitouAdiantamento13: boolean;

  // Proventos
  valorFeriasGozadas: number;
  valorTercoConstitucionalFerias: number;
  valorAbonoPecuniario: number;
  valorTercoConstitucionalAbono: number;
  valorAdiantamento13o: number;

  // Bases Tributárias
  baseCalculoINSS: number;
  baseCalculoIRRFBruta: number;
  totalProventosTributaveis: number;
  totalProventosIsentos: number;
  totalBrutoRecebido: number;

  // Descontos Oficiais
  inss: ResultadoINSS;
  irrf: ResultadoIRRF;
  pensaoAlimenticia: number;
  outrasDeducoes: number;
  totalDescontos: number;

  // Resultado Líquido
  valorLiquidoReceber: number;
  percentualDescontosSobreBruto: number;

  // Informações Legais e Prazos
  prazoPagamentoTexto: string;
  alertaVendaFerias?: string;
  tabelaRubricas: DetalhamentoItemRubrica[];
}

/**
 * Calcula os proventos, retenções e valor líquido das férias de acordo com as regras oficiais brasileiras vigentes em 2026.
 */
export function calcularFerias(params: ParametrosCalculoFerias): ResultadoCalculoFerias {
  const salarioContratual = Math.max(0, Number(params.salarioBrutoMensal) || 0);
  const mediaAdicionais = Math.max(0, Number(params.mediaHorasExtras) || 0);
  const remuneracaoBaseCalculo = arredondar2(salarioContratual + mediaAdicionais);

  // Validação de dias de gozo e venda
  const venderFerias = Boolean(params.venderFerias);
  let diasAbono = 0;
  if (venderFerias) {
    // CLT Art. 143: Limite de 1/3 do direito a férias (máximo 10 dias de um total de 30 dias)
    diasAbono = params.diasAbono !== undefined ? Math.min(10, Math.max(1, Math.floor(params.diasAbono))) : 10;
  }

  // Dias de gozo (padrão 30 se não vende, ou 20 se vendeu 10 dias)
  let diasGozadosPadrao = venderFerias ? 30 - diasAbono : 30;
  let diasGozados = params.diasFerias !== undefined ? Math.max(1, Math.floor(params.diasFerias)) : diasGozadosPadrao;

  // Se o usuário solicitou mais dias do que o total de 30 somado ao abono, ajustamos
  if (diasGozados + diasAbono > 30) {
    diasGozados = Math.max(1, 30 - diasAbono);
  }

  const totalDiasContemplados = diasGozados + diasAbono;

  // Valor do dia de salário (base comercial 30 dias na CLT - art. 64 e 142)
  const valorDiaRemuneracao = remuneracaoBaseCalculo > 0 ? remuneracaoBaseCalculo / 30 : 0;

  // 1. Proventos de Férias Gozadas
  const valorFeriasGozadas = arredondar2(valorDiaRemuneracao * diasGozados);

  // 2. Terço Constitucional sobre Férias Gozadas (CF/88 Art. 7º, XVII)
  const valorTercoConstitucionalFerias = arredondar2(valorFeriasGozadas / 3);

  // 3. Abono Pecuniário (CLT Art. 143)
  const valorAbonoPecuniario = diasAbono > 0 ? arredondar2(valorDiaRemuneracao * diasAbono) : 0;

  // 4. Terço Constitucional sobre o Abono Pecuniário (Súmula 328 do TST)
  const valorTercoConstitucionalAbono = diasAbono > 0 ? arredondar2(valorAbonoPecuniario / 3) : 0;

  // 5. Adiantamento da 1ª Parcela do 13º Salário (50% do salário contratual ou remuneração base)
  const solicitouAdiantamento13 = Boolean(params.adiantar13o);
  const valorAdiantamento13o = solicitouAdiantamento13 ? arredondar2(remuneracaoBaseCalculo * 0.5) : 0;

  // Bases Tributárias:
  // - Incidem encargos (INSS e IRRF) sobre férias gozadas e seu terço constitucional.
  // - O Abono Pecuniário e seu respectivo terço são ISENTOS de INSS (Lei 8.212/91 art. 28, § 9º, 'e', 6)
  //   e ISENTOS de IRRF (Súmula 125 do STJ e RFB).
  // - O adiantamento do 13º salário não sofre retenção de INSS e IRRF no ato do adiantamento
  //   (a tributação ocorre exclusivamente na quitação em dezembro).
  const baseCalculoINSS = arredondar2(valorFeriasGozadas + valorTercoConstitucionalFerias);
  const baseCalculoIRRFBruta = baseCalculoINSS;

  const totalProventosTributaveis = baseCalculoINSS;
  const totalProventosIsentos = arredondar2(
    valorAbonoPecuniario + valorTercoConstitucionalAbono + valorAdiantamento13o
  );
  const totalBrutoRecebido = arredondar2(totalProventosTributaveis + totalProventosIsentos);

  // 6. Dedução Previdenciária do INSS 2026 (Tabela Progressiva)
  const inss = calcularINSS(baseCalculoINSS);

  // 7. Retenção do Imposto de Renda Retido na Fonte (IRRF 2026 com Novo IR)
  const dependentes = Math.max(0, Number(params.dependentes) || 0);
  const pensaoAlimenticia = Math.max(0, Number(params.pensaoAlimenticia) || 0);
  const outrasDeducoes = Math.max(0, Number(params.outrasDeducoes) || 0);

  const irrf = calcularIRRF(
    baseCalculoIRRFBruta,
    inss.totalDesconto,
    dependentes,
    pensaoAlimenticia,
    0
  );

  // 8. Totalização dos Descontos
  const totalDescontos = arredondar2(
    inss.totalDesconto +
    irrf.irrfFinal +
    pensaoAlimenticia +
    outrasDeducoes
  );

  // 9. Valor Líquido Final a Receber
  const valorLiquidoReceber = Math.max(0, arredondar2(totalBrutoRecebido - totalDescontos));
  const percentualDescontosSobreBruto = totalBrutoRecebido > 0
    ? arredondar2((totalDescontos / totalBrutoRecebido) * 100)
    : 0;

  // 10. Tabela Analítica de Rubricas
  const tabelaRubricas: DetalhamentoItemRubrica[] = [
    {
      descricao: `Férias Gozadas (${diasGozados} ${diasGozados === 1 ? 'dia' : 'dias'})`,
      referencia: `${diasGozados}/30 avos`,
      provento: valorFeriasGozadas,
      desconto: 0,
      tributavelINSS: true,
      tributavelIRRF: true,
      baseLegal: 'CLT, Art. 129 e 130',
    },
    {
      descricao: 'Adicional Constitucional de 1/3 sobre Férias',
      referencia: '33,33%',
      provento: valorTercoConstitucionalFerias,
      desconto: 0,
      tributavelINSS: true,
      tributavelIRRF: true,
      baseLegal: 'CF/88, Art. 7º, XVII e STF Tema 985',
    },
  ];

  if (diasAbono > 0) {
    tabelaRubricas.push({
      descricao: `Abono Pecuniário (${diasAbono} ${diasAbono === 1 ? 'dia vendido' : 'dias vendidos'})`,
      referencia: `${diasAbono}/30 avos`,
      provento: valorAbonoPecuniario,
      desconto: 0,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'CLT, Art. 143 (Isento de INSS e IRRF)',
    });
    tabelaRubricas.push({
      descricao: '1/3 Constitucional sobre Abono Pecuniário',
      referencia: '33,33%',
      provento: valorTercoConstitucionalAbono,
      desconto: 0,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Súmula 328 TST / Súmula 125 STJ',
    });
  }

  if (solicitouAdiantamento13) {
    tabelaRubricas.push({
      descricao: 'Adiantamento da 1ª Parcela do 13º Salário (50%)',
      referencia: '50,00%',
      provento: valorAdiantamento13o,
      desconto: 0,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Lei nº 4.749/1965, Art. 2º, § 2º',
    });
  }

  // Adicionar descontos na tabela de rubricas
  if (inss.totalDesconto > 0) {
    tabelaRubricas.push({
      descricao: 'Contribuição Previdenciária do INSS 2026',
      referencia: `${formatarPercentualBRL(inss.aliquotaEfetiva)} (efetiva)`,
      provento: 0,
      desconto: inss.totalDesconto,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Portaria MPS/MF nº 13/2026',
    });
  }

  if (irrf.irrfFinal > 0) {
    tabelaRubricas.push({
      descricao: 'Imposto de Renda Retido na Fonte (IRRF)',
      referencia: `${formatarPercentualBRL(irrf.aliquotaEfetiva)} (efetiva)`,
      provento: 0,
      desconto: irrf.irrfFinal,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Tabela IRRF 2026 / Lei do Novo IR',
    });
  } else if (baseCalculoIRRFBruta > 0) {
    tabelaRubricas.push({
      descricao: 'Imposto de Renda (IRRF) — Isenção 2026',
      referencia: irrf.isencaoTotal2026 ? 'Isento até R$ 5.000' : 'Redutor 2026',
      provento: 0,
      desconto: 0,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Lei do Novo IRRF 2026',
    });
  }

  if (pensaoAlimenticia > 0) {
    tabelaRubricas.push({
      descricao: 'Pensão Alimentícia Judicial',
      referencia: 'Valor informado',
      provento: 0,
      desconto: pensaoAlimenticia,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'Decisão Judicial / Acordo Homologado',
    });
  }

  if (outrasDeducoes > 0) {
    tabelaRubricas.push({
      descricao: 'Outros Descontos Autorizados em Folha',
      referencia: 'Valor informado',
      provento: 0,
      desconto: outrasDeducoes,
      tributavelINSS: false,
      tributavelIRRF: false,
      baseLegal: 'CLT, Art. 462',
    });
  }

  // Prazo de Pagamento (CLT Art. 145)
  const prazoPagamentoTexto =
    'Conforme o artigo 145 da CLT, a remuneração das férias e o abono pecuniário devem ser pagos até 2 (dois) dias antes do início do respectivo período de descanso.';

  let alertaVendaFerias: string | undefined = undefined;
  if (venderFerias && diasAbono > 10) {
    alertaVendaFerias =
      'A CLT limita o abono pecuniário a no máximo 1/3 do período de férias (10 dias). O cálculo considerou o teto legal de 10 dias.';
  }

  return {
    salarioContratual,
    mediaAdicionais,
    remuneracaoBaseCalculo,
    diasGozados,
    diasAbono,
    totalDiasContemplados,
    solicitouAdiantamento13,
    valorFeriasGozadas,
    valorTercoConstitucionalFerias,
    valorAbonoPecuniario,
    valorTercoConstitucionalAbono,
    valorAdiantamento13o,
    baseCalculoINSS,
    baseCalculoIRRFBruta,
    totalProventosTributaveis,
    totalProventosIsentos,
    totalBrutoRecebido,
    inss,
    irrf,
    pensaoAlimenticia,
    outrasDeducoes,
    totalDescontos,
    valorLiquidoReceber,
    percentualDescontosSobreBruto,
    prazoPagamentoTexto,
    alertaVendaFerias,
    tabelaRubricas,
  };
}
