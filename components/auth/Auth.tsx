
import { supabase } from '@/auth/lib/supabase'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { T } from '../../constants/dashboard/theme'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <LinearGradient colors={T.gradBg} style={styles.bg}>
      <View style={styles.centered}>
        <View style={styles.card}>
          <Text style={styles.title}>Sign in to your account</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="email@address.com"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor={T.muted}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor={T.muted}
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={signInWithEmail}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton, loading && styles.buttonDisabled]}
              onPress={signUpWithEmail}
              disabled={loading}
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: T.surface,
    borderRadius: T.radius.lg,
    borderWidth: 1,
    borderColor: T.border,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    gap: 18,
  },
  title: {
    fontSize: T.font.xl,
    fontWeight: '700',
    color: T.text,
    marginBottom: 10,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: T.font.sm,
    fontWeight: '600',
    color: T.muted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: T.border,
    borderRadius: T.radius.md,
    padding: 12,
    fontSize: T.font.md,
    color: T.text,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: T.purple,
    borderRadius: T.radius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: T.purple,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: T.font.md,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: T.purple,
  },
})