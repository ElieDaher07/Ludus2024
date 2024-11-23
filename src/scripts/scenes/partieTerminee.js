class PartieTerminee extends Phaser.Scene {
  constructor() {
    super({
      key: "gameover"
    });
  }

  preload() {
    // les preloads sont tous dans accueil.js pour le moment
    this.load.image("partieTermineeMenu", "./assets/images/ui/partietermineeMenu.png");

  }

  create() {

    // Cursor


    this.customCursor = this.add.image(0, 0, 'cursor').setScale(1).setDepth(1000).setVisible(false);
    this.customCursor.setOrigin(0);


    this.diamondCount = 0;

    // Sons

    this.hoverSound = this.sound.add("buttonHoverSfx", {
      volume: 0.4
    });
    this.confirmSound = this.sound.add("buttonConfirmSfx", {
      volume: 0.4
    });

    this.gameoverSound = this.sound.add("gameoverBg", {
      volume: 0,
      loop: true
    });
    this.gameoverSound.play();

    this.time.delayedCall(50, () => {
      this.tweens.add({
        targets: this.gameoverSound,
        volume: 0.4,
        duration: 1500,
        ease: 'Linear'
      });
    });

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background

    let partieTermineeMenu = this.add.image(config.width / 2, config.height / 2, "partieTermineeMenu");

    hudContainer.add(partieTermineeMenu);

    // Boutons

    let xBtn = this.add
      .image(config.width / 2 + 30, config.height / 2 + 200, "x")
      .setScale(0.3);

    hudContainer.add(xBtn);

    let vBtn = this.add
      .image(config.width / 2 - 60, config.height / 2 + 200, "v")
      .setScale(0.3);

    hudContainer.add(vBtn);

    // Interactifs
    this.canChangeScene = false;

    this.cameras.main.once('camerafadeincomplete', () => {
      this.canChangeScene = true;

      this.customCursor.setVisible(true);

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
          targets: this.gameoverSound,
          volume: 0,
          duration: 1500,
          ease: 'Linear'
        });
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
          this.gameoverSound.stop();
          this.scene.start("accueil");
        });
      });

      vBtn.on("pointerdown", () => {
        xBtn.disableInteractive();
        vBtn.disableInteractive();
        this.confirmSound.play();
        this.tweens.add({
          targets: this.gameoverSound,
          volume: 0,
          duration: 1500,
          ease: 'Linear'
        });
        this.cameras.main.fade(1500, 0, 0, 0);
        this.time.delayedCall(1500, () => {
          this.gameoverSound.stop();
          this.scene.start("jeu");
        });
      });
    });

    this.cameras.main.fadeIn(1500, 0, 0, 0);
  }

  update() {
    const pointer = this.input.activePointer;
    this.customCursor.setPosition(pointer.x, pointer.y);
  }

  addHoverEffectSmall(button) {
    button.setInteractive();
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.32,
        scaleY: 0.32,
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