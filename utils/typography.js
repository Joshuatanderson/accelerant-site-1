import typography from "typography";
import FairyGates from "typography-theme-fairy-gates";

delete FairyGates.googleFonts;

FairyGates.overrideThemeStyles = ({ rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6": {
    marginTop: rhythm(1 / 2),
  },
  h1: {
    fontWeight: 900,
    letterSpacing: "-1px",
  },
});
FairyGates.scaleRatio = 5 / 2;

// Hot reload typography in development.
// if (process.env.NODE_ENV !== `production`) {
//   typography.injectStyles();
// }

export default typography;