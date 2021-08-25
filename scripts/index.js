import {inputMessages, transtionTableMessages, warningAndSuccessMessages, otherConstants} from './constants.js'
import { handleUploadEvent, handleDownloadEvent, getFileData } from './fileHandler.js'

const statesInput = document.getElementById("states")
const initialStateInput = document.getElementById("initial_state")
const finalStateInput = document.getElementById("final_states")
const entryAlphabetInput = document.getElementById("entry_alphabet")
const auxiliarAlphabetInput = document.getElementById("aux_alphabet")
const initialSymbolInput = document.getElementById("initial_symbol")
const blankSymbolInput = document.getElementById("blank_symbol")
const transitionTableDiv = document.getElementById('transition_table')
const errorsLogDiv = document.getElementById('errors_area')

let allStatesList
let initialState
let finalStatesList
let entryAlphabet
let auxiliarAlphabet
let initialSymbol
let blankSymbol
let alphabet
let transitionTable = []

/* Download Button */
const dowloadButton = document.getElementById('download-button')
dowloadButton.addEventListener('click', event => {
    handleDownloadEvent()
})

/* Upload Button */
const uploadButton = document.getElementById('upload_button')
uploadButton.addEventListener('change', event => {
    handleUploadEvent(event.target.files[0])
    const funciona = JSON.parse(window.localStorage.getItem('uploadedObject'))
    setInputs(funciona)
})

const setInputs = (inputObjects) => {
    errorsLogDiv.innerText = otherConstants.BLANK_CHAR
    statesInput.value = inputObjects.states
    initialStateInput.value = inputObjects.initialState
    finalStateInput.value = inputObjects.finalStates
    entryAlphabetInput.value = inputObjects.entryAlphabet
    auxiliarAlphabetInput.value = inputObjects.auxiliarAlphabet
    initialSymbolInput.value = inputObjects.initialSymbol
    blankSymbolInput.value = inputObjects.blankSymbol

    if(treatInputs()) {
        decodeTransitionTable(transitionTableDiv, inputObjects.transitionTable)
        verifyCodeButton.classList.remove('disabled')
    }
}

const decodeTransitionTable = (transitionTable, codedTable) => {
    const rowCount = codedTable.length
    const colCount = codedTable[0].length
    for(let i = 0; i < rowCount; i++) {
        const tableRow = document.createElement('tr')
        for(let j = 0; j < colCount; j++) {
            if(i === 0 || j === 0) {
                createElement(tableRow, 'td', codedTable[i][j])
            } else {
                createInputElement(tableRow, 'td', codedTable[i][j])
            }
        }
        transitionTable.append(tableRow)
    }
}

/* Generate Table Button */
const generateTableButton = document.getElementById('generate_table')
generateTableButton.addEventListener('click', event => {
    if(treatInputs()) {
        createInputTable()
        verifyCodeButton.classList.remove('disabled')
    }
})

const treatInputs = () => {
    clearInputTable()
    errorsLogDiv.innerText = otherConstants.BLANK_CHAR
    
    if(!validStatesInput() || !validInitialStateInput() || !validFinalStatesInput()
    || !validEntryAlphabetInput() || !validAuxiliarAlphabetInput() 
    || !validInitialSymbolInput() || !validBlankSymbolInput()) {
        return false
    }
    
    alphabet = [initialSymbol, ...entryAlphabet, ...auxiliarAlphabet, blankSymbol]
    return true
}

/* Execute Code Button */
const executeCodeButton = document.getElementById('execute_code')
executeCodeButton.addEventListener('click', event => {
    const inputObjects = getFileData()
    window.localStorage.setItem('inputsObject', inputObjects)
})

/* Verify Code Button */
const verifyCodeButton = document.getElementById('verify_code')
verifyCodeButton.addEventListener("click", event => {
    if(createTransitionTable()) {
        createTMObject()
        const executeCodeButton = document.getElementById('execute_code')
        executeCodeButton.classList.remove('disabled')
    }
})

const createTMObject = () => {
    const neutralStates = allStatesList.filter((element) => {
        return !(element === initialState || finalStatesList.includes(element))
    })
    
    const TMObject = {
        alphabet: alphabet,
        initialState: initialState,
        states: neutralStates,
        finalStates: finalStatesList,
        transitions: transitionTable
    }
    window.localStorage.setItem('TMObject', JSON.stringify(TMObject))
}

const createInputElement = (parent, elementType, insideText) => {
    let child = document.createElement(elementType)
    child.innerHTML = '<input value="' + insideText + '" type="text" class="transition input_box" name="transition_input">'
    parent.append(child)
}

const validStatesInput = () => {
    allStatesList = document.getElementById("states").value
    if(!allStatesList) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_NO_STATES
        return false
    }
    allStatesList = listify(allStatesList)
    return true
}

const validInitialStateInput = () => {
    initialState = document.getElementById("initial_state").value
    if(!initialState) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_NO_INITIAL_STATE
        return false
    } else if(listify(initialState).length > 1) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_INITIAL_STATE
        return false
    }
    initialState = initialState.trim()
    if(!allStatesList.includes(initialState)) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_NO_INITIAL_STATE_FOUND
        return false
    }
    return true
}

const validFinalStatesInput = () => {
    finalStatesList = document.getElementById("final_states").value
    if(!finalStatesList) {
        finalStatesList = []
    } else {
        finalStatesList = listify(finalStatesList)
        const finalStatesNotIncluded = finalStatesList.filter((element) => allStatesList.indexOf(element) === -1)
        if(finalStatesNotIncluded.length > 0) {
            errorsLogDiv.innerHTML = inputMessages.ERROR_NO_FINAL_STATE_FOUND
            return false
        }
    }
    return true
}

const validEntryAlphabetInput = () => {
    entryAlphabet = document.getElementById("entry_alphabet").value
    if(!entryAlphabet) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_NO_ENTRY_ALPHABET
        return false
    }
    entryAlphabet = listify(entryAlphabet)
    let ok = true
    let i = 0
    while(ok && i < entryAlphabet.length) {
        if(entryAlphabet[i].length > 1) {
            ok = false
        }
        i++
    }

    if(!ok) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_CHAR_ENTRY_ALPHABET
        return false
    }

    return true
}

const validAuxiliarAlphabetInput = () => {
    auxiliarAlphabet = document.getElementById("aux_alphabet").value
    if(!auxiliarAlphabet) {
        auxiliarAlphabet = []
    } else {
        auxiliarAlphabet = listify(auxiliarAlphabet) 
        const repeatedChar = entryAlphabet.some(char => auxiliarAlphabet.indexOf(char) >= 0)
        if(repeatedChar) {
            errorsLogDiv.innerHTML = inputMessages.ERROR_REPEATED_CHARACTER
            return false
        }

        let ok = true
        let i = 0
        while(ok && i < auxiliarAlphabet.length) {
            if(auxiliarAlphabet[i].length > 1) {
                ok = false
            }
            i++
        }

        if(!ok) {
            errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_CHAR_AUXILIAR_ALPHABET
            return false
        }
    }
    return true
}

const validInitialSymbolInput = () => {
    initialSymbol = document.getElementById("initial_symbol").value
    if(!initialSymbol) {
        initialSymbol = "@"
    } else if (listify(initialSymbol).length > 1) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_INITIAL_SYMBOL
        return false
    } else if (initialSymbol.length > 1){
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_CHAR_INITIAL_SYMBOL
        return false
    }
    return true
}

const validBlankSymbolInput = () => {
    blankSymbol = document.getElementById("blank_symbol").value
    if(!blankSymbol) {
        blankSymbol = "-"
    } else if (listify(blankSymbol).length > 1) {
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_BLANK_SYMBOL
        return false
    } else if (blankSymbol.length > 1){
        errorsLogDiv.innerHTML = inputMessages.ERROR_MORE_THAN_ONE_CHAR_BLANK_SYMBOL
        return false
    }
    return true
}

const listify = (element) => {
    return element.split(',').map((state) => state.trim())
}

const createInputTable = () => {
    const transitionTable = document.getElementById('transition_table')
    createHeaderRow(transitionTable)
    createStatesRow(transitionTable)
}

const createElement = (parent, elementType, insideText) => {
    let child = document.createElement(elementType)
    child.innerHTML = insideText
    parent.append(child)
}

const createHeaderRow = (transitionTable) => {
    const tableRow = document.createElement('tr')
    createElement(tableRow, 'th', otherConstants.BLANK_CHAR)

    alphabet.forEach(element => {
        createElement(tableRow, 'th', element)
    })
    transitionTable.append(tableRow)
}

const createStatesRow = (transitionTable) => {
    allStatesList.forEach(element => {
        const tableRow = document.createElement('tr')
        createElement(tableRow, 'td', element)
        for (let i = 0; i < alphabet.length; i++) {
            createElement(tableRow, 'td', '<input type="text" class="transition input_box" name="transition_input">')
        }
        transitionTable.append(tableRow)
    })
}

const clearInputTable = () => {
    const inputTable = document.getElementById('transition_table')
    inputTable.innerHTML = otherConstants.BLANK_CHAR
}

const createTransitionTable = () => {
    errorsLogDiv.innerText = otherConstants.BLANK_CHAR
    const directions = ["E", "D", ""]
    const inputTable = document.getElementById('transition_table')
    let rowLength = inputTable.rows.length

    for (let i = 1; i < rowLength; i++){  
       let oCells = inputTable.rows.item(i).cells
       let cellLength = oCells.length
       for(let j = 1; j < cellLength; j++){
            let cellVal = oCells.item(j).children[0].value
            if(cellVal) {
                cellVal = listify(cellVal)
                
                if(cellVal.length !== 0 && cellVal.length !== 3) {
                    errorsLogDiv.innerHTML = transtionTableMessages.ERROR_TRANSITION_TABLE_BEGINNIG + allStatesList[i - 1] + " x " + alphabet[j - 1] + transtionTableMessages.ERROR_INCORRECT_NUMBER_OF_PARAMETERS_TRANSITION
                    return false
                }
                // estado, char, movimento
                if(!allStatesList.includes(cellVal[0])) {
                    errorsLogDiv.innerHTML = transtionTableMessages.ERROR_TRANSITION_TABLE_BEGINNIG + allStatesList[i - 1] + " x " + alphabet[j - 1] + transtionTableMessages.ERROR_INVALID_NEW_STATE
                    return false
                }
                
                if(!alphabet.includes(cellVal[1])) {
                    errorsLogDiv.innerHTML = transtionTableMessages.ERROR_TRANSITION_TABLE_BEGINNIG + allStatesList[i - 1] + " x " + alphabet[j - 1] + transtionTableMessages.ERROR_INVALID_NEW_CHARACTER
                    return false
                }
    
                if(!directions.includes(cellVal[2])) {
                    errorsLogDiv.innerHTML = transtionTableMessages.ERROR_TRANSITION_TABLE_BEGINNIG + allStatesList[i - 1] + " x " + alphabet[j - 1] + transtionTableMessages.ERROR_INVALID_DIRECTION
                    return false
                }
    
                let transition = [allStatesList[i - 1], alphabet[j - 1], cellVal[0], cellVal[1], cellVal[2]]
                transitionTable.push(transition)
            }
        }
    }

    if(transitionTable.length < 1) {
        errorsLogDiv.innerHTML = warningAndSuccessMessages.WARNING_NO_TRANSITIONS_MACHINE
    }
    
    errorsLogDiv.innerHTML += warningAndSuccessMessages.SUCCESS_MESSAGE
    return true
}

if(localStorage.getItem('load-machine') && localStorage.getItem('load-machine') === 'true') {
    const funciona = JSON.parse(window.localStorage.getItem('inputsObject'))
    setInputs(funciona)
} 
