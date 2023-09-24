"use client";

import { setPosition } from "../actions/set-position";
import { Button } from "@/components/ui/button";

export function StartPresentationButton() {
  return (
    <Button
      onClick={() => {
        console.log("create presentation button clicked");
        setPosition(1);
      }}
    >
      Create Presentation
    </Button>
  );
}
