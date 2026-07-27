interface LogoProps {
  className?: string
  showText?: boolean
  size?: number
}

export function Logo({ className = '', showText = true, size = 36 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative overflow-hidden rounded-xl bg-white shadow-xs p-1 flex items-center justify-center shrink-0 border border-primary/20 hover:scale-105 transition-transform"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo TransparanDesa"
          width={size}
          height={size}
          className="object-contain size-full"
        />
      </div>
      {showText && (
        <span className="font-heading text-lg font-extrabold leading-none tracking-tight text-foreground">
          Transparan<span className="text-primary">Desa</span>
        </span>
      )}
    </div>
  )
}
