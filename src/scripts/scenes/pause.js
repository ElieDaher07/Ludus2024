class Pause extends Phaser.Scene {
  constructor() {
    super({
      key: "pause"
    });
  }

  preload() {

  }

  create() {

    this.unpauseSound = this.sound.add("unpauseSfx");
    this.hoverSound = this.sound.add("buttonHoverSfx");
    this.confirmSound = this.sound.add("buttonConfirmSfx");

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Interactions avec le(s) bouton(s)

    let pauseImg = this.add.image(config.width / 2, config.height / 2, "pause").setScale(0.5);

    let continueBtn = this.add.image(config.width / 2, (config.height / 2 - 100), "continue").setScale(0.5);

    let resetBtn = this.add.image(config.width / 2, (config.height / 2 + 50), "reset").setScale(0.5).setTint(0xB0B0B0);

    let quitBtn = this.add.image((config.width / 2), (config.height / 2 + 200), "quit").setScale(0.5);

    quitBtn.setInteractive();
    continueBtn.setInteractive();

    hudContainer.add(pauseImg);
    hudContainer.add(quitBtn);
    hudContainer.add(continueBtn);
    hudContainer.add(resetBtn);

    this.input.keyboard.on("keydown-ESC", () => {
      this.unpauseSound.play();
      this.scene.stop("pause");
      let bgMusic = this.game.registry.get("bgMusic");
      if (bgMusic && !this.game.registry.get("isMuted")) {
        bgMusic.resume();
      }
      this.scene.get("jeu").isPaused = false;
      this.scene.resume("jeu");
    });

    quitBtn.on("pointerover", () => {
      this.hoverSound.play();
    })

    quitBtn.on("pointerdown", () => {
      quitBtn.disableInteractive();
      continueBtn.disableInteractive();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.confirmSound.play();
      this.time.delayedCall(1000, () => {
        this.scene.stop("jeu");
        this.scene.start("accueil");
      });
    });

    continueBtn.on("pointerover", () => {
      this.hoverSound.play();
    })

    continueBtn.on("pointerdown", () => {
      quitBtn.disableInteractive();
      continueBtn.disableInteractive();
      this.unpauseSound.play();
      let bgMusic = this.game.registry.get("bgMusic");
      if (bgMusic && !this.game.registry.get("isMuted")) {
        bgMusic.resume();
      }
      this.scene.get("jeu").isPaused = false;
      this.scene.resume("jeu");
      this.scene.stop("pause");
    });

    this.addHoverEffectBig(quitBtn);
    this.addHoverEffectBig(continueBtn);

    this.confirmSound.setVolume(0.4);
    this.hoverSound.setVolume(0.4);
    this.unpauseSound.setVolume(0.4);

  }

  update() {}

  addHoverEffectBig(button) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.51,
        scaleY: 0.51,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });
    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });
  }
}