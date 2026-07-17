// main.jsx — ponto de entrada: o React "assume" a div #root
// do index.html e renderiza o App dentro dela.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// StrictMode monta componentes 2x em desenvolvimento, de
// propósito, para expor efeitos mal limpos. É exatamente o que
// o useGSAP e nosso cleanup de listeners protegem — deixe LIGADO.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
