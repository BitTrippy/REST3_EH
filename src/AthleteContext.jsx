import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Kontekstin luonti
export const AthleteContext = createContext();

export const AthleteProvider = ({ children }) => {
  // athletes tilamuuttujan määritys. Tilamuuttujaan tallennetaan tietokannasta haetut urheilijat.
  // athletes tilamuuttujan tiedot menemät kaikille AthleteContext.Providerin lapsikomponenteille.
  const [athletes, setAthletes] = useState([]);

  // updateTrigger tilamuuttujan määritys. Tilamuuttujalla ei ole muuta virkaa kuin käynnistää useEffect uudelleen käynnistys.
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // formatDate apufunktio, joka muotoilee päivämäärän oikeaan muotoon
  // Käyttöliittymässä esiintyi erilaisia ongelmia päivämäärien kanssa, joten päivämäärät oli muotoiltava heti tietokannasta noudettaessa.
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Tietokannasta urheilijoiden haku
  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.map((athlete) => ({
          // athlete objektin purkaminen
          ...athlete,
          // birthYear muuttujan muotoilu formatDate apufunktiolla.
          birthYear: formatDate(athlete.birthYear),
        }));
        // Asetetaan urheilijat athletes tilamuuttujaan
        setAthletes(transformedData);
      })
      .catch((error) => console.error("Error fetching athletes:", error));
    // updateTrigger toimii riippuvuutena. updateTrigger muuttuessa tietokannasta suoritetaan uusi urheilija haku
  }, [updateTrigger]);

  // updateTrigger muuttujan arvoa päivitetään aina yhdellä. Tämä käynnistää useEffectin tietokantahaun uudelleen.
  // Tähän on varmasti paljon parempia tapoja toteuttaa useEffect käynnistys, mutta tämä oli yksinkertaisin itsellä toimiva ratkaisu
  const triggerUpdate = () => {
    setUpdateTrigger((prev) => prev + 1); // Increment the updateTrigger to trigger useEffect
  };

  return (
    // AthleteContext.Provider tarjoaa AthleteContextin kaikille sen lapsikomponenteille
    <AthleteContext.Provider value={{ athletes, setAthletes, triggerUpdate }}>
      {children}
    </AthleteContext.Provider>
  );
};

// PropTypes määrittely poistaa konsolivaroituksen, jos children prop arvoa ei ole määritelty
AthleteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
