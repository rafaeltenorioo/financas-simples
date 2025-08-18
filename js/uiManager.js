import { getGastos } from "./expenseManager.js";
import { formatarMoeda } from "./utils.js";

// Variáveis para los elementos del DOM que serán pasados por main.js
let listaGastosDividirUl;
let totalGastosDividirSpan;
let listaGastosPessoaisUl;
let totalGastosPessoaisSpan;
let splitByInput;
let suaParteParagrafo;
let totalDaSuaParteSpan;
// O elemento totalDeGastosSpan foi removido, então ele não
// é mais necessário aqui.

// Função para inicializar o módulo com os elementos do DOM
export const initUI = (domElements) => {
  listaGastosDividirUl = domElements.listaGastosDividirUl;
  totalGastosDividirSpan = domElements.totalGastosDividirSpan;
  listaGastosPessoaisUl = domElements.listaGastosPessoaisUl;
  totalGastosPessoaisSpan = domElements.totalGastosPessoaisSpan;
  splitByInput = domElements.splitByInput;
  suaParteParagrafo = domElements.suaParteParagrafo;
  totalDaSuaParteSpan = domElements.totalDaSuaParteSpan;
};

export const renderizarListaDeGastos = (onDelete, onToggle) => {
  const gastos = getGastos();

  listaGastosDividirUl.innerHTML = "";
  listaGastosPessoaisUl.innerHTML = "";

  const gastosParaDividir = gastos.filter((gasto) => gasto.dividirConta);
  const gastosPessoais = gastos.filter((gasto) => !gasto.dividirConta);

  // Adiciona a classe de scroll se houver mais de 3 itens
  if (gastosPessoais.length > 3) {
    listaGastosPessoaisUl.classList.add("gasto-list--scrollable");
  } else {
    listaGastosPessoaisUl.classList.remove("gasto-list--scrollable");
  }

  if (gastosParaDividir.length > 3) {
    listaGastosDividirUl.classList.add("gasto-list--scrollable");
  } else {
    listaGastosDividirUl.classList.remove("gasto-list--scrollable");
  }

  gastosPessoais.forEach((gasto) => {
    const li = document.createElement("li");
    li.dataset.id = gasto.id;
    li.classList.add("gasto-list__item");
    li.innerHTML = `
      <div class="gasto-list__info">
        <span class="gasto-list__description">${gasto.descricao}</span>
        <span class="gasto-list__value">${formatarMoeda(gasto.valor)}</span>
        <span class="gasto-list__date">${new Date(
          gasto.data + "T00:00:00"
        ).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div class="gasto-list__actions">
        <button class="gasto-list__button gasto-list__button--divide">
          Dividir
        </button>
        <button class="gasto-list__button gasto-list__button--delete">Excluir</button>
      </div>
    `;

    li.querySelector(".gasto-list__button--delete").addEventListener(
      "click",
      () => {
        onDelete(gasto.id);
        renderizarListaDeGastos(onDelete, onToggle);
        renderizarTotais();
        renderizarDivisao();
      }
    );

    li.querySelector(".gasto-list__button--divide").addEventListener(
      "click",
      () => {
        onToggle(gasto.id);
        renderizarListaDeGastos(onDelete, onToggle);
        renderizarTotais();
        renderizarDivisao();
      }
    );

    listaGastosPessoaisUl.appendChild(li);
  });

  gastosParaDividir.forEach((gasto) => {
    const li = document.createElement("li");
    li.dataset.id = gasto.id;
    li.classList.add("gasto-list__item");
    li.classList.add("gasto-list__item--divided");
    li.innerHTML = `
      <div class="gasto-list__info">
        <span class="gasto-list__description">${gasto.descricao}</span>
        <span class="gasto-list__value">${formatarMoeda(gasto.valor)}</span>
        <span class="gasto-list__date">${new Date(
          gasto.data + "T00:00:00"
        ).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div class="gasto-list__actions">
        <button class="gasto-list__button gasto-list__button--divide">
          Não Dividir
        </button>
        <button class="gasto-list__button gasto-list__button--delete">Excluir</button>
      </div>
    `;

    li.querySelector(".gasto-list__button--delete").addEventListener(
      "click",
      () => {
        onDelete(gasto.id);
        renderizarListaDeGastos(onDelete, onToggle);
        renderizarTotais();
        renderizarDivisao();
      }
    );

    li.querySelector(".gasto-list__button--divide").addEventListener(
      "click",
      () => {
        onToggle(gasto.id);
        renderizarListaDeGastos(onDelete, onToggle);
        renderizarTotais();
        renderizarDivisao();
      }
    );

    listaGastosDividirUl.appendChild(li);
  });
};

export const renderizarTotais = () => {
  const gastos = getGastos();
  // Esta linha foi removida pois o total geral não será mais exibido.
  // totalDeGastosSpan.textContent = formatarMoeda(totalGastosGeral);

  const gastosParaDividir = gastos.filter((gasto) => gasto.dividirConta);
  const totalDaCasa = gastosParaDividir.reduce(
    (acc, gasto) => acc + gasto.valor,
    0
  );
  totalGastosDividirSpan.textContent = formatarMoeda(totalDaCasa);

  const gastosPessoais = gastos.filter((gasto) => !gasto.dividirConta);
  const totalPessoais = gastosPessoais.reduce(
    (acc, gasto) => acc + gasto.valor,
    0
  );
  totalGastosPessoaisSpan.textContent = formatarMoeda(totalPessoais);
};

export const renderizarDivisao = () => {
  const gastos = getGastos();
  const numPessoas = parseInt(splitByInput.value) || 1;
  const gastosParaDividir = gastos.filter((gasto) => gasto.dividirConta);
  const totalGastosParaDividir = gastosParaDividir.reduce(
    (acc, gasto) => acc + gasto.valor,
    0
  );

  if (numPessoas <= 1 || totalGastosParaDividir === 0) {
    suaParteParagrafo.classList.add("oculta");
    totalDaSuaParteSpan.textContent = formatarMoeda(0);
  } else {
    const suaParte = totalGastosParaDividir / numPessoas;
    suaParteParagrafo.classList.remove("oculta");
    totalDaSuaParteSpan.textContent = formatarMoeda(suaParte);
  }
};
