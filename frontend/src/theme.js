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
  },
  user: {
    path: (
      <path
      fill="currentColor"
       d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z" />
    ),
    viewBox: '0 0 20 20'
  },
  pencil: {
    path: (
      <path
      fill="currentColor" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z" />
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