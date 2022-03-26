import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    form: document.querySelector('.form'),
};
const { elements: { delay, step, amount } } = refs.form;

refs.form.addEventListener('submit', onFormSubmit); 

function onFormSubmit(evt) {
  evt.preventDefault();
  const n = Number(amount.value);
  let delayValue = Number(delay.value); 
  for (let i = 0; i < n; i++) {
    createPromise(i+1, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delayValue += Number(step.value);
  };
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position,delay})
      } else {
        reject({position,delay})
      }
    }, delay)
  });
  return promise;  
}
  


