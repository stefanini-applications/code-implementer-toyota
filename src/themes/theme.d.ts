import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    type: string;
    palette: {
      PRIMARY: {
        LIGHT: string;
        MAIN: string;
        MAIN_TWO: string;
        MAIN_THREE: string;
        MAIN_FOUR: string;
        DARK: string;
        WHITE: string;
        RED: string;
      };
      GREYSCALE: {
        GREY: string;
        GREY_TWO: string;
        GREY_THREE: string;
        GREY_FOUR: string;
        GREY_FIVE: string;
        GREY_SIX: string;
        DARK: string;
        DARK_TWO: string;
        DARK_THREE: string;
        DARK_FOUR: string;
        CLEAR_GREY: string;
        CLEAR_TWO: string;
        CLEAR_THREE: string;
        TRANSLUCENT: string;
        TRANSLUCENT_TWO: string;
        TRANSLUCENT_THREE: string;
      };
      PHASE: {
        ZERO_ONE: string;
        TWO: string;
        THREE: string;
        FOUR: string;
        FIVE: string;
        SIX: string;
      };
      BACKGROUND: {
        MODAL: string;
        PAPER: string;
        DEFAULT: string;
        HINT: string;
        DIVIDER: string;
        SKELETON_IN: string;
        SKELETON_OUT: string;
        TOOLTIP: string;
        PROFILE: string;
        EXPANSIBLE: string;
        ROW_BACKGROUND: string;
        BORDER: string;
        CONTRAST_ONE: string;
        CONTRAST_TWO: string;
      };
      TEXT: {
        PRIMARY: string;
        SECONDARY: string;
        TERTIARY: string;
        DISABLED: string;
        HINT: string;
        HINT_DISABLED: string;
        CONTRAST_ONE: string;
        CONTRAST_TWO: string;
        ROW_TEXT: string;
        TITLE_RESULT: string;
      };
      INPUT: {
        BACKGROUND: string;
        BORDER: string;
        TEXT: string;
        PLACEHOLDER: string;
        COLOR: string;
      };
      BUTTON: {
        BACKGROUND: string;
        BACKGROUND_ERROR: string;
        HOVER: string;
        HOVER_ERROR: string;
        BORDER: string;
        TEXT: string;
        ICON: string;
        SHADOW: string;
        SHADOW_ERROR: string;
        LIGHT: string;
        LIGHT_ERROR: string;
      };
      TABLE: {
        BORDER: string;
        BACKGROUND_HEADER: string;
      };
      SUCCESS: {
        LIGHT: string;
        MAIN: string;
        DARK: string;
      };
      INFO: {
        LIGHT: string;
        MAIN: string;
        DARK: string;
      };
      WARNING: {
        LIGHT: string;
        MAIN: string;
        DARK: string;
      };
      ERROR: {
        LIGHT: string;
        LIGHT_TWO: string;
        MAIN: string;
        MAIN_TWO: string;
        DARK: string;
      };
      LEVEL: {
        LOW: string;
        MEDIUM: string;
        HIGH: string;
        VERY_HIGH: string;
      };
      OTHERS: {
        DARK_GREY: string;
        YELLOW: string;
        PURPLE: string;
        ARROW: string;
        TRANSLUCENT: string;
        CLEAR_GREY: string;
        GREY: string;
        SWEET_GREEN: string;
      };
    };
  }
}
