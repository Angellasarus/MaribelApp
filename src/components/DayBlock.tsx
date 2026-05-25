import React from "react";
import { Day, ExerciseRow, AccessoryRow } from "../types";
import ExerciseTable from "./ExerciseTable";
import AccessoryTable from "./AccessoryTable";
import { ChevronDown, ChevronUp, Calendar, Hash } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DayBlockProps {
  day: Day;
  groupNumber: number;
  onToggleCollapse: () => void;
  onUpdateExerciseRow: (rowId: string, updatedFields: Partial<ExerciseRow>) => void;
  onAddExerciseRow: () => void;
  onDeleteExerciseRow: (rowId: string) => void;
  onUpdateAccessoryRow: (rowId: string, updatedFields: Partial<AccessoryRow>) => void;
  onAddAccessoryRow: () => void;
  onDeleteAccessoryRow: (rowId: string) => void;
}

export default function DayBlock({
  day,
  groupNumber,
  onToggleCollapse,
  onUpdateExerciseRow,
  onAddExerciseRow,
  onDeleteExerciseRow,
  onUpdateAccessoryRow,
  onAddAccessoryRow,
  onDeleteAccessoryRow,
}: DayBlockProps) {
  const mainCount = day.mainExercises.length;
  const accCount = day.accessories.length;

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-50/40 shadow-sm mb-4">
      {/* Day Header Trigger */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-200/80 hover:bg-slate-200 text-left transition-all relative overflow-hidden group cursor-pointer border-b border-slate-300"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-slate-600 group-hover:bg-slate-700 text-white rounded transition-colors duration-200">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-800 text-[15px] uppercase tracking-wide">
              {day.name} {groupNumber}
            </h3>
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block sm:inline sm:ml-2">
              GRUPO {groupNumber} • SEMANA DE ENTRENAMIENTO
            </span>
          </div>
        </div>

        {/* Counters & Collapse indicator */}
        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-600 font-mono">
            <Hash className="w-3.5 h-3.5 text-slate-450" />
            <span>
              {mainCount} {mainCount === 1 ? "Ejercito" : "Ejercicios"}
            </span>
            <span className="text-slate-300">|</span>
            <span>
              {accCount} {accCount === 1 ? "Accesorio" : "Accesorios"}
            </span>
          </div>
          <div className="text-slate-500 group-hover:text-slate-800 transition-colors">
            {day.isCollapsed ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronUp className="w-5 h-5" />
            )}
          </div>
        </div>
      </button>

      {/* Accordion Content with AnimatePresence */}
      <AnimatePresence initial={false}>
        {!day.isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden bg-white"
          >
            <div className="p-4 sm:p-5">
              {/* Exercise Table */}
              <ExerciseTable
                exercises={day.mainExercises}
                onUpdateRow={onUpdateExerciseRow}
                onAddRow={onAddExerciseRow}
                onDeleteRow={onDeleteExerciseRow}
              />

              {/* Accessory Table */}
              <AccessoryTable
                accessories={day.accessories}
                onUpdateRow={onUpdateAccessoryRow}
                onAddRow={onAddAccessoryRow}
                onDeleteRow={onDeleteAccessoryRow}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
