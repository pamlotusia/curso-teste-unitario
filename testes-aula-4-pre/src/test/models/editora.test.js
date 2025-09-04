import Editora from '../../../src/models/editora.js';
import { jest } from '@jest/globals';
describe('Testes da classe Editora', () => {
  const objEditora = {
    nome: 'Editora Exemplo',
    cidade: 'São Paulo',
    email: 'contato@editoraexemplo.com',
  };

  it('deve instanciar uma nova editora', () => {
    const editora = new Editora(objEditora);

    expect(editora).toEqual(expect.objectContaining(objEditora));
  });

  it.skip('deve salvar editora no DB', () => {
    const editora = new Editora(objEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe(objEditora.nome);
    });
  });

  it.skip('deve salvar no DB usando sintaxe moderna', async () => {
    const editora = new Editora(objEditora);

    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      })
    );
  });

  it('deve fazer uma chamada simulada ao DB', () => {
    const editora = new Editora(objEditora);
    editora.salvar = jest.fn().mockReturnValue({
      nome: 'Editora Exemplo',
      cidade: 'São Paulo',
      email: 'contato@editoraexemplo.com',
      created_at: '2005-05-05T05:05:05.000Z',
      updated_at: '2005-05-05T05:05:05.000Z',
    });

    const retorno = editora.salvar();
  });
});
