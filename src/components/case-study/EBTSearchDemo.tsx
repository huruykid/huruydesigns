import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Search, MapPin, Navigation, SlidersHorizontal, UtensilsCrossed, ShoppingCart, Croissant,
  Carrot, Store, Star, Heart, List, Map as MapIcon, Clock, ChevronDown, Home, FileText, User,
} from "lucide-react";

/**
 * A working miniature of the shipped EBT Finder search screen (ebtfinder.org and
 * the iOS app), built from the app's own design: cream and forest palette, the
 * serif wordmark, the two-field search header, the category strip, and the store
 * card with its OPEN badge, EBT/RMP tags and distance. Category tabs and the Open
 * Now switch filter the list; the rest is static.
 *
 * Store data is a fixed sample around Sacramento, not live results.
 */

const C = {
  cream: "#FBF9F4",
  cream2: "#F4F0E5",
  ink: "#0E1410",
  forest: "#0F5132",
  muted: "#5C6660",
  rule: "#E5E1D7",
  rule2: "#D9D4C5",
  amber: "#8A5600",
  star: "#F5B400",
};
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";
const mono = "ui-monospace, 'SF Mono', Menlo, monospace";

type CategoryId = "nearby" | "hotmeals" | "grocery" | "bakery" | "farmersmarket";

const categories: { id: CategoryId; label: string; icon: typeof Store }[] = [
  { id: "nearby", label: "All Nearby", icon: Navigation },
  { id: "hotmeals", label: "Hot Meals", icon: UtensilsCrossed },
  { id: "grocery", label: "Grocery", icon: ShoppingCart },
  { id: "bakery", label: "Bakery", icon: Croissant },
  { id: "farmersmarket", label: "Farmers Market", icon: Carrot },
];

interface DemoStore {
  name: string;
  type: string;
  category: Exclude<CategoryId, "nearby"> | "convenience";
  address: string;
  distance: number;
  rating: number;
  ratings: number;
  open: boolean;
  rmp?: boolean;
  photo?: string;
  icon: typeof Store;
}

const stores: DemoStore[] = [
  { name: "Break Time Mini Mart", type: "Convenience store", category: "convenience", address: "924 8th St", distance: 0.1, rating: 4.1, ratings: 87, open: true, photo: "/images/ebtfinder/app/storefront-break-time.webp", icon: Store },
  { name: "Taqueria La Esperanza", type: "Restaurant", category: "hotmeals", address: "1215 J St", distance: 0.4, rating: 4.6, ratings: 312, open: true, rmp: true, icon: UtensilsCrossed },
  { name: "Midtown Fresh Market", type: "Grocery store", category: "grocery", address: "2000 P St", distance: 0.8, rating: 4.4, ratings: 540, open: true, icon: ShoppingCart },
  { name: "Sunrise Bakery & Donuts", type: "Bakery", category: "bakery", address: "1730 Broadway", distance: 1.2, rating: 4.7, ratings: 198, open: false, icon: Croissant },
  { name: "Central Farmers Market", type: "Farmers market", category: "farmersmarket", address: "8th & W St", distance: 1.6, rating: 4.8, ratings: 1204, open: false, icon: Carrot },
];

const tag = (color: string): CSSProperties => ({
  display: "inline-flex", alignItems: "center", padding: "1px 5px", borderRadius: 2, fontFamily: mono,
  fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color, background: `${color}1a`, border: `1px solid ${color}33`,
});

const control: CSSProperties = {
  display: "flex", alignItems: "center", gap: 4, height: 32, padding: "0 8px", borderRadius: 6,
  border: `1px solid ${C.rule2}`, background: "#fff", color: C.ink, fontSize: 12, whiteSpace: "nowrap",
};

const StoreCard = ({ store }: { store: DemoStore }) => {
  const Icon = store.icon;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 8, overflow: "hidden" }}>
      <div style={{ position: "relative", height: 120, background: C.cream2 }}>
        {store.photo ? (
          <img src={store.photo} alt={`Storefront of ${store.name}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, background: `${C.forest}0d` }}>
            <Icon size={20} strokeWidth={1.5} color={`${C.forest}59`} aria-hidden="true" />
            <span style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: `${C.forest}99` }}>{store.type}</span>
          </div>
        )}
        <span
          style={{
            position: "absolute", top: 6, left: 6, fontFamily: mono, fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "1px 4px", borderRadius: 2, background: store.open ? C.forest : "rgba(14,20,16,0.7)", color: store.open ? "#fff" : C.cream,
          }}
        >
          {store.open ? "Open" : "Closed"}
        </span>
        <span style={{ position: "absolute", top: 5, right: 5, width: 20, height: 20, borderRadius: 10, background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={13} color={C.ink} aria-hidden="true" />
        </span>
      </div>
      <div style={{ padding: "7px 8px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{store.name}</span>
          <Navigation size={13} color={C.forest} aria-hidden="true" style={{ flexShrink: 0 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 3, fontSize: 11.5, color: C.muted }}>
          <Star size={11} fill={C.star} color={C.star} aria-hidden="true" />
          <span style={{ color: C.ink, fontWeight: 500 }}>{store.rating}</span>
          <span>({store.ratings.toLocaleString()})</span>
          <span>· {store.type}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, gap: 6 }}>
          <div style={{ display: "flex", gap: 3 }}>
            <span style={tag(C.forest)}>EBT</span>
            {store.rmp && <span style={tag(C.amber)}>RMP</span>}
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11.5, color: C.muted, whiteSpace: "nowrap" }}>
            <MapPin size={11} aria-hidden="true" /> {store.address}
            <span style={{ color: C.ink, fontWeight: 500 }}> · {store.distance.toFixed(1)} mi</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const EBTSearchDemo = () => {
  const [category, setCategory] = useState<CategoryId>("nearby");
  const [openNow, setOpenNow] = useState(false);

  const results = stores
    .filter((s) => category === "nearby" || s.category === category)
    .filter((s) => !openNow || s.open);

  return (
    <div style={{ fontFamily: "'Geist', 'Inter', system-ui, sans-serif", fontSize: 13, color: C.ink, background: C.cream, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      {/* Wordmark header */}
      <div style={{ background: C.cream, borderBottom: `1px solid ${C.rule}`, padding: "8px 0", textAlign: "center" }}>
        <span style={{ fontFamily: serif, fontSize: 19, color: C.forest, lineHeight: 1 }}>ebtfinder</span>
      </div>

      {/* Search header */}
      <div style={{ background: C.cream, borderBottom: `1px solid ${C.rule}`, boxShadow: "0 1px 2px rgba(14,20,16,0.04)" }}>
        <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", height: 38, background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 7, overflow: "hidden" }}>
            <Search size={14} color={C.muted} aria-hidden="true" style={{ marginLeft: 9 }} />
            <span style={{ flex: 1, paddingLeft: 7, color: C.muted, fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden" }}>Search for stores like 'Walmart' or 'Pizza'...</span>
            <span style={{ width: 30, height: 30, marginRight: 4, borderRadius: 5, background: C.forest, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowRight size={14} color="#fff" aria-hidden="true" />
            </span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, height: 34, padding: "0 9px", background: "#fff", border: `1px solid ${C.rule2}`, borderRadius: 7, color: C.ink, fontSize: 12.5 }}>
              <MapPin size={14} color={C.muted} aria-hidden="true" /> Sacramento, CA
            </div>
            <span style={{ ...control, height: 34 }}>
              <Navigation size={13} aria-hidden="true" /> GPS
            </span>
          </div>
        </div>

        {/* Category strip: the decision the case study is about */}
        <div style={{ borderTop: `1px solid ${C.rule}80`, display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", overflowX: "auto" }}>
          <span style={{ ...control, flexShrink: 0 }}>
            <SlidersHorizontal size={13} aria-hidden="true" /> Filters
          </span>
          <div role="group" aria-label="Food categories" style={{ display: "flex", gap: 2 }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  aria-pressed={active}
                  style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", borderRadius: 7, border: "none",
                    borderBottom: `2px solid ${active ? C.forest : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap", fontSize: 12.5,
                    background: active ? `${C.forest}1a` : "transparent", color: active ? C.forest : C.muted, fontWeight: active ? 600 : 400,
                  }}
                >
                  <Icon size={15} aria-hidden="true" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ flex: 1, padding: "8px 10px 10px", background: `${C.cream2}66` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, background: `${C.cream2}`, borderRadius: 7, padding: "5px 8px", marginBottom: 7 }}>
          <span style={{ fontSize: 11.5, color: C.muted }}>Showing stores near Sacramento (approximate)</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: C.ink, whiteSpace: "nowrap" }}>
            <Navigation size={11} aria-hidden="true" /> Use exact location
          </span>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${C.rule}`, borderRadius: 8, padding: 8, marginBottom: 8 }}>
          <p aria-live="polite" style={{ margin: "0 0 6px", fontSize: 12.5, color: C.muted }}>
            Found {results.length} {results.length === 1 ? "store" : "stores"} within 5 miles
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
            <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: `1px solid ${C.rule2}` }}>
              <span style={{ display: "flex", alignItems: "center", gap: 3, height: 30, padding: "0 8px", background: C.ink, color: "#fff", fontSize: 12 }}>
                <List size={13} aria-hidden="true" /> List
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 3, height: 30, padding: "0 8px", background: "#fff", color: C.muted, fontSize: 12 }}>
                <MapIcon size={13} aria-hidden="true" /> Map
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={openNow}
              onClick={() => setOpenNow((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 5, border: "none", background: "transparent", padding: 0, cursor: "pointer", color: C.ink, fontSize: 12 }}
            >
              <span style={{ width: 26, height: 15, borderRadius: 8, background: openNow ? C.forest : C.rule2, position: "relative", transition: "background 0.2s" }}>
                <span style={{ position: "absolute", top: 2, left: openNow ? 13 : 2, width: 11, height: 11, borderRadius: 6, background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
              </span>
              <Clock size={13} aria-hidden="true" /> Open Now
            </button>
            <span style={control}><MapPin size={12} aria-hidden="true" /> 5 miles <ChevronDown size={12} aria-hidden="true" /></span>
            <span style={control}><Navigation size={12} aria-hidden="true" /> Nearest First <ChevronDown size={12} aria-hidden="true" /></span>
          </div>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          <AnimatePresence initial={false}>
            {results.map((store) => (
              <motion.li
                key={store.name}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <StoreCard store={store} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {results.length === 0 && (
          <p style={{ textAlign: "center", fontSize: 12.5, color: C.muted, padding: "18px 0" }}>No stores open right now in this category. Try All Nearby.</p>
        )}
      </div>

      {/* Bottom tab bar */}
      <nav aria-label="App tabs (preview)" style={{ position: "sticky", bottom: 0, display: "flex", justifyContent: "space-around", padding: "6px 4px 8px", background: "rgba(251,249,244,0.95)", borderTop: `1px solid ${C.rule}` }}>
        {[
          { label: "Home", icon: Home },
          { label: "Search", icon: Search, active: true },
          { label: "Saved", icon: Heart },
          { label: "Blog", icon: FileText },
          { label: "Profile", icon: User },
        ].map(({ label, icon: Icon, active }) => (
          <span key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, color: active ? C.forest : C.muted, fontWeight: active ? 600 : 400 }}>
            <Icon size={16} aria-hidden="true" />
            {label}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default EBTSearchDemo;
