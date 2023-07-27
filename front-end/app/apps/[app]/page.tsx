"use client"

import { useEffect, useState } from "react"
import { fetchApp } from "@/services/apps"
import { fetchLogs } from "@/services/logs"
import { Loader2Icon } from "lucide-react"

import { App } from "@/types/App"
import { Log } from "@/types/Log"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loading } from "@/components/loading"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { AppHeader } from "./header"
import { Settings } from "./settings"

export default function AppPage({ params }: { params: { app: string } }) {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingTable, setLoadingTable] = useState<boolean>(true)
  const [app, setApp] = useState<App>()
  const [chartData, setChartData] = useState<any[]>([])

  const getApp = async () => {
    const data = await fetchApp(params.app)
    setApp(data)
  }

  const getLogs = async () => {
    setLoadingTable(true)
    const user = "antho"
    const data = await fetchLogs(user, params.app)
    setLogs(data)
    // // calculate how many logs per minute (use log.timestamp)
    // const logCountMap = data.reduce((countMap: any, log: any) => {
    //   // Extract the minute from the timestamp
    //   const minute = new Date(log.timestamp).getMinutes()

    //   // Increment the log count for the corresponding minute
    //   countMap[minute] = (countMap[minute] || 0) + 1

    //   return countMap
    // }, {})

    // const orderedLogCount = Object.entries(logCountMap)
    //   .sort((a, b) => Number(a[0]) - Number(b[0]))
    //   .map(([minute, count]) => ({ minute: Number(minute), count }))
    setLoadingTable(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getLogs()
      await getApp()
      setLoading(false)
    }
    fetchData().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto py-10">
      {(loading && <Loading />) || (
        <div>
          {app && <AppHeader app={app} />}
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-auto grid-cols-4">
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              {(loadingTable && <Loading />) || (
                <DataTable
                  columns={columns}
                  data={logs}
                  refreshFunction={getLogs}
                />
              )}
            </TabsContent>
            <TabsContent value="settings">
              {app && <Settings app={app} changeSettingsCallback={getApp} />}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
