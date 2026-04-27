import { supabase } from '@/auth/lib/supabase';
import Auth from '@/components/auth/Auth';
import { Dashboard } from '@/screens/dashboard/Dashboard';
import { JwtPayload } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-url-polyfill/auto';

const DashboardScreen = () => {
  const [claims, setClaims] = useState<JwtPayload | null>(null);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data }) => {
      setClaims(data?.claims ?? null);
    });

    supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        setClaims(data?.claims ?? null);
      });
    });
  }, []);

  return (
     <View style={{ flex: 1 }}>
   {claims ? <Dashboard/> : <Auth/>}
    </View>
  );
};

export default DashboardScreen;