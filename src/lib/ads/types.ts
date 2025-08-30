export interface AdBanner {
  id: string
  type: "propeller" | "image" | "html" | "fpyf8"
  placement: "header" | "inline" | "footer"
  src?: string
  href?: string
  alt?: string
  width?: number
  height?: number
  script?: string
  zone?: string
}

export interface AdData {
  banners: AdBanner[]
  settings: {
    enabled: boolean
    refreshInterval?: number
  }
}
