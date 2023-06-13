import { siteConfig } from "@/config/site"
import { Log, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios"

async function getData(): Promise<Log[]> {
  const res = await axios.get(`${siteConfig.api.baseUrl}/logs`)
  return res.data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
