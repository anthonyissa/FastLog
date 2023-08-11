"use client"

import { useEffect, useState } from "react"
import { fetchApp } from "@/services/apps"
import { fetchLogs } from "@/services/logs"
import { Loader2Icon } from "lucide-react"

import { App } from "@/types/App"
import { Log } from "@/types/Log"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loading } from "@/components/loading"

import { ActivityChart } from "./activity-chart"
import { DataTable } from "./data-table"
import { AppHeader } from "./header"
import { Settings } from "./settings"
import withAuth from "@/app/auth/auth"
import { useAppContext } from "@/app/session-context"
import { Events } from "./events"
import { fetchEvents } from "@/services/events"

function AppPage({ params }: { params: { app: string } }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingTable, setLoadingTable] = useState<boolean>(true)

  const [logs, setLogs] = useState<Log[]>([])
  const [app, setApp] = useState<App>()
  const [events, setEvents] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const { userId } = useAppContext()

  const getApp = async () => {
    const data = await fetchApp(params.app)
    setApp(data)
  }

  const getEvents = async () => {
    const data = await fetchEvents(params.app)
    setEvents(data)
  }

  const getLogs = async () => {
    const data = await fetchLogs(params.app)
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
  }

  const fetchData = async () => {
    setLoadingTable(true)
    await getLogs()
    await getEvents()
    await getApp()
    setLoadingTable(false)
  }

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetchData().catch(console.error)
    setLoading(false)
  }, [userId])

  return (
    <div className="container mx-auto py-5">
      {(loading && <Loading />) || (
        <div>
          {logs.length != 0 && <ActivityChart logs={logs}></ActivityChart>}
          {app && <AppHeader app={app} />}
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-auto grid-cols-4 mb-3">
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              {(loadingTable && <Loading />) || (
                <DataTable
                  data={logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())}
                  refreshFunction={fetchData}
                />
              )}
            </TabsContent>
            <TabsContent value="settings">
              {app && <Settings app={app} changeSettingsCallback={getApp} />}
            </TabsContent>
            <TabsContent value="events">
            {(loadingTable && <Loading />) || (
              app && <Events events={events} refreshFunction={fetchData} />
            )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}

export default withAuth(AppPage)