"use client";

import { css } from "@kuma-ui/core";
import { useEffect, useState } from "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function Experimental() {
  const [color, setColor] = useState("red");
  useEffect(() => {
    console.log("experimental component mounted");
    const timer = setInterval(() => {
      setColor((color) => (color === "red" ? "blue" : "red"));
    }, 1000);
    return () => {
      console.log("experimental component unmounted");
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="experimental" style={{ "--color": color }}>
      <div
        className={css`
          height: 100px;
          width: 100px;
          background-color: var(--color);

          body & .sub {
            height: 50px;
            width: 50px;
            background-color: green;
          }
        `}
      >
        style
        <div className="sub">YO</div>
      </div>
    </div>
  );
}
