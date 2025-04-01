import Logo from "@/components/logo"
import Footer from "@/components/footer"

export default function Analyzing() {
  return (
    <main className="min-h-screen flex flex-col bg-background-light">
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <Logo />
          </div>

          <div className="text-center mt-8 mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary-blue">
              Aguarde! Estamos analisando seu perfil...
            </h1>
            <div className="w-16 h-16 border-4 border-accent-green border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

