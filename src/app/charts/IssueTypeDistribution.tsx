import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "@/app/charts/charts.module.css";
import { combineClassNames } from "../util";

const data = [
  { "Issue type": "Mechanical issue", Frequency: 22252 },
  { "Issue type": "Passenger issue", Frequency: 19100 },
  { "Issue type": "Brake activated", Frequency: 10477 },
  { "Issue type": "EMS/NYPD/FDNY response", Frequency: 3762 },
  { "Issue type": "Maintenance", Frequency: 3229 },
  { "Issue type": "Miscellaneous", Frequency: 3045 },
  { "Issue type": "(Unknown)", Frequency: 2442 },
  { "Issue type": "Cleaning", Frequency: 1696 },
  { "Issue type": "Object on tracks", Frequency: 1018 },
];

export default class IssueTypeDistribution extends PureComponent {
  render() {
    return (
      <div
        className={combineClassNames(
          styles.chartContainer,
          styles.issueTypeDistributionContainer
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontFamily="Helvetica" orientation="top" />
            <YAxis
              type="category"
              dataKey="Issue type"
              fontFamily="Helvetica"
              fontSize="1vw"
              width={300}
            />
            <Tooltip
              wrapperStyle={{ fontFamily: "Helvetica", fontSize: "1vw" }}
            />
            <Legend fontFamily="Helvetica" verticalAlign="top" />
            <Bar
              dataKey="Frequency"
              fill="rgb(236, 106, 20)"
              label={{ position: "right" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
