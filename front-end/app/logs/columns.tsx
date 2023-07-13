"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Log = {
  id: number
  timestamp: string
  level: string
  message: string
}

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "level",
    header: "Level",
    enableResizing: true
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "message",
    header: "Message",

  },
]
