"use client";

import { useState } from "react";
import IssueDistribution from "./charts/IssueDistribution";
import styles from "./page.module.css";
import Dropdown from "react-dropdown";
import { ROUTE_TO_TRUNK_LINE } from "./util";
import DelaysByRoute from "./charts/AlertsByRoute";
import LineAverages from "./charts/LineAverages";

export default function Home() {
  const [selectedLine, setSelectedLine] = useState(
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
          </>
        )}
      </div>
    </div>
  );
}
