import React, { useState } from "react";
import { PROCESS_STEPS } from "../data";
import { 
  Users, 
  Palette, 
  FileSpreadsheet, 
  HardHat, 
  ClipboardCheck, 
  KeyRound,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Helper to resolve icon dynamically for timeline
const StepIcon = ({ index, className }: { index: number; className: string }) => {
  switch (index) {
    case 0:
      return <Users className={className} />;
    case 1:
      return <Palette className={className} />;
    case 2:
      return <FileSpreadsheet className={className} />;
    case 3:
      return <HardHat className={className} />;
    case 4:
      return <ClipboardCheck className={className} />;
    case 5:
      return <KeyRound className={className} />;
    default:
      return <HardHat className={className} />;
  }
};

export const Timeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="py-12">
      {/* Horizontal Steps Navigator */}
      <div className="relative mb-12 overflow-x-auto pb-4 scrollbar-none" id="timeline-container">
        {/* Connection progress line */}
        <div className="absolute top-[39px] left-10 right-10 h-1 bg-gray-200 dark:bg-slate-700 hidden md:block" />
        
        {/* Filled connection progress line */}
        <div 
          className="absolute top-[39px] left-10 h-1 bg-brand-orange hidden md:block transition-all duration-500" 
          style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 90}%` }}
        />

        <div className="flex md:justify-between items-center min-w-[700px] px-4">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className="flex flex-col items-center group relative z-10 focus:outline-none cursor-pointer flex-1"
                id={`timeline-step-${idx}`}
              >
                {/* Step Circle Button */}
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center border-4 text-sm font-extrabold transition-all duration-300 ${
                    isActive 
                      ? "bg-brand-navy text-white border-brand-orange dark:bg-brand-orange dark:border-brand-navy scale-110 shadow-lg shadow-brand-orange/25"
                      : isCompleted
                        ? "bg-orange-50 text-brand-orange border-brand-orange dark:bg-slate-800 dark:text-brand-orange"
                        : "bg-white text-gray-400 border-gray-200 hover:border-brand-navy dark:bg-slate-900 dark:border-slate-800 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <StepIcon index={idx} className="w-6 h-6 mb-1" />
                    <span className="text-[10px] uppercase font-black tracking-wider leading-none">{step.number}</span>
                  </div>
                </div>

                {/* Short Step Title */}
                <span 
                  className={`text-xs font-black tracking-wider uppercase mt-3 transition-colors duration-200 ${
                    isActive 
                      ? "text-brand-navy dark:text-brand-orange" 
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                  }`}
                >
                  {step.title}
                </span>

                {/* Small indicator */}
                <span className="text-[10px] text-gray-400 font-bold tracking-wide mt-1 leading-none">
                  Phase {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Specifications Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-800/85 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-700/50 flex flex-col md:flex-row gap-8 items-stretch"
          id="timeline-active-panel"
        >
          {/* Big number badge column */}
          <div className="md:w-1/4 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-700 pb-6 md:pb-0 md:pr-8">
            <div>
              <span className="text-7xl font-black text-brand-orange/30 font-display block leading-none">
                {PROCESS_STEPS[activeStep].number}
              </span>
              <span className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-2 block">
                ANKLET Construction Protocol
              </span>
            </div>
            
            <div className="mt-8 hidden md:block">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Current State
              </span>
              <p className="text-sm font-bold text-brand-navy dark:text-white mt-1">
                Phase {activeStep + 1} of {PROCESS_STEPS.length}
              </p>
            </div>
          </div>

          {/* Text detailed descriptions */}
          <div className="md:w-3/4 flex flex-col justify-between pl-0 md:pl-4">
            <div>
              <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest block mb-1">
                Structural Execution Step
              </span>
              <h4 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white leading-tight mb-4">
                {PROCESS_STEPS[activeStep].title}
              </h4>
              <p className="text-gray-800 dark:text-gray-200 font-bold text-base leading-relaxed mb-4">
                "{PROCESS_STEPS[activeStep].description}"
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {PROCESS_STEPS[activeStep].details} We prioritize extreme compliance checking at this phase, integrating structural engineers, supply surveyors, and custom architects. This de-risks execution lag and keeps structural alignment perfect.
              </p>
            </div>

            {/* Pagination buttons */}
            <div className="flex justify-between items-center border-t border-gray-100 dark:border-slate-700 pt-6 mt-6">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  activeStep === 0
                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "text-brand-navy hover:bg-gray-50 dark:text-white dark:hover:bg-slate-700 cursor-pointer"
                }`}
              >
                ← Prev Phase
              </button>
              
              <div className="flex gap-1.5">
                {PROCESS_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStep === i ? "bg-brand-orange w-6" : "bg-gray-200 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={activeStep === PROCESS_STEPS.length - 1}
                onClick={() => setActiveStep(activeStep + 1)}
                className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                  activeStep === PROCESS_STEPS.length - 1
                    ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "text-brand-orange hover:bg-orange-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-1"
                }`}
              >
                Next Phase <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
