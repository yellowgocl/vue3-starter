import { defineConfig, presetAttributify, presetUno, presetTypography } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|html)($|\?)/],
    },
  },
  presets: [
    presetUno(), 
    presetAttributify(), 
    presetRemToPx({ baseFontSize: 16 }),
    presetTypography()
  ],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['f-s-c', 'flex justify-start items-center'],
    ['flex-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
    ['absolute-center', 'absolute-lt f-c-c wh-full'],
    ['text-ellipsis', 'truncate'],
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    [
      'card-shadow',
      { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' },
    ],
  ],
  theme: {
    breakpoints: {
      'xs': '320px',
      'sm': '480px',
      'md': '640px',
      'lg': '960px',
    },
    fontSize: {
      xs: '0.5rem',
      sm: '0.75rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'sm-title': '1rem',
      'base-title': '1.25rem',
      'xl-title': '1.563rem',
    },
    colors: {
      divider_Light: "0x232323",
      primary: 'var(--primary-color)',
      primary_hover: 'var(--primary-color-hover)',
      primary_pressed: 'var(--primary-color-pressed)',
      primary_active: 'var(--primary-color-active)',
      info: 'var(--info-color)',
      info_hover: 'var(--info-color-hover)',
      info_pressed: 'var(--info-color-pressed)',
      info_active: 'var(--info-color-active)',
      success: 'var(--success-color)',
      success_hover: 'var(--success-color-hover)',
      success_pressed: 'var(--success-color-pressed)',
      success_active: 'var(--success-color-active)',
      warning: 'var(--warning-color)',
      warning_hover: 'var(--warning-color-hover)',
      warning_pressed: 'var(--warning-color-pressed)',
      warning_active: 'var(--warning-color-active)',
      error: 'var(--error-color)',
      error_hover: 'var(--error-color-hover)',
      error_pressed: 'var(--error-color-pressed)',
      error_active: 'var(--error-color-active)',
      dark: '#18181c',
    },
  },
})