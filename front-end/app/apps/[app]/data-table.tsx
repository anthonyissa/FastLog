"use client";

import { Loading } from "@/components/loading";
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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
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
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  RefreshCcwIcon,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
  refreshFunction,
  searchFunction,
  loadMoreFunction,
}: {
  data: TData[];
  refreshFunction: Function;
  searchFunction: Function;
  loadMoreFunction: Function;
}) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [timeframe, setTimeframe] = useState<DateRange>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

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
        // @ts-ignore
        const timestamp = new Date(row.original.timestamp).getTime();
        if (timeframe) {
          const isInTimeframe = // @ts-ignore
            timestamp >=
              // @ts-ignore
              new Date(timeframe.from).getTime() &&
            // @ts-ignore
            timestamp <=
              // @ts-ignore
              new Date(timeframe.to).getTime() + 86399000;
          // if (isInTimeframe) {
          //   console.log({
          //     row_date: row.original.timestamp,
          //     row_timestamp_plus_2: timestamp,
          //     from_date: timeframe.from,
          //     to_date: timeframe.to,
          //     from_timestamp: new Date(timeframe.from).getTime(),
          //     to_timestamp: new Date(timeframe.to).getTime() + 86399000,
          //   });
          // }

          return isInTimeframe;
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

  const scroll = (direction: "UP" | "DOWN") => {
    const div = document.querySelector(".data-table")!;
    if (direction == "UP") {
      div.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      div.scrollTo({
        top: div.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const loadMore = async () => {
    setLoadingMore(true);
    await loadMoreFunction({ search: filterValue, page: page + 1 });
    setPage(page + 1);
    setLoadingMore(false);
  };

  const [showDiv, setShowDiv] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    // Set a specific scroll amount after which the div will be shown
    const showDivScrollAmount = 100; // for example, 100px scroll amount
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > showDivScrollAmount) {
      setShowDiv(true);
    } else {
      setShowDiv(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    table.setPageSize(10000000);
  }, []);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [formattedLog, setFormattedLog] = useState<{}>({});

  const filter = async () => {
    setPage(0);
    setLoading(true);
    await searchFunction({
      search: filterValue.length > 0 ? filterValue : undefined,
      page: filterValue.length > 0 ? 0 : -1,
    });
    setLoading(false);
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
      {/* <Sheet open={sheetOpen}>
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
                  <span>{formattedLog[key]}</span>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet> */}

      <div className="w-full flex justify-end py-3 gap-3 items-center">
        <Input
          type="text"
          placeholder="Search logs"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              filter();
            }
          }}
        />
        <Button variant={"outline"} onClick={() => filter()}>
          {loading ? (
            <Loading classname="w-4 h-4"></Loading>
          ) : (
            <Search className="w-4 h-4"></Search>
          )}
        </Button>
        <Separator className="h-5 w-[1px]"></Separator>
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

        {/* <Select
          defaultValue="50"
          onValueChange={(value) => {
            table.setPageSize(parseInt(value));
          }}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="50" className="cursor-pointer">
                50
              </SelectItem>
              <SelectItem value="100" className="cursor-pointer">
                100
              </SelectItem>
              <SelectItem value="500" className="cursor-pointer">
                500
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        {/* <Button variant={"secondary"} onClick={() => table.previousPage()}>
          <ChevronLeft className="w-4 h-4"></ChevronLeft>
        </Button>
        <Button
          variant={"secondary"}
          onClick={() =>
            table.getState().pagination.pageIndex + 1 != table.getPageCount()
              ? table.nextPage()
              : ""
          }
        >
          <ChevronRight className="w-4 h-4"></ChevronRight>
        </Button> */}
        {showDiv && table.getRowModel().rows.length > 0 && (
          <div className="fixed bottom-0 opacity-80 gap-3 flex m-5 mb-8">
            <Button
              variant={"secondary"}
              size={"thin"}
              onClick={() => scroll("DOWN")}
            >
              <ChevronDown className="w-4 h-4"></ChevronDown>
            </Button>
            <Button
              variant={"secondary"}
              size={"thin"}
              onClick={() => scroll("UP")}
            >
              <ChevronUp className="w-4 h-4"></ChevronUp>
            </Button>
          </div>
        )}
        {/* <span className="text-gray-500 whitespace-nowrap">
          Page {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()}
        </span> */}
      </div>
      <div
        className={`rounded-md border ${
          table.getRowModel().rows.length > 0 && "h-96"
        } overflow-hidden overflow-y-auto data-table`}
      >
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
            {loading &&
              [1, 2, 3, 4, 5].map((row) => (
                <TableRow className="border-none w-full">
                  <TableCell
                    colSpan={columns.length}
                    className="p-2 py-3 h-5 w-full"
                  >
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}

            {!loading && table.getRowModel().rows?.length
              ? table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={`leading-[0px] border-none hover:bg-purple-500/5 dark:hover:bg-pink-500/5 text-[12px] p-0 ${
                      row.getVisibleCells()[0].getValue() == "ERROR" &&
                      "text-destructive"
                    }`}
                    // onClick={() => openSheet(row)}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell: any, index) => (
                      <TableCell
                        key={cell.id}
                        className={`${
                          index == 2
                            ? "full"
                            : index == 1
                            ? "min-w-[200px] w-2/12"
                            : "w-10"
                        } cursor-pointer overflow-hidden p-0 px-4`}
                      >
                        {index == 1 ? (
                          cell.getValue().split("+")[0]
                        ) : index == 2 ? (
                          <Accordion type="single" collapsible>
                            <AccordionItem
                              value="1"
                              className="border-none p-0"
                            >
                              <AccordionTrigger className="m-0 p-0.5 text-left no-chevron ">
                                <pre className="w-64">{cell.getValue()}</pre>
                              </AccordionTrigger>
                              <AccordionContent className="text-xs mt-1">
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
              : !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No logs for now.<br></br>
                      <Link href={siteConfig.links.docs}>
                        <Button
                          variant={"outline"}
                          className="mt-3"
                          onClick={() => window.open(siteConfig.links.docs)}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
            {!loading && table.getRowModel().rows?.length > 0 && (
              <div>
                {!loadingMore && (
                  <Button
                    className="w-24 text-xs m-3"
                    size={"thin"}
                    variant={"outline"}
                    onClick={() => loadMore()}
                  >
                    Load More
                  </Button>
                )}
                {loadingMore && <Loading classname="m-3 mx-auto" />}
              </div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
