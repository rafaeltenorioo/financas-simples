const html = document.documentElement;

const btTemaClaro = document.getElementById('bt-tema-claro');
const btTemaEscuro = document.getElementById('bt-tema-escuro');
const btTemaAzul = document.getElementById('bt-tema-azul');

function aplicarTema(tema) {
    // Remove todas as classes de tema existentes do <html>
    html.classList.remove('claro', 'escuro', 'azul');

    // Adiciona a classe do tema selecionado
    html.classList.add(tema);

    document.querySelectorAll('.bt-tema').forEach(button => {
        if (button.dataset.theme === tema) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    localStorage.setItem('temaPreferido', tema);
}

function carregarTema() {
    const temaSalvo = localStorage.getItem('temaPreferido');
    if (temaSalvo) {
        aplicarTema(temaSalvo);
    } else {
        aplicarTema('claro') // Tema padrão se nenhum for salvo
    }
}

btTemaClaro.addEventListener('click', () => aplicarTema('claro'));
btTemaEscuro.addEventListener('click', () => aplicarTema('escuro'));
btTemaAzul.addEventListener('click', () => aplicarTema('azul'));

// Carregamento do tema
// Garante que o tema seja carregado assim que o DOM (HTML) estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    carregarTema();
})