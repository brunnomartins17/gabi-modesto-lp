"use client"

import { useState, useRef, useEffect } from "react"

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

interface CountrySelectProps {
  selectedCountry: (typeof countries)[0]
  onSelect: (country: (typeof countries)[0]) => void
}

export default function CountrySelect({ selectedCountry, onSelect }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative h-full" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-center h-full space-x-1 px-2 bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium">{selectedCountry.ddi}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 left-0 bottom-full mb-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              className="w-full flex items-center px-3 py-2 text-left"
              onClick={() => {
                onSelect(country)
                setIsOpen(false)
              }}
            >
              <span className="text-lg mr-2">{country.flag}</span>
              <span className="text-sm">{country.name}</span>
              <span className="text-sm ml-auto text-gray-500">{country.ddi}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

