export type EstadoAnimo = "increible" | "bien" | "neutral" | "mal" | "fatal";

export interface Actividad {
  id: string;
  nombre: string;
  personalizada: boolean;
}

export interface RegistroDiario {
  id: string;
  fecha: string;
  estado: EstadoAnimo;
  nota: string;
  actividades: string[];
}

