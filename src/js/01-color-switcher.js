const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

// btnStart.setAttribute('disabled', 'disabled');

function onBtnStartClick() {
  btnStart.setAttribute('disabled', 'disabled');
  btnStop.removeAttribute('disabled');
  timerId = setInterval(intervalColorSwitcher, 500);
}

function onBtnStopClick() {
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'disabled');
  clearInterval(timerId);
}

function intervalColorSwitcher() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
