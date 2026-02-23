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
  FaShoppingCart,
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

// Icon mapping object (string keys -> components)
const iconMap = {
  FaGlobe,
  FaMobileAlt,
  FaLaptopCode,
  FaBullhorn,
  FaShieldAlt,
  FaLeaf,
  FaShoppingCart,
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

// helper to resolve icon which may be a string key or already a component
const resolveIcon = (icon) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return iconMap[icon] || null;
  }
  // assume it's already a component
  return icon;
};

// Map JS constants data to include actual icon components
const PLATFORMS = platforms.map((platform) => ({
  ...platform,
  icon: resolveIcon(platform.icon),
  plans: (platform.plans || []).map((plan) => ({
    ...plan,
    icon: resolveIcon(plan.icon),
  })),
}));

/**
 * Dedicated Platform Plan Page for Mobile
 * Only shows plan content - no hero, no footer
 * Accessible via routing instead of modal
 */
export default function PlatformPlanPage() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    // Get platform ID from sessionStorage
    const platformId = sessionStorage.getItem('currentPlatformId');
    if (platformId) {
      const foundPlatform = PLATFORMS.find(p => p.id === platformId);
      if (foundPlatform) {
        setPlatform(foundPlatform);
        // Auto-select first plan if available
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

  // Detect screen resize - if resized to desktop, go back to main page
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        // Now desktop size - set flag and navigate to services page
        sessionStorage.setItem('scrollToCalculator', 'true');
        navigate('/services', { replace: true });
      }
    };

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  if (!platform) {
    return null;
  }

  const handleApplyPlan = (plan) => {
    // Store only IDs, not the full objects with icons
    const newItem = { 
      platformId: platform.id,
      planId: plan.id
    };
    
    // Get existing items from sessionStorage
    const existingItems = JSON.parse(sessionStorage.getItem('serviceCalculatorItems') || '[]');
    
    const exists = existingItems.find(
      (item) => item.platformId === platform.id && item.planId === plan.id
    );
    
    if (!exists) {
      existingItems.push(newItem);
      sessionStorage.setItem('serviceCalculatorItems', JSON.stringify(existingItems));
      
      // Dispatch custom event to notify ServiceCalculator
      window.dispatchEvent(new Event('serviceCalculatorUpdate'));
    }
    
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-[#0f0418] via-[#1a0b2e] to-[#2d1b3d] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
          style={{ top: "10%", left: "5%" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          style={{ bottom: "10%", right: "5%" }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with Back Button */}
      <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium"
          >
            <FaArrowLeft />
          </button>
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-white font-semibold text-lg truncate">
              Service Calculator Pricing
            </h1>
          </div>
          <div className="w-18" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-4">
        {/* Platform Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
            {platform.icon ? (
              <platform.icon className="text-2xl text-white" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white truncate">
              {platform.title}
            </h2>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-purple-200/70 text-xs font-medium">
                from
              </span>
              <span className="text-purple-200 font-bold text-sm">
                ₹{(platform.price || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Plans List */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-3">
            Choose a Plan:
          </h3>
          <div className="space-y-2">
            {(platform.plans || []).map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full flex items-center gap-2 p-2.5 rounded-lg transition-all duration-300 backdrop-blur-xl border-2 text-left ${
                  selectedPlan?.id === plan.id
                    ? "bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400/60 shadow-lg shadow-purple-500/50"
                    : "bg-white/10 border-white/20 hover:border-white/40 hover:bg-white/15"
                }`}
              >
                <div
                  className={`flex items-center justify-center p-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    selectedPlan?.id === plan.id
                      ? "bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400/50 shadow-md"
                      : "bg-white/20 border-white/30"
                  }`}
                >
                  {plan.icon ? (
                    <plan.icon className="text-white text-lg" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm transition-colors text-white">
                    {plan.title}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium transition-colors text-purple-200/60">
                      from
                    </span>
                    <span className="text-xs font-medium transition-colors text-purple-200">
                      ₹{(plan.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 mb-4">
          {selectedPlan ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                  {selectedPlan.icon ? (
                    <selectedPlan.icon className="text-2xl text-white" />
                  ) : null}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {selectedPlan.title}
                </h3>
              </div>

              <p className="text-lg font-semibold text-purple-200 mb-4 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <span className="text-xs text-purple-200/70 font-medium">
                  Starting from{" "}
                </span>
                ₹{(selectedPlan.price || 0).toLocaleString()}
              </p>

              {/* Features Section */}
              {(() => {
                const hasUnavailable =
                  selectedPlan.unavailableDetails &&
                  selectedPlan.unavailableDetails.length > 0;
                const availableFeatures =
                  selectedPlan.availableDetails ||
                  selectedPlan.details ||
                  [];
                const unavailableFeatures =
                  selectedPlan.unavailableDetails || [];

                return (
                  <div className="space-y-4 mb-6">
                    {/* Available Features */}
                    <div>
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2 text-sm">
                        <FaCheckCircle className="text-green-400" />
                        {hasUnavailable ? "Included" : "Features"}
                      </h4>
                      <ul className="space-y-2">
                        {availableFeatures.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-white/90 text-xs"
                          >
                            <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0 text-xs" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Unavailable Features */}
                    {hasUnavailable && (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2 text-sm">
                          <FaTimesCircle className="text-red-400" />
                          Not Included
                        </h4>
                        <ul className="space-y-2">
                          {unavailableFeatures.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-white/60 text-xs"
                            >
                              <FaTimesCircle className="text-red-400 mt-0.5 flex-shrink-0 text-xs" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}

              <button
                onClick={() => handleApplyPlan(selectedPlan)}
                className="w-full flex items-center justify-center gap-3 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-[#371445] hover:bg-[#4a1d5a] text-white text-sm"
              >
                <span>Apply Plan</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center text-white/50 text-center py-8">
              <div>
                <FaCheckCircle className="text-4xl mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a plan to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
