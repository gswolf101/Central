# LazerRunner

LazerRunner é um jogo de arcade em HTML5 onde o jogador controla um círculo branco que deve desviar de barras vermelhas que se movem pela tela. O objetivo é sobreviver o maior tempo possível, acumulando pontos e utilizando uma habilidade de imunidade temporária para evitar colisões. O jogo inclui um sistema de ranking para registrar as maiores pontuações.

## Como Jogar

1. **Iniciar o Jogo**: Clique no botão "Play" na tela inicial para começar.
2. **Movimentação**: Use as setas do teclado ou as teclas WASD para mover o círculo branco.
3. **Imunidade**: Pressione a barra de espaço para ativar a imunidade temporária (duração de 1,5 segundos, com recarga de 0,75 segundos).
4. **Pontuação**: Sobreviva para acumular pontos. A cada intervalo, novas barras aparecem, e a dificuldade aumenta à medida que a pontuação cresce.
5. **Game Over**: Ao colidir com uma barra vermelha sem imunidade, o jogo termina. Você pode:
   - **Salvar no Ranking**: Clique em "Salvar no Ranking" e insira seu nome para registrar sua pontuação.
   - **Reiniciar**: Clique em "Restart" ou pressione Enter para começar um novo jogo.
6. **Ranking**: As 10 melhores pontuações são exibidas na lateral direita da tela.

## Requisitos

- Um navegador web moderno (Chrome, Firefox, Edge, etc.).
- Não é necessário instalar nada, apenas abra o arquivo `index.html` no navegador.

## Estrutura do Projeto

- `index.html`: Contém o código HTML, CSS e JavaScript do jogo.
- O ranking é salvo localmente no navegador usando `localStorage`.

## Controles

- **Mover**: Setas ou WASD
- **Imunidade**: Barra de espaço
- **Reiniciar**: Enter (na tela de Game Over)

## Versão

- **Versão 1.2**: Inclui tela inicial, tela de game over com botões, ranking persistente e instruções ampliadas.

## Licença

Este projeto é de código aberto e pode ser modificado ou distribuído livremente.

---

## Alterações 1.1
- **Timers**: Agora é possivel saber quanto tempo resta de imunidade e quanto tempo fala para poder utiliza-la novamente!
- **Ranking**: Adição de um ranking ao final da partida para registrar as pontuações e poder competir com seus amigos!

## Alterações 1.2
- **Barras**: Comportamento das barras alterado visando uma partida mais randomizada, agora as barras podem vir das quatro direções simuntaneamente e de tamanhos variados!
- **Não perca seu ranking!!**: agora o ranking fica salvo no navegador, para que não seja perdida suas pontuações ao recarregar a pagina!!
- **Pense melhor antes de usar seu escudo!!**: cooldown para o uso do escudo alterado para 1.5 segundos.

## Alterações 1.3
- **Progressividade??**: agora a dificuldade da partida vai aumentando conforme sua pontuação, para que fique mais dificl aos poucos.
## Contribuições

Sinta-se à vontade para sugerir melhorias ou abrir pull requests no repositório do projeto.
---

Desenvolvido por GsWolf101.
