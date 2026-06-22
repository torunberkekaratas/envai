export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        envai: {
          ink: '#102326',
          navy: '#062B35',
          deep: '#031C24',
          green: '#16A34A',
          leaf: '#588157',
          mint: '#DDF6E8',
          cloud: '#F5F8F6'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(4, 28, 34, 0.10)',
        glass: '0 24px 80px rgba(4, 28, 34, 0.16)'
      }
    }
  },
  plugins: []
}
