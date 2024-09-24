class Victoire extends Phaser.Scene {
  constructor() {
    super({
      key: "victoire"
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

    // Les boutons seront à placer et à resize correctement quand je pourrais voir avec un preview

    let menuBtn = this.add
      .image(config.width / 2, config.height / 2, "menu")
      .setScale(0.5);

    hudContainer.add(menuBtn);

    // Interactifs

    menuBtn.setInteractive();

    menuBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });
  }

  update() {}
}