import type { SnackOptions } from '@snackbar/core'
import { createSnackbar } from '@snackbar/core'
import '@snackbar/core/dist/snackbar.css'

export const useSnackbar = (text: string, { theme, position, timeout }: SnackOptions) => {
  createSnackbar(text, {
    theme,
    position,
    timeout,
  })
}
