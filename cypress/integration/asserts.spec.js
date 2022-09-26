/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1);

    //Negando igualdade
    expect('b').not.to.be.equal('a')
})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;

    expect(b).to.be.null;
    expect(a).not.to.be.null;

    expect(c).to.be.undefined;
})

it('Objetc Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }
    //Igualdade entre Objetos
    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);

    //Mexpect(obj).to.be.equal({ a: 1, b: 2 }) -> Esse método de comparação não funciona com objetos
    expect(obj).to.be.deep.equal({ a: 1, b: 2 })
    expect(obj).eql({ a: 1, b: 2 })

    // Buscando propriedade dentro do objeto
    expect(obj).include({ a: 1 });

    // Vericando se determinada propriedade existe dentro do Objeto
    expect(obj).to.have.property('b');

    // Vericando se determinada propriedade existe dentro do Objeto, com determinado valor
    expect(obj).to.have.property('b', 2)

    // Verificando se o objeto não está vazio
    expect(obj).to.not.be.empty

    // Verificando se o objeto está vazio
    expect({}).to.be.empty
})

it('Arrays', () => {
    const arr = [1, 2, 3]

    // Verificando se o array possui valores
    expect(arr).to.have.members([1, 2, 3])

    // Verificando se o array possui determinados valores
    expect(arr).to.include.members([1, 3])

    // Verificando se o array não está vazio
    expect(arr).to.not.be.empty

    // Verificando se o array está vazio
    expect([]).to.be.empty
})

it('Types', () => {
    const num = 1;;
    const str = 'String';

    // Verificando se a varíavel é do tipo Number
    expect(num).to.be.a('number')

    // Verificando se a varíavel é do tipo String
    expect(str).to.be.a('string')

    //Verificando se o a variável é do tipo Object
    expect({}).to.be.a('object')

    //Verificando se o a variável é do tipo Array
    expect([]).to.be.a('array')

})

it('String', () => {
    const str = 'String de teste';
    expect(str).to.be.equal('String de teste');
    expect(str).to.have.length(15);
    expect(str).to.contains('de')

    // Regex
    // Verificar de a string contém a palavra "String"
    expect(str).to.match(/String/)
    // Verificar de a string inicia com a palavra "String"
    expect(str).to.match(/^String/)
    // Verificar de a string termina com a palavra "teste"
    expect(str).to.match(/teste$/)
    // Verificando o tamanho da string, no caso verificando se há 15 caracteres
    expect(str).to.match(/.{15}/)
    // Verificando existem apenas letras na string
    expect(str).to.match(/\w+/)
    // Verificando se não existem números na string
    expect(str).to.match(/\D+/)
})

it('Numbers', () => {
    const number = 4;
    const floatNumber = 5.2123;

    expect(number).to.be.equal(4);
    //Verificando se o número é maior que 3
    expect(number).to.be.above(3);
    //Verificando se o número é menor que 7
    expect(number).to.be.below(7);

    expect(floatNumber).to.be.equal(5.2123)
    // Verificando se "floatNumber" é próximo do número "5.2"
    expect(floatNumber).to.be.closeTo(5.2, 0.1)

    //Verificando se o número é maior que 5
    expect(floatNumber).to.be.above(5);

})