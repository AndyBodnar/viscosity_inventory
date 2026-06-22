import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInv, type OpenPayload } from "./store";
import { useNuiEvent } from "./nui/useNuiEvent";
import { Grid } from "./components/Grid";
import { Hotbar } from "./components/Hotbar";
import { WeightBar } from "./components/WeightBar";
import { ItemDetail } from "./components/ItemDetail";
import { WeaponView } from "./components/WeaponView";
import { mockPayload } from "./dev/mock";

const TABS = ["Inventory", "Clothing", "Skills", "Settings"];

export function App() {
  const { visible, view, open, close } = useInv();
  const [tab, setTab] = useState("Inventory");

  useNuiEvent<OpenPayload>("open", (p) => open(p));

  useEffect(() => {
    if (typeof (window as any).GetParentResourceName !== "function") open(mockPayload);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (useInv.getState().view === "weapon") useInv.getState().closeWeapon();
        else close();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  if (!visible) return null;

  return (
    <div className="inv-root">
      <motion.div
        className={"inv-shell" + (view === "weapon" ? " is-weapon" : "")}
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <header className="topbar">
          <div className="brand">
            <span className="brand__mark">V</span>
            <span className="brand__text">VISCOSITY<i>Inventory</i></span>
          </div>
          <nav className="tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={"tab" + (t === tab ? " is-active" : "")}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </nav>
          <button className="close" onClick={() => close()}>ESC</button>
        </header>

        {view === "weapon" ? (
          <WeaponView />
        ) : tab === "Inventory" ? (
          <div className="inv-body">
            <aside className="zone zone--left">
              <div className="ped">
                <div className="ped__ghost">◆</div>
              </div>
              <Hotbar />
            </aside>

            <section className="zone zone--center">
              <div className="zone__head">
                <h2>Inventory</h2>
                <WeightBar />
              </div>
              <Grid zone="inv" />
            </section>

            <aside className="zone zone--right">
              <div className="zone__head"><h2>Ground</h2></div>
              <Grid zone="ground" />
            </aside>

            <ItemDetail />
          </div>
        ) : (
          <div className="tab-soon">
            <h2>{tab}</h2>
            <p>Coming soon</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
