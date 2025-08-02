import { EventCard } from "./event-card"

export const EventList = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )   
}