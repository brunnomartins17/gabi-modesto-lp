"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import AttentionBox from "@/components/attention-box"
import { sendQuizData } from "@/services/api"

// Variável global para o lançamento atual
const CURRENT_LAUNCH = "[LCI_AGO25][LEAD]"

// ID da empresa
const COMPANY_ID = "a5170c9f-0383-4ac9-8d58-6f76f48a8e69"

// Adicionar a constante com o link do grupo do WhatsApp no topo do arquivo, junto com as outras constantes
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/Imhz5YlWLjgBBgMI4ml1dP"

// Define the quiz questions with the new structure
const quizQuestions = [
  {
    id: 1,
    label: 'pergunta01',
    question: "Qual é a sua faixa etária?",
    options: [
      {
        text: "Até 24 anos",
        weight: 0,
      },
      {
        text: "De 25 a 34 anos",
        weight: 0,
      },
      {
        text: "De 35 a 44 anos",
        weight: 0,
      },
      {
        text: "45 ou + anos",
        weight: 0,
      },
    ],
    showBackButton: false,
  },
  {
    id: 2,
    label: 'pergunta02',
    question: "Qual o seu nível de escolaridade?",
    options: [
      {
        text: "Ensino fundamental completo",
        weight: 0,
      },
      {
        text: "Ensino fundamental incompleto",
        weight: 0,
      },
      {
        text: "Ensino médio completo",
        weight: 0,
      },
      {
        text: "Ensino médio incompleto",
        weight: 0,
      },
      {
        text: "Ensino Superior incompleto",
        weight: 0,
      },
      {
        text: "Ensino Superior (graduação/faculdade)",
        weight: 0,
      },
      {
        text: "Pós-graduação",
        weight: 0,
      },
      {
        text: "Mestrado",
        weight: 0,
      },
      {
        text: "Doutorado",
        weight: 0,
      },
    ],
    showBackButton: true,
  },
  {
    id: 3,
    label: 'pergunta03',
    question: "Você trabalha como?",
    options: [
      {
        text: "Funcionário CLT",
        weight: 0,
      },
      {
        text: "Presto Serviços como PJ",
        weight: 0,
      },
      {
        text: "Funcionário Público",
        weight: 0,
      },
      {
        text: "Aposentado",
        weight: 0,
      },
      {
        text: "Autônomo",
        weight: 0,
      },
      {
        text: "Profissional Liberal",
        weight: 0,
      },
      {
        text: "Empresário",
        weight: 0,
      },
      {
        text: "Estou desempregado no momento",
        weight: 0,
      },
    ],
    showBackButton: true,
  },
  {
    id: 4,
    label: 'pergunta04',
    question: "Qual seu sexo?",
    options: [
      {
        text: "Feminino",
        weight: 20.86881134,
      },
      {
        text: "Masculino",
        weight: 14.82039689,
      },
    ],
    showBackButton: true,
  },
  {
    id: 5,
    label: 'pergunta05',
    question: "Você tem filhos?",
    options: [
      {
        text: "Não",
        weight: 19.04261606,
      },
      {
        text: "Sim, 1",
        weight: 22.20441799,
      },
      {
        text: "Sim, 2",
        weight: 23.12569937,
      },
      {
        text: "Sim, 3 ou mais",
        weight: 14.75755446,
      },
    ],
    showBackButton: true,
  },
  {
    id: 6,
    label: 'pergunta06',
    question: "Renda mensal",
    options: [
      {
        text: "Até R$ 2.000",
        weight: 7.583285393,
      },
      {
        text: "De R$ 2.001 a R$ 3.000",
        weight: 17.99758016,
      },
      {
        text: "De R$ 3.001 a R$ 5.000",
        weight: 34.17648195,
      },
      {
        text: "De R$ 5.001 a R$ 10.000",
        weight: 48.34471886,
      },
      {
        text: "Acima de R$ 10.000",
        weight: 66.98895028,
      },
    ],
    showBackButton: true,
  },
  {
    id: 7,
    label: 'pergunta07',
    question: "Quem é você no inglês?",
    options: [
      {
        text: "Não sei nada",
        weight: 12.93499672,
      },
      {
        text: "Sei o básico (algumas palavras)",
        weight: 18.5,
      },
      {
        text: "Tenho dificuldade de entender o que escuto",
        weight: 25.1297782,
      },
      {
        text: "Até consigo ler, mas tenho dificuldade na hora de falar",
        weight: 27.97619048,
      },
    ],
    showBackButton: true,
  },
  {
    id: 8,
    label: 'pergunta08',
    question: "O que você mais quer no inglês?",
    options: [
      {
        text: "Ouvir e entender com clareza",
        weight: 21.92900948,
      },
      {
        text: "Conseguir falar automaticamente",
        weight: 30.60821485,
      },
      {
        text: "Aprender o idioma",
        weight: 12.65206813,
      },
    ],
    showBackButton: true,
  },
  {
    id: 9,
    label: 'pergunta09',
    question: "O que mais te faz querer aprender o inglês?",
    options: [
      {
        text: "Viagens a passeio",
        weight: 32.16237315,
      },
      {
        text: "Trabalho",
        weight: 22.13021131,
      },
      {
        text: "Morar fora / Intercâmbio",
        weight: 16.99384706,
      },
      {
        text: "É uma realização pessoal que eu gostaria de ter",
        weight: 22.37974684,
      },
      {
        text: "Sem um objetivo específico, apenas pelo conhecimento do idioma",
        weight: 8.559388991,
      },
    ],
    showBackButton: true,
  },
  {
    id: 10,
    label: 'pergunta10',
    question: "Experiências com o inglês",
    options: [
      {
        text: "Nunca estudei inglês antes, nem na época de escola",
        weight: 4.554865424,
      },
      {
        text: "Só tive contato com inglês na época da escola",
        weight: 13.50977244,
      },
      {
        text: "Já fiz curso de inglês on-line",
        weight: 23.32195677,
      },
      {
        text: "Já fiz cursinho tradicional de inglês",
        weight: 28.67072111,
      },
      {
        text: "Já fiz de tudo: até aula particular",
        weight: 42.88499025,
      },
    ],
    showBackButton: true,
  },
  {
    id: 11,
    label: 'pergunta11',
    question: "Há quanto tempo você me conhece e me segue",
    options: [
      {
        text: "Conheci através do evento",
        weight: 11.4498214,
      },
      {
        text: "Entre 2 e 3 meses",
        weight: 26.37130802,
      },
      {
        text: "Entre 3 e 6 meses",
        weight: 34.11860276,
      },
      {
        text: "Entre 6 meses e 1 ano",
        weight: 34.36532508,
      },
      {
        text: "Entre 1 ano e 2 anos",
        weight: 31.17729176,
      },
      {
        text: "Entre 2 anos e 3 anos",
        weight: 43.68174727,
      },
      {
        text: "Mais de 3 anos",
        weight: 38.63636364,
      },
    ],
    showBackButton: true,
  },
  {
    id: 12,
    label: 'pergunta12',
    question: "Por onde você me conheceu?",
    options: [
      {
        text: "Instagram",
        weight: 21.43073889,
      },
      {
        text: "Youtube",
        weight: 15.31034483,
      },
      {
        text: "Tiktok",
        weight: 12.77955272,
      },
      {
        text: "Facebook",
        weight: 16.25239006,
      },
      {
        text: "Google",
        weight: 19.41747573,
      },
      {
        text: "Indicação",
        weight: 32.91139241,
      },
      {
        text: "Outro",
        weight: 19.41747573,
      },
    ],
    showBackButton: true,
  },
  {
    id: 13,
    label: 'pergunta13',
    question: "Você já participou de um evento meu antes?",
    options: [
      {
        text: "Não, é a primeira vez que estou participando",
        weight: 16.50362891,
      },
      {
        text: "Sim, já participei de 1",
        weight: 38.53046595,
      },
      {
        text: "Sim, já participei de 2",
        weight: 59.96131528,
      },
      {
        text: "Sim, já participei de 3 ou mais",
        weight: 69.15629322,
      },
    ],
    showBackButton: true,
  },
]

// Define the type for an option
interface QuizOption {
  text: string
  weight: number
}

// Interface para os dados do lead
interface LeadData {
  name: string
  email: string
  phone: string
  countryCode: string
  source: string
  [key: string]: string // Para parâmetros UTM e outros campos dinâmicos
}

export default function QuizPage({ params }: { params: any }) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params) as { slug: string };
  const slug = unwrappedParams.slug;
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, QuizOption>>({})
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [leadScore, setLeadScore] = useState({
    totalScore: 0,
    faixa: "",
    answers: {} as Record<string, string>,
    path: "",
    host: "",
    urlParams: {} as Record<string, string>,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // Detectar se é mobile no lado do cliente
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Efeito para inicialização - executado apenas uma vez
  useEffect(() => {
    if (isInitialized) return

    // Coletar informações da página
    const urlParams: Record<string, string> = {}
    if (searchParams) {
      searchParams.forEach((value, key) => {
        urlParams[key] = value
      })
    }

    // Verificar se temos dados na URL
    const name = searchParams?.get("name")
    const email = searchParams?.get("email")
    const phone = searchParams?.get("phone")
    const country = searchParams?.get("country")

    // Se temos dados na URL, salvá-los no localStorage
    if (name && email && phone) {
      const newLeadData = {
        name,
        email,
        phone,
        countryCode: country || "BR",
        source: slug,
        launch: CURRENT_LAUNCH,
        companyId: COMPANY_ID,
        ...urlParams, // Adicionar todos os parâmetros da URL
      }
      localStorage.setItem("leadData", JSON.stringify(newLeadData))
      setLeadData(newLeadData)
    } else {
      // Se não temos dados na URL, verificar se temos no localStorage
      const storedLeadData = localStorage.getItem("leadData")
      if (!storedLeadData) {
        // Se não temos dados nem na URL nem no localStorage, redirecionar para a página inicial
        router.push(`/${slug}`)
      } else {
        // Se temos dados no localStorage, adicionar os parâmetros UTM se não existirem
        const leadDataObj = JSON.parse(storedLeadData)
        let updated = false

        // Adicionar o lançamento atual se não existir
        if (!leadDataObj.launch) {
          leadDataObj.launch = CURRENT_LAUNCH
          updated = true
        }

        // Adicionar o companyId se não existir
        if (!leadDataObj.companyId) {
          leadDataObj.companyId = COMPANY_ID
          updated = true
        }

        for (const [key, value] of Object.entries(urlParams)) {
          if (!leadDataObj[key]) {
            leadDataObj[key] = value
            updated = true
          }
        }

        if (updated) {
          localStorage.setItem("leadData", JSON.stringify(leadDataObj))
        }

        setLeadData(leadDataObj)
      }
    }

    // Coletar informações da página
    if (typeof window !== "undefined") {
      setLeadScore((prev) => ({
        ...prev,
        path: window.location.pathname,
        host: window.location.hostname,
        urlParams,
      }))
    }

    setIsInitialized(true)
  }, [isInitialized, slug, router, searchParams])

  // Efeito para resetar a opção selecionada quando mudar de questão
  useEffect(() => {
    setSelectedOption(null)
  }, [currentQuestion])

  const handleOptionSelect = (option: QuizOption) => {
    setSelectedOption(option)
  }

  const calculateTotalScore = (allAnswers: Record<string, QuizOption>) => {
    let totalScore = 0

    // Somar os pesos de todas as respostas
    Object.values(allAnswers).forEach((answer) => {
      totalScore += answer.weight
    })

    return totalScore
  }

  const determineLeadFaixa = (totalScore: number) => {
    // Determinar a faixa com base no score total
    if (totalScore >= 256) {
      return "Faixa A"
    } else if (totalScore >= 239) {
      return "Faixa B"
    } else if (totalScore >= 213) {
      return "Faixa C"
    } else {
      return "Faixa D"
    }
  }

  // Modificar a função prepareLeadData para redirecionar após o envio bem-sucedido
  const prepareLeadData = async (allAnswers: Record<string, QuizOption>) => {
    // Calcular o score total com as respostas atualizadas
    const totalScore = calculateTotalScore(allAnswers)

    // Determinar a faixa
    const faixa = determineLeadFaixa(totalScore)

    // Preparar as respostas em formato texto
    const textAnswers: Record<string, string> = {}
    console.log(allAnswers);
    
    // Como agora já estamos usando o label como chave no allAnswers,
    // podemos simplesmente mapear os valores diretamente:
    Object.entries(allAnswers).forEach(([label, answer]) => {
      // O label já é a chave, então podemos usar diretamente
      textAnswers[label] = answer.text;
    })

    // Extrair todos os parâmetros UTM da URL
    const utmParams: Record<string, string> = {}
    for (const [key, value] of Object.entries(leadScore.urlParams)) {
      if (key.startsWith("utm_")) {
        utmParams[key] = value
      }
    }

    // Garantir que temos os dados básicos do lead
    const name = leadData?.name || leadScore.urlParams.name || ""
    const email = leadData?.email || leadScore.urlParams.email || ""
    const phone = leadData?.phone || leadScore.urlParams.phone || ""

    // Criar o payload completo para o GTM e API
    const payload = {
      event: "quizCompleted",
      leadScore: totalScore,
      leadFaixa: faixa,
      quizAnswers: textAnswers,

      // Dados do lead na raiz do payload
      name,
      email,
      phone,
      source: slug,

      // Adicionar o lançamento atual e companyId
      launch: CURRENT_LAUNCH,
      companyId: COMPANY_ID,

      // Adicionar todos os UTMs na raiz do payload
      ...utmParams,

      // Informações da página
      path: leadScore.path,
      host: leadScore.host,

      // Timestamp
      timestamp: new Date().toISOString(),

      // Dispositivo
      device: isMobile ? "mobile" : "desktop",

      // Incluir também os dados completos para referência
      leadData: leadData,
      allAnswers: textAnswers,
    }

    // Enviar dados para o dataLayer do GTM
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(payload)
    }

    try {
      // Enviar dados para a API usando o serviço
      const result = await sendQuizData(payload)

      // Salvar no localStorage para uso futuro
      localStorage.setItem(
        "leadScore",
        JSON.stringify({
          totalScore,
          faixa,
          answers: textAnswers,
          name,
          email,
          phone,
          launch: CURRENT_LAUNCH,
          companyId: COMPANY_ID,
          ...utmParams,
        }),
      )

      console.log("Lead Score Data:", payload)

      // Se o envio foi bem-sucedido, redirecionar para o grupo do WhatsApp
      if (result.success) {
        // Redirecionar para o grupo do WhatsApp após um pequeno delay
        // para garantir que o usuário veja a tela de análise
        return true
      }

      return false
    } catch (error) {
      console.error("Erro ao enviar dados do quiz:", error)
      return false
    }
  }

  // Modificar o handleNext para lidar com o redirecionamento
  const handleNext = () => {
    if (selectedOption) {
      // Criar uma cópia atualizada das respostas incluindo a resposta atual
      const updatedAnswers = {
        ...answers,
        [quizQuestions[currentQuestion].label]: selectedOption,
      }

      // Atualizar o estado das respostas
      setAnswers(updatedAnswers)

      if (currentQuestion < quizQuestions.length - 1) {
        // Move to next question
        setCurrentQuestion((prev) => prev + 1)
      } else {
        // Show analyzing screen
        setIsAnalyzing(true)

        // Calcular e preparar os dados do lead com as respostas atualizadas
        // incluindo a última resposta
        prepareLeadData(updatedAnswers)
          .then((success) => {
            // Simulate analysis and show completion screen after 3 seconds
            setTimeout(() => {
              setIsAnalyzing(false)
              setIsCompleted(true)

              // Após mostrar a tela de conclusão por 2 segundos, redirecionar para o WhatsApp
              if (success) {
                setTimeout(() => {
                  window.location.href = WHATSAPP_GROUP_LINK
                }, 2000)
              }
            }, 3000)
          })
          .catch((error) => {
            console.error("Erro ao enviar dados do quiz:", error)
            // Mesmo com erro, mostrar a tela de conclusão após 3 segundos
            setTimeout(() => {
              setIsAnalyzing(false)
              setIsCompleted(true)
            }, 3000)
          })
      }
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  // Determina o estilo de background
  const backgroundStyle = {
    backgroundColor: "#D1DADF",
  }

  // Render analyzing screen
  if (isAnalyzing) {
    return (
      <main className="min-h-screen flex flex-col" style={backgroundStyle}>
        <div className="flex-grow py-8 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="mb-4 flex justify-center">
              <div className="transform scale-125">
                <Logo />
              </div>
            </div>

            <div className="text-center mt-6 mb-12">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#244C6C]">
                Aguarde! Estamos analisando seu perfil...
              </h1>
              <div className="w-16 h-16 border-4 border-[#17C513] border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Modificar a renderização da tela de conclusão
  // Render completion screen
  if (isCompleted) {
    return (
      <main className="min-h-screen flex flex-col" style={backgroundStyle}>
        <div className="flex-grow py-8 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="mb-4 flex justify-center">
              <div className="transform scale-125">
                <Logo />
              </div>
            </div>

            <div className="text-center mt-6 mb-12">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#244C6C]">Obrigado por completar o quiz!</h1>
              <p className="text-lg mb-6">
                Sua aula com 3 exercícios exclusivos será enviada para o seu e-mail em breve.
              </p>
              <p className="text-base mb-4">Fique de olho na sua caixa de entrada e também no WhatsApp!</p>
              <p className="text-base font-medium">Você será redirecionado para o grupo do WhatsApp em instantes...</p>
              <div className="w-10 h-10 border-4 border-[#17C513] border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Render current question
  const question = quizQuestions[currentQuestion]

  return (
    <main className="min-h-screen flex flex-col" style={backgroundStyle}>
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-4 flex justify-center">
            <div className="transform scale-125">
              <Logo />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-3 text-[#244C6C]">FALTA APENAS UM PASSO!</h1>

          <div className="mb-6">
            <p className="text-lg md:text-xl text-center">
              Pra concluir sua inscrição e receber uma aula com 3 exercícios exclusivos, responda:
            </p>
          </div>

          <div className="bg-black text-white rounded-lg p-4 mb-8">
            <h2 className="text-lg mb-4">{question.question}</h2>

            <div className="space-y-1">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center mb-2 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  <div className="relative flex items-center w-full">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name={`question-${question.label}`}
                      className="w-5 h-5 mr-2 cursor-pointer accent-[#17C513]"
                      checked={selectedOption?.text === option.text}
                      onChange={() => handleOptionSelect(option)}
                    />
                    <label htmlFor={`option-${index}`} className="cursor-pointer text-base pl-1 w-full">
                      {option.text}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className={`${question.showBackButton ? "flex justify-between" : ""} mt-6`}>
              {question.showBackButton ? (
                <>
                  <button
                    onClick={handleBack}
                    className="bg-transparent border border-[#17C513] hover:bg-[#17C513]/10 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 uppercase text-center w-[48%]"
                  >
                    VOLTAR
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#17C513] hover:bg-[#17C513]/80 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 uppercase text-center w-[48%]"
                    disabled={!selectedOption}
                  >
                    PRÓXIMA
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-[#17C513] hover:bg-[#17C513]/80 text-white font-bold py-3 px-6 rounded-md transition-all duration-200 uppercase text-center w-full"
                  disabled={!selectedOption}
                >
                  PRÓXIMA
                </button>
              )}
            </div>
          </div>

          <AttentionBox />
        </div>
      </div>

      <Footer />
    </main>
  )
}

// Adicionar a declaração de tipo para o dataLayer global
declare global {
  interface Window {
    dataLayer: any[]
  }
}

