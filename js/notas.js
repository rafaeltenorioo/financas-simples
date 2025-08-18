document.addEventListener('DOMContentLoaded', () => {
    const anotacoesTextarea = document.getElementById('anotacoes');

    function salvarAnotacoes() {
        localStorage.setItem('anotacoesMes', anotacoesTextarea.value);
        console.log('Anotações salvas automaticamente')
    }

    function carregarAnotacoes() {
        const anotacoesSalvas = localStorage.getItem('anotacoesMes');
        if (anotacoesSalvas) { // se houver anotações salvas, preencha o textarea com elas!
            anotacoesTextarea.value = anotacoesSalvas;
            console.log('Anotações carregadas!');
        }
    }

    anotacoesTextarea.addEventListener('input', salvarAnotacoes); // O evento 'input' é disparado toda vez que o valor do campo muda (digitar, colar, etc.).

    carregarAnotacoes();
})