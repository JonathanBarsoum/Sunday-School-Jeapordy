import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Name is required.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }


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
      if (Array.isArray(data.message)) {
        setMessage(data.message.join(", "));
      } else {
        setMessage(data.message ?? "sign up failed");
      }
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

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
          />

          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>

          <Link to="/" className="home-button">
            Home
          </Link>
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
