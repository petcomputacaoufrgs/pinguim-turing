import { runMachine, runStep } from './machine.js'
let pauseExecution = false
let entryWord = undefined

const currentInfo = {
    currentState: undefined, 
    currentTape: undefined,
    headPosition: 0,
    step: 0
}

const goBack = document.getElementById('go-back-button')
goBack.addEventListener('click', event => {
    window.localStorage.setItem('load-machine', 'true')
})

const wordInput = document.getElementById('word_input')
wordInput.addEventListener('change', event => {
    const entryWordDiv = document.getElementById('entry-word')
    entryWordDiv.innerHTML = "<p>" + wordInput.value + "</p>"
})

const waitingTimeSetter = document.getElementById('await_ms')
waitingTimeSetter.addEventListener('change', event => {
    const waitingTimeValue = document.getElementById('await_value')
    waitingTimeValue.innerText = waitingTimeSetter.value
})

const resetButton = document.getElementById('reset_button')
resetButton.addEventListener('click', event => {
    if(entryWord) {
        const entryWordDiv = document.getElementById('entry-word')
        entryWordDiv.innerHTML = entryWord
    }
})

const runButton = document.getElementById('run_button')
runButton.addEventListener('click', event => {
    entryWord = wordInput.value
    const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))

    if(waitingTimeSetter.value === '0') {
        runMachine('@' + entryWord + '-', TMObject)
    } else {
        runWithPauses(waitingTimeSetter.value)
    }
})

const stepButton = document.getElementById('step_button')
stepButton.addEventListener('click', event => {
    entryWord = wordInput.value
    const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))
    let finished = false

    if(!finished) {
        entryWord, TMObject, currentInfo, finished = runStep(entryWord + '-', TMObject, currentInfo)
    }
})

const stopButton = document.getElementById('stop_button')
stopButton.addEventListener('click', event => {
    pauseExecution = !pauseExecution

    if(!pauseExecution) {
        runWithPauses(waitingTimeSetter.value)
    }
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function runWithPauses(ms) {
    entryWord = wordInput.value
    const TMObject = JSON.parse(window.localStorage.getItem('TMObject'))
    let finished = false
    while(!finished && !pauseExecution) {
        entryWord, TMObject, currentInfo, finished = runStep(entryWord, TMObject, currentInfo)
        await sleep(ms);
    }
}