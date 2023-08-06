"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, RefreshCcwIcon } from "lucide-react"

import { Event } from "@/types/Event"
import { getTimeAgo } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Events = ({
  events,
  refreshFunction,
}: {
  events: Event[]
  refreshFunction: Function
}) => {
  const [groupedEvents, setGroupedEvents] = useState<Event[][]>([])
  const [allGroupedEvents, setAllGroupedEvents] = useState<Event[][]>([])
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc")
  const [orderKey, setOrderKey] = useState<"count" | "lastSeen">("lastSeen")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([])
  const [allSelectedEvents, setAllSelectedEvents] = useState<Event[]>([])

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
    setAllGroupedEvents(grp)
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

  const openSheet = (events: Event[]) => {
    setSheetOpen(true)
    const selected = events.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    setSelectedEvents(selected)
    setAllSelectedEvents(selected)
  }

  const filterSelectedEvents = (value: string) => {
    setSelectedEvents(
      allSelectedEvents.filter((event) =>
        event.message.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const filterEvents = (value: string) => {
    setGroupedEvents(
      allGroupedEvents.filter((events) =>
        events[0].title.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  useEffect(() => {
    groupEvents()
  }, [events])

  return (
    <div>
      <Sheet open={sheetOpen}>
        <SheetContent size={"lg"}>
          <SheetHeader className="h-full">
            <SheetClose className=""></SheetClose>
            <SheetClose
              onClick={() => setSheetOpen(false)}
              className="outline-none"
            >
              <div className="">
                <ArrowLeft className="h-5 w-5 hover:scale-[1.1]" />
                <span className="sr-only">Close</span>
              </div>
            </SheetClose>
            <SheetTitle></SheetTitle>
            <SheetDescription className="flex flex-col h-full">
              <Input
                placeholder="Search event"
                className="w-full mb-3"
                onChange={(e) => filterSelectedEvents(e.target.value)}
              />
              <Accordion
                type="single"
                collapsible
                className="w-full overflow-y-auto h-full"
              >
                {selectedEvents.map((event, index) => {
                  return (
                    <AccordionItem value={`${`${index}`}`}>
                      <AccordionTrigger>
                        {event.timestamp} |{" "}
                        {getTimeAgo(new Date(event.timestamp).getTime())}
                      </AccordionTrigger>
                      <AccordionContent>{event.message}</AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <div className="flex justify-end p-3">
        <Input
          placeholder="Search event"
          className="w-64 mr-3"
          onChange={(e) => filterEvents(e.target.value)}
        />
        <Button variant={"outline"} onClick={() => refreshFunction()}>
          <RefreshCcwIcon className="w-4 h-4"></RefreshCcwIcon>
        </Button>
      </div>
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
          {groupedEvents.map((events, index) => (
            <TableRow
              key={index}
              onClick={() => openSheet(events)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{events[0].title}</TableCell>
              <TableCell>
                {events[events.length - 1].message.substring(0, 20)}
                {events[events.length - 1].message.length > 20 ? "..." : ""}
              </TableCell>
              <TableCell className="text-right">{events.length}</TableCell>
              <TableCell className="text-right">
                {getTimeAgo(
                  new Date(events[events.length - 1].timestamp).getTime()
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
