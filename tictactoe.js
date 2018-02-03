function startTicTacToe() {
  board=[];
  boardValue=[[1,2,3],[4,5,6],[7,8,9]];
  turnToken='O';
  aiToken='X';

  h2.removeChild(h2.firstChild);
  h2.appendChild(document.createTextNode('Tic Tac Toe'));
  gameDiv.appendChild(boardDiv);
  creatingTicTacToeBoard();
}

function creatingTicTacToeBoard() {
  let boxDiv = document.createElement('div');
  for(let i=0; i<3; i++) {
    let rowDiv = document.createElement('div');
    for(let j=0; j<3; j++) {
      let button= document.createElement('button');
      button.setAttribute('class','TicTacToeTile');
      let index=(j+1)+(i*3);
      button.style.height='50px';
      button.style.width='50px';
      let buttonText= document.createTextNode((j+1)+(i*3));
      button.appendChild(buttonText);
      button.addEventListener('click', function() {
        moves--;
	      button.style.color='white';
        if(turnToken==='O') {button.style.background='red';}
	      else {button.style.background='green';}
        button.removeChild(buttonText);
        buttonText= document.createTextNode(turnToken);
        button.appendChild(buttonText);
        boardValue[i][j]=turnToken;
        checkWin();
        button.disabled='disabled';
        changeTurnTicTacToe();
        if(aiToken===turnToken && moves!==0) {aiEasy();}
      });
      board.push(button);
      rowDiv.appendChild(button);
    }
    boxDiv.appendChild(rowDiv);
  }
  boardDiv.appendChild(boxDiv);
}

function changeTurnTicTacToe() {
  turnToken==='O'? turnToken='X':turnToken='O';
}

function checkWin() {
  if(boardValue[0][0]===boardValue[1][1] && boardValue[1][1]===boardValue[2][2]) {return win(turnToken);}
  else if(boardValue[0][2]===boardValue[1][1] && boardValue[1][1]===boardValue[2][0]) {return win(turnToken);}
  else {
    for(let i in boardValue) {
      if(boardValue[0][i]===boardValue[1][i] && boardValue[1][i]===boardValue[2][i]) {return win(turnToken);}
      else if(boardValue[i][0]===boardValue[i][1] && boardValue[i][1]===boardValue[i][2]) {return win(turnToken);}
    }
  }
  if(moves===0) {return win('Draw');}
}

function win(token) {
  board=board.map(a=>a.disabled='disabled');
  h2.removeChild(h2.firstChild);
  let h2Winner=document.createTextNode(token==='Draw'?'DRAW':token+' Win');
  
  h2.appendChild(h2Winner);
  moves=0;
}

function aiEasy() {
  let available=[];
  available=board.map((value,index)=>value.disabled===true?true:index).filter(value=>value!==true);
  if(available.length!==0) {board[available[Math.floor(Math.random()*available.length)]].click();}
}

//Main
var aiToken='X';
var moves=9;
