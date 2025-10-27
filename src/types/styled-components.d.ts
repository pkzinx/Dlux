import theme from '~styles/theme';

type Theme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// Fix for React 17 compatibility with newer TypeScript versions
declare module 'react' {
  interface Attributes {
    key?: string | number | null;
  }
}
