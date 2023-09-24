import { StartPresentationButton } from "./start-presentation-button";
import { redis } from "@/helpers/redis";

export async function TeacherPresentation() {
  const position = (await redis.get("position")) as string;
  console.log({ position });

  return (
    <>
      <p>teacher presentation</p>

      {!position ? <StartPresentationButton /> : <EndPresentationButton />}
    </>
  );
}
