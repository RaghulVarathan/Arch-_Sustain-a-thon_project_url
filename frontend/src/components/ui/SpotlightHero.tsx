import React, { useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

export const SpotlightHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl border border-[#1f2d25] bg-[#101713] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl"
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(650px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(62, 168, 118, 0.12), transparent 60%)`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="flex items-center gap-2 text-xs font-mono text-[#8ba497]"
          >
            <span className="w-2 h-2 bg-[#3ea876] rounded-full animate-pulse" />
            <span className="font-semibold text-[#a8e6c4] tracking-wider uppercase text-[10px]">
              SURVEILLANCE DOSSIER
            </span>
            <span>•</span>
            <span className="text-[#6b8276]">Southern Catchment Directorate</span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#f4f2ed] leading-[1.12]"
          >
            Industrial Effluent Forensics & Telemetry Verification
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="text-sm text-[#9ab0a4] max-w-2xl leading-relaxed pt-1 font-sans"
          >
            Continuous multi-sensor anomaly detection cross-referencing statutory limits, stoichiometric biological treatment kinetics, and sub-meter utility draw to prioritize physical inspections.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="pt-3 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/upload"
              className="btn-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1f593b] text-[#f4f7f5] text-xs font-semibold border border-[#2e8256] transition-all shadow-sm group"
            >
              <Activity className="w-4 h-4 text-[#a8e6c4] group-hover:scale-110 transition-transform" />
              <span>Ingest & Execute Pipeline</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a8e6c4] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/factories"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#141d18] hover:bg-[#1a2620] text-[#c4d4cc] text-xs font-semibold border border-[#23332a] transition-all group"
            >
              <span>Browse Registry (120 Facilities)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8ba497] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetrical Right Column: Live Detection Ledger */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="lg:col-span-4 bg-[#090d0b]/90 backdrop-blur-md p-5 rounded-xl border border-[#1a251f] space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#18231c]">
            <span className="font-mono text-[10px] text-[#789284] font-semibold uppercase tracking-wider">
              ANALYTICAL FRAMEWORK
            </span>
            <span className="font-mono text-[10px] text-[#3ea876] font-bold">ENSEMBLE 100%</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[#9ab0a4]">1. Multivariate Density (IF)</span>
                <span className="font-mono font-bold text-[#f4f2ed]">40%</span>
              </div>
              <div className="w-full h-1.5 bg-[#141d18] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-[#3ea876] rounded-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[#9ab0a4]">2. Biological Kinetics</span>
                <span className="font-mono font-bold text-[#f4f2ed]">30%</span>
              </div>
              <div className="w-full h-1.5 bg-[#141d18] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-[#2b7850] rounded-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[#9ab0a4]">3. Power vs Flow Draw</span>
                <span className="font-mono font-bold text-[#f4f2ed]">30%</span>
              </div>
              <div className="w-full h-1.5 bg-[#141d18] rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-[#d97706] rounded-sm"
                />
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#5d7367] leading-snug pt-3 border-t border-[#18231c]">
            Scores reflect statistical & stoichiometric divergence, providing explainable investigative evidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
