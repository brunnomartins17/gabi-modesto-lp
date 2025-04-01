/**
 * Serviço para enviar dados do lead para a API
 */
export async function sendLeadData(leadData: any) {
  try {
    console.log("Enviando dados para o serviço local:", leadData)

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro na resposta do serviço:", response.status, errorText)
      throw new Error(`Falha ao enviar dados: ${response.status}`)
    }

    const data = await response.json()
    console.log("Resposta do serviço:", data)
    return { success: true, message: "Lead registrado com sucesso", data }
  } catch (error) {
    console.error("Erro ao enviar dados:", error)
    return { success: false, message: "Erro ao registrar lead" }
  }
}

/**
 * Serviço para enviar dados do quiz para a API
 */
export async function sendQuizData(quizData: any) {
  try {
    console.log("Enviando dados do quiz para o serviço local:", quizData)

    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro na resposta do serviço quiz:", response.status, errorText)
      throw new Error(`Falha ao enviar dados do quiz: ${response.status}`)
    }

    const data = await response.json()
    console.log("Resposta do serviço quiz:", data)
    return { success: true, message: "Dados do quiz registrados com sucesso", data }
  } catch (error) {
    console.error("Erro ao enviar dados do quiz:", error)
    return { success: false, message: "Erro ao registrar dados do quiz" }
  }
}

