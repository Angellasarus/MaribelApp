import React from "react";
import { AthleteHeader } from "../types";
import { User, Scale, Activity, Flame, Award } from "lucide-react";

interface HeaderProps {
  header: AthleteHeader;
  onChange: (updatedHeader: AthleteHeader) => void;
}

export default function Header({ header, onChange }: HeaderProps) {
  const handleInputChange = (field: Exclude<keyof AthleteHeader, "total">, value: string) => {
    const updated = { ...header };
    if (field === "athleteName") {
      updated.athleteName = value;
    } else {
      updated[field] = value;
    }

    // Automatically recalculate TOTAL
    const s = parseFloat(field === "squat" ? value : updated.squat) || 0;
    const b = parseFloat(field === "bench" ? value : updated.bench) || 0;
    const d = parseFloat(field === "deadlift" ? value : updated.deadlift) || 0;
    updated.total = s + b + d;

    onChange(updated);
  };

  return (
    <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-md max-w-4xl mx-auto mb-8">
      {/* Title Banner */}
      <div className="bg-slate-800 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700 rounded-lg text-amber-500">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl tracking-wider text-slate-100 uppercase">
              BERSERKER MODE
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              FICHA DE ENTRENAMIENTO OFICIAL
            </p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-lg text-right">
          <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-widest">
            Atleta de Fuerza
          </span>
          <span className="font-display font-extrabold text-sm text-amber-400 tracking-wide">
            {header.athleteName || "REGISTRE SU NOMBRE"}
          </span>
        </div>
      </div>

      {/* Grid Inputs representing original athlete cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 border-b border-slate-200 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50">
        
        {/* Atleta Name */}
        <div className="md:col-span-2 p-4">
          <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" /> ATLETA
          </label>
          <input
            type="text"
            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500"
            value={header.athleteName}
            onChange={(e) => handleInputChange("athleteName", e.target.value)}
            placeholder="Nombre Atleta"
          />
        </div>

        {/* BW / Peso */}
        <div className="p-4">
          <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-slate-400" /> BW
          </label>
          <input
            type="number"
            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500 text-center"
            value={header.bw}
            onChange={(e) => handleInputChange("bw", e.target.value)}
            placeholder="Kg"
          />
        </div>

        {/* Squat S */}
        <div className="p-4">
          <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" /> S (SQUAT)
          </label>
          <input
            type="number"
            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500 text-center"
            value={header.squat}
            onChange={(e) => handleInputChange("squat", e.target.value)}
            placeholder="Kg"
          />
        </div>

        {/* Bench B */}
        <div className="p-4">
          <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" /> B (BENCH)
          </label>
          <input
            type="number"
            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500 text-center"
            value={header.bench}
            onChange={(e) => handleInputChange("bench", e.target.value)}
            placeholder="Kg"
          />
        </div>

        {/* Deadlift D */}
        <div className="p-4">
          <label className="block text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-slate-400" /> D (DEADLIFT)
          </label>
          <input
            type="number"
            className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500 text-center"
            value={header.deadlift}
            onChange={(e) => handleInputChange("deadlift", e.target.value)}
            placeholder="Kg"
          />
        </div>
      </div>

      {/* Calculated Total Section */}
      <div className="bg-slate-100 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider">
            Total Estático (S + B + D)
          </span>
        </div>
        <div className="bg-slate-850 px-5 py-1 rounded bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 font-mono mr-2">TOTAL:</span>
          <span className="font-display font-extrabold text-lg text-amber-400 font-mono tracking-wide">
            {header.total || 0} kg
          </span>
        </div>
      </div>
    </div>
  );
}
