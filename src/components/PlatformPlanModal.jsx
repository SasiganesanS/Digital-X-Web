import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Check,
  Plus,
  Minus,
  Clock,
  ArrowRight,
  Globe,
  Laptop,
  Smartphone,
  Megaphone,
  Video,
  Shield,
  Leaf,
  Sliders,
} from "lucide-react";
import {
  SERVICES_CONFIG,
  DURATION_OPTIONS as PRICING_DURATION_OPTIONS,
} from "../data/pricingConfig";

const ICON_MAP = {
  marketing: Megaphone,
  video: Video,
  web: Globe,
  software: Laptop,
  app: Smartphone,
  cyber: Shield,
  sustainability: Leaf,
};

// Map Services from Centralized Pricing Source of Truth
const SERVICES = SERVICES_CONFIG.map((srv) => ({
  id: srv.id,
  title: srv.title,
  desc: srv.desc,
  startingPrice: srv.basePrice,
  icon: ICON_MAP[srv.id] || Globe,
}));

// Map Packages from Centralized Pricing Source of Truth
const PACKAGES = SERVICES_CONFIG.reduce((acc, srv) => {
  acc[srv.id] = srv.packages;
  return acc;
}, {});

// Map Addons from Centralized Pricing Source of Truth
const EXTRAS_SCHEMA = {
  web: [
    {
      category: "WEBSITE SCOPE",
      items: [
        { id: "extra_page", name: "Extra Website Page", type: "qty", unitPrice: 1000, unit: "page", qty: 0 },
        { id: "animation_section", name: "Animation Section", type: "qty", unitPrice: 2500, unit: "section", qty: 0 },
        { id: "landing_page", name: "CRO Landing Page", type: "toggle", price: 3000, enabled: false },
      ],
    },
    {
      category: "MARKETING & SUPPORT",
      items: [
        { id: "seo_pro", name: "SEO Pro Execution", type: "toggle", price: 4000, enabled: false },
        { id: "hosting", name: "Eco Green Hosting", type: "toggle", price: 3000, enabled: false },
        { id: "maintenance", name: "Monthly Maintenance", type: "toggle", price: 2500, enabled: false },
        { id: "content_writing", name: "Content Writing Article", type: "qty", unitPrice: 800, unit: "article", qty: 0 },
      ],
    },
  ],
  marketing: [
    {
      category: "CONTENT & MEDIA",
      items: [
        { id: "instagram_reel", name: "Instagram Reel", type: "qty", unitPrice: 900, unit: "reel", qty: 0 },
        { id: "video_editing", name: "Video Editing", type: "qty", unitPrice: 1500, unit: "video", qty: 0 },
        { id: "content_writing", name: "Content Writing Article", type: "qty", unitPrice: 800, unit: "article", qty: 0 },
      ],
    },
    {
      category: "GROWTH & ADS",
      items: [
        { id: "landing_page", name: "CRO Landing Page", type: "toggle", price: 3000, enabled: false },
        { id: "seo_pro", name: "SEO Pro Execution", type: "toggle", price: 4000, enabled: false },
      ],
    },
  ],
  software: [
    {
      category: "ADDONS & SUPPORT",
      items: [
        { id: "seo_pro", name: "SEO Pro Execution", type: "toggle", price: 4000, enabled: false },
        { id: "hosting", name: "Eco Green Hosting", type: "toggle", price: 3000, enabled: false },
        { id: "maintenance", name: "Monthly Maintenance", type: "toggle", price: 2500, enabled: false },
      ],
    },
  ],
  app: [
    {
      category: "ADDONS & SUPPORT",
      items: [
        { id: "landing_page", name: "CRO Landing Page", type: "toggle", price: 3000, enabled: false },
        { id: "seo_pro", name: "SEO Pro Execution", type: "toggle", price: 4000, enabled: false },
        { id: "maintenance", name: "Monthly Maintenance", type: "toggle", price: 2500, enabled: false },
      ],
    },
  ],
  cyber: [
    {
      category: "SECURITY ADDONS",
      items: [
        { id: "maintenance", name: "Monthly Maintenance", type: "toggle", price: 2500, enabled: false },
        { id: "hosting", name: "Eco Green Hosting", type: "toggle", price: 3000, enabled: false },
      ],
    },
  ],
  sustainability: [
    {
      category: "ECO ADDONS",
      items: [
        { id: "hosting", name: "Eco Green Hosting", type: "toggle", price: 3000, enabled: false },
        { id: "maintenance", name: "Monthly Maintenance", type: "toggle", price: 2500, enabled: false },
      ],
    },
  ],
};

const SLIDE_VARIANTS = {
  enter: (direction) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 250 : -250,
    opacity: 0,
  }),
};

export default function PlatformPlanModal({
  isOpen,
  onClose,
  clickPosition,
  platform,
  onApplyPlan,
}) {
  // Starts directly at Step 2 (Choose Package) - No repeated service selection page
  const [step, setStep] = useState(2);
  const [direction, setDirection] = useState(1);

  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(PRICING_DURATION_OPTIONS[0]); // 1 Month
  const [extrasState, setExtrasState] = useState([]);
  const [hasCustomized, setHasCustomized] = useState(false);

  // Initialize selected service directly from platform prop
  useEffect(() => {
    if (platform) {
      const found = SERVICES.find((s) => s.id === platform.id);
      if (found) setSelectedService(found);
    }
    setStep(2); // Always reset directly to package selection step
  }, [platform, isOpen]);

  // Reset package & extras when service changes
  useEffect(() => {
    if (selectedService) {
      const availPkgs = PACKAGES[selectedService.id] || PACKAGES.web;
      setSelectedPackage(availPkgs[1] || availPkgs[0]);

      const schema = EXTRAS_SCHEMA[selectedService.id] || EXTRAS_SCHEMA.web;
      setExtrasState(JSON.parse(JSON.stringify(schema)));
      setHasCustomized(false);
    }
  }, [selectedService]);

  if (!isOpen) return null;

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("portal-root") || document.body
      : null;
  if (!portalRoot) return null;

  // Calculate total investment: (Package Price + Selected Addons) * Duration Months
  let addonsSum = 0;
  const activeExtrasList = [];

  extrasState.forEach((group) => {
    group.items.forEach((item) => {
      if (item.type === "qty" && item.qty > 0) {
        const itemCost = item.qty * item.unitPrice;
        addonsSum += itemCost;
        activeExtrasList.push({
          name: `${item.name} (+${item.qty} ${item.unit}s)`,
          cost: itemCost,
        });
      } else if (item.type === "toggle" && item.enabled) {
        addonsSum += item.price;
        activeExtrasList.push({
          name: item.name,
          cost: item.price,
        });
      }
    });
  });

  const packagePrice = selectedPackage?.price || 0;
  const grandTotal = (packagePrice + addonsSum) * selectedDuration.months;

  const handleNextStep = () => {
    if (step < 4) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 2) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleSkipToSummary = () => {
    setHasCustomized(false);
    setDirection(1);
    setStep(4);
  };

  const handleGoToCustomization = () => {
    setHasCustomized(true);
    setDirection(1);
    setStep(3);
  };

  const handleQtyChange = (catIdx, itemIdx, delta) => {
    setHasCustomized(true);
    setExtrasState((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const target = copy[catIdx].items[itemIdx];
      target.qty = Math.max(0, (target.qty || 0) + delta);
      return copy;
    });
  };

  const handleToggleChange = (catIdx, itemIdx) => {
    setHasCustomized(true);
    setExtrasState((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const target = copy[catIdx].items[itemIdx];
      target.enabled = !target.enabled;
      return copy;
    });
  };

  const handleFinalSubmit = () => {
    const finalData = {
      platform: {
        id: selectedService.id,
        title: selectedService.title,
        price: selectedService.startingPrice,
      },
      plan: {
        id: selectedPackage.id,
        title: selectedPackage.title,
        price: selectedPackage.price,
      },
      configuredPrice: grandTotal,
      durationLabel: selectedDuration.label,
      durationMonths: selectedDuration.months,
      deliverables: activeExtrasList,
      includedFeatures: selectedPackage.features,
    };

    if (onApplyPlan) onApplyPlan(finalData);
    onClose();
  };

  return ReactDOM.createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      clickPosition={clickPosition}
      maxWidth="max-w-[1000px]"
    >
      <div className="bg-[#FAFAFA] text-[#111111] font-sans w-full max-w-[1000px] min-h-[620px] max-h-[680px] rounded-[30px] border border-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col relative select-none">
        {/* Top Navigation Header */}
        <div className="px-6 py-4 border-b border-neutral-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            {step > 2 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : null}
            <div>
              <span className="text-[10px] font-black text-[#E31D2E] uppercase tracking-[0.25em] block">
                {selectedService.title} Project Brief
              </span>
              <h2 className="text-sm font-black text-[#111111]">
                {step === 2 && `Choose ${selectedService.title} Package`}
                {step === 3 && `Customize Add-ons & Duration`}
                {step === 4 && "Final Proposal Summary"}
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            {[2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s === step
                    ? "w-7 bg-[#E31D2E]"
                    : s < step
                    ? "w-2 bg-[#E31D2E]/40"
                    : "w-2 bg-neutral-200"
                }`}
              />
            ))}
          </div>

          <div className="text-right">
            <span className="text-[9px] font-extrabold text-neutral-400 uppercase tracking-widest block">
              Total Quote
            </span>
            <span className="text-sm font-black text-[#E31D2E]">
              ₹{grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Wizard Main Content Container */}
        <div className="flex-1 relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {/* STEP 2: CHOOSE PACKAGE */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#111111] tracking-tight">
                      Choose {selectedService.title} Package
                    </h3>
                    <p className="text-neutral-500 text-xs font-medium mt-1">
                      Select your preferred solution package. Baseline features are included.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PACKAGES[selectedService.id]?.map((pkg) => {
                      const isSelected = selectedPackage?.id === pkg.id;

                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setSelectedPackage(pkg)}
                          className={`p-5 rounded-[22px] text-left transition-all duration-300 border flex flex-col justify-between relative cursor-pointer min-h-[270px] ${
                            isSelected
                              ? "bg-white border-[#E31D2E] shadow-[0_12px_36px_rgba(0,0,0,0.1)] scale-[1.02] ring-2 ring-[#E31D2E]/15"
                              : "bg-white/80 border-neutral-200/80 hover:border-neutral-300 hover:bg-white"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#E31D2E]">
                                {pkg.title}
                              </span>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-[#E31D2E] text-white flex items-center justify-center">
                                  <Check className="w-3 h-3" />
                                </div>
                              )}
                            </div>

                            <div className="text-2xl font-black text-[#111111] tracking-tight mb-1">
                              ₹{pkg.price.toLocaleString()}
                            </div>
                            <div className="text-[10px] font-bold text-neutral-400 mb-4 flex items-center gap-2">
                              <span>{pkg.idealFor}</span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#E31D2E]" /> {pkg.timeline}
                              </span>
                            </div>

                            <div className="space-y-2 border-t border-neutral-100 pt-3">
                              <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest block">
                                Included Features:
                              </span>
                              {pkg.features.map((feat, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 text-xs font-semibold text-neutral-700"
                                >
                                  <Check className="w-3.5 h-3.5 text-[#E31D2E] shrink-0 mt-0.5" />
                                  <span className="leading-tight">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Identical Premium Action Pair: Website Primary Red Style */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4 border-t border-neutral-200/60 flex flex-wrap justify-end items-center gap-4"
                >
                  {/* LEFT BUTTON: Continue With Package (Primary Red CTA) */}
                  <button
                    type="button"
                    onClick={handleSkipToSummary}
                    className="py-3.5 px-7 rounded-full bg-[#E31D2E] hover:bg-[#c91827] active:bg-[#b01422] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <span>Continue With Package</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* RIGHT BUTTON: Customize Package (Matching Red Accent CTA) */}
                  <button
                    type="button"
                    onClick={handleGoToCustomization}
                    className="py-3.5 px-7 rounded-full bg-white hover:bg-neutral-50 active:bg-neutral-100 text-[#E31D2E] border-2 border-[#E31D2E] font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <Sliders className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    <span>Customize Package</span>
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 3: CUSTOMIZE EXTRAS & DURATION (OPTIONAL) */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-[#111111] tracking-tight">
                      Customize Add-ons & Duration
                    </h3>
                    <p className="text-neutral-500 text-xs font-medium mt-1">
                      Grand Total = (Package Price + Selected Addons) × Duration.
                    </p>
                  </div>

                  {/* Duration Selector */}
                  <div className="mb-5 p-4 rounded-xl bg-white border border-neutral-200/80 shadow-2xs">
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">
                      Select Engagement Duration:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRICING_DURATION_OPTIONS.map((opt) => {
                        const isSelected = selectedDuration.months === opt.months;
                        return (
                          <button
                            key={opt.months}
                            type="button"
                            onClick={() => setSelectedDuration(opt)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-[#E31D2E] text-white border-[#E31D2E] shadow-2xs"
                                : "bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:bg-neutral-100"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Addons List */}
                  <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                    {extrasState.map((group, catIdx) => (
                      <div
                        key={group.category}
                        className="p-4 rounded-[18px] bg-white border border-neutral-200/80 shadow-2xs"
                      >
                        <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-3">
                          {group.category}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.items.map((item, itemIdx) => (
                            <div
                              key={item.id}
                              className="p-3 rounded-xl bg-[#FAF9F6] border border-neutral-100 flex items-center justify-between"
                            >
                              <div className="pr-2 truncate">
                                <div className="text-xs font-bold text-[#111111] truncate">
                                  {item.name}
                                </div>
                                <div className="text-[10px] text-neutral-400 font-medium">
                                  {item.type === "qty" && `+₹${item.unitPrice.toLocaleString()} / ${item.unit}`}
                                  {item.type === "toggle" && `+₹${item.price.toLocaleString()} addon`}
                                </div>
                              </div>

                              <div>
                                {item.type === "qty" && (
                                  <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg p-1 px-1.5">
                                    <button
                                      type="button"
                                      onClick={() => handleQtyChange(catIdx, itemIdx, -1)}
                                      className="w-5 h-5 rounded bg-neutral-100 hover:bg-[#E31D2E]/10 hover:text-[#E31D2E] flex items-center justify-center text-[10px] text-neutral-700 cursor-pointer"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-black text-[#111111] min-w-[16px] text-center">
                                      {item.qty}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleQtyChange(catIdx, itemIdx, 1)}
                                      className="w-5 h-5 rounded bg-neutral-100 hover:bg-[#E31D2E]/10 hover:text-[#E31D2E] flex items-center justify-center text-[10px] text-neutral-700 cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}

                                {item.type === "toggle" && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleChange(catIdx, itemIdx)}
                                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 cursor-pointer ${
                                      item.enabled ? "bg-[#E31D2E]" : "bg-neutral-300"
                                    }`}
                                  >
                                    <div
                                      className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-300 ${
                                        item.enabled ? "translate-x-4" : "translate-x-0"
                                      }`}
                                    />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-full bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_8px_20px_rgba(0,0,0,0.12)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Final Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: FINAL PROPOSAL */}
            {step === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#E31D2E]/10 text-[#E31D2E] border border-[#E31D2E]/20 inline-block mb-2">
                      PROPOSAL SUMMARY
                    </span>
                    <h3 className="text-2xl font-black text-[#111111] tracking-tight">
                      Project Quotation
                    </h3>
                  </div>

                  <div className="p-6 rounded-[22px] bg-white border border-neutral-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Summary Columns */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">
                          SELECTED SOLUTION & PACKAGE
                        </span>
                        <h4 className="text-xl font-black text-[#111111]">
                          {selectedService.title} — {selectedPackage?.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-500 mt-1">
                          <span>Package Price: ₹{packagePrice.toLocaleString()}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#E31D2E]" /> {selectedPackage?.timeline}
                          </span>
                        </div>
                      </div>

                      {/* Included Features */}
                      <div>
                        <span className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest block mb-1.5">
                          INCLUDED FEATURES
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-xs font-bold text-neutral-700">
                          {selectedPackage?.features.map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#E31D2E] shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Extras Added (If customized) */}
                      {hasCustomized && activeExtrasList.length > 0 && (
                        <div>
                          <span className="text-[10px] font-extrabold text-[#E31D2E] uppercase tracking-widest block mb-1.5">
                            OPTIONAL EXTRAS ADDED
                          </span>
                          <div className="space-y-1 text-xs font-semibold text-neutral-700">
                            {activeExtrasList.map((extra, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>+ {extra.name}</span>
                                <span className="font-extrabold text-[#111111]">
                                  +₹{extra.cost.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Grand Total Display */}
                    <div className="lg:col-span-5 p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-center flex flex-col items-center justify-center space-y-2">
                      <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        TOTAL INVESTMENT
                      </span>
                      <div className="text-3xl font-black text-[#E31D2E] tracking-tight">
                        ₹{grandTotal.toLocaleString()}
                      </div>
                      <p className="text-[10px] text-neutral-500 font-medium max-w-[200px]">
                        {hasCustomized && activeExtrasList.length > 0
                          ? `(Package Price + Selected Addons) × ${selectedDuration.label}`
                          : `Flat Package Price for ${selectedPackage?.title}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200/60 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-2.5 rounded-full border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-neutral-700 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-8 py-3.5 rounded-full bg-[#E31D2E] hover:bg-[#c91827] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(0,0,0,0.14)] hover:scale-102 flex items-center gap-2 cursor-pointer"
                  >
                    <span>REQUEST THIS PROPOSAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Modal>,
    portalRoot
  );
}
