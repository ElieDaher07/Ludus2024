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

    /*
    this.load.spritesheet("player_throw_attack", "./assets/images/characters/player_spritesheet/throw_attack_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    }); À ajouter plus tard avec les projectiles etc... */

    /* this.load.spritesheet("player_throw_dagger", "./assets/images/characters/player_spritesheet/throw_dagger_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    }); À voir plus tard */

    this.load.spritesheet("player_slide", "./assets/images/characters/player_spritesheet/slide_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    // Animations

    this.isFalling = false;
    this.isJumping = false;
    // this.isSliding = false;

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player_idle_run_jump", {
        start: 0,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player_idle_run_jump", {
        start: 9,
        end: 16
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player_idle_run_jump", {
        start: 17,
        end: 20
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("player_idle_run_jump", {
        start: 20,
        end: 23
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNumbers("player_attacks", {
        start: 0,
        end: 6 // 26 combo pour le futur
      }),
      frameRate: 10,
      repeat: 0
    });

    /* À revoir
    
    this.anims.create({
      key: "beginslide",
      frames: this.anims.generateFrameNumbers("player_slide", {
        start: 0,
        end: 2
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "endslide",
      frames: this.anims.generateFrameNumbers("player_slide", {
        start: 3,
        end: 4
      }),
      frameRate: 10,
      repeat: 0
    });

    */

    this.anims.create({
      key: "hit_death",
      frames: this.anims.generateFrameNumbers("player_hit_death", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });


    // Tilemap
    const maCarte = this.make.tilemap({
      key: "carte_json"
    });

    // Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // HUD

    const hudContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(1);

    // Boutons

    let quitBtn = this.add.image(
      (config.width / 2),
      (config.height / 2 - 300),
      "quit"
    ).setScale(0.3).setScrollFactor(0);

    hudContainer.add(quitBtn);

    // Interactifs
    quitBtn.setInteractive();
    quitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });


    // Tileset

    const background1 = maCarte.addTilesetImage("background1", "background1_tile");
    const background2 = maCarte.addTilesetImage("background2", "background2_tile");
    const background3 = maCarte.addTilesetImage("background3", "background3_tile");
    const main_lev_build = maCarte.addTilesetImage("main_lev_build", "background_main");
    const other_lev_build = maCarte.addTilesetImage("other_lev_build", "background_other");

    // Calques background non collision, ajout en ordre de bas a haut dans l'application Tiled

    const background_sky = maCarte.createLayer("background_sky", [background1], 0, 0);
    const background_sky_front = maCarte.createLayer("background_sky_front", [background2, other_lev_build], 0, 0);
    const background_behind04 = maCarte.createLayer("background_behind04", [background3, main_lev_build], 0, 0);
    const background_behind03 = maCarte.createLayer("background_behind03", [main_lev_build], 0, 0);
    const background_behind02 = maCarte.createLayer("background_behind02", [main_lev_build], 0, 0);
    const background_behind01 = maCarte.createLayer("background_behind01", [main_lev_build, other_lev_build], 0, 0);
    const background_front = maCarte.createLayer("background_front", [main_lev_build], 0, 0);
    const background_vegetation = maCarte.createLayer("background_vegetation", [main_lev_build], 0, 0);

    // Calques avec collision

    const collisionLayer01 = maCarte.createLayer("background_main", [main_lev_build], 0, 0);
    const collisionLayer02 = maCarte.createLayer("background_bridge", [main_lev_build], 0, 0);

    // Calques
    const collisionDanger = maCarte.createLayer("background_danger", [main_lev_build], 0, 0);

    // Joueur

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump");
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2);


    // Monde (* 2 parce que le scale de la map et le player est aussi multiplié par 2)

    const mapWidth = maCarte.widthInPixels * 2;
    const mapHeight = maCarte.heightInPixels * 2;

    // World setbound

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    collisionLayer01.setCollisionByProperty({
      collision: true
    });
    collisionLayer02.setCollisionByProperty({
      collision: true
    });

    collisionDanger.setCollisionByProperty({
      collision: true
    })

    // Collision

    this.physics.add.collider(this.player, collisionLayer01);
    this.physics.add.collider(this.player, collisionLayer02);
    this.physics.add.collider(this.player, collisionDanger);

    // Rescale de la map

    background_sky.setScale(2);
    background_sky_front.setScale(2);
    background_behind04.setScale(2);
    background_behind03.setScale(2);
    background_behind02.setScale(2);
    background_behind01.setScale(2);
    background_front.setScale(2);
    background_vegetation.setScale(2);
    collisionLayer01.setScale(2);
    collisionLayer02.setScale(2);
    collisionDanger.setScale(2);

    // Camera

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(200, 150);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);




    this.input.on('pointerdown', () => {
      if (!this.isAttacking) {
        this.player.anims.play("attack", true);
        this.isAttacking = true;


        this.player.on("animationcomplete-attack", () => {
          this.isAttacking = false;
        })

      }
    });

    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "fall") {
        this.isFalling = true;
      }
      if (animation.key === "jump") {
        this.isJumping = true;
      }
    });

    // Touches


    this.keys = this.input.keyboard.addKeys({
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      slide: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });

  }

  update() {



    this.handleMovement();
    this.handleAnimations();

    // this.handleDeath(); - A ajouter plus tard quand on ajoutera les ennemies, les attaques, les hits etc..

  }

  handleMovement() {

    // Mouvement avec A et D
    if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-280);
      if (!this.player.flipX) {
        this.player.setSize(20, 40).setOffset(30, 20)
        this.player.flipX = true;
        // this.player.setPosition(this.player.body.position.x, this.player.body.position.y + 30);

      }
    } else if (this.keys.right.isDown) {
      this.player.body.setVelocityX(280);
      if (this.player.flipX) {
        this.player.setSize(20, 40).setOffset(10, 20)
        this.player.flipX = false;
        // this.player.setPosition(this.player.body.position.x + 25, this.player.body.position.y + 30); 

      }
    } else {
      this.player.body.setVelocityX(0);

    }

    // Double saut avec SPACE
    if (this.keys.jump.isUp) {
      this.jumpKeyReleased = true;
    }
    if (this.keys.jump.isDown && this.jumpKeyReleased && (this.player.body.onFloor() || this.jumpCount < 1)) {
      this.player.setVelocityY(-400);
      this.jumpCount++;
      this.jumpKeyReleased = false;
    }

    // Reset le jumpcount
    if (this.player.body.onFloor()) {
      this.jumpCount = 0;
    }

    /* Slide a voir si j'arrive dans le futur 

    if (this.keys.slide.isDown) {
      this.isSliding = true;
      if (this.player.flipX) {
        this.player.setVelocityX(-400);
      } else {
        this.player.setVelocityX(400);
      }
      //this.player.setOffset(10, 40);
      // this.player.setSize(64, 32);
    } else {

      if (this.isSliding) {
        this.isSliding = false;
        this.player.setVelocityX(0);
        // this.player.setSize(20, 41);
        // this.player.setOffset(10, 20);
      }

    }

    */
  }

  handleAnimations() {

    // Animation attaque

    if (this.isAttacking) {
      return;
    }
    /* Animation Slide a revoir
   if (this.isSliding ) {
    this.player.anims.play("slide", true);
    return;
  }
    */

    // Animation Saut

    if (!this.player.body.blocked.down) {
      if (this.player.body.velocity.y < 0 && !this.isJumping) {
        this.player.anims.play("jump", true);
        this.isFalling = false;
      } else if (!this.isFalling) {
        this.player.anims.play("fall", true);
      }
    } else {
      this.isFalling = false;
      this.isJumping = false;
      if (this.player.body.velocity.x !== 0) {
        this.player.anims.play("walk", true);
      } else {
        this.player.anims.play("idle", true);
      }
    }





  }
}