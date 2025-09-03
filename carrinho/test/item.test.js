import Item from "../item.js";

describe("Testes dos itens", () => {
  it("deve ter tres campos: nome, valor e quantidade", () => {
    const item = new Item("calça cargo", 120, 1);

    expect(item.nome).toBe("calça cargo");
    expect(item.valor).toBe(120);
    expect(item.quantidade).toBe(1);    
  });

  it("deve ter o preço calculcado de acordo com a quantidade", () => {
    const item = new Item("calça cargo", 120, 2);
    expect(item.pegaValorTotalItem()).toBe(240);
  });
});
