import { supabase } from '@/auth/lib/supabase';
import { useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity } from 'react-native';

export const LogoutButton = () =>{
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Logout error', error.message);
    router.replace('/');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 18 }}>
      <Text style={{ color: '#c084fc', fontWeight: '700', fontSize: 16 }}>Log out</Text>
    </TouchableOpacity>
  );
}
