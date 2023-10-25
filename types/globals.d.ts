// for the 1build Widget
// globals.d.ts
interface Window {
  onebuild?: {
    init: (options: { key: string }) => void;
    open: (options?: {
      closeOnRateSelected?: boolean;
      requestBrowserLocation?: boolean;
      searchTerm?: string;
      location?: {
        county: string;
        state: string;
      };
      sourceTypeFilter?: string[];
      typeaheadDelay?: number;
    }) => void;
  };
}
