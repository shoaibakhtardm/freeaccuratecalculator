---
title: "Cómo Funciona el Interés Compuesto: Fórmulas, Ejemplos y Cálculos Paso a Paso"
seoTitle: "Cómo Funciona el Interés Compuesto: Fórmulas y Cálculos Prácticos"
h1: "Cómo Funciona el Interés Compuesto: Fórmulas, Ejemplos y Cálculos Paso a Paso"
description: "Aprenda cómo opera el interés compuesto con fórmulas rigurosas, ejemplos paso a paso, frecuencias de capitalización, aportaciones periódicas, TAE y cálculos prácticos."
pubDate: 2026-03-08
updatedDate: 2026-03-08
author: "Equipo Editorial Cuantitativo"
category: "finance"
tags: ["interes-compuesto", "matematicas-financieras", "anualidades", "inversion"]
lang: "es"
relatedCalculators: ["compound-interest-calculator", "simple-interest-calculator", "investment-calculator", "inflation-calculator"]
faqs:
  - question: "¿Con qué frecuencia se calcula el interés compuesto en cuentas bancarias estándar?"
    answer: "En la mayoría de las entidades financieras internacionales, los intereses de las cuentas de ahorro se devengan diariamente sobre el saldo final y se abonan mensualmente."
  - question: "¿Cuál es la diferencia entre el interés simple y el interés compuesto?"
    answer: "El interés simple se calcula únicamente sobre el capital original. El interés compuesto reinvierte los intereses devengados, generando crecimiento exponencial sobre el capital acumulado."
  - question: "¿Qué es la Regla del 72 y cuál es su precisión?"
    answer: "La Regla del 72 es una estimación mental del tiempo necesario para duplicar una inversión dividiendo 72 entre la tasa de interés anual. Funciona con alta precisión entre el 5% y el 12%."
---

El interés compuesto es el motor matemático fundamental de la acumulación de riqueza y de los mercados de capitales. Mientras que el interés simple se devenga exclusivamente sobre el saldo de capital original, **el interés compuesto se calcula sobre el capital inicial más los intereses acumulados de los períodos anteriores**.

En términos matemáticos, el interés simple genera un crecimiento lineal, mientras que el interés compuesto genera un crecimiento exponencial (geométrico).

> **¿Desea simular su propio escenario financiero?**  
> Utilice nuestra [Calculadora de Interés Compuesto](/finance/compound-interest-calculator/) para proyectar el valor futuro, el total aportado y los intereses generados.

---

## La Fórmula Matemática Fundamental

La fórmula algebraica universal para determinar el valor futuro ($A$) de una inversión con capitalización periódica es:

$$A = P \left(1 + \frac{r}{n}\right)^{nt}$$

### Significado de Cada Variable
* **$A$**: Monto acumulado final (Capital inicial + Intereses totales)
* **$P$**: Capital principal inicial
* **$r$**: Tasa de interés nominal anual en formato decimal (ejemplo: $7\% = 0.07$)
* **$n$**: Frecuencia de capitalización anual ($1$ = anual, $2$ = semestral, $4$ = trimestral, $12$ = mensual, $365$ = diaria)
* **$t$**: Plazo total en años

---

## Interés Compuesto con Aportaciones Periódicas (Anualidades)

Cuando se incorporan aportaciones regulares al final de cada período (anualidad ordinaria), la fórmula combina el crecimiento del capital inicial con la serie de depósitos:

$$A = P\left(1 + \frac{r}{n}\right)^{nt} + PMT \times \left[\frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}}\right]$$

Donde **$PMT$** representa la aportación recurrente realizada en cada ciclo de capitalización.

---

## Capitalización Continua

Cuando la frecuencia de capitalización tiende al infinito ($n \to \infty$), el límite matemático converge a la constante de Euler ($e \approx 2.71828$):

$$A = P \cdot e^{rt}$$

---

*Aviso legal: Esta guía se proporciona con fines educativos e informativos y no constituye asesoramiento financiero, legal o fiscal formal.*
