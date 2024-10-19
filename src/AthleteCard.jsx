import PropTypes from "prop-types";

// AthleteCard komponentti hoitaa urheilijakortin renderöinnin
export default function AthleteCard({ athlete }) {
  // formatDate apufunktio, joka muotoilee päivämäärän suomalaiseen muotoon näytettäväksi kortissa
  const formatDate = (date) => {
    return date.toLocaleDateString("fi-FI");
  };

  // birthYearDate muuttujan määritys. birthYearDate muuttujaan tallennetaan urheilijan syntymäaika Date objektina.
  const birthYearDate = new Date(athlete.birthYear);
  // formattedBirthYear muuttujan määritys. formattedBirthYear muuttujaan tallennetaan urheilijan syntymäaika suomalaisessa muodossa.
  const formattedBirthYear = formatDate(birthYearDate);

  return (
    <div className="card">
      <h5 className="card-title">{athlete.fullName}</h5>
      <img
        src={athlete.image}
        className="card-img-top"
        alt={athlete.fullName}
      />
      <div className="card-body">
        <div className="card-text">
          <div className="mb-2">Nickname: {athlete.nickName}</div>
          {/* formattedBirthYear muuttujan käyttö, jotta saadaan päivämäärä näytettyä oikein */}
          <div className="mb-2">Birth date: {formattedBirthYear}</div>
          <div className="mb-2">Weight: {athlete.weight} kg</div>
          <div className="mb-2">Sport: {athlete.sport}</div>
          <div className="mb-2">Achievements: {athlete.achievements} </div>
        </div>
      </div>
    </div>
  );
}

// PropTypes määrittely poistaa konsolivaroituksen, jos athlete prop arvoa ei ole määritelty
AthleteCard.propTypes = {
  athlete: PropTypes.shape({
    athleteId: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    birthYear: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    sport: PropTypes.string.isRequired,
    achievements: PropTypes.string,
  }).isRequired,
};
