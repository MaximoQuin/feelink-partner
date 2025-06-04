import { Text, View } from 'react-native';
import styles from './GraficaStyle';

export default function HeartCard() {
  return (
    <View style={styles.heartCard}>
      <Text style={styles.heartTitle}>❤️ Frecuencia Cardíaca</Text>
      <View style={styles.heartRow}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Actual</Text>
          <Text style={styles.bpmText}>79 bpm</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Rango</Text>
          <Text style={styles.rangeText}>60 bpm - 100 bpm</Text>
        </View>
      </View>
      <Text style={styles.healthyText}>✅ Rango saludable</Text>
    </View>
  );
}
