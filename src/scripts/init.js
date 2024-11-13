const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Credits, Victoire, PartieTerminee, Tutoriel, Pause],
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

game.registry.set('isMuted', 0);
game.registry.set('leftFromAccueil', false);