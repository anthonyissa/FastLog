import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradientFunction } from "@/lib/chart-utils";
import { Log } from "@/types/Log";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    filler: {
      propagate: true,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        color: "transparent",
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        color: "transparent",
      },
    },
  },
};

export function ActivityChart({ logs }: { logs: Log[] }) {
  const [chartData, setChartData] = useState<any>();
  const [hours, setHours] = useState<number>(3);

  const formatLogs = (logs: Log[], countMap: any) => {
    logs.forEach((log) => {
      const timestring = getTimestring(
        new Date(log.timestamp).getTime() +
          new Date().getTimezoneOffset() * 60 * 1000
      );
      countMap[timestring] = (countMap[timestring] || 0) + 1;
    });
    return countMap;
  };

  const getTimestring = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  };

  const updateChartData = () => {
    let countMap: any = {};
    for (let i = 0; i < hours; i++) {
      for (let j = 0; j < 60; j++) {
        const date = new Date(
          new Date().getTime() - i * 3600 * 1000 - j * 60 * 1000
        );
        countMap[
          getTimestring(
            date.getTime() + new Date().getTimezoneOffset() * 60 * 1000
          )
        ] = 0;
      }
    }
    const lastLogs = logs.filter(
      (log) =>
        new Date(log.timestamp).getTime() >
        new Date().getTime() - hours * 3600 * 1000
    );
    countMap = formatLogs(lastLogs, countMap);
    const labels = Object.keys(countMap).reverse();
    const data = labels.map((label) => countMap[label]);
    setChartData({
      labels,
      options,
      datasets: [
        {
          label: "Log Count",
          data,
          borderColor: gradientFunction,
          lineTension: 0.4,
          borderWidth: 2,
          fill: true,

          backgroundColor: gradientFunction,
          tension: 0.1,
          pointStyle: false,
        },
      ],
    });
  };

  useEffect(() => {
    updateChartData();
  }, [logs, hours]);

  return (
    <>
      {chartData && (
        <div className="flex flex-col">
          <div className="flex flex-row justify-end">
            <Select
              defaultValue={hours.toString()}
              onValueChange={(value) => {
                setHours(parseInt(value));
              }}
            >
              <SelectTrigger className="w-[130px] mr-3">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1" className="cursor-pointer">
                    Last 1 hour
                  </SelectItem>
                  <SelectItem value="3" className="cursor-pointer">
                    Last 3 hours
                  </SelectItem>
                  <SelectItem value="6" className="cursor-pointer">
                    Last 6 hours
                  </SelectItem>
                  <SelectItem value="12" className="cursor-pointer">
                    Last 12 hours
                  </SelectItem>
                  <SelectItem value="24" className="cursor-pointer">
                    Last 24 hours
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Line height={"50px"} options={options} data={chartData}></Line>
        </div>
      )}
    </>
  );
}
