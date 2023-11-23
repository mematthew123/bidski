// currently evertyhing is in sq ft and based on 10x10 room (100 sq ft)
export interface CostCalculationParams {
  squareFeet: number;
  primerPrice: number | null;
  tapePrice: number | null;
  rollerPrice: number | null;
  brushPrice: number | null;
  caulkPrice: number | null;
  paintPrice: number;
}

export const calculateTotalCost = ({
  squareFeet,
  primerPrice,
  tapePrice,
  rollerPrice,
  brushPrice,
  caulkPrice,
  paintPrice,
}: CostCalculationParams): number | null => {
  let additionalCosts = 0;
  const factor = squareFeet / 100; // For each 100 sq ft

  additionalCosts += factor * (rollerPrice ?? 0);
  additionalCosts += factor * (brushPrice ?? 0);
  if (primerPrice && squareFeet) {
    additionalCosts += factor * (caulkPrice ?? 0);
  }

  let primerCost = 0;
  if (primerPrice && squareFeet) {
    primerCost = (squareFeet / 100) * primerPrice;
  }

  const tapeCost = tapePrice ? tapePrice : 0;

  if (squareFeet) {
    return paintPrice + primerCost + tapeCost + additionalCosts;
  }

  return null;
};
