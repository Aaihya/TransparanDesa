import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Beranda', href: '#' },
  { label: 'Cari Desa', href: '#cari' },
  { label: 'Dana Desa', href: '#statistik' },
  { label: 'Lapor Warga', href: '#' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="lg"
            className="hidden sm:inline-flex"
            nativeButton={false}
            render={<a href="#" />}
          >
            Masuk
          </Button>
          <Button size="lg" nativeButton={false} render={<a href="#" />}>
            Lapor Sekarang
          </Button>
        </div>
      </div>
    </header>
  )
}
