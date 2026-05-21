import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'mi-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      'mi-pie': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
