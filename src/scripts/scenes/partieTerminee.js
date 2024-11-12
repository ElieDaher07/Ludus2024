class PartieTerminee extends Phaser.Scene {
  constructor() {
    super({
      key: "gameover"
    });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image(
      "menu",
      "./assets/images/ui/Small_Buttons/Home_Square_Button.png"
    );

    this.load.image(
      "recommencer",
      "./assets/images/ui/Small_Buttons/Return_Square_Button.png"
    );
  }

  create() {

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Boutons

    // Les boutons seront à placer et à resize correctement quand je pourrais voir avec un preview

    let menuBtn = this.add
      .image(config.width / 2 + 100, config.height / 2, "menu")
      .setScale(0.5);

    hudContainer.add(menuBtn);

    let restartBtn = this.add
      .image(config.width / 2 - 100, config.height / 2, "recommencer")
      .setScale(0.5);

    hudContainer.add(restartBtn);

    // Interactifs

    menuBtn.setInteractive();
    restartBtn.setInteractive();

    menuBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    restartBtn.on("pointerdown", () => {
      this.scene.start("jeu");
    });
  }

  update() {}


}