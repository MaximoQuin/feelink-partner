import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "./NuevaEntradaStyles";
import {
  EstadoAnimo,
  Actividad,
} from "../../models/DiarioTypes";
import { getActividades, addRegistro } from "../../services/DiarioServices";

const emociones: { estado: EstadoAnimo; icon: string }[] = [
  { estado: "increible", icon: "face-laugh-beam" },
  { estado: "bien", icon: "face-smile" },
  { estado: "neutral", icon: "face-meh" },
  { estado: "mal", icon: "face-frown-open" },
  { estado: "fatal", icon: "face-angry" },
];

export default function NuevaEntradaScreen() {
  const [estado, setEstado] = useState<EstadoAnimo | null>(null);
  const [nota, setNota] = useState("");
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getActividades().then(setActividades);
  }, []);

  const toggleActividad = (id: string) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const guardarEntrada = async () => {
    if (!estado) {
      Alert.alert("Falta emoción", "Selecciona cómo te sientes hoy.");
      return;
    }

    try {
      await addRegistro({ estado, nota, actividades: seleccionadas });
      Alert.alert("Guardado", "Tu entrada fue registrada correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert(
        "Error",
        "No se pudo guardar la entrada. Inténtalo de nuevo."
      );
    }
  };

  return (
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nueva entrada</Text>
      </View>

      <Text style={styles.label}>¿Cómo te sientes hoy?</Text>
      <View style={styles.emojiRow}>
        {emociones.map(({ estado: e, icon }) => (
          <TouchableOpacity
            key={e}
            onPress={() => setEstado(e)}
            style={[styles.emojiButton, estado === e && styles.emojiSelected]}
          >
            <FontAwesome6 name={icon as any} size={32} color="#1E40AF" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>¿Qué actividades realizaste?</Text>
      <View style={styles.containerBox}>
        <View style={styles.actividadesBox}>
          {actividades.map((act) => (
            <TouchableOpacity
              key={act.id}
              style={[
                styles.actividadChip,
                seleccionadas.includes(act.id) && styles.actividadChipSelected,
              ]}
              onPress={() => toggleActividad(act.id)}
            >
              <Text style={styles.actividadText}>{act.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("GestorActividades" as never)}>
        <Text style={styles.link}>+ Gestor de actividades...</Text>
      </TouchableOpacity>

      <Text style={styles.label}>¿Por qué te sientes así?</Text>
      <View style={styles.containerBox}>
        <TextInput
          style={styles.textarea}
          multiline
          value={nota}
          onChangeText={setNota}
          placeholder="Escribe aquí..."
          maxLength={500}
        />
      </View>

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarEntrada}>
        <FontAwesome6 name="circle-check" size={40} color="#4338CA" />
        <Text style={styles.botonText}>Guardar entrada</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
