import { useInv } from "../store";

export function WeightBar() {
  const { weight, maxWeight } = useInv();
  const pct = Math.min(100, (weight / maxWeight) * 100);
  const over = pct > 90;
  return (
    <div className="weightbar">
      <div className="weightbar__track">
        <div
          className={"weightbar__fill" + (over ? " is-high" : "")}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="weightbar__label">
        {weight.toFixed(1)} <i>/</i> {maxWeight.toFixed(0)} kg
      </span>
    </div>
  );
}
