import React, { useEffect, useState } from "react";
import { card, notificationModalProps } from "../../types";
import NotificationCard from "../notificationCard";
import "./index.css";
import khalidImage from "../../assets/mock/khalid.png"
import imagineDragon from "../../assets/mock/imgdrg.png"
import samSmith from "../../assets/mock/sm.png"
import marronFive from "../../assets/mock/mr5.png"
import arianaGrande from "../../assets/mock/argr.png"
import podcast from "../../assets/mock/podcast.jpg"

const mockData: card[] = [
    {
        type: "recommendation",
        attachedContent: {
            title: "Free Spirit",
            subtitle: "Khalid",
            date: "5 Days ago",
            type: "Album",
            image: khalidImage
        },
    },
    {
        type: "sharing",
        attachedContent: {
            title: "Origins",
            subtitle: "Imagine Dragons",
            date: "2 Months ago",
            type: "Album",
            image: imagineDragon
        },
    },
    {
        type: "update",
        attachedContent: {
            title: "Unholly",
            subtitle: "Sam Smith",
            date: "1 Week ago",
            type: "Single",
            image: samSmith
        },
    },
    {
        type: "update",
        attachedContent: {
            title: "This is",
            subtitle: "Marron Five",
            date: "1 Month ago",
            type: "Playlist",
            image: marronFive
        },
    },
    {
        type: "newContent",
        attachedContent: {
            title: "Sweetener",
            subtitle: "Ariana Grande",
            date: "1 day ago",
            type: "Album",
            image: arianaGrande
        },
    },
    {
        type: "recommendation",
        attachedContent: {
            title: "StarTalk",
            subtitle: "Neil deGrasse Tyson",
            date: "1 day ago",
            type: "Podcast",
            image: podcast
        },
    },

]



function NotificationModal(props: notificationModalProps) {
    const [data, setData] = useState<card[]>(mockData)

    useEffect(() => {
        setData(mockData)
    }, [mockData])

    if (props.show)
        return (
            <div className="modalBackground">
                <div className="modalWrapper fadeIn">
                    <div className="titleWrapper">
                        <p className="title">Notifications</p>
                    </div>
                    <div className="cardsWrapper">
                        {data.length > 0 ?
                            data.map((card) => {
                                return (
                                    <NotificationCard card={card} />
                                )
                            })
                            :
                            <p className="noNotificationText">No notifications</p>
                        }
                    </div>
                </div>
            </div>
        )
    else
        return null
}

export default NotificationModal