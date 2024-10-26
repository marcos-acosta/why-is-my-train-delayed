import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import styles from "@/app/charts/charts.module.css";
import {
  combineClassNames,
  ROUTE_TO_TRUNK_LINE,
  TRUNK_TO_COLOR,
} from "../util";

const data = [
  { Route: "N", "Delays per train planned": 6301 },
  { Route: "R", "Delays per train planned": 5953 },
  { Route: "Q", "Delays per train planned": 5010 },
  { Route: "W", "Delays per train planned": 2338 },
  { Route: "L", "Delays per train planned": 2433 },
  { Route: "JZ", "Delays per train planned": 2771 },
  { Route: "G", "Delays per train planned": 1535 },
  { Route: "A", "Delays per train planned": 8887 },
  { Route: "E", "Delays per train planned": 5071 },
  { Route: "C", "Delays per train planned": 4743 },
  { Route: "F", "Delays per train planned": 7579 },
  { Route: "D", "Delays per train planned": 6565 },
  { Route: "B", "Delays per train planned": 3344 },
  { Route: "M", "Delays per train planned": 3083 },
  { Route: "2", "Delays per train planned": 7848 },
  { Route: "1", "Delays per train planned": 4788 },
  { Route: "3", "Delays per train planned": 4710 },
  { Route: "7", "Delays per train planned": 2760 },
  { Route: "4", "Delays per train planned": 6723 },
  { Route: "6", "Delays per train planned": 6146 },
  { Route: "5", "Delays per train planned": 5320 },
  { Route: "H", "Delays per train planned": 1385 },
];

export default function DelaysByRoute() {
  return (
    <div
      className={combineClassNames(styles.chartContainer, styles.alertsByRoute)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 50,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" fontStyle="Rubik" orientation="top">
            <Label
              position="top"
              value="Number of delay events per service (Apr. 2020 - Aug. 2024)"
              fontWeight="bold"
              offset={20}
            />
          </XAxis>
          <YAxis
            type="category"
            dataKey="Route"
            fontStyle="Rubik"
            fontSize="1.25vw"
            width={300}
          />
          <Tooltip wrapperStyle={{ font: "Rubik", fontSize: "1vw" }} />
          <Bar dataKey="Delays per train planned">
            {data.map((entry: { [key: string]: any }, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  TRUNK_TO_COLOR[
                    ROUTE_TO_TRUNK_LINE[entry["Route"] as string] as string
                  ]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
