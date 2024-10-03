import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface DashboardData {
  totalImpressions: number;
  reachedAudience: number;
  activeCampaigns: number;
  totalSpending: number;
  recentCampaigns: any[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) {
        setError('Kullanıcı oturumu bulunamadı.');
        setLoading(false);
        return;
      }

      try {
        // Kullanıcının siparişlerini ve ilgili pano bilgilerini çekelim
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select(`
            id,
            campaign_name,
            total_amount,
            status,
            created_at,
            updated_at,
            billboards (
              id,
              name,
              location,
              cpm,
              price
            )
          `)
          .eq('user_id', user.id);

        if (ordersError) throw ordersError;

        // Verileri işleyelim
        const totalImpressions = orders.reduce((sum, order) => {
          const billboardCPM = order.billboards[0]?.cpm || 0; // İlk billboard'un CPM değerini al
          return sum + billboardCPM;
        }, 0);
        const reachedAudience = totalImpressions; // Bu değer gerçek senaryoda farklı olabilir
        const activeCampaigns = orders.filter(order => order.status === 'active').length;
        const totalSpending = orders.reduce((sum, order) => sum + order.total_amount, 0);

        // Son 5 kampanyayı alalım
        const recentCampaigns = orders
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5)
          .map(order => ({
            id: order.id,
            name: order.campaign_name,
            status: order.status,
            amount: order.total_amount,
            billboardName: order.billboards[0]?.name || 'Bilinmeyen Pano',
            location: order.billboards[0]?.location || 'Bilinmeyen Konum',
            impressions: order.billboards[0]?.cpm || 0
          }));

        setData({
          totalImpressions,
          reachedAudience,
          activeCampaigns,
          totalSpending,
          recentCampaigns
        });
      } catch (error) {
        console.error('Veri çekerken hata oluştu:', error);
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return { data, loading, error };
};