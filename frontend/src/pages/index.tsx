import { Identity } from "@dfinity/agent";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { LogoutButton, useAuth, useCandidActor, useIdentities } from "@bundly/ares-react";

import { CandidActors } from "@app/canisters";
import Header from "@app/components/header";

type Profile = {
  username: string;
  bio: string;
};

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
        {/* <!-- Contenido de la pagina --> */}
        <div className="container mx-auto px-4">
            <div className="relative overflow-hidden">
                <div className="slide">
                    <button className="prevBtn absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    {/* <img src="" className="w-full h-full" alt=""> */}
                    <img src="/images/1.png" className="w-full h-full" alt="Banner 2" />

                    <button className="nextBtn absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="slide">
                    <button className="prevBtn absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    {/* <img src="./public/images/banner_2.png" className="w-full h-full" alt=""> */}
                    <button className="nextBtn absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="slide">
                    <button className="prevBtn absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    {/* <img src="./public/images/banner_3.png" className="w-full h-full" alt=""> */}
                    <button className="nextBtn absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="slide">
                    <button className="prevBtn absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    {/* <img src="./public/images/banner_4.png" className="w-full h-full" alt=""> */}
                    <button className="nextBtn absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="slide">
                    <button className="prevBtn absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    {/* <img src="./public/images/banner_5.png" className="w-full h-full" alt=""> */}
                    <button className="nextBtn absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            {/* <!-- Sección de tarjetas --> */}
            <div className="container border-negro"></div>
            <div className="container mx-auto my-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
                    <div className="card rounded-0 m-3 border border-gray-200 shadow-lg">
                        <div className="card-body text-center p-4">
                            <div className="icono py-2"></div>
                            <h4 className="text-xl parrafos text-bold-600">RESERVA DE ESPACIOS PÚBLICOS</h4>
                            <p className="text-gray-700 mt-2">Conoce aquí los espacios para reservar.</p>
                            {/* <img src="./public/images/reserva.png" className="w-12 h-12 mx-auto mt-4" alt=""> */}
                            <img src="/images/calendario.png" className="w-8 h-8 object-contain mx-auto mt-4" alt="Calendario" />

                        </div>
                    </div>
                    <div className="card rounded-0 m-3 border border-gray-200 shadow-lg">
                        <div className="card-body text-center p-4">
                            <div className="icono py-2"></div>
                            <h4 className="text-xl parrafos text-bold-600">CONSTANCIAS Y LICENCIAS</h4>
                            <p className="text-gray-700 mt-2">Solicita tramite de tu constancia o licencia.</p>
                            {/* <img src="./public/images/calendario.png" className="w-12 h-12 mx-auto mt-4" alt=""> */}
                            <img src="/images/reserva.png" className="w-8 h-8 object-contain mx-auto mt-4" alt="Reserva" />
                        </div>
                    </div>
                    <div className="card rounded-0 m-3 border border-gray-200 shadow-lg">
                        <div className="card-body text-center p-4">
                            <div className="icono p-2"></div>
                            <h4 className="text-xl parrafos text-bold-600">SISTEMA DE SERVICIOS MUNICIPALES</h4>
                            <p className="text-gray-700 mt-2">Clave única de tramites y servicios.</p>
                            {/* <img src="./public/images/municipio.png" className="w-12 h-12 mx-auto mt-4" alt=""> */}
                            <img src="/images/municipio.png" className="w-8 h-8 object-contain mx-auto mt-4" alt="Municipios" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>

    

    <div className="container mx-auto text-center p-4">
        <h1 className="textocontacto text-bold mb-3">¡TRABAJAREMOS JUNTOS!</h1>
        <img src="/images/Ñu'uyo_Logo.png" className="w-50 h-60 object-contain mx-auto mt-4" alt="Municipios" />
        <h5 className="text-lg mb-4"><strong>Estamos listos</strong> para recibir tu solicitud, solo ingresa tu número de <strong>WhatsApp</strong> y listo.</h5>
        {/* <img src="./public/images/Ñu'uyo_Logo.png" className="mx-auto mb-4 w-32 h-32" alt=""> */}
        <h1 className="text-center">
            <a className="btn-whatsapp bg-green-500 text-white py-2 px-4 rounded inline-flex items-center" href="https://api.whatsapp.com/send?phone=9514306030&text=%C2%A1Hola!%20estoy%20viendo%20su%20p%C3%A1gina%20web%20e%20ingrese%20mi%20numero%20de%20WhatsApp%20para%20m%C3%A1s%20informaci%C3%B3n%20de%20la%20plataforma" target="_blank">
                Hacer contacto
            </a>
        </h1>
    </div>

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

type ProfileFormProps = {
  onSubmit: (username: string, bio: string) => Promise<void>;
  loading: boolean; // Loader state
};

function CreateProfileForm({ onSubmit, loading }: ProfileFormProps) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit(username, bio);
    resetForm();
  };

  const resetForm = () => {
    setUsername("");
    setBio("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bio"
          placeholder="Bio"
          value={bio}
          onChange={handleBioChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </button>
      </div>
    </form>
  );
}
