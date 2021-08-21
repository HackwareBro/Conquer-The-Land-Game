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

//Gameplay Algorithm
function move(element, moves, token){
    if(element.className != 'empty'){        
        let number = parseInt(element.innerHTML, 10)    
        if(number > 2){            
            element.className = 'empty';
            element.innerHTML = ''
            changeTokenNumber(token,-1);
            place = _1dTo2d(element.id);  

            //now spread the tokens on four places
            if(place.row > 0){
                var up = document.getElementById('c'+_2dTo1d(place.row-1,place.col));
                if(up.className == 'empty'){    
                    up.className = token
                    up.innerHTML = '1'
                    changeTokenNumber(token,1);
                    moves.up = false
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
                }
                else{
                    moves.right = true 
                }
            }
            if(moves.left == true){
                console.log(moves)
                move(left,Object.assign({},moves),token);
            }
            if(moves.right == true){
                console.log(right + ' true')
                move(right,Object.assign({},moves),token);
            }
            if(moves.up == true){
                console.log(up + ' true')
                move(up,Object.assign({},moves),token);
            }
            if(moves.down == true){
                console.log(down + ' true')
                move(down,Object.assign({},moves),token);
            }
        }
        else{
            if(element.className != token){
                element.className = token //to conquer other's places
                changeTokenNumber(token,1)
            }
            val = element.innerHTML
            element.innerHTML = parseInt(val) + 1
        }
    }
    
}