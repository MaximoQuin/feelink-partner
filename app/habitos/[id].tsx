import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { habits } from '@/app/data';
import { Feather } from '@expo/vector-icons';
import styles from './HabitoDetalleEstilo';

const HabitDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habit = habits.find(h => h.id === Number(id));

  if (!habit) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Hábito no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen 
        options={{ 
          title: habit.title,
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Feather name="edit-2" size={20} color="#3730A3" />
            </TouchableOpacity>
          )
        }} 
      />

      {/* Sección de información básica */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información del hábito</Text>
        <View style={styles.infoRow}>
          <Feather name="clock" size={20} color="#6B7280" />
          <Text style={styles.infoText}>Hora: {habit.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={20} color="#6B7280" />
          <Text style={styles.infoText}>
            Días: {habit.days.join(', ')}
          </Text>
        </View>
      </View>

      {/* Sección de descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.descriptionText}>
          {habit.description || 'No hay descripción disponible'}
        </Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
          <Feather name="edit-3" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Feather name="trash-2" size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HabitDetailScreen;