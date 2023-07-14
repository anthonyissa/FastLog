"use client"

import { useEffect, useState } from "react"
import { fetchLogs } from "@/services/logs"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Log } from "@/model/Log"

// Todo clean page + /app/[name]
export default function DemoPage() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getLogs = async (user: string, app: string) => {
    setLoading(true)
    const data = await fetchLogs(user, app)
    setLoading(false)
    setLogs(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getLogs("antho", "eth-gas-alert")
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      {(loading && <div className="text-center">Loading...</div>) || (
        <DataTable columns={columns} data={logs} />
      )}
    </div>
  )
}
