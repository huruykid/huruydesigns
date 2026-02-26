

## Plan: Vary benefit plan costs in BenefitsModuleDemo

**File:** `src/components/case-study/BenefitsModuleDemo.tsx`

Update the `PLANS` array (lines 15-25) with realistic, varied costs:
- Medical: $156.40
- Dental: $18.50
- Long Term Disability: $12.80
- Vision: $8.25
- Basic Life: $0.00 (employer-paid)
- HSA Wellcare: $125.00
- Voluntary Life: $24.60
- Spouse Voluntary Life: $14.30
- Dependent Voluntary Life: $9.75
- Keep waived items as "Waived"

Also update the enrollment review summary (line 123) to show "Medical: $156.40", "Dental: $18.50" instead of the current $32.00 values.

