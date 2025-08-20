interface SectionHeaderProps {
  title: string
  description?: string
  emoji?: string
  children?: React.ReactNode
}

export function SectionHeader({ title, description, emoji, children }: SectionHeaderProps) {
  return (
    <div className="text-center space-y-6 mb-12 w-full">
      {emoji && (
        <div className="text-5xl mb-3 animate-bounce">
          {emoji}
        </div>
      )}
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
        {title}
      </h1>
      {description && (
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4">
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
