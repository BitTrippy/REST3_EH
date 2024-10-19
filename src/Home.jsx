// Link käyttöönotto navikointia varten
import { Link } from "react-router-dom";

// Home komponentti toimii aloitussivuna, joka ohjaa käyttäjää eri toimintoihin. Jokaiselta sivulta on navigointi takaisin Home sivulle.
export default function Home() {
  return (
    <div className="container mt-4">
      <h1>Welcome to the Athlete Database!</h1>
      <p>
        Functionality of the database have been divided into three different
        sections you can find below using the buttons.
      </p>
      <div className="mt-4">
        <Link to="/add" className="btn btn-dark btn-lg col-2">
          Add Athlete
        </Link>
        <Link to="/search" className="btn btn-dark mx-3 btn-lg col-2">
          Search Athlete
        </Link>
        <Link to="/modify" className="btn btn-dark btn-lg col-2">
          Modify Athlete
        </Link>
      </div>
    </div>
  );
}
