import React, { useState, useEffect } from "react";
import { card, notificationModalProps } from "../../types";
import NotificationCard from "../notificationCard";
import "./index.css";
import khalidImage from "../../assets/mock/khalid.png"
import imagineDragon from "../../assets/mock/imgdrg.png"
import samSmith from "../../assets/mock/sm.png"
import marronFive from "../../assets/mock/mr5.png"
import arianaGrande from "../../assets/mock/argr.png"
import podcast from "../../assets/mock/podcast.jpg"
//Mock Initial Data
const mockData: card[] = [
    {
        type: "recommendation",
        attachedContent: {
            title: "Free Spirit",
            subtitle: "Khalid",
            date: new Date("10/10/2022"),
            type: "Album",
            image: khalidImage
        },
    },
    {
        type: "sharing",
        attachedContent: {
            title: "Origins",
            subtitle: "Imagine Dragons",
            date: new Date("10/20/2022"),
            type: "Album",
            image: imagineDragon
        },
    },
    {
        type: "update",
        attachedContent: {
            title: "Unholly",
            subtitle: "Sam Smith",
            date: new Date("10/30/2022"),
            type: "Single",
            image: samSmith
        },
    },
    {
        type: "update",
        attachedContent: {
            title: "This is",
            subtitle: "Marron Five",
            date: new Date("11/10/2022"),
            type: "Playlist",
            image: marronFive
        },
    },
    {
        type: "newContent",
        attachedContent: {
            title: "Sweetener",
            subtitle: "Ariana Grande",
            date: new Date("11/30/2022"),
            type: "Album",
            image: arianaGrande
        },
    },
    {
        type: "recommendation",
        attachedContent: {
            title: "StarTalk",
            subtitle: "Neil deGrasse Tyson",
            date: new Date("12/10/2022"),
            type: "Podcast",
            image: podcast
        },
    },

]


function NotificationModal(props: notificationModalProps) {
    const [data, setData] = useState<card[]>(mockData)
    const [hide] = useState(false)
    const [readItems, setReadItems] = useState<number[]>([])

    /*
    *   Used to create the Infinity Scroll fealing, everytime that hits the bottom
    *   will be added more itens until get bigger than 90 itens
    *   I choosed 90 just because of the volume, but this a example
    */
    function isScrolling(event: any) {
        if (event.currentTarget.offsetHeight + event.currentTarget.scrollTop + 1 < event.currentTarget.scrollHeight) {
            return;
        }
        else {
            if (data.length < 90) {
                const newData = data
                newData.push(...mockData)
                console.log({ newData })
                setData(newData)
                localStorage.setItem('quantity', JSON.stringify(newData.length - readItems.length));
                window.dispatchEvent(new Event("storage"));
            }
        }
    }

    //Used to set the quantity of the notifications the first time after load the fake data
    useEffect(() => {
        localStorage.setItem('quantity', JSON.stringify(data.length - readItems.length));
    },)

    //This function check if the notification was read and return the array possition
    const checkRead = (index: number) => {
        return readItems.indexOf(index)
    }

    /*
    *   If the index exists on the read array, will be removed
    *   If is not there yet, will be added
    *   After that create the new list of read notifications and save this on local storage
    */
    const insertReadCard = (index: number) => {
        const newRead = readItems
        const position = checkRead(index)
        if (position > -1)
            newRead.splice(position, 1)
        else
            newRead.push(index)
        setReadItems(newRead)
        localStorage.setItem('quantity', JSON.stringify(data.length - newRead.length));
        window.dispatchEvent(new Event("storage"));
    }

    /*
    *   Create the list of notifications card based on the date of the notification, newest to oldest
    */
    const getSortedData = () => {
        return data.sort((card1, card2) => {
            if (card1.attachedContent?.date && card2.attachedContent)
                return card1.attachedContent.date.getTime() - card2.attachedContent.date.getTime()
            else
                return 1
        })
    }

    /*
    *   Check if the button turn the show true, if so, show the modal
    */
    if (props.show)
        return (
            <div className="modalBackground">
                <div className="modalWrapper fadeIn">
                    <div className="titleWrapper">
                        <p className="title">Notifications</p>
                    </div>
                    <div className="cardsWrapper" onScroll={isScrolling}>
                        {data.length > 0 && !hide ?
                            getSortedData().map((card, index) => {
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