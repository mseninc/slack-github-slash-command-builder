import { extendTheme, theme as baseTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        fontWeight: "normal",
        height: "100%",
      },
      "body > div:first-of-type": {
        height: "100%",
      },
      "::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: baseTheme.colors.blackAlpha[100],
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: baseTheme.colors.blackAlpha[400],
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 10,
      },
      defaultProps: {
        size: "md",
        // variant: "outline",
        colorScheme: "teal",
      },
    },
  },
} as ThemeConfig;

export const theme = extendTheme({ config });
