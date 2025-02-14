"use client";

import { useState } from "react";
import IssueDistribution from "./charts/IssueDistribution";
import styles from "./page.module.css";
import Dropdown from "react-dropdown";
import { ISSUES, ROUTE_TO_TRUNK_LINE } from "./util";
import DelaysByRoute from "./charts/AlertsByRoute";
import LineAverages from "./charts/LineAverages";
import MonthlyAverages from "./charts/MonthlyAverages";

export default function Home() {
  const [selectedLine, setSelectedLine] = useState(
    undefined as undefined | string
  );
  const [selectedIssue, setSelectedIssue] = useState(
    undefined as undefined | string
  );

  return (
    <div className={styles.mainBlogBody}>
      <div className={styles.title}>Why is my train delayed?</div>
      <div className={styles.subtitle}>
        A study by{" "}
        <a
          href="https://drive.usercontent.google.com/download?id=13sXsg-PIn9vp5Gl6bzgOnrPzfehDIar0&authuser=0"
          target="_blank"
        >
          Marcos Acosta
        </a>{" "}
        for the{" "}
        <a
          href="https://new.mta.info/article/mta-open-data-challenge"
          target="_blank"
        >
          2024 MTA Open Data Challenge
        </a>
        .
      </div>
      <div className={styles.blogBody}>
        <div className={styles.blogParagraph}>
          Cursing the NYCT for unexpected delays is a favorite pastime for New
          Yorkers (no citation needed). After having gotten used to them myself,
          I stopped wondering *why* these disruptions happen; &quot;old
          infrastructure&quot; is an easy explanation. But this leaves a lot of
          questions: What kind of infrastructure is faulty? Are the delays
          really mostly due to mechanical problems? Are certain lines, boroughs,
          or stations more prone to delays? What could be done about it?
          Let&apos;s take a look!
        </div>
        <div className={styles.blogParagraph}>
          While there doesn&apos;t exist a &quot;pre-made&quot; dataset listing
          the cause of each delay, we do have the{" "}
          <a
            href="https://data.ny.gov/Transportation/MTA-Service-Alerts-Beginning-April-2020/7kct-peq7/about_data"
            target="_blank"
          >
            MTA Service Alerts
          </a>{" "}
          dataset, which contains a log of every MTA alert sent out (for delays,
          service changes, etc.) as well as the affected routes, alert type,
          etc. Using a bit of basic natural language processing, we can extract
          information like the most likely cause of the delay and which train
          station the issue occurred at. The data preparation was actually very
          fun and involved some tricky problems (like figuring out which
          &quot;23 St&quot; is being referred to), so check out the{" "}
          <a
            href="https://github.com/marcos-acosta/why-is-my-train-delayed-data"
            target="_blank"
          >
            GitHub
          </a>{" "}
          to see the detailed walk-through!
        </div>
        <div className={styles.blogParagraph}>
          Now, we should make note that there could very well be many train
          delays which do not end up in this dataset. But by analyzing the
          delays which <i>do</i> generate alerts, we can inspect the (more
          relevant) subset of delays which are big enough for subway riders to
          care.
        </div>
        <div className={styles.blogParagraph}>
          With that said, let&apos;s start simple and take a look at the
          distribution of issues across all alerts since April 2020.
        </div>
        <IssueDistribution />
        <div className={styles.blogParagraph}>
          This clears up one source of misunderstanding, which is that{" "}
          <b>issues caused by individuals</b> (aggression, medical attention,
          etc.) <b>account for a large proportion of train delays!</b> The next
          natural question is, are different services disproportionately
          affected by delays? We can take a naive approach, where we simply
          count the total number of alerts which affect each service:
        </div>
        <DelaysByRoute />
        <div className={styles.blogParagraph}>
          The distribution of delay events across the different services is
          actually surprisingly homogenous on the whole. The clear exceptions
          are the lines which share little track with other services (namely the
          L, JZ, G, 7, and H aka Rockaway Park Shuttle). This makes sense,
          because services like these are unlikely to be affected by issues on
          other services. This also helps explain why the fully-local services
          (1, C, G, L, M, R, W) are generally less delay-prone than the rest.
        </div>
        <div className={styles.blogParagraph}>
          Although we can see that different services are disproportionately
          affected by delay events, we would still like to investigate what{" "}
          <i>kinds</i> of issues are responsible for these delays. For this next
          part, select a service to analyze.
        </div>
        <div className={styles.lineSelectorContainer}>
          <Dropdown
            options={Object.keys(ROUTE_TO_TRUNK_LINE)}
            onChange={(e) => setSelectedLine(e.value)}
            value={selectedLine}
            placeholder="Select a line!"
            className={styles.lineSelector}
          />
        </div>
        {selectedLine && (
          <>
            <div className={styles.blogParagraph}>
              What we are analyzing here is the average monthly number of delay
              events (grouped by issue) for a given service. That monthly
              average is then compared against the average across <i>all</i>{" "}
              services. When a specific service&apos;s monthly average is at
              least one standard deviation above the overall average, we color
              it red (or green, if it&apos;s below.)
            </div>
            <LineAverages line={selectedLine} />
            <div className={styles.blogParagraph}>
              We can find a number of interesting insights here; for example,
              the 2 line has, on average, 12 more disruptive passengers than
              average every month, and 10 more medical emergencies. The F causes
              delays because of a train&apos;s brakes being activated 11 more
              times per month than average, and also suffers from signal
              problems and rail problems more than average. As one of the few
              services that has ground-level stations, the Q deals with more
              tree issues. Also, the Rockaway Park Shuttle only needs to connect
              two stations, so it is extremely delay-free (except for when the
              South Channel Bridge opens).
            </div>
            <div className={styles.blogParagraph}>
              Next we might wonder, are there any seasonal effects to the issues
              we&apos;ve identified? To do this, we can look at data across
              three years and average the number of delay events across years,
              grouping by the month of the year. We can then explore these
              yearly averages by issue type. One potential flaw with this
              analysis is that there appear to be naturally fewer delay alerts
              in late summer / early fall, so looking at the raw number of
              alerts by issue type per month might be misleading. So, we compare
              the <i>yearly average number of delay events by issue</i> to the{" "}
              <i>yearly average number of delays</i> grouped by month, as a
              percent. That&apos;s what you&apos;ll see below!
            </div>
            <div className={styles.lineSelectorContainer}>
              <Dropdown
                options={ISSUES}
                onChange={(e) => setSelectedIssue(e.value)}
                value={selectedIssue}
                placeholder="Select an issue!"
                className={styles.lineSelector}
              />
            </div>
            {selectedIssue && (
              <>
                <MonthlyAverages issue={selectedIssue} />
                <div className={styles.blogParagraph}>
                  Poking around the different issues, we can pick out a few
                  noteworthy things. For instance:
                  <ul>
                    <li>
                      There seems to be a slight hump in disruptive passengers
                      in late winter compared to late summer. Perhaps it&apos;s
                      all the months of cold weather that&apos;s gotten to
                      folks.
                    </li>
                    <li>
                      Medical emergencies peak in the dead of winter, and so do
                      unspecified EMS responses.
                    </li>
                    <li>
                      Train cleaning also seems to cause more delays in the
                      winter.
                    </li>
                    <li>
                      On the other hand, delays due to trains being vandalized
                      peaks in the summer.
                    </li>
                    <li>
                      It&apos;s more common for a person to be struck by a train
                      in the winter. There is a lot of existing analysis into
                      this tragedy (see{" "}
                      <a
                        href="https://pubmed.ncbi.nlm.nih.gov/19064043/"
                        target="_blank"
                      >
                        here, for instance
                      </a>
                      , but this is a reminder that the winter is a time for
                      extra precaution around passenger safety)
                    </li>
                    <li>
                      Delays due to being short-staffed peaks in December,
                      probably for the holidays
                    </li>
                    <li>
                      Fallen trees are clearly a summer issue, as summer storms
                      are likely to knock down trees and branches
                    </li>
                  </ul>
                  This comes with a warning that we only have three years to
                  average each month across, which can result in anomalies. For
                  example, if we group by &quot;Flooding&quot; events, we see a
                  huge spike in September which suggests that flooding is 10x
                  more likely to cause delays in September than other months.
                  However, this is not the case. That effect is caused by the
                  September 2023 floods, which caused massive delays due to
                  flooding, pulling up the yearly average for that month.
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
