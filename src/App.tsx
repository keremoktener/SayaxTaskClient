import { NavLink, Outlet } from "react-router-dom";

export default function App() {
    return (
        <div className="container">
            <header className="header">
                <h1 className="brand">Sayax Dashboard</h1>
                <nav className="nav">
                    <NavLink to="/invoices" end className={({isActive}) => isActive ? "active" : ""}>Faturalar</NavLink>
                    <NavLink to="/municipalities" className={({isActive}) => isActive ? "active" : ""}>Belediye BTV</NavLink>
                </nav>
            </header>

            <Outlet />


        </div>
    );
}