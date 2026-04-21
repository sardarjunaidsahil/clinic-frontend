import {
  filterAvailableSlots,
  generateTimeSlots,
} from "../../utils/generateSlots";

const BOOKED = ["9:30 AM", "10:30 AM", "3:00 PM"];

export default function TimeSlotPicker({ selected, onSelect, date }) {
  const allSlots = generateTimeSlots(9, 17, 30);
  const slots = filterAvailableSlots(allSlots, BOOKED);

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          fontWeight: "600",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#7D9B76",
          marginBottom: "12px",
        }}
      >
        {date
          ? `Available slots — ${date.toLocaleDateString("en-PK", { weekday: "short", month: "short", day: "numeric" })}`
          : "Select a date first"}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
        }}
      >
        {slots.map(({ time, available }) => {
          const isSelected = selected === time;
          return (
            <button
              key={time}
              onClick={() => available && date && onSelect(time)}
              disabled={!available || !date}
              style={{
                padding: "10px 6px",
                backgroundColor: isSelected
                  ? "#7D9B76"
                  : !available
                    ? "#F5F5F5"
                    : "#FDFAF5",
                border: isSelected ? "1px solid #7D9B76" : "1px solid #E8DDD0",
                color: isSelected
                  ? "#FDFAF5"
                  : !available
                    ? "#C8C8C8"
                    : !date
                      ? "#C8C8C8"
                      : "#2D2D2D",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                cursor: !available || !date ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                textDecoration: !available ? "line-through" : "none",
              }}
              onMouseEnter={(e) => {
                if (available && date && !isSelected)
                  e.currentTarget.style.backgroundColor = "#F5EFE6";
              }}
              onMouseLeave={(e) => {
                if (available && date && !isSelected)
                  e.currentTarget.style.backgroundColor = "#FDFAF5";
              }}
            >
              {time}
            </button>
          );
        })}
      </div>

      {selected && date && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 14px",
            backgroundColor: "#F5EFE6",
            border: "1px solid #7D9B76",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#7D9B76",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#7D9B76",
              fontWeight: "600",
            }}
          >
            {date.toLocaleDateString("en-PK", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            at {selected}
          </span>
        </div>
      )}
    </div>
  );
}
