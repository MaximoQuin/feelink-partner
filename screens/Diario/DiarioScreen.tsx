// screens/Diario/DiarioScreen.tsx
import { FontAwesome6 } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  Actividad,
  EstadoAnimo,
  RegistroDiario,
} from "../../models/DiarioTypes";
import {
  getActividades,
  getRegistros,
  initActividades,
  deleteRegistro,
} from "../../services/DiarioServices";
import styles from "./DiarioStyle";

const estadoConfig: Record<
  EstadoAnimo,
  { label: string; color: string; icon: string }
> = {
  increible: { label: "Feliz", color: "#1E40AF", icon: "face-laugh-beam" },
  bien: { label: "Contento", color: "#2563EB", icon: "face-smile" },
  neutral: { label: "Neutral", color: "#6B7280", icon: "face-meh" },
  mal: { label: "Triste", color: "#7C3AED", icon: "face-frown-open" },
  fatal: { label: "Enojado", color: "#A21CAF", icon: "face-angry" },
};

function formatFecha(fechaStr: string): { fecha: string; hora: string } {
  const fecha = new Date(fechaStr);
  const hoy = new Date();
  const ayer = new Date(hoy);
  ayer.setDate(ayer.getDate() - 1);

  const esHoy =
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear();

  const esAyer =
    fecha.getDate() === ayer.getDate() &&
    fecha.getMonth() === ayer.getMonth() &&
    fecha.getFullYear() === ayer.getFullYear();

  const opcionesHora: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return {
    fecha: esHoy
      ? "Hoy"
      : esAyer
      ? "Ayer"
      : fecha.toLocaleDateString("es-ES", { day: "numeric", month: "long" }),
    hora: fecha.toLocaleTimeString("es-ES", opcionesHora),
  };
}

function obtenerMesActual(): string {
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return fecha.toLocaleDateString("es-ES", opciones);
}

export default function DiarioScreen() {
  const [registros, setRegistros] = useState<RegistroDiario[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] =
    useState<RegistroDiario | null>(null);
  const navigation = useNavigation();

  const abrirModal = (registro: RegistroDiario) => {
    setRegistroSeleccionado(registro);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setRegistroSeleccionado(null);
  };

  const cargarDatos = async () => {
    await initActividades();
    const acts = await getActividades();
    const regs = await getRegistros();
    setActividades(acts);
    const ordenados = [...regs].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );
    setRegistros(ordenados);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
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
          const { fecha, hora } = formatFecha(item.fecha);
          return (
            <TouchableOpacity onPress={() => abrirModal(item)}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <FontAwesome6
                    name={estado.icon as any}
                    size={24}
                    color={estado.color}
                  />
                  <Text style={[styles.estadoText, { color: estado.color }]}> 
                    {estado.label}
                  </Text>
                </View>
                <View style={styles.fechaContainer}>
                  <Text style={styles.fechaText}>{fecha}</Text>
                  <Text style={styles.horaText}>{hora}</Text>
                </View>
                <Text
                  style={styles.notaText}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.nota}
                </Text>
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.label}>Actividades</Text>
                  {item.actividades.length > 0 ? (
                    item.actividades.map((id) => {
                      const act = actividades.find((a) => a.id === id);
                      return (
                        <Text key={id} style={styles.actividadItem}>
                          • {act ? act.nombre : "(eliminada)"}
                        </Text>
                      );
                    })
                  ) : (
                    <Text style={styles.actividadItem}>Ninguna actividad</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {registroSeleccionado && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {estadoConfig[registroSeleccionado.estado].label}
                  </Text>
                  <TouchableOpacity onPress={cerrarModal}>
                    <FontAwesome6 name="xmark" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalFechaContainer}>
                  <Text style={styles.modalFecha}>
                    {formatFecha(registroSeleccionado.fecha).fecha}
                  </Text>
                  <Text style={styles.modalHora}>
                    {formatFecha(registroSeleccionado.fecha).hora}
                  </Text>
                </View>

                <ScrollView style={styles.modalScroll}>
                  <Text style={styles.modalNota}>
                    {registroSeleccionado.nota}
                  </Text>
                </ScrollView>

                <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                  <TouchableOpacity
                    style={[styles.addButton, { flex: 1 }]}
                    onPress={() => {
                      cerrarModal();
                      navigation.navigate({
                        pathname: "diario/EditarEntrada",
                        params: { id: registroSeleccionado.id },
                      } as never);
                    }}
                  >
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.addButton, { flex: 1, backgroundColor: 'red' }]}
                    onPress={() => {
                      Alert.alert(
                        "Eliminar",
                        "¿Deseas eliminar esta entrada?",
                        [
                          { text: "Cancelar", style: "cancel" },
                          {
                            text: "Eliminar",
                            style: "destructive",
                            onPress: async () => {
                              await deleteRegistro(registroSeleccionado.id);
                              cerrarModal();
                              cargarDatos();
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("NuevaEntrada" as never)}
      >
        <FontAwesome6 name="square-plus" size={20} color="white" />
        <Text style={styles.fabText}>Nueva entrada</Text>
      </TouchableOpacity>
    </View>
  );
}
