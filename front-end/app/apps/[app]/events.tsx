"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Event } from "@/types/Event"
import { getTimeAgo } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Events = ({ events }: { events: Event[] }) => {
  const [groupedEvents, setGroupedEvents] = useState<Event[][]>([])
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc")
  const [orderKey, setOrderKey] = useState<"count" | "lastSeen">("lastSeen")

  const groupEvents = () => {
    const grp: Event[][] = []
    // group by event.title
    events.forEach((event) => {
      const index = grp.findIndex((g) => g[0].title === event.title)
      if (index === -1) {
        grp.push([event])
      } else {
        grp[index].push(event)
      }
    })
    grp.sort(
      (a, b) =>
        new Date(b[b.length - 1].timestamp).getTime() -
        new Date(a[a.length - 1].timestamp).getTime()
    )
    setGroupedEvents(grp)
  }

  const toggleOrderBy = (key: "count" | "lastSeen") => {
    setOrderKey(key)
    setOrderBy(orderBy === "asc" ? "desc" : "asc")
    if (key === "count") {
      const grp = [...groupedEvents]
      if (orderBy === "asc") grp.sort((a, b) => b.length - a.length)
      else grp.sort((a, b) => a.length - b.length)
      setGroupedEvents(grp)
    } else if (key === "lastSeen") {
      const grp = [...groupedEvents]
      if (orderBy === "asc")
        grp.sort(
          (a, b) =>
            new Date(b[b.length - 1].timestamp).getTime() -
            new Date(a[a.length - 1].timestamp).getTime()
        )
      else
        grp.sort(
          (a, b) =>
            new Date(a[a.length - 1].timestamp).getTime() -
            new Date(b[b.length - 1].timestamp).getTime()
        )
      setGroupedEvents(grp)
    }
  }

  useEffect(() => {
    groupEvents()
  }, [events])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Event</TableHead>
            <TableHead>Last message</TableHead>
            <TableHead
              className="text-right"
              onClick={() => toggleOrderBy("count")}
            >
              <Button variant="ghost">
                Count
                {orderKey === "count" &&
                  (orderBy === "asc" ? (
                    <ChevronUp className="w-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 ml-1" />
                  ))}
              </Button>
            </TableHead>
            <TableHead
              className="text-right"
              onClick={() => toggleOrderBy("lastSeen")}
            >
              <Button variant={"ghost"}>
                Last seen
                {orderKey === "lastSeen" &&
                  (orderBy === "asc" ? (
                    <ChevronUp className="w-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 ml-1" />
                  ))}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedEvents.map((event, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{event[0].title}</TableCell>
              <TableCell>
                {event[event.length - 1].message.substring(0, 20)}
                {event[event.length - 1].message.length > 20 ? "..." : ""}
              </TableCell>
              <TableCell className="text-right">{event.length}</TableCell>
              <TableCell className="text-right">
                {getTimeAgo(
                  new Date(event[event.length - 1].timestamp).getTime()
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
