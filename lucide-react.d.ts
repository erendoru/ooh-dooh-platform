declare module 'lucide-react' {
    import { FC, SVGProps } from 'react'
    export interface IconProps extends SVGProps<SVGSVGElement> {
      size?: string | number
    }
    export type Icon = FC<IconProps>
    export const Menu: Icon
    export const X: Icon
    export const User: Icon
    export const ChevronDown: Icon
    export const ShoppingCart: Icon
    // Diğer kullandığınız ikonları buraya ekleyin
  }