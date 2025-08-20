import Link from "next/link"

interface BrandProps {
  showTagline?: boolean
}

export function Brand({ showTagline = false }: BrandProps) {
  return (
    <Link href="/" className="flex items-center space-x-3 space-x-reverse">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm sm:text-base">ن</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-bold text-foreground">نور</span>
        {showTagline && (
          <span className="text-sm sm:text-base text-muted-foreground">رفيق يومك للذكر</span>
        )}
      </div>
    </Link>
  )
}
