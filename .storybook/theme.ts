import { create } from 'storybook/theming';

/**
 * Palette mirrors the `:root` custom properties shipped by
 * @krgaa/react-developer-burger-ui-components. Storybook's theme is plain
 * JavaScript consumed by emotion, so it cannot read CSS variables and the
 * values have to be repeated here.
 */
const PAGE_BACKGROUND = '#131316';
const SURFACE_BACKGROUND = '#1c1c21';
const ELEMENT_BACKGROUND = '#2f2f37';
const TEXT_PRIMARY = '#f2f2f3';
const TEXT_MUTED = '#8585ad';
const ACCENT = '#4c4cff';
const ACCENT_SECONDARY = '#801ab3';
const FONT_STACK = "'Jet Brains Mono', 'JetBrains Mono', monospace";

export const appTheme = create({
  base: 'dark',

  colorPrimary: ACCENT_SECONDARY,
  colorSecondary: ACCENT,

  appBg: PAGE_BACKGROUND,
  appContentBg: PAGE_BACKGROUND,
  appPreviewBg: PAGE_BACKGROUND,
  appHoverBg: ELEMENT_BACKGROUND,
  appBorderColor: ELEMENT_BACKGROUND,
  appBorderRadius: 8,

  fontBase: FONT_STACK,
  fontCode: FONT_STACK,

  textColor: TEXT_PRIMARY,
  textInverseColor: PAGE_BACKGROUND,
  textMutedColor: TEXT_MUTED,

  barBg: SURFACE_BACKGROUND,
  barTextColor: TEXT_MUTED,
  barHoverColor: ACCENT,
  barSelectedColor: TEXT_PRIMARY,

  buttonBg: SURFACE_BACKGROUND,
  buttonBorder: ELEMENT_BACKGROUND,

  booleanBg: SURFACE_BACKGROUND,
  booleanSelectedBg: ACCENT,

  inputBg: SURFACE_BACKGROUND,
  inputBorder: ELEMENT_BACKGROUND,
  inputTextColor: TEXT_PRIMARY,
  inputBorderRadius: 4,

  brandTitle: 'Stellar Burger'
});
