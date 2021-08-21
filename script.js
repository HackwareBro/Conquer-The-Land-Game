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
        console.log("blue: " +blue_count.innerHTML)
        empty_spaces.innerHTML = parseInt(empty_spaces.innerHTML) - value;
    }
    else{
        let red_count = document.getElementById('red-count');
        let empty_spaces = document.getElementById('empty-spaces');
        red_count.innerHTML = parseInt(red_count.innerHTML) + value
        console.log("red: " +red_count.innerHTML)
        empty_spaces.innerHTML = parseInt(empty_spaces.innerHTML) - value;
    }
}
function interchangeTokenNumber(token){
    let red_count = document.getElementById('red-count');
    let blue_count = document.getElementById('blue-count');    
    if(token == 'player'){
        blue_count.innerHTML = parseInt(blue_count.innerHTML) + 1
        red_count.innerHTML = parseInt(red_count.innerHTML) - 1
        console.log('exchange')
        console.log("red: " +red_count.innerHTML)
        console.log("blue: " +blue_count.innerHTML)
    }else{
        red_count.innerHTML = parseInt(red_count.innerHTML) + 1
        blue_count.innerHTML = parseInt(blue_count.innerHTML) - 1 
        console.log('exchange')
        console.log("red: " +red_count.innerHTML)
        console.log("blue: " +blue_count.innerHTML)
    }
}

function incMoves(){
    let move_count = document.getElementById('move-count');
    move_count.innerHTML = parseInt(move_count.innerHTML) + 1
}

function play(element){
    if(first_turn != true && element.className == 'player'){
        move(element,Object.assign({},first_moves),'player')
        first_turn = true;
        changeTurn();
        // checkWin();
    }
    else if(first_turn == true && element.className == 'opponent'){
        move(element,Object.assign({},first_moves),'opponent')
        first_turn = false;
        incMoves();
        changeTurn();
        // checkWin();
    }
}
function checkWin(){
    let move_limit = parseInt(document.getElementById('move-range').value)
    let move_count = document.getElementById('move-count').innerHTML;
    let blue_count = document.getElementById('blue-count').innerHTML;
    let red_count = document.getElementById('red-count').innerHTML;
    if(move_count == move_limit){
        
        end_screen = document.getElementsByClassName('screen')[1];
        end_screen.className = 'screen';            
        win_msg = document.getElementById('win-msg')
        if(blue_count > red_count){
             win_msg.innerHTML = 'blue wins !';
        }
        else if(red_count > blue_count){
            win_msg.innerHTML = 'red wins !';
        }
        else{
            win_msg.innerHTML = 'Draw Game !';
        }
        document.getElementById('blue-token').innerHTML = 'Blue Tokens : ' + blue_count;
        document.getElementById('red-token').innerHTML = 'Red Tokens : ' + red_count; 
        document.getElementById('stat-msg').innerHTML = move_limit + " moves limit reached !";
    }
    else if(red_count == 0 || blue_count == 0){
        end_screen = document.getElementsByClassName('screen')[1];
        end_screen.className = 'screen';            
        win_msg = document.getElementById('win-msg')
        if(blue_count > red_count){
            win_msg.innerHTML = 'blue wins !';
            document.getElementById('stat-msg').innerHTML = "Blue team completely conquer the place!";
        }
       else if(red_count > blue_count){
           win_msg.innerHTML = 'red wins !';
           document.getElementById('stat-msg').innerHTML = "Red team completely conquer the place!";
        }
       document.getElementById('blue-token').innerHTML = 'Blue Tokens : ' + blue_count;
        document.getElementById('red-token').innerHTML = 'Red Tokens : ' + red_count; 
    }
}