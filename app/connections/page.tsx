'use client';

import Menu from "@/components/Menu";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Vezgo from "vezgo-sdk-js";
import { Col, Row, Table, User } from "@nextui-org/react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { Trash } from "@phosphor-icons/react";



interface AccountType {
  key: string,
  id: string,
  name: string,
  logo: string,
  fiat_ticker: string,
  fiat_value: string,
  [key: string]: any;
}

const vezgo = Vezgo.init({
  clientId: '8feoadnpj6l4lnharb9lndli1',
  secret: 'umm7a960kigmt0hgoe43gb5fjcdrkhuu57tt0jbcrktqb4q0rul',
  authEndpoint: '/api/auth/vezgo'
});

export default function Connections(){


  const {data: session} = useSession({
    required: true
  });

  const [accounts, setAccounts] = useState<AccountType[]>([]);

  useEffect(() => {
    fetch('/api/vezgo/accounts')
      .then(res => res.json())
      .then((response) => {
        setAccounts(response.accountsToReturn);
      });
  }, []);

  const handleClick = () => {
    vezgo.connect().onConnection(async (account: any) => {
      console.log('Connection successful', account)
      window.location.reload();
    })
    .onError((error: any) => {
      console.error('Connection error', error)
    });
  };

  const handleDelete = (accountId: string) => {
    fetch('/api/vezgo/accounts', {
      method: 'DELETE',
      headers: {
        'accountId': accountId
      }
    })
      .then(res => res.json())
      .then((response) => {
        console.log(response);
      })
  }

  const columns = [
    {
      uid: "id",
      name: "ID"
    },
    {
      uid: "name",
      name: "Name",
    },
    {
      uid: "fiat_value",
      name: "Fiat Value"
    },
    {
      uid: "fiat_ticker",
      name: "Fiat Ticker"
    },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = (account: AccountType, columnKey: React.Key) => {
    const cellValue = account[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User squared src={account.logo} name={cellValue} css={{ p: 0 }}>
            {account.name}
          </User>
        );
      case "actions": 
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
              >
                <IconButton onClick={() => handleDelete(account.id)}>
                  <Trash size={32} />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        )
      default:
        return cellValue;
    }
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="m-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
        Create new Connections
      </button>

      <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
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
          <Table.Body items={accounts || []}>
            {(item: AccountType) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
      </Table>
      

    </>
  )
}