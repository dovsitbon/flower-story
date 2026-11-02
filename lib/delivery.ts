import data from "@/data/products.json";

const d = data.delivery;
export const minLeadHours = d.minLeadHours;

export const toISODate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export function earliestDate(now = new Date()) {
  const t = new Date(now.getTime() + d.minLeadHours * 3600_000);
  for (let i = 0; i < 30; i++) {
    const iso = toISODate(t);
    if (!dateProblem(iso, now)) return iso;
    t.setDate(t.getDate() + 1);
  }
  return toISODate(t);
}

export function dateProblem(iso: string, now = new Date()): "closed" | "lead" | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "closed";
  const date = new Date(`${iso}T12:00:00`);
  if (d.closedWeekdays.includes(date.getDay())) return "closed";
  if (d.blockedDates.some((b) => b.date === iso)) return "closed";
  const endOfDay = new Date(`${iso}T20:00:00`);
  if (endOfDay.getTime() - now.getTime() < d.minLeadHours * 3600_000) return "lead";
  return null;
}

export function slotsFor(iso: string) {
  if (!iso) return d.slots;
  return new Date(`${iso}T12:00:00`).getDay() === 5 ? d.fridaySlots : d.slots;
}
