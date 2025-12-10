import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const navigateUser = useNavigate()

  const handleLogout = () => {
    logout()
    navigateUser("/login")
  }

  return (
    <>
      <header className="layout-header">
        <nav className="layout-nav">
          <Link to="/">Nuestros productos</Link>
          <Link to="/sobre-nosotros">Sobre nosotros</Link>
          <Link to="/contacto">Contactanos</Link>
          {
            !user ?
              <>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
              </>
              :
              <>
                <Link to="/agregar-producto">Agregar producto</Link>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </>
          }
        </nav>

      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <p>Sitio desarrollado por María de los Ángeles Escobar, 2025.</p>
      </footer>
    </>
  )
}

export default Layout
