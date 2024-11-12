class Tutoriel extends Phaser.Scene {
  constructor() {
    super({
      key: "tutoriel"
    });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image(
      "x",
      "./assets/images/ui/Small_Buttons/X_Square_Button.png"
    );

    this.load.image("controles", "./assets/images/ui/controles.png");
  }

  create() {
    //this.cameras.main.fadeIn(1000, 0, 0, 0);
    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Image contrôles

    let imgControle = this.add.image(config.width / 2, config.height / 2, "controles");
    imgControle.setScale(0.5);

    // Boutons

    let xBtn = this.add
      .image(config.width / 2 + 265, config.height / 2 - 295, "x")
      .setScale(0.2);

    hudContainer.add(xBtn);

    // Interactifs

    xBtn.setInteractive();
    this.addHoverEffectSmall(xBtn);

    xBtn.on("pointerdown", () => {
      //this.cameras.main.fadeOut(1000, 0, 0, 0);

      //this.time.delayedCall(1000, () => {
      this.scene.start("accueil");
    });
    //});
  }

  addHoverEffectSmall(button) {
    button.setInteractive();
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.21,
        scaleY: 0.21,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });
    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });
  }

  update() {}
}