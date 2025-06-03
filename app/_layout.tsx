import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1a73e8',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="diario" 
        options={{ 
          title: 'Diario',
          tabBarIcon: ({ color }) => <MaterialIcons name="book" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="habitos" 
        options={{ 
          title: 'Hábitos',
          tabBarIcon: ({ color }) => <MaterialIcons name="check-circle" size={24} color={color} />,
        }} 
      />
    </Tabs>
  );
}