import React, { useState, useEffect, useMemo } from "react";
import { TrainingGroup, AthleteHeader, ExerciseRow, AccessoryRow } from "./types";
import {
  getDefaultHeader,
  getDefaultGroups,
  createDefaultGroup,
  createBlankMainExercise,
  createBlankAccessory
} from "./dataTemplate";
import Header from "./components/Header";
import GroupCard from "./components/GroupCard";
import StatusIndicator from "./components/StatusIndicator";
import {
  Plus,
  FileSpreadsheet,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const LOCAL_STORAGE_KEY_GROUPS = "berserker_training_groups_v2";
const LOCAL_STORAGE_KEY_HEADER = "berserker_athlete_header_v2";

export default function App() {
  // --- States ---
  const [header, setHeader] = useState<AthleteHeader>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HEADER);
      return saved ? JSON.parse(saved) : getDefaultHeader();
    } catch {
      return getDefaultHeader();
    }
  });

  const [groups, setGroups] = useState<TrainingGroup[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GROUPS);
      return saved ? JSON.parse(saved) : getDefaultGroups();
    } catch {
      return getDefaultGroups();
    }
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [activeDayFilter, setActiveDayFilter] = useState<string>("Todos");
  
  // Modals / Dialog confirmations
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  // Auto-save logic
  useEffect(() => {
    setIsSaving(true);
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_HEADER, JSON.stringify(header));
        localStorage.setItem(LOCAL_STORAGE_KEY_GROUPS, JSON.stringify(groups));
        
        // Grab current local time
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLastSaved(timeStr);
      } catch (err) {
        console.error("Local storage save failed:", err);
      } finally {
        setIsSaving(false);
      }
    }, 600); // 600ms debounce to prevent performance bottlenecks on rapid keystrokes

    return () => clearTimeout(handler);
  }, [header, groups]);

  // --- Search & Filter Logic ---
  const filteredGroups = useMemo(() => {
    return groups.map(g => {
      const filteredDays = g.days.map(d => {
        // Day filter selector ("Lunes", "Martes", etc.)
        const matchesDaySelector = activeDayFilter === "Todos" || d.name === activeDayFilter;
        return {
          ...d,
          isFilteredOut: !matchesDaySelector
        };
      });

      // A group shouldn't be hidden if some days are visible
      const hasVisibleDays = filteredDays.some(d => !d.isFilteredOut);

      return {
        ...g,
        days: filteredDays.filter(d => !d.isFilteredOut),
        isHidden: !hasVisibleDays
      };
    }).filter(g => !g.isHidden);
  }, [groups, activeDayFilter]);

  // --- State Modifiers ---

  // Header change
  const handleHeaderChange = (updated: AthleteHeader) => {
    setHeader(updated);
  };

  // Trigger group collapse
  const handleToggleGroupCollapse = (groupId: string) => {
    setGroups(prev =>
      prev.map(g => (g.id === groupId ? { ...g, isCollapsed: !g.isCollapsed } : g))
    );
  };

  // Trigger day collapse inside group
  const handleToggleDayCollapse = (groupId: string, dayId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => (d.id === dayId ? { ...d, isCollapsed: !d.isCollapsed } : d)),
        };
      })
    );
  };

  // Add next group sequentially (Grupo 2, Grupo 3, up to Grupo 6, and onwards)
  const handleAddNextGroup = () => {
    setGroups(prev => {
      // Find highest group number
      const highestNum = prev.reduce((max, g) => (g.number > max ? g.number : max), 0);
      const nextNum = highestNum + 1;
      const newGroup = createDefaultGroup(nextNum);
      return [...prev, newGroup];
    });
  };

  // Update a single cell in Main Exercise row
  const handleUpdateExerciseRow = (
    groupId: string,
    dayId: string,
    rowId: string,
    updatedFields: Partial<ExerciseRow>
  ) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              mainExercises: d.mainExercises.map(e =>
                e.id === rowId ? { ...e, ...updatedFields } : e
              ),
            };
          }),
        };
      })
    );
  };

  // Add blank main exercise row
  const handleAddExerciseRow = (groupId: string, dayId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              mainExercises: [...d.mainExercises, createBlankMainExercise()],
            };
          }),
        };
      })
    );
  };

  // Delete main exercise row (no confirmation)
  const handleDeleteExerciseRow = (groupId: string, dayId: string, rowId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              mainExercises: d.mainExercises.filter(e => e.id !== rowId),
            };
          }),
        };
      })
    );
  };

  // Update a single cell in Accessory row
  const handleUpdateAccessoryRow = (
    groupId: string,
    dayId: string,
    rowId: string,
    updatedFields: Partial<AccessoryRow>
  ) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              accessories: d.accessories.map(a =>
                a.id === rowId ? { ...a, ...updatedFields } : a
              ),
            };
          }),
        };
      })
    );
  };

  // Add blank accessory row
  const handleAddAccessoryRow = (groupId: string, dayId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              accessories: [...d.accessories, createBlankAccessory()],
            };
          }),
        };
      })
    );
  };

  // Delete accessory row (no confirmation)
  const handleDeleteAccessoryRow = (groupId: string, dayId: string, rowId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          days: g.days.map(d => {
            if (d.id !== dayId) return d;
            return {
              ...d,
              accessories: d.accessories.filter(a => a.id !== rowId),
            };
          }),
        };
      })
    );
  };

  // Reset function removed but clear maintained
  const handleClearAll = () => {
    setHeader({
      athleteName: "",
      bw: "",
      squat: "",
      bench: "",
      deadlift: "",
      total: 0,
    });
    setGroups(getDefaultGroups());
    setShowResetConfirm(false);
  };

  // Expand / Collapse Global helpers
  const handleExpandAll = (isExpanded: boolean) => {
    setGroups(prev =>
      prev.map(g => ({
        ...g,
        isCollapsed: !isExpanded,
        days: g.days.map(d => ({ ...d, isCollapsed: !isExpanded })),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Upper Navigation/Banner with Status Indicators */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 px-4 py-3 shadow-sm">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 text-amber-400 rounded-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 block leading-tight">
                Sistema Digitalizado
              </span>
              <span className="font-display font-extrabold text-sm text-slate-800 tracking-tight leading-none">
                Ficha Berserkers — Maribel Montalvo
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Save indicator */}
            <StatusIndicator isSaving={isSaving} lastSaved={lastSaved} />

            {/* Global expansion buttons */}
            <button
              onClick={() => handleExpandAll(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              title="Expandir todos los grupos y días"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Expandir Todo</span>
            </button>
            <button
              onClick={() => handleExpandAll(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
              title="Colapsar todos los grupos y días"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Colapsar Todo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1600px] mx-auto px-4 pt-8 w-full">
        
        {/* Real-time editable Athlete Header */}
        <Header header={header} onChange={handleHeaderChange} />

        {/* Action controls without Search bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filter Day Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto relative">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 select-none whitespace-nowrap font-bold">
                FILTRAR DÍA:
              </span>
              <div className="relative w-full sm:w-48">
                <select
                  value={activeDayFilter}
                  onChange={(e) => setActiveDayFilter(e.target.value)}
                  className="w-full bg-white border border-slate-300 hover:border-slate-400 rounded-lg pl-3 pr-8 py-2 text-sm font-bold text-slate-800 cursor-pointer shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500"
                >
                  <option value="Todos">Ver: Todos los días</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Viernes">Viernes</option>
                  <option value="Sábado">Sábado</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Danger Zone Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 text-xs font-mono font-bold bg-white border border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50/50 px-3 py-2 rounded-lg cursor-pointer transition-all"
                title="Vaciar tabla completa"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>LIMPIAR TODO</span>
              </button>
            </div>

          </div>
        </div>

        {/* Group list */}
        <div className="space-y-6 max-w-[1600px] mx-auto">
          {filteredGroups.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-lg mx-auto shadow-sm">
              <h3 className="font-display font-semibold text-slate-850 text-base mb-1">
                No hay entrenamientos para mostrar
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mb-4">
                Prueba seleccionando "Ver: Todos los días" o agregando un nuevo grupo de entrenamiento.
              </p>
              <button
                onClick={() => {
                  setActiveDayFilter("Todos");
                }}
                className="px-4 py-2 bg-slate-850 hover:bg-slate-900 text-slate-100 font-medium text-xs rounded-lg transition-all"
              >
                Ver todos los días
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onToggleCollapse={() => handleToggleGroupCollapse(group.id)}
                onToggleDayCollapse={(dayId) => handleToggleDayCollapse(group.id, dayId)}
                onUpdateExerciseRow={(dayId, rowId, fields) =>
                  handleUpdateExerciseRow(group.id, dayId, rowId, fields)
                }
                onAddExerciseRow={(dayId) => handleAddExerciseRow(group.id, dayId)}
                onDeleteExerciseRow={(dayId, rowId) => handleDeleteExerciseRow(group.id, dayId, rowId)}
                onUpdateAccessoryRow={(dayId, rowId, fields) =>
                  handleUpdateAccessoryRow(group.id, dayId, rowId, fields)
                }
                onAddAccessoryRow={(dayId) => handleAddAccessoryRow(group.id, dayId)}
                onDeleteAccessoryRow={(dayId, rowId) =>
                  handleDeleteAccessoryRow(group.id, dayId, rowId)
                }
              />
            ))
          )}
        </div>

        {/* Bottom sequential action to append next training week group */}
        <div className="flex justify-center mt-12 max-w-[1600px] mx-auto">
          <button
            onClick={handleAddNextGroup}
            className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-black text-amber-400 hover:text-amber-300 font-display font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer scale-100 hover:scale-102 active:scale-98"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar siguiente grupo de entrenamiento</span>
          </button>
        </div>

      </main>

      {/* Confirmation Dialog Modals */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border-2 border-slate-400 rounded-xl max-w-md w-full overflow-hidden shadow-2xl p-6"
            >
              <h3 className="font-display font-bold text-lg text-slate-800 mb-2 uppercase">
                ¿Vaciar ficha de entrenamiento?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Esta acción limpiará absolutamente todos los ejercicios y números de la cuadrícula, dejando bloques en blanco para que puedas planificar desde cero. Esta acción es irrevocable.
              </p>
              <div className="flex items-center justify-end gap-3 font-mono text-xs">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded text-slate-600 font-medium cursor-pointer"
                >
                  CANCELAR
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-white font-bold rounded cursor-pointer bg-red-600 hover:bg-red-700"
                >
                  SÍ, CONFIRMAR
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating clock / info badge on bottom left - Elegant & minimalistic */}
      <footer className="fixed bottom-4 left-4 z-40 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 shadow-lg hidden sm:flex items-center gap-2.5 text-[10px] text-slate-400 font-mono">
        <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <div>
          <span className="block leading-none">SESIÓN ACTIVA</span>
          <span className="block text-slate-500 font-bold leading-none mt-1 uppercase">PERSISTENCIA: LOCALSTORAGE</span>
        </div>
      </footer>

    </div>
  );
}
