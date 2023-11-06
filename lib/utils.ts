import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interface Material {
//   paint_price: number;
//   primer_price: number;
// }

// export function calculateMaterialCosts(
//   squareFeet: number,
//   material: Material
// ): number {
//   const paintQuantity = Math.ceil(squareFeet / 400);
//   const primerQuantity = Math.ceil(squareFeet / 350);

//   // Calculate the cost for each material
//   const paintCost = paintQuantity * material.paint_price;
//   const primerCost = primerQuantity * material.primer_price;

//   // Sum up the total cost
//   const totalCost = paintCost + primerCost;
//   return totalCost;
// }
