export const pxToRem = (value) => {
  return `${value / 16}rem`;
};

function responsiveFontSizes({ sm, md, lg }) {
  return {
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:2000px)": {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = "Inter"; // Google Font
// const FONT_SECONDARY = 'CircularStd, sans-serif'; // Local Font

const palette = {
  primary: {
    main: "rgb(226, 232, 240)",
    light: "rgb(226, 232, 240)",
    dark: "rgb(148, 163, 184)",
    darker: "rgb(100, 116, 139)",
  },
  secondary: {
    main: "rgb(94, 234, 212)",
    dark: "rgb(45, 212, 191)",
  },
};

const typography = {
  palette,
  typography: {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 400,
      fontWeight: 700,
      fontSize: pxToRem(48),
      color: palette.primary.main,
      // ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
    },
    h2: {
      fontWeight: 400,
      fontSize: pxToRem(32),
      color: palette.primary.main,
    },
    body1: {
      fontWeight: 400,
      fontSize: pxToRem(16),
      color: palette.primary.main,
    },
    body2: {
      fontWeight: 400,
      fontSize: pxToRem(14),
      color: palette.primary.dark,
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: pxToRem(12),
      color: palette.primary.darker,
    },
    // h2: {
    //   fontWeight: 700,
    //   lineHeight: 64 / 48,
    //   fontSize: pxToRem(32),
    //   ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
    // },
    // h3: {
    //   fontWeight: 700,
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(24),
    //   ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
    // },
    // h4: {
    //   fontWeight: 700,
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(20),
    //   ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    // },
    // h5: {
    //   fontWeight: 700,
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(18),
    //   ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
    // },
    // h6: {
    //   fontWeight: 700,
    //   lineHeight: 28 / 18,
    //   fontSize: pxToRem(17),
    //   ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
    // },
    // subtitle1: {
    //   fontWeight: 600,
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(16),
    // },
    // subtitle2: {
    //   fontWeight: 600,
    //   lineHeight: 22 / 14,
    //   fontSize: pxToRem(14),
    // },
    // body1: {
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(16),
    // },
    // body2: {
    //   lineHeight: 22 / 14,
    //   fontSize: pxToRem(14),
    // },
    // caption: {
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(12),
    // },
    // overline: {
    //   fontWeight: 700,
    //   lineHeight: 1.5,
    //   fontSize: pxToRem(12),
    //   letterSpacing: 1.1,
    //   textTransform: "uppercase",
    // },
    // button: {
    //   fontWeight: 700,
    //   lineHeight: 24 / 14,
    //   fontSize: pxToRem(14),
    //   textTransform: "capitalize",
    // },
  },
};

export default typography;
