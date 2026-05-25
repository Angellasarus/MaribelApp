import React from "react";
import { AccessoryRow } from "../types";
import { Trash2, Plus, HelpCircle } from "lucide-react";

interface AccessoryTableProps {
  accessories: AccessoryRow[];
  onUpdateRow: (rowId: string, updatedFields: Partial<AccessoryRow>) => void;
  onAddRow: () => void;
  onDeleteRow: (rowId: string) => void;
}

export default function AccessoryTable({
  accessories,
  onUpdateRow,
  onAddRow,
  onDeleteRow,
}: AccessoryTableProps) {
  return (
    <div className="mb-2 bg-white border border-slate-500 rounded-lg overflow-hidden shadow-sm">
      {/* Grey header styling similar to manual form */}
      <div className="bg-slate-650 text-slate-100 px-4 py-2 flex items-center justify-between border-b border-slate-500">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-300" />
          <span className="font-display font-semibold text-xs uppercase tracking-wider">
            TRABAJO DE ACCESORIOS / HIPERTROFIA
          </span>
        </div>
        <button
          onClick={onAddRow}
          className="flex items-center gap-1 text-[11px] font-mono font-bold bg-slate-700 hover:bg-slate-800 border border-slate-500 rounded px-3 py-1 text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          <Plus className="w-3" /> AGREGAR FILA
        </button>
      </div>

      <div className="overflow-x-auto lg:overflow-visible custom-scrollbar">
        <table className="w-full text-left border-collapse table-fixed min-w-[1100px] lg:min-w-full">
          <thead>
            {/* Matches headers from reference image */}
            <tr className="bg-slate-200 text-slate-900 border-b border-slate-500 font-sans text-[10.5px] font-extrabold uppercase select-none cursor-default">
              <th className="p-2 w-[21%] text-slate-955 border-r border-slate-400 font-black">ACCESORIOS</th>
              <th className="p-2 w-[4%] text-center border-r border-slate-400">SET</th>
              <th className="p-2 w-[8%] text-center border-r border-slate-400">REPS</th>
              <th className="p-2 w-[5%] text-center border-r border-slate-400">RPE</th>
              
              {/* Set 1 */}
              <th className="p-1 w-[3%] text-center bg-slate-300 text-slate-900 font-black border-r border-slate-400">S</th>
              <th className="p-1 w-[6%] text-center bg-slate-100 text-slate-900 border-r border-slate-400">CARGA</th>
              <th className="p-1 w-[3%] text-center bg-slate-200 text-slate-900 border-r border-slate-400">REPS</th>

              {/* Set 2 */}
              <th className="p-1 w-[3%] text-center bg-slate-300 text-slate-900 font-black border-r border-slate-400">S</th>
              <th className="p-1 w-[6%] text-center bg-slate-100 text-slate-900 border-r border-slate-400">CARGA</th>
              <th className="p-1 w-[3%] text-center bg-slate-200 text-slate-900 border-r border-slate-400">REPS</th>

              {/* Set 3 */}
              <th className="p-1 w-[3%] text-center bg-slate-300 text-slate-900 font-black border-r border-slate-400">S</th>
              <th className="p-1 w-[6%] text-center bg-slate-100 text-slate-900 border-r border-slate-400">CARGA</th>
              <th className="p-1 w-[3%] text-center bg-slate-200 text-slate-900 border-r border-slate-400">REPS</th>

              {/* Set 4 */}
              <th className="p-1 w-[3%] text-center bg-slate-300 text-slate-900 font-black border-r border-slate-400">S</th>
              <th className="p-1 w-[6%] text-center bg-slate-100 text-slate-900 border-r border-slate-400">CARGA</th>
              <th className="p-1 w-[3%] text-center bg-slate-200 text-slate-900 border-r border-slate-400">REPS</th>

              <th className="p-2 w-[10%] text-center border-r border-slate-400 bg-slate-250 text-slate-950 font-black">RIR</th>
              <th className="p-2 w-[4%] text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-400 text-slate-700">
            {accessories.length === 0 ? (
              <tr>
                <td colSpan={17} className="p-8 text-center text-xs text-slate-500 font-mono bg-slate-50/50">
                  Sin accesorios registrados. Presiona "AGREGAR FILA" para comenzar a digitalizar.
                </td>
              </tr>
            ) : (
              accessories.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/40 transition-colors">
                  {/* Name */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none placeholder:text-slate-400"
                      value={row.name}
                      onChange={(e) => onUpdateRow(row.id, { name: e.target.value })}
                      placeholder="Ej. LUNGES CON MANCUERNAS..."
                    />
                  </td>

                  {/* Set */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none"
                      value={row.set}
                      onChange={(e) => onUpdateRow(row.id, { set: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* REPS (Dual blue-red preloaded with 10 - 15) */}
                  <td className="p-1 border-r border-slate-400">
                    <div className="flex items-center justify-between bg-white border border-slate-350 hover:border-slate-500 focus-within:border-slate-700 rounded px-1 py-0.5">
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-blue-600 focus:outline-none"
                        value={row.repsMin}
                        onChange={(e) => onUpdateRow(row.id, { repsMin: e.target.value })}
                        placeholder="10"
                      />
                      <span className="text-slate-400 font-bold select-none text-[10px] px-0.5">-</span>
                      <input
                        type="text"
                        className="w-[45%] bg-transparent text-center text-xs font-mono font-extrabold text-red-500 focus:outline-none"
                        value={row.repsMax}
                        onChange={(e) => onUpdateRow(row.id, { repsMax: e.target.value })}
                        placeholder="15"
                      />
                    </div>
                  </td>

                  {/* Rpe */}
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono font-black text-slate-900 focus:outline-none"
                      value={row.rpe}
                      onChange={(e) => onUpdateRow(row.id, { rpe: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* Set 1: S (Static gray), CARGA, REPS */}
                  <td className="p-1 border-r border-slate-400 bg-slate-200 text-center font-mono font-black text-xs text-slate-700 select-none">
                    S1
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s1_carga}
                      onChange={(e) => onUpdateRow(row.id, { s1_carga: e.target.value })}
                      placeholder=""
                    />
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s1_reps}
                      onChange={(e) => onUpdateRow(row.id, { s1_reps: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* Set 2: S (Static gray), CARGA, REPS */}
                  <td className="p-1 border-r border-slate-400 bg-slate-200 text-center font-mono font-black text-xs text-slate-700 select-none">
                    S2
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s2_carga}
                      onChange={(e) => onUpdateRow(row.id, { s2_carga: e.target.value })}
                      placeholder=""
                    />
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s2_reps}
                      onChange={(e) => onUpdateRow(row.id, { s2_reps: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* Set 3: S (Static gray), CARGA, REPS */}
                  <td className="p-1 border-r border-slate-400 bg-slate-200 text-center font-mono font-black text-xs text-slate-700 select-none">
                    S3
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s3_carga}
                      onChange={(e) => onUpdateRow(row.id, { s3_carga: e.target.value })}
                      placeholder=""
                    />
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s3_reps}
                      onChange={(e) => onUpdateRow(row.id, { s3_reps: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* Set 4: S (Static gray), CARGA, REPS */}
                  <td className="p-1 border-r border-slate-400 bg-slate-200 text-center font-mono font-black text-xs text-slate-700 select-none">
                    S4
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s4_carga}
                      onChange={(e) => onUpdateRow(row.id, { s4_carga: e.target.value })}
                      placeholder=""
                    />
                  </td>
                  <td className="p-1 border-r border-slate-400">
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-350 hover:border-slate-500 focus:border-slate-700 rounded py-1 text-xs text-center font-mono focus:outline-none"
                      value={row.s4_reps}
                      onChange={(e) => onUpdateRow(row.id, { s4_reps: e.target.value })}
                      placeholder=""
                    />
                  </td>

                  {/* RIR (Styled gray static cell containing "RIR 0 - 1" default value, non-modifiable exactly like the image) */}
                  <td className="p-1 border-r border-slate-400 bg-slate-200 text-center select-none font-sans font-black text-xs text-slate-800">
                    RIR {row.rirMin} - {row.rirMax}
                  </td>

                  {/* Actions Column (Eliminar row) */}
                  <td className="p-1 text-center">
                    <button
                      onClick={() => onDeleteRow(row.id)}
                      className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-red-200"
                      title="Eliminar accesorio"
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
