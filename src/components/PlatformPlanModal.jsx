import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdStars } from "react-icons/md";

/**
 * Platform Plan Selection Modal
 * Shows available plans for a selected platform with detailed features
 * Responsive: Full page on mobile, modal on desktop
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

  const portalRoot = document.getElementById('portal-root');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      clickPosition={clickPosition}
      maxWidth="max-w-5xl"
    >
      <div className="bg-[#080808] text-white p-2">
        {/* Platform Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10">
            {platform.icon ? (
              <platform.icon className="text-3xl text-[#E8192C]" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-black text-white tracking-tight">{platform.title}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Base Pillar Fee</span>
              <span className="text-[#E8192C] font-black text-lg">
                ₹{(platform.price || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plans List */}
          <div>
            <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.2em] mb-4">
              Available Plans
            </h3>
            <div className="space-y-3">
              {(platform.plans || []).map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border-2 text-left ${selectedPlan?.id === plan.id
                      ? "bg-[#E8192C]/10 border-[#E8192C]/40 shadow-[0_10px_30px_rgba(232,25,44,0.1)]"
                      : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                    }`}
                >
                  <div
                    className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ${selectedPlan?.id === plan.id
                        ? "bg-[#E8192C] border-transparent shadow-lg"
                        : "bg-white/5 border-white/10"
                      }`}
                  >
                    {plan.icon ? (
                      <plan.icon className={`${selectedPlan?.id === plan.id ? "text-white" : "text-[#E8192C]/60"} text-xl`} />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="font-black text-sm uppercase tracking-tight text-white">
                      {plan.title}
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                        Starts at
                      </span>
                      <span className={`text-sm font-black ${selectedPlan?.id === plan.id ? "text-white" : "text-[#E8192C]"}`}>
                        ₹{(plan.price || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 lg:p-8">
            {selectedPlan ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-[#E8192C]/10 border border-[#E8192C]/20">
                    {selectedPlan.icon ? (
                      <selectedPlan.icon className="text-2xl text-[#E8192C]" />
                    ) : null}
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {selectedPlan.title}
                  </h3>
                </div>

                <div className="mb-8 p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1">Estimated Investment</span>
                  <span className="text-3xl font-black text-white">₹{(selectedPlan.price || 0).toLocaleString()}</span>
                </div>

                {/* Features Section */}
                <div className="flex-1 space-y-6 mb-8 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                  {(() => {
                    const availableFeatures = selectedPlan.availableDetails || selectedPlan.details || [];
                    const unavailableFeatures = selectedPlan.unavailableDetails || [];

                    return (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-[10px] font-black text-[#E8192C] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C]" />
                            Included Perks
                          </h4>
                          <ul className="space-y-3">
                            {availableFeatures.map((d, i) => (
                              <li key={i} className="flex items-start gap-3 text-white/60 text-xs font-medium leading-relaxed">
                                <FaCheckCircle className="text-[#E8192C] mt-0.5 flex-shrink-0" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {unavailableFeatures.length > 0 && (
                          <div>
                            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                              Exclusions
                            </h4>
                            <ul className="space-y-3">
                              {unavailableFeatures.map((d, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/20 text-xs font-medium leading-relaxed">
                                  <FaTimesCircle className="text-white/10 mt-0.5 flex-shrink-0" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <button
                  onClick={() => onApplyPlan(selectedPlan)}
                  className="w-full py-4 rounded-xl bg-white text-[#080808] font-black uppercase tracking-widest text-xs hover:bg-[#E8192C] hover:text-white transition-all shadow-xl"
                >
                  Apply to Selection
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-white/10 text-center space-y-4">
                <MdStars className="text-6xl opacity-20" />
                <p className="text-sm font-black uppercase tracking-widest">Select a plan <br /> to see the impact</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(232, 25, 44, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </Modal>,
    portalRoot
  );
}
