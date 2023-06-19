import { authOptions } from "@/lib/auth";
import {
  transactionToMap,
  Transaction,
  TransactionToMap,
} from "@/lib/mappers/transaction-mapper";
import { prisma } from "@/lib/prisma";
import { refreshToken } from "@/lib/vezgo";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true,
      },
    });

    if (user) {
      const accounts = user.accounts;
      let transactions: TransactionToMap[] = [];
      const token = await refreshToken(session.user.name || "");
      for (const account of accounts) {
        const response = await fetch(
          `https://api.vezgo.com/v1/accounts/${account.account_id}/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const accountTransactions = await response.json();
        transactions = transactions.concat(
          accountTransactions.map((trans: Transaction) => {
            return transactionToMap(trans);
          })
        );
      }
      return NextResponse.json({
        transactions,
      });
    } else {
      return NextResponse.json({
        message: "User not found",
      });
    }
  } else {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }
}
