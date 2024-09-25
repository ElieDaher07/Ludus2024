class Jeu extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu",
    });
  }

  preload() {
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    this.load.image("quit", "./assets/images/ui/Large_Buttons/Exit_Button.png");

    // Preload le Tiled map
    this.load.tilemapTiledJSON("map", "./Tiled/rocky_world.json");
    this.load.image("img_map", "./Tiled/rocky_world.png");

    this.load.image("main_lev_build", "./Tiled/rocky_world.png");
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
      .setScale(0.3);

    hudContainer.add(quitBtn);

    // Interactifs
    quitBtn.setInteractive();

    quitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    // Tilemap
    const maCarte = this.make.tilemap({ key: "map" });

    // Tileset
    const tileSet_sky = maCarte.addTilesetImage("test", "main_lev_build");
    const tileSet_mainlvl = maCarte.addTilesetImage(
      "main_lev_build",
      "main_lev_build"
    );

    // Calques
    const bgLayer = maCarte.createLayer("background_sky", tileSet_sky, 0, 0);
    const collisionLayer = maCarte.createLayer(
      "background_lev_build",
      tileSet_mainlvl,
      0,
      0
    );
    const nonCollisionLayer = maCarte.createLayer(
      "non_collision_objects",
      tileSet_mainlvl,
      0,
      0
    );

    collisionLayer.setCollisionByProperty({ collision: true });

    // this.physics.add.collider(this.player, collisionLayer);
  }

  update() {}
}
