import { Link } from "react-router";

export default function Navigation() {
    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1>
                <Link class="home" to={'/'}>GamesPlay</Link>
            </h1>
            <nav>
                <Link to={'/catalog'}>All games</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link to={'/create'}>Create Game</Link>
                    <Link to={'/logout'}>Logout</Link>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>

                </div>
            </nav>
        </header>
    );
}