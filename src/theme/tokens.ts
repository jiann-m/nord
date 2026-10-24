// The Nord palette: black, warm off-white and warm grey, in two modes.
// Every colour has a name (what it is used for) and a value for each mode.
export const themes = {
  dark: {
    page: '#000000', // black page
    card: '#1C1917', // cards and inputs
    line: '#44403C', // borders
    track: '#292524', // empty part of a progress bar
    ink: '#F2EEE3', // titles, buttons, links (warm off-white)
    onInk: '#000000', // text on an ink button
    body: '#D6D3D1', // normal text
    muted: '#A8A29E', // small grey text, placeholders
    danger: '#FDA4AF', // errors
  },
  light: {
    page: '#F2EEE3',
    card: '#FFFFFF',
    line: '#D6D3D1',
    track: '#E7E5E4',
    ink: '#0C0A09',
    onInk: '#F2EEE3',
    body: '#44403C',
    muted: '#78716C',
    danger: '#E11D48',
  },
} as const;

export type ThemeName = keyof typeof themes;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radius = { sm: 8, md: 14, pill: 999 } as const;