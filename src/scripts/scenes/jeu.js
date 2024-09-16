class Jeu extends Phaser.Scene {
  constructor() {
    super({ key: "jeu" });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image("quit", "./assets/images/ui/Large_Buttons/Exit_Button.png");
  }

  create() {
    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Boutons

    let quitBtn = this.add
      .image(config.width / 2, config.height / 2, "quit")
      .setScale(0.5);

    hudContainer.add(quitBtn);

    // Interactifs

    quitBtn.setInteractive();

    quitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
  }

  update() {}
}
