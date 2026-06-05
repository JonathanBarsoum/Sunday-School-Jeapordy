import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message ?? "Sign up failed");
      setIsSubmitting(false);
      return;
    }

    setMessage(`Account created for ${data.name}`);
    setName("");
    setEmail("");
    setPassword("");
    setIsSubmitting(false);
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Create Account</h1>
        <p>Sign up to create questions, build games, and track class activity.</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

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
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && <p className="signup-message">{message}</p>}

        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default SignUpPage;
