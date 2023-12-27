import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getClient } from '../../api/clientsApi';
import toast from 'react-hot-toast';
import './User.css';

export function User() {
  const [usuario, setUsuario] = useState({});
  const [tokenLogin, setTokenLogin] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const token = Cookies.get('tokenLogin');
      setTokenLogin(token);

      if (token) {
        setIsLoading(true); // Inicia la carga
        try {
          const usuarioConsultado = await consultarCliente(token);
          console.log(usuarioConsultado);
          setUsuario(usuarioConsultado);
        } catch (error) {
          console.error('Error al consultar el usuario:', error);
        }
        setIsLoading(false); // Se completa la carga
      } else {
        window.location.href = '/signin';
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

  const salir = () => {
    Cookies.remove('tokenLogin');
    toast.success('Deslogueado correctamente');
    setTimeout(() => {
      window.location.href = '/signin';
    }, 2000);
  };

  return (
    <div className="user-details">
      <h1>Detalles del Usuario</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <React.Fragment>
          {usuario.nombre && (
            <table className="user-info">
              <tbody>
                <tr>
                  <th>Nombre:</th>
                  <td>{usuario.nombre}</td>
                </tr>
                <tr>
                  <th>Apellido:</th>
                  <td>{usuario.apellido}</td>
                </tr>
                <tr>
                  <th>Correo:</th>
                  <td>{usuario.correo}</td>
                </tr>
                <tr>
                  <th>Teléfono:</th>
                  <td>{usuario.telefono}</td>
                </tr>
              </tbody>
            </table>
          )}
          <button onClick={salir} className="btn-salir">
            Salir
          </button>
        </React.Fragment>
      )}
    </div>
  );
}
