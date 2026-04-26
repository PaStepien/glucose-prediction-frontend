import { supabase } from '@/auth/lib/supabase';
import Auth from '@/components/auth/Auth';
import { Dashboard } from '@/screens/dashboard/Dashboard';
import { JwtPayload } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
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
    <View>
      <Auth />
      {claims && <Text>{claims.sub}</Text>}
      <Dashboard />
    </View>
  );
};

export default DashboardScreen;