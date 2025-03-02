/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          header: {
            logoText: '#586261',
          },
          primary: {
            DEFAULT: '#103174',
            two: '#ffcc2a',
          },
          main: {
            1: '#1F2937',
            2: '#798181',
            3: '#3E4645',
            4: '#586261',
            5: '#303635',
            6: '#CBCECE',
            7: '#F3F4F6',
            8: '#F8FAFC',
          },
          accented: {
            1: '#DFDB04',
            2: '#5E5C02',
            3: '#33BE73',
            4: '#FC0305',
            5: '#007C39',
            6: '#FCFBE6',
            7: '#E6F7EE',
            8: '#FFE6E6',
            9: '#00AE50',
            10: '#9E9B03',
            11: '#F0EE8C',
          }
        },
        backgroundImage: {},
        screens: {
          'mo': '320px',
        },
        fontSize: {
          h1: '4.500rem', // 72px
          h2: '3.750rem', // 60px
          h3: '3.500rem', // 56px
          h4: '3.125rem', // 50px
          h5: '2.500rem', // 40px
          h6: '2.000rem', // 32px
          h7: '1.750rem', // 28px
          h8: '1.500rem', // 24px
          h9: '1.250rem', // 20px
          h10: '1.125rem', // 18px
          h11: '1.000rem', // 16px
          h12: '0.875rem', // 14px
          h13: '0.750rem', // 12px
          h14: '0.625rem', // 10px
        },
      },
    },
    plugins: [],
  };
  