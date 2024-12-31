import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Colors } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [FONTS.BLACK]: require('../assets/fonts/Roboto-Black.ttf'),
    [FONTS.BOLD]: require('../assets/fonts/Roboto-Bold.ttf'),
    [FONTS.LIGHT]: require('../assets/fonts/Roboto-Light.ttf'),
    [FONTS.MEDIUM]: require('../assets/fonts/Roboto-Medium.ttf'),
    [FONTS.REGULAR]: require('../assets/fonts/Roboto-Regular.ttf'),
    [FONTS.THIN]: require('../assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Roboto-Bold'
        },
      }}>
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />

      <Stack.Screen name="home" options={{
        headerTitle: 'NEWSLY',
        headerTitleStyle: {
          fontSize: 24,
          color: Colors.active,
          fontFamily: 'Roboto-Bold',
        }
      }} />
      <Stack.Screen name='details/[id]' options={{
        headerTitle: 'NEWSLY',
        headerTitleStyle: {
          fontSize: 24,
          color: Colors.active,
          fontFamily: 'Roboto-Bold'
        },
        headerBackButtonDisplayMode: 'minimal'
      }} />
    </Stack>
  );
}
