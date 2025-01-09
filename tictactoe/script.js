const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#status");
const restartbtn=document.querySelector("#restartbtn");
const winconditions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
let options=["","","","","","","","",""];
let currentplayer ="X";
let running = false;

initgame();

function initgame(){
  cells.forEach(cell =>cell.addEventListener("click",cellclicked));
  restartbtn.addEventListener("click",restartgame);
  statusText.textContent=`${currentplayer}'s turn`;
  running=true;
}
function cellclicked(){
  const cellindex=this.getAttribute("cellindex");
  if(options[cellindex]!=""||!running){
    return;
  }
  updatecell(this,cellindex);
  checkwinner();
}
function updatecell(cell,index){
  options[index]=currentplayer;
  cell.textContent=currentplayer;
  cell.style.backgroundColor="orange";
}
function changeply(){
  currentplayer=(currentplayer=="X")?"O":"X";
  statusText.textContent=`${currentplayer}'s turn`;
}
function checkwinner(){
  let roundwon=false;
  for(let i=0;i<winconditions.length;i++){
    const condition=winconditions[i];
    const cellA=options[condition[0]];
    const cellb=options[condition[1]];
    const cellc=options[condition[2]];
    if(cellA==""||cellb==""||cellc==""){
      continue;
    }
    if(cellA==cellb && cellb==cellc){
      roundwon=true;
      break;
    }
  }
  if(roundwon){
    statusText.textContent=`${currentplayer} wins!`
    running=false;
  }
  else if(!options.includes("")){
    statusText.textContent=`Draw!`;
    running=false;
  }
  else{
    changeply();
  }
}
function restartgame(){
  currentplayer="X";
  options=["","","","","","","","",""];
  statusText.textContent=`${currentplayer}'s turn`;
  cells.forEach(cell=>cell.textContent="");
  cells.forEach(cell=>cell.style.backgroundColor="");
  running=true;
}
