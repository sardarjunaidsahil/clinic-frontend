import { useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { appointmentService } from "../../services/appointmentService";

const STATUS_COLORS = {
  PENDING: { bg: "#FFF8E1", color: "#F57F17", border: "#F57F17" },
  CONFIRMED: { bg: "#F5EFE6", color: "#7D9B76", border: "#7D9B76" },
  COMPLETED: { bg: "#F1F5F1", color: "#4A7A45", border: "#4A7A45" },
  CANCELLED: { bg: "#FEF2F2", color: "#B91C1C", border: "#B91C1C" },
  RESCHEDULED: { bg: "#F0F0FF", color: "#5B5BD6", border: "#5B5BD6" },
};

export default function AppointmentsTable({ appointments: propAppointments }) {
  const { isMobile } = useResponsive();
  const [search, setSearch] = useState("");
  const [localApts, setLocalApts] = useState(propAppointments || []);

  const apts = propAppointments || localApts;

  const filtered = search
    ? apts.filter(
        (a) =>
          a.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
          a.service_name?.toLowerCase().includes(search.toLowerCase()) ||
          a.doctor_name?.toLowerCase().includes(search.toLowerCase()),
      )
    : apts;

  const handleStatus = async (id, status) => {
    try {
      await appointmentService.updateStatus(id, status);
      setLocalApts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a)),
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "14px" }}>
        <input
          type="text"
          placeholder="Search patient, doctor, service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "9px 13px",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "#2D2D2D",
            backgroundColor: "#FDFAF5",
            border: "1px solid #E8DDD0",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#7D9B76")}
          onBlur={(e) => (e.target.style.borderColor = "#E8DDD0")}
        />
      </div>

      <div style={{ overflowX: "auto", border: "1px solid #E8DDD0" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#F5EFE6",
                borderBottom: "1px solid #E8DDD0",
              }}
            >
              {[
                "Patient",
                "Service",
                "Doctor",
                "Date & Time",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6B6B6B",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B6B6B",
                  }}
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              filtered.map((apt) => {
                const sc = STATUS_COLORS[apt.status] || STATUS_COLORS.PENDING;
                const date = apt.date
                  ? new Date(apt.date).toLocaleDateString("en-PK", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—";
                return (
                  <tr
                    key={apt.id}
                    style={{
                      borderBottom: "1px solid #F5EFE6",
                      backgroundColor: "#FDFAF5",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#F9F6F2")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#FDFAF5")
                    }
                  >
                    <td
                      style={{
                        padding: "13px 14px",
                        fontFamily: "var(--font-body)",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#2D2D2D",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {apt.patient_name || apt.patient?.name || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#6B6B6B",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {apt.service_name || apt.service?.name || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#7D9B76",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {apt.doctor_name || apt.doctor?.name || "—"}
                    </td>
                    <td
                      style={{
                        padding: "13px 14px",
                        fontFamily: "var(--font-body)",
                        fontSize: "12px",
                        color: "#6B6B6B",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {date} · {apt.time_slot || apt.time || "—"}
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          backgroundColor: sc.bg,
                          border: `1px solid ${sc.border}`,
                          fontFamily: "var(--font-body)",
                          fontSize: "9px",
                          fontWeight: "600",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: sc.color,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td style={{ padding: "13px 14px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                        }}
                      >
                        {apt.status === "PENDING" && (
                          <button
                            onClick={() => handleStatus(apt.id, "CONFIRMED")}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#7D9B76",
                              color: "#FDFAF5",
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status === "CONFIRMED" && (
                          <button
                            onClick={() => handleStatus(apt.id, "COMPLETED")}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "#2D2D2D",
                              color: "#FDFAF5",
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Complete
                          </button>
                        )}
                        {!["CANCELLED", "COMPLETED"].includes(apt.status) && (
                          <button
                            onClick={() => handleStatus(apt.id, "CANCELLED")}
                            style={{
                              padding: "4px 10px",
                              backgroundColor: "transparent",
                              border: "1px solid #E8DDD0",
                              fontFamily: "var(--font-body)",
                              fontSize: "9px",
                              fontWeight: "600",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              color: "#6B6B6B",
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
