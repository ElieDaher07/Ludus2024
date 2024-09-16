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

    this.load.image(
      "audio",
      "./assets/images/ui/Small_Buttons/Audio_Square_Button.png"
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

    // Logo
    const logo = this.add
      .image(0, 0, "logo")
      .setPosition(config.width / 2, 200);
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
      .setScale(0.5);

    hudContainer.add(playBtn);

    let controlsBtn = this.add
      .image(config.width / 2, config.height / 2 + 120, "controls")
      .setScale(0.5);

    hudContainer.add(controlsBtn);

    let creditsBtn = this.add
      .image(config.width / 2 - 50, config.height / 2 + 250, "credits")
      .setScale(0.2);

    hudContainer.add(creditsBtn);

    let audioBtn = this.add
      .image(config.width / 2 + 50, config.height / 2 + 250, "audio")
      .setScale(0.2);

    hudContainer.add(audioBtn);

    // Interactifs

    playBtn.setInteractive();
    controlsBtn.setInteractive();
    creditsBtn.setInteractive();
    audioBtn.setInteractive();

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
