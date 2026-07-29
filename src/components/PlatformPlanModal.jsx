import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdStars } from "react-icons/md";

/**
 * Platform Plan Selection Modal (NEW UI Design System)
 * Clean white cards, soft contrast, crisp typography & premium accent styling.
 */
export default function PlatformPlanModal({
  isOpen,
  onClose,
  clickPosition,
  platform,
  selectedPlan,
  onSelectPlan,
  onApplyPlan,
}) {
  if (!platform) return null;

  const portalRoot = typeof document !== 'undefined' ? (document.getElementById('portal-root') || document.body) : null;
  if (!portalRoot) return null;

  const PlatformIcon = typeof platform.icon === 'function' || typeof platform.icon === 'object' ? platform.icon : null;
  const platformPrice = typeof platform.price === 'number' ? platform.price : 0;
  const platformTitle = platform.title || 'Service Pillar';
  const plansList = Array.isArray(platform.plans) ? platform.plans : [];

  return ReactDOM.createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      clickPosition={clickPosition}
      maxWidth="max-w-5xl"
    >
      <div className="bg-white text-[#111111] p-2">
        {/* Platform Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center p-3 rounded-2xl bg-neutral-100 border border-neutral-200 shadow-sm">
            {PlatformIcon ? (
              <PlatformIcon className="text-3xl text-[#E31D2E]" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black text-[#111111] tracking-tight">{platformTitle}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Base Pillar Fee</span>
              <span className="text-[#E31D2E] font-black text-lg">
                ₹{platformPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plans List */}
          <div>
            <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4">
              Available Plans
            </h3>
            <div className="space-y-3">
              {plansList.map((plan) => {
                if (!plan) return null;
                const PlanIcon = typeof plan.icon === 'function' || typeof plan.icon === 'object' ? plan.icon : null;
                const planPrice = typeof plan.price === 'number' ? plan.price : 0;
                const isSelected = selectedPlan?.id === plan.id;

                return (
                  <button
                    key={plan.id || plan.title}
                    onClick={() => onSelectPlan && onSelectPlan(plan)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border text-left ${
                      isSelected
                        ? "bg-[#E31D2E]/5 border-[#E31D2E] shadow-[0_4px_16px_rgba(227,29,46,0.1)]"
                        : "bg-neutral-50 border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-100/80"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "bg-[#E31D2E] border-transparent shadow-md"
                          : "bg-white border-neutral-200 shadow-xs"
                      }`}
                    >
                      {PlanIcon ? (
                        <PlanIcon className={`${isSelected ? "text-white" : "text-[#E31D2E]"} text-xl`} />
                      ) : null}
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-sm uppercase tracking-tight text-[#111111]">
                        {plan.title || "Plan"}
                      </div>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                          Starts at
                        </span>
                        <span className={`text-sm font-black ${isSelected ? "text-[#E31D2E]" : "text-neutral-700"}`}>
                          ₹{planPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-[24px] p-6 lg:p-8">
            {selectedPlan ? (
              (() => {
                const SelectedPlanIcon = typeof selectedPlan.icon === 'function' || typeof selectedPlan.icon === 'object' ? selectedPlan.icon : null;
                const featuresList = Array.isArray(selectedPlan.availableDetails) ? selectedPlan.availableDetails : Array.isArray(selectedPlan.features) ? selectedPlan.features : [];
                const planPrice = typeof selectedPlan.price === 'number' ? selectedPlan.price : 0;

                return (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-white border border-neutral-200 text-[#E31D2E] shadow-sm">
                        {SelectedPlanIcon ? <SelectedPlanIcon className="text-2xl" /> : <MdStars className="text-2xl" />}
                      </div>
                      <div>
                        <h4 className="font-black text-lg text-[#111111]">{selectedPlan.title || 'Plan Details'}</h4>
                        <span className="text-xs text-neutral-500 font-medium">Included Features</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-6 overflow-y-auto max-h-[220px] pr-2">
                      {featuresList.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                          <FaCheckCircle className="text-[#E31D2E] mt-0.5 flex-shrink-0 text-base" />
                          <span>{typeof feat === 'string' ? feat : feat?.name || String(feat)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Plan Investment</span>
                        <span className="text-xl font-black text-[#111111]">₹{planPrice.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => onApplyPlan && onApplyPlan(selectedPlan)}
                        className="px-6 py-3 rounded-full bg-[#E31D2E] text-white font-bold text-sm hover:bg-[#c01726] transition-all shadow-[0_4px_16px_rgba(227,29,46,0.25)] hover:shadow-lg hover:scale-102"
                      >
                        Select & Apply
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                <MdStars className="text-4xl text-neutral-300 mb-2" />
                <p className="text-sm font-medium">Select a plan on the left to view features</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>,
    portalRoot
  );
}
