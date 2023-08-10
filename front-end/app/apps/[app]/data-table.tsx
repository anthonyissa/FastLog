"use client"

import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowLeft, RefreshCcwIcon, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { convertLogMessageToMap, getTimeAgo, isObjectString } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  refreshFunction,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  refreshFunction: Function
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [filterValue, setFilterValue] = useState<string>("")
  const [timeframe, setTimeframe] = useState<DateRange>()
  const [savedData, setSavedData] = useState<TData[]>(data)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  const [sheetOpen, setSheetOpen] = useState(false)
  const [formattedLog, setFormattedLog] = useState<{}>({})

  const filter = (value: string) => {
    setFilterValue(value)
    table.setGlobalFilter(value)
  }

  const openSheet = (row: Row<TData>) => {
    setFormattedLog({})
    let newLog = {}
    row.getVisibleCells().forEach((cell) => {
      newLog = {
        ...newLog,
        [cell.column.id]: cell.getValue(),
      }
    })
    // @ts-ignore
    if (isObjectString(newLog["message"])) {
      // @ts-ignore
      const detailedMessage = convertLogMessageToMap(newLog["message"])
      detailedMessage.forEach((value, key) => {
        newLog = {
          ...newLog, // @ts-ignore
          ["log." + key]: value,
        }
      })
    }
    setFormattedLog(newLog)
    setSheetOpen(true)
  }

  const changeTimeframe = (selected: DateRange | undefined) => {
    setTimeframe(selected)
    if (!selected || !selected.to) return;
    if (selected.from === selected.to) selected.to = new Date(selected!.from!.getTime() + 86400000) // add 1 day
    table.setColumnFilters([{
      id: "timestamp",
      value: selected
    }])
  }

  return (
    <div>
      <Sheet open={sheetOpen}>
        <SheetContent size={"lg"}>
          <SheetHeader>
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
            {/* @ts-ignore */}
            <SheetTitle>              {formattedLog["timestamp"]} -{" "}           {getTimeAgo(new Date(formattedLog["timestamp"]).getTime())}
            </SheetTitle>
            <SheetDescription className="flex flex-col">
              {Object.keys(formattedLog).map((key) => (
                <div className="flex flex-row justify-between">
                  <span className="font-bold">
                    {key === "---------message---------" ? "message" : key}
                  </span>
                  {/* @ts-ignore */}
                  <span>{formattedLog[key]}</span>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="w-full flex justify-end py-3 gap-3 items-center">
        <Input
          type="text"
          placeholder="Search logs"
          value={filterValue}
          onChange={(e) => filter(e.target.value)}
        />

        <Button variant={"outline"} onClick={() => refreshFunction()}>
          <RefreshCcwIcon className="w-4 h-4"></RefreshCcwIcon>
        </Button>
        <Popover>
          <PopoverTrigger>
            <Button variant={"outline"} className="w-max">
              {timeframe && timeframe.from && timeframe.to ? (
                timeframe.from.toLocaleDateString() +
                " - " +
                timeframe.to.toLocaleDateString()
              ) : (
                <span>Timeframe</span>
              )}
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
          <Calendar
            mode="range"
            selected={timeframe}
            onSelect={(range) => changeTimeframe(range)}
          />
          </PopoverContent>
        </Popover>

        <Select
          defaultValue="10"
          onValueChange={(value) => {
            table.setPageSize(parseInt(value))
          }}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10" className="cursor-pointer">
                10
              </SelectItem>
              <SelectItem value="50" className="cursor-pointer">
                50
              </SelectItem>
              <SelectItem value="100" className="cursor-pointer">
                100
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant={"secondary"} onClick={() => table.previousPage()}>
          Previous
        </Button>
        <Button
          variant={"secondary"}
          onClick={() =>
            table.getState().pagination.pageIndex + 1 != table.getPageCount()
              ? table.nextPage()
              : ""
          }
        >
          Next
        </Button>
        <span className="text-gray-500 whitespace-nowrap">
          Page {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </span>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {/* {header.column.columnDef.header === "Timestamp" && (
                            "test"
                          )} */}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="leading-[5px]"
                  onClick={() => openSheet(row)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any, index) => (
                    <TableCell key={cell.id} className="w-2 cursor-pointer">
                      {cell.getValue()}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No logs for now.<br></br>
                  <Button
                    variant={"outline"}
                    className="mt-3"
                    onClick={() => window.open(siteConfig.links.docs)}
                  >
                    Get Started
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
