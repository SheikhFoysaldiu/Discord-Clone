import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server, Member, Profile } from '@prisma/client';
type MemberWithProfiles = Member & {
  profile: Profile;
};

export type ServerWithMembersWithProfiles = Server & {
  member: MemberWithProfiles[];
};
export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
