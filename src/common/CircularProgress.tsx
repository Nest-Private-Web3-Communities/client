import React from "react";
import { twMerge } from "tailwind-merge";

export default function CircularProgress(props: {
  className?: string;
  size: number;
  progress: number;
  bgColor?: string;
  fgColor?: string;
  thickness?: number;
}) {
  return (
    <svg width={props.size} height={props.size} className="-rotate-90">
      <circle
        cx={props.size * 0.5}
        cy={props.size * 0.5}
        r={props.size * 0.5 - (props.thickness || 0)}
        style={{
          fill: props.bgColor || "rgb(var(--color-foreground))",
          stroke: props.fgColor || "rgb(var(--color-primary))",
          strokeWidth: props.thickness || 3,
          strokeDasharray: 100,
          strokeDashoffset: (1 - props.progress) * 100,
        }}
      />
    </svg>
  );
}
