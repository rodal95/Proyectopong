import React from 'react';
import { set, useForm } from 'react-hook-form';
import {createClient} from '../../api/clientsApi';
import './Signup.css';
import toast from 'react-hot-toast';

export function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    guardarCliente(data);
  };
  async function guardarCliente(data){
    try{
      const response = await createClient(data);
      toast.success('Cliente creado con éxito');
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="container-signup">
      <h1>Regístrate</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputName">Nombre</label>
          <input
            type="text"
            id="inputName"
            name="name"
            {...register('nombre', { required: 'Este campo es requerido' })}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputLastName">Apellido</label>
          <input
            type="text"
            id="inputLastName"
            name="lastName"
            {...register('apellido', { required: 'Este campo es requerido' })}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputDNI">DNI</label>
          <input
            type="text"
            id="inputDNI"
            name="dni"
            {...register('dni', { required: 'Este campo es requerido' })}
          />
          {errors.dni && <span>{errors.dni.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputPhone">Teléfono</label>
          <input
            type="text"
            id="inputPhone"
            name="phone"
            {...register('telefono', { required: 'Este campo es requerido' })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Correo</label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            {...register('correo', {
              required: 'Este campo es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Correo inválido',
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Contraseña</label>
          <input
            type="password"
            id="inputPassword"
            name="password"
            {...register('contraseña', { required: 'Este campo es requerido' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
      </form>
    </div>
  );
}
