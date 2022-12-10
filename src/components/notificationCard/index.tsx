import React, { useState } from "react";
import { notificationCardProps } from "../../types";
import "./index.css";
import unreadIcon from "../../assets/unread.png"
import readIcon from "../../assets/read.png"

function NotificationCard(props: notificationCardProps) {
    const [read, setRead] = useState(props.wasRead)

    const readCard = () => {
        setRead(!read)
        props.read()
    }

    return (
        <button className={"cardWrapper"} onClick={readCard}>
            <div className="cardPrincipal">
                <div className="infoWrapper">
                    <img
                        className="imageWrapper"
                        src={props.card.attachedContent?.image}
                        alt={props.card.attachedContent?.title + " - " + props.card.attachedContent?.subtitle}
                    />
                    <div className="textWrapper">
                        <p className="cardTitle">{props.card.attachedContent?.title}</p>
                        <p className="cardSubtitle">{props.card.attachedContent?.subtitle}</p>
                    </div>
                </div>
                <div>
                    <div className="readButton">
                        {
                            read ?
                                <img src={readIcon} className="mailIcon" alt="Read Icon" /> :
                                <img src={unreadIcon} className="mailIcon" alt="Unread Icon" />
                        }
                    </div>
                </div>
            </div>
            <div className="footerWrapper">
                <p className="footerText">{props.card.attachedContent?.date} - New {props.card.attachedContent?.type}</p>
            </div>
        </button >
    )
}

export default NotificationCard