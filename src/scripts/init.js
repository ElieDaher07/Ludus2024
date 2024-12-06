const config = {
  type: Phaser.AUTO,
  parent: "canvas-wrapper",
  pixelArt: true,
  width: 1280,
  height: 720,
  scene: [Preload, Accueil, Jeu, Jeu2, Credits, Victoire, PartieTerminee, Tutoriel, Tutoriel02, Pause, Pause02],
  physics: {
    default: "arcade",
    arcade: {
      debug: true, // 
      gravity: {
        y: 1000
      },
      fps: 120,
      timeScale: 1,
      checkCollision: {
        up: true,
        down: true,
        left: true,
        right: true
      }
    }
  }
};
const game = new Phaser.Game(config);

game.registry.set('musicIsMuted', 0);
game.registry.set('audioIsMuted', 0);

let checkpoint = 0;

let niveau = "jeu";