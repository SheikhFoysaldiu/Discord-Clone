import { NextRequest, NextResponse } from 'next/server';

import { getCurrentProfile } from '@/lib/profiles/actions';
import { db } from '@/lib/db';

interface Params {
  serverId: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const { name, imageUrl } = await req.json();
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
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
