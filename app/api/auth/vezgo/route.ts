import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { vezgo } from "@/lib/vezgo";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.name) {
    const user = vezgo.login(session.user.name);
    const token = await user.getToken({
      minimumLifetime: Number.MAX_SAFE_INTEGER,
    });
    const dbUser = await prisma.user.findFirst({
      where: {
        email: session.user.email || "",
      },
    });
    if (dbUser) {
      await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          vezgo: token,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email: session.user.email || "",
          name: session.user.name,
          vezgo: token,
        },
      });
    }

    return NextResponse.json({
      token,
    });
  } else {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }
}
