import React, { useEffect, useRef, useState } from "react";
import MicroscopeIcon from "./MicroscopeIcon";
import TestTubeIcon from "./TestTubeIcon";
import DnaIcon from "./DnaIcon";
import FlaskIcon from "./FlaskIcon";
import PetriDishIcon from "./PetriDishIcon";
import MicrobeIcon from "./MicrobeIcon";
import TelescopeIcon from "./TelescopeIcon";
import SatelliteDishIcon from "./SatelliteDishIcon";
import AtomIcon from "./AtomIcon";
import BrainIcon from "./BrainIcon";
import LightBulbIcon from "./LightBulbIcon";
import BatteryIcon from "./BatteryIcon";
import ThermometerIcon from "./ThermometerIcon";
import CompassIcon from "./CompassIcon";
import RocketIcon from "./RocketIcon";
import UfoIcon from "./UfoIcon";
import SatelliteIcon from "./SatelliteIcon";
import CometIcon from "./CometIcon";
import CrescentMoonIcon from "./CrescentMoonIcon";
import StarIcon from "./StarIcon";
import SaturnPlanetIcon from "./SaturnPlanetIcon";
import EarthGlobeIcon from "./EarthGlobeIcon";
import AstronautIcon from "./AstronautIcon";

const NAVBAR_ICONS = [
  MicroscopeIcon,     // 🔬 1
  TestTubeIcon,       // 🧪 2
  DnaIcon,            // 🧬 3
  FlaskIcon,          // ⚗️ 4
  PetriDishIcon,      // 🧫 5
  MicrobeIcon,        // 🦠 6
  TelescopeIcon,      // 🔭 7
  SatelliteDishIcon,  // 📡 8
  AtomIcon,           // ⚛️ 9
  BrainIcon,          // 🧠 10
  LightBulbIcon,      // 💡 11
  BatteryIcon,        // 🔋 12
  ThermometerIcon,    // 🌡️ 13
  CompassIcon,        // 🧭 14
  RocketIcon,         // 🚀 15
  UfoIcon,            // 🛸 16
  SatelliteIcon,      // 🛰️ 17
  CometIcon,          // ☄️ 18
  CrescentMoonIcon,   // 🌙 19
  StarIcon,           // ⭐ 20
  SaturnPlanetIcon,   // 🪐 21
  EarthGlobeIcon,     // 🌍 22
  TelescopeIcon,      // 🔭 23
  AstronautIcon,      // 👨‍🚀 24
  AtomIcon            // ⚛️ 25
];

const ICON_LIFETIME = 30000; // 30 seconds

export default function NavbarIconSystem() {
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // DOM Refs for zero-rerender direct transform manipulation
  const stageRef = useRef(null);
  const positionRef = useRef(null);

  // Physics & Time Refs
  const rafIdRef = useRef(null);
  const startTimeRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Icon Physics State
  const posRef = useRef({ x: 160, y: 34 });
  const velRef = useRef({ vx: 0, vy: 0 }); // Carrom hit impulse velocity
  const baseDriftXRef = useRef(160);
  const driftDirRef = useRef(1); // 1 = right, -1 = left

  // Cursor (Striker) Lightweight Tracking
  const cursorRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    lastTime: 0,
    isInside: false
  });

  // 1. Desktop Breakpoint Protection
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // 2. 30-Second Icon Lifecycle Cycle (Preserving motion state across icon swaps)
  useEffect(() => {
    if (!isDesktop) return;

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, ICON_LIFETIME - 300);

    const swapTimer = setTimeout(() => {
      setActiveIconIndex((prev) => (prev + 1) % NAVBAR_ICONS.length);
      setIsFadingOut(false);
    }, ICON_LIFETIME);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(swapTimer);
    };
  }, [activeIconIndex, isDesktop]);

  // 3. Lightweight Pointer Movement Listener
  useEffect(() => {
    if (!isDesktop) return;

    const navbarElement = stageRef.current?.closest(".desktop-navbar") || stageRef.current?.parentElement;
    if (!navbarElement) return;

    const handlePointerMove = (e) => {
      if (e.pointerType === "touch") return; // Ignore touch events
      const rect = navbarElement.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const now = performance.now();

      const prev = cursorRef.current;
      if (prev.lastTime > 0) {
        const dt = Math.max((now - prev.lastTime) / 1000, 0.005);
        const cVx = (currentX - prev.lastX) / dt;
        const cVy = (currentY - prev.lastY) / dt;

        cursorRef.current = {
          x: currentX,
          y: currentY,
          vx: cVx,
          vy: cVy,
          lastX: currentX,
          lastY: currentY,
          lastTime: now,
          isInside: true
        };
      } else {
        cursorRef.current = {
          x: currentX,
          y: currentY,
          vx: 0,
          vy: 0,
          lastX: currentX,
          lastY: currentY,
          lastTime: now,
          isInside: true
        };
      }
    };

    const handlePointerLeave = () => {
      cursorRef.current.isInside = false;
      cursorRef.current.lastTime = 0;
    };

    navbarElement.addEventListener("pointermove", handlePointerMove, { passive: true });
    navbarElement.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      navbarElement.removeEventListener("pointermove", handlePointerMove);
      navbarElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isDesktop]);

  // 4. Physics RAF Loop: Slow Floating Drift + Mouse Impulse + Overlap Prevention
  useEffect(() => {
    if (!isDesktop) return;

    let isCancelled = false;

    const runPhysicsLoop = (timestamp) => {
      if (isCancelled) return;

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.05); // Clamp max dt
      const t = (timestamp - startTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const stage = stageRef.current;
      if (stage && positionRef.current) {
        const stageWidth = stage.clientWidth || 900;
        const stageHeight = stage.clientHeight || 68;

        const minX = 26;
        const maxX = Math.max(minX + 30, stageWidth - 26);
        const minY = 18;
        const maxY = Math.max(minY + 10, stageHeight - 20);
        const centerY = stageHeight / 2;

        // --- 1. MOUSE IMPACT & OVERLAP PREVENTION ---
        const cursor = cursorRef.current;
        if (cursor.isInside) {
          const dx = posRef.current.x - cursor.x;
          const dy = posRef.current.y - cursor.y;
          const dist = Math.hypot(dx, dy);
          const collisionRadius = 34; // Mouse cannot overlap on top of icon

          if (dist < collisionRadius) {
            // Immediate Overlap Push
            const overlap = collisionRadius - dist;
            const nx = dist > 0.1 ? dx / dist : (Math.random() > 0.5 ? 1 : -1);
            const ny = dist > 0.1 ? dy / dist : (Math.random() > 0.5 ? 1 : -1);

            posRef.current.x += nx * overlap;
            posRef.current.y += ny * overlap;

            // Striker Impulse: Impart momentum if mouse is moving
            const cursorSpeed = Math.hypot(cursor.vx, cursor.vy);
            if (cursorSpeed > 15) {
              const impulseMag = Math.min(cursorSpeed * 0.85 + 40, 260); // Cap max hit speed
              velRef.current.vx = nx * impulseMag;
              velRef.current.vy = ny * impulseMag;
            }
          }
        }

        // --- 2. FRICTION DECAY ---
        velRef.current.vx *= Math.pow(0.015, dt);
        velRef.current.vy *= Math.pow(0.015, dt);

        posRef.current.x += velRef.current.vx * dt;
        posRef.current.y += velRef.current.vy * dt;

        // --- 3. ELASTIC WALL BOUNCING ---
        if (posRef.current.x <= minX) {
          posRef.current.x = minX;
          velRef.current.vx = -velRef.current.vx * 0.8;
          driftDirRef.current = 1;
        } else if (posRef.current.x >= maxX) {
          posRef.current.x = maxX;
          velRef.current.vx = -velRef.current.vx * 0.8;
          driftDirRef.current = -1;
        }

        if (posRef.current.y <= minY) {
          posRef.current.y = minY;
          velRef.current.vy = -velRef.current.vy * 0.8;
        } else if (posRef.current.y >= maxY) {
          posRef.current.y = maxY;
          velRef.current.vy = -velRef.current.vy * 0.8;
        }

        // --- 4. VERY SLOW, PEACEFUL FLOATING DRIFT ---
        const slowDriftSpeed = 0.18;
        baseDriftXRef.current += driftDirRef.current * slowDriftSpeed;
        if (baseDriftXRef.current >= maxX - 35) driftDirRef.current = -1;
        if (baseDriftXRef.current <= minX + 35) driftDirRef.current = 1;

        // Gentle sinusoidal wave float
        const waveX = Math.sin(t * 0.35) * 18 + Math.cos(t * 0.15) * 10;
        const waveY = Math.sin(t * 0.7) * 7 + Math.cos(t * 0.25) * 4;

        const currentHitSpeed = Math.hypot(velRef.current.vx, velRef.current.vy);
        const floatWeight = Math.max(0, 1 - currentHitSpeed / 50);

        if (floatWeight > 0) {
          baseDriftXRef.current += (posRef.current.x - baseDriftXRef.current) * 0.04;
          const targetX = baseDriftXRef.current + waveX;
          const targetY = centerY + waveY;

          posRef.current.x += (targetX - posRef.current.x) * floatWeight * 0.08;
          posRef.current.y += (targetY - posRef.current.y) * floatWeight * 0.08;
        }

        // Final Clamp inside bounds
        const renderX = Math.max(minX, Math.min(maxX, posRef.current.x));
        const renderY = Math.max(minY, Math.min(maxY, posRef.current.y));

        // Direct DOM Transform Update (0 React state rerenders!)
        positionRef.current.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
      }

      if (!document.hidden) {
        rafIdRef.current = requestAnimationFrame(runPhysicsLoop);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
        rafIdRef.current = requestAnimationFrame(runPhysicsLoop);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    rafIdRef.current = requestAnimationFrame(runPhysicsLoop);

    return () => {
      isCancelled = true;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const ActiveSvgComponent = NAVBAR_ICONS[activeIconIndex];

  return (
    <div className="navbar-icon-stage" ref={stageRef} aria-hidden="true">
      <div className="navbar-icon-position" ref={positionRef}>
        <div
          className="navbar-icon-appearance"
          style={{ opacity: isFadingOut ? 0 : 1 }}
        >
          <ActiveSvgComponent />
        </div>
      </div>
    </div>
  );
}
