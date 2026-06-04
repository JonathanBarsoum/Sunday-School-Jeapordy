import { Link } from "react-router-dom";
import "./HomePage.css";

const menuButtons = [
  {
    label: "Questions",
    path: "/questions",
  },
  {
    label: "Create Game",
    path: "/games",
  },
  {
    label: "Analytics",
    path: "/analytics",
  },
];

function HomePage() {
  return (
    <main className="home-screen">
      <div className="auth-buttons">
        <Link to="/signin" className="auth-button">
          Sign In
        </Link>
        <Link to="/signup" className="auth-button auth-button-primary">
          Sign Up
        </Link>
      </div>

      <section className="home-content">
        <h1 className="jeopardy-logo">JEOPARDY!</h1>

        <nav className="main-menu">
          {menuButtons.map((button) => (
            <Link key={button.path} to={button.path} className="menu-button">
              {button.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

export default HomePage;
