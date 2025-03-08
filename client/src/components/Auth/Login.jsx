import { useAuth } from "./AuthContext.jsx"; 
import { Link, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch.js";

export default function Login() {
  const { post, error } = useFetch(); 
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const loginHandler = async (formData) => {
    const user = Object.fromEntries(formData);

    try {
  
      const userData = await post("/users/login", user);
  
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
  };

  return (
    <section id="login-page" className="auth">
      <form action={loginHandler} id="login"> 
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Login</h1>

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" required />

          <label htmlFor="login-password">Password:</label>
          <input type="password" id="login-password" name="password" required />

          <input type="submit" className="btn submit" value="Login" />

          <p className="field">
            <span>If you don't have a profile, click <Link to={"/register"}>here</Link></span>
          </p>

          {error && <p className="error">{error}</p>}
        </div>
      </form>
    </section>
  );
}