/**
 * Tema de colores para LicoCastillo
 * Paleta sobria y elegante para una aplicación de licores
 */

export const theme = {
  // Colores primarios - Tonos de marrón y dorado (representan licores añejados)
  colors: {
    primary: {
      main: '#8B4513', // Marrón whisky/cognac
      light: '#A0522D', // Marrón claro
      dark: '#654321', // Marrón oscuro
      contrast: '#FFFFFF', // Blanco para textos
    },
    secondary: {
      main: '#D4A574', // Dorado/amber (color de licor)
      light: '#E8C89E', // Dorado claro
      dark: '#B8865A', // Dorado oscuro
      contrast: '#2C1810', // Marrón muy oscuro
    },
    accent: {
      gold: '#D4AF37', // Dorado metálico
      copper: '#B87333', // Cobre
      bronze: '#CD7F32', // Bronce
    },
    // Colores neutros - Elegantes y profesionales
    neutral: {
      black: '#1A1A1A', // Negro suave
      darkGray: '#2C2C2C', // Gris oscuro
      gray: '#4A4A4A', // Gris medio
      lightGray: '#E5E5E5', // Gris claro
      offWhite: '#F5F5F5', // Blanco roto
      white: '#FFFFFF', // Blanco puro
    },
    // Colores de estado (feedback)
    status: {
      success: '#2D5016', // Verde oscuro (botella de vino)
      warning: '#8B6914', // Amarillo oscuro
      error: '#8B1A1A', // Rojo oscuro (vino tinto)
      info: '#2C4A6A', // Azul oscuro
    },
    // Colores de fondo
    background: {
      main: '#F8F6F3', // Crema/beige muy claro
      paper: '#FFFFFF', // Blanco para tarjetas
      dark: '#2C1810', // Marrón muy oscuro (para sidebar)
      darker: '#1A0F0A', // Casi negro
    },
    // Bordes y divisores
    border: {
      light: '#E0D5C7', // Beige claro
      main: '#C4B5A0', // Beige medio
      dark: '#8B7355', // Marrón grisáceo
    },
  },

  // Tipografía
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      heading: "'Playfair Display', Georgia, serif", // Elegante para títulos
      mono: "'Fira Code', 'Courier New', monospace",
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Espaciado
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
  },

  // Bordes redondeados
  borderRadius: {
    none: '0',
    sm: '0.25rem', // 4px
    md: '0.5rem', // 8px
    lg: '0.75rem', // 12px
    xl: '1rem', // 16px
    full: '9999px', // Circular
  },

  // Sombras
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(44, 24, 16, 0.05)',
    md: '0 4px 6px -1px rgba(44, 24, 16, 0.1), 0 2px 4px -1px rgba(44, 24, 16, 0.06)',
    lg: '0 10px 15px -3px rgba(44, 24, 16, 0.1), 0 4px 6px -2px rgba(44, 24, 16, 0.05)',
    xl: '0 20px 25px -5px rgba(44, 24, 16, 0.1), 0 10px 10px -5px rgba(44, 24, 16, 0.04)',
    inner: 'inset 0 2px 4px 0 rgba(44, 24, 16, 0.06)',
  },

  // Transiciones
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // Breakpoints (responsive)
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
} as const;

// Tipo TypeScript para el tema
export type Theme = typeof theme;

export default theme;
