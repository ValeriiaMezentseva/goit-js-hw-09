import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
  
};

let intervalId = null;
let selectedDate;
let currentDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
    Notiflix.Notify.warning('"Please choose a date in the future"', {
         position: 'center-top',
        });
    refs.startBtn.disabled = true;
    return;
    }
    refs.startBtn.disabled = false;
    },
    // getValidDate(selectedDate, currentDate);
};
    
flatpickr(refs.dateInput, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

refs.startBtn.disabled = true;

function onStartBtnClick() {
    refs.startBtn.disabled = true;
    intervalId = setInterval(setRemainingTime, 1000)
    refs.dateInput.disabled = true;
};

function setRemainingTime() {
    currentDate = Date.now();
    const timeDifference = new Date(refs.dateInput.value) - currentDate;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    renderCountdown(days, hours, minutes, seconds);
    if (timeDifference <= 1000) {
        clearInterval(intervalId);
    }
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderCountdown(day, hour, minute, second) {
    refs.days.textContent = pad(day);
    refs.hours.textContent = pad(hour);
    refs.minutes.textContent = pad(minute);
    refs.seconds.textContent = pad(second);
    
};

function pad(value) {
  return String(value).padStart(2, '0');
}



