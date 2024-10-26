"use client";

import { useState } from "react";
import IssueDistribution from "./charts/IssueDistribution";
import IssueTypeDistribution from "./charts/IssueTypeDistribution";
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
          Now, we should make note that slight delays happen all the time, and
          the MTA doesn&apos;t always send out an alert every time. But by
          analyzing the delays which <i>do</i> generate alerts, we can inspect
          the (more relevant) subset of delays which are big enough for subway
          riders to care.
        </div>
        <div className={styles.blogParagraph}>
          With that said, let&apos;s start simple and take a look at the
          distribution of issues across all alerts since April 2020.
        </div>
        <IssueDistribution />
        <div className={styles.blogParagraph}>
          This clears up one source of misunderstanding, which is that{" "}
          <b>issues caused by individuals</b> (aggression, medical attention,
          etc.) <b>account for a large proportion of train delays!</b> We can
          see this another way, by grouping multiple causes together under
          &quot;umbrella&quot; issues:
        </div>
        <IssueTypeDistribution />
        <div className={styles.blogParagraph}>
          This is interesting, but this view is a little too high-level to gain
          much meaningful insight. Our next intuition would lead us to ask,
          which trains are especially delay-prone? It wouldn&apos;t be very
          interesting to just sum the number of alerts for each service, since
          &quot;busier&quot; trains (e.g. the A) will naturally get more delay
          alerts than &quot;less busy&quot; routes (e.g. the G). As a proxy for
          &quot;business&quot;, we can use the{" "}
          <b>planned number of trains delivered</b> for each service, which is
          available through{" "}
          <a
            href="https://data.ny.gov/Transportation/MTA-Subway-Service-Delivered-Beginning-2020/bg59-42xi/about_data"
            target="_blank"
          >
            another MTA dataset
          </a>{" "}
          (note that we could use the <i>actual</i> number of trains delivered
          as well, but this metric is directly correlated with the number of
          delays). When we do this, this is what we find:
        </div>
        <DelaysByRoute />
        <div className={styles.blogParagraph}>
          The main takeaway here is that most services are averaging{" "}
          <b>over one delay event per scheduled train</b>. It seems that the L,
          7, and G (despite its perpetual planned maintenance) are relatively
          reliable services. Besides those three, it doesn&apos;t seem to be the
          case that any one line is significantly more reliable than another,
          after adjusting for &quot;busy-ness&quot;.
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
        {!selectedLine ? (
          <div className={styles.blogParagraph}>
            For this next part, go ahead and select a line above!
          </div>
        ) : (
          <>
            <div className={styles.blogParagraph}>Stuff</div>
            <LineAverages line={selectedLine} />
            <div className={styles.blogParagraph}></div>
          </>
        )}
      </div>
    </div>
  );
}
