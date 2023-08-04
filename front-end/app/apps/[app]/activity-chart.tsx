import React, { useEffect, useState } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"

import { Log } from "@/types/Log"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          // display: false,
          color: "red",
        },
      },
      xAxis: {
        grid: {
          display: false,
        },
      },
    },
  },
}

export function ActivityChart({ logs }: { logs: Log[] }) {
  const [chartData, setChartData] = useState<any>()

  const fillMissingMinutes = (logs: Log[], countMap: any) => {
    const sortedLogs = logs.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    const firstLogTimestamp = new Date(sortedLogs[0].timestamp)
    console.log(firstLogTimestamp)
    const firstLogUTC = Date.UTC(
      firstLogTimestamp.getUTCFullYear(),
      firstLogTimestamp.getUTCMonth(),
      firstLogTimestamp.getUTCDate(),
      firstLogTimestamp.getUTCHours(),
      firstLogTimestamp.getUTCMinutes(),
      firstLogTimestamp.getUTCSeconds()
    )
    console.log(firstLogUTC)
    const firstLog = new Date(firstLogUTC)
    const lastLogTimestamp = new Date(
      sortedLogs[sortedLogs.length - 1].timestamp
    )
    const lastLogUTC = Date.UTC(
      lastLogTimestamp.getUTCFullYear(),
      lastLogTimestamp.getUTCMonth(),
      lastLogTimestamp.getUTCDate(),
      lastLogTimestamp.getUTCHours(),
      lastLogTimestamp.getUTCMinutes(),
      lastLogTimestamp.getUTCSeconds()
    )
    const lastLog = new Date(lastLogUTC)
    for (let hour = firstLog.getHours(); hour <= lastLog.getHours(); hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const date = new Date(
          firstLog.getFullYear(),
          firstLog.getMonth(),
          firstLog.getDate(),
          hour,
          minute
        )
        let hours = date.getUTCHours()
        let minutes = date.getUTCMinutes()

        // Pad single digit hour and minute values with a leading zero
        const h = hours < 10 ? "0" + hours : hours
        const m = minutes < 10 ? "0" + minutes : minutes

        const time = `${h}:${m}`

        if (!countMap[time]) {
          countMap[time] = 0
        }
      }
    }

    return countMap
  }

  const getTimeString = (date: Date) => {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()} - ${date.getUTCHours()}:${date.getUTCMinutes()}`
  } 

  useEffect(() => {
    let countMap: any = {}
    logs.forEach((log: Log) => {
      const date = new Date(log.timestamp)
      const timestring = getTimeString(date)
      let hours = date.getUTCHours()
      let minutes = date.getUTCMinutes()

      // Pad single digit hour and minute values with a leading zero
      const h = hours < 10 ? "0" + hours : hours
      const m = minutes < 10 ? "0" + minutes : minutes

      const timeString = `${h}:${m}`
      countMap[timeString] = (countMap[timeString] || 0) + 1
    })
    countMap = fillMissingMinutes(logs, countMap)
    const labels = Object.keys(countMap).sort()
    const data = labels.map((label) => countMap[label])
    setChartData({
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data,
          borderColor: "#f0f0f0",
          backgroundColor: "#678cc7",
        },
      ],
    })
  }, [logs])

  return (
    <>
      {chartData && <Line height={"50px"} options={options} data={chartData} />}
    </>
  )
}
