import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obter a origem da requisição
  const origin = request.headers.get("origin") || ""

  // Configurar cabeçalhos CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  }

  // Verificar se é uma requisição OPTIONS (preflight)
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, { headers })
  }

  // Para outras requisições, adicionar os cabeçalhos CORS à resposta
  const response = NextResponse.next()

  // Adicionar cabeçalhos CORS à resposta
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// Configurar o middleware para ser executado apenas nas rotas da API
export const config = {
  matcher: "/api/:path*",
}

