import CryptoHeroVideo from "../assets/video/Crypto-Hero.mp4";

const SectionCryptoHero = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-12 px-8 md:px-20 py-20">
          {/* Columna Izquierda - Texto */}
          <div className="w-full lg:w-2/5 space-y-6">
            {/* Título - Plus Jakarta Sans Bold 31px 120% */}
            <h2
              className="font-jakarta text-black leading-tight"
              style={{
                fontWeight: 700,
                fontSize: "31px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Esto ya empezó. ¿Vas
              <br />a quedarte por fuera?
            </h2>

            {/* Copy - Plus Jakarta Sans Regular 16px 120% */}
            <p
              className="font-jakarta font-normal text-black max-w-md"
              style={{
                fontSize: "16px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Miles de personas ya se están sumando a Vurelo. Si te registras
              ahora, entras primero.
            </p>

            {/* Botón - Plus Jakarta Sans Semibold 16px 120% Center */}
            <button
              className="font-jakarta font-semibold bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-md text-center"
              style={{
                fontSize: "16px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Quiero ser de los primeros
            </button>
          </div>

          {/* Columna Derecha - Video */}
          <div className="w-full lg:w-3/5 flex justify-center">
            <div className="relative w-full max-w-[575px] h-[575px] rounded-[25px] overflow-hidden bg-gray-200">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={CryptoHeroVideo} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden flex-col items-center justify-center min-h-screen px-6 py-12 space-y-8">
          {/* Contenido arriba */}
          <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full">
            {/* Título dividido en dos líneas */}
            <div className="text-center space-y-2">
              <h2
                className="font-jakarta text-black"
                style={{
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                }}
              >
                Esto ya empezó.
              </h2>
              <h2
                className="font-jakarta text-black"
                style={{
                  fontWeight: 700,
                  fontSize: "28px",
                  lineHeight: "120%",
                  letterSpacing: "0%",
                }}
              >
                ¿Vas a quedarte por fuera?
              </h2>
            </div>

            {/* Texto alineado a la izquierda */}
            <p
              className="font-jakarta font-normal text-black text-left w-full"
              style={{
                fontSize: "16px",
                lineHeight: "140%",
                letterSpacing: "0%",
              }}
            >
              Miles de personas ya se están sumando a Vurelo. Si te registras
              ahora, entras primero.
            </p>

            {/* Botón del mismo ancho que el texto */}
            <button
              className="font-jakarta font-semibold bg-black text-white py-4 rounded-full hover:bg-gray-800 transition-colors duration-200 shadow-md text-center w-full"
              style={{
                fontSize: "16px",
                lineHeight: "120%",
                letterSpacing: "0%",
              }}
            >
              Quiero ser de los primeros
            </button>
          </div>

          {/* Video abajo en mobile */}
          <div className="w-full max-w-sm">
            <div className="relative w-full aspect-square rounded-[20px] overflow-hidden bg-gray-200">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={CryptoHeroVideo} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCryptoHero;
