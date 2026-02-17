import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const events = [
  { name: "Tigray Festival", date: "Aug 15, 2025", location: "Washington, DC", attendees: 234 },
  { name: "Mekete Fundraiser", date: "Sep 3, 2025", location: "Los Angeles, CA", attendees: 87 },
  { name: "Cultural Workshop", date: "Sep 20, 2025", location: "New York, NY", attendees: 42 },
  { name: "Support Group", date: "Oct 1, 2025", location: "Dallas, TX", attendees: 28 },
];

const EventCarousel = () => {
  const [rsvpd, setRsvpd] = useState<Set<number>>(new Set());

  const toggleRsvp = (index: number) => {
    setRsvpd((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-2 px-2">
      {events.map((event, i) => (
        <Card key={i} className="snap-start shrink-0 w-56 border-border bg-card/80">
          <CardContent className="p-4 space-y-3">
            <h4 className="font-bold text-foreground text-sm">{event.name}</h4>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                <span>{rsvpd.has(i) ? event.attendees + 1 : event.attendees} attending</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleRsvp(i)}
              className={`w-full py-1.5 rounded-md text-xs font-semibold transition-colors ${
                rsvpd.has(i)
                  ? "bg-accent/20 text-accent border border-accent/40"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {rsvpd.has(i) ? (
                <span className="flex items-center justify-center gap-1">
                  <Check className="h-3 w-3" /> RSVP'd
                </span>
              ) : (
                "RSVP"
              )}
            </motion.button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventCarousel;
