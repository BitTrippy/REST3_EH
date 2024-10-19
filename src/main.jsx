import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { AthleteProvider } from "./AthleteContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* AthleteProvider tarjoaa AthleteContextin kaikille sen lapsikomponenteille 
        Sovellus tarjoaa AhtleteContextin App komponentille, jonka ansiosta kaikki komponentit saavat samat tiedot.
        En koe tämän olevan hyvä tapa toteuttaa konteksti, mutta näin pienessä sovelluksessa tämä toimii hyvin 
        ja kaikki komponentit kuitenkin tarvitsevat kaikki kolme tilatietoa.
    */}
    <AthleteProvider>
      <App />
    </AthleteProvider>
  </StrictMode>
);
