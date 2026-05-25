export interface AthleteHeader {
  athleteName: string;
  bw: string; // Peso
  squat: string;
  bench: string;
  deadlift: string;
  total: number;
}

export interface ExerciseRow {
  id: string;
  name: string;
  set: string;
  reps: string;
  rpe: string;
  cargaSugeridaMin: string; // Blue text
  cargaSugeridaMax: string; // Red text
  carga: string;            // Single string
  backOffMin: string;       // Blue text
  backOffMax: string;       // Red text
  cargaSugeridaMin2: string; // Blue text
  cargaSugeridaMax2: string; // Red text
  carga2Min: string;        // Blue text
  carga2Max: string;        // Red text
  notesMin: string;         // Blue text (@)
  notesMax: string;         // Red text (@)
}

export interface AccessoryRow {
  id: string;
  name: string;
  set: string;
  repsMin: string; // Blue
  repsMax: string; // Red
  rpe: string;
  s1_carga: string;
  s1_reps: string;
  s2_carga: string;
  s2_reps: string;
  s3_carga: string;
  s3_reps: string;
  s4_carga: string;
  s4_reps: string;
  rirMin: string; // Blue
  rirMax: string; // Red
}

export type DayName = "Lunes" | "Martes" | "Miércoles" | "Viernes" | "Sábado";

export interface Day {
  id: string; // e.g. "g1-lunes"
  name: DayName;
  isCollapsed: boolean;
  mainExercises: ExerciseRow[];
  accessories: AccessoryRow[];
}

export interface TrainingGroup {
  id: string; // e.g. "group-1"
  number: number;
  isCollapsed: boolean;
  days: Day[];
}

