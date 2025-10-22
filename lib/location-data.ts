export const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
]

export const statesByCountry: Record<string, { value: string; label: string }[]> = {
  us: [
    { value: "ca", label: "California" },
    { value: "ny", label: "New York" },
    { value: "tx", label: "Texas" },
    { value: "fl", label: "Florida" },
    { value: "il", label: "Illinois" },
    { value: "pa", label: "Pennsylvania" },
    { value: "oh", label: "Ohio" },
    { value: "ga", label: "Georgia" },
    { value: "nc", label: "North Carolina" },
    { value: "mi", label: "Michigan" },
  ],
  ca: [
    { value: "on", label: "Ontario" },
    { value: "qc", label: "Quebec" },
    { value: "bc", label: "British Columbia" },
    { value: "ab", label: "Alberta" },
  ],
  uk: [
    { value: "eng", label: "England" },
    { value: "sct", label: "Scotland" },
    { value: "wal", label: "Wales" },
    { value: "nir", label: "Northern Ireland" },
  ],
  au: [
    { value: "nsw", label: "New South Wales" },
    { value: "vic", label: "Victoria" },
    { value: "qld", label: "Queensland" },
    { value: "wa", label: "Western Australia" },
  ],
}

export const citiesByState: Record<string, { value: string; label: string }[]> = {
  ca: [
    { value: "los-angeles", label: "Los Angeles" },
    { value: "san-francisco", label: "San Francisco" },
    { value: "san-diego", label: "San Diego" },
    { value: "sacramento", label: "Sacramento" },
  ],
  ny: [
    { value: "new-york-city", label: "New York City" },
    { value: "buffalo", label: "Buffalo" },
    { value: "rochester", label: "Rochester" },
    { value: "albany", label: "Albany" },
  ],
  tx: [
    { value: "houston", label: "Houston" },
    { value: "dallas", label: "Dallas" },
    { value: "austin", label: "Austin" },
    { value: "san-antonio", label: "San Antonio" },
  ],
  // Add more cities as needed
}
