function createGameArea(){
    for (let i = 0; i < 10; i++){
        row = document.createElement('tr');
        row.id = 'r'+i;
        document.getElementsByTagName('table')[0].appendChild(row);
        for (let j = 0; j < 10; j++){
            col = document.createElement('td')
            col.id = 'c'+ (i*10 + j);
            col.className = 'empty'
            // col.appendChild(document.createTextNode('ta1'))  just for testing
            document.querySelector('tr#r'+i).appendChild(col);
        }
    }
  
}
createGameArea();