import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Wishlist() {
  return (
    <>
      <Card>
        <div className="recommendedSec">
          <div className="cardTitle">
            <h2>Wishlist</h2>
            <p className="font-size-sm">Save opportunities for later</p>
          </div>
          <Row className="spaceLeftRight4">
            <Col lg="4">
              <Card className="instanceGreyCard">
                <div className="bookmarkIcon"></div>
                <Link>
                  <span className="font11">Date</span>
                  <h6>SunSmart Global UV mobile App</h6>
                  <p>
                    A new app for mobile phones that provides localized
                    information on ultraviolet (UV) radiation levels has been
                    launched by the World Health Organization (WHO)...
                  </p>
                  <div className="commitment">30% commitment</div>
                  <span className="instanceGreyBtn globalBtn">Global</span>
                  <span className="instanceGreyBtn remoteBtn">Remote</span>
                </Link>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="instanceGreyCard">
                <div className="bookmarkIcon"></div>
                <Link>
                  <span className="font11">Date</span>
                  <h6>New agreement to improve global acc...</h6>
                  <p>
                    The World Health Organization welcomes the sublicence
                    agreement, the first of its kind to be signed under the
                    auspices of the WHO’s COVID-19 Technology...
                  </p>
                  <div className="commitment">30% commitment</div>
                  <span className="instanceGreyBtn remoteBtn">Remote</span>
                </Link>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="instanceGreyCard">
                <div className="bookmarkIcon"></div>
                <Link>
                  <span className="font11">Date</span>
                  <h6>Research priorities for monkeypox</h6>
                  <p>
                    A global research consultation convened by the WHO R&D
                    Blueprint gathered over 500 experts and more than 2000
                    participants to discuss knowledge gaps and research...
                  </p>
                  <div className="commitment">30% commitment</div>
                  <span className="instanceGreyBtn remoteBtn">Remote</span>
                </Link>
              </Card>
            </Col>
          </Row>
          {/* <div className="viewAllBtn">
            <Link className="btn btnlinkPrimary">View all</Link>
          </div> */}
        </div>
      </Card>
    </>
  );
}

export default Wishlist;
