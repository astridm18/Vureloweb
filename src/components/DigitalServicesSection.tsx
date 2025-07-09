import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type JSX,
} from "react";
import Spline from "@splinetool/react-spline";

// Imports de los iconos
import AsoblockchainIcon from "../assets/images/asoblockchain.svg";
import MetamapIcon from "../assets/images/metamap.svg";
import WorldcoinIcon from "../assets/images/worldcoin.svg";
import PomeloIcon from "../assets/images/pomelo.svg";
import SignioIcon from "../assets/images/signio.svg";
import HubspotIcon from "../assets/images/hubspot.svg";
import KodeaIcon from "../assets/images/kodea.svg";
import FireblocksIcon from "../assets/images/fireblocks.png";

interface Card {
  id: number;
  title: string;
  description: string;
}

const DigitalServicesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Iconos del carrusel en orden
  const carouselIcons: string[] = [
    AsoblockchainIcon,
    MetamapIcon,
    WorldcoinIcon,
    PomeloIcon,
    SignioIcon,
    HubspotIcon,
    KodeaIcon,
    FireblocksIcon,
  ];

  const cards: Card[] = [
    {
      id: 1,
      title: "Tu primer activo digital",
      description:
        "Vurelo es tu puerta de entrada a la nueva economia digital.",
    },
    {
      id: 2,
      title: "Seguridad sin complicaciones",
      description:
        "Cifrado, respaldo legal y control total. Vurelo cuida tu plata sin complicarte.",
    },
    {
      id: 3,
      title: "Una super app para todos",
      description:
        "Con Vurelo haces todo: recargas, transfieres, retiras y pagas. Sin salir de la app.",
    },
  ];

  // Renderizar Spline específico por ID
  const renderSpline = (cardId: number): JSX.Element => {
    let splineUrl = "";

    if (cardId === 1) {
      splineUrl =
        "https://prod.spline.design/jGmom2tHEKNkTBOT/scene.splinecode";
    } else if (cardId === 2) {
      splineUrl =
        "https://prod.spline.design/f8eP93tbqZxkXBzu/scene.splinecode";
    } else if (cardId === 3) {
      splineUrl =
        "https://prod.spline.design/10tWO1g9SuPRbNRm/scene.splinecode";
    }

    return (
      <div className="spline-container w-full h-full relative">
        <Spline
          scene={splineUrl}
          style={{
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            objectFit: "cover",
          }}
        />
      </div>
    );
  };

  // Función para obtener la posición de una tarjeta
  const getCardPosition = (cardIndex: number): string => {
    const diff = cardIndex - currentSlide;

    if (diff === 0) {
      return "active"; // Tarjeta actual
    } else if (diff === 1 || (diff === -2 && cards.length === 3)) {
      return "next"; // Tarjeta que viene de la derecha
    } else {
      return "prev"; // Tarjeta que sale por la izquierda
    }
  };

  // Función para avanzar slide
  const nextSlide = useCallback((): void => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= cards.length ? 0 : next;
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (!isTransitioning) nextSlide();
      }, 4000);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, cards.length]);

  // Función para retroceder slide
  const prevSlide = useCallback((): void => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const next = prev - 1;
      return next < 0 ? cards.length - 1 : next;
    });

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        if (!isTransitioning) nextSlide();
      }, 4000);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [isTransitioning, cards.length, nextSlide]);

  // Función para ir a slide específico
  const goToSlide = useCallback(
    (index: number): void => {
      if (isTransitioning || index === currentSlide) return;

      setIsTransitioning(true);
      setCurrentSlide(index);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
          if (!isTransitioning) nextSlide();
        }, 4000);
      }

      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    },
    [isTransitioning, currentSlide, nextSlide]
  );

  // Auto-scroll (corregido para evitar solapamientos)
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isTransitioning]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (): void => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Pausar/reanudar auto-scroll
  const pauseAutoScroll = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeAutoScroll = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 4000);
  };

  return (
    <>
      {/* CSS Animations */}
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .infinite-scroll {
            display: flex;
            animation: scroll-left 20s linear infinite;
            width: max-content;
          }
          
          .infinite-scroll:hover {
            animation-play-state: paused;
          }

          .mobile-card {
            transition: all 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .mobile-card.active {
            opacity: 1;
            transform: translateX(0) scale(1);
          }

          .mobile-card.prev {
            opacity: 0;
            transform: translateX(-100%) scale(0.9);
          }

          .mobile-card.next {
            opacity: 0;
            transform: translateX(100%) scale(0.9);
          }

          .card-hover {
            transition: transform 200ms ease-out;
          }

          .card-hover:hover {
            transform: translateY(-2px);
          }
        `}
      </style>

      {/* Carrusel de iconos arriba */}
      <section
        className="w-full flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "#1E1E1E",
          height: "180px",
          paddingTop: "96px",
          paddingBottom: "96px",
        }}
      >
        <div className="w-full overflow-hidden">
          <div className="infinite-scroll">
            {carouselIcons.concat(carouselIcons).map((icon, index) => (
              <div
                key={`icon-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: "auto",
                  height: "50px",
                  marginRight: "80px",
                  minWidth: "120px",
                }}
              >
                <img
                  src={icon}
                  alt={`Partner ${(index % carouselIcons.length) + 1}`}
                  className="h-full w-auto object-contain filter brightness-75 hover:brightness-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección principal */}
      <section
        className="w-full py-16 lg:py-24 flex items-center justify-center"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop: Grid de 3 columnas */}
          <div className="hidden lg:flex justify-center items-center gap-14">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white relative overflow-hidden card-hover"
                style={{
                  width: "336px",
                  height: "474px",
                  borderRadius: "25px",
                }}
              >
                {/* Contenido de texto */}
                <div
                  className="relative z-10"
                  style={{
                    padding: "32px 15px",
                    gap: "10px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    className="text-black font-neue-montreal"
                    style={{
                      width: "295px",
                      height: "59px",
                      fontWeight: 700,
                      fontSize: "25px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-black font-inter"
                    style={{
                      width: "295px",
                      height: "56px",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "120%",
                      letterSpacing: "0%",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Contenedor Spline */}
                <div
                  className="absolute bottom-0 left-0"
                  style={{
                    width: "336px",
                    height: "253px",
                    borderBottomRightRadius: "25px",
                    borderBottomLeftRadius: "25px",
                    overflow: "hidden",
                  }}
                >
                  {renderSpline(card.id)}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Slider con transición fluida */}
          <div
            className="lg:hidden relative max-w-sm mx-auto"
            onMouseEnter={pauseAutoScroll}
            onMouseLeave={resumeAutoScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Contenedor del slider */}
            <div className="relative w-full h-[474px] overflow-hidden">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className={`mobile-card absolute top-0 left-0 w-full bg-white overflow-hidden ${getCardPosition(
                    index
                  )}`}
                  style={{
                    height: "474px",
                    borderRadius: "25px",
                    zIndex: index === currentSlide ? 10 : 1,
                  }}
                >
                  {/* Contenido de texto */}
                  <div
                    className="relative z-10"
                    style={{
                      padding: "32px 15px",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3
                      className="text-black font-neue-montreal"
                      style={{
                        fontWeight: 700,
                        fontSize: "22px",
                        lineHeight: "120%",
                        letterSpacing: "0%",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-black font-inter"
                      style={{
                        fontWeight: 400,
                        fontSize: "15px",
                        lineHeight: "120%",
                        letterSpacing: "0%",
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Contenedor Spline */}
                  <div
                    className="absolute bottom-0 left-0 w-full"
                    style={{
                      height: "253px",
                      borderBottomRightRadius: "25px",
                      borderBottomLeftRadius: "25px",
                      overflow: "hidden",
                    }}
                  >
                    {renderSpline(card.id)}
                  </div>
                </div>
              ))}
            </div>

            {/* Controles */}
            <div className="flex justify-center items-center mt-6 gap-4">
              {/* Flecha izquierda */}
              <button
                onClick={prevSlide}
                className="p-2 transition-opacity hover:opacity-70 disabled:opacity-50"
                type="button"
                disabled={isTransitioning}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="flex gap-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "bg-white scale-110"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    type="button"
                    disabled={isTransitioning}
                  />
                ))}
              </div>

              {/* Flecha derecha */}
              <button
                onClick={nextSlide}
                className="p-2 transition-opacity hover:opacity-70 disabled:opacity-50"
                type="button"
                disabled={isTransitioning}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigitalServicesSection;
