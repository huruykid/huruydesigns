import { useState } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "Hot Food", "Grocery", "Farmers Market", "Open Now"];

const stores = [
  { name: "Fresh Market", distance: "0.3 mi", rating: 4.5, type: "Grocery" },
  { name: "Taqueria Sol", distance: "0.5 mi", rating: 4.8, type: "Hot Food" },
  { name: "Green Farms Stand", distance: "1.2 mi", rating: 4.2, type: "Farmers Market" },
];

const EBTSearchDemo = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? stores : stores.filter((s) => s.type === active);

  return (
    <div className="bg-background text-foreground text-[12px] p-3 space-y-3">
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/60 px-2.5 py-2">
        <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground text-[11px]">Search stores near you</span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-muted-foreground text-[10px]">
        <MapPin className="h-3 w-3" />
        <span>Washington, DC 20001</span>
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors ${
              active === cat
                ? "bg-accent text-accent-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Store cards */}
      <div className="space-y-2">
        {filtered.map((store) => (
          <div
            key={store.name}
            className="rounded-lg border border-border bg-card p-2.5 space-y-1.5 shadow-[0_1px_4px_rgba(0,0,0,0.07)]"
          >
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-[12px]">{store.name}</h4>
              <Badge className="text-[8px] px-1.5 py-0 bg-green-600/90 text-white border-0 shrink-0">
                ACCEPTS EBT
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                {store.rating}
              </span>
              <span>·</span>
              <span>{store.distance}</span>
              <span>·</span>
              <span>{store.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EBTSearchDemo;
