import React from 'react'
import "./Navbar.css"
export function Navbar() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg custom-bg-color">
        <a class="navbar-brand" href="/"><img src="/peque3.png" alt="" ></img></a>
            <div class="container-fluid">
                
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/about">Nosotros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/campaign">Campañas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/projects">Proyectos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link other" href="/signin">Iniciar Sesion</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link other2" href="/signup">Registrarse</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

