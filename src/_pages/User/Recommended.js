import React, { useState, useEffect } from 'react';
import { Button, Card, CloseButton, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SunSmartGlobalUVApp from './Opportunities/SunSmart-Global-UV-App';


function Recommended() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('opportunityDetailsModal');
    } else {
      document.body.classList.remove('opportunityDetailsModal');
    }

    return () => {
      document.body.classList.remove('opportunityDetailsModal');
    };
  }, [isVisible]);
  
  const showOpportunityDetails = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Card>
        <div className="recommendedSec">
          <div className="cardTitle">
            <h2>More opportunities</h2>
            <p className="font-size-sm">Based on your profile and search history</p>
          </div>
          <Row className="spaceLeftRight4">
            <Col lg="4">
              <Card className="instanceGreyCard">
               <Link onClick={showOpportunityDetails}>
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
          <div className="viewAllBtn">
            <Link className="btn btnlinkPrimary">View all</Link>
          </div>
        </div>
      </Card>
      <Card>
        <div className="recommendedSec">
        <div className="cardTitle">
           <h2>More opportunities</h2>
           <p className="font-size-sm">
            Based on your profile and search history
           </p>
          </div>
          <Row>
            <Col lg="12">
              <Card className="instanceGreyCard instanceBigCard">
                <Link>              
                  <div className="instanceLeftSec">
                    <p className='text-primary'>Applied</p>
                    <p className='text-primary'>Accepted</p>
                    <p className='text-danger'>Rejected</p>
                    <p className='text-warning'>In Progress</p>
                    <p className='text-success'>Complete</p>

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
                  </div>
                  <div className="instanceRightSec">
                    <Image
                      roundedCircle
                      src={require("../../Assets/Images/user-pic.jpg")}
                      alt="profile-pic"
                    />
                    <p className="font-size-sm">Bessie Cooper</p>
                  </div>
                </Link>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="instanceGreyCard instanceBigCard">
                <Link>
                  <div className="instanceLeftSec">
                    <span className="font11">Date</span>
                    <h6>
                      New agreement to improve global access to COVID-19 testing
                      technologies
                    </h6>
                    <p>
                      The World Health Organization welcomes the sublicence
                      agreement, the first of its kind to be signed under the
                      auspices of the WHO’s COVID-19 Technology Access Pool
                      (C-TAP) initiative. C-TAP was set up in 2020 to facilitate
                      the timely, equitable and affordable access to...
                    </p>
                    <div className="commitment">30% commitment</div>
                    <span className="instanceGreyBtn remoteBtn">Remote</span>
                  </div>
                  <div className="instanceRightSec">
                    <Image
                      roundedCircle
                      src={require("../../Assets/Images/user-pic.jpg")}
                      alt="profile-pic"
                    />
                    <p className="font-size-sm">Bessie Cooper</p>
                  </div>
                </Link>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="instanceGreyCard instanceBigCard mb-0">
                <Link>
                  <div className="instanceLeftSec">
                    <span className="font11">Date</span>
                    <h6>Research priorities for monkeypox</h6>
                    <p>
                      A global research consultation convened by the WHO R&D
                      Blueprint gathered over 500 experts and more than 2000
                      participants to discuss knowledge gaps and research
                      priorities for monkeypox...
                    </p>
                    <div className="commitment">30% commitment</div>
                    <span className="instanceGreyBtn remoteBtn">Remote</span>
                  </div>
                  <div className="instanceRightSec">
                    <Image
                      roundedCircle
                      src={require("../../Assets/Images/user-pic.jpg")}
                      alt="profile-pic"
                    />
                    <p className="font-size-sm">Bessie Cooper</p>
                  </div>
                </Link>
              </Card>
            </Col>
          </Row> 
        </div>
      </Card>

      {/* Opportunity Details popup */}
      {isVisible && (
        <div className="oportunityDetailsPopup">
          <CloseButton onClick={showOpportunityDetails} className="btn-secondary-cancel-icon" />
          <SunSmartGlobalUVApp />
        </div>
      )}
      {/* End */}

    </>
  );
}

export default Recommended;
