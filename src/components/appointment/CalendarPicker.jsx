import { useState } from "react";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isPast,
  isToday,
} from "../../utils/formatDate";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function CalendarPicker({ selected, onSelect }) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  return (
    <div
      style={{
        backgroundColor: "#F5EFE6",
        border: "1px solid #E8DDD0",
        padding: "18px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#7D9B76",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="#7D9B76"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </button>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "18px",
            fontWeight: "500",
            color: "#2D2D2D",
          }}
        >
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#7D9B76",
            display: "flex",
            alignItems: "center",
            padding: "4px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3l5 5-5 5"
              stroke="#7D9B76"
              strokeWidth="1.2"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "4px",
        }}
      >
        {DAY_NAMES.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: "600",
              color: "#6B6B6B",
              padding: "4px 0",
              letterSpacing: "0.04em",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {days.map((day) => {
          const past = isPast(day);
          const today_ = isToday(day);
          const isSelected =
            selected && day.toDateString() === selected.toDateString();

          return (
            <button
              key={day.getDate()}
              onClick={() => !past && onSelect(day)}
              disabled={past}
              style={{
                padding: "8px 4px",
                border:
                  today_ && !isSelected
                    ? "1px solid #7D9B76"
                    : "1px solid transparent",
                cursor: past ? "not-allowed" : "pointer",
                backgroundColor: isSelected ? "#7D9B76" : "transparent",
                color: isSelected ? "#FDFAF5" : past ? "#C8C8C8" : "#2D2D2D",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: today_ ? "600" : "400",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!past && !isSelected)
                  e.currentTarget.style.backgroundColor = "#E8DDD0";
              }}
              onMouseLeave={(e) => {
                if (!past && !isSelected)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
