export interface CostCalculationParams {
  squareFeet: number;
  primerPrice: number | null;
  tapePrice: number | null;
  rollerPrice: number | null;
  brushPrice: number | null;
  caulkPrice: number | null;
  paintPrice: number;
  dropSheetsPrice: number | null;
  cleaningSuppliesPrice: number | null;
}

export const calculateTotalCost = ({
  squareFeet,
  primerPrice,
  tapePrice,
  rollerPrice,
  brushPrice,
  caulkPrice,
  paintPrice,
  dropSheetsPrice,
  cleaningSuppliesPrice,
}: CostCalculationParams): number | null => {
  if (!squareFeet) return null;

  const factor = squareFeet / 100; // For each 100 sq ft

  let totalCost = 0;
  totalCost += factor * (primerPrice ?? 0);
  totalCost += factor * (tapePrice ?? 0);
  totalCost += factor * (rollerPrice ?? 0);
  totalCost += factor * (brushPrice ?? 0);
  totalCost += factor * (caulkPrice ?? 0);
  totalCost += factor * (paintPrice ?? 0); // Now scaling paint price
  totalCost += factor * (dropSheetsPrice ?? 0);
  totalCost += factor * (cleaningSuppliesPrice ?? 0);

  return totalCost;
};
