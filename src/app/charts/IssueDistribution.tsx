import React, { PureComponent } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import styles from "@/app/charts/charts.module.css";
import { combineClassNames } from "../util";

const issues = [
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

const ISSUE_TO_ISSUE_TYPE: { [key: string]: string } = {
  "Track maintenance": "Maintenance",
  "Signal maintenance": "Maintenance",
  "Switch maintenance": "Maintenance",
  "Work train-related": "Maintenance",
  "Unspecified maintenance": "Maintenance",
  "Brakes activated": "Brake activated",
  "Emergency brake cord pulled": "Brake activated",
  "Signal problem": "Mechanical issue",
  "Switch problem": "Mechanical issue",
  "Communication problem": "Mechanical issue",
  "Power issue": "Mechanical issue",
  "Rail problem": "Mechanical issue",
  "Door problem": "Mechanical issue",
  "Unspecified train problem": "Mechanical issue",
  "Unspecified mechanical problem": "Mechanical issue",
  "Disruptive passenger": "Passenger issue",
  "Person on tracks": "Passenger issue",
  "Person struck by train": "Passenger issue",
  "Medical emergency": "Passenger issue",
  Vandalism: "Passenger issue",
  "Something on tracks": "Object on tracks",
  "Fallen tree": "Object on tracks",
  "Unspecified EMS response": "EMS/NYPD/FDNY response",
  "Unspecified NYPD response": "EMS/NYPD/FDNY response",
  "Unspecified FDNY response": "EMS/NYPD/FDNY response",
  Cleaning: "Cleaning",
  "Short-staffed": "Miscellaneous",
  "Fire / smoke": "Miscellaneous",
  Flooding: "Miscellaneous",
  "South Channel Bridge open": "Miscellaneous",
  "Track inspection": "Miscellaneous",
  "(Unknown)": "(Unknown)",
};

const ISSUE_TYPES = [
  "Mechanical issue",
  "Passenger issue",
  "Brake activated",
  "EMS/NYPD/FDNY response",
  "Maintenance",
  "Cleaning",
  "Object on tracks",
  "(Unknown)",
  "Miscellaneous",
];

const getIssueIndex = (issue: string) => {
  return ISSUE_TYPES.findIndex((val) => val === ISSUE_TO_ISSUE_TYPE[issue]);
};

const data = issues.sort(
  (a, b) => getIssueIndex(a.Issue) - getIssueIndex(b.Issue)
);

const ISSUE_TYPE_TO_COLOR: { [key: string]: string } = {
  "Mechanical issue": "#FFCF00",
  "Passenger issue": "#EC6A14",
  "Brake activated": "#00916E",
  "EMS/NYPD/FDNY response": "#7A82AB",
  Maintenance: "#2589BD",
  "Object on tracks": "#4D5382",
  Cleaning: "#966B9D",
  Miscellaneous: "#b0b0b0",
  "(Unknown)": "#b0b0b0",
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (object: { [key: string]: any }) => {
  const radius = object["outerRadius"] * 1.1;
  const x = object["cx"] + radius * Math.cos(-object["midAngle"] * RADIAN);
  const y = object["cy"] + radius * Math.sin(-object["midAngle"] * RADIAN);
  const isLeftSide = x < object["cx"];
  const isTopSide = y < object["cy"];

  const rotateDegree = isLeftSide
    ? isTopSide
      ? "10"
      : "-10"
    : isTopSide
    ? "-10"
    : "10";
  const isSmallAngle = object["percent"] < 0.01;
  return isSmallAngle ? null : (
    <text
      x={x}
      y={y}
      textAnchor={x > object["cx"] ? "start" : "end"}
      transform={`rotate(${rotateDegree}, ${x}, ${y})`}
      style={{ fontSize: "1vw" }}
    >
      {object["name"]}
    </text>
  );
};

console.log(
  data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={ISSUE_TYPE_TO_COLOR[ISSUE_TO_ISSUE_TYPE[entry["Issue"] as string]]}
    />
  ))
);

export default class IssueDistribution extends PureComponent {
  render() {
    return (
      <div
        className={combineClassNames(
          styles.pieChartContainer,
          styles.issueDistributionContainer
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: 50,
              left: 0,
              bottom: 5,
            }}
            width={100}
          >
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="Frequency"
              nameKey="Issue"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    ISSUE_TYPE_TO_COLOR[
                      ISSUE_TO_ISSUE_TYPE[entry["Issue"] as string]
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
