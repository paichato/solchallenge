A logica do programa se baseia em

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
