"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para uma slug padrão quando o componente for montado
    router.push("/fa-v1-traf")
  }, [router])

  // Renderizar um estado de carregamento enquanto o redirecionamento acontece
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1DADF]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#5cb85c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg">Carregando...</p>
      </div>
    </div>
  )
}

