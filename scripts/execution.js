import { runMachine, runStep } from './machine.js'
let pauseExecution = false
let entryWord = undefined

// Control info about the TM current state
const currentInfo = {
  currentState: undefined,
  currentTape: undefined,
  headPosition: 0,
  step: 0,
}

// Go back buton control
// set the load-machine to true, so the inputs can be reloaded in the index
const goBack = document.getElementById('go-back-button')
goBack.addEventListener('click', (event) => {
  window.localStorage.setItem('load-machine', 'true')
})

// Entry word control
// update the current text by the user
const wordInput = document.getElementById('word_input')
wordInput.addEventListener('change', (event) => {
  const entryWordDiv = document.getElementById('entry-word')
  entryWordDiv.innerHTML = '<p>' + wordInput.value + '</p>'
})

// Await time control
// update the current time setted by the user
const waitingTimeSetter = document.getElementById('await_ms')
waitingTimeSetter.addEventListener('change', (event) => {
  const waitingTimeValue = document.getElementById('await_value')
  waitingTimeValue.innerText = waitingTimeSetter.value
})

// Reset button control
// reset the entry word
const resetButton = document.getElementById('reset_button')
resetButton.addEventListener('click', (event) => {
  if (entryWord) {
    const entryWordDiv = document.getElementById('entry-word')
    entryWordDiv.innerHTML = entryWord
  }
})

//Run button control
// run the machine
const runButton = document.getElementById('run_button')
runButton.addEventListener('click', (event) => {
  entryWord = wordInput.value
  if (!entryWord.startsWith('@')) {
    entryWord = '@' + entryWord
  }
  const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))

  if (waitingTimeSetter.value === '0') {
    runMachine(entryWord + '-', TMObject)
  } else {
    runWithPauses(waitingTimeSetter.value)
  }
})

// Step button control
// run one step
const stepButton = document.getElementById('step_button')
stepButton.addEventListener('click', (event) => {
  entryWord = wordInput.value
  const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))
  let finished = false

  if (!finished) {
    entryWord,
      TMObject,
      currentInfo,
      (finished = runStep(entryWord + '-', TMObject, currentInfo))
  }
})

// Stop button control
// stop current execution
const stopButton = document.getElementById('stop_button')
stopButton.addEventListener('click', (event) => {
  pauseExecution = !pauseExecution

  if (!pauseExecution) {
    runWithPauses(waitingTimeSetter.value)
  }
})

/**
 * @description set a timeout
 * @param {number} milliseconds miliseconds of the time out
 * @returns {Promise} Promise of the setted timeout
 */
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

/**
 * @description run the Turing Machine with a given interval
 * @param {number} ms interval between each step
 */
async function runWithPauses(ms) {
  entryWord = wordInput.value
  const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))
  let finished = false
  while (!finished && !pauseExecution) {
    entryWord,
      TMObject,
      currentInfo,
      (finished = runStep(entryWord, TMObject, currentInfo))
    await sleep(ms)
  }
}
