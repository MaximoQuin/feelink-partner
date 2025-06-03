import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { RegistroDiario, EstadoAnimo } from '../../models/DiarioTypes';
import { getRegistros, initActividades } from '../../services/DiarioServices';
import { useFocusEffect } from '@react-navigation/native';
import styles from './DiarioStyle';
import { Ionicons } from '@expo/vector-icons';

const estadoConfig: Record<EstadoAnimo, { label: string; color: string; icon: string }> = {
  increible: { label: 'Feliz', color: '#1E40AF', icon: 'happy-outline' },
  bien: { label: 'Contento', color: '#2563EB', icon: 'happy-outline' },
  neutral: { label: 'Neutral', color: '#6B7280', icon: 'remove-circle-outline' },
  mal: { label: 'Triste', color: '#7C3AED', icon: 'sad-outline' },
  fatal: { label: 'Enojado', color: '#A21CAF', icon: 'close-circle-outline' },
};

function formatFecha(fechaStr: string): string {
  const fecha = new Date(fechaStr);
  const opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return fecha.toLocaleDateString('es-ES', opciones);
}

function obtenerMesActual(): string {
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
}

export default function DiarioScreen() {
  const [registros, setRegistros] = useState<RegistroDiario[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadData() {
      await initActividades();
      const data = await getRegistros();
      const ordenados = [...data].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      setRegistros(ordenados);
    }
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function loadData() {
        await initActividades();
        const data = await getRegistros();
        const ordenados = [...data].sort(
          (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        );
        setRegistros(ordenados);
      }
      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Text style={styles.monthText}>{obtenerMesActual()}</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const estado = estadoConfig[item.estado];
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name={estado.icon as any} size={24} color={estado.color} />
                <Text style={[styles.estadoText, { color: estado.color }]}>{estado.label}</Text>
              </View>
              <Text style={styles.fechaText}>{formatFecha(item.fecha)}</Text>
              <Text style={styles.notaText}>{item.nota}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NuevaEntrada' as never)}>
        <Ionicons name="add-circle" size={20} color="white" />
        <Text style={styles.fabText}>Nueva entrada</Text>
      </TouchableOpacity>
    </View>
  );
}
