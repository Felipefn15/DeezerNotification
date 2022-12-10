import React, { useState } from "react";
import { notificationCardProps } from "../../types";
import "./index.css";


function NotificationCard(props: notificationCardProps) {
    return (
        <div className="cardWrapper">
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
            <div className="footerWrapper">
                <p className="footerText">{props.card.attachedContent?.date} - New {props.card.attachedContent?.type}</p>
            </div>
        </div>
    )
}

export default NotificationCard