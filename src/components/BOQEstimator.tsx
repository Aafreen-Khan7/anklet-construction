import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, Hammer, Settings, Landmark, Calendar, Ruler } from "lucide-react";

export const BOQEstimator: React.FC = () => {
  const [projectType, setProjectType] = useState<string>("residential");
  const [areaSize, setAreaSize] = useState<number>(2000);
  const [concreteGrade, setConcreteGrade] = useState<string>("M25");
  const [soilType, setSoilType] = useState<string>("medium");

  // BOQ multipliers based on technical civil engineering standards
  const getCalculations = () => {
    let cementFactor = 0.4; // bags per sq ft
    let steelFactor = 0.0035; // tons per sq ft
    let ratePerSqFt = 1600; // INR per sq ft base
    let baseTimelineDays = 120;

    switch (projectType) {
      case "residential":
        cementFactor = 0.42;
        steelFactor = 0.0038;
        ratePerSqFt = 1750;
        baseTimelineDays = 150;
        break;
      case "commercial":
        cementFactor = 0.48;
        steelFactor = 0.0045;
        ratePerSqFt = 2400;
        baseTimelineDays = 270;
        break;
      case "warehouse":
        cementFactor = 0.35;
        steelFactor = 0.003;
        ratePerSqFt = 1300;
        baseTimelineDays = 90;
        break;
      case "infrastructure":
        cementFactor = 0.55;
        steelFactor = 0.006;
        ratePerSqFt = 3200;
        baseTimelineDays = 360;
        break;
    }

    // Adjustments based on concrete grade
    if (concreteGrade === "M30") {
      cementFactor *= 1.15;
      ratePerSqFt *= 1.08;
    } else if (concreteGrade === "M20") {
      cementFactor *= 0.9;
      ratePerSqFt *= 0.95;
    }

    // Soil correction for foundation steel strength
    if (soilType === "soft") {
      steelFactor *= 1.2;
      ratePerSqFt *= 1.1;
    }

    const cementBags = Math.round(areaSize * cementFactor);
    const steelTons = parseFloat((areaSize * steelFactor).toFixed(2));
    const estTimeline = Math.round(baseTimelineDays + (areaSize * 0.02));
    const totalCost = areaSize * ratePerSqFt;

    return { cementBags, steelTons, estTimeline, totalCost };
  };

  const { cementBags, steelTons, estTimeline, totalCost } = getCalculations();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-150 dark:border-slate-800 shadow-sm overflow-hidden" id="boq-estimator">
      <div className="p-6 bg-brand-navy text-white relative overflow-hidden">
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2.5 bg-brand-orange text-white rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black tracking-tight">Interactive BOQ & Material Estimator</h3>
            <p className="text-[10px] text-gray-300">Simulate structural engineering resource load profiles instantly</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column - Inputs */}
        <div className="lg:col-span-6 space-y-5">
          {/* Project Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
              1. Project Classification
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "residential", label: "Residential Villa", icon: Landmark },
                { id: "commercial", label: "Corporate Office", icon: Landmark },
                { id: "warehouse", label: "Industrial Shed", icon: Hammer },
                { id: "infrastructure", label: "Heavy Infrastructure", icon: Settings }
              ].map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setProjectType(proj.id)}
                  className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center gap-2.5 transition-all ${
                    projectType === proj.id
                      ? "border-brand-orange bg-orange-500/5 text-brand-orange"
                      : "border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <proj.icon className="w-4 h-4 shrink-0" />
                  <span>{proj.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span>2. Built-up Covered Area</span>
              <span className="text-brand-orange bg-orange-500/10 px-2 py-0.5 rounded text-xs">
                {areaSize.toLocaleString()} sq. ft.
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={areaSize}
              onChange={(e) => setAreaSize(Number(e.target.value))}
              className="w-full accent-brand-orange h-1.5 bg-gray-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400">
              <span>500 sq.ft.</span>
              <span>25,000 sq.ft.</span>
              <span>50,000 sq.ft.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Concrete Grade */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                3. Concrete Design Grade
              </label>
              <select
                value={concreteGrade}
                onChange={(e) => setConcreteGrade(e.target.value)}
                className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="M20">M20 (Paving & Lean Works)</option>
                <option value="M25">M25 (Standard RCC Pillars)</option>
                <option value="M30">M30 (Pre-stressed / Heavy Slab)</option>
              </select>
            </div>

            {/* Soil Type */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                4. Base Soil Consistency
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full text-xs font-bold p-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:border-brand-orange focus:outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="hard">Hard Rock / Murrum (Stiff)</option>
                <option value="medium">Medium Silt / Red Soil (Standard)</option>
                <option value="soft">Soft Clay / Black Cotton Soil (Piling Required)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right column - Estimations Display */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange block">
              Calculated Material Profiles & Cost
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 space-y-1">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Cement Bags</span>
                <p className="text-lg font-black font-display text-brand-navy dark:text-white">{cementBags.toLocaleString()}</p>
                <span className="text-[9px] text-gray-400 block leading-none">Grade-53 Sourced Bags</span>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 space-y-1">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Reinforcing Steel</span>
                <p className="text-lg font-black font-display text-brand-navy dark:text-white">{steelTons} Tons</p>
                <span className="text-[9px] text-gray-400 block leading-none">TATA Tiscon FE 550D TMT</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 space-y-1">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Estimated Duration</span>
                <p className="text-lg font-black font-display text-brand-navy dark:text-white">~{estTimeline} Days</p>
                <span className="text-[9px] text-gray-400 block leading-none">Excavation to Finishes</span>
              </div>

              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 space-y-1">
                <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Budget Estimation</span>
                <p className="text-lg font-black font-display text-brand-orange">
                  ₹{totalCost >= 10000000 ? `${(totalCost / 10000000).toFixed(2)} Cr` : `${(totalCost / 100000).toFixed(2)} L`}
                </p>
                <span className="text-[9px] text-gray-400 block leading-none">Turnkey Civil Estimate</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-800 space-y-3">
            <p className="text-[9px] text-gray-400 leading-relaxed font-light">
              *Disclaimer: Estimates are compiled using civil thumb rules based on Indian Standard (IS) codes for materials. The final structural design may alter quantitative reinforcing values based on certified soil bearing capacity tests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
