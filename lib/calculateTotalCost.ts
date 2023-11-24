// This is where the actual calculation happens. The calculateTotalCost function
// takes in an object of parameters and returns a number. The parameters are
// passed in from the useCalculateTotalCost hook. The hook is used in the
// ProductCard component to calculate the total cost of the product.

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
  if (!squareFeet) return null;

  const factor = squareFeet / 100; // For each 100 sq ft

  let additionalCosts = 0;
  additionalCosts += factor * (rollerPrice ?? 0);
  additionalCosts += factor * (brushPrice ?? 0);
  additionalCosts += factor * (caulkPrice ?? 0); // Moved outside the primerPrice condition

  let primerCost = primerPrice ? factor * primerPrice : 0;
  let tapeCost = tapePrice ? tapePrice : 0;

  return paintPrice + primerCost + tapeCost + additionalCosts;
};
