# Instrucoes

### link da demo: https://paichato.github.io/solchallenge/

### link do projecto no **GITHUB**: https://github.com/paichato/solchallenge/

---

> **Explicações do exercício encontram se no ficheiro explication.md**

Para correr localmente o projeto após baixar do **DRIVE**, siga as instruções abaixo

1. Na terminal: `yarn install`
2. Na terminal: `yarn dev` , vai instanciar o webpack na porta 8080
3. No browser colocar a url : _localhost:8080/_
4. Os valores da requisação podem ser visualizados no console(inpector dev tools)

## LOGICA

A logica do programa se baseia em assim que a pagi a é carregada, é feita uma requisição que para pegar o valor e armazena numa _variavel_ e numa _constante_ o valor e o status da requisição.
A _variável_ e´ actualizada sempre que é feita uma requisição.
A _constante_ é usada para comparar valores introduzidos pelo usuário e é actualizada com o valor da variável quando o botão **ENVIAR** é clicado.
O input não permite a inserção de números negativos, números maiores que 300 nem menores que 1
Ao clicar em **NOVA PARTIDA**, o input, o display e resposta são resetados.
Ao clicar em **ENVIAR**, são comparados os valores introduzidos e os valores já recebidos do servidor(da _constante_). Após a comparação são exibidos os valores no display consoante o resultado da comparação.

---

## ALGORISMO

Para o algorismo do display gerei elementos do tipo _SVG_ na pasta assets baseados na UI do figma,
onde cada digito corresponse a um _svg_. Cada _svg_ contém 7 elementos do tipo **path** que neste caso
representam os sete segmentos.

Para cada digito existe uma class **segment** específica que corresponde
a cada segmento activo.

Por default a cor de cada digito é preta(como na UI), a classe **segment** é usada como identificador para alterar
a cor consoante os resultados da requesição.

Quando o valor da requisição é obtido, é feita uma comparação e logo em seguida actualiza o display com base no
resultado da comparacao.

composição do SVG
`<svg width="56" height="100" viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="caminhos" fill="#DDDDDD"/> <path d="caminhos" fill="#DDDDDD"/> <path class="segment" d="caminhos" fill="#262A34"/> <path d="caminhos" fill="#DDDDDD"/> <path d="caminhos" fill="#DDDDDD"/> <path class="segment" d="caminhos" fill="#262A34"/> <path d="caminhos" fill="#DDDDDD"/> </svg>`

###Nota
Para o caso do display:

1.  podia ter gerado um svg directamente no html como mostro acima na composicao e seria mais verbose e menos legível.
2.  podia criar um algorismo diferente com codigo puro, mas seria mais trabalhoso, mais verboso, menos fiel ao layout/UI(por conta das bordas), sem falar em muito copy & paste 😁;

Ou seja, para este desafio tentei ser o mais pratico possível, numa perpectiva do quotidiano o tempo é precioso(_time is money_).
