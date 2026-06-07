import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HomePage.css";

type CurrentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const menuButtons = [
  { label: "Questions", path: "/questions" },
  { label: "Create Game", path: "/games" },
  { label: "Analytics", path: "/analytics" },
];

function HomePage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    async function loadCurrentUser() {
      const response = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        setCurrentUser(null);
        return;
      }

      const user = await response.json();
      setCurrentUser(user);
    }

    loadCurrentUser();
  }, []);

  return (
    <main className="home-screen">
      <div className="auth-buttons">
        {currentUser ? (
          <>
            <span className="current-user">
              Welcome, {currentUser.name}
            </span>

            <button
              className="auth-button logout-button"
              onClick={async () => {
                await fetch("http://localhost:3000/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });

                setCurrentUser(null);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="auth-button">
              Sign In
            </Link>
            <Link to="/signup" className="auth-button auth-button-primary">
              Sign Up
            </Link>
          </>
        )}
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
