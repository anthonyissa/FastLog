"use client"

import { Badge } from "./ui/badge"

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <>
      {status === "UP" && (
        <Badge variant="default" className="bg-green-500 hover:bg-green-500 max-h-5">
          {status}
        </Badge>
      )}
      {status === "DOWN" && (
        <Badge variant="destructive" className="bg-red-700 hover:bg-red-700 max-h-5">
          {status}
        </Badge>
      )}
    </>
  )
}
