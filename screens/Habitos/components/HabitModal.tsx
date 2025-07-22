import React, { useState } from "react";
import {
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

  diasSemana?: string[]; // Array de días seleccionados
  onChangeDiasSemana?: (dias: string[]) => void;

  hora?: Date | null;
  onChangeHora?: (date: Date) => void;
};

const diasDisponibles = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

const HabitModal = ({
  visible,
  onClose,
  value,
  onChange,
  onSave,
  editing = false,
  diasSemana = [],
  onChangeDiasSemana,
  hora,
  onChangeHora,
}: Props) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Alterna selección de un día
  const toggleDia = (dia: string) => {
    if (!onChangeDiasSemana) return;
    if (diasSemana.includes(dia)) {
      onChangeDiasSemana(diasSemana.filter((d) => d !== dia));
    } else {
      onChangeDiasSemana([...diasSemana, dia]);
    }
  };

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

        <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
          Selecciona días de la semana:
        </Text>

        <View style={styles.diasContainer}>
          {diasDisponibles.map((dia) => {
            const seleccionado = diasSemana.includes(dia);
            return (
              <TouchableOpacity
                key={dia}
                style={[
                  styles.diaBoton,
                  seleccionado && styles.diaSeleccionado,
                ]}
                onPress={() => toggleDia(dia)}
              >
                <Text
                  style={[
                    styles.diaTexto,
                    seleccionado && styles.diaTextoSeleccionado,
                  ]}
                >
                  {dia.charAt(0).toUpperCase() + dia.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selector Hora */}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.selectorTexto}>{formatTime(hora)}</Text>
        </TouchableOpacity>

        {/* Picker Hora */}
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
  diasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  diaBoton: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    width: "45%",
    alignItems: "center",
  },
  diaSeleccionado: {
    backgroundColor: "#1e90ff",
    borderColor: "#1e90ff",
  },
  diaTexto: {
    color: "#333",
    fontSize: 12,
    flexShrink: 1,
  },
  diaTextoSeleccionado: {
    color: "#fff",
    fontWeight: "bold",
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
