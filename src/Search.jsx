import { useContext, useState } from "react";
import { AthleteContext } from "./AthleteContext";
import AthleteCard from "./AthleteCard";
import { Link } from "react-router-dom";

export default function SearchAthlete() {
  const { athletes } = useContext(AthleteContext);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filteredAthletes, setFilteredAthletes] = useState([]);

  // Funktio, joka etsii athletes listasta nimen tai id:n perusteella
  const handleSearch = () => {
    let filtered = athletes;

    // Jos nimi kentässä on jotain, etsitään nimen perusteella. Hakusanaa vastaavat urheilijat lisätään filtered listaan.
    if (searchName) {
      filtered = filtered.filter((athlete) =>
        athlete.fullName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Jos id kentässä on jotain, etsitään id:n perusteella. Numeroa vastaava urheilija lisätään filtered listaan.
    if (searchId) {
      filtered = filtered.filter((athlete) =>
        athlete.athleteId.toString().includes(searchId)
      );
    }

    // Löydetyt tulokset tallennetaan filteredAthletes tilamuuttujaan.
    setFilteredAthletes(filtered);
  };

  // Apufunktio, joka tyhjentää id kentän, jos nimi kenttään kirjoitetaan jotain.
  const handleNameChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value) {
      setSearchId("");
    }
  };

  // Apufunktio, joka tyhjentää nimi kentän, jos id kenttään kirjoitetaan jotain.
  const handleIdChange = (e) => {
    setSearchId(e.target.value);
    if (e.target.value) {
      setSearchName("");
    }
  };

  return (
    <div>
      <div className="container border p-4">
        <div className="row">
          <div className="col-md-4">
            <Link to="/" className="btn btn-primary mb-4">
              Back to Athletes
            </Link>
            <div className="mb-3">
              <label htmlFor="searchName">Search name:</label>
              <input
                type="text"
                value={searchName}
                id="searchName"
                onChange={handleNameChange}
                placeholder="Search Athletes"
                name="searchName"
                className="form-control"
              />
            </div>
            <p>
              <strong>OR</strong>
            </p>
            <div className="mb-3">
              <label htmlFor="searchId">Search ID:</label>
              <input
                type="text"
                value={searchId}
                id="searchId"
                onChange={handleIdChange}
                placeholder="Search Athletes"
                name="searchId"
                className="form-control"
              />
            </div>
            <button onClick={handleSearch} className="btn btn-primary mt-4">
              Search
            </button>
          </div>
          <div className="col-md-8">
            <div className="row">
              {/* Käydään läpi filteredAthletes tilamuuttujan lista ja jokaisesta urheilijasta näytetään AthleteCard tiedoilla. */}
              {filteredAthletes.map((athlete) => (
                <div key={athlete.athleteId} className="col-md-6 pb-1">
                  <AthleteCard athlete={athlete} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
