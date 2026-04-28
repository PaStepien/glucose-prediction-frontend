import { supabase } from '@/auth/lib/supabase';
import { Alert, Text, TouchableOpacity } from 'react-native';

export const LogoutButton = () =>{

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Logout error', error.message);
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={{ marginRight: 18 }}>
      <Text style={{ color: '#c084fc', fontWeight: '700', fontSize: 16 }}>Log out</Text>
    </TouchableOpacity>
  );
}
