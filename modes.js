// Game algorithm javascript file

var game_mode;
var cpu_tokens = [];
var cpu_turn = false;

first_turn = false;
first_moves = {up:false,down:false,left:false,right:false}; //to check the recursion of spread

function changeTurn(){
    let turn = document.getElementById('turn')
    let change_banner_color = document.getElementsByClassName('info')[0]
    if (turn.innerHTML == 'Blue'){
        turn.innerHTML = 'Red';
        change_banner_color.className = 'info red';
    }
    else{
        turn.innerHTML = 'Blue';
        change_banner_color.className = 'info blue';
    }
}

function changeTokenNumber(token, value){
    if(token == 'player'){
        let blue_count = document.getElementById('blue-count');
        blue_count.innerHTML = parseInt(blue_count.innerHTML) + value
    }
    else{
        let red_count = document.getElementById('red-count');
        red_count.innerHTML = parseInt(red_count.innerHTML) + value
    }
}

function interchangeTokenNumber(token){
    let red_count = document.getElementById('red-count');
    let blue_count = document.getElementById('blue-count');    
    if(token == 'player'){
        blue_count.innerHTML = parseInt(blue_count.innerHTML) + 1
        red_count.innerHTML = parseInt(red_count.innerHTML) - 1
    }else{
        red_count.innerHTML = parseInt(red_count.innerHTML) + 1
        blue_count.innerHTML = parseInt(blue_count.innerHTML) - 1 
    }
}

function decMoves(){
    let move_count = document.getElementById('move-count');
    move_count.innerHTML = parseInt(move_count.innerHTML) - 1;
}

function play(element){
    if(game_mode == '2p'){
        mode2P(element);
    }
    else{
        modeCPU(element);
    }
}

function mode2P(element){
    if(first_turn != true && element.className == 'player'){
        move(element,Object.assign({},first_moves),'player')
        first_turn = true;
        changeTurn();
        checkWin();
    }
    else if(first_turn == true && element.className == 'opponent'){
        move(element,Object.assign({},first_moves),'opponent')
        first_turn = false;
        decMoves();
        changeTurn();
        checkWin();
    }
}
function modeCPU(element){
    //Player turn
    if(element.className == 'player' && cpu_turn == false){
        move(element,Object.assign({},first_moves),'player')
        changeTurn();
        checkWin();
        cpu_turn = true;

        //cpu turn on random
        rand_id = cpu_tokens[Math.trunc(Math.random() * cpu_tokens.length)];
        cpu_element = document.getElementById(rand_id);
        cpu_element.className = 'active';
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        sleep(1000).then(() => {   
            cpu_element.className = 'opponent';
            move(cpu_element,Object.assign({},first_moves),'opponent'); 
             changeTurn();
            checkWin();
            decMoves();
             cpu_turn = false;
         });
    }
}


function checkWin(){
    let move_count = document.getElementById('move-count').innerHTML;
    let blue_count = document.getElementById('blue-count').innerHTML;
    let red_count = document.getElementById('red-count').innerHTML;   
    if(move_count == 0){
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

function arrayRemove(value) {
    cpu_tokens = cpu_tokens.filter(function(ele){ 
        return ele != value; 
    });
}

//player Algorithm
function move(element, moves, token){
    if(element.className != 'empty'){        
        let number = parseInt(element.innerHTML, 10)    
        if(number > 2){
            if(element.className != token){ //to decrement the place where against party has 3 value
                changeTokenNumber(element.className,-1)
                if(game_mode == 'cpu'){
                    if (cpu_turn != true){
                        arrayRemove(element.id);
                    }
                }
                changeTokenNumber(token,1)
            }            
            element.className = 'empty';
            element.innerHTML = ''
            changeTokenNumber(token,-1);
            if(cpu_turn == true){
                arrayRemove(element.id)  
            }
            place = _1dTo2d(element.id); 
            //now spread the tokens on four places
            if(place.row > 0){
                var up = document.getElementById('c'+_2dTo1d(place.row-1,place.col));
                if(up.className == 'empty'){    
                    up.className = token
                    up.innerHTML = '1'
                    changeTokenNumber(token,1);
                    moves.up = false
                    if(cpu_turn == true){
                        cpu_tokens.push(up.id);  
                    }
                }
                else{
                    moves.up = true 
                }
                
            }  
            if(place.row < 9){
                var down = document.getElementById('c'+_2dTo1d(place.row+1,place.col));
                if(down.className == 'empty'){    
                    down.className = token
                    down.innerHTML = '1'
                    changeTokenNumber(token,1);
                    moves.down = false
                    if(cpu_turn == true){
                        cpu_tokens.push(down.id);  
                    }
                }
                else{
                    moves.down = true 
                }
            }
            if(place.col > 0){
                var left = document.getElementById('c'+_2dTo1d(place.row,place.col-1));
                
                if(left.className == 'empty'){    
                    left.className = token
                    left.innerHTML = '1'
                    changeTokenNumber(token,1);
                    moves.left = false
                    if(cpu_turn == true){
                        cpu_tokens.push(left.id);  
                    }
                }
                else{
                    moves.left = true 
                }
            }
            if(place.col < 9){
                var right = document.getElementById('c'+_2dTo1d(place.row,place.col+1));
                if(right.className == 'empty'){    
                    right.className = token
                    right.innerHTML = '1'
                    changeTokenNumber(token,1);
                    moves.right = false
                    if(cpu_turn == true){
                        cpu_tokens.push(right.id);  
                    }
                }
                else{
                    moves.right = true 
                }
            }
            if(moves.left == true){
               
                move(left,Object.assign({},moves),token);
            }
            if(moves.right == true){
                move(right,Object.assign({},moves),token);
            }
            if(moves.up == true){
               
                move(up,Object.assign({},moves),token);
            }
            if(moves.down == true){
                move(down,Object.assign({},moves),token);
            }
        }
        else{
            if(element.className != token){
                interchangeTokenNumber(token)
                element.className = token //to conquer other's places
                if(game_mode == 'cpu'){
                    if(cpu_turn == true){
                        cpu_tokens.push(element.id);
                    }
                    else{
                        arrayRemove(element.id);
                    }
                }
            }
            val = element.innerHTML
            element.innerHTML = parseInt(val) + 1
        }
    }
    
}