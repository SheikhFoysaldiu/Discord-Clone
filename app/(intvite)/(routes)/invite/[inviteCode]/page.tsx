import { FC } from "react";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface inviteCodeProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage: FC<inviteCodeProps> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  if (!params.inviteCode) return redirect("/");

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      member: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) return redirect(`/server/${existingServer.id}`);

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      member: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) return redirect(`/server/${server.id}`);

  return null;
};

export default InviteCodePage;
