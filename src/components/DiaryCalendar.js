/*
  --- COMPONENT: DiaryCalendar ---
  A month-view calendar that lets users:
  - Navigate months forward and backward (up to 5 years ago)
  - Click a day to view/add meals for that date
  - See which days have diary entries (highlighted)
*/

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../store/diarySlice";

function DiaryCalendar() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.diary.selectedDate);
  const entriesByDate = useSelector((state) => state.diary.entriesByDate);

  // Track which month/year is being viewed
  const [viewDate, setViewDate] = useState(new Date());

  const today = new Date();
  const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), 1);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Navigate to previous month
  function prevMonth() {
    const prev = new Date(year, month - 1, 1);
    if (prev >= fiveYearsAgo) {
      setViewDate(prev);
    }
  }

  // Navigate to next month
  function nextMonth() {
    const next = new Date(year, month + 1, 1);
    if (next <= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setViewDate(next);
    }
  }

  // Format a date as YYYY-MM-DD
  function formatDate(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  // Handle clicking a day
  function handleDayClick(day) {
    const dateStr = formatDate(year, month, day);
    dispatch(setSelectedDate(dateStr));
  }

  // Check if we can go further back
  const canGoPrev = new Date(year, month - 1, 1) >= fiveYearsAgo;
  const canGoNext = new Date(year, month + 1, 1) <= new Date(today.getFullYear(), today.getMonth(), 1);

  // Build calendar grid
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="diary-calendar">
      <div className="calendar-header">
        <button onClick={prevMonth} disabled={!canGoPrev} className="calendar-nav-btn">&lt;</button>
        <span className="calendar-title">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} disabled={!canGoNext} className="calendar-nav-btn">&gt;</button>
      </div>

      <div className="calendar-grid">
        {dayNames.map((d) => (
          <div key={d} className="calendar-day-name">{d}</div>
        ))}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="calendar-cell empty" />
        ))}
        {days.map((day) => {
          const dateStr = formatDate(year, month, day);
          const hasEntries = entriesByDate[dateStr] && entriesByDate[dateStr].length > 0;
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === today.toISOString().split("T")[0];

          return (
            <button
              key={day}
              className={`calendar-cell${isSelected ? " selected" : ""}${hasEntries ? " has-entries" : ""}${isToday ? " today" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DiaryCalendar;
