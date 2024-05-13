import { Server } from '@prisma/client';
import { db } from '../db';


export async function getAllUserServers(profileId: string): Promise<Server[]> {
  return await db.server.findMany({
    where: {
      profileId,
    },
  });
}

export async function getFirstServerByProfileId(profileId: string) {
  return await db.server.findFirst({
    where: {
      member: {
        some: {
          profileId,
        },
      },
    },
  });
}

export async function findServer(serverId: string, profileId: string) {
  
  return await db.server.findUnique({
    where: {
      id: serverId,
      member: {
        some: {
          profileId: profileId,
        },
      },
    },
  });
}

export async function getServer(serverId: string) {
  return await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channel: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      member: {
        include: {
          profile: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  });
}
