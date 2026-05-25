import React from "react";
import { CheckCircle2, RotateCw } from "lucide-react";

interface StatusIndicatorProps {
  isSaving: boolean;
  lastSaved: string | null;
}

export default function StatusIndicator({ isSaving, lastSaved }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm text-xs text-slate-600 transition-all">
      {isSaving ? (
        <>
          <RotateCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
          <span>Guardando...</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lastSaved ? `Guardado automático: ${lastSaved}` : "Ficha configurada y lista"}
          </span>
        </>
      )}
    </div>
  );
}
