class Accueil extends Phaser.Scene {
  preload() {
    this.load.image("bg", "./assets/images/backgrounds/background_menu.png");
  }

  create() {
    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);
  }

  update() {}
}
