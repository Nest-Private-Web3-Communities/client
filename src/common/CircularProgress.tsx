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

  // const circleStyle = {
  //   cx: "var(--half-size)",
  //   cy: "var(--half-size)",
  //   r: "var(--radius)",
  //   strokeWidth: "var(--stroke-width)",
  //   fill: "none",
  //   strokeLinecap: "round",
  // } as React.CSSProperties;
  // return (
  //   <svg
  //     width="250"
  //     height="250"
  //     viewBox="0 0 250 250"
  //     className={twMerge(props.className, "circular-progress")}
  //     style={
  //       {
  //         "--progress": props.progress * 100,
  //         "--size": props.size,
  //         "--half-size": "calc(var(--size) / 2)",
  //         "--stroke-width": "20px",
  //         "--radius": "calc((var(--size) - var(--stroke-width)) / 2)",
  //         "--circumference": "calc(var(--radius) * pi * 2)",
  //         "--dash": "calc((var(--progress) * var(--circumference)) / 100)",
  //       } as React.CSSProperties
  //     }
  //   >
  //     <circle
  //       style={{
  //         ...circleStyle,
  //         stroke: props.bgColor || "rgb(var(--color-foreground))",
  //       }}
  //       cx="var(--half-size)"
  //       cy="var(--half-size)"
  //       r="var(--radius)"
  //     />
  //     <circle
  //       style={{
  //         ...circleStyle,
  //         stroke: props.bgColor || "rgb(var(--color-primary))",
  //         transform: "rotate(-90deg)",
  //         transformOrigin: "var(--half-size) var(--half-size)",
  //         strokeDasharray:
  //           "var(--dash) calc(var(--circumference) - var(--dash))",
  //         transition: "stroke-dasharray 0.3s linear 0s",
  //       }}
  //     />
  //   </svg>
  // );
}
