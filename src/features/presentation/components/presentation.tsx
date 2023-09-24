import { StudentPresentation } from "./student-presentation";
import { TeacherPresentation } from "./teacher-presentation";
import NavigationLayout from "@/components/navigation-layout";
import H1 from "@/components/ui/h1";
import { getCustomServerSession } from "@/features/auth/helpers/custom-session";

export default async function Presentation() {
  const customSession = await getCustomServerSession();
  const isTeacher = customSession?.user?.authLevel === "admin";

  return (
    <NavigationLayout>
      <H1>Presentation</H1>
      {isTeacher ? <TeacherPresentation /> : <StudentPresentation />}
    </NavigationLayout>
  );
}
