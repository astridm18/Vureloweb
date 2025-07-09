import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import VureloBlackLogo from "../assets/images/vurelo-black.svg";
import countryCodes from "../data/countryCodes.json"; // Importa el JSON

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    acepta: false,
  });

  // Colombia como default (primer elemento del JSON)
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${selectedCountry.dial_code}${formData.telefono}`;
    console.log("Formulario enviado:", { ...formData, telefono: fullPhone });
    // Aquí puedes agregar la lógica para enviar los datos
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "telefono") {
      // Solo permitir números
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Overlay con fondo semitransparente negro */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 z-[100000] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.35)",
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-[100001] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } 
        top-0 right-0 h-full w-full
        md:w-[440px] md:right-0`}
        style={{
          display: "flex",
          height: "100vh",
          padding: "30px 30px 50px 30px",
          flexDirection: "column",
          justifyContent: "space-between", // Cambiado a space-between
          alignItems: "center",
          flexShrink: 0,
          background: "#FFF",
        }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header con logo - Div separado */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {/* Logo vurelo-black.svg */}
          <img
            src={VureloBlackLogo}
            alt="Vurelo Logo"
            style={{
              width: "auto",
              height: "40px",
            }}
          />

          {/* Texto descriptivo */}
          <p
            style={{
              color: "#4F4F4F",
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontSize: "20px",
              fontWeight: 300,
              lineHeight: "24px",
              margin: 0,
            }}
          >
            Sé de los primeros en unirte al
            <br />
            universo{" "}
            <span
              style={{
                color: "#4F4F4F",
                fontFamily: "Poppins, sans-serif",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              vurelo
            </span>
          </p>
        </div>

        {/* Form - Div del medio */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
            alignSelf: "stretch",
            width: "100%",
          }}
        >
          {/* Input Nombre */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            <input
              type="text"
              name="nombre"
              placeholder="Ingresa tu nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "42px",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid #4F4F4F",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#4F4F4F",
                outline: "none",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          {/* Input Apellido */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            <input
              type="text"
              name="apellido"
              placeholder="Ingresa tu apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "42px",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid #4F4F4F",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#4F4F4F",
                outline: "none",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          {/* Input Email */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="nombre@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "42px",
                padding: "8px 16px",
                borderRadius: "100px",
                border: "1px solid #4F4F4F",
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "24px",
                color: "#4F4F4F",
                outline: "none",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          {/* Input Teléfono */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              flex: "1 0 0",
              alignSelf: "stretch",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "42px",
                padding: "8px 16px",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "100px",
                border: "1px solid #4F4F4F",
                boxSizing: "border-box",
                position: "relative",
              }}
            >
              {/* Código de área con dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    color: "#4F4F4F",
                    outline: "none",
                  }}
                >
                  <span>
                    <img
                      src={`https://country-code-au6g.vercel.app/${selectedCountry.image}`}
                      alt={`${selectedCountry.name} flag`}
                      width={20}
                      height={15}
                      style={{ verticalAlign: "middle", marginRight: 8 }}
                    />
                  </span>
                  <span>{selectedCountry.dial_code}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* Dropdown con búsqueda mejorada */}
                {showDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      marginTop: "4px",
                      width: "280px",
                      background: "#FFF",
                      border: "1px solid #E5E5E5",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                      zIndex: 1000,
                      maxHeight: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {countryCodes.map((country, index) => (
                      <button
                        key={`${country.dial_code}-${country.name}-${index}`}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          background:
                            selectedCountry.name === country.name
                              ? "#F8F9FA"
                              : "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "14px",
                          color: "#4F4F4F",
                          outline: "none",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCountry.name !== country.name) {
                            e.currentTarget.style.backgroundColor = "#F5F5F5";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCountry.image !== country.image) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <span style={{ fontSize: "18px", minWidth: "24px" }}>
                          <img
                            src={`https://country-code-au6g.vercel.app/${country.image}`}
                            alt={`${country.name} flag`}
                            width={20}
                            height={15}
                            style={{
                              verticalAlign: "middle",
                              marginRight: 8,
                            }}
                          />
                        </span>
                        <span style={{ minWidth: "50px", fontWeight: 500 }}>
                          {country.dial_code}
                        </span>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {country.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input del teléfono */}
              <input
                type="tel"
                name="telefono"
                placeholder="3178558867"
                value={formData.telefono}
                onChange={handleInputChange}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: "#4F4F4F",
                  marginLeft: "12px",
                  background: "transparent",
                }}
                required
              />
            </div>
          </div>
        </form>

        {/* Footer con checkbox y botón - Div separado abajo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            alignSelf: "stretch",
            width: "100%",
          }}
        >
          {/* Checkbox y texto */}
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              name="acepta"
              checked={formData.acepta}
              onChange={handleInputChange}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#181819",
              }}
              required
            />
            <label
              style={{
                color: "#181819",
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "15px",
              }}
            >
              Autorizo la{" "}
              <span
                style={{
                  color: "#181819",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  lineHeight: "15px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                política de tratamiento de datos
              </span>
            </label>
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={!formData.acepta}
            style={{
              display: "flex",
              height: "42px",
              padding: "12px 28px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "50px",
              background: "#181819",
              border: "none",
              cursor: formData.acepta ? "pointer" : "not-allowed",
              opacity: formData.acepta ? 1 : 0.6,
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Poppins, sans-serif",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "25.5px",
            }}
            onClick={handleSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormModal;
