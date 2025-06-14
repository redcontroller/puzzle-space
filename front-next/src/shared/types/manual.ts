export interface Manual {
  id: number
  title: string
  linkText: string
  href: string
  icon?: string
  color?: string
}

export interface ManualCardProps {
  manual: Manual
  onClick?: (manual: Manual) => void
  className?: string
}
