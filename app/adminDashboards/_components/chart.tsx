"use client";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  TooltipProps,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { formatCurrencyNaira } from "@/lib/formatCurrency";

// Define the shape of the data used in the chart
interface ChartData {
  name: string; // ISO date string
  sales: number;
}

// Custom tooltip props, extending the default TooltipProps from Recharts and specifying the payload structure
interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: [{ name: string; value: number; payload: ChartData }];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip bg-neutral-700 p-3 rounded shadow-lg text-yellow-500">
        <h4 className="text-sm font-bold">
          {format(parseISO(label || ""), "eeee, d MMM, yyyy")}
        </h4>
        <p className="text-sm mt-2 text-yellow-400">
          ${payload[0].value.toFixed(2)} CAD
        </p>
      </div>
    );
  }
  return null;
};

// Props for the SalesChart component
interface SalesChartProps {
  data: ChartData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="yellow" stopOpacity={0.4} />
            <stop offset="75%" stopColor="yellow" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="sales"
          stroke="yellow"
          fill="url(#colorSales)"
          animationDuration={3000}
        />

        {/* <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        /> */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            return format(date, "MMM, d");
          }}
        />

        <YAxis
          dataKey="sales"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `${formatCurrencyNaira(number)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
