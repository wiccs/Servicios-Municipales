import { Identity } from "@dfinity/agent";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { LogoutButton, useAuth, useCandidActor, useIdentities } from "@bundly/ares-react";

import { CandidActors } from "@app/canisters";
import Header from "@app/components/header";
export default function IcConnectPage() {
  const { isAuthenticated, currentIdentity, changeCurrentIdentity } = useAuth();
  const identities = useIdentities();
  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState(false); // State for loader
  const test = useCandidActor<CandidActors>("test", currentIdentity, {
    canisterId: process.env.NEXT_PUBLIC_TEST_CANISTER_ID,
  }) as CandidActors["test"];

  useEffect(() => {
    getProfile();
  }, [currentIdentity]);

  function formatPrincipal(principal: string): string {
    const parts = principal.split("-");
    const firstPart = parts.slice(0, 2).join("-");
    const lastPart = parts.slice(-2).join("-");
    return `${firstPart}-...-${lastPart}`;
  }

  function disableIdentityButton(identityButton: Identity): boolean {
    return currentIdentity.getPrincipal().toString() === identityButton.getPrincipal().toString();
  }

  async function getProfile() {
    try {
      const response = await test.getProfile();

      if ("err" in response) {
        if ("userNotAuthenticated" in response.err) console.log("User not authenticated");
        else console.log("Error fetching profile");
      }

      const profile = "ok" in response ? response.ok : undefined;
      setProfile(profile);
    } catch (error) {
      console.error({ error });
    }
  }

  async function registerProfile(username: string, bio: string) {
    try {
      setLoading(true); // Show loader
      const response = await test.createProfile(username, bio);

      if ("err" in response) {
        if ("userNotAuthenticated" in response.err) alert("User not authenticated");
        if ("profileAlreadyExists" in response.err) alert("Profile already exists");

        throw new Error("Error creating profile");
      }

      setProfile({ username, bio });
    } catch (error) {
      console.error({ error });
    } finally {
      setLoading(false); // Hide loader
    }
  }

  return (
    <>
      <Header />

      <main>
      {/* Contenido de la página */}
      <div className="container-fluid my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-sm-8 text-center">
            <h2>¿Qué es ÑU'UYO?</h2>
            <h4 className="p-2"><strong>Aplicación Web</strong> Para la gestión de Servicios <strong>Municipales</strong></h4>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-lg-4 row-cols-sm-2 p-5">
          {/* Primer paso */}
          <div className="col text-center process-step-style-01">
            <div className="process-step-icon-box p-2">
              <div className="process-step-icon bg-white">
              <img src="/images/administracion.png" className="w-full h-full" alt="Banner 2" />
              </div>
            </div>
            <h6>Administración</h6>
            <p>El módulo más robusto para manejar todas las cuentas por cobrar y pagar, facturación y reportes para la contabilidad.</p>
          </div>

          {/* Segundo paso */}
          <div className="col text-center process-step-style-01">
            <div className="process-step-icon-box p-2">
              <div className="process-step-icon bg-white">
                <img src="/images/proteger.png" width="60" height="60" alt="Seguridad" />
              </div>
            </div>
            <h6>Seguridad</h6>
            <p>Mayor seguridad a través de accesos verificados y controlados, que generan un historial de registros.</p>
          </div>

          {/* Tercer paso */}
          <div className="col text-center process-step-style-01">
            <div className="process-step-icon-box p-2">
              <div className="process-step-icon bg-white">
                <img src="/images/dialogo.png" width="60" height="60" alt="Comunicación" />
              </div>
            </div>
            <h6>Comunicación</h6>
            <p>Mantén informados a los ciudadanos a través de la app sencilla y diseñada para la comunicación.</p>
          </div>

          {/* Cuarto paso */}
          <div className="col text-center process-step-style-01">
            <div className="process-step-icon-box p-2">
              <div className="process-step-icon bg-white">
                <img src="/images/accesibilidad.png" width="60" height="60" alt="Accesibilidad" />
              </div>
            </div>
            <h6>Accesibilidad</h6>
            <p>Con tu App navega desde cualquier y dispositivo conectado a Internet, informate, paga cuotas y genera visitas.</p>
          </div>
        </div>

        {/* Sección de Misión */}
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-5 text-center">
              <img src="/images/tabla-periodica.png" className="p-4" alt="" width="300" height="300" />
            </div>
            <div className="col-md-6 mx-3">
              <h1 className="titulos">Misión</h1>
              <p className="parrafos">Facilitar el acceso y gestión eficiente de los servicios municipales a través de una plataforma web intuitiva y segura, mejorando la calidad de vida de los ciudadanos y promoviendo la participación activa en la comunidad.</p>
            </div>
          </div>
        </div>

        {/* Sección de Visión */}
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-6 mx-3">
              <h1 className="titulos">Visión</h1>
              <p className="parrafos">Convertirnos en la principal herramienta digital para la interacción entre los ciudadanos y los servicios municipales, siendo reconocidos por nuestra innovación, transparencia y compromiso con la mejora continua en la prestación de servicios públicos locales.</p>
            </div>
            <div className="col-md-5 text-center">
              <img src="/images/enfocar.png" className="p-4" alt="" width="300" height="300" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer className="mt-5">
        <div className="container-fluid bg-black py-4">
            <div className="flex flex-wrap justify-between items-center text-center text-white">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="my-0 text-xl text-white">ÑU'UYO</p>
                    {/* <img src="./public/images/Ñu'uyo_Logo.png" className="w-24 h-24 mx-auto mt-2" alt="Logo De La Empresa"> */}
                </div>
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <p className="my-0 text-lg text-white">¿Qué es?</p>
                    <p className="my-0 text-white">Sistema de control de servicios municipales.</p>
                </div>
                <div className="w-full md:w-1/3">
                    <p className="my-0 text-lg text-white">Síguenos en:</p>
                    <p className="flex justify-center space-x-4 mt-2">
                        <a href="#" className="text-white"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#" className="text-white"><i className="fa-brands fa-twitter"></i></a>
                        <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                    </p>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
}