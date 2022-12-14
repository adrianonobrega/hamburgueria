import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode
  rest?: string[]
  onClick?: () => void
  md:boolean
  type:string
}