import React from 'react';
import { useForm } from 'react-hook-form';
import {loginClient} from '../../api/clientsApi';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import './Signin.css';

export function Signin() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    loguearCliente(data);
  };
  async function loguearCliente(data){
    const result = await loginClient(data);
    Cookies.set('tokenLogin', result.token, { expires: 1 })
    toast.success('Logueado correctamente');
    setTimeout(()=>{
      window.location.href = '/';
  },2000)
  }
  return (
    <div className='container-signin'>
      <h1>Iniciar Sesion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" id="email" {...register('email')} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input type="password" id="password" {...register('password')} />
        </div>
        <button type="submit" className="btn btn-success">Iniciar Sesion</button>
        <a href="/signup"> No tenes cuenta? Registrate</a>
      </form>
    </div>
  );
}