import { useContext, useState } from "react";
// Urheilijakorttien tuonti
import AthleteCard from "./AthleteCard";
// Urheilijakontekstin tuonti
import { AthleteContext } from "./AthleteContext";
// Link käyttöönotto navikointia varten
import { Link } from "react-router-dom";

// Modify komponentti urheilija tietojen muokkaamista varten (PUT ja DELETE)
export default function Modify() {
  // athletes ja triggerUpdate tilamuuttujien tuonti AthleteContextista
  const { athletes, triggerUpdate } = useContext(AthleteContext);
  // Valittu urheilija tilamuuttujan määritys null arvolla
  const [selectedAthleteId, setSelectedAthleteId] = useState(null);
  // Lomake tilamuuttujan määritys ythjänä objektina
  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    birthYear: "",
    weight: "",
    image: "",
    sport: "",
    achievements: "",
  });

  // funktio tallentaa valitun urheilijan ID:n tilamuuttujaan ja asettaa urheilijan tiedot lomakkeeseen.
  const handleSelectChange = (e) => {
    const athleteId = e.target.value;
    setSelectedAthleteId(athleteId);
    const selectedAthlete = athletes.find(
      (athlete) => athlete.athleteId === parseInt(athleteId)
    );
    // Jos urheilija on valittu, asetetaan hänen tiedot listasta lomakkeeseen
    if (selectedAthlete) {
      setFormData({
        fullName: selectedAthlete.fullName,
        nickName: selectedAthlete.nickName,
        birthYear: selectedAthlete.birthYear,
        weight: selectedAthlete.weight,
        image: selectedAthlete.image,
        sport: selectedAthlete.sport,
        achievements: selectedAthlete.achievements,
      });
    }
  };

  // funktio, joka päivittää lomakkeen tietoja ja tallentaa ne tilamuuttujaan
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // DELETE pyyntö urheilijan poistamiseksi
  const handleDelete = () => {
    // Dropdown valikosta valitun urheilijan id lisätään kutsuun parametrina
    fetch(`http://localhost:3000/api/delete/${selectedAthleteId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // triggerUpdate muuttujan arvoa päivitetään aina yhdellä. Tämä käynnistää useEffectin tietokantahaun uudelleen.
        triggerUpdate();
        // Urheilijan valinta nollataan
        setSelectedAthleteId(null);
        // Ilmoitus urheilijan poistamisesta alert-ikkunassa
        alert("Athlete deleted successfully!");
      })
      .catch((error) => console.error("Error deleting athlete:", error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/api/update/${selectedAthleteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Lomakkeen tiedot lähetetään JSON muodossa
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        // triggerUpdate muuttujan arvoa päivitetään aina yhdellä. Tämä käynnistää useEffectin tietokantahaun uudelleen.
        triggerUpdate();
        // Urheilijan valinta nollataan
        setSelectedAthleteId(null);
        // Ilmoitus urheilijan päivittämisestä alert-ikkunassa
        alert("Athlete updated successfully!");
      })
      .catch((error) => console.error("Error updating athlete:", error));
  };

  return (
    <div className="container border pb-4">
      <Link to="/" className="btn btn-primary mb-4 mt-4">
        Back to Athletes
      </Link>
      <div className="row mb-3">
        <div className="form-group">
          <label htmlFor="athleteSelect">Select an Athlete:</label>
          <select
            className="form-control"
            id="athleteSelect"
            onChange={handleSelectChange}
            value={selectedAthleteId || ""}
          >
            <option value="" disabled>
              -- Select an Athlete --
            </option>
            {/* Urheilijoiden listaus dropdown-valikkoon. .map funktio katsoo urheilija listan läpi ja valitsee ID:n ja nimen valittavaksi dropdown-valikkoon */}
            {athletes.map((athlete) => (
              <option key={athlete.athleteId} value={athlete.athleteId}>
                {`${athlete.athleteId}: ${athlete.fullName}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Urheilijan valinta dropdown-valikosta renderöi loput käyttöliittymästä */}
      {selectedAthleteId && (
        <form onSubmit={handleUpdate}>
          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nickName">Nickname:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nickName"
                  value={formData.nickName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthYear">Birth date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL:</label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sport">Sport:</label>
                <input
                  type="text"
                  className="form-control"
                  id="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="achievements">Achievements:</label>
                <input
                  type="text"
                  className="form-control"
                  id="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary col-md-2 mt-4">
                Save
              </button>
              <button
                type="submit"
                className="btn btn-danger col-md-2 mt-4"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <div className="col-md-4 mt-4">
              {/* Urheilijakortin renderöinti, joka etsii oikean kortin näytettäväksi */}
              <AthleteCard
                athlete={athletes.find(
                  (athlete) => athlete.athleteId === parseInt(selectedAthleteId)
                )}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
