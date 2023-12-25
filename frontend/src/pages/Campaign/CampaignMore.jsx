import React,{useEffect, useState} from 'react'
import './Campaign.css'
import { getCampaigns } from '../../api/campaignApi'
import { CardCampaign } from '../../components/CardCampaign/CardCampaign'
export function CampaignMore() {
  const [campaigns, setCampaigns] = useState([])
  useEffect(() => {
    handleGetCampaigns()
  }, [])
  async function handleGetCampaigns() {
    const campaigns = await getCampaigns()
    setCampaigns(campaigns)
  }
  return (
    <div>
      <div className="campaigns">
        {campaigns.map((campaign) => (
          <CardCampaign key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  )
}
