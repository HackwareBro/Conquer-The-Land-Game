//All the functions which is not needed during game

function setMode(){
    let mode = document.querySelector('input[name="mode"]:checked').value;
    screen = document.getElementsByClassName('screen')[0];
    screen.className = 'screen hide'
    //Set moves
    document.getElementById('move-count').innerHTML = parseInt(document.getElementById('move-range').value);
    if (mode == '2p'){
        game_mode = '2p';    
    }
    else{
        game_mode = 'cpu';
        cpu_tokens.push('c22');
    }
}

function restartGame(){
    // remove the end screen
    screen = document.getElementsByClassName('screen')[1];
    screen.className = 'screen hide'
    //display the start screen
    screen = document.getElementsByClassName('screen')[0];
    screen.className = 'screen'
    resetBoard();
}

function showHelp(){
    screen = document.getElementsByClassName('screen')[0];
    screen.className = 'screen hide'
    help_menu = document.getElementsByClassName('screen')[2];
    help_menu.className = 'screen'    
}

function backButton(){
    screen = document.getElementsByClassName('screen')[2];
    screen.className = 'screen hide'
    help_menu = document.getElementsByClassName('screen')[0];
    help_menu.className = 'screen'    
}
