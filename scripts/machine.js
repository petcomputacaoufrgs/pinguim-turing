/**
 * @description run the entire machine
 * @param {string} entryWord entry word of TM
 * @param {object} TuringMachine TM object defined
 */
export const runMachine = (entryWord, TuringMachine) => {
    let currentState = TuringMachine.initialState
    let currentTape = entryWord.split("")
    let headPosition = 0
    let step = 0
    let indefinition = false

    console.log(`Estado: ${currentState} // Passo ${step}: ${currentTape} -> Head position: ${currentTape[headPosition]}`)


    while (TuringMachine.finalStates.indexOf(currentState) === -1 || !indefinition) {
        let currentChar = currentTape[headPosition]

        let transition = TuringMachine.transitions.find(element => {
            return element[0] === currentState && element[1] === currentChar
        })

        if(transition) {
            step += 1
            currentTape[headPosition] = transition[3]
            currentState = transition[2]

            switch (transition[4]) {
                case 'D':
                    headPosition+= 1
                    break
                case 'E':
                    headPosition-= 1
                    break
                case '':
                default:
                    break
            }

            console.log(`Estado: ${currentState} // Passo ${step}: ${currentTape} -> Head position: ${currentTape[headPosition]}`)
        } else {
            indefinition = true
        }
    }
    
    const entryWordDiv = document.getElementById('entry-word')
    entryWordDiv.innerHTML = `<p>${currentTape.reduce((string, char) => {
        return string += char
    }, "")}</p>`
    entryWordDiv.innerHTML += `<p>${indefinition ? 'palavra válida' : 'palavra inválida'}</p>`
}

/**
 * @description set a timeout
 * @param {string} entryWord entry word of TM
 * @param {object} TuringMachine TM object defined
 * @param {object} currentInfo the current state of TM
 * @returns {string, object, object, boolean} return stats updated
 */
export const runStep = (entryWord, TuringMachine, currentInfo) => {
    if(currentInfo.step === 0) {
        currentInfo.currentState = TuringMachine.initialState
        currentInfo.currentTape = entryWord.split("")
    }
    const entryWordDiv = document.getElementById('entry-word')
    let finished = false
    let currentChar = currentInfo.currentTape[currentInfo.headPosition]

    let transition = TuringMachine.transitions.find(element => {
        return element[0] === currentInfo.currentState && element[1] === currentChar
    })

    if(transition) {
        currentInfo.step += 1
        currentInfo.currentTape[currentInfo.headPosition] = transition[3]
        currentInfo.currentState = transition[2]

        switch (transition[4]) {
            case 'D':
                currentInfo.headPosition+= 1
                break
            case 'E':
                currentInfo.headPosition-= 1
                break
            case '':
            default:
                break
        }

        const outputTable = document.createElement('table')
        let tableLength = currentInfo.currentTape.length + 1
        const tableRowArrow = document.createElement('tr')
        for(let i = 0; i < tableLength; i++) {
            let child = document.createElement('td')
            currentInfo.headPosition === i? child.innerHTML = '🠗' : child.innerHTML = ''
            tableRowArrow.append(child)
        }
        outputTable.append(tableRowArrow)
        const tableRowWord = document.createElement('tr')
        currentInfo.currentTape.forEach(element => {
            let child = document.createElement('td')
            child.innerHTML = element
            tableRowWord.append(child)
        })
        outputTable.appendChild(tableRowWord)

        entryWordDiv.innerHTML = ''
        entryWordDiv.append(outputTable)
    } else {
        entryWordDiv.innerHTML += `<p>palavra inválida</p>`
        finished = true
    }

    if (TuringMachine.finalStates.indexOf(currentInfo.currentState) !== -1) {
        entryWordDiv.innerHTML += `<p>palavra válida</p>`
        finished = true
    }

    return entryWord, TuringMachine, currentInfo, finished
}
