class Jeu extends Phaser.Scene {
  constructor() {
    super({
      key: "jeu",
    });
  }

  preload() {
    // Preload le(s) bouton(s)

    this.load.image("quit", "./assets/images/ui/Large_Buttons/Exit_Button.png");

    // Preload le Tiled map

    this.load.tilemapTiledJSON(
      "carte_json",
      "./assets/images/backgrounds/Rocky_Level/carte_rocky.json"
    );

    // Preload les 5 images de tilesets utiliser

    this.load.image(
      "background1_tile",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );
    this.load.image(
      "background2_tile",
      "./assets/images/backgrounds/Rocky_Level/background2.png"
    );
    this.load.image(
      "background3_tile",
      "./assets/images/backgrounds/Rocky_Level/background3.png"
    );
    this.load.image(
      "background_main",
      "./assets/images/backgrounds/Rocky_Level/main_lev_build.png"
    );
    this.load.image(
      "background_other",
      "./assets/images/backgrounds/Rocky_Level/other_lev_build.png"
    );

    // Preload le joueur

    this.load.image("player", "./assets/images/characters/player/idle01.png")
  }

  create() {

    // Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // HUD

    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Boutons
    let quitBtn = this.add
      .image(config.width / 2 + 520, config.height / 2 - 320, "quit")
      .setScale(0.3);

    hudContainer.add(quitBtn);

    // Interactifs
    quitBtn.setInteractive();

    quitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte_json"
    });

    // Tileset
    const background1 = maCarte.addTilesetImage(
      "background1",
      "background1_tile"
    );

    const background2 = maCarte.addTilesetImage(
      "background2",
      "background2_tile"
    );
    const background3 = maCarte.addTilesetImage(
      "background3",
      "background3_tile"
    );
    const main_lev_build = maCarte.addTilesetImage(
      "main_lev_build",
      "background_main"
    );
    const other_lev_build = maCarte.addTilesetImage(
      "other_lev_build",
      "background_other"
    );

    // Calques background non collision, ajout en ordre de bas a haut dans l'application Tiled

    const background_sky = maCarte.createLayer("background_sky", [background1], 0, 0);

    const background_sky_front = maCarte.createLayer(
      "background_sky_front",
      [background2, other_lev_build],
      0,
      0
    );

    const background_behind04 = maCarte.createLayer(
      "background_behind04",
      [background3, main_lev_build],
      0,
      0
    );

    const background_behind03 = maCarte.createLayer(
      "background_behind03",
      [main_lev_build],
      0,
      0
    );

    const background_behind02 = maCarte.createLayer(
      "background_behind02",
      [main_lev_build],
      0,
      0
    );

    const background_behind01 = maCarte.createLayer(
      "background_behind01",
      [main_lev_build, other_lev_build],
      0,
      0
    );

    const background_front = maCarte.createLayer("background_front", [main_lev_build], 0, 0);

    const background_vegetation = maCarte.createLayer(
      "background_vegetation",
      [main_lev_build],
      0,
      0
    );

    // Calques avec collision

    const collisionLayer01 = maCarte.createLayer(
      "background_main",
      [main_lev_build],
      0,
      0
    );
    const collisionLayer02 = maCarte.createLayer(
      "background_bridge",
      [main_lev_build],
      0,
      0
    );

    collisionLayer01.setCollisionByProperty({
      collision: true
    });

    collisionLayer02.setCollisionByProperty({
      collision: true
    });

    // Joueur

    this.player = this.physics.add.image(config.width / 2 - 600, config.height / 2 - 180, "player");

    this.player.setBounce(0);
    this.player.setScale(0.7);
    this.player.setSize(25, 40);
    this.player.setOffset(10, 20);

    // Collision

    this.physics.add.collider(this.player, collisionLayer01);
    this.physics.add.collider(this.player, collisionLayer02);

    // Touches

    this.keys = this.input.keyboard.addKeys({
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

  }

  update() {

    // La gravité a été ajouté dans le config

    // Mouvement avec A et D

    if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-160);
    } else if (this.keys.right.isDown) {
      this.player.body.setVelocityX(160);
    } else {
      this.player.body.setVelocityX(0);
    }

    // Double saut avec SPACE

    if (this.keys.jump.isUp) {
      this.jumpKeyReleased = true; // La touche est relâchée
    }
    if (this.keys.jump.isDown && this.jumpKeyReleased && (this.player.body.onFloor() || this.jumpCount < 1)) { // touching down et blocked down peuvent pas marcher, j'ai cherché en ligne pour trouver onFloor()

      this.player.setVelocityY(-300);
      this.jumpCount++;
      this.jumpKeyReleased = false; // Empêche de maintenir la touche pour continuer à sauter
    }

    // Reset le jumpcount

    if (this.player.body.onFloor()) {
      this.jumpCount = 0;
    }

    // Contraintes de deplacement

    const playerWidth = 25;
    const playerHeight = 40;

    if (this.player.x < playerWidth / 2) {
      this.player.x = playerWidth / 2;
    } else if (this.player.x > this.scale.width - playerWidth / 2) {
      this.player.x = this.scale.width - playerWidth / 2;
    }

    if (this.player.y < playerHeight / 2) {
      this.player.y = playerHeight / 2;
    } else if (this.player.y > this.scale.height - playerHeight / 2) {
      this.player.y = this.scale.height - playerHeight / 2;
    }

  }
}