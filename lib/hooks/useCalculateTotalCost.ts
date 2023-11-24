// This hook is used to calculate the total cost of a product based on the
// parameters passed in.

import { useMemo } from 'react';
import {
  calculateTotalCost,
  CostCalculationParams,
} from '@/lib/calculateTotalCost';

const useCalculateTotalCost = (params: CostCalculationParams) => {
  const totalCost = useMemo(() => {
    return calculateTotalCost(params);
  }, [params]);

  return totalCost;
};

export default useCalculateTotalCost;
