import { ScrollView } from 'react-native';
import ChartCard from './ChartCard';
import styles from './GraficaStyle';
import HeaderCard from './HeaderCard';
import HeartCard from './HeartCard';

export default function Grafica() {
  return (
    <ScrollView style={styles.container}>
      <HeaderCard />
      <HeartCard />
      <ChartCard />
    </ScrollView>
  );
}
