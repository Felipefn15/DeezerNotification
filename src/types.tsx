export interface notificationModalProps {
    show: boolean
}

// cardType = [
//     "recommendation",
//     "newContent",
//     "sharing",
//     "update"
// ]

// contentType = [
//     "album",
//     "playlist",
//     "single",
//     "podcast"
// ]

export interface content {
    title: string,
    subtitle: string,
    date: string,
    image: string,
    type: string,
}

export interface card {
    type: string,
    attachedContent?: content,
    validPeriod?: string,
    description?: string,
}

export interface notificationCardProps {
    card: card
}