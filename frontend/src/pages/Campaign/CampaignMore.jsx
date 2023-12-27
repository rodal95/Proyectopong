import React, { useEffect, useState } from 'react';
import './Campaign.css';
import { getCampaigns } from '../../api/campaignApi';
import { CardCampaign } from '../../components/CardCampaign/CardCampaign';

export function CampaignMore() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetCampaigns();
  }, []);

  async function handleGetCampaigns() {
    try {
      const fetchedCampaigns = await getCampaigns();
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false); // Después de obtener los datos, establecer loading como falso
    }
  }

  return (
    <div>
      <h1>Nuestras Campañas y servicios</h1>
      {loading ? (
        <p>Cargando campañas...</p>
      ) : (
        <div className="campaigns">
          
          {campaigns.map((campaign) => (
            <CardCampaign key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}