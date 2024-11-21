const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Jeu2, Jeu3, Credits, Victoire, PartieTerminee, Tutoriel, Tutoriel02, Pause],
  physics: {
    default: "arcade",
    arcade: {
      debug: true, // Debug
      gravity: {
        y: 1000
      },

    }
  }
};
const game = new Phaser.Game(config);

game.registry.set('musicIsMuted', 0);
game.registry.set('audioIsMuted', 0);

let niveauActuel = "jeu";