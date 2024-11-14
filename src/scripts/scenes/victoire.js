class Victoire extends Phaser.Scene {
  constructor() {
    super({
      key: "victoire"
    });
  }

  preload() {
    this.load.image("victoireMenu", "./assets/images/ui/victoireMenu.png");
    this.load.image("x", "./assets/images/ui/Small_Buttons/X_Square_Button.png");
    this.load.image("v", "./assets/images/ui/Small_Buttons/V_Square_Button.png");
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.input.keyboard.enabled = true;
    this.input.mouse.enabled = true;

    this.diamondCount = 0;

    // Sons
    this.hoverSound = this.sound.add("buttonHoverSfx", {
      volume: 0.4
    });
    this.confirmSound = this.sound.add("buttonConfirmSfx", {
      volume: 0.4
    });

    this.victorySound = this.sound.add("victoryBg", {
      volume: 0,
      loop: true
    });

    this.victorySound.play();

    this.time.delayedCall(50, () => {
      this.tweens.add({
        targets: this.victorySound,
        volume: 0.25,
        duration: 1500,
        ease: 'Linear'
      });
    });

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background
    let victoireMenu = this.add.image(config.width / 2, config.height / 2, "victoireMenu");
    hudContainer.add(victoireMenu);

    // Boutons
    let xBtn = this.add
      .image(config.width / 2 + 30, config.height / 2 + 150, "x")
      .setScale(0.3);
    hudContainer.add(xBtn);

    let vBtn = this.add
      .image(config.width / 2 - 60, config.height / 2 + 150, "v")
      .setScale(0.3);
    hudContainer.add(vBtn);

    // Interactifs
    xBtn.setInteractive();
    vBtn.setInteractive();
    this.addHoverEffectSmall(xBtn);
    this.addHoverEffectSmall(vBtn);

    xBtn.on("pointerover", () => {
      this.hoverSound.play();
    });

    vBtn.on("pointerover", () => {
      this.hoverSound.play();
    });

    xBtn.on("pointerdown", () => {
      xBtn.disableInteractive();
      vBtn.disableInteractive();
      this.confirmSound.play();
      this.tweens.add({
        targets: this.victorySound,
        volume: 0,
        duration: 1500,
        ease: 'Linear'
      });
      this.cameras.main.fade(1500, 0, 0, 0);
      this.time.delayedCall(1500, () => {
        this.victorySound.stop();
        this.scene.start("accueil");
      });
    });

    vBtn.on("pointerdown", () => {
      xBtn.disableInteractive();
      vBtn.disableInteractive();
      this.confirmSound.play();
      this.tweens.add({
        targets: this.victorySound,
        volume: 0,
        duration: 1500,
        ease: 'Linear'
      });
      this.cameras.main.fade(1500, 0, 0, 0);
      this.time.delayedCall(1500, () => {
        this.victorySound.stop();
        this.scene.stop("jeu");
        this.scene.start("jeu");
      });
    });
  }

  update() {}

  addHoverEffectSmall(button) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.31,
        scaleY: 0.31,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.3,
        scaleY: 0.3,
        duration: 100,
        ease: 'Cubic.Out',
      });
    });
  }
}