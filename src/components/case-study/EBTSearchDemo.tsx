import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Home, Heart, User, ChevronLeft, Clock, Utensils, ShoppingCart, Wheat, Apple, Store } from "lucide-react";

const categories = [
  { label: "All", icon: Store },
  { label: "Fast Food", icon: Utensils },
  { label: "Grocery", icon: ShoppingCart },
  { label: "Bakery", icon: Wheat },
  { label: "Farmers Mkt", icon: Apple },
];

const stores = [
  {
    name: "Dalle Kitchen",
    address: "1423 H St NW, Washington DC",
    rating: 4.5,
    distance: "0.3 mi",
    gradient: "linear-gradient(135deg, #2d8a4e 0%, #1a5c34 100%)",
  },
  {
    name: "Green Valley Market",
    address: "820 7th St NW, Washington DC",
    rating: 4.2,
    distance: "0.7 mi",
    gradient: "linear-gradient(135deg, #3a7c5f 0%, #1f6b45 100%)",
  },
  {
    name: "Fresh Corner Deli",
    address: "512 K St NE, Washington DC",
    rating: 4.8,
    distance: "1.1 mi",
    gradient: "linear-gradient(135deg, #4a9e6e 0%, #2d7a50 100%)",
  },
];

const EBTSearchDemo = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, background: "#f5faf7", minHeight: "100%", position: "relative" }}>
      {/* Status bar */}
      <div style={{ background: "#2d8a4e", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: 9, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 14, height: 8, border: "1px solid #fff", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, right: 4, background: "#fff", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ background: "#2d8a4e", padding: "4px 12px 12px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "7px 12px", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <MapPin size={12} color="#2d8a4e" />
          <span style={{ flex: 1, color: "#666", fontSize: 10 }}>Washington, DC</span>
          <div style={{ background: "#2d8a4e", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Search size={10} color="#fff" />
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: "flex", gap: 6, padding: "10px 12px 6px", overflowX: "auto" }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 10px", borderRadius: 10, border: "none", cursor: "pointer",
                background: active ? "#2d8a4e" : "#e8f5e9",
                color: active ? "#fff" : "#2d8a4e",
                fontSize: 8, fontWeight: 600, flexShrink: 0, transition: "all 0.2s",
              }}
            >
              <Icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Store cards */}
      <AnimatePresence mode="wait">
        {selectedStore === null ? (
          <motion.div
            key="list"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "6px 12px 70px", display: "flex", flexDirection: "column", gap: 10 }}
          >
            {stores.map((store, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
              >
                <div style={{ height: 60, background: store.gradient, display: "flex", alignItems: "flex-end", padding: 8 }}>
                  <span style={{ background: "#fff", color: "#2d8a4e", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>
                    ✓ ACCEPTS EBT
                  </span>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontWeight: 700, fontSize: 11, color: "#1a1a1a" }}>{store.name}</div>
                  <div style={{ fontSize: 8, color: "#888", marginTop: 2 }}>{store.address}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={8} fill={si < Math.floor(store.rating) ? "#f59e0b" : "none"} color={si < Math.floor(store.rating) ? "#f59e0b" : "#ccc"} />
                      ))}
                      <span style={{ fontSize: 8, color: "#888", marginLeft: 3 }}>{store.rating}</span>
                    </div>
                    <span style={{ fontSize: 8, color: "#888" }}>{store.distance}</span>
                  </div>
                  <button
                    onClick={() => setSelectedStore(i)}
                    style={{
                      width: "100%", marginTop: 8, padding: "6px 0", borderRadius: 6,
                      background: "#2d8a4e", color: "#fff", border: "none",
                      fontSize: 9, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            style={{ padding: "0 0 70px" }}
          >
            <div style={{ height: 100, background: stores[selectedStore].gradient, position: "relative" }}>
              <button
                onClick={() => setSelectedStore(null)}
                style={{ position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <ChevronLeft size={14} color="#2d8a4e" />
              </button>
            </div>
            <div style={{ padding: "12px", background: "#fff", margin: "0 12px", borderRadius: 12, marginTop: -20, position: "relative", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <span style={{ background: "#e8f5e9", color: "#2d8a4e", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>✓ ACCEPTS EBT</span>
              <h3 style={{ fontWeight: 700, fontSize: 14, marginTop: 6, color: "#1a1a1a" }}>{stores[selectedStore].name}</h3>
              <p style={{ fontSize: 9, color: "#888", marginTop: 2 }}>{stores[selectedStore].address}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={10} fill={si < Math.floor(stores[selectedStore].rating) ? "#f59e0b" : "none"} color={si < Math.floor(stores[selectedStore].rating) ? "#f59e0b" : "#ccc"} />
                ))}
                <span style={{ fontSize: 9, color: "#888" }}>{stores[selectedStore].rating}</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <div style={{ flex: 1, background: "#e8f5e9", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                  <Clock size={12} color="#2d8a4e" style={{ margin: "0 auto 2px" }} />
                  <div style={{ fontSize: 8, fontWeight: 600, color: "#2d8a4e" }}>Open Now</div>
                  <div style={{ fontSize: 7, color: "#666" }}>9AM - 9PM</div>
                </div>
                <div style={{ flex: 1, background: "#e8f5e9", borderRadius: 8, padding: "8px", textAlign: "center" }}>
                  <MapPin size={12} color="#2d8a4e" style={{ margin: "0 auto 2px" }} />
                  <div style={{ fontSize: 8, fontWeight: 600, color: "#2d8a4e" }}>{stores[selectedStore].distance}</div>
                  <div style={{ fontSize: 7, color: "#666" }}>Away</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      <div style={{
        position: "sticky", bottom: 0, background: "#fff", borderTop: "1px solid #e8f5e9",
        display: "flex", justifyContent: "space-around", padding: "8px 0 6px",
      }}>
        {[
          { icon: Home, label: "Home" },
          { icon: Search, label: "Search" },
          { icon: Heart, label: "Saved" },
          { icon: User, label: "Profile" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: item.label === "Search" ? "#2d8a4e" : "#aaa", fontSize: 7 }}>
            <item.icon size={14} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EBTSearchDemo;
