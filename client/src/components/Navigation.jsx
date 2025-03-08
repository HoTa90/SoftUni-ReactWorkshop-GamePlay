import { Link } from "react-router";
import { useAuth } from "./Auth/AuthContext.jsx";

export default function Navigation() {

    const { userData, logout } = useAuth();


    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1>
                <Link className="home" to={'/'}>GamesPlay</Link>
            </h1>
            <nav>
                <Link to={'/games'}>All games</Link>
                {/* <!-- Logged-in users --> */}
                {userData &&
                    <div id="user">
                        <Link to={'/create'}>Create Game</Link>
                        <Link to={'/logout'} onClick={logout}>Logout</Link>
                    </div>
                }

                {/* <!-- Guest users --> */}
                {!userData &&
                    <div id="guest">
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>}

            </nav>
        </header>
    );
}