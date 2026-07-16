import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const SPRING = { stiffness: 200, damping: 18, mass: 0.4 };

/**
 * A button/link that leans gently toward the cursor within its own bounds,
 * then eases back on release. This is the one signature interaction reused
 * across the CTA and Footer so the motion language feels consistent rather
 * than scattered.
 *
 * Usage:
 *   <MagneticButton as="button" className="cta__btn-primary">Shop Online</MagneticButton>
 *   <MagneticButton as="a" href="tel:+919112023456" strength={0.25}>Call us</MagneticButton>
 */
export default function MagneticButton({
  as = 'button',
  className = '',
  strength = 0.35,
  children,
  ...props
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const handleMove = (e) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </MotionTag>
  );
}