"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteConfig } from "@/config/site";
import {
  convertLogMessageToMap,
  getTimeAgo,
  isJsonString,
  isObjectString,
} from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, RefreshCcwIcon, X } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
  refreshFunction,
}: {
  data: TData[];
  refreshFunction: Function;
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [timeframe, setTimeframe] = useState<DateRange>();

  const columns: ColumnDef<TData, TValue>[] = [
    {
      accessorKey: "level",
      header: "Level",
      enableResizing: true,
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      filterFn: (row, filterValue) => {
        if (timeframe) {
          // @ts-ignore
          return (
            new Date(row.original.timestamp).getTime() >=
              new Date(timeframe.from).getTime() &&
            new Date(row.original.timestamp).getTime() <=
              new Date(timeframe.to).getTime()
          );
        } else {
          return true;
        }
      },
    },
    {
      accessorKey: "message",
      header: "Message",
    },
  ];

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
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [formattedLog, setFormattedLog] = useState<{}>({});

  const filter = (value: string) => {
    setFilterValue(value);
    table.setGlobalFilter(value);
  };

  const openSheet = (row: Row<TData>) => {
    setFormattedLog({});
    let newLog = {};
    row.getVisibleCells().forEach((cell) => {
      newLog = {
        ...newLog,
        [cell.column.id]: cell.getValue(),
      };
    });
    // @ts-ignore
    if (isObjectString(newLog["message"])) {
      // @ts-ignore
      const detailedMessage = convertLogMessageToMap(newLog["message"]);
      detailedMessage.forEach((value, key) => {
        newLog = {
          ...newLog, // @ts-ignore
          ["log." + key]: value,
        };
      });
    }
    setFormattedLog(newLog);
    setSheetOpen(true);
  };

  const changeTimeframe = (selected: DateRange | undefined) => {
    setTimeframe(selected);
    table.resetColumnFilters();
    if (!selected || !selected.to) return;
    if (
      new Date(selected!.from!).getTime() === new Date(selected!.to!).getTime()
    ) {
      selected.to = new Date(selected!.from!.getTime() + 86399000);
    } // add 23:59:59 to the selected date
    setTimeframe(selected);
    table.setColumnFilters([
      {
        id: "timestamp",
        value: selected,
      },
    ]);
  };

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
            <SheetTitle>
              {" "}
              {formattedLog["timestamp"]} -{" "}
              {getTimeAgo(new Date(formattedLog["timestamp"]).getTime())}
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
            table.setPageSize(parseInt(value));
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="leading-[0px] border-none hover:bg-purple-500/5 dark:hover:bg-pink-500/5"
                  // onClick={() => openSheet(row)}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any, index) => (
                    <TableCell
                      key={cell.id}
                      className={`${
                        index == 2 ? "full" : index == 1 ? "w-2/12" : "w-10"
                      } cursor-pointer overflow-hidden`}
                    >
                      {index == 1 ? (
                        cell.getValue().split("+")[0]
                      ) : index == 2 ? (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="1" className="border-none">
                            <AccordionTrigger className="m-0 h-0 p-0 text-left no-chevron">
                              <pre className="w-64">{cell.getValue()}</pre>
                            </AccordionTrigger>
                            <AccordionContent className="mt-5">
                              <pre className="w-full text-ellipsis whitespace-pre-wrap">
                                {JSON.stringify(
                                  isJsonString(cell.getValue())
                                    ? JSON.parse(cell.getValue())
                                    : cell.getValue(),
                                  undefined,
                                  2
                                )}
                              </pre>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        cell.getValue()
                      )}
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
  );
}
