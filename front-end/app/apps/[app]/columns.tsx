"use client"

import { Log } from "@/types/Log"
import { ColumnDef } from "@tanstack/react-table"
import { DateRange } from "react-day-picker"

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "level",
    header: "Level",
    enableResizing: true
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    filterFn: (row, filterValue) => {console.log(filterValue); return true},
  },
  {
    accessorKey: "message",
    header: "Message",

  },
]