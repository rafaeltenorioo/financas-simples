export const formatarMoeda = (valorEmBRL) => {
  return valorEmBRL.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  //Padroniza a exibição de valores monetários. Em vez de aparecer "10.5", aparece "R$ 10,50". pt-BR / BRL
};
