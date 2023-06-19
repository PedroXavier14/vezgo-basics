"use client";
import Menu from "@/components/Menu";
import { TransactionToMap } from "@/lib/mappers/transaction-mapper";
import { Table } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Transactions(){

  const {data: session} = useSession({
    required: true
  });

  const [transactions, setTransactions] = useState<TransactionToMap[]>([]);

  useEffect(() => {
    fetch('/api/vezgo/transactions')
      .then(res => res.json())
      .then(response => {
        setTransactions(response.transactions)
      })
  }, []);

  const columns = [
    {
      uid: "transactionType",
      name: "Transaction Type"
    },
    {
      uid: "transactionHash",
      name: "Transaction Hash"
    },
    {
      uid: "initiatedAt",
      name: "Initiated At"
    },
    {
      uid: "direction",
      name: "Direction"
    },
    {
      uid: "ticker",
      name: "Ticker"
    },
    {
      uid: "providerTicker",
      name: "Provider Ticker"
    },
    {
      uid: "tickerAddress",
      name: "Ticker Address"
    },
    {
      uid: "amount",
      name: "Amount"
    },
    {
      uid: "fiatValue",
      name: "Fiat Value"
    },
    {
      uid: "fiatTicker",
      name: "Fiat Ticker"
    },
    {
      uid: "toAddress",
      name: "To Address"
    },
    {
      uid: "fromAddress",
      name: "From Address"
    },
    // {
    //   uid: "otherParties",
    //   name: "Other Parties"
    // },
    {
      uid: "feeTicker",
      name: "Fee Ticker"
    },
    {
      uid: "feeProviderTicker",
      name: "Fee Provider Ticker"
    },
    {
      uid: "feeAmount",
      name: "Fee Amount"
    },
    {
      uid: "feeFiatValue",
      name: "Fee Fiat Value"
    },
    {
      uid: "feeFiatTicker",
      name: "Fee Fiat Ticker"
    }
  ]



  return (
    <>
      <Table
        lined
        sticked
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          minWidth: "100%"
        }}
        fixed="true"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column 
              key={column.uid}
              >
                {column.name}
              </Table.Column>
          )}
        </Table.Header>
       <Table.Body items={transactions || []}>
          {(item) => (
            <Table.Row key={item.id}>
              {(columnKey) => <Table.Cell css={{zIndex: 0}}>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </>
  )
}