import React from "react";
import { TrainingGroup, Day, ExerciseRow, AccessoryRow } from "../types";
import DayBlock from "./DayBlock";
import { ChevronDown, ChevronUp, Folder, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GroupCardProps {
  group: TrainingGroup;
  onToggleCollapse: () => void;
  onToggleDayCollapse: (dayId: string) => void;
  onUpdateExerciseRow: (dayId: string, rowId: string, updatedFields: Partial<ExerciseRow>) => void;
  onAddExerciseRow: (dayId: string) => void;
  onDeleteExerciseRow: (dayId: string, rowId: string) => void;
  onUpdateAccessoryRow: (dayId: string, rowId: string, updatedFields: Partial<AccessoryRow>) => void;
  onAddAccessoryRow: (dayId: string) => void;
  onDeleteAccessoryRow: (dayId: string, rowId: string) => void;
}

export default function GroupCard({
  group,
  onToggleCollapse,
  onToggleDayCollapse,
  onUpdateExerciseRow,
  onAddExerciseRow,
  onDeleteExerciseRow,
  onUpdateAccessoryRow,
  onAddAccessoryRow,
  onDeleteAccessoryRow,
}: GroupCardProps) {
  return (
    <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-md mb-6 hover:shadow-lg transition-all duration-300">
      {/* Group Accordion Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-5 bg-slate-800 text-slate-100 hover:bg-slate-900 transition-colors uppercase cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700 text-amber-500 rounded-lg">
            <Folder className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h2 className="font-display font-extrabold text-base md:text-lg tracking-wide text-white">
              GRUPO {group.number}
            </h2>
            <p className="text-[10px] text-slate-400 font-mono font-medium tracking-widest leading-none mt-1">
              Semana de entrenamiento • {group.days.length} DÍAS ACTUADOS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-[11px] font-mono tracking-widest text-slate-400 border border-slate-700 rounded px-2.5 py-0.5">
            LUN • MAR • MIÉ • VIE • SÁB
          </span>
          <div className="text-slate-400 hover:text-slate-100 transition-colors">
            {group.isCollapsed ? (
              <ChevronDown className="w-6 h-6" />
            ) : (
              <ChevronUp className="w-6 h-6" />
            )}
          </div>
        </div>
      </button>

      {/* Accordion List of Days inside Group */}
      <AnimatePresence initial={false}>
        {!group.isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-slate-100/50"
          >
            <div className="p-4 sm:p-6 divide-y divide-slate-100">
              {group.days.map((day) => (
                <DayBlock
                  key={day.id}
                  day={day}
                  groupNumber={group.number}
                  onToggleCollapse={() => onToggleDayCollapse(day.id)}
                  onUpdateExerciseRow={(rowId, fields) => onUpdateExerciseRow(day.id, rowId, fields)}
                  onAddExerciseRow={() => onAddExerciseRow(day.id)}
                  onDeleteExerciseRow={(rowId) => onDeleteExerciseRow(day.id, rowId)}
                  onUpdateAccessoryRow={(rowId, fields) => onUpdateAccessoryRow(day.id, rowId, fields)}
                  onAddAccessoryRow={() => onAddAccessoryRow(day.id)}
                  onDeleteAccessoryRow={(rowId) => onDeleteAccessoryRow(day.id, rowId)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
