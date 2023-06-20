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
      const accountsToReturn = accounts.map((account: any) => ({
        id: account.id,
        name: account.provider.name,
        logo: account.provider.logo,
        fiat_ticker: account.fiat_ticker,
        fiat_value: account.fiat_value,
        ticker: account.balances ? account.balances[0].ticker : "",
        address: account.wallets ? account.wallets[0].address : "",
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
    const userAccount = await prisma.account.findFirst({
      where: {
        account_id: accountId || "",
      },
    });
    if (userAccount) {
      await prisma.account.delete({
        where: {
          id: userAccount.id,
        },
      });
    }
    const response = await fetch(
      `https://api.vezgo.com/v1/accounts/${accountId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + vezgo,
        },
      }
    );
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

export async function POST() {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const headersList = headers();
    const accountId = headersList.get("accountId");
    if (accountId) {
      const user = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
      });
      if (user) {
        await prisma.account.create({
          data: {
            user_id: user.id,
            account_id: accountId,
          },
        });
        return NextResponse.json({
          message: "Account created on system.",
        });
      }
    } else {
      return NextResponse.json({
        message: "Error creating the account on system.",
      });
    }
  } else {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }
}
