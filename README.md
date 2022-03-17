# Simulador Máquina de Turing

#### Projeto: Pinguim

#### Linguagem utilizada: Javascript

#### Autor: [Vic](https://github.com/vickyad)

## Sobre o Pinguim

O projeto Pinguim foi criado em 2021 e tem como propósito reformular os simuladores de máquinas teóricas utilizadas na disciplina de Teoria da Computação.

A disciplina estuda os limites da computabilidade. Sendo utilizadas máquinas teóricas, com capacidade de realizar o mesmo que um computador atual, porém de forma mais simplificada. Tais máquinas teóricas rementem aos primeiros modelos de computação, que mais se aproximavam da arquitetura de computadores digitais. Atualmente o projeto desenvolve a Máquina de Turing, o Cálculo Lambda e a Máquina Norma.

Portanto, os simuladores se inserem como importantes ferramentas de auxílio na disciplina para os alunos testarem e validarem seus conhecimentos na elaboração e implementação dos seus algoritmos.

O projeto tem como objetivo final entregar uma interface mais amigável, com uma melhor performance, além de trazer funcionalidades que facilitem o desenvolvimento e programação dentro desses simuladores.

### Organização do repositório

O repositório possui duas páginas HTML na raiz, `index.html` e `execution.html`, que correspondem as duas páginas do simulador. Além disso, há duas pastas `styles` e `scripts`, que contém os arquivos `.css` e `.js`, respectivamente.

#### Pasta `scripts`

A pasta script é composta por 6 arquivos javascript

##### `constants.js`

Arquivo com todas as mensagens usadas no código

##### `index.js`

Arquivo que manipula os elementos HTML do arquivo `index.html`

##### `execution.js`

Arquivo que manipula os elementos HTML do arquivo `execution.html`

##### `machine.js`

Arquivo com as funções que rodam a máquina de turing com uma palavra de entrada

##### `fileHandler.js`

Arquivo com funções para manipulação de arquivos externos

##### `script.js`

Arquivo com funções gerais de `EventListeners` e uso de `localStorage`, como mudança de tema e armazenamento de dados como cookies

## Melhorias a serem feitas

- Passar a execução para WebAssembly e Rust
- Dar a opção ao usuário de recuperar os dados anteriores na página quando ele fechar e abrir a página
- Mostrar a tabela de transição criada na página `index.html`
- Remover o alerta que aparece quando clico em 'Executar código'
- Melhorias gerais em desempenho e tratamento de erros
