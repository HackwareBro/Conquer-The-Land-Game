function _2dTo1d(row,col){    //function to convert rows and columns to a single number to deal with ids of places
    return row*10+col;
}
function _1dTo2d(val){ 
    if (typeof val == "string"){
        val = parseInt(val.slice(1,3))  //if string comes with a prefix character e.g id = 'c12'
    }
    row = Math.floor(val/10);
    col = val%10;
    return {row, col};
}
function createGameArea(){
    for (let i = 0; i < 10; i++){
        row = document.createElement('tr');
        row.id = 'r'+i;
        document.getElementsByTagName('table')[0].appendChild(row);
        for (let j = 0; j < 10; j++){
            col = document.createElement('td')
            col.id = 'c'+ _2dTo1d(i,j);
            col.className = 'empty'
            col.setAttribute('onclick','play(this)')
            document.querySelector('tr#r'+i).appendChild(col);
        }
    }
    // setting start position for both players
    opponent = document.getElementById('c' + _2dTo1d(2,2))
    opponent.className='opponent';
    opponent.innerHTML = '3'
    player = document.getElementById('c' + _2dTo1d(7,7))
    player.className='player';
    player.innerHTML='3';

}
function resetBoard(){
    cpu_turn = false;
    first_turn = false;
    document.getElementsByClassName('info')[0].className = 'info blue'
    document.getElementById('blue-count').innerHTML = 1;
    document.getElementById('red-count').innerHTML = 1;
    //cpu_tokens array should be reset as well
    cpu_tokens = [];
    for(let i = 0; i < 100; i++){
        place = document.getElementById('c'+i);
        if(i == 22){
            place.className = 'opponent';
            place.innerHTML = '3'
        }
        else if(i == 77){
            place.className = 'player';
            place.innerHTML = '3'
        }
        else{
            place.className = 'empty';
            place.innerHTML = '';
        }
    }
}
createGameArea();