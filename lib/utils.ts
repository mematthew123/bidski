import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TotalProjectCost = {
  paint_price: number;
  primer_price: number;
  squareFeet: number;
  tape_price: number;
  drop_sheet_price: number;
  roller_price: number;
  brush_price: number;
  cleaning_price: number;
};

export function calculateTotalProjectCost({
  paint_price,
  primer_price,
  squareFeet,
  tape_price,
  drop_sheet_price,
  roller_price,
  brush_price,
  cleaning_price,
}: TotalProjectCost): number {
  const paintQuantity = Math.ceil(squareFeet / 400);
  const primerQuantity = Math.ceil(squareFeet / 350);

  // Calculate the cost for each material
  const paintCost = paintQuantity * paint_price;
  const primerCost = primerQuantity * primer_price;

  // Calculate the cost for tape, brushes, and rollers (2 each)
  const tapeCost = 2 * tape_price;
  const brushCost = 2 * brush_price;
  const rollerCost = 2 * roller_price;

  // Sum up the total cost
  const totalCost =
    paintCost +
    primerCost +
    tapeCost +
    drop_sheet_price +
    rollerCost +
    brushCost +
    cleaning_price;

  return totalCost;
}
