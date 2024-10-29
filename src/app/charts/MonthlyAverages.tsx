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
import { ISSUES_BY_MONTH } from "./average_data";

interface MonthlyAveragesProps {
  issue: string;
}

export default function MonthlyAverages(props: MonthlyAveragesProps) {
  const data = ISSUES_BY_MONTH.filter(
    (event) => event.delay_issue === props.issue
  ).sort((a, b) => a.month - b.month);

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
              value: "% of average number of delays",
              angle: -90,
              position: "left",
              offset: 60,
              style: { textAnchor: "middle" },
            }}
          />
          <XAxis
            type="category"
            dataKey="month_name"
            fontStyle="Rubik"
            fontSize="1.25vw"
          >
            <Label
              position="bottom"
              value={`Yearly avg. of "${props.issue}" delays by month as a % of overall avg. (Aug. 2020 - Aug. 2024)`}
              fontWeight="bold"
              offset={50}
            />
          </XAxis>
          <Tooltip wrapperStyle={{ font: "Rubik", fontSize: "1vw" }} />
          <Bar dataKey="diff" fill="rgb(236, 106, 20)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
