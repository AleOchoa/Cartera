import React from 'react'
import { theme } from '@chakra-ui/core'

const customIcons = {
  menu: {
    path: (
      <path
      fill="currentColor"
        d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
      />
    ),
    viewBox: '0 0 20 20'
  }
}

const customTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons
  },
  colors: {
    ...theme.colors,
    hotpink: {
      '100': '#ff3465',
      '200': '#ff3465',
      '300': '#ff3465',
      '400': '#ff3465',
      '500': '#ff3465',
      '600': '#ff3465',
      '700': '#ff3465',
      '800': '#ff3465',
      '900': '#ff3465'
    },
    softpink: {
      '100': '#ffdbe3',
      '200': '#ffdbe3',
      '300': '#ffdbe3',
      '400': '#ffdbe3',
      '500': '#ffdbe3',
      '600': '#ffdbe3',
      '700': '#ffdbe3',
      '800': '#ffdbe3',
      '900': '#ffdbe3'
    },
    whity: {
      '100': 'white',
      '200': 'white',
      '300': 'white',
      '400': 'white',
      '500': 'white',
      '600': 'white',
      '700': 'white',
      '800': 'white',
      '900': 'white'
    }
  }
}

export default customTheme