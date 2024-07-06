"use client";
import { FormEvent, useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const subscribeUser = async (e: FormEvent) => {
    e.preventDefault();

    console.log("dentro de la funcion", email);
    try {
      const res = await fetch("/api/subscribeUser", {
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.ok) {
        setMessage("¡Gracias por suscribirte!");
        setIsError(false);
        setEmail(""); // Limpiar el campo de entrada después de la suscripción
      } else {
        setMessage("Hubo un error. Por favor, inténtalo de nuevo.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error en la suscripción:", error);
      setMessage("Hubo un error. Por favor, inténtalo de nuevo.");
      setIsError(true);
    }
  };

  console.log(email);
  return (
    <div className="2xl:mx-auto 2xl:container mx-4 py-16">
      <div className="w-full relative flex items-center justify-center">
        <div className="prose dark:prose-invert bg-opacity-80 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
          <h1 className="text-4xl font-semibold leading-9 text-center text-gray-900 dark:text-white">
            ¡No te lo pierdas!
          </h1>
          <p className="text-base leading-normal text-center text-gray-700 dark:text-gray-300 mt-6">
            Suscríbete a nuestra newsletter para estar al tanto. Nuestra
            newsletter se envía una vez a la semana, cada viernes, así que
            suscríbete para recibir las últimas noticias y actualizaciones.
          </p>
          <form
            onSubmit={subscribeUser}
            className="sm:border border-gray-300 dark:border-gray-600 flex-col sm:flex-row flex items-center w-full mt-12 space-y-4 sm:space-y-0"
          >
            <input
              type="email"
              value={email}
              className="border border-gray-300 dark:border-gray-600 sm:border-transparent text-base w-full font-medium leading-none text-gray-900 dark:text-white p-4 focus:outline-none bg-transparent placeholder-gray-600 dark:placeholder-gray-400"
              placeholder="Correo Electrónico"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 border border-gray-300 dark:border-gray-600 sm:border-transparent w-full sm:w-auto bg-gray-900 dark:bg-gray-700 text-white py-4 px-6 hover:bg-opacity-75 ${
                email === "" ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={email === ""}
            >
              Suscribirse
            </button>
          </form>
          {message && (
            <p
              className={`text-center text-base mt-4 ${
                isError
                  ? "text-red-600 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
