"use client"

import { Log } from "@/types/Log"
import { ColumnDef } from "@tanstack/react-table"

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
