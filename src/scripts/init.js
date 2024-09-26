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
      debug: true, // Je laisse le debug pour vous
      gravity: {
        y: 1000 // La gravité
      }
    }
  }
};
const game = new Phaser.Game(config);