import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#244C6C] text-white py-4 px-4 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-left mb-4 md:mb-0">
          <p className="text-sm">Razão Social: Descomplica Cursos de Idiomas Ltda</p>
          <p className="text-sm">CNPJ: 32.314.052/0001-29 | Telefone: (54) 99911-0544</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Todos os Direitos Reservados © Copyright 2025</p>
          <p className="text-sm">
            <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-white">
              Política de Privacidade
            </Link>{" "}
            |{" "}
            <Link href="/termos-de-uso" className="text-gray-400 hover:text-white">
              Termos de Uso e Condições
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

