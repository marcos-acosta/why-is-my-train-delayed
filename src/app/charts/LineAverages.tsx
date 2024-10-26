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
import { combineClassNames } from "../util";
import { AVERAGE_ISSUES_BY_LINE, OVERALL_AVERAGE_ISSUES } from "./average_data";

interface LineAveragesProps {
  line: string;
}

export default function LineAverages(props: LineAveragesProps) {
  const line_issues_by_month = AVERAGE_ISSUES_BY_LINE.filter(
    (issue_frequency) => issue_frequency.line === props.line
  );
  const line_issues_by_month_with_average = line_issues_by_month
    .map((line_issue, i) => ({
      issue: line_issue.issue,
      line_monthly_average: line_issue.monthly_average,
      line_monthly_stddev: line_issue.monthly_stddev || 0,
      overall_monthly_average: OVERALL_AVERAGE_ISSUES[i].monthly_average,
      overall_monthly_stddev: OVERALL_AVERAGE_ISSUES[i].monthly_stddev || 0,
      diff:
        line_issue.monthly_average - OVERALL_AVERAGE_ISSUES[i].monthly_average,
      over:
        OVERALL_AVERAGE_ISSUES[i].monthly_stddev &&
        line_issue.monthly_average >
          OVERALL_AVERAGE_ISSUES[i].monthly_average +
            OVERALL_AVERAGE_ISSUES[i].monthly_stddev,
      under:
        OVERALL_AVERAGE_ISSUES[i].monthly_stddev &&
        line_issue.monthly_average <
          OVERALL_AVERAGE_ISSUES[i].monthly_average -
            OVERALL_AVERAGE_ISSUES[i].monthly_stddev,
    }))
    .sort((a, b) => b.overall_monthly_average - a.overall_monthly_average);
  console.log(line_issues_by_month_with_average);

  return (
    <div
      className={combineClassNames(styles.chartContainer, styles.lineAverages)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={line_issues_by_month_with_average}
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
              value="Average number of delay events per month versus overall monthly average (by issue)"
              fontWeight="bold"
              offset={20}
            />
          </XAxis>
          <YAxis
            type="category"
            dataKey="issue"
            fontStyle="Rubik"
            fontSize="1.25vw"
            width={300}
          />
          <Tooltip wrapperStyle={{ font: "Rubik", fontSize: "1vw" }} />
          <Bar dataKey="diff">
            {line_issues_by_month_with_average.map((issue_frequency, i) => (
              <Cell
                key={i}
                fill={
                  issue_frequency.over
                    ? "rgb(236, 106, 20)"
                    : issue_frequency.under
                    ? "green"
                    : "rgb(46, 46, 46)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
