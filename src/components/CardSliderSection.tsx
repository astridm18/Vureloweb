import { useState, useEffect, useRef } from "react";
import { CreditCard, Wallet, Shield, Smartphone } from "lucide-react";
// Import the new dynamic card images
import AtlantisCard from "../assets/images/atlantis-rgb-.png";
import TerraCard from "../assets/images/terra-rgb-.png";
import TitanCard from "../assets/images/titan-rgb-.png";

const CardSliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isManualControl, setIsManualControl] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Datos de los slides con las imágenes originales
  const slides = [
    {
      id: 1,
      title: "Atlantis",
      subtitle: "Ideal para comenzar a usar la economía digital sin enredos.",
      image: AtlantisCard,
      benefits: [
        { icon: <CreditCard className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Wallet className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Shield className="w-6 h-6" />, text: "Beneficios" },
      ],
      features: [
        "Retira hasta USD $1.000 diarios, para tener tu plata a la mano cuando la necesites.",
        "Pagos ilimitados en tiendas físicas y online, sin preocuparte por montos ni rechazos.",
        "Transferencias sin límite, para enviar tu dinero fácil, sin pasos confusos.",
        "Recarga desde efectivo o cuenta bancaria, sin depender de otras apps o tarjetas.",
        "Soporte Visa 24/7, porque no estás solo.",
      ],
    },
    {
      id: 2,
      title: "Terra",
      subtitle:
        "Ideal para quienes ya viven (o comienzan a vivir) de lo digital.",
      image: TerraCard,
      benefits: [
        { icon: <CreditCard className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Wallet className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Shield className="w-6 h-6" />, text: "Beneficios" },
      ],
      features: [
        "Retira hasta USD $3.000 diarios, para convertir tus ingresos digitales en efectivo cuando lo necesites.",
        "Pagos ilimitados en tiendas físicas y online, sin bloquearte por montos ni países.",
        "Transferencias sin límite, para mover tu plata sin miedo a topes sin sentido.",
        "Recarga fácil desde efectivo o cuenta bancaria, porque no todo lo digital empieza en digital",
        "Soporte Visa 24/7, estés donde estés, con ayuda real en tiempo real.",
      ],
    },
    {
      id: 3,
      title: "Titan",
      subtitle:
        "Ideal para quienes mueven más, quieren más y no aceptan límites.",
      image: TitanCard,
      benefits: [
        { icon: <CreditCard className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Wallet className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Shield className="w-6 h-6" />, text: "Beneficios" },
        { icon: <Smartphone className="w-6 h-6" />, text: "Beneficios" },
      ],
      features: [
        "Retira hasta USD $5.000 diarios, sin bloqueos ni validaciones eternas.",
        "Pagos ilimitados en cualquier tienda, estés donde estés.",
        "Transferencias sin restricción, para operar con libertad total.",
        "Recarga desde efectivo o cuenta bancaria.",
        "Soporte prioritario 24/7 y con verificación express.",
      ],
    },
  ];

  // Función para iniciar el auto-slide
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
  };

  // Función para detener el auto-slide
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-slide automático
  useEffect(() => {
    if (!isManualControl) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }

    return () => stopAutoSlide();
  }, [isManualControl, slides.length, startAutoSlide]);

  // Función para cambiar slide manualmente
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsManualControl(true);

    // Reiniciar el auto-slide después de 5 segundos de inactividad
    setTimeout(() => {
      setIsManualControl(false);
    }, 5000);
  };

  const currentSlideData = slides[currentSlide];

  // Define button background colors based on index
  const getButtonBackgroundColor = (index: number): string => {
    if (currentSlide === index) {
      if (index === 0) return "#00A3E1"; // Atlantis blue
      if (index === 1) return "#3DDA73"; // Terra green
      if (index === 2) return "#0B0B0B"; // Titan black
    }
    return "transparent";
  };

  // Define button font colors based on index
  const getButtonFontColor = (index: number): string => {
    if (currentSlide === index) {
      if (index === 0) return "white";
      if (index === 1) return "black";
      if (index === 2) return "white";
    }
    return "#9CA3AF"; // Gray for inactive buttons
  };

  // Función para calcular el z-index y transformación de cada tarjeta (Desktop)
  const getCardStyle = (index: number) => {
    const offset = (currentSlide - index + slides.length) % slides.length;

    let zIndex = 0;
    let scale = 0;
    let translateY = 0;
    let translateX = -50; // Base para centrar
    let opacity = 0;

    // Apilamiento HACIA ATRÁS como en la imagen 1
    if (offset === 0) {
      // Tarjeta activa (al frente, abajo-derecha)
      zIndex = 30;
      scale = 1;
      translateY = 40; // Más abajo
      translateX = -50 + 20; // Más a la derecha
      opacity = 1;
    } else if (offset === 1) {
      // Primera tarjeta detrás (hacia atrás-arriba)
      zIndex = 20;
      scale = 0.96;
      translateY = 20; // Hacia arriba
      translateX = -50; // Centro
      opacity = 1;
    } else if (offset === 2) {
      // Segunda tarjeta detrás (más atrás-arriba)
      zIndex = 10;
      scale = 0.92;
      translateY = 0; // Más arriba
      translateX = -50 - 20; // Más a la izquierda (atrás)
      opacity = 1;
    } else {
      // Resto de tarjetas (ocultas)
      zIndex = 0;
      scale = 0.88;
      translateY = -20; // Muy arriba
      translateX = -50 - 40; // Fuera de vista hacia atrás
      opacity = 0;
    }

    return {
      zIndex,
      transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
      opacity,
      pointerEvents: (opacity > 0
        ? "auto"
        : "none") as React.CSSProperties["pointerEvents"],
    };
  };

  return (
    <div>
      {/* Desktop Layout */}
      <div
        className="hidden lg:flex w-full justify-center overflow-hidden"
        style={{
          paddingTop: "150px",
          paddingBottom: "150px",
          backgroundColor: "#F6F8FE",
        }}
      >
        {/* CONTENEDOR PRINCIPAL CON PADDING RESPONSIVO */}
        <div
          className="w-full flex justify-center"
          style={{
            paddingLeft: "max(56px, calc((100vw - 1200px) / 2))", // Aumentado el ancho máximo para dar más espacio
            paddingRight: "max(56px, calc((100vw - 1200px) / 2))",
          }}
        >
          {/* Contenedor de contenido: Horizontal con gap MUCHO MÁS GRANDE */}
          <div
            className="flex"
            style={{
              width: "min(1200px, 100%)", // Aumentado de 1128px a 1200px
              height: "600px",
              gap: "120px", // AUMENTADO de 72px a 120px para mayor separación
            }}
          >
            {/* Lado izquierdo - Imagen: 380px × altura del contenido derecho */}
            <div
              className="flex items-center justify-center relative"
              style={{
                width: "380px",
                height: "524px",
                flexShrink: 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {slides.map((slide, index) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={`${slide.title} Card`}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    display: "flex",
                    width: "350px",
                    height: "580px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                    aspectRatio: "65/103",
                    left: "50%",
                    top: "0",
                    ...getCardStyle(index),
                  }}
                />
              ))}
            </div>

            {/* Lado derecho - Contenido: width ajustado automáticamente */}
            <div
              className="flex flex-col"
              style={{
                width: "calc(100% - 380px - 120px)", // Ajustado al nuevo gap
                minWidth: "300px",
                height: "100%",
                gap: "24px",
              }}
            >
              {/* Botones de navegación */}
              <div
                className="flex flex-shrink-0"
                style={{
                  width: "100%",
                  height: "47px",
                  gap: "12px",
                }}
              >
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => handleSlideChange(index)}
                    className="font-jakarta flex items-center justify-center transition-all duration-300"
                    style={{
                      width: "140px",
                      height: "47px",
                      borderRadius: "100px",
                      padding: "8px 16px",
                      backgroundColor: getButtonBackgroundColor(index),
                      color: getButtonFontColor(index),
                      fontSize: "16px",
                      fontWeight: currentSlide === index ? 700 : 400,
                      lineHeight: "1.2",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {slide.title}
                  </button>
                ))}
              </div>

              {/* Contenedor blanco principal */}
              <div
                className="flex flex-col flex-grow"
                style={{
                  width: "100%",
                  height: "529px",
                  borderRadius: "20px",
                  paddingTop: "48px",
                  paddingRight: "32px",
                  paddingBottom: "48px",
                  paddingLeft: "32px",
                  gap: "40px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {/* Título y subtítulo */}
                <div
                  className="flex flex-col flex-shrink-0"
                  style={{
                    width: "100%",
                    height: "80px",
                    gap: "8px",
                  }}
                >
                  <h2
                    className="font-jakarta text-black"
                    style={{
                      fontWeight: 700,
                      fontSize: "30px",
                      lineHeight: "1.02",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {currentSlideData.title}
                  </h2>
                  <p
                    className="font-jakarta text-black"
                    style={{
                      fontWeight: 500,
                      fontSize: "18px",
                      lineHeight: "1.7",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {currentSlideData.subtitle}
                  </p>
                </div>

                {/* Contenido */}
                <div
                  className="flex flex-col flex-grow justify-between"
                  style={{
                    width: "100%",
                    gap: "24px",
                  }}
                >
                  {/* Lista de características */}
                  <div className="space-y-4 flex-grow">
                    {currentSlideData.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className="rounded-full mt-2 flex-shrink-0"
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: "#000000",
                          }}
                        ></div>
                        <p
                          className="font-jakarta"
                          style={{
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "1.63",
                            letterSpacing: "0",
                            color: "#000000",
                          }}
                        >
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Botón */}
                  <div className="flex justify-start flex-shrink-0">
                    <button
                      className="font-jakarta transition-colors duration-300 hover:opacity-80"
                      onClick={() => console.log("Botón clickeado!")}
                      style={{
                        width: "auto",
                        height: "38.3px",
                        borderRadius: "47.81px",
                        border: "0.96px solid #0B0B0B",
                        paddingTop: "7.65px",
                        paddingRight: "22.95px",
                        paddingBottom: "7.65px",
                        paddingLeft: "22.95px",
                        backgroundColor: "#0B0B0B",
                        color: "#F6F8FE",
                        fontWeight: 400,
                        fontSize: "13.39px",
                        lineHeight: "1.71",
                        letterSpacing: "0",
                        cursor: "pointer",
                      }}
                    >
                      Quiero ser de los primeros
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div
        className="flex lg:hidden flex-col items-center w-full"
        style={{
          paddingTop: "40px",
          paddingRight: "16px",
          paddingBottom: "40px",
          paddingLeft: "16px",
          backgroundColor: "#F6F8FE",
          gap: "24px",
        }}
      >
        {/* Cards arriba */}
        <div
          className="w-full flex justify-center"
          style={{
            height: "350px",
          }}
        >
          <div
            className="relative"
            style={{
              display: "flex",
              width: "280px",
              height: "350px",
              alignItems: "flex-start",
              gap: "-180px",
              overflow: "visible",
            }}
          >
            {slides.map((slide, index) => {
              const offset =
                (currentSlide - index + slides.length) % slides.length;

              let zIndex = 0;
              let scale = 0;
              let translateY = 0;
              let translateX = 0;
              let opacity = 0;

              if (offset === 0) {
                zIndex = 30;
                scale = 1;
                translateY = 25;
                translateX = 20;
                opacity = 1;
              } else if (offset === 1) {
                zIndex = 20;
                scale = 0.96;
                translateY = 12;
                translateX = 0;
                opacity = 1;
              } else if (offset === 2) {
                zIndex = 10;
                scale = 0.92;
                translateY = 0;
                translateX = -20;
                opacity = 1;
              } else {
                zIndex = 0;
                scale = 0.88;
                translateY = -12;
                translateX = -40;
                opacity = 0;
              }

              return (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={`${slide.title} Card`}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    width: "170px",
                    height: "270px",
                    flexShrink: 0,
                    aspectRatio: "70/111",
                    left: "50%",
                    top: "0",
                    transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) scale(${scale})`,
                    zIndex,
                    opacity,
                    pointerEvents: (opacity > 0
                      ? "auto"
                      : "none") as React.CSSProperties["pointerEvents"],
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Botones */}
        <div
          className="flex justify-center gap-2 w-full"
          style={{
            height: "40px",
          }}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleSlideChange(index)}
              className="font-jakarta flex items-center justify-center transition-all duration-300 flex-1"
              style={{
                height: "40px",
                borderRadius: "100px",
                padding: "8px 12px",
                backgroundColor: getButtonBackgroundColor(index),
                color: getButtonFontColor(index),
                fontSize: "18px",
                fontWeight: currentSlide === index ? 700 : 400,
                lineHeight: "1.43",
                letterSpacing: "-0.02em",
              }}
            >
              {slide.title}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div
          className="flex flex-col w-full"
          style={{
            borderRadius: "20px",
            padding: "32px 24px",
            gap: "24px",
            backgroundColor: "#FFFFFF",
            minHeight: "450px",
          }}
        >
          {/* Título y subtítulo mobile */}
          <div
            className="flex flex-col gap-2 flex-shrink-0"
            style={{
              height: "70px",
            }}
          >
            <h2
              className="font-jakarta text-black text-left"
              style={{
                fontWeight: 700,
                fontSize: "24px",
                lineHeight: "1.17",
                letterSpacing: "-0.02em",
              }}
            >
              {currentSlideData.title}
            </h2>
            <p
              className="font-jakarta text-black text-left"
              style={{
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "1.25",
                letterSpacing: "-0.02em",
              }}
            >
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Features mobile */}
          <div className="space-y-3 flex-grow">
            {currentSlideData.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div
                  className="rounded-full mt-1.5 flex-shrink-0"
                  style={{
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#000000",
                  }}
                ></div>
                <p
                  className="font-jakarta"
                  style={{
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "1.5",
                    letterSpacing: "0",
                    color: "#000000",
                  }}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Botón mobile */}
          <button
            className="font-jakarta transition-colors duration-300 hover:opacity-80 w-full flex-shrink-0"
            onClick={() => console.log("Botón mobile clickeado!")}
            style={{
              height: "48px",
              borderRadius: "24px",
              border: "1px solid #0B0B0B",
              backgroundColor: "#0B0B0B",
              color: "#F6F8FE",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "1.5",
              letterSpacing: "0",
              cursor: "pointer",
            }}
          >
            Quiero ser de los primeros
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSliderSection;
