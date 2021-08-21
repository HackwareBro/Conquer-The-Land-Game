first_turn = false;
first_moves = {up:false,down:false,left:false,right:false};

function play(element){
    if(first_turn != true && element.className == 'player'){
        move(element,Object.assign({},first_moves),'player')
        first_turn = true;
    }
    else if(first_turn == true && element.className == 'opponent'){
        move(element,Object.assign({},first_moves),'opponent')
        first_turn = false;
    }
}

function move(element, moves, token){
    if(element.className == token){        
        let number = parseInt(element.innerHTML, 10)    
        if(number > 2){            
            element.className = 'empty';
            element.innerHTML = ''
            place = _1dTo2d(element.id);  

            //now spread the tokens on four places
            if(place.row > 0){
                var up = document.getElementById('c'+_2dTo1d(place.row-1,place.col));
                if(up.className == 'empty'){    
                    up.className = token
                    up.innerHTML = '1'
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
                    moves.right = false
                }
                else{
                    moves.right = true 
                }
            }
            if(moves.left == true){
                console.log(moves)
                move(left,true,Object.assign({},moves));
            }
            if(moves.right == true){
                console.log(right + ' true')
                move(right,true,Object.assign({},moves));
            }
            if(moves.up == true){
                console.log(up + ' true')
                move(up,true,Object.assign({},moves));
            }
            if(moves.down == true){
                console.log(down + ' true')
                move(down,true,Object.assign({},moves));
            }
        }
        else{
            val = element.innerHTML
            element.innerHTML = parseInt(val) + 1
        }
    }
    
}