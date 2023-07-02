const tokens = {
  "colors.purple.default": {
    "value": "#633CFF",
    "variable": "var(--colors-purple-default)"
  },
  "colors.purple.hover": {
    "value": "#BEADFF",
    "variable": "var(--colors-purple-hover)"
  },
  "colors.purple.light": {
    "value": "#EFEBFF",
    "variable": "var(--colors-purple-light)"
  },
  "colors.borders": {
    "value": "#D9D9D9",
    "variable": "var(--colors-borders)"
  },
  "colors.grey.default": {
    "value": "#333333",
    "variable": "var(--colors-grey-default)"
  },
  "colors.grey.normal": {
    "value": "#737373",
    "variable": "var(--colors-grey-normal)"
  },
  "colors.grey.light": {
    "value": "#FAFAFA",
    "variable": "var(--colors-grey-light)"
  },
  "colors.white": {
    "value": "#FFFFFF",
    "variable": "var(--colors-white)"
  },
  "colors.red": {
    "value": "#FF3939",
    "variable": "var(--colors-red)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "colors.colorPalette.default": {
    "value": "var(--colors-color-palette-default)",
    "variable": "var(--colors-color-palette-default)"
  },
  "colors.colorPalette.hover": {
    "value": "var(--colors-color-palette-hover)",
    "variable": "var(--colors-color-palette-hover)"
  },
  "colors.colorPalette.light": {
    "value": "var(--colors-color-palette-light)",
    "variable": "var(--colors-color-palette-light)"
  },
  "colors.colorPalette.normal": {
    "value": "var(--colors-color-palette-normal)",
    "variable": "var(--colors-color-palette-normal)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar