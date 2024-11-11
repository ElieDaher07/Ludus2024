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

  createAnimation() {

    // PLAYER //
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
      key: "attack_1",
      frames: this.anims.generateFrameNumbers("player_attacks", {
        start: 0,
        end: 6
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "attack_2",
      frames: this.anims.generateFrameNumbers("player_attacks", {
        start: 7,
        end: 11
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "attack_3",
      frames: this.anims.generateFrameNumbers("player_attacks", {
        start: 12,
        end: 18
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "attack_4",
      frames: this.anims.generateFrameNumbers("player_attacks", {
        start: 19,
        end: 26
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
      key: "player_hit",
      frames: this.anims.generateFrameNumbers("player_hit_death", {
        start: 5,
        end: 7
      }),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "player_death",
      frames: this.anims.generateFrameNumbers("player_hit_death", {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: 0
    });

    // BIRD
    this.anims.create({
      key: "bird_bg",
      frames: this.anims.generateFrameNames("bird", {
        start: 9,
        end: 11
      }),
      frameRate: 8,
      repeat: -1
    })

    // ENEMY 01 - PLANT
    this.anims.create({
      key: "enemy01_idle",
      frames: this.anims.generateFrameNames("enemy01", {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    })

    this.anims.create({
      key: "enemy01_attack_left",
      frames: this.anims.generateFrameNames("enemy01", {
        start: 8,
        end: 0 // IDK TO CHANGE
      }),
      frameRate: 8,
      repeat: 0
    })

    // ENEMY 02 - SORCERER DAGGER
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
      frameRate: 6,
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
      repeat: 0
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


    // ENEMY 03 - TANK SORCERER - DAGGER
    this.anims.create({
      key: "enemy03_idle",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 0,
        end: 4
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: "enemy03_walk",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 6,
        end: 11
      }),
      frameRate: 6,
      repeat: -1
    })

    this.anims.create({
      key: "enemy03_attack",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 12,
        end: 17
      }),
      frameRate: 6,
      repeat: 0
    })

    this.anims.create({
      key: "enemy03_hit",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 18,
        end: 22
      }),
      frameRate: 6,
      repeat: 0
    })

    this.anims.create({
      key: "enemy03_death",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 24,
        end: 29
      }),
      frameRate: 6,
      repeat: 0
    })

    // ENEMY 04 - PLAGUE DOCTOR
    this.anims.create({
      key: "enemy04_idle",
      frames: this.anims.generateFrameNames("enemy04", {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    })



    // ENEMY 05 - SCORPION
    this.anims.create({
      key: "enemy05_idle",
      frames: this.anims.generateFrameNames("enemy05", {
        start: 0,
        end: 7
      }),
      frameRate: 8,
      repeat: -1
    })

  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.input.mouse.disableContextMenu();

    // ---------------- CRÉATION DES VARIABLES GLOBALES ----------------

    // Sauter et tomber

    this.isFalling = false;
    this.isJumping = false;

    // Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // Attaque

    this.isAttacking = false;
    this.isAttackingOrThrowing = false;

    // Combo 

    this.comboCount = 0;
    this.comboDelay = 300;
    this.lastClickTime = 0;

    // Vie joueur

    this.playerLife = 8;
    this.playerIsHit = false;
    this.playerIsDead = false;


    // ---------------- CRÉATION DES ANIMATIONS SPRITESHEET ----------------

    this.createAnimation();

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

    // Ajout des élements hud du joueur

    this.avatarHud = this.add.image(config.width / 2, config.height / 2, "hud");
    this.healthHud = this.add.image(config.width / 2, config.height / 2, "health");
    this.daggerHud = this.add.image(config.width / 2, config.height / 2, "hud");


    this.healthHud.setOrigin(0, 0);
    this.healthHud.setScale(5);

    this.avatarHud.setCrop(5, 5, 55, 30)
    this.avatarHud.setOrigin(0, 0);
    this.avatarHud.setScale(5);
    this.avatarHud.setPosition(-30, -35)

    this.daggerHud.setCrop(5, 70, 25, 80);
    this.daggerHud.setOrigin(0, 0);
    this.daggerHud.setScale(5);
    this.daggerHud.setPosition(-20, -270)

    hudContainer.add(this.healthHud);
    hudContainer.add(this.avatarHud);
    hudContainer.add(this.daggerHud);

    // Interactions avec le(s) bouton(s)

    quitBtn.setInteractive();
    quitBtn.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);

      this.time.delayedCall(1000, () => {
        this.scene.start("accueil");
      });
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

    this.backgroundParallax = [background_sky, background_sky_front, background_behind04];

    // (Avec collision)

    const collisionLayer01 = maCarte.createLayer("background_main", [main_lev_build], 0, 0).setDepth(1);
    const collisionLayer02 = maCarte.createLayer("background_bridge", [main_lev_build], 0, 0);
    const collisionDanger = maCarte.createLayer("background_danger", [main_lev_build], 0, 0); // Pour blesser le joueur

    // ---------------- CRÉATION DES ENNEMIS ----------------

    // Enemy01

    this.enemy01 = this.physics.add.sprite(1000, config.height / 2 - 70, "enemy01_idle");
    this.enemy01.body.setBounce(0).setSize(20, 0).setOffset(20, 30).setCollideWorldBounds(true);
    this.enemy01.setScale(2).setDepth(1);
    this.enemy01.anims.play("enemy01_idle", true);

    this.enemy01.setVisible(false).setActive(false);
    this.enemy01.body.enable = false;

    // Enemy02

    this.enemy02 = this.physics.add.sprite(800, config.height / 2 - 50, "enemy02_idle");
    this.enemy02.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy02.setScale(3).setDepth(1);
    this.enemy02.anims.play("enemy02_idle", true);
    this.enemy02.speed = 50;
    this.enemy02.direction = 1;
    this.enemy02.initialX = this.enemy02.x;
    this.enemy02.attackRange = 250;
    this.enemy02.attackCooldown = 0;
    this.enemy02.canAttack = true;
    this.enemy02.lastAttackTime = 0;

    this.enemy03 = this.physics.add.sprite(1200, config.height / 2 - 50, "enemy03_idle");
    this.enemy03.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy03.setScale(3).setDepth(1);
    this.enemy03.anims.play("enemy03_idle", true);

    this.enemy04 = this.physics.add.sprite(config.width / 2 - 500, config.height / 2, "enemy04_idle");
    this.enemy04.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    this.enemy04.setScale(2).setDepth(1);
    this.enemy04.anims.play("enemy04_idle", true);

    this.enemy04.setVisible(false).setActive(false);
    this.enemy04.body.enable = false;

    this.enemy05 = this.physics.add.sprite(config.width / 2 - 400, config.height / 2 + 55, "enemy05_idle");
    this.enemy05.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    this.enemy05.setScale(2).setDepth(1);
    this.enemy05.anims.play("enemy05_idle", true);

    this.enemy05.setVisible(false).setActive(false);
    this.enemy05.body.enable = false;

    // VIE ENNEMIS 

    this.enemy01Life = 2;
    this.enemy02Life = 2;
    this.enemy03Life = 2;
    this.enemy04Life = 2;
    this.enemy05Life = 2;

    this.enemies = [this.enemy01, this.enemy02, this.enemy03, this.enemy04, this.enemy05];

    // ------------------------------ CRÉATION DU JOUEUR -------------------------------

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump");
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2).setDepth(1);

    this.handlePlayerLife();

    // ----------------------- PLAYER LEFT-CLICK, RIGHT-CLICK  ------------------------

    this.input.on('pointerdown', (pointer) => {
      if (this.isAttackingOrThrowing) {
        return;
      }

      // Left-click
      if (this.input.activePointer.leftButtonDown()) {
        if (this.playerIsDead || this.player.alpha != 1) return;
        this.isAttacking = true;
        this.isAttackingOrThrowing = true;
        this.player.anims.play("attack_1", true);

        // Hitbox delay
        this.time.delayedCall(150, () => {
          this.createHitbox();
        });

        this.player.on("animationcomplete-attack_1", () => {
          this.isAttacking = false;
          this.isAttackingOrThrowing = false;
          if (this.hitbox) {
            this.hitbox.destroy();
            this.hitbox = null;
          }
        });
      }

      // Right-click
      else if (this.input.activePointer.rightButtonDown() && !this.isAttacking) {
        if (this.playerIsDead || this.player.alpha != 1) return;
        this.player.anims.play("throw_attack", true);
        this.isAttackingOrThrowing = true;
        this.player.on("animationcomplete-throw_attack", () => {
          this.isAttackingOrThrowing = false;
        });
      }
    });


    // ----------------------- PLAYER ON ANIMATION COMPLETE  ------------------------

    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "fall") {
        this.isFalling = true;
      }
      if (animation.key === "jump") {
        this.isJumping = true;
      }
      if (animation.key === "player_hit") {
        this.playerIsHit = false;
      }
      if (animation.key === "player_death") {
        this.player.anims.stop();
        this.player.setFrame(4);
      }
    });

    // ---------------- CRÉATION DES BALLES "Dagger" ET SON OVERLAP AVEC LES ENNEMIS ----------------

    this.handleDagger()

    // ---------------- ITEMS ---------------- 

    this.heart01 = this.physics.add.image(650, config.height / 2 - 30, "heart01");
    this.heart01.body.allowGravity = false;

    this.heart01.setScale(2);

    //  ---------------- CRÉATION DU WORLD SETBOUND ---------------- 

    // LE MONDE
    // (multiplié par 2 parce que le scale de les layers de la carte et le player sont aussi multipliés par 2)

    const mapWidth = maCarte.widthInPixels * 2;
    const mapHeight = maCarte.heightInPixels * 2;

    // SETBOUND

    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

    // ---------------- LA COLLISION ---------------- 

    // RENDRE LES COLLISIONS CALQUES SELECTIONÉS EN "TRUE"

    collisionLayer01.setCollisionByProperty({
      collision: true
    });
    collisionLayer02.setCollisionByProperty({
      collision: true
    });

    collisionDanger.setCollisionByProperty({
      collision: true
    })

    // COLLISION DU JOUEUR AVEC LES CALQUES

    this.physics.add.collider(this.player, collisionLayer01);
    this.physics.add.collider(this.player, collisionLayer02);
    this.physics.add.collider(this.player, collisionDanger, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit();
      this.handleHud();
      this.handleHealthPickup();
      console.log(this.playerLife);
    }, (player, tile) => {
      return tile && tile.properties && tile.properties.collision === true;
    });

    // COLLISION DES ENNEMIS AVEC LES CALQUES

    this.physics.add.collider(this.enemies, collisionLayer01);
    this.physics.add.collider(this.enemies, collisionLayer02);

    // COLLISION DAGGER AVEC LES CALQUES

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

  createHitbox() {

    if (this.hitbox) {
      this.hitbox.destroy();
    }

    this.hitbox = this.add.zone(
      this.player.x + (this.player.flipX ? -23 : 13),
      this.player.y + 20, 35, 50
    );
    this.physics.add.existing(this.hitbox);
    this.hitbox.body.setAllowGravity(false);
    this.hitbox.body.setImmovable(true);

    this.enemies.forEach((enemy) => {
      this.physics.add.overlap(enemy, this.hitbox, () => {
        this.hitbox.destroy();
        this.hitbox = null;

        if (enemy) {
          switch (enemy) {
            case this.enemy01:
              if (this.enemy01Life > 0) {
                this.enemy01Life--;
              }
              break;
            case this.enemy02:
              if (this.enemy02Life > 0) {
                this.enemy02Life--;
                this.enemy02.play("enemy02_hit", true);
              }
              break;
            case this.enemy03:
              if (this.enemy03Life > 0) {
                this.enemy03Life--;
                this.enemy03.play("enemy03_hit", true);
              }
              break;
            case this.enemy04:
              if (this.enemy04Life > 0) {
                this.enemy04Life--;
              }
              break;
            case this.enemy05:
              if (this.enemy05Life > 0) {
                this.enemy05Life--;
              }
              break;
          }
          this.handleEnemyLife();
        }
      });
    });
  }

  update() {
    if (!this.playerIsDead) {
      this.handleParallax();
      this.handlePlayerMovement();
      this.handlePlayerAnimations();
      this.handleEnemy02Behavior();
    }
  }

  handleEnemy02Behavior() {
    if (this.enemy02Life <= 0 || !this.enemy02) return;

    const distanceToPlayer = Phaser.Math.Distance.Between(this.enemy02.x, this.enemy02.y, this.player.x, this.player.y);
    const patrolLeftLimit = this.enemy02.initialX - 100;
    const patrolRightLimit = this.enemy02.initialX + 100;
    const chaseSpeedMultiplier = 2;

    // Initialize patrol timer if it doesn't exist
    if (!this.enemy02.patrolTimer) {
      this.enemy02.patrolTimer = 0;
      this.enemy02.isPatrolling = true;
    }

    // Check if player is in attack range
    if (distanceToPlayer < this.enemy02.attackRange) {
      if (distanceToPlayer > 45) {
        // Chase logic
        if (this.player.x < this.enemy02.x) {
          this.enemy02.setVelocityX(-this.enemy02.speed * chaseSpeedMultiplier);
          this.enemy02.direction = -1;
        } else {
          this.enemy02.setVelocityX(this.enemy02.speed * chaseSpeedMultiplier);
          this.enemy02.direction = 1;
        }
        this.enemy02.anims.play("enemy02_walk", true);
      } else {
        // Attack logic
        this.enemy02.setVelocityX(0);

        if (this.enemy02.canAttack && this.enemy02.attackCooldown <= 0) {
          this.enemy02.anims.play("enemy02_attack", true);
          this.createEnemyHitbox(this.enemy02);
          this.enemy02.attackCooldown = 1500;
          this.enemy02.canAttack = false;
          this.time.delayedCall(1500, () => {
            if (this.enemy02 && this.enemy02.active) {
              this.enemy02.canAttack = true;
              this.enemy02.attackCooldown = 0;
            }
          });
        } else {
          if (!this.enemy02.anims.isPlaying) {
            this.enemy02.anims.play("enemy02_idle", true);
          }
        }
      }
    } else {
      // Patrol logic
      if (this.enemy02.body.onFloor()) {
        // Update patrol/idle state
        this.enemy02.patrolTimer -= this.time.deltaMS;

        if (this.enemy02.patrolTimer <= 0) {
          // Switch state
          this.enemy02.isPatrolling = !this.enemy02.isPatrolling;
          // Set new timer duration
          this.enemy02.patrolTimer = this.enemy02.isPatrolling ?
            Phaser.Math.Between(2000, 4000) : // Patrol for 2-4 seconds
            Phaser.Math.Between(1000, 2000); // Idle for 1-2 seconds
        }

        if (this.enemy02.isPatrolling) {
          // Normal patrol movement
          if (this.enemy02.x <= patrolLeftLimit) {
            this.enemy02.direction = 1;
            this.enemy02.setVelocityX(this.enemy02.speed);
          } else if (this.enemy02.x >= patrolRightLimit) {
            this.enemy02.direction = -1;
            this.enemy02.setVelocityX(-this.enemy02.speed);
          } else {
            this.enemy02.setVelocityX(this.enemy02.speed * this.enemy02.direction);
          }
          this.enemy02.anims.play("enemy02_walk", true);
        } else {
          // Idle state
          this.enemy02.setVelocityX(0);
          this.enemy02.anims.play("enemy02_idle", true);
        }
      } else {
        this.enemy02.setVelocityX(0);
        this.enemy02.anims.play("enemy02_idle", true);
      }
    }

    this.enemy02.flipX = this.enemy02.direction === 1;
  }

  createEnemyHitbox(enemy) {
    const hitbox = this.add.zone(
      enemy.x + (enemy.flipX ? 25 : -25), // Adjust hitbox position based on flipX
      enemy.y,
      50, // Width of the hitbox
      50 // Height of the hitbox
    );
    this.physics.add.existing(hitbox);
    hitbox.body.setAllowGravity(false);
    hitbox.body.setImmovable(true);

    // Check for overlap with the player
    this.physics.add.overlap(hitbox, this.player, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit(); // Handle player getting hit
      this.handleHud();
      this.handleHealthPickup();
      console.log(this.playerLife);
      hitbox.destroy(); // Destroy the hitbox after hitting
    });

    // Destroy hitbox after a delay
    this.time.delayedCall(500, () => {
      hitbox.destroy();
    });
  }

  handleEnemyLife() {

    if (this.enemy01Life <= 0 && this.enemy01) {
      this.enemy01.body.enable = false;
      this.enemy01.anims.play("enemy01_death");
      this.enemy01.on("animationcomplete", () => {
        this.enemy01.destroy();
        this.enemy01 = null;
      });
    }

    if (this.enemy02Life <= 0 && this.enemy02) {
      this.enemy02.body.enable = false;
      this.enemy02.anims.play("enemy02_death");
      this.enemy02.on("animationcomplete", () => {
        this.enemy02.destroy();
        this.enemy02 = null;
      });
    }

    if (this.enemy03Life <= 0 && this.enemy03) {
      this.enemy03.body.enable = false;
      this.enemy03.anims.play("enemy03_death");
      this.enemy03.on("animationcomplete", () => {
        this.enemy03.destroy();
        this.enemy03 = null;
      });
    }

    if (this.enemy04Life <= 0 && this.enemy04) {
      this.enemy04.body.enable = false;
      this.enemy04.anims.play("enemy04_death");
      this.enemy04.on("animationcomplete", () => {
        this.enemy04.destroy();
        this.enemy04 = null;
      });
    }

    if (this.enemy05Life <= 0 && this.enemy05) {
      this.enemy05.body.enable = false;
      this.enemy05.anims.play("enemy05_death");
      this.enemy05.on("animationcomplete", () => {
        this.enemy05.destroy();
        this.enemy05 = null;
      });
    }

  }

  handlePlayerIsHit() {
    if (this.player.alpha === 1) {
      this.playerLife--;
      this.playerIsHit = true;
      let flashTween = this.tweens.add({
        targets: this.player,
        alpha: {
          from: 0.33,
          to: 0.66
        },
        ease: "Linear",
        duration: 100,
        repeat: 10,
        yoyo: true,
        onComplete: () => {
          if (!this.playerIsDead) {
            this.player.setAlpha(1);
          }
        }
      });
    }
  }

  handlePlayerLife() {
    this.playerLife = 8;
    this.healthHud.setCrop(270, 0, 40, 10).setPosition(-1270, 70);
    this.physics.add.overlap(this.player, this.enemies, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit();
      console.log(this.playerLife)
      this.handleHealthPickup();
      this.handleHud();
    });
  }

  handleHealthPickup() {
    this.physics.add.overlap(this.player, this.heart01, () => {
      this.playerLife++;
      this.heart01.setActive(false);
      this.heart01.setVisible(false);
      this.heart01.destroy();
      this.handleHud();
    });
  }

  handleHud() {
    if (this.playerLife === 8) {
      this.healthHud.setCrop(270, 0, 40, 10).setPosition(-1270, 70);
    } else if (this.playerLife === 7) {
      this.healthHud.setCrop(238, 0, 35, 10).setPosition(-1100, 70);
    } else if (this.playerLife === 6) {
      this.healthHud.setCrop(205, 0, 32, 10).setPosition(-930, 70);
    } else if (this.playerLife === 5) {
      this.healthHud.setCrop(170, 0, 32, 10).setPosition(-760, 70);
    } else if (this.playerLife === 4) {
      this.healthHud.setCrop(134, 0, 35, 10).setPosition(-590, 70); // -170
    } else if (this.playerLife === 3) {
      this.healthHud.setCrop(96, 0, 40, 10).setPosition(-420, 70);
    } else if (this.playerLife === 2) {
      this.healthHud.setCrop(58, 0, 42, 10).setPosition(-250, 70);
    } else if (this.playerLife === 1) {
      this.healthHud.setCrop(20, 0, 48, 10).setPosition(-80, 70);
    } else if (this.playerLife === 0 && !this.playerIsDead) {
      this.healthHud.setCrop(0, 0, 32, 10).setPosition(90, 70);
      this.handlePlayerDeath();
    }
  }

  handleDagger() {

    let daggerHitEnemy = false;
    let daggerThrown = false;

    this.dagger = this.physics.add.group({
      defaultKey: "dagger",
      maxSize: 1
    });

    this.input.on("pointerdown", (pointer) => {

      if (this.playerIsDead || this.player.alpha !== 1 || daggerThrown || this.isAttacking) {
        return;
      }

      if (pointer.rightButtonDown()) {
        const dagger = this.dagger.get(this.player.x + 30, this.player.y + 20);
        if (dagger) {
          dagger.anims.play("dagger_projectile", true);
          dagger.setScale(2).setSize(15, 5);
          dagger.body.allowGravity = false;
          daggerHitEnemy = false;
          daggerThrown = true;

          this.time.delayedCall(5000, () => {
            if (!daggerHitEnemy) {
              let explosion = this.add.sprite(dagger.x, dagger.y, "dagger_hit");
              explosion.setScale(2).setDepth(1);
              explosion.play("dagger_hit");
              this.time.delayedCall(50, () => {
                explosion.on("animationcomplete", () => {
                  explosion.destroy();
                });
                dagger.destroy();
                daggerThrown = false;
              });
            } else {
              daggerThrown = false;
            }
          });

          if (this.player.flipX) {
            this.time.delayedCall(50, () => {
              if (!dagger || !dagger.scene) return;
              dagger.setVelocity(-400, 0).setFlipY(true).setActive(true).setVisible(true).setAngle(180);
            });
          } else {
            this.time.delayedCall(50, () => {
              if (!dagger || !dagger.scene) return;
              dagger.setVelocity(400, 0).setActive(true).setVisible(true);
            });
          }
        }
      }
    });

    this.enemies.forEach((enemy, index) => {
      this.physics.add.overlap(enemy, this.dagger, (enemy, dagger) => {
        if (enemy) {
          switch (enemy) {
            case this.enemy01:
              if (this.enemy01Life > 0) this.enemy01Life--;
              break;
            case this.enemy02:
              if (this.enemy02Life > 0) {
                this.enemy02Life--;
              }
              break;
            case this.enemy03:
              if (this.enemy03Life > 0) this.enemy03Life--;
              break;
            case this.enemy04:
              if (this.enemy04Life > 0) this.enemy04Life--;
              break;
            case this.enemy05:
              if (this.enemy05Life > 0) this.enemy05Life--;
              break;
          }
          daggerHitEnemy = true;
          dagger.setActive(false);
          dagger.setVisible(false);
          dagger.destroy();
          daggerThrown = true;

          let explosionEnemy = this.add.sprite(dagger.x, dagger.y, "dagger_hit");
          explosionEnemy.setScale(2).setDepth(1);
          explosionEnemy.anims.play("dagger_hit");
          explosionEnemy.on("animationcomplete", () => {
            explosionEnemy.destroy();
          });

          this.handleEnemyLife();
        }
      });
    });
  }

  moveBird(bird) {
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

  handleParallax() {
    const cameraX = this.cameras.main.scrollX;
    this.backgroundParallax.forEach((layer, index) => {
      let speed;
      switch (index) {
        case 0: // background_sky
          speed = 0.05;
          break;
        case 1: // background_sky_front
          speed = 0.1;
          break;
        case 2: // background_behind04
          speed = -0.01;
          break;
      }
      layer.setX(cameraX * speed);
    });
  }

  handlePlayerMovement() {
    // Mouvement avec A et D
    if (this.playerIsDead) return;

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

  handlePlayerAnimations() {
    // const currentTime = this.time.now;

    if (this.isAttackingOrThrowing) return;

    // Animation hit, saut, walk, idle, death

    if (this.playerIsHit) {
      this.player.anims.play("player_hit", true);
    } else if (!this.player.body.blocked.down) {
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

  handlePlayerDeath() {
    this.playerIsDead = true;
    this.player.body.enable = false;
    this.player.anims.play("player_death", true);
    this.player.once("animationcomplete-player_death", () => {
      this.player.anims.stop();
      this.player.setFrame(4);
      this.tweens.add({
        targets: this,
        duration: 1000,
        ease: 'Cubic.Out',
        onComplete: () => {
          this.time.delayedCall(800, () => {
            this.cameras.main.fade(1500, 0, 0, 0, false, (camera, progress) => {
              if (progress === 1) {
                this.scene.start("gameover");
              }
            });
          });
        }
      });
    });

    this.enemies.forEach(enemy => {
      enemy.body.enable = false;
    });

    this.player.setAlpha(0.7);
    this.tweens.killTweensOf(this.player);
  }

  performComboAttack(comboCount) {
    let attackKey;

    if (comboCount > 4) {
      this.comboCount = 1;
      attackKey = "attack_1";
    } else {
      attackKey = `attack_${comboCount}`;
    }

    this.player.anims.play(attackKey, true);
    this.isAttackingOrThrowing = true;

    this.player.on("animationcomplete", () => {
      this.isAttackingOrThrowing = false;
      if (this.comboCount < 4) {
        this.resetCombo();
      }
    });
  }

  resetCombo() {
    if (this.comboResetTimer) {
      this.time.removeEvent(this.comboResetTimer);
    }

    this.comboResetTimer = this.time.delayedCall(3000, () => {
      this.comboCount = 0;
    });
  }

}