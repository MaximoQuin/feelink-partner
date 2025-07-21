import { Picker } from "@react-native-picker/picker"; // npm install @react-native-picker/picker
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  visible: boolean;
  onClose: () => void;
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  editing?: boolean;

  diaSemana?: string;
  onChangeDiaSemana?: (dia: string) => void;
  hora?: Date | null;
  onChangeHora?: (date: Date) => void;
};

const diasSemana = [
  { label: "Lunes", value: "lunes" },
  { label: "Martes", value: "martes" },
  { label: "Miércoles", value: "miercoles" },
  { label: "Jueves", value: "jueves" },
  { label: "Viernes", value: "viernes" },
  { label: "Sábado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
];

const HabitModal = ({
  visible,
  onClose,
  value,
  onChange,
  onSave,
  editing = false,
  diaSemana,
  onChangeDiaSemana,
  hora,
  onChangeHora,
}: Props) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onConfirmTime = (date: Date) => {
    setShowTimePicker(false);
    onChangeHora && onChangeHora(date);
  };

  const formatTime = (date: Date | null | undefined) => {
    if (!date) return "Seleccionar hora";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.4}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.modalContenido}>
        <Text style={styles.modalTitulo}>
          {editing ? "Editar Hábito" : "Nuevo Hábito"}
        </Text>

        <TextInput
          placeholder="Nombre del hábito"
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />

        {/* Selector Día de la semana */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={diaSemana}
            onValueChange={(itemValue: any) =>
              onChangeDiaSemana && onChangeDiaSemana(itemValue)
            }
            mode="dropdown"
            style={styles.picker}
          >
            {diasSemana.map((dia) => (
              <Picker.Item
                key={dia.value}
                label={dia.label}
                value={dia.value}
              />
            ))}
          </Picker>
        </View>

        {/* Selector Hora */}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.selectorTexto}>{formatTime(hora)}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={onConfirmTime}
          onCancel={() => setShowTimePicker(false)}
          is24Hour={true}
        />

        <View style={styles.modalAcciones}>
          <TouchableOpacity style={styles.botonModal} onPress={onSave}>
            <Text style={styles.textoBotonModal}>
              {editing ? "Guardar" : "Agregar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botonModal, { backgroundColor: "#ccc" }]}
            onPress={onClose}
          >
            <Text style={styles.textoBotonModal}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HabitModal;

const styles = StyleSheet.create({
  modalContenido: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "85%",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    marginBottom: 15,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selector: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    justifyContent: "center",
  },
  selectorTexto: {
    fontSize: 16,
    color: "#333",
  },
  modalAcciones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botonModal: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  textoBotonModal: {
    color: "#fff",
    fontWeight: "bold",
  },
});
