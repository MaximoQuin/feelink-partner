import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ChartCard() {
  const chartData = [20, 35, 50, 60, 68, 74, 79]; // Flujo de valores hasta 79

  return (
    <View style={styles.container}>
      <Text style={styles.bpmText}>❤️ Control de bpm</Text>

      <LineChart
        data={{
          labels: ['', '', '', '', '', '', ''],
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={screenWidth - 48}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(67, 56, 202, ${opacity})`, // azul fuerte
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: '#4338CA',
          },
        }}
        bezier
        fromZero
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={true}
        yAxisInterval={20}
        yAxisSuffix=""
        yAxisSide="right"
        segments={5}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(67, 56, 202, ${opacity})`,
          labelColor: () => '#000',
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginTop: 16,
  },
  bpmText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
    color: '#4338CA',
  },
  chart: {
    borderRadius: 10,
  },
});
