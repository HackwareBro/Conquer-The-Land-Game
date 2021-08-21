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
            // col.appendChild(document.createTextNode('ta1'))  just for testing
            document.querySelector('tr#r'+i).appendChild(col);
        }
    }
    // setting start position for both players
    opponent = document.getElementById('c' + _2dTo1d(1,1))
    opponent.className='opponent';
    opponent.innerHTML = '3'
    player = document.getElementById('c' + _2dTo1d(8,8))
    player.className='player';
    player.innerHTML='3';

}
createGameArea();