import {
  format,
  addMonths,
  subMonths,
  fromUnixTime,
  getUnixTime,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"
const datePickerButton = document.querySelector(".date-picker-button")
const datePicker = document.querySelector(".date-picker")
const currentMonth = document.querySelector(".current-month")
const nextMonthButton = document.querySelector(".next-month-button")
const prevMonthButton = document.querySelector(".prev-month-button")
const datePickerGrid = document.querySelector(".date-picker-grid-dates")
let selectedDate

let currentDate = new Date()
setDate(currentDate)
setCurrentMonth(currentDate)
datePickerButton.addEventListener("click", () => {
  datePicker.classList.toggle("show")
  selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  setCurrentMonth(selectedDate)
})
function setDate(date) {
  datePickerButton.dataset.selectedDate = getUnixTime(date)
  datePickerButton.innerText = format(date, "MMMM do yyyy")
}
function setCurrentMonth(currentDate) {
  currentMonth.innerText = format(currentDate, "MMMM  yyyy")
  setUpDates()
}
nextMonthButton.addEventListener("click", () => {
  currentDate = addMonths(currentDate, 1)
  setCurrentMonth(currentDate)
  setUpDates()
})
prevMonthButton.addEventListener("click", () => {
  currentDate = subMonths(currentDate, 1)
  setCurrentMonth(currentDate)
  setUpDates()
})
function setUpDates() {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  datePickerGrid.innerHTML = ""
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  dates.forEach((date) => {
    const dateButton = document.createElement("button")
    dateButton.classList.add("date")
    dateButton.innerText = date.getDate()
    if (!isSameMonth(date, currentDate)) {
      dateButton.classList.add("date-picker-other-month-date")
    }
    if (isSameDay(date, selectedDate)) {
      dateButton.classList.add("selected")
    }
    datePickerGrid.append(dateButton)
    dateButton.addEventListener("click", () => {
      datePicker.classList.toggle("show")
      selectedDate = date
      setCurrentMonth(date)
      setDate(date)
      setUpDates()
    })
  })
}
