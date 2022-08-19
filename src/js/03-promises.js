import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  button: document.querySelector('button'),
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
    const {
    elements: { delay, step, amount }
  } = e.currentTarget; 
  let currentDelay = Number(delay.value);
  let delayStep = Number(step.value);
  for (let position = 1; position <= Number(amount.value); position += 1) {
 createPromise(position, currentDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  currentDelay += delayStep;
};
};

function createPromise(position, delay){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
    if(shouldResolve) {
      resolve({ position, delay });
    } reject({ position, delay });
  }, delay)
  });
};