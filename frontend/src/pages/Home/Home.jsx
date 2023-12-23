import React from 'react'
import "./Home.css"
export function Home() {
  return (
    <div className='container-home'>
        <div className='text-home'>
            <h1>Tu visión, nuestra creatividad; juntos, creamos historias que perduran en la mente tu audiencia</h1>
            <p>A través de  creativas estrategias en redes sociales, radios, televisión y afiches, logramos que tu marca destaque, llegando de manera efectiva a tu audiencia y generando impacto duradero. Nuestro éxito se mide en sonrisas satisfechas y el crecimiento que las marcas que confían en nosostros</p>
            <a href='/contact'><button type="button" class="btn btn-danger">Contactanos</button></a>
        </div>
        <div className='image-home'>
            <img src="/home_image.jpeg" alt="" />
        </div>
        
    </div>
  )
}

