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

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">DATOS DE LA CUENTA</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              Nombre Completo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="Nombre Completo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Apellidos
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Apellidos"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
              Fecha de Nacimiento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthDate"
              type="date"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
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