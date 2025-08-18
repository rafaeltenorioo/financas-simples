const STORAGE_KEY = "gastos";

export const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log("Erro ao salvar no localStorage: ", error);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);

    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log("Erro ao carregar do localStorage: ", error);
    return [];
  }
};
