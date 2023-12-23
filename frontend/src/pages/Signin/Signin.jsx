import React from 'react'
import "./Signin.css"
export function Signin() {
  return (
    <div className='container-signin'>
      <h1>Iniciar Sesion</h1>
      <form action="">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"> Email</label>
          <input type="text" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"> Contraseña</label>
          <input type="password" />
        </div>
        <button type="submit" class="btn btn-success">Iniciar Sesion</button>
        
      </form>
    </div>
  )
}

