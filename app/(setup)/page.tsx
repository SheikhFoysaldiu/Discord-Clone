import { InitialModal } from "@/components/modals/Initial-modal";
import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await InitialProfile();

  const server = await db.server.findFirst({
    where: {
      member: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });
  if (server) return redirect(`/server/${server.id}`);

  return <InitialModal />;
};

export default SetupPage;
