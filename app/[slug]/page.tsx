"use client"

import React, { useState, type FormEvent, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import CountrySelect from "@/components/country-select"
import SplashScreen from "@/components/splash-screen"
import { sendLeadData } from "@/services/api"

// Variável global para o lançamento atual
const CURRENT_LAUNCH = "[LCI_AGO25][LEAD]"

// ID da empresa
const COMPANY_ID = "a5170c9f-0383-4ac9-8d58-6f76f48a8e69"

// Lista de países com bandeiras e DDIs
const countries = [
  { code: "BR", name: "Brasil", flag: "🇧🇷", ddi: "+55" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", ddi: "+1" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", ddi: "+351" },
  { code: "ES", name: "Espanha", flag: "🇪🇸", ddi: "+34" },
  { code: "UK", name: "Reino Unido", flag: "🇬🇧", ddi: "+44" },
  { code: "IT", name: "Itália", flag: "🇮🇹", ddi: "+39" },
  { code: "FR", name: "França", flag: "🇫🇷", ddi: "+33" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪", ddi: "+49" },
  { code: "JP", name: "Japão", flag: "🇯🇵", ddi: "+81" },
  { code: "CA", name: "Canadá", flag: "🇨🇦", ddi: "+1" },
]

export default function LandingPage({ params }: { params: any }) {
  // Usar React.use para desempacotar o objeto params
  const unwrappedParams = React.use(params) as { slug: string };
  const slug = unwrappedParams.slug;
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Brasil como padrão
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  })
  const [showSplash, setShowSplash] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    if (name === "whatsapp") {
      // Remove todos os caracteres não numéricos
      const numericValue = value.replace(/\D/g, "");
      
      // Aplica a formatação de acordo com a quantidade de dígitos
      let formattedValue = numericValue;
      if (selectedCountry.code === "BR") {
        // Formato brasileiro: (XX) XXXXX-XXXX
        if (numericValue.length <= 2) {
          formattedValue = numericValue;
        } else if (numericValue.length <= 7) {
          formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2)}`;
        } else {
          formattedValue = `(${numericValue.slice(0, 2)}) ${numericValue.slice(2, 7)}-${numericValue.slice(7, 11)}`;
        }
      } else {
        // Formato genérico para outros países
        if (numericValue.length > 3 && numericValue.length <= 7) {
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
        } else if (numericValue.length > 7) {
          formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
        }
      }
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Extrai apenas os números para enviar ao servidor
    const whatsappNumericOnly = formData.whatsapp.replace(/\D/g, "");

    // Coletar parâmetros UTM da URL
    const utmParams: Record<string, string> = {}
    if (searchParams) {
      searchParams.forEach((value, key) => {
        if (key.startsWith("utm_")) {
          utmParams[key] = value
        }
      })
    }

    // Coletar informações da página
    const pageInfo = {
      path: typeof window !== "undefined" ? window.location.pathname : "",
      host: typeof window !== "undefined" ? window.location.hostname : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    }

    // Preparar os dados do lead
    const leadData = {
      // Dados básicos do lead
      name: formData.name,
      email: formData.email,
      phone: `${selectedCountry.ddi}${whatsappNumericOnly}`,
      countryCode: selectedCountry.code,
      countryDDI: selectedCountry.ddi,

      // Informações da origem
      source: slug,
      launch: CURRENT_LAUNCH,
      companyId: COMPANY_ID,

      // Informações da página
      ...pageInfo,

      // Parâmetros UTM
      ...utmParams,

      // Timestamp
      timestamp: new Date().toISOString(),

      // Dispositivo
      device: isMobile ? "mobile" : "desktop",
    }

    // Armazenar no localStorage
    localStorage.setItem("leadData", JSON.stringify(leadData))

    // Enviar dados para o GTM
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "leadCapture",
        ...leadData,
      })
    }

    // Enviar dados para a API
    await sendLeadData(leadData)

    // Criar um objeto URLSearchParams para os parâmetros do formulário
    const queryParams = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: `${selectedCountry.ddi}${whatsappNumericOnly}`,
      country: selectedCountry.code,
      sfunnel: "61"
    })

    // Adicionar todos os parâmetros UTM da URL atual
    for (const [key, value] of Object.entries(utmParams)) {
      queryParams.append(key, value)
    }

    // Redirecionar para a página do Sales Funnel com os parâmetros
    window.location.href = `https://sf.gabimodesto.com.br/sf/?${queryParams.toString()}`
  }

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  // Determina qual imagem de fundo usar com base no tamanho da tela
  const backgroundImageSrc = isMobile ? "/images/hero-mobile-background.webp" : "/images/hero-background.webp"

  // Estilo personalizado para o título com espaçamento entre linhas mais sutil
  const titleStyle = {
    lineHeight: isMobile ? "1.3" : "1.4", // Espaçamento mais sutil para desktop
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="flex-grow relative bg-[#D1DADF]"
        style={{
          minHeight: "calc(100vh - 80px)", // Altura mínima para garantir que o conteúdo caiba
        }}
      >
        {/* Background com posicionamento absoluto para cobrir todo o container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImageSrc || "/placeholder.svg"}
            alt="Background"
            fill
            priority
            style={{
              objectFit: isMobile ? "contain" : "cover",
              objectPosition: "center top",
            }}
          />
        </div>

        {/* Conteúdo com posicionamento relativo para ficar acima do background */}
        <div className={`relative z-10 px-4 h-full ${isMobile ? "py-6" : "py-24"}`}>
          <div className="container mx-auto max-w-6xl h-full">
            {isMobile && (
              <div className="absolute top-4 left-4 z-20">
                <Logo />
              </div>
            )}

            <div className="flex flex-col md:flex-row items-start justify-between h-full">
              <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                {!isMobile && (
                  <div className="mb-6">
                    <Logo />
                  </div>
                )}

                <h1 className={`text-3xl md:text-5xl font-medium mb-6 ${isMobile ? "mt-52" : ""}`} style={titleStyle}>
                  <span className="text-[#244C6C]">Como </span>
                  <span className="text-black">entender e falar</span>
                  <br />
                  <span className="text-black">inglês </span>
                  <span className="text-[#244C6C]">fluentemente em</span>
                  <br />
                  <span className="text-black">12 meses, </span>
                  <span className="text-[#244C6C]">ou menos.</span>
                </h1>

                <div className="inline-block bg-[#244C6C] text-white px-6 py-2 rounded-md mb-6 text-xl md:text-2xl font-bold">
                  28/07 a 11/08
                </div>

                <div className={`flex items-center mb-5 ${isMobile ? "justify-center" : ""}`}>
                  <div className="text-[#e74c3c] mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <p className="font-medium">Aulas de inglês ON-LINE e gratuitas</p>
                </div>

                <p className="mb-3">Inscreva-se abaixo para receber os links e materiais das aulas:</p>

                <form
                  onSubmit={handleSubmit}
                  id="LCI_ABR25"
                  className={`max-w-md ${isMobile ? "bg-white p-4 rounded-lg shadow-sm mx-auto" : ""}`}
                >
                  <div className="mb-1 relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#e74c3c] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="form-field-name"
                      placeholder="Primeiro Nome:"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38C02C] mb-1 pl-12 text-base"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-1 relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#e74c3c] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="inline-block"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="form-field-email"
                      placeholder="Digite seu melhor e-mail :)"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38C02C] mb-1 pl-12 text-base"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-2 relative">
                    <div className="absolute left-0 top-0 bottom-0 border-r border-gray-300 flex items-center">
                      <CountrySelect selectedCountry={selectedCountry} onSelect={setSelectedCountry} />
                    </div>
                    <input
                      type="tel"
                      name="whatsapp"
                      id="form-field-telefone"
                      placeholder="Digite seu WhatsApp com DDD"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#38C02C] mb-1 pl-24 text-base"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#38C02C] hover:bg-[#38C02C]/90 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 uppercase text-center w-full border-2 border-[#32E323] hover:scale-105 transform disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {isSubmitting ? "ENVIANDO..." : "QUERO PARTICIPAR GRATUITAMENTE"}
                  </button>
                </form>
              </div>

              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-[#e74c3c] opacity-20 rounded-xl transform translate-x-4 translate-y-4"></div>
                </div>
              </div>
            </div>
          </div>
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

