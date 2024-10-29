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

    /* this.load.spritesheet("enemy04", "./assets/images/characters/enemy/enemy04_sheet.png", {
       frameWidth: 64,
       frameHeight: 64
     });
    */

    this.load.spritesheet("enemy05", "./assets/images/characters/enemy/enemy05_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

  }

  create() {

    this.input.mouse.disableContextMenu();

    // ---------------- CRÉATION DES VARIABLES POUR LE JOUEUR ----------------

    // Sauter et tomber

    this.isFalling = false;
    this.isJumping = false;

    // Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // Attaque

    this.isAttacking = false;
    this.isThrowAttacking = false;

    // Joueur

    this.playerLife = 8;

    // Ennemis

    this.enemy02Life = 3;
    this.enemy04Life = 5;

    // ---------------- CRÉATION DES ANIMATIONS SPRITESHEET ----------------

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
        end: 6 // max: frame 26, combo pour le futur
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "throw_attack",
      frames: this.anims.generateFrameNumbers("player_throw_attack", {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "dagger_projectile",
      frames: this.anims.generateFrameNumbers("dagger_throw", {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "dagger_hit",
      frames: this.anims.generateFrameNumbers("dagger_throw", {
        start: 1,
        end: 3
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "hit_death",
      frames: this.anims.generateFrameNumbers("player_hit_death", {
        start: 0,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "bird_bg",
      frames: this.anims.generateFrameNames("bird", {
        start: 9,
        end: 11
      }),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: "enemy02_idle",
      frames: this.anims.generateFrameNames("enemy02", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: "enemy02_walk",
      frames: this.anims.generateFrameNames("enemy02", {
        start: 5,
        end: 8
      }),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: "enemy02_attack",
      frames: this.anims.generateFrameNames("enemy02", {
        start: 10,
        end: 13
      }),
      frameRate: 8,
      repeat: 0
    })

    this.anims.create({
      key: "enemy02_hit",
      frames: this.anims.generateFrameNames("enemy02", {
        start: 15,
        end: 18
      }),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: "enemy02_death",
      frames: this.anims.generateFrameNames("enemy02", {
        start: 20,
        end: 24
      }),
      frameRate: 8,
      repeat: 0
    })


    this.anims.create({
      key: "enemy04_idle",
      frames: this.anims.generateFrameNames("enemy04", {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    })

    // ---------------- CRÉATION DU TILEMAP ----------------

    const maCarte = this.make.tilemap({
      key: "carte_json"
    });

    // ---------------- HUD ----------------

    const hudContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(2);

    // Bouton(s) + ajout dans le hud

    let quitBtn = this.add.image(
      (config.width / 2),
      (config.height / 2 - 300),
      "quit"
    ).setScale(0.3).setScrollFactor(0);

    hudContainer.add(quitBtn);

    // Interactions avec le(s) bouton(s)

    quitBtn.setInteractive();
    quitBtn.on("pointerdown", () => {
      this.scene.start("accueil");
    });

    // ---------------- CRÉATION DES TILESETS ----------------

    const background1 = maCarte.addTilesetImage("background1", "background1_tile");
    const background2 = maCarte.addTilesetImage("background2", "background2_tile");
    const background3 = maCarte.addTilesetImage("background3", "background3_tile");
    const main_lev_build = maCarte.addTilesetImage("main_lev_build", "background_main");
    const other_lev_build = maCarte.addTilesetImage("other_lev_build", "background_other");

    // ---------------- CRÉATION CALQUES BACKGROUND  ----------------

    // (Non collision)

    const background_sky = maCarte.createLayer("background_sky", [background1], 0, 0);
    const background_sky_front = maCarte.createLayer("background_sky_front", [background2, other_lev_build], 0, 0);
    const background_behind04 = maCarte.createLayer("background_behind04", [background3, main_lev_build], 0, 0);
    const background_behind03 = maCarte.createLayer("background_behind03", [main_lev_build], 0, 0);
    const background_behind02 = maCarte.createLayer("background_behind02", [main_lev_build], 0, 0);
    const background_behind01 = maCarte.createLayer("background_behind01", [main_lev_build, other_lev_build], 0, 0);
    const background_front = maCarte.createLayer("background_front", [main_lev_build], 0, 0);
    const background_vegetation = maCarte.createLayer("background_vegetation", [main_lev_build], 0, 0);

    // (Avec collision)

    const collisionLayer01 = maCarte.createLayer("background_main", [main_lev_build], 0, 0).setDepth(1);
    const collisionLayer02 = maCarte.createLayer("background_bridge", [main_lev_build], 0, 0);
    const collisionDanger = maCarte.createLayer("background_danger", [main_lev_build], 0, 0); // Pour blesser le joueur

    // ---------------- CRÉATION DES ENNEMIS ----------------

    this.enemy02 = this.physics.add.sprite(800, config.height / 2 - 50, "enemy02_idle");
    this.enemy02.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy02.setScale(3).setDepth(1);
    this.enemy02.anims.play("enemy02_idle", true);

    // this.enemy04 = this.physics.add.sprite(config.width / 2 - 500, config.height / 2, "enemy04_idle");
    // this.enemy04.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    // this.enemy04.setScale(2).setDepth(1);
    // this.enemy04.anims.play("enemy04_idle", true);

    // ---------------- CRÉATION DU JOUEUR ----------------

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump");
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2).setDepth(1);

    // ---------------- CRÉATION DES BALLES ----------------

    this.dagger = this.physics.add.group({
      defaultKey: "dagger",
      maxSize: 1
    });

    // Variable to track if the dagger has hit an enemy
    let daggerHitEnemy = false;

    // Flag to track if the dagger is currently thrown
    let daggerThrown = false;

    this.input.on("pointerdown", (pointer) => {
      if (pointer.rightButtonDown()) {
        // Prevent throwing if the dagger is already thrown
        // if (this.player.alpha !== 1 || daggerThrown) return;

        const dagger = this.dagger.get(this.player.x + 25, this.player.y + 20);
        if (dagger) {
          dagger.anims.play("dagger_projectile", true);
          dagger.setScale(2).setSize(15, 5);
          dagger.body.allowGravity = false;


          daggerHitEnemy = false; // Reset hit flag
          daggerThrown = true; // Set dagger as thrown

          // Timer to destroy the dagger after 5 seconds
          this.time.delayedCall(5000, () => {
            if (!daggerHitEnemy) { // Only execute if it hasn't hit an enemy
              let explosion = this.add.sprite(dagger.x, dagger.y, "dagger_hit");
              explosion.setScale(2).setDepth(1);
              explosion.play("dagger_hit");
              this.time.delayedCall(50, () => {
                explosion.on("animationcomplete", () => {
                  explosion.destroy();
                });
                dagger.destroy();
                daggerThrown = false; // Reset thrown flag after destruction
              });
            } else {
              daggerThrown = false; // Reset if it hit an enemy
            }
          });
          if (this.player.flipX) {
            this.time.delayedCall(150, () => {
              dagger.setFlipY(true);
              dagger.setActive(true);
              dagger.setVisible(true);
              dagger.setVelocity(-300, 0);
              dagger.setAngle(180);
            });
          } else {
            this.time.delayedCall(150, () => {
              dagger.setActive(true);
              dagger.setVisible(true);
              dagger.setVelocity(300, 0);
            });
          }
        }
      }
    });

    this.physics.add.overlap(this.enemy02, this.dagger, (enemy, dagger) => {
      if (!daggerHitEnemy) { // Check if the dagger has already hit an enemy
        this.enemy02Life -= 1;
        daggerHitEnemy = true; // Set the flag to true to indicate it hit an enemy
        dagger.setActive(false);
        dagger.setVisible(false);
        dagger.destroy(); // Destroy the dagger immediately
        daggerThrown = false; // Reset thrown flag when hitting enemy

        let explosionEnemy = this.add.sprite(dagger.x, dagger.y, "dagger_hit");
        explosionEnemy.setScale(2).setDepth(1);
        explosionEnemy.play("dagger_hit");
        explosionEnemy.on("animationcomplete", () => {
          explosionEnemy.destroy();
        });

        if (this.enemy02Life <= 0) {
          this.enemy02.body.checkCollision.none = true;
          this.enemy02.body.enable = false;
          this.enemy02.play("enemy02_death");
          this.enemy02.on("animationcomplete", () => {
            this.enemy02.destroy();
          });
        }
      }
    });

    // ---------------- ITEMS ---------------- 

    this.heart01 = this.physics.add.image(650, config.height / 2 - 30, "heart01");
    this.heart01.body.allowGravity = false;

    this.heart01.setScale(2);

    this.physics.add.overlap(this.player, this.heart01, () => {
      this.heart01.setActive(false);
      this.heart01.setVisible(false);
      this.heart01.destroy();
    });

    //  ---------------- CRÉATION DU WORLD SETBOUND ---------------- 

    // Monde 
    // (multiplié par 2 parce que le scale de la map et le player est aussi multiplié par 2)

    const mapWidth = maCarte.widthInPixels * 2;
    const mapHeight = maCarte.heightInPixels * 2;

    // Setbound

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // ---------------- LA COLLISION ---------------- 

    // Rendre les collisions calques selectionés en true

    collisionLayer01.setCollisionByProperty({
      collision: true
    });
    collisionLayer02.setCollisionByProperty({
      collision: true
    });

    collisionDanger.setCollisionByProperty({
      collision: true
    })

    // Collision du joueur avec les calques

    this.physics.add.collider(this.player, collisionLayer01);
    this.physics.add.collider(this.player, collisionLayer02);
    this.physics.add.collider(this.player, collisionDanger);

    // Collision des ennemis avec les calques

    this.physics.add.collider(this.enemy02, collisionLayer01);
    this.physics.add.collider(this.enemy02, collisionLayer02);
    // this.physics.add.collider(this.enemy04, collisionLayer01);
    // this.physics.add.collider(this.enemy04, collisionLayer02);

    // Collision dagger

    this.physics.add.collider(this.dagger, collisionLayer01);
    this.physics.add.collider(this.dagger, collisionLayer02);
    this.physics.add.collider(this.dagger, collisionDanger);

    // ----------------  RESCALE DE LA MAP (* 2) ---------------- 

    // (Alternative pour ne pas faire un zoom avec la caméra et que tout marche correctement)

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

    // ---------------- CAMÉRA ---------------- 

    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(200, 150);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);

    // ---------------- Parallax initial ---------------- 

    this.lastCameraX = this.cameras.main.scrollX;
    this.lastCameraY = this.cameras.main.scrollY;

    // ---------------- TOUCHES ---------------- 

    this.keys = this.input.keyboard.addKeys({
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // ---------------- CRÉATION OISEAUX QUI VOLENT DANS LE BACKGROUND ----------------

    this.birds = [];

    for (let i = 0; i < 3; i++) {
      let bird = this.add.sprite(0, Phaser.Math.Between(config.height / 2 - 300, config.height / 2 - 200), "bird");
      bird.setDepth(0).setTint(0x808080);
      bird.anims.play("bird_bg", true);
      this.birds.push(bird);
      this.moveBird(bird);
    }
  }

  moveBird(bird) {
    // Fonction pour les oiseaux
    bird.x = -bird.width;
    bird.scale = Phaser.Math.Between(1, 2);
    bird.y = Phaser.Math.Between(config.height / 2 - 300, config.height / 2 - 200)
    this.tweens.add({
      targets: bird,
      x: config.width * 2,
      duration: Phaser.Math.Between(12000, 17000),
      delay: Phaser.Math.Between(9000, 20000),
      onComplete: () => {
        this.moveBird(bird);
      }
    });
  }

  update() {
    this.handleMovement();
    this.handleAnimations();
    // this.handleDeath(); - A ajouter plus tard
  }

  handleMovement() {
    // Mouvement avec A et D
    if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-280);
      if (!this.player.flipX) {
        this.player.setSize(20, 40).setOffset(30, 20)
        this.player.flipX = true;
        this.player.setPosition(this.player.body.position.x, this.player.body.position.y + 30);
      }
    } else if (this.keys.right.isDown) {
      this.player.body.setVelocityX(280);
      if (this.player.flipX) {
        this.player.setSize(20, 40).setOffset(10, 20)
        this.player.flipX = false;
        this.player.setPosition(this.player.body.position.x + 45, this.player.body.position.y + 30);
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
  }

  handleAnimations() {

    // Animation left click attack
    this.input.on('pointerdown', () => {
      if (this.input.activePointer.leftButtonDown() && !this.isAttacking && !this.isThrowAttacking) {
        this.player.anims.play("attack", true);
        this.isAttacking = true;
        this.player.on("animationcomplete-attack", () => {
          this.isAttacking = false;
        })
      }
    });

    if (this.isAttacking) {
      return;
    }

    // Animation throw attack right click

    this.input.on('pointerdown', () => {
      if (this.input.activePointer.rightButtonDown() && !this.isThrowAttacking && (!this.isAttacking || !daggerThrown)) {
        this.player.anims.play("throw_attack", true);
        this.isThrowAttacking = true;
        this.player.on("animationcomplete-throw_attack", () => {
          this.isThrowAttacking = false
        })
      }
    });

    if (this.isThrowAttacking) {
      return;
    }

    // // Animation Saut & Fall

    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "fall") {
        this.isFalling = true;
      }
      if (animation.key === "jump") {
        this.isJumping = true;
      }
    });

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