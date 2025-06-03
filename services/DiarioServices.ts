import { EstadoAnimo, Actividad, RegistroDiario } from "../models/DiarioTypes";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';


const REGISTROS_KEY = "@diario/registros";
const ACTIVIDADES_KEY = "@diario/actividades";

const actividadesPredefinidas: Actividad[] = [
  { id: "deporte", nombre: "Deporte", personalizada: false },
  { id: "musica", nombre: "Instrumento musical", personalizada: false },
  { id: "leer", nombre: "Leer", personalizada: false },
];

export async function initActividades() {
  const data = await AsyncStorage.getItem(ACTIVIDADES_KEY);
  if (!data) {
    await AsyncStorage.setItem(
      ACTIVIDADES_KEY,
      JSON.stringify(actividadesPredefinidas)
    );
  }
}

export async function getActividades(): Promise<Actividad[]> {
  const data = await AsyncStorage.getItem(ACTIVIDADES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getRegistros(): Promise<RegistroDiario[]> {
  const data = await AsyncStorage.getItem(REGISTROS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addRegistro(
  registro: Omit<RegistroDiario, "id" | "fecha">
): Promise<void> {
  const registros = await getRegistros();
  const nuevo: RegistroDiario = {
    ...registro,
    id: uuidv4(),
    fecha: new Date().toISOString(),
  };
  registros.push(nuevo);
  await AsyncStorage.setItem(REGISTROS_KEY, JSON.stringify(registros));
}
