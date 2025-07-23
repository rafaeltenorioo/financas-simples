const formAddGasto = document.getElementById('form-add-gasto');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const dataInput = document.getElementById('data');


const totalDeGastosSpan = document.getElementById('total-de-gastos');
const listaDeGastosUl = document.getElementById('lista-de-gastos');

const splitByInput = document.getElementById('split-by');
const btAplicarDivisao = document.getElementById('bt-aplicar-divisao');
const suaParteParagrafo = document.getElementById('sua-parte');
const totalDaSuaParteSpan = document.getElementById('total-da-sua-parte');

const listaGastosDividirUl = document.getElementById('lista-gastos-dividir');
const totalGastosDividirSpan = document.getElementById('total-gastos-dividir');
const listaGastosPessoaisUl = document.getElementById('lista-gastos-pessoais');
const totalGastosPessoaisSpan = document.getElementById('total-gastos-pessoais');

let gastos = [];
let totalGastos = 0;

//Padroniza a exibição de valores monetários. Em vez de aparecer "10.5", aparece "R$ 10,50".
function formatarMoeda(valorEmBRL) { 
    return valorEmBRL.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function atualizarTodosOsTotais() {
    // gastos.reduce(): É um método de array que executa uma função "redutora" em cada elemento do array, resultando em um único valor de retorno. É perfeito para somar valores.
    // acc(acumulador): Guarda o resultado parcial da soma até o momento.
    // gasto: É o objeto de gasto atual que está sendo processado no array.
    // acc + gasto.valor: Adiciona o valor do gasto atual ao acumulador.
    // 0: É o valor inicial do acumulador (acc). A soma começa em zero.

    totalGastos = gastos.reduce((acc, gasto) => acc + gasto.valor, 0);
    totalDeGastosSpan.textContent = formatarMoeda(totalGastos);

    // 2. Calcula e exibe o Total de Gastos da Casa (a Dividir)
    const gastosParaDividir = gastos.filter(gasto => gasto.dividirConta);
    const totalDaCasa = gastosParaDividir.reduce((acc, gasto) => acc + gasto.valor, 0);
    totalGastosDividirSpan.textContent = formatarMoeda(totalDaCasa);

    // 3. Calcula e exibe o Total de Meus Gastos Pessoais
    const gastosPessoais = gastos.filter(gasto => !gasto.dividirConta);
    const totalPessoais = gastosPessoais.reduce((acc, gasto) => acc + gasto.valor, 0);
    totalGastosPessoaisSpan.textContent = formatarMoeda(totalPessoais);

    aplicarDivisao();
}

function adicionarGasto(e) {
    e.preventDefault();

    const descricao = descricaoInput.value.trim();
    let valor = parseFloat(valorInput.value);
    const data = dataInput.value;
    // trim() remove espaços em branco extras do início e do fim da string. parseFloat() converte a string do campo de valor para um número decimal.

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert('Por favor, preencha todos os campos corretamente e o valor deve ser maior que zero.');
        return;
    }

    const novoGasto = { 
        /*Cria um objeto JavaScript que representa um único gasto, agrupando todos os seus detalhes (descrição, valor, data, categoria e um id único).
        Date.now() retorna o número de milissegundos desde 1º de janeiro de 1970. 
        Serve como um identificador exclusivo para cada gasto. É vital para poder, por exemplo, excluir um gasto específico mais tarde.*/

        id: Date.now(),
        descricao,
        valor,
        data,
        dividirConta: false,
    };

    gastos.push(novoGasto);
    salvarGastos();

    renderizarGasto(novoGasto); //Chama a função renderizarGasto para pegar os dados do novo gasto e criar o elemento <li> correspondente na lista visível.
    atualizarTodosOsTotais();

    formAddGasto.reset(); //Limpa todos os campos do formulário, deixando-o pronto para o próximo gasto.
}
formAddGasto.addEventListener('submit', adicionarGasto);

function renderizarGasto(gasto) {
    // Pega um objeto de gasto e cria dinamicamente um elemento <li> HTML que representa esse gasto na lista visual.
    const li = document.createElement('li');
    li.dataset.id = gasto.id; // Adiciona um atributo personalizado data-id ao elemento <li> no HTML.

    if (gasto.dividirConta) {
        li.classList.add('gasto-dividir');
    }

    // NOVO: Criar o contêiner para Descrição, Valor e Data
    const gastoInfoDiv = document.createElement('div');
    gastoInfoDiv.classList.add('gasto-info-linha'); // Adiciona a classe CSS 'gasto-info-linha'

    // Criar e adicionar o span da descrição
    const descricaoSpan = document.createElement('span');
    descricaoSpan.textContent = gasto.descricao;
    gastoInfoDiv.appendChild(descricaoSpan);

    // Criar e adicionar o span do valor (formatado como moeda)
    const valorSpan = document.createElement('span');
    valorSpan.textContent = `R$ ${gasto.valor.toFixed(2).replace('.', ',')}`; // Usa toFixed(2) para 2 casas decimais e substitui ponto por vírgula
    gastoInfoDiv.appendChild(valorSpan);

    // Criar e adicionar o span da data
    const dataSpan = document.createElement('span');
    // Assegura que a data seja interpretada corretamente, adicionando 'T00:00:00' para evitar problemas de fuso horário em algumas interpretações de data.
    dataSpan.textContent = new Date(gasto.data + 'T00:00:00').toLocaleDateString('pt-BR');
    gastoInfoDiv.appendChild(dataSpan);

    // Adiciona o novo contêiner 'gastoInfoDiv' ao 'li' principal
    li.appendChild(gastoInfoDiv);


    // Criar o contêiner para os botões de ação
    const acoesDiv = document.createElement('div');
    acoesDiv.classList.add('acoes-gasto');

    // Criar e adicionar o botão de Dividir
    const btDividir = document.createElement('button');
    btDividir.textContent = gasto.dividirConta ? 'Não Dividir' : 'Dividir';
    btDividir.classList.add('bt-dividir');
    // Adiciona o event listener para alternar a divisão do gasto
    btDividir.addEventListener('click', () => toggleDivisaoGasto(gasto.id));
    acoesDiv.appendChild(btDividir);

    // Criar e adicionar o botão de Excluir
    const btExcluir = document.createElement('button');
    btExcluir.textContent = 'Excluir';
    btExcluir.classList.add('bt-excluir');
    // Adiciona o event listener para excluir o gasto
    btExcluir.addEventListener('click', () => excluirGasto(gasto.id));
    acoesDiv.appendChild(btExcluir);

    // Adiciona o contêiner de ações ao 'li' principal
    li.appendChild(acoesDiv);

    // Adiciona o <li> à lista correta (pessoal ou a dividir)
    if (gasto.dividirConta) {
        listaGastosDividirUl.appendChild(li);
    } else {
        listaGastosPessoaisUl.appendChild(li);
    }
}

function toggleDivisaoGasto(id) {
    const gastoIndex = gastos.findIndex(gasto => gasto.id === id); // Encontra o índice do gasto no array

    if (gastoIndex !== -1) {
        const gasto = gastos[gastoIndex];
        gasto.dividirConta = !gasto.dividirConta //Inverte o status

        salvarGastos();

        const li = document.querySelector(`li[data-id = "${id}"]`);
        if (li) {
            li.remove();
            renderizarGasto(gasto);
        }
        atualizarTodosOsTotais();
    }
}

function excluirGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id); //o teste é gasto.id !== id. Isso significa: "inclua no novo array todos os gastos cujo id seja diferente do id que queremos excluir".
    salvarGastos();

    const itemParaRemover = document.querySelector(`li[data-id = "${id}"]`);
    if (itemParaRemover) {
        itemParaRemover.remove();
    }

    atualizarTodosOsTotais();
}

function carregarGastos() {
    const gastosSalvos = localStorage.getItem('gastos');
    if (gastosSalvos) {
        gastos = JSON.parse(gastosSalvos); // Converte a string JSON de volta para um array de objetos JavaScript
        listaGastosDividirUl.innerHTML = '';
        listaGastosPessoaisUl.innerHTML = '';

        gastos.forEach(gasto => {
            if (gasto.dividirConta === undefined) {
                gasto.dividirConta = false;
            }
            renderizarGasto(gasto);

        });
        atualizarTodosOsTotais();
    }
}

function salvarGastos() {
    // Converte o array de objetos 'gastos' para uma string JSON antes de salvar no localStorage

    localStorage.setItem('gastos', JSON.stringify(gastos));
    //O localStorage só pode armazenar strings. Como nosso gastos é um array de objetos JavaScript, precisamos convertê-lo para uma string no formato JSON antes de salvar. JSON.stringify() faz exatamente isso.
}

function aplicarDivisao() {
    const numPessoas = parseInt(splitByInput.value);

    //Filtra os gastos para incluir APENAS aqueles marcados como 'dividirConta: true'
    const gastosParaDividir = gastos.filter(gasto => gasto.dividirConta);
    //Calcula o total dos gasto que serão divididos
    const totalGastosParaDividir = gastosParaDividir.reduce((acc, gasto) => acc + gasto.valor, 0);


    if (totalGastosParaDividir === 0) {
        suaParteParagrafo.classList.add('oculta');
        totalDaSuaParteSpan.textContent = formatarMoeda(0);
        if (splitByInput.value === '' || numPessoas === 0) {
            splitByInput.value = 1;
        }
        return;
    }

    if (isNaN(numPessoas) || numPessoas < 1) {
        // Definimos um valor padrão e ocultamos a parte da divisão
        suaParteParagrafo.classList.add('oculta');
        return;
    }
    if (numPessoas === 1) {
        suaParteParagrafo.classList.add('oculta');
    } else {
        // Se houver mais de uma pessoa, mostra o parágrafo "Sua parte"
        suaParteParagrafo.classList.remove('oculta');

        // Calcula e exibe a sua parte
        const suaParte = totalGastosParaDividir / numPessoas; 
        totalDaSuaParteSpan.textContent = formatarMoeda(suaParte);
    }
}
btAplicarDivisao.addEventListener('click', aplicarDivisao);


splitByInput.addEventListener('input', aplicarDivisao) // Opcional: Adiciona um listener ao input de divisão para atualizar automaticamente, quando o valor muda, sem precisar clicar no botão.


document.addEventListener('DOMContentLoaded', () => {  //   Garante que o código dentro dessa função só será executado depois que toda a estrutura HTML da página estiver completamente carregada e analisada pelo navegador (o "DOM" está pronto).
    carregarGastos();
})
