const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  // transparent: true,
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Accueil, Jeu, Credits, Victoire, PartieTerminee, Tutoriel],
};
const game = new Phaser.Game(config);