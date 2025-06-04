import { View, ScrollView } from 'react-native';
import HeaderCard from '../screens/Grafica/HeaderCard';
import HeartCard from '../screens/Grafica/HeartCard';
import ChartCard from '../screens/Grafica/ChartCard';
import styles from '../styles/graficaStyles';

export default function Grafica() {
  return (
    <ScrollView style={styles.container}>
      <HeaderCard />
      <HeartCard />
      <ChartCard />
    </ScrollView>
  );
}
