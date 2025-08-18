import { saveToLocalStorage, loadFromLocalStorage } from "./storageService.js";

let gastos = loadFromLocalStorage();

export const getGastos = () => {
  // Retorna uma cópia do array para que outros módulos não o modifiquem diretamente
  return [...gastos];
};

export const addGasto = (descricao, valor, data) => {
  if (!descricao || isNaN(valor) || valor <= 0) {
    alert(
      "Por favor, preencha todos os campos corretamente e o valor deve ser maior que zero."
    );
    return null;
  }

  const novoGasto = {
    /* Cria um objeto JavaScript que representa um único gasto, agrupando todos os seus detalhes (descrição, valor, data, categoria e um id único).Date.now() retorna o número de milissegundos desde 1º de janeiro de 1970. Serve como um identificador exclusivo para cada gasto. É vital para poder, por exemplo, excluir um gasto específico mais tarde.*/

    id: Date.now(),
    descricao,
    valor,
    data,
    dividirConta: false,
  };

  gastos.push(novoGasto);

  saveToLocalStorage(gastos);

  return novoGasto;
};

export const deleteGasto = (id) => {
  gastos = gastos.filter((gasto) => gasto.id !== id); //o teste é gasto.id !== id. Isso significa: "inclua no novo array todos os gastos cujo id seja diferente do id que queremos excluir".
  saveToLocalStorage(gastos);
};

export const toggleGastos = (id) => {
  const gastoIndex = gastos.findIndex((gasto) => gasto.id === id); // Encontra o índice do gasto no array

  if (gastoIndex !== -1) {
    const gasto = gastos[gastoIndex];
    gasto.dividirConta = !gasto.dividirConta; //Inverte o status

    saveToLocalStorage(gastos);

    return gasto;
  } else {
    return null;
  }
};
