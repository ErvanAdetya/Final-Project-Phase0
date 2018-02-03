function startChess(){
  board=[];
  boardValue=[[],[],[],[],[],[],[],[]];
  moving=false;
  token='White';

  gameDiv.appendChild(boardDiv);
  creatingChessBoard();
  placingPawn();
}
function creatingChessBoard() {
  let boxDiv = document.createElement('div');
  for(let i=0; i<8; i++) {
    let rowDiv = document.createElement('div');
    for(let j=0; j<8; j++) {
      let tile= document.createElement('button');
      let index=(j+1)+(i*8)-1;
      tile.setAttribute('class','tile');
      tile.style.height='35px';
      tile.style.width='35px';
      tile.style.padding=0;
      if((i+j)%2===1) {tile.style.background='gray';}
      else {tile.style.background='white';}
      tile.addEventListener('click', function() {
        if(boardValue[i][j]!==null && boardValue[i][j].match(token)) {
          clearTile();
          if(boardValue[i][j].match(/Pawn$/)){turnToken='Pawn'; pawnMove(index);}
          else if(boardValue[i][j].match(/Rook$/)){turnToken='Rook'; rookMove(index);}
          else if(boardValue[i][j].match(/Knight$/)){turnToken='Knight'; knightMove(index);}
          else if(boardValue[i][j].match(/Bishop$/)){turnToken='Bishop'; bishopMove(index);}
          else if(boardValue[i][j].match(/Queen$/)){turnToken='Queen'; rookMove(index); bishopMove(index);}
          else if(boardValue[i][j].match(/King$/)){turnToken='King'; kingMove(index);}
          startIndex=index;
        }
        else if(tile.style.background==='green' || tile.style.background==='red') {
	        movePawn(startIndex,index,token+turnToken)
        }
        else if(tile.style.background!=='green') {
          moving=false;            
          clearTile();
        }
      });
      board.push(tile);
      rowDiv.appendChild(tile);
    }boxDiv.appendChild(rowDiv);
  }boardDiv.appendChild(boxDiv);
}

function placingPawn() {
  for(let i=0; i<tileImage.length; i++) {
    if(i>7 && i<16) {
      tileImage[i].innerHTML=BlackPawn;
      boardValue[Math.floor(i/8)].push('BlackPawn');
    }
    else if(i===0 || i===7) {
      tileImage[i].innerHTML=BlackRook;
      boardValue[Math.floor(i/8)].push('BlackRook');
    }
    else if(i===1 || i===6) {
     tileImage[i].innerHTML=BlackKnight;
     boardValue[Math.floor(i/8)].push('BlackKnight');
    }
    else if(i===2 || i===5) {
      tileImage[i].innerHTML=BlackBishop;
      boardValue[Math.floor(i/8)].push('BlackBishop');
    }
    else if(i===3) {
      tileImage[i].innerHTML=BlackKing;
      boardValue[Math.floor(i/8)].push('BlackKing');
    }
    else if(i===4) {
    tileImage[i].innerHTML=BlackQueen;
    boardValue[Math.floor(i/8)].push('BlackQueen');
    }
    else if(i>47 && i<56) {
      tileImage[i].innerHTML=WhitePawn;
      boardValue[Math.floor(i/8)].push('WhitePawn');
    }
    else if(i===56 || i===63) {
      tileImage[i].innerHTML=WhiteRook;
      boardValue[Math.floor(i/8)].push('WhiteRook');
    }
    else if(i===57 || i===62) {
      tileImage[i].innerHTML=WhiteKnight;
      boardValue[Math.floor(i/8)].push('WhiteKnight');
    }
    else if(i===58 || i===61) {
      tileImage[i].innerHTML=WhiteBishop;
      boardValue[Math.floor(i/8)].push('WhiteBishop');
    }
    else if(i===59) {
      tileImage[i].innerHTML=WhiteKing
      boardValue[Math.floor(i/8)].push('WhiteKing');
    }
    else if(i===60) {
      tileImage[i].innerHTML=WhiteQueen;
      boardValue[Math.floor(i/8)].push('WhiteQueen');
    }
    else {boardValue[Math.floor(i/8)].push(null);}
  }
}

function pawnMove(index) { //bug melangkah 2 di awal ketika di depan nya ada pion dan dapat memakan teman
  moving=true;
  let i=Math.floor(index/8);
  let j=index%8;
  if(token==='White' && i>0) { //White-North
    if(boardValue[i-1][j]===null) {
      board[index-8].style.background='green';
      if(index>47 && boardValue[i-2][j]===null) {board[index-16].style.background='green';} //Melangkah 2x sebelum di tengah
    }
    if(j<7) { //northWest
      if(boardValue[i-1][j-1]!==null && boardValue[i-1][j-1].match(token==='White'?'Black':'White')) {board[index-7].style.background='red';}
    }
    if(j>0) { //northEast
      if(boardValue[i-1][j+1]!==null && boardValue[i-1][j+1].match(token==='White'?'Black':'White')) {board[index-9].style.background='red';}
    }
  }

  if(token==='Black' && i<7) { //Black-South
    if(boardValue[i+1][j]===null) {
      board[index+8].style.background='green'; //Melangkah sekali
      if(index<16 && boardValue[i+2][j]===null) {board[index+16].style.background='green';} //Melangkah 2x sebelum di tengah
    }
    if(j<7) { //SouthWest
      if(boardValue[i+1][j-1]!==null && boardValue[i+1][j-1].match(token==='White'?'Black':'White')) {board[index+7].style.background='red';}
    }
    if(j>0) { //northEast
      if(boardValue[i+1][j+1]!==null && boardValue[i+1][j+1].match(token==='White'?'Black':'White')) {board[index+9].style.background='red';}
    }
  }
}

function rookMove(index) {
  moving=true;
  let i=Math.floor(index/8);
  let j=index%8;
  if(i>0) { //north
    for(let n=1; n<8 && (i-n)>=0; n++) {
      if(boardValue[i-n][j]===null) {board[index-(n*8)].style.background='green';}
      else if(boardValue[i-n][j].match(token==='White'?'Black':'White')) {board[index-(n*8)].style.background='red'; break;}
      else {break;}
    }
  }
  if(i<7) { //south
    for(let s=1; s<8 && (i+s)<8; s++) {
      if(boardValue[i+s][j]===null) {board[index+(s*8)].style.background='green';}
      else if(boardValue[i+s][j].match(token==='White'?'Black':'White')) {board[index+(s*8)].style.background='red'; break;}
      else {break;}
    }
  }
  if(j>0) { //east
    for(let e=1; e<8 && (j-e)>=0; e++) {
      if(boardValue[i][j-e]===null) {board[index-e].style.background='green';}
      else if(boardValue[i][j-e].match(token==='White'?'Black':'White')) {board[index-e].style.background='red'; break;}
      else {break;}
    }
  }
  if(j<7) { //west
    for(let w=1; w<8 && (j+w)<8; w++) {
      if(boardValue[i][j+w]===null) {board[index+w].style.background='green';}
      else if(boardValue[i][j+w].match(token==='White'?'Black':'White')) {board[index+w].style.background='red'; break;}
      else {break;}
    }
  }
}

function knightMove(index) {
  moving=true;
  let i=Math.floor(index/8);
  let j=index%8;
  if(i>0) {//close-North
    if(j<6) { //North-East
      if(boardValue[i-1][j+2]===null) {board[index-6].style.background='green';}
      else if(boardValue[i-1][j+2].match(token==='White'?'Black':'White')) {board[index-6].style.background='red';}
    }
    if(j>1) { //North-West
      if(boardValue[i-1][j-2]===null) {board[index-10].style.background='green';}
      else if(boardValue[i-1][j-2].match(token==='White'?'Black':'White')) {board[index-10].style.background='red';}
    }
  }
  if(i>1) {//Far-North
    if(j<7) { //North-East
      if(boardValue[i-2][j+1]===null) {board[index-15].style.background='green';}
      else if(boardValue[i-2][j+1].match(token==='White'?'Black':'White')) {board[index-15].style.background='red'}
    }
    if(j>0) { //North-West
      if(boardValue[i-2][j-1]===null) {board[index-17].style.background='green';}
      else if(boardValue[i-2][j-1].match(token==='White'?'Black':'White')) {board[index-17].style.background='red'}
    }
  }
  if(i<7) {//close-South
    if(j<6) { //South-East
      if(boardValue[i+1][j+2]===null) {board[index+10].style.background='green';}
      else if(boardValue[i+1][j+2].match(token==='White'?'Black':'White')) {board[index+10].style.background='red'}
    }
    if(j>1) { //South-West
      if(boardValue[i+1][j-2]===null) {board[index+6].style.background='green';}
      else if(boardValue[i+1][j-2].match(token==='White'?'Black':'White')) {board[index+6].style.background='red'}
    }
  }
  if(i<6) {//Far-South
    if(j<7) { //South-East
      if(boardValue[i+2][j+1]===null) {board[index+17].style.background='green';}
      else if(boardValue[i+2][j+1].match(token==='White'?'Black':'White')) {board[index+17].style.background='red'}
    }
    if(j>0) { //South-West
      if(boardValue[i+2][j-1]===null) {board[index+15].style.background='green';}
      else if(boardValue[i+2][j-1].match(token==='White'?'Black':'White')) {board[index+15].style.background='red'}
    }
  }
}

function bishopMove(index) {
  moving=true;
  let i=Math.floor(index/8);
  let j=index%8;
  if(i>0 && j<7) { //northEast
    for(let ne=1; ne<8 && (i-ne)>=0 && (j+ne)<8; ne++) {
      if(boardValue[i-ne][j+ne]===null) {board[index-(ne*8)+ne].style.background='green';}
      else if(boardValue[i-ne][j+ne].match(token==='White'?'Black':'White')) {board[index-(ne*8)+ne].style.background='red'; break;}
      else {break;}
    }
  }
  if(i<7 && j<7) { //southEast
    for(let se=1; se<8 && (i+se)<8 && (j+se)<8; se++) {
      if(boardValue[i+se][j+se]===null) {board[index+(se*8)+se].style.background='green';}
      else if(boardValue[i+se][j+se].match(token==='White'?'Black':'White')) {board[index+(se*8)+se].style.background='red'; break;}
      else {break;}
    }
  }
  if(i>0 && j>0) { //nothWest
    for(let nw=1; nw<8 && (i-nw)>=0 && (j-nw)>=0; nw++) {
      if(boardValue[i-nw][j-nw]===null) {board[index-nw-(nw*8)].style.background='green';}
      else if(boardValue[i-nw][j-nw].match(token==='White'?'Black':'White')) {board[index-nw-(nw*8)].style.background='red'; break;}
      else {break;}
    }
  }
  if(i>7 && j<7) { //southWest
    for(let sw=1; sw<8 && (i+sw)<8 && (j-sw)>=0; sw++) {
      if(boardValue[i+sw][j-sw]===null) {board[index-sw+(sw*8)].style.background='green';}
      else if(boardValue[i+sw][j-sw].match(token==='White'?'Black':'White')) {board[index-sw+(sw*8)].style.background='red'; break;}
      else {break;}
    }
  }
}

function kingMove(index) {
  moving=true;
  let i=Math.floor(index/8);
  let j=index%8;
  if(i>0) { //north
    if(boardValue[i-1][j]===null) {board[index-8].style.background='green';}
    else if(boardValue[i-1][j].match(token==='White'?'Black':'White')) {board[index-8].style.background='red';}
    if(j<7) { //northWest
      if(boardValue[i-1][j-1]===null) {board[index-9].style.background='green';}
      else if(boardValue[i-1][j-1].match(token==='White'?'Black':'White')) {board[index-9].style.background='red';}
    }
    if(j>0) { //northEast
      if(boardValue[i-1][j+1]===null) {board[index-7].style.background='green';}
      else if(boardValue[i-1][j+1].match(token==='White'?'Black':'White')) {board[index-7].style.background='red';}
    }
  }
  if(i<7) { //south
    if(boardValue[i+1][j]===null) {board[index+8].style.background='green';}
    else if(boardValue[i+1][j].match(token==='White'?'Black':'White')) {board[index+8].style.background='red';}
    if(j<7) { //southWest
      if(boardValue[i+1][j-1]===null) {board[index+7].style.background='green';}
      else if(boardValue[i+1][j-1].match(token==='White'?'Black':'White')) {board[index+7].style.background='red';}
    }
    if(j>0) { //southEast
      if(boardValue[i+1][j+1]===null) {board[index+9].style.background='green';}
      else if(boardValue[i+1][j+1].match(token==='White'?'Black':'White')) {board[index+9].style.background='red';}
    }
  }
  if(j>0) { //west
    if(boardValue[i][j+1]===null) {board[index+1].style.background='green';}
    else if(boardValue[i][j+1].match(token==='White'?'Black':'White')) {board[index+1].style.background='red';}
  }
  if(j<7) { //east
    if(boardValue[i][j-1]===null) {board[index-1].style.background='green';}
    else if(boardValue[i][j-1].match(token==='White'?'Black':'White')) {board[index-1].style.background='red';}
  }
}

function movePawn(index1,index2,movingToken) {
  let i1=Math.floor(index1/8);
  let j1=index1%8;
  let i2=Math.floor(index2/8);
  let j2=index2%8;
  tileImage[index1].innerHTML='';
  boardValue[i1][j1]=null;
  tileImage[index2].innerHTML=pawnSelector(movingToken);
  boardValue[i2][j2]=movingToken;
  changeTurn();
}

function pawnSelector(inputToken) {
  if(inputToken==='WhitePawn') {return WhitePawn;}
  else if(inputToken==='BlackPawn') {return BlackPawn;}
  else if(inputToken==='WhiteRook') {return WhiteRook;}
  else if(inputToken==='BlackRook') {return BlackRook;}
  else if(inputToken==='WhiteKnight') {return WhiteKnight;}
  else if(inputToken==='BlackKnight') {return BlackKnight;}
  else if(inputToken==='WhiteBishop') {return WhiteBishop;}
  else if(inputToken==='BlackBishop') {return BlackBishop;}
  else if(inputToken==='WhiteQueen') {return WhiteQueen;}
  else if(inputToken==='BlackQueen') {return BlackQueen;}
  else if(inputToken==='WhiteKing') {return WhiteKing;}
  else if(inputToken==='BlackKing') {return BlackKing;}
}

function changeTurn() {
  token=(token==='White'?'Black':'White');
  clearTile();
}

function clearTile() {
  for(let i in board) {
    if((Math.floor(i/8)+(i%8))%2===1) {board[i].style.background='gray';}
    else {board[i].style.background='white';}
  }
}


var startIndex=0;
var destinationIndex=0;
var turnToken='';

var tileImage = document.getElementsByClassName('tile');

var BlackPawn='<img src="img/Chess_Pawn/BlackPawn.png" height=35px width=35px align=center/>';
var WhitePawn='<img src="img/Chess_Pawn/WhitePawn.png" height=35px width=35px align=center/>';
var WhiteRook='<img src="img/Chess_Pawn/WhiteRook.png" height=35px width=35px align=center/>';
var BlackRook='<img src="img/Chess_Pawn/BlackRook.png" height=35px width=35px align=center/>';
var WhiteKnight='<img src="img/Chess_Pawn/WhiteKnight.png" height=35px width=35px align=center/>'; 
var BlackKnight='<img src="img/Chess_Pawn/BlackKnight.png" height=35px width=35px align=center/>';    
var WhiteBishop='<img src="img/Chess_Pawn/WhiteBishop.png" height=35px width=35px align=center/>';
var BlackBishop='<img src="img/Chess_Pawn/BlackBishop.png" height=35px width=35px align=center/>';
var WhiteQueen='<img src="img/Chess_Pawn/WhiteQueen.png" height=35px width=35px align=center/>';
var BlackQueen='<img src="img/Chess_Pawn/BlackQueen.png" height=35px width=35px align=center/>'; 
var WhiteKing='<img src="img/Chess_Pawn/WhiteKing.png" height=35px width=35px align=center/>';    
var BlackKing='<img src="img/Chess_Pawn/BlackKing.png" height=35px width=35px align=center/>';


