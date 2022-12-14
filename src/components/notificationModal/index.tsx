import React, { useState, useEffect } from "react";
import { card, notificationModalProps } from "../../types";
import NotificationCard from "../notificationCard";
import "./index.css";
import mockDataJson from "../../mockData.json"

//Mock Initial Data
const mockData: card[] = JSON.parse(JSON.stringify(mockDataJson))

function NotificationModal(props: notificationModalProps) {
    const [data, setData] = useState<card[]>([])//State will be use as the storage of data
    const [hide] = useState(false) //If change this for true, will be able to see how the component deal with empty data
    const [readItems, setReadItems] = useState<number[]>([])//Control the list of read items


    /**
     * Generate random new dates so the notifications don't look the same
     */
    const randomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

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
                mockData.forEach((card) => {
                    const newCard = { ...card }
                    newCard.id = newData.length
                    if (newCard?.attachedContent) {
                        const attachedContent = { ...newCard.attachedContent }
                        attachedContent.date = randomDate(randomDate(new Date(2018, 0, 1), new Date()), new Date());
                        newCard.attachedContent = attachedContent
                    }
                    newData.push(newCard)
                })
                setData(newData)
                localStorage.setItem('quantity', JSON.stringify(newData.length - readItems.length));
                window.dispatchEvent(new Event("storage"));
            }
        }
    }
    /**
     * Insert the mockData for the first time so the user can start with some data and create the id propety, 
     * Even with repeated, will be able to sort and control the read propety in a correct way 
     */
    const startData = () => {
        const newData = data
        mockData.forEach((card, index) => {
            const cardWithId = { ...card }
            cardWithId.id = index
            newData.push(cardWithId)
        })
        setData(newData)
        localStorage.setItem('quantity', JSON.stringify(newData.length - readItems.length));
    }

    //Used to set the quantity of the notifications the first time after load the fake data
    useEffect(() => {
        if (data.length === 0)
            startData()
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
    const insertReadCard = (card: card) => {
        const newRead = readItems
        const index = card.id ?? 0
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
            if (card1.attachedContent?.date && card2.attachedContent?.date) {
                return new Date(card2.attachedContent.date).getTime() - new Date(card1.attachedContent.date).getTime()
            }

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
                                    <NotificationCard key={index} card={card} read={() => insertReadCard(card)} wasRead={checkRead(index) > -1} />
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