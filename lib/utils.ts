import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Função para extrair o parâmetro de origem da URL
export function getSourceParam(url: string): string {
  const pathParts = url.split("/")
  return pathParts[pathParts.length - 1]
}

// Função para preservar o parâmetro de origem ao navegar entre páginas
export function preserveSourceParam(currentPath: string, targetPath: string): string {
  const source = getSourceParam(currentPath)
  return `${targetPath}/${source}`
}

// Função para salvar dados do lead no localStorage
export function saveLeadData(data: any, source: string) {
  const leadData = {
    ...data,
    source,
    timestamp: new Date().toISOString(),
  }
  localStorage.setItem("leadData", JSON.stringify(leadData))
  return leadData
}

// Função para salvar respostas do quiz no localStorage
export function saveQuizAnswers(answers: Record<number, string>) {
  localStorage.setItem("quizAnswers", JSON.stringify(answers))
}

// Função para recuperar dados do lead do localStorage
export function getLeadData() {
  const data = localStorage.getItem("leadData")
  return data ? JSON.parse(data) : null
}

// Função para recuperar respostas do quiz do localStorage
export function getQuizAnswers() {
  const data = localStorage.getItem("quizAnswers")
  return data ? JSON.parse(data) : {}
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

