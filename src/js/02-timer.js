import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startButton: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartClick);
let endTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      endTime = selectedDates[0];
      if (endTime <= Date.now()) {
          Notify.failure('Please choose a date in the future');
          refs.startButton.disabled = true;
      }
      else {
          refs.startButton.disabled = false;
      }
  },
};
const fp = flatpickr(refs.dateInput, options); 

function onStartClick() {
    timerId = setInterval(updateClockFace, 1000);
    refs.startButton.disabled = true;
}

function updateClockFace() {
    let deltaTime = endTime - Date.now();
    if (deltaTime === 0) {
        clearInterval(timerId);
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}