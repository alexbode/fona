export interface Language {
  id: number;
  name: string;
  nativeName: string;
  flag: string;
  code: string;
  accents: Accent[];
}

export interface Accent {
  id: number;
  name: string;
  flag: string;
}
