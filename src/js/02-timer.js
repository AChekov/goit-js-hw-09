import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStartRef = document.querySelector('button[data-start]');
const dayRef = document.querySelector('[data-days]');
const hourRef = document.querySelector('[data-hours]');
const minRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');

let timerId = 0;
let selectedDates = 0;

btnStartRef.setAttribute('disabled', 'disabled');

btnStartRef.addEventListener('click', onBtnStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      btnStartRef.setAttribute('disabled', 'disabled');
      Notify.failure('Please choose a date in the future');
    } else {
      calendarValue(selectedDates[0]);
      btnStartRef.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function calendarValue(value) {
  selectedDates = value;
}

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    timerId = setInterval(() => {
      const deltaTime = selectedDates - Date.now();
      const componentsTimer = convertMs(deltaTime);

      if (deltaTime < 1000) {
        clearInterval(timerId);
        this.isActive = false;
      }
      updateTimerField(componentsTimer);
    }, 1000);
  },
};

function onBtnStartClick() {
  timer.start();
}

function updateTimerField({ days, hours, minutes, seconds }) {
  dayRef.textContent = `${days}`;
  hourRef.textContent = `${hours}`;
  minRef.textContent = `${minutes}`;
  secRef.textContent = `${seconds}`;
}

const addLeadingZero = value => String(value).padStart(2, '0');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
