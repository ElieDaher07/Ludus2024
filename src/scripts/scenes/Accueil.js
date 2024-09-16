class Accueil extends Phaser.Scene {
  constructor() {
    super({ key: "accueil" });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image("logo", "./assets/images/backgrounds/logo.png");

    this.load.image("play", "./assets/images/ui/Large_Buttons/Play_Button.png");
    this.load.image(
      "controls",
      "./assets/images/ui/Large_Buttons/Controls_Button.png"
    );
    this.load.image(
      "credits",
      "./assets/images/ui/Small_Buttons/Info_Square_Button.png"
    );
  }

  create() {
    // HUD
    this.hudContainer = this.add.container(0, 0);

    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Logo
    const logo = this.add
      .image(0, 0, "logo")
      .setPosition(config.width / 2, 200)
      .setScale(0.9);
    hudContainer.add(logo);

    /* J'ajouterais le texte plus tard avec un font que je trouverais

      this.logoText = this.add
     .text(config.width / 2 - 350, 200, "Aether's Light")
     .setScale(2)
     .setResolution(10);

    */

    // Boutons

    let playBtn = this.add
      .image(config.width / 2, config.height / 2, "play")
      .setDepth(1)
      .setScale(1);

    let controlsBtn = this.add
      .image(config.width / 2, config.height / 2, "controls")
      .setDepth(1)
      .setScale(1);

    let creditsBtn = this.add
      .image(config.width / 2, config.height / 2, "credits")
      .setDepth(1)
      .setScale(1);

    hudContainer.add(playBtn, controlsBtn, creditsBtn);

    // Interactifs

    playBtn.setInteractive();
    controlsBtn.setInteractive();
    creditsBtn.setInteractive();

    playBtn.on("pointerdown", () => {
      this.scene.start("jeu");
    });

    controlsBtn.on("pointerdown", () => {
      this.scene.start("tutoriel");
    });

    creditsBtn.on("pointerdown", () => {
      this.scene.start("credits");
    });

    //
  }

  update() {}
}
