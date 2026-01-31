/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Plin Plin - Abejita
        'plin-amarillo': '#FFD93D',
        'plin-negro': '#2D2D2D',
        'plin-miel': '#F5A623',
        'plin-celeste': '#87CEEB',
        'plin-verde': '#7CB342',
        'plin-rosa': '#FF8FAB',
        'plin-naranja': '#FF9800',
        'plin-blanco': '#FFFEF0',
        // Colores legacy (para compatibilidad)
        'pastel-celeste': '#B8E6E6',
        'pastel-rosado': '#FFD6E8',
        'pastel-crema': '#FFF8E7',
        'amarillo-abejita': '#FFE55C',
        'verde-sapito': '#A8D672',
        'cafe-osito': '#D7B49E',
        'rosa-conejito': '#FFC4E1',
      },
      fontFamily: {
        'quicksand': ['Quicksand', 'sans-serif'],
        'pacifico': ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}
