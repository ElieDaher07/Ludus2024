const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Preload, Accueil, Jeu, Jeu2, Jeu3, Credits, Victoire, PartieTerminee, Tutoriel, Tutoriel02, Pause, Pause02, Pause03],
  physics: {
    default: "arcade",
    arcade: {
      debug: true, // Debug
      gravity: {
        y: 1000
      },
      fps: 60,
      timeScale: 1
    }
  }
};
const game = new Phaser.Game(config);

game.registry.set('musicIsMuted', 0);
game.registry.set('audioIsMuted', 0);

let checkpoint = 0;

let niveau = "jeu";