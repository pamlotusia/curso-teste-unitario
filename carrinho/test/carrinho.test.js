import Carrinho from "../carrinho.js";
import Item from "../item.js";

describe("Testes do carrinho", () => {
  it("deve iniciar vazio", () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull();
  });

  it("deve conter itens", () => {
    const item = new Item("Acido noturno", 130, 1);
    const item2 = new Item("Anticoncepcional", 110, 1);

    const carrinho = new Carrinho();
    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    expect(typeof carrinho).toBe("object");
    expect(carrinho.itens[0]).toBe(item);
    expect(carrinho.itens[1]).toBe(item2);
    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
  });

  it('deve conter a propriedade "total" na inicialização', () => {
    const carrinho = new Carrinho();
    expect(carrinho).toHaveProperty("total");
  });

  it("deve lançar erro ao finalizar compra com um carrinho vazio", () => {
    const carrinho = new Carrinho();
    expect(()=> carrinho.finalizaCompra()).toThrowError("Carrinho de compras vazio");
  });
});
