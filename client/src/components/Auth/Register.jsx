import { Link, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "./AuthContext.jsx";

export default function Register() {

  const { post, error } = useFetch();
  const { login } = useAuth();
  const navigate = useNavigate();


  const registerHandler = async (formData) => {

    const user = Object.fromEntries(formData);

    try {
      const userData = await post("/users/register", user);

      const newUserData = {
        token: userData.accessToken,
        id: userData._id,
        email: userData.email,
      };

      login(newUserData);
      navigate("/");

    } catch (err) {
      console.error("Login failed:", err);
    }

  }

  return (
    <section id="register-page" className="content auth">
      <form action={registerHandler} id="register">
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Register</h1>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="maria@email.com" />

          <label htmlFor="pass">Password:</label>
          <input type="password" name="password" id="register-password" />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input type="password" name="confirm-password" id="confirm-password" />

          <input className="btn submit" type="submit" defaultValue="Register" />

          <p className="field">
            <span>If you already have profile click <Link to={'/'}>here</Link></span>
          </p>
        </div>
      </form>
    </section>
  );
}