"use client"

import { useState } from "react"

interface QuestionProps {
  id: number
  question: string
  options: string[]
  showBackButton: boolean
  onNext: (selectedOption: string) => void
  onBack: () => void
}

export default function Question({ id, question, options, showBackButton, onNext, onBack }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption)
    }
  }

  return (
    <div className="bg-black text-white rounded-lg p-6 mb-8">
      <h2 className="text-xl mb-4">{question}</h2>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="radio-container">
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-${id}`}
              className="radio-input"
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
            />
            <label htmlFor={`option-${index}`} className="cursor-pointer">
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        {showBackButton ? (
          <button onClick={onBack} className="btn-back w-[48%]">
            VOLTAR
          </button>
        ) : (
          <div className="w-[48%]"></div>
        )}
        <button onClick={handleNext} className="btn-next w-[48%]" disabled={!selectedOption}>
          PRÓXIMA
        </button>
      </div>
    </div>
  )
}

