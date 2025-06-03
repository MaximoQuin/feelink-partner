import { Actividad, RegistroDiario } from "../models/DiarioTypes";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Claves para AsyncStorage
const REGISTROS_KEY = "@diario/registros";
const ACTIVIDADES_KEY = "@diario/actividades";

const actividadesPredefinidas: Actividad[] = [
  { id: "deporte", nombre: "Deporte", personalizada: false },
  { id: "musica", nombre: "Instrumento musical", personalizada: false },
  { id: "leer", nombre: "Leer", personalizada: false },
];

// Inicializar actividades predefinidas si no existen
export async function initActividades() {
  const data = await AsyncStorage.getItem(ACTIVIDADES_KEY);
  if (!data) {
    await AsyncStorage.setItem(
      ACTIVIDADES_KEY,
      JSON.stringify(actividadesPredefinidas)
    );
  }
}

// Actividades CRUD
export async function getActividades(): Promise<Actividad[]> {
  const data = await AsyncStorage.getItem(ACTIVIDADES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveActividad(nombre: string): Promise<void> {
  const actividades = await getActividades();
  const nueva: Actividad = {
    id: uuidv4(),
    nombre,
    personalizada: true,
  };
  actividades.push(nueva);
  await AsyncStorage.setItem(ACTIVIDADES_KEY, JSON.stringify(actividades));
}

export async function editActividad(
  id: string,
  nuevoNombre: string
): Promise<void> {
  const actividades = await getActividades();
  const actualizadas = actividades.map((a) =>
    a.id === id ? { ...a, nombre: nuevoNombre } : a
  );
  await AsyncStorage.setItem(ACTIVIDADES_KEY, JSON.stringify(actualizadas));
}

export async function deleteActividad(id: string): Promise<void> {
  const actividades = await getActividades();
  const filtradas = actividades.filter((a) => a.id !== id);
  await AsyncStorage.setItem(ACTIVIDADES_KEY, JSON.stringify(filtradas));
}

// Registros CRUD
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


export async function deleteRegistro(id: string): Promise<void> {
  const registros = await getRegistros();
  const actualizados = registros.filter((r) => r.id !== id);
  await AsyncStorage.setItem(REGISTROS_KEY, JSON.stringify(actualizados));
}

