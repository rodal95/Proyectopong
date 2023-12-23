import React from 'react'
import "./Campaign.css"
export function Campaign() {
  return (
    <div className='container-campaign'>
      <div className='text-campaign'>
        <div >
          <h1>Nuestros Servicios</h1>
        </div>
        <div>
          <p>Ofrecemos un abanico de servicios en nuestra empresa de publicidad, que se agrupan en cuatro áreas claves, cada una de estas áreas abarca estrategias especializadas para promocionar productos y servicios a nustros clientes.</p>
        </div>
        <a href='/campaign/more'><button className='btn btn-danger'>Ver Mas</button></a>
      </div>
      <div className='image-campaign'>
        <img src="/campañas1.png" alt="" />
      </div>
    </div>
  )
}

