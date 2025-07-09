import { useState } from "react";
import LogoV from "../assets/logos/VureloV.svg";
import MenuButton from "../assets/images/Menu-button.svg";
import FormModal from "./FormModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);

  const handleSolicitarAhora = () => {
    setFormModalOpen(true);
    setMenuOpen(false); // Cerrar el menú mobile si está abierto
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full px-8 py-4 z-[99999] pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10.850000381469727px)",
          WebkitBackdropFilter: "blur(10.850000381469727px)",
        }}
      >
        {/* UN SOLO contenedor que se adapta */}
        <div className="w-full h-full pointer-events-auto flex items-center justify-between">
          {/* Logo - tamaños originales */}
          <img
            src={LogoV}
            alt="Vurelo V"
            className="w-10 h-10 md:w-12 md:h-12 pointer-events-auto"
          />

          {/* Desktop nav - espaciado original */}
          <div className="hidden md:flex items-center gap-6 pointer-events-auto">
            <ul className="flex gap-6 pointer-events-auto">
              <li>
                <a
                  href="#nosotros"
                  className="font-inter font-bold text-base leading-tight text-black hover:text-gray-600 transition-colors"
                >
                  Universo Vurelo
                </a>
              </li>
              <li>
                <a
                  href="#funciona"
                  className="font-inter font-bold text-base leading-tight text-black hover:text-gray-600 transition-colors"
                >
                  ¿Cómo funciona?
                </a>
              </li>
              <li>
                <a
                  href="#tarjeta"
                  className="font-inter font-bold text-base leading-tight text-black hover:text-gray-600 transition-colors"
                >
                  Tarjeta
                </a>
              </li>
            </ul>
            <button
              onClick={handleSolicitarAhora}
              className="font-inter font-bold text-base leading-tight bg-black text-white rounded-full px-7 py-3 shadow-md hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Solicitar ahora
            </button>
          </div>

          {/* Mobile: Botón y hamburguesa - tamaños originales */}
          <div className="flex md:hidden items-center gap-4 pointer-events-auto">
            {/* Botón Solicitar ahora en mobile - TAMAÑO ORIGINAL */}
            <button
              onClick={handleSolicitarAhora}
              className="font-neue-montreal text-white text-center flex items-center justify-center cursor-pointer"
              style={{
                width: "152px",
                height: "40px",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "120%",
                letterSpacing: "0%",
                borderRadius: "20px",
                backgroundColor: "#181819",
                backgroundBlendMode: "multiply",
              }}
            >
              Solicitar ahora
            </button>

            {/* Menu button SVG - Reemplaza el hamburger anterior */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <img src={MenuButton} alt="Menu" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-white z-[9998] flex flex-col items-center justify-center md:hidden"
          style={{ paddingTop: "80px" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-black focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="flex flex-col items-center gap-8 text-center">
            <li>
              <a
                href="#nosotros"
                onClick={() => setMenuOpen(false)}
                className="font-inter font-bold text-2xl leading-tight text-black hover:text-gray-600 transition-colors"
              >
                Universo Vurelo
              </a>
            </li>
            <li>
              <a
                href="#funciona"
                onClick={() => setMenuOpen(false)}
                className="font-inter font-bold text-2xl leading-tight text-black hover:text-gray-600 transition-colors"
              >
                ¿Cómo funciona?
              </a>
            </li>
            <li>
              <a
                href="#tarjeta"
                onClick={() => setMenuOpen(false)}
                className="font-inter font-bold text-2xl leading-tight text-black hover:text-gray-600 transition-colors"
              >
                Tarjeta
              </a>
            </li>
            <li className="mt-8">
              <button
                onClick={handleSolicitarAhora}
                className="font-inter font-bold text-lg bg-black text-white rounded-full px-8 py-4 shadow-md hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Solicitar ahora
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Form Modal */}
      <FormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
