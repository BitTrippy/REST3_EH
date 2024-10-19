import { useContext, useState } from "react";
import { AthleteContext } from "./AthleteContext";
import { Link } from "react-router-dom";

// AddAthlete komponentti urheilijoiden lisäämistä varten
export default function AddAthlete() {
  // triggerUpdate tilamuuttujan tuonti AthleteContextista
  const { triggerUpdate } = useContext(AthleteContext);
  // formData tilamuuttujan alustus tyhjillä arvoilla
  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    birthYear: "",
    weight: "",
    image: "",
    sport: "",
    achievements: "",
  });

  // handleChange funktio, joka päivittää formData tilamuuttujan arvoja
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handleSubmit funktio lähettää POST pyynnön palvelimelle ja lisää uuden urheilijan tietokantaan
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Lähetetään formData tilamuuttujan arvot JSON-muodossa
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        // triggerUpdate muuttujan arvoa päivitetään aina yhdellä. Tämä käynnistää useEffectin tietokantahaun uudelleen.
        triggerUpdate();
        alert("Athlete added successfully!");
        // Lomake tyhjennetään lisäyksen jälkeen valmiiksi seuraavaa lisäystä varten
        setFormData({
          fullName: "",
          nickName: "",
          birthYear: "",
          weight: "",
          image: "",
          sport: "",
          achievements: "",
        });
      })
      .catch((error) => console.error("Error adding athlete:", error));
  };

  return (
    <div className="container border">
      <div className="">
        <Link to="/" className="btn btn-primary mt-4 mb-4">
          Back to Athletes
        </Link>
        <form onSubmit={handleSubmit} className="md-4">
          <div className="form-group">
            <label htmlFor="fullName" className="col-sm-2 col-form-label">
              Full Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Mickey Mouse"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nickName" className="col-sm-2 col-form-label">
              Nickname:
            </label>
            <input
              type="text"
              className="form-control"
              id="nickName"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="Micky"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="birthYear" className="col-sm-2 col-form-label">
              Birth date:
            </label>
            <input
              type="date"
              className="form-control"
              id="birthYear"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight" className="col-sm-2 col-form-label">
              Weight (kg):
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="88"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className="col-sm-2 col-form-label">
              Image URL:
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="www.example.com/image.jpg"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sport" className="col-sm-2 col-form-label">
              Sport:
            </label>
            <input
              type="text"
              className="form-control"
              id="sport"
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              placeholder="Ice Hockey"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="achievements" className="col-sm-2 col-form-label">
              Achievements:
            </label>
            <input
              type="text"
              className="form-control"
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              placeholder="MM-2023, MVP-2024"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-4 mt-4">
            Add Athlete
          </button>
        </form>
      </div>
    </div>
  );
}
