"use client"

import { siteConfig } from "@/config/site"
import { Log, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios"
import { useEffect, useState } from "react"

// Todo clean page + /app/[name]
export default function DemoPage() {
  const [logs, setLogs] = useState<Log[]>([])

  async function getData(): Promise<Log[]> {
    const res = await axios.get(`${siteConfig.api.baseUrl}/logs?user=antho&app=test-app`)
    return res.data
  }
  
  useEffect(() => {
    getData().then((data) =>{
      setLogs(data)
    })
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={logs} />
    </div>
  )
}
