"use client"

import { useEffect, useState } from "react"
import { fetchLogs } from "@/services/logs"
import { Loader2Icon } from "lucide-react"

import { Log } from "@/types/Log"
import { CustomBarChart } from "@/components/barchart"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function AppPage({ params }: { params: { app: string } }) {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState<any[]>([])

  const getLogs = async () => {
    const user = "antho"
    const app = params.app
    setLoading(true)
    const data = await fetchLogs(user, app)
    setLoading(false)
    setLogs(data)
    // calculate how many logs per minute (use log.timestamp)
    const logCountMap = data.reduce((countMap: any, log: any) => {
      // Extract the minute from the timestamp
      const minute = new Date(log.timestamp).getMinutes()

      // Increment the log count for the corresponding minute
      countMap[minute] = (countMap[minute] || 0) + 1

      return countMap
    }, {})

    const orderedLogCount = Object.entries(logCountMap)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([minute, count]) => ({ minute: Number(minute), count }))
    console.log(orderedLogCount)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getLogs()
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      {(loading && (
        <div className="text-center block">
          <img src="/loading.svg" className="w-10 h-10 mx-auto"></img>
        </div>
      )) || (
        <div>
          <h1></h1>
          <CustomBarChart key="count" data={chartData}></CustomBarChart>
          <DataTable columns={columns} data={logs} refreshFunction={getLogs} />
        </div>
      )}
    </div>
  )
}
