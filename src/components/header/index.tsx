import React, { useState } from "react";
import "./index.css";
import logo from "../../assets/logo.png"
import notificationBell from "../../assets/notification.png"
import user from "../../assets/user.png"
import NotificationModal from "../notificationModal";
function Header() {
  const [openModal, setOpenModal] = useState(false)

  const controlModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className="headerWrapper">
      <div>
        <img src={logo} alt="Logo Deezer" className="logoHeader" />
      </div>
      <div className="linksWrapper">
        <a className="link" href="/">Home</a>
        <a className="link" href="/">My Music</a>
        <a className="link" href="/">Browser</a>
        <a className="link" href="/">Search</a>
      </div>
      <div className="rightWrapper">
        <button className="notificationButton" onClick={() => controlModal()}>
          <img src={notificationBell} alt="notification icon" className="rightIcon" />
        </button>
        <img src={user} alt="user icon" className="rightIcon" />
      </div>
      <NotificationModal show={openModal} />
    </div>
  );
}

export default Header;
