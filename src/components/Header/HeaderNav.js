import logo from "../../Assets/Images/logo1.png";
import Container from "react-bootstrap/Container";
import { Badge, Button, Dropdown, Figure, Image } from "react-bootstrap";
import TimeAgo from "react-timeago";

import {
  Link,
  Navigate,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UserPic from "../../Assets/Images/user-pic.jpg";
import UserDefaultPic from "../../Assets/Images/user-default.png";

import "./header.scss";
import {
  IS_MOBILE,
  auth_user,
  capitalizeName,
  fullName,
  getTimeDifference,
} from "../../_helpers/helper";
import { logout } from "../../services/logOutService";
import { logoutUser } from "redux/actions/UserActions";
import { connect } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  readNotification,
  userNotification,
} from "services/NotificationServices";
import { isLogin } from "services/JwtAuthService";
import NotificationListPart from "components/NotificationListPart";

function HeaderNav({ removeUserData, role }) {
  const userData = auth_user();
  const location = useLocation();
  const isManagerPath = location.pathname.startsWith("/manager/");

  const [notifications, setNotifications] = useState("");

  const getAllUserNotifications = useCallback(async () => {
    let response = await userNotification();
    if (response?.status) {
      setNotifications(response.data);
    }
  }, []);
  useEffect(() => {
    if (isLogin()) {
      getAllUserNotifications();
    }
  }, [getAllUserNotifications, location]);

  const [unreadLength, setUnreadLength] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    setUnreadLength(
      Array.isArray(notifications) &&
        notifications?.filter((d) => {
          return d.readStatus === 0;
        }).length
    );
  }, [notifications]);

  const signOut = (e) => {
    if (removeUserData) removeUserData();
    const res = logout();

    res && navigate(IS_MOBILE() ? "/mobile/auth/login" : "/auth/login");
  };
  const allNotification =
    Array.isArray(notifications) && notifications.length > 0
      ? notifications?.map((notification) => {
          return notification.id;
        })
      : null;
  const handleRead = async (notificationList) => {
    const response = await readNotification({
      notificationIds: notificationList,
    });
    if (response?.status) {
      getAllUserNotifications();
    }
  };
  return (
    <header className="topHeader">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <Link to={role ? `${role}/dashboard` : "/"}>
            <img src={logo} className="mainLogo" alt="logo" />
          </Link>

          {auth_user() && (
            <div className="d-flex align-items-center">
              {isManagerPath && (
                <Link
                  to="/create-opportunity"
                  className="btn btn-secondary-outline addIcon"
                >
                  Create opportunity
                </Link>
              )}
              <div className="notificationSec">
                <div className="dropdown">
                  <Button
                    variant="outline-dark"
                    onMouseEnter={(e) => getAllUserNotifications()}
                    // onTouchMoveCapture={(e) => handleRead(e)}
                  >
                    {unreadLength > 0 && <Badge>{unreadLength}</Badge>}
                  </Button>
                  <div className="dropdown-menu">
                    <div className="notificationTitleSec">
                      <h5>Notifications</h5>
                      <Link
                        className="btn btnlinkPrimary mark-read-btn"
                        onClick={() => handleRead(allNotification)}
                      >
                        Mark all as read
                      </Link>
                    </div>
                    <div className="notificationScrollSec">
                      <NotificationListPart
                        handleRead={handleRead}
                        notifications={notifications}
                      />

                      <div className="allNotification">
                        <Link
                          to="/notifications"
                          className="btn btnlinkPrimary"
                        >
                          View All Notifications
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Dropdown className="headerUserProfile">
                <Dropdown.Toggle>
                  {/* <Figure> */}
                  <div className="profileShortInfoSec">
                    <div className="profilePic ">
                      <Image
                        src={userData?.profilePicture || UserDefaultPic}
                        roundedCircle
                        // className="mt-2"
                      />
                    </div>
                  </div>
                  {/* </Figure> */}
                  <div className="userInfo">
                    <h4>{fullName(userData)}</h4>
                    <span>{userData?.email}</span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate(`/user/view`)}>
                    View User
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(`/user/edit`)}>
                    Edit User
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate(`/user/change-password`)}
                  >
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

// export default HeaderNav;
const mapStateToProps = (state) => ({
  role: state.role.role.role,
});

const mapDispatchToProps = {
  removeUserData: logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
