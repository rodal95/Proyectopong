import React,{useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {getClient} from '../../api/clientsApi'
import "./Navbar.css"
export function Navbar() {
    const [usuario, setUsuario] = useState({})
    const [tokenLogin, setTokenLogin] = useState('')
    useEffect(() => {
        const obtenerUsuario = async () => {
            const token = Cookies.get('tokenLogin');
            setTokenLogin(token);
    
            if (token) {
                try {
                    const usuarioConsultado = await consultarCliente(token);
                    console.log(usuarioConsultado);
                    setUsuario(usuarioConsultado);
                } catch (error) {
                    console.error('Error al consultar el usuario:', error);
                }
            }
        };
    
        obtenerUsuario();
    }, []);
    
    async function consultarCliente(tokenLogin) {
        try {
            const result = await getClient(tokenLogin);
            return result;
        } catch (error) {
            throw new Error('Error al obtener el cliente');
        }
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg custom-bg-color">
        <a className="navbar-brand" href="/"><img src="/peque3.png" alt="" /></a>
        <div className="container-fluid">
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/about">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/campaign">Campañas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/projects">Proyectos</a>
              </li>
              {tokenLogin ? (
                <>
                  {/* Mostrar nombre de usuario si hay un token */}
                  <li className="nav-item">
                    <a href='/user'><span className="nav-link">Bienvenido {usuario.nombre}</span></a>
                  </li>
                  {/* Otros elementos relevantes para el usuario logueado */}
                </>
              ) : (
                <>
                  {/* Mostrar links para iniciar sesión y registrarse si no hay un token */}
                  <li className="nav-item">
                    <a className="nav-link other" href="/signin">Iniciar Sesión</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link other2" href="/signup">Registrarse</a>
                  </li>
                </>
              )}
              {/* Elementos comunes para usuarios logueados o no logueados */}
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 576 512" fill='white'><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

