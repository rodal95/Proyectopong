import React from 'react'
import "./Signup.css"
export function Signup() {
  return (
    <div class="container-signup">
      <h1>Registrate</h1>
      <form action="">
        <div class="form-group">
          <label for="inputName">Nombre</label>
          <input type="text" id="inputName" name="name"/>
        </div>
        <div class="form-group">
          <label for="inputLastName">Apellido</label>
          <input type="text" id="inputLastName" name="lastName"/>
        </div>
        <div class="form-group">
          <label for="inputDNI">DNI</label>
          <input type="text" id="inputDNI" name="dni"/>
        </div>
        <div class="form-group">
          <label for="inputPhone">Teléfono</label>
          <input type="text" id="inputPhone" name="phone"/>
        </div>
        <div class="form-group">
          <label for="inputEmail">Correo</label>
          <input type="email" id="inputEmail" name="email"/>
        </div>
        <div class="form-group">
          <label for="inputPassword">Contraseña</label>
          <input type="password" id="inputPassword" name="password"/>
        </div>
        <button type="submit" class="btn btn-success">Registrarse</button>
      </form>
    </div>
  )
}
