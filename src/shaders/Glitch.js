import { forwardRef, useMemo } from "react";
import { GlitchEffect } from "./GlitchEffect";

export const Glitch = forwardRef(
  ({ perturbationMap = null, onFinish = null }, ref) => {
    const effect = useMemo(
      () =>
        new GlitchEffect({
          perturbationMap: perturbationMap,
          onFinish: onFinish,
        }),
      [perturbationMap, onFinish]
    );

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);
