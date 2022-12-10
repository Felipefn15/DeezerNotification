import React, { useState } from "react";
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
    const [data, /*setData*/] = useState<card[]>(mockData)
    const [readItems, setReadItems] = useState<number[]>([])

    // useEffect(() => {
    //     setData(mockData)
    // }, [mockData])

    const checkRead = (index: number) => {
        return readItems.indexOf(index)
    }

    const insertReadCard = (index: number) => {
        const newRead = readItems
        const position = checkRead(index)
        if (position > -1)
            newRead.splice(position, 1)
        else
            newRead.push(index)
        setReadItems(newRead)
    }

    if (props.show)
        return (
            <div className="modalBackground">
                <div className="modalWrapper fadeIn">
                    <div className="titleWrapper">
                        <p className="title">Notifications</p>
                    </div>
                    <div className="cardsWrapper">
                        {data.length > 0 ?
                            data.map((card, index) => {
                                return (
                                    <NotificationCard key={index} card={card} read={() => insertReadCard(index)} wasRead={checkRead(index) > -1} />
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