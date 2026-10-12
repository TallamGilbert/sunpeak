import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isValidEmail,
  isValidPhone,
  validateContact,
  validateQuote,
  type QuoteFields,
} from "./leads.ts";

const validQuote: QuoteFields = {
  fullName: "Test Person",
  phone: "0712 345 678",
  email: "",
  propertyType: "Home / residence",
  location: "Nakuru",
  energyConcern: "Power outages and backup",
  solution: "not-sure",
  monthlyBill: "",
  backup: "essential",
  notes: "",
  consent: true,
};

describe("isValidPhone", () => {
  it("accepts common Kenyan and international formats", () => {
    for (const p of ["0712345678", "0712 345 678", "+254712345678", "254 712 345 678", "0110 123 456", "020 1234567", "+44 20 7946 0958"]) {
      assert.equal(isValidPhone(p), true, p);
    }
  });

  it("rejects malformed numbers", () => {
    for (const p of ["12345", "07123", "abc", "+254 12", "071234567890"]) {
      assert.equal(isValidPhone(p), false, p);
    }
  });
});

describe("isValidEmail", () => {
  it("accepts typical addresses and rejects malformed ones", () => {
    assert.equal(isValidEmail("name@example.co.ke"), true);
    assert.equal(isValidEmail("name@example"), false);
    assert.equal(isValidEmail("name example.com"), false);
  });
});

describe("validateQuote", () => {
  it("passes a complete minimal request", () => {
    assert.deepEqual(validateQuote(validQuote), {});
  });

  it("flags missing required fields and consent", () => {
    const e = validateQuote({ ...validQuote, fullName: "", phone: "", location: "", consent: false, propertyType: "" });
    assert.ok(e.fullName && e.phone && e.location && e.consent && e.propertyType);
  });

  it("validates optional fields only when provided", () => {
    assert.ok(validateQuote({ ...validQuote, email: "bad" }).email);
    assert.ok(validateQuote({ ...validQuote, monthlyBill: "-10" }).monthlyBill);
    assert.equal(validateQuote({ ...validQuote, monthlyBill: "12,000" }).monthlyBill, undefined);
  });

  it("rejects values outside the option lists", () => {
    assert.ok(validateQuote({ ...validQuote, solution: "nuclear" }).solution);
    assert.ok(validateQuote({ ...validQuote, backup: "everything" }).backup);
  });
});

describe("validateContact", () => {
  const base = { fullName: "Test", phone: "", email: "", enquiryType: "General enquiry", message: "Hello, I have a question.", consent: true };

  it("requires at least one contact method", () => {
    const e = validateContact(base);
    assert.ok(e.phone && e.email);
    assert.deepEqual(validateContact({ ...base, email: "a@b.co" }), {});
  });
});
