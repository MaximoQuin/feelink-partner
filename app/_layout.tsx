import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="diario" options={{ title: 'Diario' }} />
      <Tabs.Screen name="habitos" options={{ title: 'Hábitos' }} />
    </Tabs>
  );
}