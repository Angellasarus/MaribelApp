import React from "react";
import { ExerciseRow } from "../types";
import { Trash2, Plus, Dumbbell } from "lucide-react";

interface ExerciseTableProps {
  exercises: ExerciseRow[];
  onUpdateRow: (rowId: string, updatedFields: Partial<ExerciseRow>) => void;
  onAddRow: () => void;
  onDeleteRow: (rowId: string) => void;
}

export default function ExerciseTable({
  exercises,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
}: ExerciseTableProps) {
  return (
    <div className="mb-6 bg-white border border-slate-500 rounded-lg overflow-hidden shadow-sm">
      {/* Grey header styling similar to manual form */}
      <div className="bg-slate-700 text-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-500">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-slate-300" />
          <span className="font-display font-bold text-xs uppercase tracking-wider">
            EJERCICIOS DE FUERZA PRINCIPAL
          </span>
        </div>
        <button
          onClick={onAddRow}
          className="flex items-center gap-1 text-[11px] font-mono font-bold bg-slate-850 hover:bg-slate-900 border border-slate-500 rounded px-3 py-1 text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <Plus className="w-3" /> AGREGAR FILA
        </button>
      </div>

      <div className="overflow-x-auto lg:overflow-visible custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed min-w-[1100px] lg:min-w-full">
          <thead>
            {/* Matches headers from reference image with exact percentage distributions */}
            <tr className="bg-slate-200 text-slate-900 border-b border-slate-500 font-sans text-[11px] font-extrabold uppercase select-none">
              <th className="p-2 w-[22%] text-slate-950 font-black border-r border-slate-550">EJERCICIO</th>
              <th className="p-2 w-[5%] text-center border-r border-slate-500">SET</th>
              <th className="p-2 w-[5%] text-center border-r border-slate-500">REPS</th>
              <th className="p-2 w-[6%] text-center border-r border-slate-500">RPE</th>
              <th className="p-2 w-[11%] text-center border-r border-slate-500">CARGA SUGERIDA</th>
              <th className="p-2 w-[10%] text-center border-r border-slate-500 font-black">CARGA</th>
              <th className="p-2 w-[10%] text-center border-r border-slate-500">BACK OFF</th>
              <th className="p-2 w-[11%] text-center border-r border-slate-500">CARGA SUGERIDA</th>
              <th className="p-2 w-[10%] text-center border-r border-slate-500 font-black">CARGA</th>
              <th className="p-2 w-[6%] text-center border-r border-slate-500 font-black">@</th>
              <th className="p-2 w-[4%] text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-400 text-slate-705">
            {exercises.length === 0 ? (
              <tr>
                <td colSpan={11} className="p-8 text-center text-xs text-slate-500 font-mono bg-slate-50">
                  Sin ejercicios registrados. Presiona "AGREGAR FILA" para comenzar a digitalizar.
                </td>
              </tr>
            ) : (
              exercises.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Exercise Name */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none placeholder:text-slate-400"
                      value={row.name}
                      onChange={(e) => onUpdateRow(row.id, { name: e.target.value })}
                      placeholder="Ej. LOW BAR SQUAT..."
                    />
                  </td>

                  {/* SET */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none"
                      value={row.set}
                      onChange={(e) => onUpdateRow(row.id, { set: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* REPS */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none"
                      value={row.reps}
                      onChange={(e) => onUpdateRow(row.id, { reps: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* RPE */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none"
                      value={row.rpe}
                      onChange={(e) => onUpdateRow(row.id, { rpe: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* CARGA SUGERIDA (Blue Left / Red Right) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1.5 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none placeholder:text-slate-300"
                        value={row.cargaSugeridaMin}
                        onChange={(e) => onUpdateRow(row.id, { cargaSugeridaMin: e.target.value })}
                        placeholder="-"
                      />
                      <span className="text-slate-400 font-bold select-none text-[11px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none placeholder:text-slate-300"
                        value={row.cargaSugeridaMax}
                        onChange={(e) => onUpdateRow(row.id, { cargaSugeridaMax: e.target.value })}
                        placeholder="-"
                      />
                    </div>
                  </td>

                  {/* CARGA (Single number input, as requested for first CARGA) */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none placeholder:text-slate-300"
                      value={row.carga}
                      onChange={(e) => onUpdateRow(row.id, { carga: e.target.value })}
                      placeholder="-"
                    />
                  </td>

                  {/* BACK OFF (Blue Left / Red Right) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1.5 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none placeholder:text-slate-300"
                        value={row.backOffMin}
                        onChange={(e) => onUpdateRow(row.id, { backOffMin: e.target.value })}
                        placeholder="-"
                      />
                      <span className="text-slate-400 font-bold select-none text-[11px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none placeholder:text-slate-300"
                        value={row.backOffMax}
                        onChange={(e) => onUpdateRow(row.id, { backOffMax: e.target.value })}
                        placeholder="-"
                      />
                    </div>
                  </td>

                  {/* CARGA SUGERIDA 2 (Blue Left / Red Right) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1.5 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none placeholder:text-slate-300"
                        value={row.cargaSugeridaMin2}
                        onChange={(e) => onUpdateRow(row.id, { cargaSugeridaMin2: e.target.value })}
                        placeholder="-"
                      />
                      <span className="text-slate-400 font-bold select-none text-[11px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none placeholder:text-slate-300"
                        value={row.cargaSugeridaMax2}
                        onChange={(e) => onUpdateRow(row.id, { cargaSugeridaMax2: e.target.value })}
                        placeholder="-"
                      />
                    </div>
                  </td>

                  {/* CARGA 2 (Blue Left / Red Right) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1.5 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none placeholder:text-slate-300"
                        value={row.carga2Min}
                        onChange={(e) => onUpdateRow(row.id, { carga2Min: e.target.value })}
                        placeholder="-"
                      />
                      <span className="text-slate-400 font-bold select-none text-[11px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none placeholder:text-slate-300"
                        value={row.carga2Max}
                        onChange={(e) => onUpdateRow(row.id, { carga2Max: e.target.value })}
                        placeholder="-"
                      />
                    </div>
                  </td>

                  {/* @ (Blue Left / Red Right) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1.5 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none placeholder:text-slate-300"
                        value={row.notesMin}
                        onChange={(e) => onUpdateRow(row.id, { notesMin: e.target.value })}
                        placeholder="-"
                      />
                      <span className="text-slate-400 font-bold select-none text-[11px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none placeholder:text-slate-300"
                        value={row.notesMax}
                        onChange={(e) => onUpdateRow(row.id, { notesMax: e.target.value })}
                        placeholder="-"
                      />
                    </div>
                  </td>

                  {/* Actions Column (Eliminar row) */}
                  <td className="p-1 text-center">
                    <button
                      onClick={() => onDeleteRow(row.id)}
                      className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-red-200"
                      title="Eliminar fila"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
