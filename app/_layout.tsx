import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

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
          tabBarIcon: ({ color }) => <MaterialIcons name="edit-note" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="grafica" 
        options={{ 
          title: 'Graficas',
          tabBarIcon: ({ color }) => <MaterialIcons name="bar-chart" size={24} color={color} />,
        }} 
      />
    </Tabs>
  );
}