var board=[];
var boardValue=[];
var turnToken='';
var gameNumber=0;


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
gameSelectorDiv.style.width='120px';

var h2 = document.createElement('h2');
var h2Default = document.createTextNode('Game Selector');
h2.appendChild(h2Default);
gameDiv.appendChild(h2);

var xoButton=document.createElement('button');
var ticTacToeText=document.createTextNode('Tic Tac Toe');
xoButton.setAttribute('class','gameListButton');
xoButton.appendChild(ticTacToeText);
xoButton.style.width='120px';
xoButton.style.height='35px';
xoButton.addEventListener('click', function() {
  gameDiv.removeChild(gameSelectorDiv);
  gameNumber=1;
  startTicTacToe();
  mainDiv.appendChild(gameOptionDiv);
});

var chessButton=document.createElement('Button');
var chessButtonText=document.createTextNode('Chess');
chessButton.setAttribute('class', 'gameListButton');
chessButton.appendChild(chessButtonText);
chessButton.style.width='120px';
chessButton.style.height='35px';
chessButton.addEventListener('click', function() {
  gameDiv.removeChild(gameSelectorDiv);
  gameNumber=2;
  startChess();
  mainDiv.appendChild(gameOptionDiv);
});


gameSelectorDiv.appendChild(xoButton);
gameSelectorDiv.appendChild(chessButton);
gameDiv.appendChild(gameSelectorDiv);

var boardDiv=document.createElement('div');
boardDiv.setAttribute('id','board');

//game-option
var gameOptionDiv=document.createElement('div');
gameOptionDiv.setAttribute('id','gameOption');

var retryButton=document.createElement('button');
retryButton.appendChild(document.createTextNode('Retry'))
retryButton.setAttribute('class','option');
retryButton.style.width='120px';
retryButton.style.height='25px';
retryButton.addEventListener('click', function() {
  h2.removeChild(h2.firstChild);
  boardDiv.removeChild(boardDiv.firstChild);
  if(gameNumber===1) {
    h2.appendChild(document.createTextNode('Tic Tac Toe'));
    startTicTacToe();
  }
  if(gameNumber===2) {
    h2.appendChild(document.createTextNode('Chess'));
    startChess();
  }
});
gameOptionDiv.appendChild(retryButton);

var backtoMenuButton=document.createElement('button');
backtoMenuButton.appendChild(document.createTextNode('Back To Menu'))
backtoMenuButton.setAttribute('class','option');
backtoMenuButton.style.width='120px';
backtoMenuButton.style.height='25px';
backtoMenuButton.addEventListener('click', function() {
  mainDiv.removeChild(gameOptionDiv);
  boardDiv.removeChild(boardDiv.firstChild);
  gameDiv.removeChild(boardDiv);
  gameDiv.appendChild(gameSelectorDiv);
  h2.removeChild(h2.firstChild);
  h2.appendChild(h2Default);
});
gameOptionDiv.appendChild(backtoMenuButton);