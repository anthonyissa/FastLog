"use client"

import { Event } from "@/types/Event"

export const Events = ({ events }: { events: Event[] }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.message}</div>
      ))}
    </div>
  )
}
