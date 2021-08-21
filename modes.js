function setMode(){
    mode = document.querySelector('input[name="mode"]:checked').value;
    if (mode == '2p'){
        screen = document.getElementsByClassName('screen')[0];
        screen.className = 'screen hide'    
    }
    else{
        document.getElementById('temp-msg').innerHTML = "CPU mode will available very soon!, it's under development."
    }

}
function restartGame(){
    // remove the end screen
    screen = document.getElementsByClassName('screen')[1];
    screen.className = 'screen hide'
    //display the start screen
    screen = document.getElementsByClassName('screen')[0];
    screen.className = 'screen'
}


//player Algorithm
function move(element, moves, token){
    if(element.className != 'empty'){        
        let number = parseInt(element.innerHTML, 10)    
        if(number > 2){
            if(element.className != token){ //to decrement the place where against party has 3 value
                changeTokenNumber(element.className,-1)
            }            
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
            }
            val = element.innerHTML
            element.innerHTML = parseInt(val) + 1
        }
    }
    
}