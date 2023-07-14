"use client"

import { useEffect, useState } from "react"
import { fetchLogs } from "@/services/logs"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Log } from "@/types/Log"
import { Loader2Icon } from "lucide-react"

export default function AppPage({ params } : { params: { app: string } }) {
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
      await getLogs("antho", params.app)
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      {(loading && <div className="text-center"><Loader2Icon className="w-10 h-10"></Loader2Icon></div>) || (
        <DataTable columns={columns} data={logs} />
      )}
    </div>
  )
}
