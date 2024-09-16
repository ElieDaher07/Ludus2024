const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  // transparent: true,
  pixelArt: true,
  width: 1920,
  height: 1080,
  scene: Accueil,
};
const game = new Phaser.Game(config);
