import { TrainingGroup, Day, ExerciseRow, AccessoryRow, DayName, AthleteHeader } from "./types";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getDefaultHeader(): AthleteHeader {
  return {
    athleteName: "",
    bw: "",
    squat: "",
    bench: "",
    deadlift: "",
    total: 0,
  };
}

export function createDefaultGroup(groupNum: number): TrainingGroup {
  const days: Day[] = [
    {
      id: `${groupNum}-lunes`,
      name: "Lunes",
      isCollapsed: false,
      mainExercises: [],
      accessories: [],
    },
    {
      id: `${groupNum}-martes`,
      name: "Martes",
      isCollapsed: true,
      mainExercises: [],
      accessories: [],
    },
    {
      id: `${groupNum}-miercoles`,
      name: "Miércoles",
      isCollapsed: true,
      mainExercises: [],
      accessories: [],
    },
    {
      id: `${groupNum}-viernes`,
      name: "Viernes",
      isCollapsed: true,
      mainExercises: [],
      accessories: [],
    },
    {
      id: `${groupNum}-sabado`,
      name: "Sábado",
      isCollapsed: true,
      mainExercises: [],
      accessories: [],
    },
  ];

  return {
    id: `group-${groupNum}`,
    number: groupNum,
    isCollapsed: groupNum > 1, // Collapse subsequent groups to keep layout clean
    days,
  };
}

export function getDefaultGroups(): TrainingGroup[] {
  const groups: TrainingGroup[] = [];
  for (let i = 1; i <= 6; i++) {
    groups.push(createDefaultGroup(i));
  }
  return groups;
}

export function createBlankMainExercise(): ExerciseRow {
  return {
    id: generateId(),
    name: "",
    set: "",
    reps: "",
    rpe: "",
    cargaSugeridaMin: "",
    cargaSugeridaMax: "",
    carga: "",
    backOffMin: "",
    backOffMax: "",
    cargaSugeridaMin2: "",
    cargaSugeridaMax2: "",
    carga2Min: "",
    carga2Max: "",
    notesMin: "",
    notesMax: "",
  };
}

export function createBlankAccessory(): AccessoryRow {
  return {
    id: generateId(),
    name: "",
    set: "3",
    repsMin: "10",
    repsMax: "15",
    rpe: "@10",
    s1_carga: "",
    s1_reps: "",
    s2_carga: "",
    s2_reps: "",
    s3_carga: "",
    s3_reps: "",
    s4_carga: "",
    s4_reps: "",
    rirMin: "0",
    rirMax: "1",
  };
}
