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

      <div className="container mx-auto my-6">
      <h1 className="text-center text-3xl font-bold text-gray-800 my-4">Servicios Que Ofrecemos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {/* Primer servicio: Reserva de espacios públicos */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white rounded-lg p-4">
            <i className="fas fa-landmark text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 text-lg mb-2">RESERVA DE ESPACIOS PÚBLICOS</p>
              <p className="parrafos1">
                Gestiona la reserva de parques, salones comunitarios y otras instalaciones municipales con facilidad.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>

        {/* Segundo servicio: Constancias */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white">
            <i className="fas fa-money-check-dollar text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 text-lg mb-2">CONSTANCIAS</p>
              <p className="text-sm parrafos1">
                Solicita y descarga constancias oficiales directamente desde la aplicación. Ya sea una constancia de
                residencia, de no adeudo u otra, realiza el trámite de manera rápida y segura.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>

        {/* Tercer servicio: Pago de predial */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white">
            <i className=" fas fa-file-invoice-dollar text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 text-lg mb-2">PAGO DE PREDIAL</p>
              <p className="text-sm parrafos1">
                Mantén tus impuestos al día con nuestra plataforma de pago de predial. Consulta tu saldo pendiente y
                realiza el pago de manera segura y conveniente, evitando filas y trámites engorrosos.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>

        {/* Cuarto servicio: Pago de servicio de luz */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white rounded-lg p-4">
            <i className="fas fa-lightbulb text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 text-lg mb-2">PAGO DE SERVICIO DE LUZ</p>
              <p className="text-sm parrafos1">
                Realiza el pago de tu servicio de electricidad sin complicaciones. Accede a tu cuenta, revisa tus consumos
                y paga de forma rápida desde cualquier lugar.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>

        {/* Quinto servicio: Pago del servicio del agua */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white rounded-lg p-4">
            <i className="fa-solid fa-faucet text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 text-lg mb-2">PAGO DEL SERVICIO DEL AGUA</p>
              <p className="text-sm parrafos1">
                Paga tu factura de agua de manera sencilla y eficiente. Consulta tus consumos, recibe notificaciones de
                vencimiento y aprovecha descuentos por pago puntual.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>

        {/* Sexto servicio: Licencias */}
        <div className="col-md-4 p-2 card">
          <div className="bg-contenido text-white rounded-lg p-4">
            <i className="fas fa-tree text-4xl mb-4"></i>
            <div className="text-center">
              <p className="titulos1 mb-2">LICENCIAS</p>
              <p className="text-sm parrafos1">
                Gestiona la solicitud y renovación de licencias municipales, ya sea para comercio, construcción u otros
                permisos necesarios.
              </p>
              <br />
              <a href="./constancia.php" className="bg-green-500 text-white px-4 py-2 rounded">Ver mas</a>
            </div>
          </div>
        </div>
      </div>
    </div>

<br />
<br />
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