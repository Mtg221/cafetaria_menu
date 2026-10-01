import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <CartProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1E293B' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700' },
          headerBackTitle: 'Back'
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="item/[id]"
          options={{
            headerTitle: 'Loading...',
            headerBackTitle: 'Menu'
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            presentation: 'modal',
            title: 'Your Order & Cart',
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#F8FAFC'
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{ title: 'Page Not Found' }}
        />
      </Stack>
    </CartProvider>
  );
}
