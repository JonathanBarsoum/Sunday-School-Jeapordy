import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./SignInPage.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (Array.isArray(data.message)) {
        setMessage(data.message.join(", "));
      } else {
        setMessage(data.message ?? "Sign in failed");
      }

      setIsSubmitting(false);
      return;
    }

    setMessage(`Welcome back, ${data.name}!`);
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  }

  return (
    <main className="signin-page">
      <section className="signin-card">
        <h1>Sign In</h1>
        <p>Sign in to create questions, build games, and track class activity.</p>

        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          <Link to="/" className="home-button">
            Home
          </Link>
        </form>

        {message && <p className="signin-message">{message}</p>}

        <p className="signup-link">
          Need an account? <Link to="/signup">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default SignInPage;
