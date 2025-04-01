"use client"

import Link from "next/link"
import Image from "next/image"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Logo() {
  const isMobile = useIsMobile()

  // Tamanho menor para dispositivos móveis
  const width = isMobile ? 140 : 180
  const height = isMobile ? 39 : 50

  return (
    <div className="mb-4 text-left">
      <Link href="/" className="inline-block">
        <Image
          src="/images/logo-fluenciassim.webp"
          alt="Fluência assim"
          width={width}
          height={height}
          className="h-auto"
        />
      </Link>
    </div>
  )
}

