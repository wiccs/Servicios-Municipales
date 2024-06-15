import { InternetIdentityButton, LogoutButton, useAuth } from "@bundly/ares-react";
import Link from 'next/link';


export default function Header() {
  const { isAuthenticated, currentIdentity } = useAuth();

  return (

    <header>
  {/* `  <!-- Ménu de la página -->` */}

    <nav className="navbar shadow-md">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <Link href="/">
                  <span className="flex items-center space-x-2 text-2xl text-white">ÑU'UYO</span>
                </Link>
                <div className="hidden md:flex space-x-4">
                  <Link href="/tramites">
                  <span className="text-white hover:text-gray-600 parrafos">TRÁMITES Y SERVICIOS</span>
                  </Link>
                  <Link href="/acercaDe">
                  <span className="text-white hover:text-gray-600 parrafos">ACERCA DE</span>
                  </Link>
                    <a href="ayuda.php" className="text-white hover:text-gray-600 parrafos">AYUDA</a>
                    {/* <a href="./Admin/index.php" className="bg-blue-500 text-white px-4 py-2 rounded">INICIA SESIÓN</a> */}
                    {/* <a href="./registrarse.php" className="bg-green-500 text-white px-4 py-2 rounded">REGISTRARSE</a> */}
                    <a href="#" className="text-white hover:text-gray-600">
                        <i className="fas fa-search"></i>
                    </a>
                    {isAuthenticated ? (
                      <Link href="/configuracion">
                      <span className="text-white hover:text-gray-600">CONFIGURACIÓN</span>
                      </Link>
                    ) : (
                      <Link href="/tramites">
                      <span className="text-white hover:text-gray-600"></span>
                      </Link>
                    )}
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                      <LogoutButton identity={currentIdentity} />
                    ) : (
                      <InternetIdentityButton>Iniciar sesión</InternetIdentityButton>
                    )}
                  </div>
                </div>
            </div>
        </div>
    </nav>
</header>
   
  );
}
