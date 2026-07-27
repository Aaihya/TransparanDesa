import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

export interface FeatureNavCardProps {
  icon: LucideIcon
  title: string
  description: string
  target: string
  href: string
}

export function FeatureNavCard({
  icon: Icon,
  title,
  description,
  target,
  href,
}: FeatureNavCardProps) {
  return (
    <a href={href} className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <Card className="h-full gap-0 p-6 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
        <span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {target}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </Card>
    </a>
  )
}
