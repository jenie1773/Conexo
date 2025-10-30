var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            categorias = data[0].categorias 
            console.log(categorias[0].nome)
        } else {
            console.error('Erro na requisição: ' + xhr.status);
        }
    }
};
xhr.open('GET', 'conexo.php', true);
xhr.send();

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    const resetButton = document.getElementById('reset-btn');
    const status = document.getElementById('status');

    const numRows = 3;
    const numCols = 3;
    const totalCells = numRows * numCols;
    let connectedCount = 0;
    let connectedCells = new Set();

    // Função para criar a grade de células
    function createGrid() {
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            categorias[a].palavras.forEach(element => {
              
            });
            cell.dataset.index = i;
            grid.appendChild(cell);
        }
    }

    function areAdjacent(cell1, cell2) {
        const index1 = parseInt(cell1.dataset.index);
        const index2 = parseInt(cell2.dataset.index);
        const row1 = Math.floor(index1 / numCols);
        const col1 = index1 % numCols;
        const row2 = Math.floor(index2 / numCols);
        const col2 = index2 % numCols;

        return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2);
    }

    function checkWin() {
        if (connectedCount === totalCells) {
            status.textContent = 'Parabéns! Você conectou todas as células!';
        }
    }

    function resetGame() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('connected');
        });
        connectedCount = 0;
        connectedCells.clear();
        status.textContent = '';
    }

    grid.addEventListener('click', function(event) {
        const cell = event.target;
        if (cell.classList.contains('cell') && !cell.classList.contains('connected')) {
            if (connectedCells.size === 0 || Array.from(connectedCells).some(connectedCell => areAdjacent(connectedCell, cell))) {
                cell.classList.add('connected');
                connectedCells.add(cell);
                connectedCount++;
                checkWin();
            }
        }
    });

    resetButton.addEventListener('click', resetGame);

    createGrid();
});