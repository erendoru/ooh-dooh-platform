"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Campaign {
  id: string;
  name: string;
  impressions: number;
}

interface OverviewProps {
  campaigns: Campaign[];
}

export function Overview({ campaigns }: OverviewProps) {
  const data = campaigns.map((campaign) => ({
    name: campaign.name,
    gösterim: campaign.impressions,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value.toLocaleString()}`}
        />
        <Tooltip />
        <Bar dataKey="gösterim" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
