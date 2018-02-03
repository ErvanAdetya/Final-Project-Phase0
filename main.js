var board=[];
var boardValue=[];
var turnToken='';


var body = document.body;
body.style.align="center";
body.style.margin="center";

var mainDiv = document.createElement('div');
mainDiv.setAttribute('id', 'main');
body.appendChild(mainDiv);
mainDiv.style.align="center";
mainDiv.style.margin="center";

var h1 = document.createElement('h1');
var h1Text = document.createTextNode('Mini Game Hub');
h1.appendChild(h1Text);
mainDiv.appendChild(h1);

var gameDiv=document.createElement('div');
gameDiv.setAttribute('id','game');
mainDiv.appendChild(gameDiv);

var gameSelectorDiv=document.createElement('Div');
gameSelectorDiv.setAttribute('id','gameSelector');

var h2 = document.createElement('h2');
var h2Default = document.createTextNode('Game Selector');
h2.appendChild(h2Default);
gameDiv.appendChild(h2);

var xoButton=document.createElement('button');
var ticTacToeText=document.createTextNode('Tic Tac Toe');
xoButton.setAttribute('class','gameListButton');
xoButton.appendChild(ticTacToeText);
xoButton.addEventListener('click', function() {
  gameDiv.removeChild(gameSelectorDiv);
  startTicTacToe();
});

var chessButton=document.createElement('Button');
var h2ChessText=document.createTextNode('Chess');
chessButton.setAttribute('class', 'gameListButton');
chessButton.appendChild(h2ChessText);
chessButton.addEventListener('click', function() {
  gameDiv.removeChild(gameSelectorDiv);
  startChess();
});


gameSelectorDiv.appendChild(xoButton);
gameSelectorDiv.appendChild(chessButton);
gameDiv.appendChild(gameSelectorDiv);

var boardDiv=document.createElement('div');
boardDiv.setAttribute('id','board');

