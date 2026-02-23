import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
      {/* Platform Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex items-center justify-center p-2 sm:p-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
          {platform.icon ? (
            <platform.icon className="text-2xl sm:text-4xl text-white" />
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{platform.title}</h2>
          <div className="flex items-baseline gap-1 sm:gap-2 mt-0.5 sm:mt-1">
            <span className="text-purple-200/70 text-xs font-medium">
              from
            </span>
            <span className="text-purple-200 font-bold text-sm sm:text-lg">
              ₹{(platform.price || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        {/* Plans List */}
        <div>
          <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Choose a Plan:
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {(platform.plans || []).map((plan) => (
              <button
                key={plan.id}
                onClick={() => onSelectPlan(plan)}
                className={`w-full flex items-center gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 backdrop-blur-xl border-2 text-left ${
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
                    <plan.icon className="text-white text-lg sm:text-xl" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base transition-colors text-white">
                    {plan.title}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-medium transition-colors text-purple-200/60">
                      from
                    </span>
                    <span className="text-xs sm:text-sm font-medium transition-colors text-purple-200">
                      ₹{(plan.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Plan Details */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6">
          {selectedPlan ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                  {selectedPlan.icon ? (
                    <selectedPlan.icon className="text-2xl sm:text-3xl text-white" />
                  ) : null}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedPlan.title}
                </h3>
              </div>

              <p className="text-lg sm:text-xl font-semibold text-purple-200 mb-6 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <span className="text-xs sm:text-sm text-purple-200/70 font-medium">Starting from </span>
                ₹{(selectedPlan.price || 0).toLocaleString()}
              </p>

              {/* Features Section with Auto-Split Layout */}
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

                const shouldSplitAvailable =
                  !hasUnavailable && availableFeatures.length > 6;
                const midPoint = Math.ceil(availableFeatures.length / 2);
                const leftAvailable = shouldSplitAvailable
                  ? availableFeatures.slice(0, midPoint)
                  : availableFeatures;
                const rightAvailable = shouldSplitAvailable
                  ? availableFeatures.slice(midPoint)
                  : [];

                return (
                  <div
                    className={`${
                      hasUnavailable || shouldSplitAvailable
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
                        : "mb-6"
                    }`}
                  >
                    {/* Available Features */}
                    <div>
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <FaCheckCircle className="text-green-400" />
                        {hasUnavailable ? "Included" : "Features"}
                      </h4>
                      <ul className="space-y-2">
                        {leftAvailable.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-white/90 text-xs sm:text-sm"
                          >
                            <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0 text-xs" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Side - Either Unavailable Features OR Second Half */}
                    {hasUnavailable ? (
                      <div>
                        <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2 text-sm sm:text-base">
                          <FaTimesCircle className="text-red-400" />
                          Not Included
                        </h4>
                        <ul className="space-y-2">
                          {unavailableFeatures.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-white/60 text-xs sm:text-sm"
                            >
                              <FaTimesCircle className="text-red-400 mt-0.5 flex-shrink-0 text-xs" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : shouldSplitAvailable ? (
                      <div>
                        <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2 opacity-0 text-sm sm:text-base">
                          <FaCheckCircle className="text-green-400" />
                          Features
                        </h4>
                        <ul className="space-y-2">
                          {rightAvailable.map((d, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-white/90 text-xs sm:text-sm"
                            >
                              <FaCheckCircle className="text-green-400 mt-0.5 flex-shrink-0 text-xs" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })()}

              <button
                onClick={() => onApplyPlan(selectedPlan)}
                className="w-full flex items-center justify-center gap-3 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 bg-[#371445] hover:bg-[#4a1d5a] text-white text-sm sm:text-base"
              >
                <span>Apply Plan</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/50 text-center py-8">
              <div>
                <FaCheckCircle className="text-4xl sm:text-5xl mx-auto mb-3 opacity-30" />
                <p className="text-sm sm:text-base">Select a plan to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>,
    portalRoot
  );
}
