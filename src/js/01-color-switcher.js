const refs = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]')
};
let timerId = null;

refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', () => {
    clearInterval(timerId);
    refs.startButton.disabled = false;
})

function onStartClick() {
    timerId = setInterval(setRandomBodyColor, 1000);
    refs.startButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setRandomBodyColor() {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
}
