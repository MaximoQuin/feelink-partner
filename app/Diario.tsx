import { View, Text, StyleSheet } from 'react-native';

export default function DiarioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estás en la pantalla Diario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});