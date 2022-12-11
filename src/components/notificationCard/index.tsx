import React, { useState } from "react";
import { notificationCardProps } from "../../types";
import "./index.css";
import unreadIcon from "../../assets/unread.png"
import readIcon from "../../assets/read.png"

function NotificationCard(props: notificationCardProps) {
    const [read, setRead] = useState(props.wasRead) //Control the mail icon state

    /*
    * Control read state to change the mail icon on the card
    * Send the read action from NotificationModal, so they can deal with the read array  
    */
    const readCard = () => {
        setRead(!read)
        props.read()
    }

  /*
  * Create the Date text based on the diff between today and the card content date
  * After checks which period should use and return the text, checking first if is singular or plural
  */
    const returnDateText = () => {
        const diffTime = props.card.attachedContent?.date ? Math.abs(new Date().getTime() - props.card.attachedContent?.date.getTime()) : 0;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 7) {
            return `${diffDays} ${diffDays > 1 ? "DAYS" : "DAY"} AGO`
        }
        if (diffDays < 30) {
            const diffWeeks = Math.floor(diffDays / 7)
            return `${diffWeeks} ${diffWeeks > 1 ? "WEEKS" : "WEEK"} AGO`
        }
        if (diffDays < 365) {
            const diffMonths = Math.floor(diffDays / 30)
            return `${diffMonths} ${diffMonths > 1 ? "MONTHS" : "MONTH"} AGO`
        }
        else {
            const diffYear = Math.floor(diffDays / 365)
            return `${diffYear} ${diffYear > 1 ? "YEARS" : "YEAR"} AGO`
        }
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
                <p className="footerText">{returnDateText()} - New {props.card.attachedContent?.type}</p>
            </div>
        </button >
    )
}

export default NotificationCard