import { type NextRequest, NextResponse } from "next/server"

// Constante com a URL da API - em produção, isso poderia vir de variáveis de ambiente
const API_URL = "https://0l71ajgp74.execute-api.us-east-1.amazonaws.com/leads"

// Função para lidar com requisições OPTIONS (preflight CORS)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Obter os dados da requisição
    const leadData = await request.json()

    console.log("Proxy recebeu dados:", leadData)

    // Fazer a requisição para a API externa
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    })

    // Verificar se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro na resposta da API:", response.status, errorText)
      return NextResponse.json(
        { error: `Falha ao enviar dados para a API: ${response.status}` },
        { status: response.status },
      )
    }

    // Retornar a resposta da API externa
    const data = await response.json()
    console.log("Proxy recebeu resposta:", data)

    // Adicionar cabeçalhos CORS à resposta
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Erro ao processar requisição no proxy:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    )
  }
}

