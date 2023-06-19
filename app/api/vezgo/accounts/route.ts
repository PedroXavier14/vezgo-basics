import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { refreshToken } from "@/lib/vezgo";
import { headers } from "next/headers";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });
    if (user) {
      const vezgo = await refreshToken(session.user.name || "");

      const response = await fetch("https://api.vezgo.com/v1/accounts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + vezgo,
        },
      });
      const accounts = await response.json();
      const accountsToReturn = accounts.map((account: any, index: number) => ({
        key: (index++).toString(),
        id: account.id,
        name: account.provider.name,
        logo: account.provider.logo,
        fiat_ticker: account.fiat_ticker,
        fiat_value: account.fiat_value,
      }));

      return NextResponse.json({
        accountsToReturn,
      });
    } else {
      return NextResponse.json({
        message: "Please connect a wallet first",
      });
    }
  } else {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const headersList = headers();
    const accountId = headersList.get("accountId");
    const vezgo = await refreshToken(session.user.name || "");
    console.log(accountId, vezgo);
    const response = await fetch(
      `https://api.vezgo.com/v1/accounts/${accountId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + vezgo,
        },
      }
    );
    console.log(response);
    const account = await response.json();
    if (account) {
      return NextResponse.json({
        message: "Account removed successfully",
      });
    }
  } else {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }
}
