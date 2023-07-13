"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { siteConfig } from "@/config/site"

import { Log, columns } from "./columns"
import { DataTable } from "./data-table"

// Todo clean page + /app/[name]
export default function DemoPage() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  async function getData(): Promise<Log[]> {
    setLoading(true)
    const res = await axios.get(
      `${siteConfig.api.baseUrl}/logs?user=antho&app=eth-gas-alert`
    )
    setLoading(false)
    return res.data
  }

  useEffect(() => {
    getData().then((data) => {
      setLogs(data)
    })
  }, [])

  return (
    <div className="container mx-auto py-10">
      {(loading && <div className="text-center">Loading...</div>) || (
        <DataTable columns={columns} data={logs} />
      )}
    </div>
  )
}
