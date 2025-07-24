import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialIcons";
import HabitModal from "./components/HabitModal";

const HabitsScreen = () => {
  const [habitos, setHabitos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [diasSemana, setDiasSemana] = useState<string[]>([]);
  const [hora, setHora] = useState<Date | null>(null);
  const [editando, setEditando] = useState<{
    id: string;
    nombre: string;
    diasSemana?: string[];
    hora?: any;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "habitos"), (snapshot) => {
      const datos: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabitos(datos);
    });

    return () => unsubscribe();
  }, []);

  const agregarHabito = async () => {
    if (nuevoNombre.trim() === "") return;
    if (diasSemana.length === 0) {
      Alert.alert("Selecciona al menos un día de la semana");
      return;
    }

    await addDoc(collection(db, "habitos"), {
      nombre: nuevoNombre.trim(),
      diasSemana,
      hora: hora ? hora.toISOString() : null,
    });

    cerrarModal();
  };

  const guardarEdicion = async () => {
    if (editando && nuevoNombre.trim() !== "") {
      if (diasSemana.length === 0) {
        Alert.alert("Selecciona al menos un día de la semana");
        return;
      }
      const ref = doc(db, "habitos", editando.id);
      await updateDoc(ref, {
        nombre: nuevoNombre.trim(),
        diasSemana,
        hora: hora ? hora.toISOString() : null,
      });
      cerrarModal();
    }
  };

  const confirmarEliminarHabito = (id: string) => {
    if (typeof window !== "undefined" && window.confirm) {
      const confirmado = window.confirm("¿Deseas eliminar este hábito?");
      if (confirmado) {
        eliminarHabito(id);
      }
    } else {
      Alert.alert("Eliminar", "¿Deseas eliminar este hábito?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarHabito(id),
        },
      ]);
    }
  };

  const eliminarHabito = async (id: string) => {
    try {
      const ref = doc(db, "habitos", id);
      await deleteDoc(ref);
      Alert.alert("Éxito", "Hábito eliminado");
    } catch (error) {
      console.error("Error al eliminar hábito:", error);
      Alert.alert("Error", "No se pudo eliminar el hábito");
    }
  };

  const abrirModal = (habit?: {
    id: string;
    nombre: string;
    diasSemana?: string[];
    hora?: string;
  }) => {
    if (habit) {
      setEditando(habit);
      setNuevoNombre(habit.nombre);
      setDiasSemana(habit.diasSemana || []);
      setHora(habit.hora ? new Date(habit.hora) : null);
    } else {
      setEditando(null);
      setNuevoNombre("");
      setDiasSemana([]);
      setHora(null);
    }
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setNuevoNombre("");
    setEditando(null);
    setDiasSemana([]);
    setHora(null);
  };

  const formatDiasSemana = (dias?: string[]) => {
    if (!dias || dias.length === 0) return "";
    return dias.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ");
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hábitos</Text>

      <FlatList
        data={habitos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.nombre}>{item.nombre}</Text>
              {(item.diasSemana?.length || item.hora) && (
                <Text style={{ fontSize: 12, color: "#666" }}>
                  {item.diasSemana
                    ? `Días: ${formatDiasSemana(item.diasSemana)} `
                    : ""}
                  {item.hora ? `Hora: ${formatTime(item.hora)}` : ""}
                </Text>
              )}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => abrirModal(item)}>
                <Icon name="edit" size={22} color="#1e90ff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmarEliminarHabito(item.id)}
              >
                <Icon name="delete" size={22} color="#ff3333" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => abrirModal()}
      >
        <Feather name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      <HabitModal
        visible={modalVisible}
        onClose={cerrarModal}
        value={nuevoNombre}
        onChange={setNuevoNombre}
        onSave={editando ? guardarEdicion : agregarHabito}
        editing={!!editando}
        diasSemana={diasSemana}
        onChangeDiasSemana={setDiasSemana}
        hora={hora}
        onChangeHora={setHora}
      />
    </View>
  );
};

export default HabitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#0F529AFF",
  },
  item: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nombre: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  botonAgregar: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#1e90ff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
