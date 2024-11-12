class Accueil extends Phaser.Scene {
  constructor() {
    super({
      key: "accueil"
    });
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

    // Preload le(s) bouton(s)
    this.load.image("quit", "./assets/images/ui/Large_Buttons/Exit_Button.png");

    // Preload le Tiled map
    this.load.tilemapTiledJSON("carte_json", "./assets/images/backgrounds/Rocky_Level/carte_rocky.json");

    // Preload les 5 images de tilesets utiliser
    this.load.image("background1_tile", "./assets/images/backgrounds/Rocky_Level/background1.png");
    this.load.image("background2_tile", "./assets/images/backgrounds/Rocky_Level/background2.png");
    this.load.image("background3_tile", "./assets/images/backgrounds/Rocky_Level/background3.png");
    this.load.image("background_main", "./assets/images/backgrounds/Rocky_Level/main_lev_build.png");
    this.load.image("background_other", "./assets/images/backgrounds/Rocky_Level/other_lev_build.png");

    // Preload le joueur spritesheet

    this.load.spritesheet("player_idle_run_jump", "./assets/images/characters/player_spritesheet/idle_run_jump_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("player_attacks", "./assets/images/characters/player_spritesheet/attacks_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("player_hit_death", "./assets/images/characters/player_spritesheet/hit_death_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("player_throw_attack", "./assets/images/characters/player_spritesheet/throw_attack_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("dagger_throw", "./assets/images/characters/player_spritesheet/throw_dagger_sheet.png", {
      frameWidth: 15,
      frameHeight: 16
    });

    // Preload oiseau spritesheet

    this.load.spritesheet("bird", "./assets/images/backgrounds/bird.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    // Preload les items

    this.load.image("heart01", "./assets/images/items/heart01.png")

    // Preload les ennemis

    this.load.spritesheet("enemy01", "./assets/images/characters/enemy/enemy01_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy02", "./assets/images/characters/enemy/enemy02_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("enemy03", "./assets/images/characters/enemy/enemy03_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("enemy04", "./assets/images/characters/enemy/enemy04_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });


    this.load.spritesheet("enemy05", "./assets/images/characters/enemy/enemy05_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    // Preload l'élément hud du joueur

    this.load.image("hud", "./assets/images/ui/Gui.png");
    this.load.image("health", "./assets/images/ui/health_sheet.png")

    // Preload effects

    this.load.spritesheet("destroy_effect", "./assets/images/fx/destr_effect_sheet.png", {
      frameWidth: 80,
      frameHeight: 80
    });

    this.load.spritesheet("hit_effect", "./assets/images/fx/hit_effect_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    //this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.input.mouse.disableContextMenu();


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
      .setPosition(config.width / 2, 150).setScale(0.7);

    this.tweens.add({
      targets: logo,
      scale: 0.76,
      duration: 900,
      ease: 'Quad.easeInOut',
      repeat: -1,
      yoyo: true

    })

    hudContainer.add(logo);

    // Boutons

    let playBtn = this.add
      .image(config.width / 2, config.height / 2, "play")
      .setScale(0.3);

    hudContainer.add(playBtn);

    let controlsBtn = this.add
      .image(config.width / 2, config.height / 2 + 80, "controls")
      .setScale(0.3);

    hudContainer.add(controlsBtn);

    let creditsBtn = this.add
      .image(config.width / 2 - 50, config.height / 2 + 150, "credits")
      .setScale(0.15);

    hudContainer.add(creditsBtn);

    let audioBtn = this.add
      .image(config.width / 2 + 50, config.height / 2 + 150, "audio")
      .setScale(0.15);

    hudContainer.add(audioBtn);

    // Interactifs

    playBtn.setInteractive();
    controlsBtn.setInteractive();
    creditsBtn.setInteractive();
    audioBtn.setInteractive();

    this.addHoverEffectBig(playBtn);
    this.addHoverEffectBig(controlsBtn);
    this.addHoverEffectSmall(creditsBtn);
    this.addHoverEffectSmall(audioBtn);

    playBtn.on("pointerdown", () => {
      controlsBtn.disableInteractive();
      creditsBtn.disableInteractive();
      audioBtn.disableInteractive();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start("jeu");
      });
    });

    controlsBtn.on("pointerdown", () => {
      //this.cameras.main.fadeOut(1000, 0, 0, 0);
      //this.time.delayedCall(1000, () => {
      this.scene.start("tutoriel");
      // });
    });

    creditsBtn.on("pointerdown", () => {
      controlsBtn.disableInteractive();
      playBtn.disableInteractive();
      audioBtn.disableInteractive();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start("credits");
      });
    });
  }

  addHoverEffectBig(button) {
    button.setInteractive();
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

  addHoverEffectSmall(button) {
    button.setInteractive();
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.16,
        scaleY: 0.16,
        duration: 200,
        ease: 'Cubic.Out',
      });
    });
    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.15,
        scaleY: 0.15,
        duration: 200,
        ease: 'Cubic.Out',
      });
    });
  }


  update() {}
}