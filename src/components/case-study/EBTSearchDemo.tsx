import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Utensils, ShoppingCart, Wheat, Apple, Store } from "lucide-react";

/**
 * A five-second demonstration of the decision the case study is about: filter
 * by what the person needs (hot food, grocery, bakery, market) instead of
 * listing every EBT retailer. The pills filter; nothing else is interactive.
 */
type Category = "All" | "Hot Food" | "Grocery" | "Bakery" | "Farmers Mkt";

const categories: { label: Category; icon: typeof Store }[] = [
  { label: "All", icon: Store },
  { label: "Hot Food", icon: Utensils },
  { label: "Grocery", icon: ShoppingCart },
  { label: "Bakery", icon: Wheat },
  { label: "Farmers Mkt", icon: Apple },
];

const stores: { name: string; address: string; category: Exclude<Category, "All">; badge: string; rating: number; distance: string; gradient: string }[] = [
  { name: "Dalle Kitchen", address: "1423 H St NW", category: "Hot Food", badge: "ACCEPTS EBT HOT FOOD", rating: 4.5, distance: "0.3 mi", gradient: "linear-gradient(135deg, #2d8a4e 0%, #1a5c34 100%)" },
  { name: "Green Valley Market", address: "820 7th St NW", category: "Grocery", badge: "ACCEPTS EBT", rating: 4.2, distance: "0.7 mi", gradient: "linear-gradient(135deg, #3a7c5f 0%, #1f6b45 100%)" },
  { name: "Fresh Corner Bakery", address: "512 K St NE", category: "Bakery", badge: "ACCEPTS EBT", rating: 4.8, distance: "1.1 mi", gradient: "linear-gradient(135deg, #4a9e6e 0%, #2d7a50 100%)" },
  { name: "Eastern Market Stalls", address: "225 7th St SE", category: "Farmers Mkt", badge: "ACCEPTS EBT, MATCHES $20", rating: 4.7, distance: "1.6 mi", gradient: "linear-gradient(135deg, #5aa87a 0%, #2f7d55 100%)" },
];

const EBTSearchDemo = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const results = activeCategory === "All" ? stores : stores.filter((s) => s.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, background: "#f5faf7", minHeight: "100%" }}>
      {/* Search bar */}
      <div style={{ background: "#2d8a4e", padding: "12px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <MapPin size={12} color="#2d8a4e" aria-hidden="true" />
          <span style={{ flex: 1, color: "#666", fontSize: 10 }}>Washington, DC</span>
          <div style={{ background: "#2d8a4e", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Search size={10} color="#fff" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Category pills: the one interaction */}
      <div role="group" aria-label="Filter results" style={{ display: "flex", gap: 6, padding: "10px 12px 6px", overflowX: "auto" }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveCategory(cat.label)}
              aria-pressed={active}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 10px", borderRadius: 10, border: "none", cursor: "pointer",
                background: active ? "#2d8a4e" : "#e8f5e9",
                color: active ? "#fff" : "#2d8a4e",
                fontSize: 8, fontWeight: 600, flexShrink: 0, transition: "all 0.2s",
              }}
            >
              <Icon size={14} aria-hidden="true" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" style={{ margin: "0 12px 6px", fontSize: 8, color: "#666" }}>
        {results.length} {results.length === 1 ? "place" : "places"} near you
      </p>

      {/* Results */}
      <ul style={{ listStyle: "none", margin: 0, padding: "0 12px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence initial={false}>
          {results.map((store) => (
            <motion.li
              key={store.name}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
            >
              <div style={{ height: 52, background: store.gradient, display: "flex", alignItems: "flex-end", padding: 8 }}>
                <span style={{ background: "#fff", color: "#2d8a4e", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                  ✓ {store.badge}
                </span>
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: "#1a1a1a" }}>{store.name}</div>
                <div style={{ fontSize: 8, color: "#888", marginTop: 2 }}>{store.address}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 2 }} aria-label={`Rated ${store.rating} out of 5`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} size={8} aria-hidden="true" fill={si < Math.floor(store.rating) ? "#f59e0b" : "none"} color={si < Math.floor(store.rating) ? "#f59e0b" : "#ccc"} />
                    ))}
                    <span style={{ fontSize: 8, color: "#888", marginLeft: 3 }}>{store.rating}</span>
                  </div>
                  <span style={{ fontSize: 8, color: "#888" }}>{store.distance}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default EBTSearchDemo;
