"use client"

import dynamic from "next/dynamic"

const DuaModal = dynamic(() => import("@/components/dua-modal").then(mod => ({ default: mod.DuaModal })), {
  ssr: false
})

export function DuaModalWrapper() {
  return <DuaModal />
}
