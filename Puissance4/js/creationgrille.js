const board = document.getElementById('board');
const rows = 6;
const cols = 7;

// Boucle pour créer les 42 cases (6 * 7)
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    // On garde en mémoire la ligne et la colonne de chaque case
    cell.dataset.row = r;
    cell.dataset.col = c;
    
    // Ajoute la case au plateau
    board.appendChild(cell);
  }
}
