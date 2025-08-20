import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExampleComponentProps {
  title: string
  description: string
  children?: React.ReactNode
}

export function ExampleComponent({ title, description, children }: ExampleComponentProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children || <p className="text-muted-foreground">No content provided</p>}
      </CardContent>
    </Card>
  )
}
