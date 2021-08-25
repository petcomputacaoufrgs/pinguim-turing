export const inputMessages = {
    ERROR_NO_STATES: "<p class='error-message'>[ERRO] 'Todos os estados': por favor, forneça ao menos um estado</p>",
    ERROR_NO_INITIAL_STATE: "<p class='error-message'>[ERRO]: 'Estado inicial': por favor, forneça um estado inicial</p>",
    ERROR_MORE_THAN_ONE_INITIAL_STATE: "<p class='error-message'>[ERRO] 'Estado inicial': por favor, forneça apenas um estado inicial</p>",
    ERROR_NO_INITIAL_STATE_FOUND: "<p class='error-message'>[ERRO] 'Estado inicial': o estado inicial fornecido não está na lista de estados</p>",
    ERROR_NO_FINAL_STATE_FOUND: "<p class='error-message'>[ERRO] 'Estados finais': um ou mais estados finais fornecidos não estão na lista de estados</p>",
    ERROR_NO_ENTRY_ALPHABET: "<p class='error-message'>[ERRO] 'Alfabeto de entrada': por favor, forneça pelo menos um caracter como alfabeto de entrada</p>",
    ERROR_MORE_THAN_ONE_CHAR_ENTRY_ALPHABET: "<p class='error-message'>[ERRO] 'Alfabeto de entrada': cada símbolo do alfabeto deve ser apenas um caracter</p>",
    ERROR_REPEATED_CHARACTER: "<p class='error-message'>[ERRO] 'Alfabeto auxiliar': caracteres repetidos em alfabeto de entrada e alfabeto auxiliar</p>",
    ERROR_MORE_THAN_ONE_CHAR_AUXILIAR_ALPHABET: "<p class='error-message'>[ERRO] 'Alfabeto auxiliar': cada símbolo do alfabeto deve ser apenas um caracter</p>",
    ERROR_MORE_THAN_ONE_INITIAL_SYMBOL: "<p class='error-message'>[ERRO] 'Símbolo de início': por favor, forneça apenas um símbolo inicial</p>",
    ERROR_MORE_THAN_ONE_CHAR_INITIAL_SYMBOL: "<p class='error-message'>[ERRO] 'Símbolo de início': o símbolo inicial deve ser apenas um caracter</p>",
    ERROR_MORE_THAN_ONE_BLANK_SYMBOL: "<p class='error-message'>[ERRO] 'Símbolo de branco': por favor, forneça apenas um símbolo branco</p>",
    ERROR_MORE_THAN_ONE_CHAR_BLANK_SYMBOL: "<p class='error-message'>[ERRO] 'Símbolo de branco': o símbolo de branco deve ser apenas um caracter</p>"
}

export const transtionTableMessages = {
    ERROR_TRANSITION_TABLE_BEGINNIG: "<p class='error-message'>[ERRO] 'Tabela de transição' em ",
    ERROR_INCORRECT_NUMBER_OF_PARAMETERS_TRANSITION: ": a transição precisa de três parâmetros no seguinte formato => [novo estado], [novo caracter], [direção]</p>",
    ERROR_INVALID_NEW_STATE: ": o estado fornecido não está na lista de estados</p>",
    ERROR_INVALID_NEW_CHARACTER: ": o caracter fornecido não está na lista de caracteres de nenhum alfabeto</p>",
    ERROR_INVALID_DIRECTION: ": a direção fornecida é inválida. As direções possíveis são 'E', 'D' ou ''(caracter vazio)</p>",
}

export const warningAndSuccessMessages = {
    WARNING_NO_TRANSITIONS_MACHINE: "<p class='warning-message'>[AVISO]: A máquina de estados gerada não possui transições</p>",
    SUCCESS_MESSAGE: "<p class='success-message'>[SUCESSO]: Máquina gerada com sucesso!</p>"
}

export const otherConstants = {
    BLANK_CHAR: ""
}