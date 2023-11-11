"use client";

import { ActivityChart } from "./activity-chart";
import { DataTable } from "./data-table";
import { Events } from "./events";
import { AppHeader } from "./header";
import { Settings } from "./settings";
import withAuth from "@/app/auth/auth";
import { useAppContext } from "@/app/session-context";
import { Loading } from "@/components/loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchApp } from "@/services/apps";
import { fetchEvents } from "@/services/events";
import { fetchLogs } from "@/services/logs";
import { App } from "@/types/App";
import { Log } from "@/types/Log";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function AppPage({ params }: { params: { app: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTable, setLoadingTable] = useState<boolean>(true);

  const [logs, setLogs] = useState<Log[]>([]);
  const [app, setApp] = useState<App>();
  const [events, setEvents] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const { userId } = useAppContext();
  const [currentTab, setCurrentTab] = useState("logs");

  const getApp = async () => {
    const data = await fetchApp(params.app);
    setApp(data);
  };

  const getEvents = async () => {
    const data = await fetchEvents(params.app);
    setEvents(data);
  };

  const getLogs = async ({
    search,
    page,
  }: {
    search?: string;
    page?: number;
  }) => {
    const data = await fetchLogs({ id: params.app, search, page });
    setLogs(data);
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
  };

  const fetchData = async () => {
    setLoadingTable(true);
    await getLogs({});
    await getEvents();
    await getApp();
    setLoadingTable(false);
  };

  const loadMore = async ({
    page,
    search,
  }: {
    page: number;
    search: string;
  }) => {
    const data = await fetchLogs({ id: params.app, page, search });
    setLogs([...logs, ...data]);
  };

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchData().catch(console.error);
    setLoading(false);
  }, [userId]);

  const setTab = (tab: string) => {
    setCurrentTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("t", tab);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  };

  useEffect(() => {
    // query params for tabs
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("t");
    if (tab != "logs" && tab != "webhooks" && tab != "settings") {
      setCurrentTab("logs");
    } else setCurrentTab(tab ?? "logs");
  }, []);

  return (
    <div className="container mx-auto py-5">
      {(loading && <Loading />) || (
        <div>
          {logs.length != 0 && <ActivityChart logs={logs}></ActivityChart>}
          {app && <AppHeader app={app} />}
          <Tabs defaultValue={currentTab} className="w-full">
            <TabsList className="grid w-auto grid-cols-4 mb-3">
              <TabsTrigger value="logs" onClick={() => setTab("logs")}>
                <Link className="w-full" href={`?t=logs`}>
                  Logs
                </Link>
              </TabsTrigger>
              <TabsTrigger value="events" onClick={() => setTab("events")}>
                <Link className="w-full" href={`?t=events`}>
                  Events
                </Link>
              </TabsTrigger>
              <TabsTrigger value="settings" onClick={() => setTab("settings")}>
                <Link className="w-full" href={`?t=settings`}>
                  Settings
                </Link>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="logs">
              {(loadingTable && <Loading />) || (
                <DataTable
                  data={logs.sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )}
                  refreshFunction={fetchData}
                  searchFunction={getLogs}
                  loadMoreFunction={loadMore}
                />
              )}
            </TabsContent>
            <TabsContent value="settings">
              {app && <Settings app={app} changeSettingsCallback={getApp} />}
            </TabsContent>
            <TabsContent value="events">
              {(loadingTable && <Loading />) ||
                (app && <Events events={events} refreshFunction={fetchData} />)}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default withAuth(AppPage);
