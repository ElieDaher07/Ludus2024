class Tutoriel extends Phaser.Scene {
  constructor() {
    super({ key: "tutoriel" });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image(
      "return",
      "./assets/images/ui/Large_Buttons/Back_Button.png"
    );
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

    let returnBtn = this.add
      .image(config.width / 2, config.height / 2, "return")
      .setScale(0.5);

    hudContainer.add(returnBtn);

    // Interactifs

    returnBtn.setInteractive();

    returnBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
  }

  update() {}
}
