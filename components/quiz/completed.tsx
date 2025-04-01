import Logo from "@/components/logo"
import Footer from "@/components/footer"

export default function Completed() {
  return (
    <main className="min-h-screen flex flex-col bg-background-light">
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <Logo />
          </div>

          <div className="text-center mt-8 mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-blue">Obrigado por completar o quiz!</h1>
            <p className="text-xl mb-8">
              Sua aula com 3 exercícios exclusivos será enviada para o seu e-mail em breve.
            </p>
            <p className="text-lg">Fique de olho na sua caixa de entrada e também no WhatsApp!</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

