const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Credits, Victoire, PartieTerminee, Tutoriel],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 1000
      }
    }
  }
};
const game = new Phaser.Game(config);