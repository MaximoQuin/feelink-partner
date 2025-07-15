import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import styles from "./GestorActividadesStyle";
import { FontAwesome6 } from "@expo/vector-icons";
import { Actividad } from "../../models/DiarioTypes";
import {
  getActividades,
  saveActividad,
  deleteActividad,
  editActividad
} from "../../services/DiarioServices";

export default function GestorActividadesScreen() {
    const [actividades, setActividades] = useState<Actividad[]>([]);
    const [nuevaActividad, setNuevaActividad] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [editNombre, setEditNombre] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

  const cargarActividades = async () => {
    const data = await getActividades();
    setActividades(data);
  };

  useEffect(() => {
    cargarActividades();
  }, []);

  const handleAgregar = async () => {
    const nombre = nuevaActividad.trim();
    if (!nombre) return;

    const existe = actividades.some(
      (a) => a.nombre.toLowerCase() === nombre.toLowerCase()
    );
    if (existe) {
      Alert.alert("Nombre duplicado", "Ya existe un hábito con ese nombre.");
      return;
    }

    await saveActividad(nombre);
    setNuevaActividad("");
    cargarActividades();
  };

  const handleEliminar = async (id: string) => {
    Alert.alert("Eliminar actividad", "¿Seguro que quieres eliminarla?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deleteActividad(id);
          cargarActividades();
        },
      },
    ]);
  };

  const abrirModalEditar = (actividad: Actividad) => {
    setEditNombre(actividad.nombre);
    setEditId(actividad.id);
    setModalVisible(true);
  };

  const guardarEdicion = async () => {
    const nuevo = editNombre.trim();
    if (!nuevo || !editId) return;
    const existe = actividades.some(
      (a) => a.nombre.toLowerCase() === nuevo.toLowerCase() && a.id !== editId
    );
    if (existe) {
      Alert.alert("Nombre duplicado", "Ya existe otro hábito con ese nombre.");
      return;
    }
    await editActividad(editId, nuevo);
    setModalVisible(false);
    setEditNombre("");
    setEditId(null);
    cargarActividades();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hábitos</Text>
        </View>

        <FlatList
          data={actividades}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.nombre}</Text>
              {item.personalizada && (
                <View style={styles.cardActions}>
                  <TouchableOpacity onPress={() => abrirModalEditar(item)}>
                    <FontAwesome6 name="pencil" size={18} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleEliminar(item.id)}>
                    <FontAwesome6 name="x" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={nuevaActividad}
            onChangeText={setNuevaActividad}
            style={styles.inputActividad}
            placeholder="Nuevo hábito..."
          />
          <TouchableOpacity onPress={handleAgregar} style={styles.addButton}>
            <FontAwesome6 name="plus" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.headerModalText}>Editar actividad</Text>
              <TextInput
                style={styles.inputModal}
                value={editNombre}
                onChangeText={setEditNombre}
                placeholder="Nuevo nombre"
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={guardarEdicion}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Guardar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  { backgroundColor: "#6B7280", marginTop: 10 },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
