import VureloLogo from "../assets/logos/vurelo-logo.svg";
import AppleIcon from "../assets/logos/Apple.svg";
import GoogleIcon from "../assets/logos/Google.svg";

const Footer = () => {
  return (
    <footer 
      className="w-full"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* DESKTOP Layout */}
      <div className="hidden lg:block">
        <div 
          className="w-full flex justify-center"
          style={{
            paddingTop: '56px',
            paddingRight: '56px',
            paddingBottom: '24px',
            paddingLeft: '56px'
          }}
        >
          {/* Contenedor principal: responsive pero máximo 1328px */}
          <div 
            className="flex flex-col justify-between w-full"
            style={{
              maxWidth: '1328px',
              height: '220px'
            }}
          >
            
            {/* Sección superior: Logo y Contacto/Próximamente */}
            <div 
              className="flex justify-between items-center relative w-full"
              style={{ height: '104px' }}
            >
              
              {/* Sección del logo */}
              <div 
                className="flex items-center flex-shrink-0"
                style={{
                  width: '418.48px',
                  height: '104px',
                  maxWidth: '35%'
                }}
              >
                <img 
                  src={VureloLogo}
                  alt="Vurelo Logo"
                  className="w-full h-auto max-h-full object-contain"
                />
              </div>

              {/* Contenedor de Contacto y Próximamente */}
              <div 
                className="flex items-center flex-shrink-0"
                style={{
                  width: 'auto',
                  maxWidth: '60%',
                  height: '60.75px',
                  gap: '64px'
                }}
              >
                {/* Sección Próximamente */}
                <div 
                  className="flex flex-col items-center"
                  style={{
                    width: 'auto',
                    minWidth: '200px',
                    height: '60.75px',
                    gap: '9px'
                  }}
                >
                  <h3 
                    style={{
                      fontFamily: 'Arial',
                      fontWeight: 700,
                      fontSize: '11.53px',
                      lineHeight: '15px',
                      letterSpacing: '0%',
                      color: '#EAF0FF'
                    }}
                  >
                    ¡Próximamente!
                  </h3>
                  
                  <div 
                    className="flex items-center justify-center"
                    style={{
                      width: 'auto',
                      height: '36.75px',
                      gap: '4px'
                    }}
                  >
                    <img 
                      src={AppleIcon} 
                      alt="App Store" 
                      className="h-9 w-auto object-contain flex-shrink-0"
                      style={{ maxHeight: '36px' }}
                    />
                    <img 
                      src={GoogleIcon} 
                      alt="Google Play" 
                      className="h-9 w-auto object-contain flex-shrink-0"
                      style={{ maxHeight: '36px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Línea divisoria vertical */}
              <div 
                className="absolute"
                style={{
                  width: '1px',
                  height: '62px',
                  backgroundColor: '#FFFFFF',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            </div>

            {/* Sección inferior: Email y links */}
            <div 
              className="flex justify-between items-center w-full"
              style={{ height: '15px' }}
            >
              <div 
                style={{
                  fontFamily: 'Arial',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '15px',
                  color: '#FFFFFF'
                }}
              >
                contacto@vureloapp.com
              </div>

              <div 
                className="flex items-center gap-6"
                style={{
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#9CA3AF'
                }}
              >
                <a href="#" className="hover:underline">Política de privacidad</a>
                <a href="#" className="hover:underline">Términos y condiciones</a>
                <span>2025 Vurelo Company SAS BIC. Todos los derechos reservados.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE Layout */}
      <div className="block lg:hidden">
        <div 
          className="flex flex-col items-center w-full"
          style={{
            paddingTop: '40px',
            paddingRight: '20px',
            paddingBottom: '24px',
            paddingLeft: '20px',
            gap: '32px'
          }}
        >
          
          {/* Logo arriba */}
          <div className="flex justify-center w-full">
            <img 
              src={VureloLogo}
              alt="Vurelo Logo"
              className="w-64 h-auto max-w-full object-contain"
            />
          </div>

          {/* Sección Próximamente */}
          <div className="flex flex-col items-center gap-4">
            <h3 
              style={{
                fontFamily: 'Arial',
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#EAF0FF'
              }}
            >
              ¡Próximamente!
            </h3>
            
            <div className="flex gap-3 items-center justify-center">
              <img 
                src={AppleIcon} 
                alt="App Store" 
                className="h-12 w-auto object-contain flex-shrink-0"
                style={{ maxHeight: '48px', maxWidth: '120px' }}
              />
              <img 
                src={GoogleIcon} 
                alt="Google Play" 
                className="h-12 w-auto object-contain flex-shrink-0"
                style={{ maxWidth: '120px' }}
              />
            </div>
          </div>

          {/* Email */}
          <div 
            className="text-center"
            style={{
              fontFamily: 'Arial',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#FFFFFF'
            }}
          >
            contacto@vureloapp.com
          </div>

          {/* Links legales - stack vertical en mobile */}
          <div 
            className="flex flex-col items-center gap-2 text-center"
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: '#9CA3AF'
            }}
          >
            <a href="#" className="hover:underline">Política de privacidad</a>
            <a href="#" className="hover:underline">Términos y condiciones</a>
            <span>2025 Vurelo Company SAS BIC. Todos los derechos reservados.</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;