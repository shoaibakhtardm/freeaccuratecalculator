---
title: "How Compound Interest Works: Formula, Examples & Step-by-Step Calculations"
seoTitle: "How Compound Interest Works: Formula, Examples & Calculations"
h1: "How Compound Interest Works: Formula, Examples & Step-by-Step Calculations"
description: "Learn how compound interest works with formulas, step-by-step examples, compounding frequency comparisons, regular contributions, APY, and practical calculations."
pubDate: 2026-03-08
updatedDate: 2026-03-08
author: "Quantitative Editorial Team"
category: "finance"
tags: ["compound-interest", "financial-mathematics", "annuity", "investing", "apr-vs-apy"]
lang: "en"
relatedCalculators: ["compound-interest-calculator", "simple-interest-calculator", "investment-calculator", "inflation-calculator"]
faqs:
  - question: "How often is compound interest calculated on standard savings accounts?"
    answer: "In most retail banking institutions across the US, UK, Canada, and Australia, savings account interest compounds daily based on the end-of-day ledger balance, but is credited to the account on a monthly basis."
  - question: "What is the difference between simple interest and compound interest?"
    answer: "Simple interest is calculated solely on the original principal throughout the entire duration. Compound interest is calculated on the principal plus all interest that has previously accrued, leading to exponential growth over time."
  - question: "Does compounding frequency matter more than the interest rate?"
    answer: "The interest rate generally has a larger impact on final returns than compounding frequency. However, higher compounding frequencies provide an incremental boost. For example, on a $10,000 deposit at 7% over 10 years, shifting from annual to daily compounding adds $464.67 in total interest."
  - question: "What is the Rule of 72 and how accurate is it?"
    answer: "The Rule of 72 is an approximation to estimate doubling time by dividing 72 by the annual interest rate. It works best for rates between 5% and 12%. For exact calculations across different compounding frequencies, use the logarithmic doubling formula t = ln(2) / [n * ln(1 + r/n)]."
---

Compound interest is the fundamental mathematical engine driving wealth accumulation, capital markets, and debt amortisation. While simple interest accrues solely on the original principal balance, **compound interest accrues on both the initial principal and the accumulated interest of all previous periods**.

In mathematical terms, simple interest generates linear growth, whereas compound interest generates exponential (geometric) growth. Over short periods, the difference appears modest; over multi-year and multi-decade investment horizons, compounding fundamentally transforms your ending balance.

> **Want to calculate compound interest using your own numbers?**  
> Use our [Compound Interest Calculator](/finance/compound-interest-calculator/) to instantly calculate future value, total contributions, and interest earned across daily, monthly, and annual compounding schedules.

---

## Table of Contents
1. [What Is Compound Interest?](#what-is-compound-interest)
2. [How Compound Interest Works: Linear vs. Exponential](#how-compound-interest-works-linear-vs-exponential)
3. [The Compound Interest Formula](#the-compound-interest-formula)
4. [Simple Interest vs. Compound Interest](#simple-interest-vs-compound-interest)
5. [How Compounding Frequency Affects Growth](#how-compounding-frequency-affects-growth)
6. [Step-by-Step Worked Calculation](#step-by-step-worked-calculation)
7. [Compound Interest With Regular Contributions (Annuities)](#compound-interest-with-regular-contributions-annuities)
8. [APR vs. APY (AER): Understanding Quoted Rates](#apr-vs-apy-aer-understanding-quoted-rates)
9. [Continuous Compounding](#continuous-compounding)
10. [Inflation and Real Returns](#inflation-and-real-returns)
11. [Compound Interest on Debt](#compound-interest-on-debt)
12. [The Rule of 72 and Doubling Time](#the-rule-of-72-and-doubling-time)
13. [Common Compound Interest Mistakes](#common-compound-interest-mistakes)
14. [Frequently Asked Questions](#frequently-asked-questions)
15. [Related Calculators](#related-calculators)

---

## What Is Compound Interest?

Compound interest—often described colloquially as "interest on interest"—occurs when the interest earned on an asset is reinvested rather than withdrawn. In the subsequent period, the interest calculation applies to the larger base: the original deposit plus all preceding interest payments.

This mechanism applies across diverse financial instruments:
* **Deposit Accounts:** High-yield savings accounts, certificates of deposit (CDs), and term deposits.
* **Fixed Income:** Reinvested bond coupon distributions.
* **Equities:** Dividend reinvestment plans (DRIPs) and reinvested retained corporate earnings.
* **Consumer Debt:** Credit cards, overdraft facilities, and negative-amortisation loans (where unpaid interest capitalises onto the principal).

---

## How Compound Interest Works: Linear vs. Exponential

To see how compounding operates step-by-step, consider an initial principal of **$10,000** at a fixed **7.00% annual interest rate** over 3 consecutive years. Compare simple interest against interest compounded annually:

```
Year 1:
  Simple:   $10,000 × 7.00% = $700.00 interest  → Ending Balance: $10,700.00
  Compound: $10,000 × 7.00% = $700.00 interest  → Ending Balance: $10,700.00

Year 2:
  Simple:   $10,000 × 7.00% = $700.00 interest  → Ending Balance: $11,400.00
  Compound: $10,700 × 7.00% = $749.00 interest  → Ending Balance: $11,449.00

Year 3:
  Simple:   $10,000 × 7.00% = $700.00 interest  → Ending Balance: $12,100.00
  Compound: $11,449 × 7.00% = $801.43 interest  → Ending Balance: $12,250.43
```

In Year 1, both methods generate the exact same $700.00. In Year 2, compounding generates an extra **$49.00** because the first year's $700.00 earned 7% interest ($700 \times 0.07 = \$49.00$). By Year 3, the annual interest generated expands to **$801.43**.

### The 30-Year Compounding Horizon

Extending this comparison across 30 years demonstrates the dramatic divergence between linear and exponential curves:

* **Simple Interest:** Generates **$21,000.00** in total interest $\rightarrow$ Final Balance: **$31,000.00**
* **Compound Interest (Annual):** Generates **$66,122.55** in total interest $\rightarrow$ Final Balance: **$76,122.55**

The compound balance is **2.455 times larger** than the simple interest balance. The initial principal of $10,000 represents less than 13.2% of the final compound portfolio; the remaining 86.8% is pure accumulated interest.

---

## The Compound Interest Formula

The standard algebraic formula for calculating the future value ($A$) of a lump-sum balance subject to periodic compound interest is:

$$A = P \left(1 + \frac{r}{n}\right)^{nt}$$

### What Each Variable Means
* **$A$** = Final accumulated amount (Ending Principal + Total Interest)
* **$P$** = Initial principal balance (the starting deposit or loan amount)
* **$r$** = Nominal annual interest rate expressed as a decimal (e.g., $7\% = 0.07$)
* **$n$** = Compounding frequency per year ($n = 1$ for annual, $n = 2$ for semi-annual, $n = 4$ for quarterly, $n = 12$ for monthly, $n = 365$ for daily)
* **$t$** = Total duration in years

### Deriving the Formula
The derivation follows from sequential compounding cycles:

1. Let $i = \frac{r}{n}$ be the interest rate applied per period. After the first period:
   $$A_1 = P + P(i) = P(1 + i)$$
2. For the second period, interest accrues on the updated balance $A_1$:
   $$A_2 = A_1(1 + i) = [P(1 + i)](1 + i) = P(1 + i)^2$$
3. For period 3:
   $$A_3 = A_2(1 + i) = P(1 + i)^3$$
4. After $k$ total compounding periods, where $k = n \times t$:
   $$A = P(1 + i)^k = P\left(1 + \frac{r}{n}\right)^{nt}$$

### Isolating Total Interest Earned ($I$)
To determine the total interest produced without the principal:

$$I = A - P = P\left[\left(1 + \frac{r}{n}\right)^{nt} - 1\right] $$

---

## Simple Interest vs. Compound Interest

The core distinction between simple and compound interest lies in how the calculation base evolves:

| Attribute | Simple Interest | Compound Interest |
| :--- | :--- | :--- |
| **Calculation Base** | Fixed strictly to original principal ($P$) | Evolving base ($P$ + previously accrued interest) |
| **Mathematical Growth** | Linear ($A = P(1 + rt)$) | Geometric / Exponential ($A = P(1 + r/n)^{nt}$) |
| **Formula** | $I = P \cdot r \cdot t$ | $I = P[(1 + r/n)^{nt} - 1]$ |
| **Primary Use Cases** | Short-term loans, auto loans, Treasury bills | High-yield savings, mortgages, retirement accounts |
| **Long-Term Return** | Slower, predictable linear rate | Accelerating exponential curve |

When evaluating short-term credit or fixed-term instruments, compare simple interest calculations with compound growth using our [Simple Interest Calculator](/finance/simple-interest-calculator/).

---

## How Compounding Frequency Affects Growth

The compounding frequency ($n$) determines how often accrued interest is calculated and converted into principal. The more frequently interest compounds, the sooner new interest begins generating its own return.

### Frequency Comparison: $10,000 at 7.00% for 10 Years

The following table demonstrates the exact mathematical outcome of a **$10,000 deposit at 7.00% annual nominal interest over a 10-year term**:

| Compounding Frequency | Frequency ($n$) | Periodic Rate ($r/n$) | Total Periods ($nt$) | Future Value ($A$) | Total Interest Earned | Effective Annual Yield (APY) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Annual** | 1 | 7.0000% | 10 | **$19,671.51** | $9,671.51 | 7.0000% |
| **Semi-Annual** | 2 | 3.5000% | 20 | **$19,897.89** | $9,897.89 | 7.1225% |
| **Quarterly** | 4 | 1.7500% | 40 | **$20,015.97** | $10,015.97 | 7.1859% |
| **Monthly** | 12 | 0.5833% | 120 | **$20,096.61** | $10,096.61 | 7.2290% |
| **Daily (365)** | 365 | 0.0192% | 3,650 | **$20,136.18** | $10,136.18 | 7.2501% |
| **Continuous** | $\infty$ | Limit $\to 0$ | $\infty$ | **$20,137.53** | $10,137.53 | 7.2508% |

### Key Takeaway: Diminishing Marginal Returns
Increasing frequency from annual to monthly compounding produces an extra **$425.10** in interest. However, increasing frequency further from daily ($n=365$) to continuous compounding adds merely **$1.35** over an entire decade. Compounding frequency delivers diminishing returns once the interval reaches daily calculations.

---

## Step-by-Step Worked Calculation

To illustrate manual calculation without dedicated software, let us compute the exact return for the following scenario:
* **Initial Deposit ($P$):** $5,000.00
* **Nominal Rate ($r$):** 6.00% ($0.06$)
* **Compounding Frequency ($n$):** Quarterly ($n = 4$)
* **Term ($t$):** 3 Years

### Step 1: Calculate the Periodic Rate ($i$)
Divide the nominal annual rate by the compounding frequency:
$$i = \frac{r}{n} = \frac{0.06}{4} = 0.015 \quad (1.50\% \text{ per quarter})$$

### Step 2: Compute Total Compounding Cycles ($k$)
Multiply years by frequency:
$$k = n \times t = 4 \times 3 = 12 \text{ quarters}$$

### Step 3: Compute the Growth Factor
Add 1 to the periodic rate and raise the sum to the power of the total periods:
$$(1 + i)^k = (1 + 0.015)^{12} = (1.015)^{12} \approx 1.195618171$$

### Step 4: Multiply by Initial Principal
$$A = \$5,000.00 \times 1.195618171 = \$5,978.09$$

### Step 5: Isolate Total Interest ($I$)
$$I = \$5,978.09 - \$5,000.00 = \$978.09$$

---

## Compound Interest With Regular Contributions (Annuities)

In practical financial planning, investors rarely make a single lump-sum deposit and leave it untouched. Most savers make recurring monthly, bi-weekly, or annual contributions.

When recurring deposits are introduced, the future value formula combines lump-sum compounding with the future value of an **ordinary annuity** (contributions made at the end of each period):

$$A = P\left(1 + \frac{r}{n}\right)^{nt} + PMT \times \left[\frac{\left(1 + \frac{r}{n}\right)^{nt} - 1}{\frac{r}{n}}\right]$$

Where:
* **$PMT$** = Recurring contribution made each compounding period
* **$P$** = Initial lump-sum balance (if starting from zero, $P = 0$)
* All other variables remain as defined previously.

*(Note: If deposits occur at the beginning of each period—known as an annuity due—multiply the annuity component by $(1 + \frac{r}{n})$).*

### Worked Annuity Example: $500/Month for 20 Years
* **Initial Principal ($P$):** $0.00
* **Monthly Contribution ($PMT$):** $500.00
* **Annual Return ($r$):** 8.00% ($0.08$)
* **Compounding Frequency ($n$):** Monthly ($12$)
* **Investment Term ($t$):** 20 Years ($240$ months)

```
Periodic rate (i):       0.08 ÷ 12 = 0.006666667
Total periods (nt):      12 × 20 = 240
Growth factor:           (1 + 0.006666667)^240 = 4.926802778
Annuity multiplier:      (4.926802778 - 1) ÷ 0.006666667 = 589.0204167

Total Ending Balance:    $500.00 × 589.0204167 = $294,510.21
Total Cash Deposited:    $500.00 × 240 = $120,000.00
Total Pure Interest:     $294,510.21 - $120,000.00 = $174,510.21
```

Over 20 years, total out-of-pocket deposits equal **$120,000.00**, yet the final portfolio stands at **$294,510.21**. Compound interest accounts for **59.25%** of the entire ending portfolio. To model larger portfolio plans with varying contribution schedules, explore our [Investment Calculator](/finance/investment-calculator/).

---

## APR vs. APY (AER): Understanding Quoted Rates

Retail financial institutions quote two distinct interest rate metrics: **APR** (Annual Percentage Rate) and **APY** (Annual Percentage Yield, referred to as **AER** or Annual Equivalent Rate in the UK and Australia).

* **APR (Nominal Rate):** The stated annual rate without accounting for intra-year compounding. Lenders display APR for mortgages, auto loans, and credit cards because the nominal percentage appears lower.
* **APY / AER (Effective Rate):** The true annual yield taking into account the effect of compounding over a one-year period. Deposit institutions promote APY for savings accounts and CDs because the effective figure is higher than the nominal rate.

### The Conversion Formula
To convert a nominal APR ($r$) compounded $n$ times per year into an effective APY:

$$\text{APY} = \left(1 + \frac{r}{n}\right)^n - 1$$

#### Practical Example
Consider a savings account advertising a **5.00% nominal rate with daily compounding ($n = 365$)**:

$$\text{APY} = \left(1 + \frac{0.05}{365}\right)^{365} - 1 = (1.000136986)^{365} - 1 = 1.051267 - 1 = 5.127\%$$

A $100,000 deposit does not generate $5,000.00 in interest over 12 months; it generates **$5,126.75** due to the daily reinvestment of accrued interest.

---

## Continuous Compounding

As the compounding frequency $n$ increases without bound ($n \to \infty$), the compounding intervals become infinitesimal. Mathematically, the limit of $(1 + \frac{r}{n})^{nt}$ as $n \to \infty$ evaluates to Euler's constant $e \approx 2.718281828$:

$$A = P \cdot e^{rt}$$

### Example
For a $10,000 investment at 7.00% for 10 years with continuous compounding:
$$A = 10,000 \cdot e^{(0.07 \times 10)} = 10,000 \cdot e^{0.7} = 10,000 \times 2.013752707 = \$20,137.53$$

Continuous compounding represents the mathematical upper limit of interest accumulation for a given nominal rate.

---

## Inflation and Real Returns

Inflation works in reverse against purchasing power. If an investment earns a **6.00% nominal return** while consumer price inflation averages **3.50%**, the real purchasing power expansion is not simply $6.00\% - 3.50\% = 2.50\%$.

The exact relationship between nominal growth, inflation, and real purchasing power is defined by the **Fisher Equation**:

$$1 + r_{\text{real}} = \frac{1 + r_{\text{nominal}}}{1 + i_{\text{inflation}}}$$

$$r_{\text{real}} = \frac{1 + 0.060}{1 + 0.035} - 1 = \frac{1.060}{1.035} - 1 = 0.02415 \quad (2.415\%)$$

The true real return is **2.415%**, slightly lower than the intuitive subtraction rule of thumb. Over multi-decade investment horizons, calculating real returns rather than nominal returns ensures that long-term purchasing power is preserved. Understand how inflation affects your future purchasing power with our [Inflation Calculator](/finance/inflation-calculator/).

---

## Compound Interest on Debt

Compounding accelerates wealth creation for savers, but it works equally aggressively against borrowers on revolving debt facilities.

Credit cards in particular calculate finance charges on a daily compounding basis. If an individual maintains an unpaid balance of **$8,000** at a **24.99% APR**:
* The daily periodic rate is: $\frac{0.2499}{365} \approx 0.00068466$ ($0.068466\%$ per day).
* Compounded daily over 365 days, the effective annual interest rate (APY) reaches **28.36%**.

When borrowers make only minimum payments, the payments primarily cover accrued interest rather than principal amortization. As a result, the loan balance remains elevated, prolonging the payoff timeline and substantially increasing the total interest paid over the life of the debt.

---

## The Rule of 72 and Doubling Time

The **Rule of 72** is a popular mental arithmetic heuristic used to approximate the number of years ($t$) required for an investment to double at a fixed annual compound rate ($R\%$):

$$t \approx \frac{72}{R}$$

For instance, an asset growing at an 8% annual compound return doubles in approximately $\frac{72}{8} = 9\text{ years}$.

### Limits of the Heuristic
The Rule of 72 is derived from the natural logarithm of 2 ($\ln(2) \approx 0.69315$). For interest rates between 5% and 12%, 72 provides a convenient approximation with minimal error because 72 has numerous integer factors (2, 3, 4, 6, 8, 9, 12). For rates exceeding 15% or below 3%, the approximation diverges.

### The Exact Doubling Formula
To calculate exact doubling time across any compounding frequency $n$:

$$t = \frac{\ln(2)}{n \cdot \ln\left(1 + \frac{r}{n}\right)}$$

For annual compounding ($n = 1$):
$$t = \frac{\ln(2)}{\ln(1 + r)}$$

For example, at an 8% annual rate compounded annually ($r = 0.08, n = 1$):
$$t = \frac{0.693147}{\ln(1.08)} = \frac{0.693147}{0.076961} \approx 9.006 \text{ years}$$

---

## Common Compound Interest Mistakes

When modeling long-term projections or comparing lending products, avoid these common mathematical pitfalls:

1. **Confusing APR with APY:** Quoted APR ignores compounding. Comparing a 5.00% daily-compounded CD (5.127% APY) with a 5.10% annual-compounded instrument requires converting both to APY.
2. **Overlooking the Annual Tax Drag:** In many tax jurisdictions (such as the United States), interest earned in standard taxable accounts is subject to annual income tax, which reduces the effective reinvestment rate. Conversely, tax-advantaged retirement accounts—such as 401(k)s and IRAs in the US, ISAs in the UK, or TFSAs and RRSPs in Canada—allow interest to compound without annual tax drag. Compounding $50,000 at 7% over 25 years tax-deferred yields **$271,371.63**, compared to **$182,786.11** if subject to a 24% annual tax drag (5.32% net rate)—a difference of **$88,585.52**.
3. **Assuming Fixed Steady Returns in Volatile Assets:** Deterministic compound interest formulas assume an identical rate every single year. In equity markets, volatility and the sequence of returns can substantially alter final balances, particularly when regular withdrawals occur.
4. **Neglecting Contribution Timing:** Contributing $500 at the beginning of each month (annuity due) versus the end of each month (ordinary annuity) compounds for an additional month every cycle, generating thousands of dollars in extra interest over a multi-decade horizon.

> **Ready to calculate your own scenario?**  
> Use our [Compound Interest Calculator](/finance/compound-interest-calculator/) to test custom initial deposits, recurring contribution schedules, interest rates, and compounding frequencies.

---

## Frequently Asked Questions

### How often is compound interest calculated on standard savings accounts?
In most retail banking institutions across the US, UK, Canada, and Australia, savings account interest compounds daily based on the end-of-day ledger balance, but is credited to the account on a monthly basis.

### What is the difference between simple interest and compound interest?
Simple interest is calculated solely on the original principal throughout the entire duration. Compound interest is calculated on the principal plus all interest that has previously accrued, leading to exponential growth over time.

### Does compounding frequency matter more than the interest rate?
The interest rate generally has a larger impact on final returns than compounding frequency. However, higher compounding frequencies provide an incremental boost. For example, on a $10,000 deposit at 7% over 10 years, shifting from annual to daily compounding adds $464.67 in total interest.

### What is the Rule of 72 and how accurate is it?
The Rule of 72 is an approximation to estimate doubling time by dividing 72 by the annual interest rate. It works best for rates between 5% and 12%. For exact calculations across different compounding frequencies, use the logarithmic doubling formula $t = \frac{\ln(2)}{n \cdot \ln(1 + r/n)}$.

---

## Related Calculators

Explore our other precision calculators to model personal finance, debt management, and investment returns:

* **[Compound Interest Calculator](/finance/compound-interest-calculator/)**: Calculate compound growth with customizable frequencies and regular contributions.
* **[Simple Interest Calculator](/finance/simple-interest-calculator/)**: Compare standard linear interest calculations against exponential compound growth.
* **[Investment Calculator](/finance/investment-calculator/)**: Model long-term portfolio growth, expected returns, and compound annual growth rates (CAGR).
* **[Inflation Calculator](/finance/inflation-calculator/)**: Measure how inflation erodes the purchasing power of money over time.

---

*Disclaimer: This guide is provided for educational and informational purposes only and does not constitute financial, legal, investment, or tax advice. For personalized financial structuring, consult a certified financial planner or qualified tax professional.*
