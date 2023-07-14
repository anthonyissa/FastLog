"use client"

import { App } from "@/model/App"
import { fetchApps } from "@/services/apps"
import { useEffect, useState } from "react"

export default function AppsPage() {
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getApps = async (user: string) => {
    setLoading(true)
    const data = await fetchApps(user)
    setLoading(false)
    setApps(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      await getApps("antho")
    }
    fetchData().catch(console.error)
  }, [])

  return <div className="container mx-auto py-10">
    {(loading && <div className="text-center">Loading...</div>) || (
        <div className="grid grid-cols-3 gap-4">
            {apps.map(app => <div className="bg-white shadow-md rounded-md p-4">
                <div className="text-xl font-bold">{app.name}</div>
                <div className="text-gray-500">{app.description}</div>
            </div>)}
        </div>
    )}
  </div>
}
