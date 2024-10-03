import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Campaign {
  id: string;
  name: string;
  status: string;
  amount: number;
  billboardName: string;
  location: string;
  impressions: number;
}

interface RecentCampaignsProps {
  campaigns: Campaign[];
}

export function RecentCampaigns({ campaigns }: RecentCampaignsProps) {
  if (campaigns.length === 0) {
    return <div>Henüz kampanyanız bulunmamaktadır.</div>;
  }

  return (
    <div className="space-y-8">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/campaigns/${campaign.id}.png`} alt="Campaign" />
            <AvatarFallback>
              {campaign.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{campaign.name}</p>
            <p className="text-sm text-muted-foreground">
              {campaign.billboardName} - {campaign.location}
            </p>
          </div>
          <div className="ml-auto text-sm">
            <p>{campaign.impressions.toLocaleString()} Gösterim</p>
            <p className="text-muted-foreground">
              {campaign.amount.toLocaleString()} ₺
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
