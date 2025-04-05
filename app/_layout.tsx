import React from 'react';
import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { colors } from '@/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaView className="w-full h-full">
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cast/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar
        // hidden={true}
        backgroundColor={colors.primary}
        style="light"
      />
    </SafeAreaView>
  )
}