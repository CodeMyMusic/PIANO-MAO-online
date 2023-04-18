import { colorScheme } from 'simpler-color';

const baseColors = {
    primary: '#005cc5',
    neutral: '#7b838c'
}

const scheme = colorScheme(
    baseColors,
    colors => ({
      primaryButton: colors.primary(40),
      primaryButtonText: colors.primary(95),
      surface: colors.neutral(98),
      text: colors.neutral(10),
    }),
  )

export default scheme