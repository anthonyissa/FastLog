import * as React from "react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

export function CustomBarChart({ data, key }: { data: any[]; key: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey={key} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
