function nomjoueur() {
  const cases = document.querySelectorAll('.cell');
  const inputRouge = document.getElementById('JoueurRouge');
  const inputJaune = document.getElementById('JoueurJaune');

  if (inputRouge) {
    inputRouge.addEventListener('input', () => {
      localStorage.setItem('nomJoueurRouge', inputRouge.value.trim());
    });
  }

  if (inputJaune) {
    inputJaune.addEventListener('input', () => {
      localStorage.setItem('nomJoueurJaune', inputJaune.value.trim());
    });
  }

  const h2 = document.getElementById('h2Jeu');

  if (h2) {
    const nomSauvegarde = localStorage.getItem('nomJoueurRouge') || "Rouge";
    const nomSauvegardeJaune = localStorage.getItem('nomJoueurJaune') || "Jaune";

    let tourRouge = true;
    let partieTerminee = false;

    const NB_LIGNES = 6;
    const NB_COLONNES = 7;
    let grille = Array.from({ length: NB_LIGNES }, () => Array(NB_COLONNES).fill(null));

    h2.textContent = `Au joueur ${nomSauvegarde} (Rouge) de jouer`;

    cases.forEach((element, index) => {
      element.addEventListener("click", () => {
        if (partieTerminee) return;

        // Calcul de la colonne cliquée (de 0 à 6)
        const col = index % NB_COLONNES;

        // Trouver la première ligne disponible en partant du bas
        let ligneTrouvee = -1;
        for (let l = NB_LIGNES - 1; l >= 0; l--) {
          if (grille[l][col] === null) {
            ligneTrouvee = l;
            break;
          }
        }

        // Si la colonne est pleine, on ne fait rien
        if (ligneTrouvee === -1) return;

        // Déterminer la couleur et le nom du joueur actif
        const couleurActuelle = tourRouge ? "red" : "yellow";
        const nomActuel = tourRouge ? nomSauvegarde : nomSauvegardeJaune;

        // Enregistrer le coup dans le tableau JS
        grille[ligneTrouvee][col] = couleurActuelle;

        // Mettre à jour la couleur dans la grille HTML
        const indexCaseHTML = ligneTrouvee * NB_COLONNES + col;
        cases[indexCaseHTML].style.backgroundColor = couleurActuelle;

        // Vérifier la victoire
        if (verifierVictoire(grille, ligneTrouvee, col, couleurActuelle)) {
          h2.textContent = `🎉 Le joueur ${nomActuel} a gagné !`;
          partieTerminee = true;
          return;
        }

        // Passer au joueur suivant
        tourRouge = !tourRouge;
        const nomProchain = tourRouge ? nomSauvegarde : nomSauvegardeJaune;
        const couleurProchaine = tourRouge ? "Rouge" : "Jaune";
        h2.textContent = `Au joueur ${nomProchain} (${couleurProchaine}) de jouer`;
      });
    });
  }
}

// Fonction de vérification des 4 alignements
function verifierVictoire(grille, ligne, col, couleur) {
  const directions = [
    { r: 0, c: 1 },  // Horizontal
    { r: 1, c: 0 },  // Vertical
    { r: 1, c: 1 },  // Diagonale descendante (\)
    { r: 1, c: -1 }  // Diagonale ascendante (/)
  ];

  for (let { r, c } of directions) {
    let compte = 1;

    // Compter d'un côté
    let i = 1;
    while (
      grille[ligne + i * r] &&
      grille[ligne + i * r][col + i * c] === couleur
    ) {
      compte++;
      i++;
    }

    // Compter de l'autre côté
    i = 1;
    while (
      grille[ligne - i * r] &&
      grille[ligne - i * r][col - i * c] === couleur
    ) {
      compte++;
      i++;
    }

    // Victoire si 4 jetons ou plus sont alignés
    if (compte >= 4) return true;
  }

  return false;
}

nomjoueur();