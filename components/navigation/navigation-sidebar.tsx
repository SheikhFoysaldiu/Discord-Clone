import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
export const NavigationSideBar = async () => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const server = await db.server.findMany({
    where: {
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return <div></div>;
};
