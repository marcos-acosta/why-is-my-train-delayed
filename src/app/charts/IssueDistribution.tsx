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

const data = [
  { Issue: "Brakes activated", Frequency: 10290 },
  { Issue: "Disruptive passenger", Frequency: 9324 },
  { Issue: "Medical emergency", Frequency: 6595 },
  { Issue: "Door problem", Frequency: 5233 },
  { Issue: "Signal problem", Frequency: 5191 },
  { Issue: "Unspecified train problem", Frequency: 5019 },
  { Issue: "Unspecified mechanical problem", Frequency: 2589 },
  { Issue: "(Unknown)", Frequency: 2442 },
  { Issue: "Unspecified NYPD response", Frequency: 2209 },
  { Issue: "Switch problem", Frequency: 2110 },
  { Issue: "Person on tracks", Frequency: 1769 },
  { Issue: "Track maintenance", Frequency: 1733 },
  { Issue: "Cleaning", Frequency: 1696 },
  { Issue: "Fire / smoke", Frequency: 1294 },
  { Issue: "South Channel Bridge open", Frequency: 1293 },
  { Issue: "Rail problem", Frequency: 1257 },
  { Issue: "Unspecified EMS response", Frequency: 1253 },
  { Issue: "Something on tracks", Frequency: 827 },
  { Issue: "Power issue", Frequency: 727 },
  { Issue: "Vandalism", Frequency: 721 },
  { Issue: "Person struck by train", Frequency: 691 },
  { Issue: "Unspecified maintenance", Frequency: 572 },
  { Issue: "Work train-related", Frequency: 550 },
  { Issue: "Unspecified FDNY response", Frequency: 300 },
  { Issue: "Short-staffed", Frequency: 204 },
  { Issue: "Fallen tree", Frequency: 191 },
  { Issue: "Switch maintenance", Frequency: 189 },
  { Issue: "Emergency brake cord pulled", Frequency: 187 },
  { Issue: "Signal maintenance", Frequency: 185 },
  { Issue: "Track inspection", Frequency: 151 },
  { Issue: "Communication problem", Frequency: 126 },
  { Issue: "Flooding", Frequency: 103 },
];

export default class IssueDistribution extends PureComponent {
  render() {
    return (
      <div
        className={combineClassNames(
          styles.chartContainer,
          styles.issueDistributionContainer
        )}
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
                value="Breakdown of delay events by issue (Apr. 2020 - Aug. 2024)"
                fontWeight="bold"
                offset={20}
              />
            </XAxis>
            <YAxis
              type="category"
              dataKey="Issue"
              fontStyle="Rubik"
              fontSize="1.25vw"
              width={300}
            />
            <Tooltip wrapperStyle={{ fontStyle: "Rubik", fontSize: "1vw" }} />
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
