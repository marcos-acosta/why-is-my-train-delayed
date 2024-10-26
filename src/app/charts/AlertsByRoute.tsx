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
  { Route: "W", "Delays per train planned": 2.8198874296435275 },
  { Route: "N", "Delays per train planned": 1.9907923540430141 },
  { Route: "R", "Delays per train planned": 1.8213745212559622 },
  { Route: "Q", "Delays per train planned": 1.3106115813666686 },
  { Route: "L", "Delays per train planned": 0.721125448559845 },
  { Route: "JZ", "Delays per train planned": 1.5563356267426232 },
  { Route: "G", "Delays per train planned": 0.6152172512757383 },
  { Route: "E", "Delays per train planned": 2.440222388354687 },
  { Route: "A", "Delays per train planned": 2.168203126361466 },
  { Route: "C", "Delays per train planned": 1.7509010732335943 },
  { Route: "D", "Delays per train planned": 2.039543759985798 },
  { Route: "F", "Delays per train planned": 1.9988885225827722 },
  { Route: "B", "Delays per train planned": 1.9420950742095073 },
  { Route: "M", "Delays per train planned": 1.3403203142588755 },
  { Route: "2", "Delays per train planned": 2.018212627605494 },
  { Route: "1", "Delays per train planned": 1.7487559106473178 },
  { Route: "3", "Delays per train planned": 1.4136033056965385 },
  { Route: "7", "Delays per train planned": 0.6908481394569226 },
  { Route: "6", "Delays per train planned": 1.9557121345569224 },
  { Route: "5", "Delays per train planned": 1.505688279263935 },
  { Route: "4", "Delays per train planned": 1.3776286468072028 },
  { Route: "H", "Delays per train planned": 1.5908764588845816 },
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
              value="Number of delay events per train scheduled (Apr. 2020 - Aug. 2024)"
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
