import React, { useState, useCallback, useEffect } from "react";
import PhoneWalletVideo from "../assets/video/Vurelo-home.mp4";
import GuysCardImage from "../assets/images/phone-transactions.png";
import LanguageIcon from "../assets/images/Language.svg";
import VurelovIcon from "../assets/images/Vurelov.svg";
import GuyPhoneImage from "../assets/images/Guys-phones.png";
import GuyPhoneImage2 from "../assets/images/guys-phone.png";
import Language2Icon from "../assets/images/Language2.svg";
import Language3Icon from "../assets/images/Language3.svg";
import WomanCardImage from "../assets/images/woman-card-v.png";
import Boycard from "../assets/images/boy.png";
import CardImage from "../assets/images/card.svg";
import PhoneGirl from "../assets/images/actriz.png";
import Arrow1Icon from "../assets/images/arrow1.svg";
import Arrow2Icon from "../assets/images/arrow2.svg";
import Language4Icon from "../assets/images/Language4.svg";

const MoveMoneySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // Array de todas las cards
  const mobileCards = [
    {
      id: 1,
      title: "¿Qué es Vurelo?",
      description:
        "Una app para mover tu plata fácil, rápido y sin bancos. Usa dólares digitales en tu día a día.",
      bgColor: "#3DD973",
      image: GuysCardImage,
      icon: LanguageIcon,
      hasOverlay: true,
      mobileExpandedByDefault: true,
    },
    {
      id: 2,
      title: "¿Qué puedes hacer?",
      description:
        "Recarga, guarda, transfiere, paga o retira. Todo en un solo lugar. Y desde tu cel.",
      bgColor: "#3C50F5",
      hoverBgColor: "#7C8AFF",
      icon: LanguageIcon,
      hasOverlay: false,
      mobileExpandedByDefault: true,
    },
    {
      id: 3,
      title: "¿Y cómo uso mi plata?",
      description:
        "Con tu tarjeta Vurelo (Atlantis, Terra o Titan) compras en línea o en tienda, y retiras en cajeros.",
      bgColor: "#FFFFFF",
      image: VurelovIcon,
      hoverImage: GuyPhoneImage2,
      icon: Language3Icon,
      hoverIcon: Language2Icon,
      hasOverlay: false,
      isSpecial: true,
      hoverBgColor: "#3C50F5",
      mobileExpandedByDefault: false,
    },
    {
      id: 4,
      title: "",
      bgColor: "transparent",
      image: WomanCardImage,
      hasOverlay: false,
      isImageOnly: true,
    },
    {
      id: 5,
      title: "¿En qué moneda funciona?",
      description:
        "Maneja tus fondos en Dólares Digitales. Envíalos, recíbelos o ahórralos.",
      bgColor: "#06AFF2",
      hoverBgColor: "#42C4FF",
      icon: LanguageIcon,
      hasOverlay: false,
      mobileExpandedByDefault: true,
    },
    {
      id: 6,
      title: "Hecho para que cualquiera pueda usarlo",
      description:
        "No necesitas ser experto. Con Vurelo todo es claro, directo y pensado para que entiendas tu plata desde el primer toque.",
      image: PhoneGirl,
      icon: Language3Icon,
      hasOverlay: true,
      mobileExpandedByDefault: true,
    },
    {
      id: 7,
      title: "",
      bgColor: "transparent",
      image: Boycard,
      hasOverlay: false,
      isImageOnly: true,
    },
    {
      id: 8,
      title: "Respaldado por quienes sí saben",
      description:
        "Detrás hay un equipo con más de 10 años creando tecnología financiera que funciona de verdad. Apoyado por Asoblockchain, Vurelo Lab y Pagora.",
      bgColor: "#1E1E1E",
      image: CardImage,
      hoverImage: GuyPhoneImage,
      icon: LanguageIcon,
      hoverIcon: Language3Icon,
      hasOverlay: true,
      isSpecialHover: true,
      hoverBgColor: "#FFFFFF",
      mobileExpandedByDefault: false,
    },
  ];

  // Filtrar cards para mobile (excluir WomanCardImage y Boycard)
  const mobileFilteredCards = mobileCards.filter(
    (card) => card.id !== 4 && card.id !== 7
  );

  // Auto-slide cada 3 segundos solo si está activo
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isAutoSliding) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mobileFilteredCards.length);
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoSliding, mobileFilteredCards.length]);

  const stopAutoSlide = useCallback(() => {
    setIsAutoSliding(false);
  }, []);

  const nextSlide = useCallback(() => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % mobileFilteredCards.length);
  }, [mobileFilteredCards.length, stopAutoSlide]);

  const prevSlide = useCallback(() => {
    stopAutoSlide();
    setCurrentSlide(
      (prev) =>
        (prev - 1 + mobileFilteredCards.length) % mobileFilteredCards.length
    );
  }, [mobileFilteredCards.length, stopAutoSlide]);

  const goToSlide = useCallback(
    (index: React.SetStateAction<number>) => {
      stopAutoSlide();
      setCurrentSlide(index);
    },
    [stopAutoSlide]
  );

  // Función mejorada para renderizar card mobile
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMobileCard = (card: any) => {
    if (card.isImageOnly) {
      return (
        <img
          src={card.image}
          alt="Card"
          className="w-full h-full object-cover"
        />
      );
    }

    // Cards especiales (logo V) - SIEMPRE mostrar estado hover en mobile
    if (card.isSpecial) {
      return (
        <div className="w-full h-full flex flex-col">
          {/* Imagen superior */}
          <div className="w-full h-24">
            <img
              src={card.hoverImage}
              alt="Guy with phone"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido inferior con fondo azul */}
          <div
            className="flex flex-col flex-1 gap-3 p-4"
            style={{ backgroundColor: card.hoverBgColor }}
          >
            {/* Título y botón */}
            <div className="flex items-center justify-between">
              <span className="text-white font-medium text-sm">
                {card.title}
              </span>
              <img src={card.hoverIcon} alt="Icon" className="w-6 h-6" />
            </div>

            {/* Texto descriptivo */}
            <p className="text-white text-xs leading-tight">
              {card.description}
            </p>
          </div>
        </div>
      );
    }

    // Cards especiales hover (equipo) - SIEMPRE mostrar estado hover en mobile
    if (card.isSpecialHover) {
      return (
        <div className="w-full h-full flex flex-col">
          {/* Imagen superior */}
          <div className="w-full h-24">
            <img
              src={card.hoverImage}
              alt="Team guys"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenido inferior con fondo blanco */}
          <div
            className="flex flex-col flex-1 gap-2 p-4"
            style={{ backgroundColor: card.hoverBgColor }}
          >
            {/* Título y botón */}
            <div className="flex items-center justify-between">
              <span className="text-black font-medium text-sm">
                {card.title}
              </span>
              <img src={card.hoverIcon} alt="Icon" className="w-6 h-6" />
            </div>

            {/* Texto descriptivo */}
            <p className="text-black text-xs leading-tight">
              {card.description}
            </p>
          </div>
        </div>
      );
    }

    // Cards con overlay - Estado expandido en mobile por defecto
    if (card.hasOverlay && card.mobileExpandedByDefault) {
      return (
        <div className="w-full h-full">
          {/* Imagen de fondo */}
          <img
            src={card.image}
            alt="Card"
            className="w-full h-full object-cover"
          />

          {/* Contenido expandido fijo en mobile */}
          <div
            className="absolute bottom-0 left-0 right-0 h-26"
            style={{
              background: "rgba(34, 34, 34, 0.3)",
              backdropFilter: "blur(1px)",
              padding: "12px",
            }}
          >
            <div className="flex flex-col gap-3 h-full">
              {/* Título y botón - siempre visible */}
              <div className="flex items-center justify-between">
                <span
                  className="text-white font-medium"
                  style={{
                    fontSize: "14px",
                    lineHeight: "120%",
                    fontWeight: "500",
                  }}
                >
                  {card.title}
                </span>
                <img src={card.icon} alt="Icon" className="w-6 h-6" />
              </div>

              {/* Texto descriptivo siempre visible en mobile */}
              <div className="flex-1 flex items-start">
                <p className="text-white text-xs leading-tight">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Cards con color sólido - SIEMPRE mostrar estado hover en mobile
    if (card.mobileExpandedByDefault) {
      return (
        <div
          className="w-full h-full"
          style={{
            backgroundColor: card.hoverBgColor || card.bgColor,
          }}
        >
          {/* Contenido expandido fijo en mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 h-26">
            <div className="flex flex-col gap-3 h-full">
              {/* Título y botón - siempre visible */}
              <div className="flex items-center justify-between">
                <span
                  className="text-white font-medium"
                  style={{
                    fontSize: "14px",
                    lineHeight: "120%",
                    fontWeight: "500",
                  }}
                >
                  {card.title}
                </span>
                <img src={card.icon} alt="Icon" className="w-6 h-6" />
              </div>

              {/* Texto descriptivo siempre visible en mobile */}
              <div className="flex-1 flex items-start">
                <p className="text-white text-xs leading-tight">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback para cards normales
    return (
      <div
        className="w-full h-full"
        style={{
          backgroundColor: card.bgColor,
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ height: "60px" }}
        >
          <div className="flex flex-col gap-3 h-full">
            <div className="flex items-center justify-between">
              <span
                className="text-white font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: "120%",
                  fontWeight: "500",
                }}
              >
                {card.title}
              </span>
              <img src={card.icon} alt="Icon" className="w-6 h-6" />
            </div>

            <div className="flex-1 flex items-start">
              <p className="text-white text-xs leading-tight">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center py-16"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* Título principal - OCULTO EN MOBILE */}
      <div className="mb-12 hidden xl:block">
        <h2 className="text-black text-3xl lg:text-4xl font-bold text-center">
          Así funciona el universo Vurelo
        </h2>
      </div>

      {/* Layout principal para desktop - SOLO VISIBLE EN DESKTOP */}
      <div className="hidden xl:flex w-full h-[600px] items-center justify-center px-8">
        {/* Grid del lado izquierdo - 2 columnas verticales independientes */}
        <div className="flex-1 max-w-lg h-full flex items-center justify-center">
          <div className="flex" style={{ gap: "16px" }}>
            {/* Columna 1 - Stack vertical */}
            <div
              className="flex flex-col"
              style={{
                width: "202.5px",
                gap: "7.5px",
              }}
            >
              {/* Tarjeta 1: ¿Qué es Vurelo? */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "276.75px",
                  borderRadius: "15px",
                  backgroundColor: "#3DD973",
                }}
              >
                {/* Imagen de fondo */}
                <img
                  src={GuysCardImage}
                  alt="Vurelo Card"
                  className="w-full h-full object-cover"
                />

                {/* Contenido que se anima hacia arriba en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out group-hover:!h-[138px]"
                  style={{
                    background: "rgba(34, 34, 34, 0.3)",
                    backdropFilter: "blur(14px)",
                    borderRadius: "15px",
                    padding: "15px 18px",
                    height: "65px",
                  }}
                >
                  <div className="flex flex-col gap-[18px] h-full">
                    {/* Título y botón - siempre visible */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-white font-medium"
                        style={{
                          fontSize: "16px",
                          lineHeight: "17px",
                          fontWeight: "500",
                        }}
                      >
                        ¿Qué es Vurelo?
                      </span>
                      <img
                        src={LanguageIcon}
                        alt="Language"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo que aparece en hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 flex items-start">
                      <p
                        className="text-white"
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.3",
                          fontWeight: "400",
                        }}
                      >
                        Una app para mover tu plata fácil, rápido y sin bancos.
                        Usa dólares digitales en tu día a día.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Con hover effect */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "202.5px",
                  borderRadius: "15px",
                  backgroundColor: "#3C50F5",
                  transition: "background-color 0.3s ease-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#7C8AFF")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3C50F5")
                }
              >
                {/* Contenido que se anima hacia arriba en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out group-hover:!h-[138px]"
                  style={{
                    padding: "10px 18px",
                    height: "70px",
                  }}
                >
                  <div className="flex flex-col gap-[18px] h-full">
                    {/* Título y botón - siempre visible */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-white font-medium"
                        style={{
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: "500",
                        }}
                      >
                        ¿Qué puedes hacer?
                      </span>
                      <img
                        src={LanguageIcon}
                        alt="Language"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo que aparece en hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 flex items-start">
                      <p
                        className="text-white"
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.3",
                          fontWeight: "400",
                        }}
                      >
                        Recarga, guarda, transfiere, paga o retira. Todo en un
                        solo lugar. Y desde tu cel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 2 - Stack vertical */}
            <div
              className="flex flex-col"
              style={{
                width: "203px",
                gap: "16px",
                marginTop: "40px",
              }}
            >
              {/* Tarjeta 3: Logo V blanco */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "258.75px",
                  borderRadius: "15px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 15.6px 0px rgba(9, 62, 207, 0.10)",
                }}
              >
                {/* Estado inicial - Logo Vurelov centrado + título y botón */}
                <div className="absolute inset-0 flex flex-col group-hover:opacity-0 transition-opacity duration-300">
                  {/* Logo V */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",

                      height: "100%",
                    }}
                  >
                    <img
                      src={VurelovIcon}
                      alt="Vurelov"
                      style={{
                        width: "256.33px",
                        height: "204px",
                        aspectRatio: "256.33/204.00",
                      }}
                    />

                    {/* Div text */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "stretch",
                        flex: "1 0 0",
                        padding: "0 18px",
                      }}
                    >
                      <span
                        className="text-black font-medium "
                        style={{
                          fontSize: "16px",
                          lineHeight: "17px",
                          fontWeight: "500",
                          height: "55px",
                        }}
                      >
                        ¿Y cómo uso mi plata?
                      </span>
                      <img
                        src={Language3Icon}
                        alt="Language3"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Estado hover - Imagen + contenido */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
                  {/* Imagen superior - guy-phone.jpg */}
                  <div className="w-full" style={{ height: "106.5px" }}>
                    <img
                      src={GuyPhoneImage}
                      alt="Guy with phone"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contenido inferior con fondo azul - directamente pegado */}
                  <div
                    className="flex flex-col flex-1"
                    style={{
                      backgroundColor: "#3C50F5",
                      padding: "24px 18px",
                      gap: "10px",
                    }}
                  >
                    {/* Título y botón */}
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">
                        ¿Y cómo uso mi plata?
                      </span>
                      <img
                        src={Language2Icon}
                        alt="Language2"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo */}
                    <p className="text-white text-xs leading-tight">
                      Con tu tarjeta Vurelo (Atlantis, Terra or Titan) compras
                      en línea o en tienda, y retiras en cajeros.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta 4: Solo imagen woman-card.svg */}
              <div
                style={{
                  width: "203px",
                  height: "166px",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={WomanCardImage}
                  alt="Woman Card"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video central */}
        <div className="flex-1 max-w-md h-full flex items-center justify-center px-8">
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ maxWidth: "320px" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-xl"
              preload="auto"
            >
              <source src={PhoneWalletVideo} type="video/mp4" />
              Tu navegador no soporta el elemento video.
            </video>
          </div>
        </div>

        {/* Grid del lado derecho - 2 columnas verticales */}
        <div className="flex-1 max-w-lg h-full flex items-center justify-center">
          <div className="flex" style={{ gap: "16px" }}>
            {/* Primera fila derecha */}
            <div
              className="flex flex-col"
              style={{
                width: "202.5px",
                gap: "16px",
                height: "495.25px",
              }}
            >
              {/* Card superior primera fila - Con hover effect */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "202.5px",
                  borderRadius: "15px",
                  backgroundColor: "#06AFF2",
                  transition: "background-color 0.3s ease-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3C50F5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#06AFF2")
                }
              >
                {/* Contenido que se anima hacia arriba en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out group-hover:!h-[140px]"
                  style={{
                    padding: "10px 18px",
                    height: "70px",
                  }}
                >
                  <div className="flex flex-col gap-[15px] h-full">
                    {/* Título y botón - siempre visible */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-white font-medium"
                        style={{
                          fontSize: "16px",
                          lineHeight: "20px",
                          fontWeight: "500",
                        }}
                      >
                        ¿En qué moneda funciona?
                      </span>
                      <img
                        src={LanguageIcon}
                        alt="Language"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo que aparece en hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 flex items-start">
                      <p
                        className="text-white"
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.3",
                          fontWeight: "400",
                        }}
                      >
                        Maneja tus fondos en Dólares Digitales. Envíalos,
                        recíbelos or ahórralos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card inferior primera fila - Con hover effect */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "276.75px",
                  borderRadius: "15px",
                  backgroundColor: "#000000",
                }}
              >
                {/* Imagen de fondo que ocupa todo */}
                <img
                  src={PhoneGirl}
                  alt="Phone Girl"
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: "center center",
                    transform: "scale(1.1)", // Amplía 10% más
                  }}
                />

                {/* Gradiente overlay - Se quita COMPLETAMENTE en hover */}
                <div
                  className="absolute inset-0 opacity-70 group-hover:opacity-0 transition-opacity duration-300 ease-out"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.9) 100%)",
                  }}
                />

                {/* Contenido que se anima hacia arriba en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out group-hover:!h-[170px]"
                  style={{
                    padding: "5px 18px",
                    height: "80px",
                  }}
                >
                  <div className="flex flex-col gap-[18px] h-full">
                    {/* Título y botón - siempre visible */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-white font-medium"
                        style={{
                          fontSize: "16px",
                          lineHeight: "17px",
                          fontWeight: "500",
                        }}
                      >
                        Hecho para que cualquiera pueda usarlo
                      </span>
                      <img
                        src={Language3Icon}
                        alt="Language3"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo que aparece en hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-1 flex items-start">
                      <p
                        className="text-white"
                        style={{
                          fontSize: "12px",
                          lineHeight: "1.1",
                          fontWeight: "400",
                        }}
                      >
                        No necesitas ser experto. Con Vurelo todo es claro,
                        directo y pensado para que entiendas tu plata desde el
                        primer toque.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Segunda fila derecha */}
            <div
              className="flex flex-col"
              style={{
                width: "203px",
                gap: "16px",
                height: "440.75px",
              }}
            >
              {/* Card superior segunda fila */}
              <div
                style={{
                  width: "203px",
                  height: "166px",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={Boycard}
                  alt="Boy Card"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card inferior segunda fila - Con hover effect */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  width: "202.5px",
                  height: "258.75px",
                  borderRadius: "15px",
                  backgroundColor: "#1E1E1E",
                  boxShadow: "0px 4px 13.5px 0px rgba(0, 0, 0, 0.15)",
                }}
              >
                {/* Estado inicial - Imagen CardImage + título y botón */}
                <div className="absolute inset-0 flex flex-col group-hover:opacity-0 transition-opacity duration-300">
                  {/* Imagen card.svg */}
                  <img
                    src={CardImage}
                    alt="Card"
                    className="w-full h-full object-cover"
                  />

                  {/* Título y botón abajo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span
                      className="text-white font-medium "
                      style={{
                        fontSize: "16px",
                        lineHeight: "17px",
                        fontWeight: "500",
                        height: "55px",
                      }}
                    >
                      Respaldado por quienes sí saben
                    </span>
                    <img
                      src={LanguageIcon}
                      alt="Language"
                      style={{
                        width: "30.79px",
                        height: "30.79px",
                      }}
                    />
                  </div>
                </div>

                {/* Estado hover - Imagen guys + contenido */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
                  {/* Imagen superior - guys */}
                  <div className="w-full" style={{ height: "106.5px" }}>
                    <img
                      src={GuyPhoneImage2}
                      alt="Team guys"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Contenido inferior con fondo blanco - directamente pegado */}
                  <div
                    className="flex flex-col flex-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "8px 18px",
                      gap: "8px",
                    }}
                  >
                    {/* Título y botón */}
                    <div className="flex items-center justify-between">
                      <span className="text-black font-medium text-sm">
                        Respaldado por quienes sí saben
                      </span>
                      <img
                        src={Language4Icon}
                        alt="Language"
                        style={{
                          width: "30.79px",
                          height: "30.79px",
                        }}
                      />
                    </div>

                    {/* Texto descriptivo */}
                    <p className="text-black text-xs leading-tight">
                      Detrás hay un equipo con más de 10 años creando tecnología
                      financiera que funciona de verdad. Apoyado por
                      Asoblockchain, Vurelo Lab y Pagora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - VISIBLE SOLO EN MÓVIL Y TABLET */}
      <div className="xl:hidden w-full max-w-[375px] mx-auto px-6 py-6 flex flex-col bg-white">
        {/* Título Mobile */}
        <div className="w-full mb-6">
          <h2
            className="font-neue-montreal text-center"
            style={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "120%",
              letterSpacing: "0%",
              color: "#231F20",
            }}
          >
            Así funciona el Universo Vurelo
          </h2>
        </div>

        {/* Video Mobile */}
        <div className="w-full mb-8">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-3xl"
            preload="auto"
          >
            <source src={PhoneWalletVideo} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>

        {/* Cards Carousel Container - SIN WomanCard y Boycard */}
        <div className="w-full">
          {/* Single Card Display */}
          <div
            className="relative overflow-hidden mb-5"
            style={{
              width: "100%",
              height: "215px",
              borderRadius: "11.65px",
              backgroundColor: mobileFilteredCards[currentSlide].bgColor,
            }}
          >
            {/* Render current filtered card */}
            {renderMobileCard(mobileFilteredCards[currentSlide])}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4">
            {/* Flecha izquierda */}
            <button onClick={prevSlide} className="p-2">
              <img src={Arrow1Icon} alt="Previous" className="w-6 h-6" />
            </button>

            {/* Indicadores de puntos - Solo para cards filtradas */}
            <div className="flex gap-2">
              {mobileFilteredCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-gray-800 scale-110"
                      : "bg-gray-300 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            {/* Flecha derecha */}
            <button onClick={nextSlide} className="p-2">
              <img src={Arrow2Icon} alt="Next" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoveMoneySection;
