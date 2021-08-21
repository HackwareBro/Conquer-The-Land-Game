first_turn = false;
first_moves = {up:false,down:false,left:false,right:false}; //to check the recursion of spread

function changeTurn(){
    let turn = document.getElementById('turn')
    if (turn.innerHTML == 'Blue'){
        turn.innerHTML = 'Red';
    }
    else{
        turn.innerHTML = 'Blue';
    }
}

function changeTokenNumber(token, value){
    if(token == 'player'){
        let blue_count = document.getElementById('blue-count');
        let empty_spaces = document.getElementById('empty-spaces');
        blue_count.innerHTML = parseInt(blue_count.innerHTML) + value
        empty_spaces.innerHTML = parseInt(empty_spaces.innerHTML) - value;
    }
    else{
        let red_count = document.getElementById('red-count');
        let empty_spaces = document.getElementById('empty-spaces');
        red_count.innerHTML = parseInt(red_count.innerHTML) + value
        empty_spaces.innerHTML = parseInt(empty_spaces.innerHTML) - value;
    }
}

function incMoves(){
    let move_count = document.getElementById('move-count');
    move_count.innerHTML = parseInt(move_count.innerHTML) + 1
}

function play(element){
    if(first_turn != true && element.className == 'player'){
        move(element,Object.assign({},first_moves),'player')
        incMoves();
        first_turn = true;
        changeTurn();
    }
    else if(first_turn == true && element.className == 'opponent'){
        move(element,Object.assign({},first_moves),'opponent')
        incMoves();
        first_turn = false;
        changeTurn();
    }
}