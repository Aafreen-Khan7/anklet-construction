import React, { useState } from "react";
import { TESTIMONIALS_DATA } from "../data";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative py-8 max-w-4xl mx-auto" id="testimonials-carousel">
      {/* Testimonials Slides with Animation */}
      <div className="relative overflow-hidden min-h-[350px] sm:min-h-[280px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/95 dark:to-slate-950/90 rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-center"
          >
            {/* Client Picture & Brand info */}
            <div className="md:w-1/3 flex flex-col items-center text-center shrink-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-brand-navy rounded-full blur opacity-30" />
                <img
                  src={TESTIMONIALS_DATA[currentIndex].imageUrl}
                  alt={TESTIMONIALS_DATA[currentIndex].name}
                  referrerPolicy="no-referrer"
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-slate-100 dark:border-slate-850 shadow-md"
                />
                <div className="absolute -bottom-2 -right-2 bg-brand-orange text-white p-2 rounded-full shadow-lg">
                  <Quote className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-lg font-black text-brand-navy dark:text-white mt-4">
                {TESTIMONIALS_DATA[currentIndex].name}
              </h4>
              <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mt-1">
                {TESTIMONIALS_DATA[currentIndex].role}
              </p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {TESTIMONIALS_DATA[currentIndex].company}
              </p>
            </div>

            {/* Quote details */}
            <div className="md:w-2/3 flex flex-col justify-between">
              {/* Stars Rating */}
              <div className="flex gap-1 mb-4 justify-center md:justify-start">
                {Array.from({ length: TESTIMONIALS_DATA[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                ))}
              </div>

              {/* Text review */}
              <p className="text-gray-600 dark:text-gray-200 text-base md:text-lg italic leading-relaxed text-center md:text-left mb-6">
                "{TESTIMONIALS_DATA[currentIndex].content}"
              </p>

              <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-slate-800 pt-4 mt-auto">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Verified Client Review • 100% Satisfaction
                </span>
                
                {/* Micro indicators */}
                <div className="flex gap-1.5">
                  {TESTIMONIALS_DATA.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        currentIndex === i ? "bg-brand-orange w-4" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-12 z-20">
        <button
          onClick={handlePrev}
          className="bg-white hover:bg-brand-navy hover:text-white text-brand-navy p-3.5 rounded-full shadow-xl border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-brand-orange transition-all duration-200 cursor-pointer"
          id="testimonial-prev-btn"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-12 z-20">
        <button
          onClick={handleNext}
          className="bg-white hover:bg-brand-navy hover:text-white text-brand-navy p-3.5 rounded-full shadow-xl border border-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:hover:bg-brand-orange transition-all duration-200 cursor-pointer"
          id="testimonial-next-btn"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
