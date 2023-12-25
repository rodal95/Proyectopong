import React from 'react'
import "./CardCampaign.css"
export function CardCampaign({campaign}) {
  return (
    <div>
        <div className="card">
            <div className="card_content">
            <h3 className="card_title">{campaign.nombre}</h3>
            <p className="card_description">{campaign.descripcion}</p>
            <a href={campaign.link} className="card__button">
                Ver más
            </a>
            </div>
        </div>
    </div>
  )
}
