"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Inicia o processo de fade out após 2 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 2000)

    // Chama o callback onFinish após o fade out (3 segundos total)
    const finishTimer = setTimeout(() => {
      onFinish()
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onFinish])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#D1DADF] transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative animate-pulse-slow">
        <Image
          src="https://gabimodesto.com.br/wp-content/uploads/2025/07/Logo.webp"
          alt="Fluência assim"
          width={240}
          height={70}
          className="h-auto"
          priority
        />
      </div>
    </div>
  )
}

