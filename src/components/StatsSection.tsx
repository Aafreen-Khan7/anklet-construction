import React, { useState, useEffect } from "react";
import { Award, CheckCircle, Users, HardHat } from "lucide-react";

interface CounterItemProps {
  target: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}

const CounterItem: React.FC<CounterItemProps> = ({ target, suffix, label, icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (end === 0) return;

    // Fast at beginning, slows down at end
    const duration = 2000;
    const increment = end / (duration / 30);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="bg-orange-500/10 text-brand-orange p-4 rounded-2xl mb-4">
        {icon}
      </div>
      <span className="text-4xl md:text-5xl font-black text-brand-navy dark:text-white font-display tracking-tight">
        {count}
        {suffix}
      </span>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2 block">
        {label}
      </span>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" id="statistics-counters">
      <CounterItem
        target={50}
        suffix="+"
        label="Projects Completed"
        icon={<CheckCircle className="w-6 h-6" />}
      />
      <CounterItem
        target={100}
        suffix="+"
        label="Happy Clients"
        icon={<Users className="w-6 h-6" />}
      />
      <CounterItem
        target={15}
        suffix="+"
        label="Years Experience"
        icon={<Award className="w-6 h-6" />}
      />
      <CounterItem
        target={25}
        suffix="+"
        label="Expert Engineers"
        icon={<HardHat className="w-6 h-6" />}
      />
    </div>
  );
};
