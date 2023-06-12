import { Log, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Log[]> {
  return [
    {
        timestamp: "2021-08-01T00:00:00.000Z",
        level: "info",
        message: "This is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info messageThis is an info message",

    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
