export interface Language {
  id: number;
  name: string;
  nativeName: string;
  flag: string;
  code: string; // language code e.g. "en"
  accents: Accent[];
}

export interface Accent {
  id: number;
  name: string;
  nativeName: string;
  flag: string;
  code: string; // country_code e.g. 'us', 'mx', 'gb', 'es', 'fr'
}
