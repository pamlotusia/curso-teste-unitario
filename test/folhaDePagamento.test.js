import { somaHorasExtras, calculaDescontos} from '../index'

test('deve retornar a soma de horas extras', ()=> {
 const esperado = 2500
 const retornado = somaHorasExtras(2000, 500)

 expect(retornado).toBe(esperado)
}) 

test('deve descontar o valor do salario', ()=> {
const esperado = 1800
const retornado = calculaDescontos(2000, 200)

expect(retornado).toBe(esperado)    
})