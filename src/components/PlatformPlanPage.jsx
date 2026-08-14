import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from "react-icons/fa";
import {
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaShieldAlt,
  FaLeaf,
  FaChartLine,
} from "react-icons/fa";
import {
  MdDiamond,
  MdRocketLaunch,
  MdStars,
  MdWorkspacePremium,
  MdIntegrationInstructions,
} from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiLightningBolt } from "react-icons/hi";
import { motion } from "framer-motion";
import { platforms } from "../constants/index";

// Icon mapping object
const iconMap = {
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaShieldAlt,
  FaLeaf,
  FaTimesCircle,
  FaCheckCircle,
  FaChartLine,
  MdDiamond,
  MdRocketLaunch,
  MdStars,
  MdWorkspacePremium,
  MdIntegrationInstructions,
  IoLogoWhatsapp,
  HiLightningBolt,
};

const resolveIcon = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return iconMap[icon] || null;
  }
  return icon;
};

const PLATFORMS = platforms.map((platform) => ({
  ...platform,
  icon: resolveIcon(platform.icon),
  plans: (platform.plans || []).map((plan) => ({
    ...plan,
    icon: resolveIcon(plan.icon),
  })),
}));

export default function PlatformPlanPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    const platformId = sessionStorage.getItem('currentPlatformId');
    if (platformId) {
      const foundPlatform = PLATFORMS.find(p => p.id === platformId);
      if (foundPlatform) {
        setPlatform(foundPlatform);
        if (foundPlatform.plans && foundPlatform.plans.length > 0) {
          setSelectedPlan(foundPlatform.plans[0]);
        }
      } else {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }, [navigate]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        sessionStorage.setItem('scrollToCalculator', 'true');
        navigate('/services', { replace: true });
      }
    };
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  if (!platform) return null;

  const handleApplyPlan = (plan) => {
    const newItem = { platformId: platform.id, planId: plan.id };
    sessionStorage.setItem('serviceCalculatorItems', JSON.stringify([newItem]));
    window.dispatchEvent(new Event('serviceCalculatorUpdate'));
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#080808] text-white font-outfit"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 px-6 py-5">
          <button onClick={() => navigate(-1)} className="text-[#E8192C] text-xl">
            <FaArrowLeft />
          </button>
          <h1 className="text-sm font-black uppercase tracking-[0.2em] flex-1 text-center">Customize Pillar</h1>
          <div className="w-5" />
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Platform Hero */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {(() => {
              const PlatformIcon = typeof platform.icon === 'function' || typeof platform.icon === 'object' ? platform.icon : null;
              return PlatformIcon ? <PlatformIcon className="text-3xl text-[#E8192C]" /> : null;
            })()}
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{platform.title || 'Platform'}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[10px] font-bold text-white/20 uppercase">Initial Pillar Fee</span>
              <span className="text-[#E8192C] font-black">₹{(platform.price || 0).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Plans List */}
        <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Select Scale</h3>
        <div className="grid grid-cols-1 gap-3 mb-12">
          {(platform.plans || []).map(plan => {
            if (!plan) return null;
            const PlanIcon = typeof plan.icon === 'function' || typeof plan.icon === 'object' ? plan.icon : null;

            return (
              <button
                key={plan.id || plan.title}
                onClick={() => setSelectedPlan(plan)}
                className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${selectedPlan?.id === plan.id
                    ? "bg-[#E8192C]/10 border-[#E8192C]/40"
                    : "bg-white/5 border-white/5"
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedPlan?.id === plan.id ? "bg-[#E8192C] text-[#ffffff]" : "bg-white/5 text-[#E8192C]/60"}`}>
                  {PlanIcon ? <PlanIcon className="text-lg" /> : null}
                </div>
                <div className="text-left flex-1">
                  <div className="text-sm font-black uppercase tracking-tight">{plan.title || "Plan"}</div>
                  <div className={`text-xs font-bold mt-0.5 ${selectedPlan?.id === plan.id ? "text-white" : "text-[#E8192C]"}`}>₹{(plan.price || 0).toLocaleString()}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Plan Features */}
        {selectedPlan && (
          <div className="space-y-8 animate-fadeIn">
            <div className="p-6 rounded-[40px] bg-white/[0.03] border border-white/10">
              <h4 className="text-[10px] font-black text-[#E8192C] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#E8192C]/30" />
                What's Included
              </h4>
              <ul className="space-y-4">
                {(selectedPlan.availableDetails || selectedPlan.details || []).map((d, i) => (
                  <li key={i} className="flex items-start gap-4 text-white/60 text-xs font-bold leading-relaxed">
                    <FaCheckCircle className="text-[#E8192C] mt-1 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleApplyPlan(selectedPlan)}
              className="w-full py-6 rounded-3xl bg-white text-[#080808] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#E8192C] hover:text-white transition-all shadow-2xl"
            >
              Apply Strategy
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
