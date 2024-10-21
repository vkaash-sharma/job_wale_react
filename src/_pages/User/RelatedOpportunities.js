import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function RelatedOpportunities() {
  const opportunities = [
    {
      id: "post1",
      title: "SunSmart Global UV mobile App",
      description:
        "A new app for mobile phones that provides localized information on ultraviolet (UV) radiation levels has been launched by the World Health Organization (WHO)...",
      commitment: "30% commitment",
      link: "/opportunities/SunSmart-Global-UV-App",
      active: 0,
    },
    {
      id: "post2",
      title: "New agreement to improve global access...",
      description:
        "The World Health Organization welcomes the sublicence agreement, the first of its kind to be signed under the auspices of the WHO’s COVID-19 Technology...",
      commitment: "30% commitment",
      link: "/opportunities/new-agreement-to-improve-global-access",
      active: 0,
    },
    {
      id: "post3",
      title: "Research priorities for monkeypox",
      description:
        "A global research consultation convened by the WHO R&D Blueprint gathered over 500 experts and more than 2000 participants to discuss knowledge gaps and research...",
      commitment: "30% commitment",
      link: "/opportunities/SunSmart-Global-UV-App",
      active: 0,
    },
  ];

  const usrl = useLocation();



  return (
    <>
      {opportunities?.map((opportunity) => (
        <Card
          key={opportunity.id}
          className={
            opportunity.link === usrl.pathname ? "instanceGreyCard active" : "instanceGreyCard"
          }
        >
          <Link to={opportunity.link}>
            <span className="font11">Date</span>
            <h6>{opportunity.title}</h6>
            <p>{opportunity.description}</p>
            <div className="commitment">{opportunity.commitment}</div>
            <span className="instanceGreyBtn remoteBtn">Remote</span>
          </Link>
        </Card>
      ))}
    </>
  );
}

export default RelatedOpportunities;
