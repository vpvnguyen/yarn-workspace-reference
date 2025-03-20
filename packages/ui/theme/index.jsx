import { ThemeProvider as EmotionThemeProvider, useTheme } from '@emotion/react'

export const theme = {
  colors: {
    primary: 'hotpink'
  }
}

export const ThemeProvider = ({ children }) => {
  return (
  <EmotionThemeProvider theme={theme}>
    {children}
  </EmotionThemeProvider>
  )
}