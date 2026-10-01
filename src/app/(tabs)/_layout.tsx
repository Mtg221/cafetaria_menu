import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600'
        },
        headerStyle: {
          backgroundColor: '#1E293B'
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700'
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 18 }}>🍲</Text>
          ),
          headerTitle: 'Senegalese Cafeteria'
        }}
      />
      <Tabs.Screen
        name="specials"
        options={{
          title: 'Daily Specials',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 18 }}>🔥</Text>
          ),
          headerTitle: "Today's Specials"
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info & Hours',
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: focused ? 22 : 18 }}>📍</Text>
          ),
          headerTitle: 'Cafeteria Hours & Location'
        }}
      />
    </Tabs>
  );
}
