import React from 'react'
import "./Contact.css"
export function Contact() {
  return (
    <div class="container-contact">
  <h1>Contactanos</h1>
  <form action="">
    <div class="form-group">
      <label for="inputFirstName">Nombre</label>
      <input type="text" id="inputFirstName" name="firstName"/>
    </div>
    <div class="form-group">
      <label for="inputLastName">Apellido</label>
      <input type="text" id="inputLastName" name="lastName"/>
    </div>
    <div class="form-group">
      <label for="inputPhone">Teléfono</label>
      <input type="text" id="inputPhone" name="phone"/>
    </div>
    <div class="form-group">
      <label for="inputEmail">Correo</label>
      <input type="email" id="inputEmail" name="email"/>
    </div>
    <button type="submit" class="btn btn-success">Enviar</button>
  </form>
</div>

  )
}

