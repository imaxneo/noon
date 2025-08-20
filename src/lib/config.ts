export const siteConfig = {
  name: "Noor",
  description: "A modern Next.js project with TypeScript, TailwindCSS, and shadcn/ui",
  url: "https://noor.example.com",
  ogImage: "https://noor.example.com/og.jpg",
  links: {
    twitter: "https://twitter.com/noor",
    github: "https://github.com/noor",
  },
}

export const navigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
}

export const themeConfig = {
  defaultTheme: "system",
  themes: ["light", "dark", "system"],
}
