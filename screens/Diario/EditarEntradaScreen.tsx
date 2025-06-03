import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "./NuevaEntradaStyles";
import {
  EstadoAnimo,
  RegistroDiario,
  Actividad,
} from "../../models/DiarioTypes";
import {
  getActividades,
  getRegistros,
  updateRegistro,
} from "../../services/DiarioServices";

const emociones: { estado: EstadoAnimo; icon: string }[] = [
  { estado: "increible", icon: "face-laugh-beam" },
  { estado: "bien", icon: "face-smile" },
  { estado: "neutral", icon: "face-meh" },
  { estado: "mal", icon: "face-frown-open" },
  { estado: "fatal", icon: "face-angry" },
];

export default function EditarEntradaScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [estado, setEstado] = useState<EstadoAnimo | null>(null);
  const [nota, setNota] = useState("");
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const [registro, setRegistro] = useState<RegistroDiario | null>(null);



  useEffect(() => {
    const cargarDatos = async () => {
      const acts = await getActividades();
      setActividades(acts);
      const registros = await getRegistros();
      const registro = registros.find((r) => r.id === id);
      if (!registro) {
        Alert.alert("Error", "No se encontró la entrada");
        navigation.goBack();
        return;
      }
      setEstado(registro.estado);
      setNota(registro.nota);
      setSeleccionadas(registro.actividades);
      setRegistro(registro);
    };
    if (id) cargarDatos();
  }, [id, navigation]);
  

  const toggleActividad = (id: string) => {
    handleSelection(
      seleccionadas.includes(id)
        ? seleccionadas.filter((a) => a !== id)
        : [...seleccionadas, id]
    );
  };

  const handleSelection = (item: string | string[]) => {
    setSeleccionadas(Array.isArray(item) ? item : [item]);
  };

  const guardarCambios = async () => {
    if (!estado) {
      Alert.alert("Falta emoción", "Selecciona cómo te sientes hoy.");
      return;
    }
    await updateRegistro({
      id: id as string,
      estado,
      nota,
      actividades: seleccionadas,
      fecha: registro!.fecha,
    });  
    Alert.alert("Actualizado", "Tu entrada fue modificada.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Editar entrada</Text>
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

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarCambios}>
        <FontAwesome6 name="circle-check" size={40} color="#4338CA" />
        <Text style={styles.botonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
