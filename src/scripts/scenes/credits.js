class Credits extends Phaser.Scene {
  constructor() {
    super({
      key: "credits"
    });
  }

  preload() {
    // les preloads sont tous dans accueil.js pour le moment
  }

  create() {

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Sons

    this.hoverSound = this.sound.add("buttonHoverSfx");
    this.confirmSound = this.sound.add("buttonConfirmSfx");


    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Image credit

    let imgCredits = this.add.image(config.width / 2, config.height / 2, "creditsMenu");
    imgCredits.setScale(0.5);

    // Boutons

    let xBtn = this.add
      .image(config.width / 2 + 265, config.height / 2 - 295, "x")
      .setScale(0.2);

    hudContainer.add(xBtn);

    // Interactifs

    xBtn.setInteractive();
    this.addHoverEffectSmall(xBtn);

    xBtn.on("pointerover", () => {
      this.hoverSound.play();
    })

    xBtn.on("pointerdown", () => {
      this.scene.start("accueil");
      this.confirmSound.play();
    });

    this.confirmSound.setVolume(0.4);
    this.hoverSound.setVolume(0.4);
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