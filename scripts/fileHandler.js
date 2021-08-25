/* UPLOAD FUNCTIONS */
export const handleUploadEvent = (fileObject) => {
    const fileDisplay = document.getElementById('file-chosen')
    if(!fileObject) {
        fileDisplay.textContent = "Erro ao selecionar arquivo"
        return 
    }
    fileDisplay.textContent = fileObject.name
    readFile(fileObject)
}

const readFile = (file) => {
    if (!file) {
        return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
        window.localStorage.setItem('uploadedObject', e.target.result)
    }
    reader.readAsText(file)
}

/* DOWNLOAD FUNCTIONS */
export const handleDownloadEvent = () => {
    const data = getFileData()
    downloadFile(data)
}

export const getFileData = () => {
    const codedTable = encodeTransitionTable()

    const TMObject = {
        states: document.getElementById("states").value,
        initialState: document.getElementById("initial_state").value,
        finalStates: document.getElementById("final_states").value,
        entryAlphabet: document.getElementById("entry_alphabet").value,
        auxiliarAlphabet: document.getElementById("aux_alphabet").value,
        initialSymbol: document.getElementById("initial_symbol").value,
        blankSymbol: document.getElementById("blank_symbol").value,
        transitionTable: codedTable
    }
    return JSON.stringify(TMObject)
}

const downloadFile = (data) => {
    var blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, 'maqnorma.txt');
    } else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = 'maqnorma.txt';        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

const encodeTransitionTable = () => {
    const inputTable = document.getElementById('transition_table')
    const codedTable = []
    let rowLength = inputTable.rows.length

    for (let i = 0; i < rowLength; i++){ 
        const codedRow = []
        const oCells = inputTable.rows.item(i).cells
        const cellLength = oCells.length
        for(let j = 0; j < cellLength; j++){
            let cellValue
            if(i === 0 || j === 0) {
                cellValue = oCells.item(j).innerText
            } else {
                cellValue = oCells.item(j).children[0].value
            }
            codedRow.push(cellValue)
        }
        codedTable.push(codedRow)
    }
    return codedTable
}