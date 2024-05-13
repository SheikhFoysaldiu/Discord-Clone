import { v4 as uuidv4 } from 'uuid';

import { getCurrentProfile } from '@/lib/profiles/actions';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Params {
  serverId: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
