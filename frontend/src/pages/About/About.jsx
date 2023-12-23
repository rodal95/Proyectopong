import React from 'react'
import "./About.css"
export function About() {
  return (
    <div className='container-about'> 
    <h1><strong>Sobre Nosotros</strong></h1>
      <div className="about-content">
        <div className='about-info'>
          <div className='container-about-text'>
            <p>Somos un equipo de emprendedores de alto impacto dedicados a resolver problemas de empresas lideres. Nos enfocamos en entender la generación de valor y su dinámica para potenciarla</p>
            <p>Nuestra misión: Lograr los objetivos de los clientes a través de estrategias efectivas y actualizadas, desarrollando campañas destacadas en estrecha colaboración con ellos</p>
          </div>
          <div>
            <img src="/marketing.jpg" alt="" />
          </div>
        </div>
        
        
      </div>
    </div>
  )
}

