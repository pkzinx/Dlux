import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import theme from '~src/styles/theme';

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  // @ts-ignore
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
