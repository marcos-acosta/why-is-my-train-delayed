import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import styles from "@/app/charts/charts.module.css";
import { combineClassNames } from "../util";
import { EVENTS_BY_MONTH } from "./average_data";

interface MonthlyAveragesProps {
  issue: string;
}

export default function MonthlyAverages(props: MonthlyAveragesProps) {
  const data = EVENTS_BY_MONTH.filter(
    (event) => event.issue === props.issue
  ).sort((a, b) => a.month_index - b.month_index);

  return (
    <div
      className={combineClassNames(
        styles.pieChartContainer,
        styles.monthlyAverages
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 50,
            left: 100,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis
            type="number"
            fontStyle="Rubik"
            label={{
              value: "Average number of delay events",
              angle: -90,
              position: "left",
              offset: 40,
              style: { textAnchor: "middle" },
            }}
          />
          <XAxis
            type="category"
            dataKey="month_of_year"
            fontStyle="Rubik"
            fontSize="1.25vw"
          >
            <Label
              position="bottom"
              value={`Yearly average of "${props.issue}" delay events by month (Aug. 2020 - Aug. 2024)`}
              fontWeight="bold"
              offset={50}
            />
          </XAxis>
          <Tooltip wrapperStyle={{ font: "Rubik", fontSize: "1vw" }} />
          <Bar dataKey="num_events" fill="rgb(236, 106, 20)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
