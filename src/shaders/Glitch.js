import { forwardRef, useMemo } from "react";
import { GlitchEffect } from "./GlitchEffect";
import { a } from "@react-spring/three";
import { GlitchMode } from "postprocessing";

export const Glitch = forwardRef(
  ({ perturbationMap = null, onFinish = null, mode = 0 }, ref) => {
    const effect = useMemo(() => {
      let new_mode = mode > 0.5 ? GlitchMode.DISABLED : GlitchMode.SPORADIC;
      console.log("mode", mode);

      return new GlitchEffect({
        perturbationMap: perturbationMap,
        onFinish: onFinish,
        mode: new_mode,
      });
    }, [perturbationMap, onFinish, mode]);

    return <a.primitive ref={ref} object={effect} dispose={null} />;
  }
);
