import React, { useEffect, useState } from "react";
import "./index.css";
import logo from "../../assets/logo.png"
import notificationBell from "../../assets/notification.png"
import user from "../../assets/user.png"
import NotificationModal from "../notificationModal";

function Header() {
  const [openModal, setOpenModal] = useState(false)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    setQuantity(Number(JSON.parse(localStorage.getItem('quantity') || "")) || 0)
    window.addEventListener('storage', () => {
      setQuantity(Number(JSON.parse(localStorage.getItem('quantity') || "")) || 0)
    });
  }, [])


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
          {quantity > 0 && <p className="quantityNotifications">{quantity}</p>}
          <img src={notificationBell} alt="notification icon" className="rightIcon" />
        </button>
        <img src={user} alt="user icon" className="rightIcon" />
      </div>
      <NotificationModal show={openModal} />
    </div>
  );
}

export default Header;
