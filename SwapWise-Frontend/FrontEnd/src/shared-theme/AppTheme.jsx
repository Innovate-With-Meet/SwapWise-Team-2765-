import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Importing custom theme components
import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

// AppTheme component
const AppTheme = ({
  children,
  disableCustomTheme = false,
  themeComponents = {},
}) => {
  // Memoized theme for performance optimization
  const theme = React.useMemo(() => {
    if (disableCustomTheme) return null; // Fix: Don't pass an empty object

    return createTheme({
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes,
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents, // Fix: Avoid spreading undefined
      },
    });
  }, [disableCustomTheme, themeComponents]);

  // If theme is disabled, just render children without ThemeProvider
  if (disableCustomTheme) {
    return <>{children}</>;
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>; // Fix: Removed invalid prop
};

// Define PropTypes for validation
AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;
