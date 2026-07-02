import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, FileText, ArrowRight, ShieldCheck, HardHat, Layers } from "lucide-react";

interface PhaseData {
  id: number;
  name: string;
  duration: string;
  progress: number;
  materials: string[];
  audits: string[];
  certifications: string[];
  graphicHeight: string; // CSS class for graphic growth
  desc: string;
}

const PHASES: PhaseData[] = [
  {
    id: 1,
    name: "Drafting & Soil Survey",
    duration: "Day 1 - 25",
    progress: 100,
    desc: "Rigorous geological core drills and digital BIM modeling to eliminate design overlaps.",
    materials: ["Digital LiDAR Scan Reports", "AutoCAD 3D CAD Mockups", "BIM Collision Logs"],
    audits: ["Soil bearing plate tests", "Local municipality boundary audits", "Water runoff simulation tests"],
    certifications: ["Geotechnical Soil Bearing Certificate", "Structural Drafting Approved Seals", "PWD Environmental Consent"],
    graphicHeight: "h-4 bg-orange-500/30"
  },
  {
    id: 2,
    name: "Foundation & Plinth",
    duration: "Day 25 - 65",
    progress: 100,
    desc: "Excavating base soil and casting dense reinforced concrete footings to anchors.",
    materials: ["M25 RMC Concrete Mix", "TATA Tiscon FE 550D Rebars", "Damp-Proof Course Polymer Membranes"],
    audits: ["Foundation rebar spacing checks", "Excavation depth leveling scans", "Concrete slump testing (IS 1199)"],
    certifications: ["Anti-Termite Chemical Vetting Certificate", "Foundation Alignment Signoff", "Pouring Clearance Consent Document"],
    graphicHeight: "h-12 bg-orange-500/50"
  },
  {
    id: 3,
    name: "Superstructure Columns",
    duration: "Day 65 - 160",
    progress: 100,
    desc: "Casting primary load-bearing columns and high-strength floor slabs.",
    materials: ["M30 Ready-Mix Concrete", "Heavy TMT Steel Reinforcement Pillars", "Plywood Column Shuttering Sets"],
    audits: ["28-day concrete cube compressive trials", "Column verticality laser alignments", "Scaffolding loading inspections"],
    certifications: ["RCC Shell Integrity Certificate", "Slab Load Capacity Signoff Report", "Structural Deflection Clearances"],
    graphicHeight: "h-24 bg-orange-500/70"
  },
  {
    id: 4,
    name: "Brick Masonry & Slabs",
    duration: "Day 160 - 240",
    progress: 100,
    desc: "Setting up lightweight brick thermal walls and dual-layered damp-proofing.",
    materials: ["Premium Fly-Ash Bricks", "Ultratech Pozzolana Mortar", "Saint-Gobain Smart Double Glasses"],
    audits: ["Water-seepage absorption check", "Facade wind resistance simulation", "Internal pipeline pressure trial"],
    certifications: ["Thermal Insulation Compliance Seal", "Waterproof Integrity Clearance", "Fittings Pressure Compliance Certificate"],
    graphicHeight: "h-36 bg-orange-500/85"
  },
  {
    id: 5,
    name: "Architectural Handover",
    duration: "Day 240 - 300",
    progress: 100,
    desc: "Installing high-end premium internal finishes, electrical checks, and handover certification.",
    materials: ["Berger Damp-Proof Coats", "Premium Low-VOC Paints", "Polished Architectural Hardware"],
    audits: ["Independent civil safety walkthrough", "Electrical surge overload check", "HVAC airflow balance scan"],
    certifications: ["Occupancy Certificate (OC)", "Seismic Structural Stability Warranty", "50-Year Structural Guarantee Bond"],
    graphicHeight: "h-48 bg-orange-500"
  }
];

export const GanttSimulator: React.FC = () => {
  const [activePhaseId, setActivePhaseId] = useState<number>(3); // Default to superstructure

  const activePhase = PHASES.find((p) => p.id === activePhaseId) || PHASES[2];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 p-6 space-y-8" id="gantt-simulator">
      {/* 1. GANTT TIMELINE RULER */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[600px] flex justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
          {PHASES.map((phase) => {
            const isActive = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseId(phase.id)}
                className="flex-1 text-left px-3 py-2.5 rounded-xl border transition-all select-none cursor-pointer focus:outline-none"
                style={{
                  borderColor: isActive ? "#F97316" : "transparent",
                  backgroundColor: isActive ? "rgba(249, 115, 22, 0.08)" : "transparent"
                }}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                    isActive ? "bg-brand-orange text-white" : "bg-gray-200 dark:bg-slate-800 text-gray-500"
                  }`}>
                    P0{phase.id}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">{phase.duration}</span>
                </div>
                <h4 className={`text-xs font-black tracking-tight mt-1 truncate ${
                  isActive ? "text-brand-navy dark:text-white" : "text-gray-600 dark:text-gray-400"
                }`}>
                  {phase.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SPLIT INTERACTION PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-orange">
              Phase {activePhase.id} Metrics ({activePhase.duration})
            </span>
            <h3 className="text-base sm:text-lg font-black text-brand-navy dark:text-white tracking-tight">
              {activePhase.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              {activePhase.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Raw materials */}
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block border-b border-gray-200 dark:border-slate-800 pb-1">
                Sourced Materials
              </span>
              <ul className="space-y-1.5">
                {activePhase.materials.map((m, i) => (
                  <li key={i} className="flex gap-1.5 text-[10px] text-gray-600 dark:text-gray-300">
                    <Layers className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="leading-tight">{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Field Audits */}
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block border-b border-gray-200 dark:border-slate-800 pb-1">
                Field Audits (IS Codes)
              </span>
              <ul className="space-y-1.5">
                {activePhase.audits.map((a, i) => (
                  <li key={i} className="flex gap-1.5 text-[10px] text-gray-600 dark:text-gray-300">
                    <HardHat className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="leading-tight">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block border-b border-gray-200 dark:border-slate-800 pb-1">
                Certificates Released
              </span>
              <ul className="space-y-1.5">
                {activePhase.certifications.map((c, i) => (
                  <li key={i} className="flex gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="leading-tight">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Dynamic Grow Graphic */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
          {/* Subtle Grid for drafting vibe */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:12px_12px] opacity-25" />
          
          <div className="relative z-10 w-full flex flex-col items-center justify-end h-40">
            {/* Visual growing house wireframe block */}
            <div className="w-32 border-2 border-dashed border-gray-200 dark:border-slate-800 flex flex-col justify-end p-2 rounded-t-lg h-36 relative">
              
              {/* Ground line */}
              <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-brand-navy rounded-full" />

              {/* Phase 1 Ground Survey anchor */}
              {activePhaseId >= 1 && (
                <div className="absolute bottom-1 left-2 right-2 h-2 rounded bg-orange-500/20 border border-orange-500/40 text-[7px] text-center font-black text-brand-orange uppercase">
                  Survey Plotted
                </div>
              )}

              {/* Phase 2 Foundation footprint */}
              {activePhaseId >= 2 && (
                <div className="absolute bottom-4 left-4 right-4 h-4 rounded-sm bg-orange-500/40 border-2 border-brand-orange/60 flex items-center justify-center text-[8px] font-black text-white uppercase">
                  Foundation
                </div>
              )}

              {/* Phase 3 Column Slabs frame */}
              {activePhaseId >= 3 && (
                <div className="absolute bottom-9 left-6 right-6 h-12 border-l-4 border-r-4 border-t-2 border-brand-orange bg-orange-500/10 flex flex-col justify-between">
                  <div className="h-0.5 bg-brand-orange w-full" />
                  <div className="text-[7px] font-black text-brand-navy text-center select-none uppercase">RCC Pillars</div>
                  <div className="h-0.5 bg-brand-orange w-full" />
                </div>
              )}

              {/* Phase 4 Wall Masonry */}
              {activePhaseId >= 4 && (
                <div className="absolute bottom-9 left-7 right-7 h-11 bg-orange-500/70 border-b border-white/20 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5 w-full p-1 h-full">
                    <div className="border border-white/20 bg-orange-600/30" />
                    <div className="border border-white/20 bg-orange-600/30 flex items-center justify-center text-[8px] font-black text-white">Glass</div>
                    <div className="border border-white/20 bg-orange-600/30" />
                  </div>
                </div>
              )}

              {/* Phase 5 Handover Roof */}
              {activePhaseId >= 5 && (
                <div className="absolute -top-1 left-1 right-1 border-b-[12px] border-b-brand-orange border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent h-0 w-0 drop-shadow-sm" />
              )}
            </div>
          </div>
          <p className="text-[9px] font-bold text-gray-400 mt-4 uppercase tracking-wider text-center relative z-10">
            ANKLET CAD Structural Grow Simulator (Step {activePhaseId} of 5)
          </p>
        </div>
      </div>
    </div>
  );
};
