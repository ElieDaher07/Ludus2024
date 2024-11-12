class Jeu extends Phaser.Scene {

  constructor() {
    super({
      key: "jeu",
    });
  }

  preload() {

    // les preloads sont tous dans accueil.js pour le moment

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
      frameRate: 14,
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

    this.playerLife = 6;
    this.maxPlayerLife = 8;
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

    const spawnPoints = [{
        x: 2032,
        y: 744
      },
      {
        x: 1907,
        y: 296
      },
      {
        x: 698,
        y: 744
      },
      {
        x: 351,
        y: 744
      },
      {
        x: 1190,
        y: 936
      },
      {
        x: 231,
        y: 1192
      },
      {
        x: 250,
        y: 1352
      },
      {
        x: 1387,
        y: 1352
      },
      {
        x: 2337,
        y: 1160
      },
      {
        x: 712,
        y: 29
      }
    ];

    this.createEnemy01();

    this.createEnemy02();
    this.createEnemy02_b();

    this.createEnemy03();

    this.createEnemy04();

    this.createEnemy05();

    // VIE ENNEMIS 

    this.createEnemyLife();

    // ------------------------------ CRÉATION DU JOUEUR -------------------------------

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump");
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2).setDepth(1);

    this.createPlayerLife();

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
          this.createPlayerHitbox();
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

    this.createDagger();

    // ---------------- ITEMS ---------------- 

    this.createHearts();

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
      pause: Phaser.Input.Keyboard.KeyCodes.ESC
    });

    // ---------------- CRÉATION OISEAUX QUI VOLENT DANS LE BACKGROUND ----------------

    this.createBirds();

  }

  createHearts() {
    this.heart01 = this.physics.add.image(250, config.height / 2 + 100, "heart01");
    this.heart01.body.allowGravity = false;

    this.heart02 = this.physics.add.image(2000, 774, "heart01");
    this.heart02.body.allowGravity = false;

    this.heart03 = this.physics.add.image(210, 1382, "heart01");
    this.heart03.body.allowGravity = false;

    this.heart04 = this.physics.add.image(320, 774, "heart01");
    this.heart04.body.allowGravity = false;

    this.heart05 = this.physics.add.image(1907, 326, "heart01");
    this.heart05.body.allowGravity = false;

    this.heart06 = this.physics.add.image(1387, 1382, "heart01");
    this.heart06.body.allowGravity = false;

    this.createHoverAnimation(this.heart01);
    this.createHoverAnimation(this.heart02);
    this.createHoverAnimation(this.heart03);
    this.createHoverAnimation(this.heart04);
    this.createHoverAnimation(this.heart05);
    this.createHoverAnimation(this.heart06);

    this.heart01.setScale(2);
    this.heart02.setScale(2)
    this.heart03.setScale(2)
    this.heart04.setScale(2)
    this.heart05.setScale(2)
    this.heart06.setScale(2)

    this.hearts = [this.heart01, this.heart02, this.heart03, this.heart04, this.heart05, this.heart06];
    this.handleHealthPickup(this.hearts);

  }

  createPlayerLife() {
    this.handleHud();
    this.physics.add.overlap(this.player, this.enemies, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit();
      console.log(this.playerLife);
      this.handleHealthPickup();
      this.handleHud();
    });
  }

  createHoverAnimation(item) {
    this.tweens.add({
      targets: item,
      y: item.y - 10,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });
  }

  createBirds() {
    this.birds = [];

    for (let i = 0; i < 3; i++) {
      let bird = this.add.sprite(0, Phaser.Math.Between(config.height / 2 - 300, config.height / 2 - 200), "bird");
      bird.setDepth(0).setTint(0x808080);
      bird.anims.play("bird_bg", true);
      this.birds.push(bird);
      this.moveBird(bird);
    }
  }

  createEnemy01() {
    this.enemy01 = this.physics.add.sprite(1000, config.height / 2 - 70, "enemy01_idle");
    this.enemy01.body.setBounce(0).setSize(20, 0).setOffset(20, 30).setCollideWorldBounds(true);
    this.enemy01.setScale(2).setDepth(1);
    this.enemy01.anims.play("enemy01_idle", true);

    this.enemy01.setVisible(false).setActive(false);
    this.enemy01.body.enable = false;
  }

  createEnemy02() {
    this.enemy02 = this.physics.add.sprite(800, config.height / 2 - 50, "enemy02_idle");
    this.enemy02.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy02.setScale(3).setDepth(1);
    this.enemy02isHit = false;
    this.enemy02.hitCooldown = null

    this.enemy02.speed = 50;
    this.enemy02.direction = 1;
    this.enemy02.initialX = this.enemy02.x;

    this.enemy02.attackRange = 250;
    this.enemy02.attackCooldown = 0;
    this.enemy02.canAttack = true;
    this.enemy02.patrolTimer = 0;
    this.enemy02.isPatrolling = true;
    this.enemy02.patrolLeftLimit = this.enemy02.initialX - 100;
    this.enemy02.patrolRightLimit = this.enemy02.initialX + 100;
    this.enemy02.anims.play("enemy02_idle", true);

  }

  createEnemy02_b() {
    this.enemy02_b = this.physics.add.sprite(2032, 744, "enemy02_idle");
    this.enemy02_b.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy02_b.setScale(3).setDepth(1);
    this.enemy02_bisHit = false;
    this.enemy02_b.hitCooldown = null

    this.enemy02_b.speed = 50;
    this.enemy02_b.direction = 1;
    this.enemy02_b.initialX = this.enemy02_b.x;

    this.enemy02_b.attackRange = 250;
    this.enemy02_b.attackCooldown = 0;
    this.enemy02_b.canAttack = true;
    this.enemy02_b.patrolTimer = 0;
    this.enemy02_b.isPatrolling = true;
    this.enemy02_b.patrolLeftLimit = this.enemy02_b.initialX - 100;
    this.enemy02_b.patrolRightLimit = this.enemy02_b.initialX + 100;
    this.enemy02_b.anims.play("enemy02_idle", true);
  }

  createEnemy03() {
    this.enemy03 = this.physics.add.sprite(1200, config.height / 2 - 50, "enemy03_idle");
    this.enemy03.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy03.setScale(3).setDepth(1);
    this.enemy03isHit = false;
    this.enemy03.hitCooldown = null

    this.enemy03.speed = 50;
    this.enemy03.direction = 1;
    this.enemy03.initialX = this.enemy03.x;

    this.enemy03.attackRange = 250;
    this.enemy03.attackCooldown = 0;
    this.enemy03.canAttack = true;
    this.enemy03.patrolTimer = 0;
    this.enemy03.isPatrolling = true;
    this.enemy03.patrolLeftLimit = this.enemy03.initialX - 100;
    this.enemy03.patrolRightLimit = this.enemy03.initialX + 100;
    this.enemy03.anims.play("enemy03_idle", true);
  }

  createEnemy04() {

    this.enemy04 = this.physics.add.sprite(config.width / 2 - 500, config.height / 2, "enemy04_idle");
    this.enemy04.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    this.enemy04.setScale(2).setDepth(1);
    this.enemy04.anims.play("enemy04_idle", true);

    this.enemy04.setVisible(false).setActive(false);
    this.enemy04.body.enable = false;

  }

  createEnemy05() {
    this.enemy05 = this.physics.add.sprite(config.width / 2 - 400, config.height / 2 + 55, "enemy05_idle");
    this.enemy05.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    this.enemy05.setScale(2).setDepth(1);
    this.enemy05.anims.play("enemy05_idle", true);
    this.enemy05.setVisible(false).setActive(false);
    this.enemy05.body.enable = false;
  }

  createEnemyLife() {
    this.enemy01Life = 2;
    this.enemy02Life = 3;
    this.enemy02_bLife = 3;
    this.enemy03Life = 5;
    this.enemy04Life = 2;
    this.enemy05Life = 2;

    this.enemies = [this.enemy01, this.enemy02, this.enemy02_b, this.enemy03, this.enemy04, this.enemy05];
  }

  createPlayerHitbox() {

    if (this.hitbox) {
      this.hitbox.destroy();
    }

    this.hitbox = this.add.zone(
      this.player.x + (this.player.flipX ? -26 : 18),
      this.player.y + 20, 42, 50
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
                this.enemy02isHit = true;
                this.enemy02.play("enemy02_hit", true);
              }
              break;
            case this.enemy02_b:
              if (this.enemy02_bLife > 0) {
                this.enemy02_bLife--;
                this.enemy02_bisHit = true;
                this.enemy02_b.play("enemy02_hit", true);
              }
              break;
            case this.enemy03:
              if (this.enemy03Life > 0) {
                this.enemy03Life--;
                this.enemy03isHit = true;
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

  createEnemyHitbox(enemy) {
    this.time.delayedCall(300, () => {
      const hitbox = this.add.zone(
        enemy.x + (enemy.flipX ? 25 : -25),
        enemy.y,
        50,
        50
      );
      this.physics.add.existing(hitbox);
      hitbox.body.setAllowGravity(false);
      hitbox.body.setImmovable(true);

      this.physics.add.overlap(hitbox, this.player, () => {
        if (this.player.alpha != 1 || this.playerIsDead) return;
        this.handlePlayerIsHit();
        this.handleHud();
        this.handleHealthPickup();
        console.log(this.playerLife);
        hitbox.destroy();
      });

      this.time.delayedCall(500, () => {
        hitbox.destroy();
      });
    });
  }

  update() {
    if (!this.playerIsDead) {
      this.handleParallax();
      this.handlePlayerMovement();
      this.handlePlayerAnimations();
      this.handleEnemy02Behavior();
      this.handleEnemy02_bBehavior();
      this.handleEnemy03Behavior();
    }
    //console.log(`Player Position - x: ${this.player.x}, y: ${this.player.y}`);
    console.log(`Player Life Initialized: ${this.playerLife}, Max Life: ${this.maxPlayerLife}`)
  }

  handleEnemy02Behavior() {
    if (this.enemy02Life <= 0 || !this.enemy02) return;

    // Add max chase distance
    const maxChaseDistance = 500; // Adjust as needed

    if (this.enemy02isHit) {
      this.enemy02.setVelocityX(0);
      if (!this.enemy02.hitCooldown) {
        this.enemy02.hitCooldown = 500;
        this.time.delayedCall(this.enemy02.hitCooldown, () => {
          this.enemy02isHit = false;
          this.enemy02.hitCooldown = null;
        });
      }
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy02.x,
      this.enemy02.y,
      this.player.x,
      this.player.y
    );

    // Calculate distance from original spot
    const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
      this.enemy02.x,
      this.enemy02.y,
      this.enemy02.initialX,
      this.enemy02.y
    );

    const patrolLeftLimit = this.enemy02.initialX - 100;
    const patrolRightLimit = this.enemy02.initialX + 100;
    const chaseSpeedMultiplier = 2;

    // If chased too far from original spot, return to patrol
    if (distanceFromOriginalSpot > maxChaseDistance) {
      // Reset patrol to current location
      this.enemy02.initialX = this.enemy02.x;
      this.enemy02.patrolLeftLimit = this.enemy02.initialX - 100;
      this.enemy02.patrolRightLimit = this.enemy02.initialX + 100;

      // Force return to patrol behavior
      this.enemy02.isPatrolling = true;
      this.enemy02.direction = (this.enemy02.x > this.enemy02.initialX) ? -1 : 1;
      this.enemy02.setVelocityX(this.enemy02.speed * this.enemy02.direction);
      return;
    }

    if (this.enemy02.isAttacking) {
      // Ensure attack animation completes fully
      this.enemy02.setVelocityX(0);
      return;
    }

    if (this.enemy02.postAttackCooldown) {
      // If in post-attack cooldown, do nothing
      return;
    }

    if (distanceToPlayer < this.enemy02.attackRange) {
      const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.enemy02.x) ||
        (!this.player.flipX && this.player.x < this.enemy02.x);

      const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

      if (distanceToPlayer > minimumAttackDistance) {
        if (this.player.x < this.enemy02.x) {
          this.enemy02.setVelocityX(-this.enemy02.speed * chaseSpeedMultiplier);
          this.enemy02.direction = -1;
        } else {
          this.enemy02.setVelocityX(this.enemy02.speed * chaseSpeedMultiplier);
          this.enemy02.direction = 1;
        }
        this.enemy02.anims.play("enemy02_walk", true);
      } else {
        this.enemy02.setVelocityX(0);
        if (this.enemy02.canAttack && this.enemy02.attackCooldown <= 0) {
          this.enemy02.isAttacking = true;
          this.enemy02.anims.play("enemy02_attack", true);
          this.createEnemyHitbox(this.enemy02);
          this.enemy02.attackCooldown = 1500;
          this.enemy02.canAttack = false;


          this.enemy02.on('animationcomplete-enemy02_attack', () => {
            this.enemy02.isAttacking = false;
            this.enemy02.canAttack = true;
            this.enemy02.anims.play("enemy02_idle", true);

            this.enemy02.postAttackCooldown = true;
            this.time.delayedCall(600, () => { // son cooldown pour la prochaine action
              this.enemy02.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy02.x,
                this.enemy02.y,
                this.player.x,
                this.player.y
              );

              if (currentDistanceToPlayer <= this.enemy02.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                this.enemy02.anims.play("enemy02_attack", true);
              } else if (currentDistanceToPlayer < this.enemy02.attackRange) {
                this.enemy02.anims.play("enemy02_walk", true);
              } else {
                this.enemy02.anims.play("enemy02_walk", true);
              }
              this.enemy02.attackCooldown = 0;
            });
          });
        } else {
          if (!this.enemy02.anims.isPlaying) {
            this.enemy02.anims.play("enemy02_idle", true);
          }
        }
      }
    } else {
      if (this.enemy02.body.onFloor()) {
        if (this.enemy02.isPatrolling) {
          if (this.enemy02.x <= patrolLeftLimit) {
            this.enemy02.direction = 1;
            this.enemy02.setVelocityX(this.enemy02.speed);
          } else if (this.enemy02.x >= patrolRightLimit) {
            this.enemy02.direction = -1;
            this.enemy02.setVelocityX(-this.enemy02.speed);
          } else {
            this.enemy02.setVelocityX(this.enemy02.speed * this.enemy02.direction);
          }
          if (!this.enemy02.anims.isPlaying || this.enemy02.anims.currentAnim.key !== "enemy 02_walk") {
            this.enemy02.anims.play("enemy02_walk", true);
          }
        } else {
          this.enemy02.setVelocityX(0);
          if (!this.enemy02.anims.isPlaying || this.enemy02.anims.currentAnim.key !== "enemy02_idle") {
            this.enemy02.anims.play("enemy02_idle", true);
          }
        }
      } else {
        this.enemy02.setVelocityX(0);
        if (!this.enemy02.anims.isPlaying || this.enemy02.anims.currentAnim.key !== "enemy02_idle") {
          this.enemy02.anims.play("enemy02_idle", true);
        }
      }
    }
    this.enemy02.flipX = this.enemy02.direction === 1;
  }

  handleEnemy02_bBehavior() {
    if (this.enemy02_bLife <= 0 || !this.enemy02_b) return;

    if (this.enemy02_bisHit) {
      this.enemy02_b.setVelocityX(0);
      if (!this.enemy02_b.hitCooldown) {
        this.enemy02_b.hitCooldown = 1000;
        this.time.delayedCall(this.enemy02_b.hitCooldown, () => {
          this.enemy02_bisHit = false;
          this.enemy02_b.hitCooldown = null;
        });
      }
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy02_b.x,
      this.enemy02_b.y,
      this.player.x,
      this.player.y
    );
    const patrolLeftLimit = this.enemy02_b.initialX - 100;
    const patrolRightLimit = this.enemy02_b.initialX + 100;
    const chaseSpeedMultiplier = 2;

    if (distanceToPlayer < this.enemy02_b.attackRange) {
      const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.enemy02_b.x) ||
        (!this.player.flipX && this.player.x < this.enemy02_b.x);

      const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

      if (distanceToPlayer > minimumAttackDistance) {
        if (this.player.x < this.enemy02_b.x) {
          this.enemy02_b.setVelocityX(-this.enemy02_b.speed * chaseSpeedMultiplier);
          this.enemy02_b.direction = -1;
        } else {
          this.enemy02_b.setVelocityX(this.enemy02_b.speed * chaseSpeedMultiplier);
          this.enemy02_b.direction = 1;
        }
        this.enemy02_b.anims.play("enemy02_walk", true);
      } else {
        this.enemy02_b.setVelocityX(0);
        if (this.enemy02_b.canAttack && this.enemy02_b.attackCooldown <= 0) {
          this.enemy02_b.anims.play("enemy02_attack", true);
          this.createEnemyHitbox(this.enemy02_b);
          this.enemy02_b.attackCooldown = 1500;
          this.enemy02_b.canAttack = false;
          this.time.delayedCall(1500, () => {
            if (this.enemy02_b && this.enemy02_b.active) {
              this.enemy02_b.canAttack = true;
              this.enemy02_b.attackCooldown = 0;
            }
          });
        } else {
          if (!this.enemy02_b.anims.isPlaying) {
            this.enemy02_b.anims.play("enemy02_idle", true);
          }
        }
      }
    } else {
      if (this.enemy02_b.body.onFloor()) {
        if (this.enemy02_b.isPatrolling) {
          if (this.enemy02_b.x <= patrolLeftLimit) {
            this.enemy02_b.direction = 1;
            this.enemy02_b.setVelocityX(this.enemy02_b.speed);
          } else if (this.enemy02_b.x >= patrolRightLimit) {
            this.enemy02_b.direction = -1;
            this.enemy02_b.setVelocityX(-this.enemy02_b.speed);
          } else {
            this.enemy02_b.setVelocityX(this.enemy02_b.speed * this.enemy02_b.direction);
          }
          if (!this.enemy02_b.anims.isPlaying || this.enemy02_b.anims.currentAnim.key !== "enemy02_walk") {
            this.enemy02_b.anims.play("enemy02_walk", true);
          }
        } else {
          this.enemy02_b.setVelocityX(0);
          if (!this.enemy02_b.anims.isPlaying || this.enemy02_b.anims.currentAnim.key !== "enemy02_idle") {
            this.enemy02_b.anims.play("enemy02_idle", true);
          }
        }
      } else {
        this.enemy02_b.setVelocityX(0);
        if (!this.enemy02_b.anims.isPlaying || this.enemy02_b.anims.currentAnim.key !== "enemy02_idle") {
          this.enemy02_b.anims.play("enemy02_idle", true);
        }
      }
    }
    this.enemy02_b.flipX = this.enemy02_b.direction === 1;
  }

  handleEnemy03Behavior() {
    if (this.enemy03Life <= 0 || !this.enemy03) return;

    if (this.enemy03isHit) {
      this.enemy03.setVelocityX(0);
      if (!this.enemy03.hitCooldown) {
        this.enemy03.hitCooldown = 1000;
        this.time.delayedCall(this.enemy03.hitCooldown, () => {
          this.enemy03isHit = false;
          this.enemy03.hitCooldown = null;
        });
      }
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy03.x,
      this.enemy03.y,
      this.player.x,
      this.player.y
    );
    const patrolLeftLimit = this.enemy03.initialX - 100;
    const patrolRightLimit = this.enemy03.initialX + 100;
    const chaseSpeedMultiplier = 2;

    if (distanceToPlayer < this.enemy03.attackRange) {
      const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.enemy03.x) ||
        (!this.player.flipX && this.player.x < this.enemy03.x);

      const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

      if (distanceToPlayer > minimumAttackDistance) {
        if (this.player.x < this.enemy03.x) {
          this.enemy03.setVelocityX(-this.enemy03.speed * chaseSpeedMultiplier);
          this.enemy03.direction = -1;
        } else {
          this.enemy03.setVelocityX(this.enemy03.speed * chaseSpeedMultiplier);
          this.enemy03.direction = 1;
        }
        this.enemy03.anims.play("enemy03_walk", true);
      } else {
        this.enemy03.setVelocityX(0);
        if (this.enemy03.canAttack && this.enemy03.attackCooldown <= 0) {
          this.enemy03.anims.play("enemy03_attack", true);
          this.createEnemyHitbox(this.enemy03);
          this.enemy03.attackCooldown = 1500;
          this.enemy03.canAttack = false;
          this.time.delayedCall(1500, () => {
            if (this.enemy03 && this.enemy03.active) {
              this.enemy03.canAttack = true;
              this.enemy03.attackCooldown = 0;
            }
          });
        } else {
          if (!this.enemy03.anims.isPlaying) {
            this.enemy03.anims.play("enemy03_idle", true);
          }
        }
      }
    } else {
      if (this.enemy03.body.onFloor()) {
        if (this.enemy03.isPatrolling) {
          if (this.enemy03.x <= patrolLeftLimit) {
            this.enemy03.direction = 1;
            this.enemy03.setVelocityX(this.enemy03.speed);
          } else if (this.enemy03.x >= patrolRightLimit) {
            this.enemy03.direction = -1;
            this.enemy03.setVelocityX(-this.enemy03.speed);
          } else {
            this.enemy03.setVelocityX(this.enemy03.speed * this.enemy03.direction);
          }
          if (!this.enemy03.anims.isPlaying || this.enemy03.anims.currentAnim.key !== "enemy03_walk") {
            this.enemy03.anims.play("enemy03_walk", true);
          }
        } else {
          this.enemy03.setVelocityX(0);
          if (!this.enemy03.anims.isPlaying || this.enemy03.anims.currentAnim.key !== "enemy03_idle") {
            this.enemy03.anims.play("enemy03_idle", true);
          }
        }
      } else {
        this.enemy03.setVelocityX(0);
        if (!this.enemy03.anims.isPlaying || this.enemy03.anims.currentAnim.key !== "enemy03_idle") {
          this.enemy03.anims.play("enemy03_idle", true);
        }
      }
    }
    this.enemy03.flipX = this.enemy03.direction === 1;
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

  handleHealthPickup() {
    this.hearts.forEach((heart) => {
      this.physics.add.overlap(this.player, heart, () => {
        if (this.playerLife < this.maxPlayerLife) {
          this.playerLife++;
          heart.setActive(false);
          heart.setVisible(false);
          heart.destroy();
          this.handleHud();
        } else {
          console.log("Player life is already at max, cannot pick up heart.");
        }
      });
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

  createDagger() {
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

    this.enemies.forEach((enemy) => {
      this.physics.add.overlap(enemy, this.dagger, (enemy, dagger) => {
        if (enemy) {
          switch (enemy) {
            case this.enemy01:
              if (this.enemy01Life > 0) {
                this.enemy01Life--;

              }
              break;
            case this.enemy02:
              if (this.enemy02Life > 0) {
                this.enemy02.play("enemy02_hit", true);
                this.enemy02Life--;
                this.enemy02isHit = true;
              }
              break;
            case this.enemy02_b:
              if (this.enemy02_bLife > 0) {
                this.enemy02_b.play("enemy02_hit", true);
                this.enemy02_bLife--;
                this.enemy02_bisHit = true;
              }
              break;
            case this.enemy03:
              if (this.enemy03Life > 0) {
                this.enemy03Life--;
                this.enemy03.play("enemy03_hit", true);
                this.enemy03isHit = true;
              }
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
          speed = -0.02;
          break;
        case 1: // background_sky_front
          speed = -0.03;
          break;
        case 2: // background_behind04
          speed = -0.05;
          break;
      }
      layer.setX(cameraX * speed);
    });
  }

  handlePlayerMovement() {
    // Mouvement avec A et D
    this.player.setVelocityX(0);
    if (this.playerIsDead) return;
    if (this.isAttacking) return;


    if (this.keys.left.isDown) {
      this.player.body.setVelocityX(-280);
      if (!this.player.flipX) {
        this.player.setSize(20, 40).setOffset(35, 20)
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
    if (this.playerIsDead) return;

    this.playerIsDead = true;
    if (this.player && this.player.body) {
      this.player.body.enable = false;
      this.player.anims.play("player_death", true);
    }

    this.player.once("animationcomplete-player_death", () => {
      if (this.player && this.player.active) {
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
      }
    });

    // Disable all enemies
    this.enemies.forEach(enemy => {
      if (enemy && enemy.body) {
        enemy.body.enable = false;
      }
    });

    // Adjust player visibility
    if (this.player) {
      this.player.setAlpha(0.7);
      this.tweens.killTweensOf(this.player);
    }
  }

  /* performComboAttack(comboCount) {
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
    */

}