import { useState, useEffect } from "react";
import VureloLogo from "../assets/logos/vurelo.svg";
import WomanBackground from "../assets/images/actriz.png";
import WomanCard from "../assets/images/girl-phone.png";
import GuysCard from "../assets/images/boy-card.png";
import Slide1Image from "../assets/images/slide1.png";
import VureloIcon from "../assets/images/vurelo.png";
import PersonImage from "../assets/images/v-cards.png";
import ArrowIcon from "../assets/images/arrow.svg";

const HeroSection = () => {
  const [currentBackgroundSlide, setCurrentBackgroundSlide] = useState(0);
  const [currentCardSlide, setCurrentCardSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 59,
    hours: 20,
    minutes: 59,
    seconds: 30,
  });

  // Imágenes de fondo para el carrusel
  const backgroundImages = [WomanBackground, WomanCard, GuysCard];

  // Contenido de las tarjetas para mobile slider
  const cardSlides = [
    // Slide 1: Disponible muy pronto
    <div className="flex items-center gap-3 h-full">
      <div className="w-[60px] h-[60px] flex-shrink-0 relative">
        <img
          src={Slide1Image}
          alt="Vurelo Card"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-neue-montreal font-bold text-sm text-white">
            Disponible muy pronto
          </h3>
          <img src={ArrowIcon} alt="Arrow" className="w-3 h-3" />
        </div>
        <p className="font-inter text-xs text-white/80">
          En pocos días podrás abrir tu cuenta y empezar a mover tu plata.
        </p>
      </div>
    </div>,
    // Slide 2: Únete al universo
    <div className="flex items-center gap-3 h-full">
      <div className="w-[60px] h-[60px] flex-shrink-0">
        <img
          src={VureloIcon}
          alt="Vurelo"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-neue-montreal font-bold text-sm text-white">
            Únete al universo vurelo
          </h3>
          <img src={ArrowIcon} alt="Arrow" className="w-3 h-3" />
        </div>
        <p className="font-inter text-xs text-white/80">
          Descubre una nueva forma de manejar tu dinero.
        </p>
      </div>
    </div>,
    // Slide 3: Tarjeta ideal
    <div className="flex items-center gap-3 h-full">
      <div className="w-[60px] h-[60px] flex-shrink-0">
        <img
          src={PersonImage}
          alt="Person"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-neue-montreal font-bold text-sm text-white">
            Tenemos la tarjeta ideal para ti
          </h3>
          <img src={ArrowIcon} alt="Arrow" className="w-3 h-3" />
        </div>
        <p className="font-inter text-xs text-white/80">
          Encuentra la opción perfecta para tus necesidades.
        </p>
      </div>
    </div>,
  ];

  // Auto-slide para imágenes de fondo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Auto-slide para las tarjetas en mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardSlide((prev) => (prev + 1) % cardSlides.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [cardSlides.length]);

  // Contador en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0082c9]">
      {/* Carrusel de imágenes de fondo */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentBackgroundSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 h-screen">
        {/* DESKTOP Layout (md and up) - Ahora visible desde tablet */}
        <div className="hidden md:block">
          {/* Texto principal abajo a la izquierda */}
          <div className="absolute bottom-8 left-4 md:left-8 lg:left-20 lg:bottom-16">
            <img
              src={VureloLogo}
              alt="Vurelo Logo"
              className="w-24 md:w-32 lg:w-36 mb-4 md:mb-6"
            />
            <h1
              className="font-neue-montreal font-bold text-white"
              style={{
                fontSize: "clamp(20px, 3.5vw, 48px)",
                lineHeight: "clamp(24px, 4vw, 59px)",
                letterSpacing: "0%",
                maxWidth: "min(750px, calc(100vw - 600px))",
              }}
            >
              Mueve tu plata en la economía digital. Seguro, Simple y Sin
              Sorpresas.
            </h1>
          </div>

          {/* Data Grid COMPACTO para tablets (768px-1280px) - MISMO CONTENIDO */}
          <div className="absolute bottom-8 right-4 hidden md:block xl:hidden w-[320px]">
            <div className="w-full space-y-3">
              {/* Tarjeta superior - MISMA pero más pequeña */}
              <div className="bg-white/30 backdrop-blur-sm border border-white rounded-lg p-2 h-[100px]">
                <div className="flex items-center gap-2 h-full">
                  <div className="w-[120px] h-[84px] flex-shrink-0 relative">
                    <img
                      src={Slide1Image}
                      alt="Vurelo Card"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full py-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-neue-montreal font-bold text-sm leading-none text-white">
                        Disponible muy pronto
                      </h3>
                      <img src={ArrowIcon} alt="Arrow" className="w-3 h-3" />
                    </div>
                    <p className="font-inter text-xs leading-tight text-white/80 mt-auto">
                      En pocos días podrás abrir
                      <br />
                      tu cuenta y empieza
                      <br />a mover tu plata.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fila de 2 tarjetas - MISMAS pero apiladas */}
              <div className="space-y-2">
                <div className="bg-white/30 backdrop-blur-sm border border-white rounded-lg p-3 h-[80px]">
                  <div className="flex items-center gap-2 h-full">
                    <div className="w-[60px] h-[60px] flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={VureloIcon}
                        alt="Vurelo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-neue-montreal font-bold text-sm leading-none text-white">
                      Únete al universo vurelo
                    </h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden h-[80px] p-1">
                  <div className="relative h-full">
                    <img
                      src={PersonImage}
                      alt="Person"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-1 right-0 p-2">
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-neue-montreal font-bold text-xs text-white"
                          style={{ lineHeight: "110%" }}
                        >
                          Tenemos la tarjeta ideal para ti
                        </h3>
                        <img src={ArrowIcon} alt="Arrow" className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contador - MISMO contenido */}
              <div className="bg-white/40 backdrop-blur-sm border border-white rounded-lg p-3">
                <div
                  className="font-neue-montreal font-bold text-white mb-3 text-center"
                  style={{ fontSize: "12px", lineHeight: "124%" }}
                >
                  Vurelo llega en
                </div>
                <div className="flex items-center justify-center gap-2">
                  {[
                    { value: timeLeft.days, label: "Días" },
                    { value: timeLeft.hours, label: "Horas" },
                    { value: timeLeft.minutes, label: "Minutos" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg px-2 py-2 text-center min-w-[55px]"
                    >
                      <div
                        className="font-neue-montreal font-bold text-gray-800"
                        style={{ fontSize: "18px", lineHeight: "110%" }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="font-neue-montreal font-bold text-gray-700 mt-1"
                        style={{ fontSize: "9px", lineHeight: "120%" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Data Grid COMPLETO para desktop (1280px+) - CONTENIDO ORIGINAL */}
          <div className="absolute bottom-16 right-8 hidden xl:block w-[458px]">
            <div className="w-full space-y-4">
              {/* Tarjeta superior con slide fijo */}
              <div className="bg-white/30 backdrop-blur-sm border border-white rounded-lg p-2 h-[135px]">
                <div className="flex items-center gap-3 h-full">
                  <div className="w-[230px] h-[119px] flex-shrink-0 relative">
                    <img
                      src={Slide1Image}
                      alt="Vurelo Card"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between h-full py-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-neue-montreal font-bold text-base leading-none text-white">
                        Disponible muy pronto
                      </h3>
                      <img src={ArrowIcon} alt="Arrow" className="w-4 h-4" />
                    </div>
                    <p className="font-inter text-xs leading-tight text-white/80 mt-auto">
                      En pocos días podrás abrir
                      <br />
                      tu cuenta y empieza
                      <br />a mover tu plata.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fila de 2 tarjetas */}
              <div className="flex gap-4">
                <div className="bg-white/30 backdrop-blur-sm border border-white rounded-lg p-4 w-[241px] h-[139px]">
                  <div className="flex items-center gap-3 h-full">
                    <div className="w-[115px] h-[119px] flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={VureloIcon}
                        alt="Vurelo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-neue-montreal font-bold text-base leading-none text-white">
                      Únete al universo vurelo
                    </h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden flex-1 h-[135px] p-1">
                  <div className="relative h-full">
                    <img
                      src={PersonImage}
                      alt="Person"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-2 right-0 p-3">
                      <div className="flex items-center justify-between">
                        <h3
                          className="font-neue-montreal font-bold text-base text-white"
                          style={{ lineHeight: "110%" }}
                        >
                          Tenemos la tarjeta ideal para ti
                        </h3>
                        <img src={ArrowIcon} alt="Arrow" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contador */}
              <div className="bg-white/40 backdrop-blur-sm border border-white rounded-lg p-4">
                <div
                  className="font-neue-montreal font-bold text-white mb-4"
                  style={{ fontSize: "14px", lineHeight: "124%" }}
                >
                  Vurelo llega en
                </div>
                <div className="flex items-center justify-center gap-4">
                  {[
                    { value: timeLeft.days, label: "Días" },
                    { value: timeLeft.hours, label: "Horas" },
                    { value: timeLeft.minutes, label: "Minutos" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg px-4 py-3 text-center min-w-[70px]"
                    >
                      <div
                        className="font-neue-montreal font-bold text-gray-800"
                        style={{ fontSize: "28.71px", lineHeight: "110%" }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="font-neue-montreal font-bold text-gray-700 mt-1"
                        style={{ fontSize: "11.58px", lineHeight: "120%" }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE Layout (below md) */}
        <div className="block md:hidden">
          {/* Contenido inferior con especificaciones exactas */}
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: "295px",
              paddingTop: "32px",
              paddingRight: "24px",
              paddingBottom: "32px",
              paddingLeft: "24px",
            }}
          >
            <div
              className="flex flex-col w-full"
              style={{
                gap: "24px",
              }}
            >
              {/* Logo y título */}
              <div
                className="flex flex-col w-full"
                style={{
                  gap: "24px",
                }}
              >
                {/* Logo Vurelo */}
                <img
                  src={VureloLogo}
                  alt="Vurelo Logo"
                  style={{
                    width: "123px",
                    height: "32px",
                  }}
                />

                {/* Título */}
                <h1
                  className="font-neue-montreal font-bold text-white w-full"
                  style={{
                    fontSize: "25px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {/*MUEVE TU PLATA EN LA ECONOMÍA DIGITAL. SEGURO, SIMPLE Y SIN SORPRESAS.*/}
                  Mueve tu plata en la economía digital.
                  <br />
                  Seguro, simple y sin sorpresas.
                </h1>
              </div>

              {/* Slider de tarjetas */}
              <div
                className="flex flex-col w-full"
                style={{
                  gap: "8.57px",
                }}
              >
                {/* Tarjeta slider */}
                <div
                  className="bg-white/30 backdrop-blur-sm border border-white rounded-lg p-3"
                  style={{ height: "80px" }}
                >
                  <div className="h-full transition-all duration-500 ease-in-out">
                    {cardSlides[currentCardSlide]}
                  </div>
                </div>

                {/* Indicadores de slide */}
                <div className="flex justify-center gap-2">
                  {cardSlides.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === currentCardSlide ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
