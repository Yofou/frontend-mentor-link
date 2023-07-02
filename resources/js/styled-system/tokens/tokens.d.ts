/* eslint-disable */
export type Token = "colors.purple.default" | "colors.purple.hover" | "colors.purple.light" | "colors.borders" | "colors.grey.default" | "colors.grey.normal" | "colors.grey.light" | "colors.white" | "colors.red" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "colors.colorPalette.default" | "colors.colorPalette.hover" | "colors.colorPalette.light" | "colors.colorPalette.normal"

export type ColorPalette = "purple" | "grey"

export type ColorToken = "purple.default" | "purple.hover" | "purple.light" | "borders" | "grey.default" | "grey.normal" | "grey.light" | "white" | "red" | "colorPalette.default" | "colorPalette.hover" | "colorPalette.light" | "colorPalette.normal"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type Tokens = {
		colors: ColorToken
		breakpoints: BreakpointToken
		sizes: SizeToken
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"