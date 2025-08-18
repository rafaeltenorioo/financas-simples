import {
  addGasto,
  deleteGasto,
  getGastos,
  toggleGastos,
} from "./expenseManager.js";
import {
  initUI,
  renderizarListaDeGastos,
  renderizarTotais,
  renderizarDivisao,
} from "./uiManager.js";

const formAddGasto = document.getElementById("form-add-gasto");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const dataInput = document.getElementById("data");

// Os elementos de 'total de gastos' foram removidos do HTML, então
// não precisamos mais de referências a eles.
const listaGastosDividirUl = document.getElementById("lista-gastos-dividir");
const totalGastosDividirSpan = document.getElementById("total-gastos-dividir");
const listaGastosPessoaisUl = document.getElementById("lista-gastos-pessoais");
const totalGastosPessoaisSpan = document.getElementById(
  "total-gastos-pessoais"
);
const splitByInput = document.getElementById("split-by");
const btAplicarDivisao = document.getElementById("bt-aplicar-divisao");
const suaParteParagrafo = document.getElementById("sua-parte");
const totalDaSuaParteSpan = document.getElementById("total-da-sua-parte");

function handleAddGasto(event) {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const data = dataInput.value;

  const novoGasto = addGasto(descricao, valor, data);

  if (novoGasto) {
    renderizarListaDeGastos(deleteGasto, toggleGastos);
    renderizarTotais();
    renderizarDivisao();
    formAddGasto.reset();
  } else {
    alert(
      "Por favor, preencha todos os campos corretamente. O valor deve ser maior que 0"
    );
  }
}

function inicializarApp() {
  initUI({
    formAddGasto,
    descricaoInput,
    valorInput,
    dataInput,
    listaGastosDividirUl,
    splitByInput,
    btAplicarDivisao,
    suaParteParagrafo,
    totalDaSuaParteSpan,
    listaGastosPessoaisUl,
    totalGastosDividirSpan,
    totalGastosPessoaisSpan,
  });

  renderizarListaDeGastos(deleteGasto, toggleGastos);
  renderizarTotais();
  renderizarDivisao();

  formAddGasto.addEventListener("submit", handleAddGasto);
  splitByInput.addEventListener("input", renderizarDivisao);
  btAplicarDivisao.addEventListener("click", renderizarDivisao);
}

document.addEventListener("DOMContentLoaded", inicializarApp);
