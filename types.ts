export interface ColorInfo {
  hex: string;
  name: string;
  description: string;
}

export interface PaletteData {
  paletteName: string;
  vibe: string;
  colors: ColorInfo[];
}

export enum ColorMode {
  CONTRAST = 'CONTRAST', // Different tones
  MONOCHROMATIC = 'MONOCHROMATIC' // Same tone
}

export type ColorCount = 3 | 5;

export interface GeneratorOptions {
  mode: ColorMode;
  count: ColorCount;
  topic: string;
}
