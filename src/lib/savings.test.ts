import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  calculateSavings,
  formatKES,
  formatYears,
  parseAmount,
  validateSavingsInput,
} from "./savings.ts";

const raw = (overrides: Partial<Record<string, string>> = {}) => ({
  monthlyBill: "10000",
  offsetPercent: "40",
  systemCost: "",
  annualMaintenance: "",
  ...overrides,
});

describe("calculateSavings", () => {
  it("applies the documented formulas", () => {
    const r = calculateSavings({ monthlyBill: 10_000, offsetPercent: 40 });
    assert.equal(r.monthlyReduction, 4_000);
    assert.equal(r.annualReduction, 48_000);
    assert.equal(r.remainingMonthlyBill, 6_000);
    assert.deepEqual(r.payback, { status: "needs-cost" });
  });

  it("calculates simple payback net of maintenance", () => {
    const r = calculateSavings({
      monthlyBill: 20_000,
      offsetPercent: 50,
      systemCost: 600_000,
      annualMaintenance: 20_000,
    });
    // annual reduction 120,000 − maintenance 20,000 = 100,000 → 6 years
    assert.equal(r.payback.status, "ok");
    if (r.payback.status === "ok") {
      assert.equal(r.payback.years, 6);
      assert.equal(r.payback.netAnnualBenefit, 100_000);
    }
  });

  it("treats missing maintenance as zero", () => {
    const r = calculateSavings({ monthlyBill: 10_000, offsetPercent: 50, systemCost: 120_000 });
    assert.equal(r.payback.status, "ok");
    if (r.payback.status === "ok") assert.equal(r.payback.years, 2);
  });

  it("reports no payback when maintenance equals the annual reduction", () => {
    const r = calculateSavings({
      monthlyBill: 10_000,
      offsetPercent: 10,
      systemCost: 100_000,
      annualMaintenance: 12_000,
    });
    assert.deepEqual(r.payback, { status: "not-positive", netAnnualBenefit: 0 });
  });

  it("reports no payback when maintenance exceeds the annual reduction", () => {
    const r = calculateSavings({
      monthlyBill: 5_000,
      offsetPercent: 10,
      systemCost: 100_000,
      annualMaintenance: 10_000,
    });
    assert.equal(r.payback.status, "not-positive");
  });

  it("reports no payback at a 0% offset", () => {
    const r = calculateSavings({ monthlyBill: 5_000, offsetPercent: 0, systemCost: 100_000 });
    assert.equal(r.payback.status, "not-positive");
    assert.equal(r.remainingMonthlyBill, 5_000);
  });

  it("handles a 100% offset", () => {
    const r = calculateSavings({ monthlyBill: 7_500, offsetPercent: 100 });
    assert.equal(r.remainingMonthlyBill, 0);
    assert.equal(r.annualReduction, 90_000);
  });

  it("asks for a cost when system cost is zero", () => {
    const r = calculateSavings({ monthlyBill: 5_000, offsetPercent: 50, systemCost: 0 });
    assert.deepEqual(r.payback, { status: "needs-cost" });
  });
});

describe("parseAmount", () => {
  it("parses plain and formatted numbers", () => {
    assert.equal(parseAmount("12500"), 12_500);
    assert.equal(parseAmount("12,500"), 12_500);
    assert.equal(parseAmount(" 12 500 "), 12_500);
    assert.equal(parseAmount("KES 8,000"), 8_000);
    assert.equal(parseAmount("0.5"), 0.5);
  });

  it("returns null for blank input and NaN for invalid input", () => {
    assert.equal(parseAmount(""), null);
    assert.equal(parseAmount("   "), null);
    assert.ok(Number.isNaN(parseAmount("abc")));
    assert.ok(Number.isNaN(parseAmount("1e5")));
    assert.ok(Number.isNaN(parseAmount("12-3")));
  });
});

describe("validateSavingsInput", () => {
  it("accepts valid input and leaves optional fields undefined", () => {
    const v = validateSavingsInput(raw());
    assert.equal(v.ok, true);
    if (v.ok) {
      assert.equal(v.input.monthlyBill, 10_000);
      assert.equal(v.input.systemCost, undefined);
      assert.equal(v.input.annualMaintenance, undefined);
    }
  });

  it("requires a monthly bill", () => {
    const v = validateSavingsInput(raw({ monthlyBill: "" }));
    assert.equal(v.ok, false);
    if (!v.ok) assert.ok(v.errors.monthlyBill);
  });

  it("rejects negative and zero bills", () => {
    for (const bill of ["-500", "0"]) {
      const v = validateSavingsInput(raw({ monthlyBill: bill }));
      assert.equal(v.ok, false, bill);
    }
  });

  it("rejects out-of-range percentages", () => {
    for (const pct of ["-1", "101", "abc", ""]) {
      const v = validateSavingsInput(raw({ offsetPercent: pct }));
      assert.equal(v.ok, false, pct);
      if (!v.ok) assert.ok(v.errors.offsetPercent);
    }
  });

  it("accepts boundary percentages", () => {
    assert.equal(validateSavingsInput(raw({ offsetPercent: "0" })).ok, true);
    assert.equal(validateSavingsInput(raw({ offsetPercent: "100" })).ok, true);
  });

  it("rejects negative optional costs", () => {
    const v = validateSavingsInput(raw({ systemCost: "-1", annualMaintenance: "-5" }));
    assert.equal(v.ok, false);
    if (!v.ok) {
      assert.ok(v.errors.systemCost);
      assert.ok(v.errors.annualMaintenance);
    }
  });
});

describe("formatting", () => {
  it("formats Kenyan shillings without decimals", () => {
    const s = formatKES(12_500.4);
    assert.match(s, /12,500/);
    assert.match(s, /Ksh|KES/);
  });

  it("formats payback periods", () => {
    assert.equal(formatYears(6), "6 years");
    assert.equal(formatYears(1), "1 year");
    assert.equal(formatYears(6.44), "6.4 years");
    assert.equal(formatYears(0.5), "6 months");
    assert.equal(formatYears(0.01), "1 month");
  });
});
