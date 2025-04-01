"use client"

import type React from "react"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Logo from "@/components/logo"
import Footer from "@/components/footer"
import CountrySelect from "@/components/country-select"
import { useIsMobile } from "@/hooks/use-mobile"

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

export default function LandingPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // Brasil como padrão
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Store form data in localStorage with country code
    localStorage.setItem(
      "leadData",
      JSON.stringify({
        ...formData,
        countryCode: selectedCountry.code,
        countryDDI: selectedCountry.ddi,
        phone: `${selectedCountry.ddi}${formData.whatsapp}`,
        source: params.slug,
      }),
    )

    // Redirect to quiz page with the same slug parameter
    router.push(`/quiz/${params.slug}`)
  }

  // Determina qual background usar com base no tamanho da tela
  const backgroundImage = isMobile
    ? "url('/images/hero-mobile-background.webp')"
    : "url('/images/hero-background.webp')"

  return (
    <main className="min-h-screen flex flex-col">
      <div
        className="flex-grow relative"
        style={{
          minHeight: "calc(100vh - 80px)", // Altura mínima para garantir que o conteúdo caiba
        }}
      >
        {/* Background com posicionamento absoluto para cobrir todo o container */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: backgroundImage,
            backgroundSize: isMobile ? "100% auto" : "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#D1DADF", // Cor de fundo atualizada
          }}
        />

        {/* Conteúdo com posicionamento relativo para ficar acima do background */}
        <div className="relative z-10 py-12 px-4 h-full">
          <div className="container mx-auto max-w-6xl h-full">
            <div className="flex flex-col md:flex-row items-start justify-between h-full">
              <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <div className="mb-6">
                  <Logo />
                </div>

                <h1 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight ${isMobile ? "mt-32" : ""}`}>
                  <span className="text-[#2c3e50]">Como </span>
                  <span className="text-black">entender e falar</span>
                  <br />
                  <span className="text-black">inglês </span>
                  <span className="text-[#2c3e50]">fluentemente em</span>
                  <br />
                  <span className="text-black">12 meses, </span>
                  <span className="text-[#2c3e50]">ou menos.</span>
                </h1>

                <div className="inline-block bg-[#2c3e50] text-white px-6 py-2 rounded-md mb-6 text-base">
                  07/04 a 13/04
                </div>

                <div className="flex items-center mb-5">
                  <div className="bg-[#e74c3c] rounded-md p-1 mr-3"></div>
                  <p className="font-medium">Aulas de inglês ON-LINE e gratuitas</p>
                </div>

                <p className="mb-3">Inscreva-se abaixo para receber os links e materiais das aulas:</p>

                <form
                  onSubmit={handleSubmit}
                  className={`max-w-md ${isMobile ? "bg-white p-4 rounded-lg shadow-sm" : ""}`}
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
                      placeholder="Primeiro Nome:"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb85c] mb-1 pl-12 text-base"
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
                      placeholder="Digite seu melhor e-mail :)"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb85c] mb-1 pl-12 text-base"
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
                      placeholder="Digite seu WhatsApp com DDD"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5cb85c] mb-1 pl-24 text-base"
                      value={formData.whatsapp}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white font-bold py-3 px-6 rounded-md transition-all duration-200 uppercase text-center w-full"
                  >
                    QUERO PARTICIPAR GRATUITAMENTE
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

