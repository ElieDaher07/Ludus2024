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
        end: 0 // À CHANGER, NE FAIT RIEN EN CE MOMENT
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

    this.anims.create({
      key: "enemy03_revive",
      frames: this.anims.generateFrameNames("enemy03", {
        start: 29,
        end: 24
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


    const sauvegarde = JSON.parse(localStorage.getItem('sauvegardeJeu'));

    niveauActuel = "jeu";

    this.checkpointHitbox = this.add.rectangle(1736, 296, 250, 250, 0x000000, 0).setOrigin(0.5);
    this.physics.add.existing(this.checkpointHitbox);
    this.checkpointHitbox.body.setAllowGravity(false);
    this.checkpointHitbox.body.setImmovable(true);


    // this.localStorage.clear()


    // Réinitialization

    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.input.mouse.disableContextMenu();
    this.input.keyboard.enabled = true;
    this.input.mouse.enabled = true;

    // Creation variables progression

    this.diamondCount = (sauvegarde) ? sauvegarde.nbDiamant : 0;
    this.diamondMessageCooldown = false;
    this.sceneTransitionInProgress = false;

    this.exitHitbox = this.add.rectangle(2564, 1160, 50, 50, 0x000000, 0).setOrigin(0.5);
    this.physics.add.existing(this.exitHitbox);
    this.exitHitbox.body.setAllowGravity(false);
    this.exitHitbox.body.setImmovable(true);

    this.surpriseHitbox = this.add.rectangle(2041, 1160, 100, 200, 0x000000, 0).setOrigin(0.5);
    this.physics.add.existing(this.surpriseHitbox);
    this.surpriseHitbox.body.setAllowGravity(false);
    this.surpriseHitbox.body.setImmovable(true);

    // Creation Sons

    this.bgMusic = this.sound.add("jeuBg", {
      loop: true
    });

    this.game.registry.set("bgMusic", this.bgMusic);
    this.isMuted = this.game.registry.get("isMuted");

    if (!this.isMuted) {
      this.bgMusic.play();
      this.bgMusic.setVolume(0.1);
    }

    this.hoverSound = this.sound.add("buttonHoverSfx");
    this.confirmSound = this.sound.add("buttonConfirmSfx");
    this.pauseSound = this.sound.add("pauseSfx");

    this.pauseSound.setVolume(0.4);

    this.hitSound01 = this.sound.add("hitSound01");
    this.hitSound02 = this.sound.add("hitSound02");
    this.hitSound03 = this.sound.add("hitSound03");
    this.hitSound04 = this.sound.add("hitSound04");
    this.hitSound05 = this.sound.add("hitSound05");
    this.hitSound06 = this.sound.add("hitSound06");

    this.enemyDeathSound = this.sound.add("enemyDeathSound");

    this.attackSound = this.sound.add("attackSound");
    this.jumpSound = this.sound.add("jumpSound");
    this.landingSound = this.sound.add("landingSound");
    this.walkingSound = this.sound.add("walkingSound", {
      loop: true,
      rate: 2.5,
      detune: -1200,
    });

    this.surpriseSound = this.sound.add("surpriseSfx", {
      loop: true,
      volume: 0.53,
      rate: 3.2,
      detune: -2600
    })

    this.playerDeathSound = this.sound.add("playerDeathSound");
    this.itemPickupSound = this.sound.add("itemPickupSound");

    // Creation du bouton pause

    this.isPaused = false;

    this.input.keyboard.on("keydown-ESC", () => {
      if (!this.isPaused) {
        this.pauseSound.play();
        this.scene.launch("pause");
        this.surpriseSound.pause();
        this.bgMusic.pause();
        this.scene.pause();
        this.isPaused = true;
      } else {
        this.unpauseSound.play();
        this.scene.stop("pause");
        this.bgMusic.resume();
        this.surpriseSound.resume();
        this.scene.resume();
        this.isPaused = false;
      }
    });

    // Sauter et tomber

    this.isFalling = false;
    this.isJumping = false;

    // Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // Attaque

    this.isAttacking = false;
    this.isAttackingOrThrowing = false;

    // Combo - a revoir dans une autre version

    this.comboCount = 0;
    this.comboDelay = 300;
    this.lastClickTime = 0;

    // Joueur

    this.playerLife = (sauvegarde) ? sauvegarde.nbVie : 6;
    this.maxPlayerLife = 8;
    this.playerIsHit = false; // a revoir
    this.playerIsDead = false;
    this.playerHasLanded = false;
    this.isWalking = false;

    // ---------------- CRÉATION DES ANIMATIONS SPRITESHEET ----------------

    this.createAnimation();

    // ---------------- CRÉATION DU TILEMAP ----------------

    const maCarte = this.make.tilemap({
      key: "carte_json"
    });

    // ---------------- HUD ----------------

    const hudContainer = this.add.container(0, 0).setScrollFactor(0).setDepth(2);

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

    this.createEnemy01();

    this.createEnemy02();
    this.createEnemy02_b();

    this.createEnemy03();
    this.createEnemy03_b();

    this.createEnemy04();
    this.createEnemy05();

    // VIE ENNEMIS 

    this.createEnemyLife();

    // ------------------------------ CRÉATION DU JOUEUR -------------------------------

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump");
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2).setDepth(1);

    this.createPlayerLife();

    this.physics.add.overlap(this.player, this.checkpointHitbox, () => {

      const sauvegarde = {
        niveau: niveauActuel,
        nbDiamant: this.diamondCount,
        nbVie: this.playerLife,
        positionX: this.player.x,
        positionY: this.player.y,
      }
      localStorage.setItem(`sauvegardeJeu`, JSON.stringify(sauvegarde));
    });

    if (sauvegarde) {
      this.player.x = sauvegarde.positionX;
      this.player.y = sauvegarde.positionY;
    }

    // ----------------------- PLAYER LEFT-CLICK, RIGHT-CLICK  ------------------------

    this.input.on('pointerdown', (pointer) => {
      if (this.isAttackingOrThrowing) {
        return;
      }

      if (this.input.activePointer.leftButtonDown()) {
        if (this.playerIsDead || this.player.alpha !== 1) return;

        this.isAttacking = true;
        this.isAttackingOrThrowing = true;

        this.player.off('animationupdate');
        this.player.off('animationcomplete');

        this.player.anims.play("attack_1", true);
        this.attackSound.play();

        this.time.delayedCall(150, () => {
          this.createPlayerHitbox();
        });

        this.player.on('animationupdate', (animation, frame) => {
          if (animation.key === 'attack_1' && frame.index === 5) {
            if (this.hitbox) {
              this.hitbox.destroy();
              this.hitbox = null;
            }
          }
        });

        this.player.on("animationcomplete", (animation) => {
          if (animation.key === 'attack_1') {
            this.isAttacking = false;
            this.isAttackingOrThrowing = false;
            if (this.hitbox) {
              this.hitbox.destroy();
              this.hitbox = null;
            }
          }
        });
      } else if (this.input.activePointer.rightButtonDown() && !this.isAttacking) {
        if (this.playerIsDead || this.player.alpha !== 1) return;
        this.player.anims.play("throw_attack", true);
        this.isAttackingOrThrowing = true;
        this.player.on("animationcomplete", (animation) => {
          if (animation.key === 'throw_attack') {
            this.isAttackingOrThrowing = false;
          }
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
    this.createDiamonds();
    9
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
      //console.log(this.playerLife);
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

    // COLLISION JOUEUR ET HORS NIVEAU

    this.createExitOverlap();

    // COLLISION SURPRISE

    this.createSurpriseOverlap();

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

    this.createBirds();

  }

  createDiamonds() {
    this.diamond01 = this.physics.add.image(139, 1030, "diamond01").setScale(2);
    this.diamond01.body.allowGravity = false;

    this.diamond02 = this.physics.add.image(2337, 1190, "diamond01").setScale(2);
    this.diamond02.body.allowGravity = false;

    this.diamond03 = this.physics.add.image(700, 774, "diamond01").setScale(2);
    this.diamond03.body.allowGravity = false;

    this.diamond04 = this.physics.add.image(250, config.height / 2 + 100, "diamond01").setScale(2);
    this.diamond04.body.allowGravity = false;

    this.createHoverAnimation(this.diamond01);
    this.createHoverAnimation(this.diamond02);
    this.createHoverAnimation(this.diamond03);
    this.createHoverAnimation(this.diamond04);

    this.diamonds = [this.diamond01, this.diamond02, this.diamond03, this.diamond04];
    this.handleDiamondPickup(this.diamonds);
  }

  createSurpriseOverlap() {
    this.physics.add.overlap(this.player, this.surpriseHitbox, () => {
      this.surpriseHitbox.destroy();

      if (!this.enemy03_b.active) {
        this.enemy03_b.setActive(true);
        this.enemy03_b.setVisible(true);
        this.enemy03_b.isHit = false;
        this.enemy03_b.canAttack = true;
        this.enemy03_b.attackCooldown = 0;
        this.enemy03_b.anims.play("enemy03_walk", true);
        this.surpriseSound.play();
        this.bgMusic.stop();

      }
    });
  }


  createExitOverlap() {
    this.physics.add.overlap(this.player, this.exitHitbox, () => {
      if (this.diamondCount === 4 && !this.sceneTransitionInProgress) {

        this.sceneTransitionInProgress = true;
        this.input.keyboard.enabled = false;
        this.input.mouse.enabled = false;
        this.cameras.main.fadeOut(1500, 0, 0, 0);

        this.time.delayedCall(1500, () => {
          this.scene.stop("jeu");
          this.sound.stopAll();
          this.scene.start("jeu2");
        });

      } else if (!this.diamondMessageCooldown && this.diamondCount !== 4) {
        this.showPlayerDialogue("Je ne devrais pas partir avant d'avoir tous les diamants.");
        this.diamondMessageCooldown = true;
      }
    });
  }

  handleDiamondPickup() {
    this.diamonds.forEach((diamond) => {
      this.physics.add.overlap(this.player, diamond, () => {
        this.diamondCount++;
        //console.log(this.diamondCount);
        diamond.setActive(false);
        diamond.setVisible(false);
        diamond.destroy();
        this.itemPickupSound.play();

        if (this.diamondCount === 1) {
          this.showPlayerDialogue("Je devrais ramasser tous les diamants que je peux trouver");
        }

        if (this.diamondCount === 4) {
          this.showPlayerDialogue("Maintenant, je peux partir d'ici!");
        }
      });
    });
  }

  showPlayerDialogue(message) {

    if (this.diamondMessageCooldown) return;

    this.diamondMessageCooldown = true;

    const text = this.add.text(this.player.x, this.player.y - 50, message, {
      fontSize: '16px',
      fill: '#ffffff',
    }).setOrigin(0.5).setDepth(1);

    this.time.addEvent({
      delay: 10,
      callback: () => {
        text.setPosition(this.player.x, this.player.y - 50);
      },
      repeat: -1
    });

    this.time.delayedCall(3800, () => {
      text.destroy();
      this.diamondMessageCooldown = false;
    });
  }

  createHearts() {
    this.heart01 = this.physics.add.image(444, 390, "heart01");
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
      //console.log(this.playerLife);
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

  createEnemy03_b() {
    this.enemy03_b = this.physics.add.sprite(2430, 1160, "enemy03_idle");
    this.enemy03_b.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
    this.enemy03_b.setScale(3).setDepth(1);
    this.enemy03_b.setTint(0xFF6666);
    this.enemy03_bisHit = false;
    this.enemy03_b.hitCooldown = null;

    this.enemy03_b.setActive(false);
    this.enemy03_b.setVisible(false);

    this.enemy03_b.speed = 50;
    this.enemy03_b.direction = -1;
    this.enemy03_b.initialX = this.enemy03_b.x;

    this.enemy03_b.attackRange = 250;
    this.enemy03_b.attackCooldown = 0;
    this.enemy03_b.canAttack = true;
    this.enemy03_b.patrolTimer = 0;
    this.enemy03_b.isPatrolling = true;
    this.enemy03_b.patrolLeftLimit = this.enemy03_b.initialX - 100;
    this.enemy03_b.patrolRightLimit = this.enemy03_b.initialX + 100;
    this.enemy03_b.anims.play("enemy03_idle", true);
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
    this.enemy03_bLife = 9;
    this.enemy04Life = 2;
    this.enemy05Life = 2;

    this.enemies = [this.enemy01, this.enemy02, this.enemy02_b, this.enemy03, this.enemy03_b, this.enemy04, this.enemy05];
  }

  createPlayerHitbox() {

    if (this.hitbox) {
      this.hitbox.destroy();
    }

    this.hitbox = this.add.zone(
      this.player.x + (this.player.flipX ? -18 : 18),
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
                this.hitSound03.play();
              }
              break;
            case this.enemy02_b:
              if (this.enemy02_bLife > 0) {
                this.enemy02_bLife--;
                this.enemy02_bisHit = true;
                this.enemy02_b.play("enemy02_hit", true);
                this.hitSound03.play();
              }
              break;
            case this.enemy03:
              if (this.enemy03Life > 0) {
                this.enemy03Life--;
                this.enemy03isHit = true;
                this.enemy03.play("enemy03_hit", true);
                this.hitSound04.play();
              }
              break;
            case this.enemy03_b:
              if (this.enemy03_bLife > 0) {
                this.enemy03_bLife--;
                this.enemy03_bisHit = true;
                this.enemy03_b.play("enemy03_hit", true);
                this.hitSound04.play();
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

    if (enemy.hitbox) return;

    enemy.hitbox = this.add.zone(
      enemy.x + (enemy.flipX ? 25 : -25),
      enemy.y,
      50,
      50
    );
    this.physics.add.existing(enemy.hitbox);
    enemy.hitbox.body.setAllowGravity(false);
    enemy.hitbox.body.setImmovable(true);

    this.physics.add.overlap(enemy.hitbox, this.player, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit();
      this.handleHud();
      this.handleHealthPickup();
      //console.log(this.playerLife);
      enemy.hitbox.destroy();
      enemy.hitbox = null;
    });

    this.time.delayedCall(500, () => {
      if (enemy.hitbox) {
        enemy.hitbox.destroy();
        enemy.hitbox = null;
      }
    });
  }

  update() {
    if (!this.playerIsDead) {
      this.handleParallax();
      this.handlePlayerMovement();
      this.handlePlayerAnimations();
      this.handleEnemy02Behavior();
      this.handleEnemy02_bBehavior();

      // Check if enemy03_b is not null and is active
      if (this.enemy03_b && this.enemy03_b.active) {
        this.handleEnemy03_bBehavior();
      }

      this.handleEnemy03Behavior();

    }
    console.log(`Player Position - x: ${this.player.x}, y: ${this.player.y}`);
    //console.log(`Player Life Initialized: ${this.playerLife}, Max Life: ${this.maxPlayerLife}`);
  }

  handleEnemy02Behavior() {
    if (this.enemy02Life <= 0 || !this.enemy02) return;

    const maxChaseDistance = 500;

    if (this.enemy02isHit) {
      this.enemy02.setVelocityX(0);

      if (this.enemy02.hitbox) {
        this.enemy02.hitbox.destroy();
        this.enemy02.hitbox = null;
      }

      if (!this.enemy02.hitCooldown) {
        this.enemy02.hitCooldown = this.time.delayedCall(500, () => {
          this.enemy02isHit = false;
          this.enemy02.hitCooldown = null;
          this.enemy02.isPatrolling = true;
          this.enemy02.canAttack = true;
          this.enemy02.attackCooldown = 0;
          if (!this.enemy02.anims.isPlaying) {
            this.enemy02.anims.play("enemy02_idle", true);
          }
        });
      }
      this.enemy02.isAttacking = false;
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy02.x,
      this.enemy02.y,
      this.player.x,
      this.player.y
    );

    const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
      this.enemy02.x,
      this.enemy02.y,
      this.enemy02.initialX,
      this.enemy02.y
    );

    const patrolLeftLimit = this.enemy02.initialX - 100;
    const patrolRightLimit = this.enemy02.initialX + 100;
    const chaseSpeedMultiplier = 2;

    if (this.enemy02.isAttacking || this.enemy02.postAttackCooldown) {
      this.enemy02.setVelocityX(0);
      return;
    }

    if (distanceFromOriginalSpot > maxChaseDistance) {
      this.enemy02.initialX = this.enemy02.x;
      this.enemy02.patrolLeftLimit = this.enemy02.initialX - 100;
      this.enemy02.patrolRightLimit = this.enemy02.initialX + 100;

      this.enemy02.isPatrolling = true;
      this.enemy02.direction = (this.enemy02.x > this.enemy02.initialX) ? -1 : 1;
      this.enemy02.setVelocityX(this.enemy02.speed * this.enemy02.direction);
      return;
    }

    if (this.enemy02.isAttacking) {
      this.enemy02.setVelocityX(0);
      return;
    }

    if (this.enemy02.postAttackCooldown) {
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
          this.enemy02.canAttack = false;
          this.enemy02.attackCooldown = 1500;

          if (!this.enemy02isHit) {
            this.hitSound02.play();
          }

          this.enemy02.anims.play("enemy02_attack", true);

          this.enemy02.on('animationupdate', (animation, frame) => {
            if (animation.key === "enemy02_attack" && frame.index === 2 && !this.enemy02.hitbox) {
              this.createEnemyHitbox(this.enemy02);
            }
          });

          this.enemy02.on('animationcomplete-enemy02_attack', () => {
            this.enemy02.isAttacking = false;
            this.enemy02.canAttack = true;

            if (this.enemy02.hitbox) {
              this.enemy02.hitbox.destroy();
              this.enemy02.hitbox = null;
            }

            this.enemy02.anims.play("enemy02_idle", true);
            this.enemy02.postAttackCooldown = true;

            this.time.delayedCall(600, () => {
              this.enemy02.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy02.x,
                this.enemy02.y,
                this.player.x,
                this.player.y
              );
              if (currentDistanceToPlayer <= this.enemy02.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                this.enemy02.anims.play("enemy02_attack", true);
                this.hitSound02.play();
              } else if (currentDistanceToPlayer < this.enemy02.attackRange) {
                this.enemy02.anims.play("enemy02_walk", true);
              } else {
                this.enemy02.anims.play("enemy02_idle", true);
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
          if (!this.enemy02.anims.isPlaying || this.enemy02.anims.currentAnim.key !== "enemy02_walk") {
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

    const maxChaseDistance = 500;

    if (this.enemy02_bisHit) {
      this.enemy02_b.setVelocityX(0);

      if (this.enemy02_b.hitbox) {
        this.enemy02_b.hitbox.destroy();
        this.enemy02_b.hitbox = null;
      }

      if (!this.enemy02_b.hitCooldown) {
        this.enemy02_b.hitCooldown = this.time.delayedCall(500, () => {
          this.enemy02_bisHit = false;
          this.enemy02_b.hitCooldown = null;
          this.enemy02_b.isPatrolling = true;
          this.enemy02_b.canAttack = true;
          this.enemy02_b.attackCooldown = 0;
          if (!this.enemy02_b.anims.isPlaying) {
            this.enemy02_b.anims.play("enemy02_idle", true);
          }
        });
      }
      this.enemy02_b.isAttacking = false;
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy02_b.x,
      this.enemy02_b.y,
      this.player.x,
      this.player.y
    );

    const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
      this.enemy02_b.x,
      this.enemy02_b.y,
      this.enemy02_b.initialX,
      this.enemy02_b.y
    );

    const patrolLeftLimit = this.enemy02_b.initialX - 100;
    const patrolRightLimit = this.enemy02_b.initialX + 100;
    const chaseSpeedMultiplier = 2;

    if (this.enemy02_b.isAttacking || this.enemy02_b.postAttackCooldown) {
      this.enemy02_b.setVelocityX(0);
      return;
    }

    if (distanceFromOriginalSpot > maxChaseDistance) {
      this.enemy02_b.initialX = this.enemy02_b.x;
      this.enemy02_b.patrolLeftLimit = this.enemy02_b.initialX - 100;
      this.enemy02_b.patrolRightLimit = this.enemy02_b.initialX + 100;

      this.enemy02_b.isPatrolling = true;
      this.enemy02_b.direction = (this.enemy02_b.x > this.enemy02_b.initialX) ? -1 : 1;
      this.enemy02_b.setVelocityX(this.enemy02_b.speed * this.enemy02_b.direction);
      return;
    }

    if (this.enemy02_b.isAttacking) {
      this.enemy02_b.setVelocityX(0);
      return;
    }

    if (this.enemy02_b.postAttackCooldown) {
      return;
    }

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
          this.enemy02_b.isAttacking = true;
          this.enemy02_b.canAttack = false;
          this.enemy02_b.attackCooldown = 1500;


          if (!this.enemy02_bisHit) {
            this.hitSound02.play();
          }


          this.enemy02_b.anims.play("enemy02_attack", true);

          this.enemy02_b.on('animationupdate', (animation, frame) => {
            if (animation.key === "enemy02_attack" && frame.index === 2 && !this.enemy02_b.hitbox) {
              this.createEnemyHitbox(this.enemy02_b);
            }
          });

          this.enemy02_b.on('animationcomplete-enemy02_attack', () => {
            this.enemy02_b.isAttacking = false;
            this.enemy02_b.canAttack = true;

            if (this.enemy02_b.hitbox) {
              this.enemy02_b.hitbox.destroy();
              this.enemy02_b.hitbox = null;
            }

            this.enemy02_b.anims.play("enemy02_idle", true);
            this.enemy02_b.postAttackCooldown = true;

            this.time.delayedCall(600, () => {
              this.enemy02_b.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy02_b.x,
                this.enemy02_b.y,
                this.player.x,
                this.player.y
              );
              if (currentDistanceToPlayer <= this.enemy02_b.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                this.enemy02_b.anims.play("enemy02_attack", true);
                this.hitSound02.play();
              } else if (currentDistanceToPlayer < this.enemy02_b.attackRange) {
                this.enemy02_b.anims.play("enemy02_walk", true);
              } else {
                this.enemy02_b.anims.play("enemy02_idle", true);
              }
              this.enemy02_b.attackCooldown = 0;
            });
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

    const maxChaseDistance = 350;

    if (this.enemy03isHit) {
      this.enemy03.setVelocityX(0);

      if (this.enemy03.hitbox) {
        this.enemy03.hitbox.destroy();
        this.enemy03.hitbox = null;
      }

      if (!this.enemy03.hitCooldown) {
        this.enemy03.hitCooldown = this.time.delayedCall(500, () => {
          this.enemy03isHit = false;
          this.enemy03.hitCooldown = null;
          this.enemy03.isPatrolling = true;
          this.enemy03.canAttack = true;
          this.enemy03.attackCooldown = 0;
          if (!this.enemy03.anims.isPlaying) {
            this.enemy03.anims.play("enemy03_idle", true);
          }
        });
      }
      this.enemy03.isAttacking = false;
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy03.x,
      this.enemy03.y,
      this.player.x,
      this.player.y
    );

    const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
      this.enemy03.x,
      this.enemy03.y,
      this.enemy03.initialX,
      this.enemy03.y
    );

    const patrolLeftLimit = this.enemy03.initialX - 100;
    const patrolRightLimit = this.enemy03.initialX + 100;
    const chaseSpeedMultiplier = 2;

    if (this.enemy03.isAttacking || this.enemy03.postAttackCooldown) {
      this.enemy03.setVelocityX(0);
      return;
    }

    if (distanceFromOriginalSpot > maxChaseDistance) {
      this.enemy03.initialX = this.enemy03.x;
      this.enemy03.patrolLeftLimit = this.enemy03.initialX - 100;
      this.enemy03.patrolRightLimit = this.enemy03.initialX + 100;

      this.enemy03.isPatrolling = true;
      this.enemy03.direction = (this.enemy03.x > this.enemy03.initialX) ? -1 : 1;
      this.enemy03.setVelocityX(this.enemy03.speed * this.enemy03.direction);
      return;
    }

    if (this.enemy03.isAttacking) {
      this.enemy03.setVelocityX(0);
      return;
    }

    if (this.enemy03.postAttackCooldown) {
      return;
    }

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
          this.enemy03.isAttacking = true;
          this.enemy03.canAttack = false;
          this.enemy03.attackCooldown = 1500;
          if (!this.enemy03isHit) {
            this.hitSound03.play();
          }
          this.enemy03.anims.play("enemy03_attack", true);
          this.enemy03.on('animationupdate', (animation, frame) => {
            if (animation.key === "enemy03_attack" && frame.index === 2 && !this.enemy03.hitbox) {
              this.createEnemyHitbox(this.enemy03);
            }
          });

          this.enemy03.on('animationcomplete-enemy03_attack', () => {
            this.enemy03.isAttacking = false;
            this.enemy03.canAttack = true;
            if (this.enemy03.hitbox) {
              this.enemy03.hitbox.destroy();
              this.enemy03.hitbox = null;
            }

            this.enemy03.anims.play("enemy03_idle", true);
            this.enemy03.postAttackCooldown = true;

            this.time.delayedCall(600, () => {
              this.enemy03.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy03.x,
                this.enemy03.y,
                this.player.x,
                this.player.y
              );
              if (currentDistanceToPlayer <= this.enemy03.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                this.enemy03.anims.play("enemy03_attack", true);
                this.hitSound03.play();
              } else if (currentDistanceToPlayer < this.enemy03.attackRange) {
                this.enemy03.anims.play("enemy03_walk", true);
              } else {
                this.enemy03.anims.play("enemy03_idle", true);
              }
              this.enemy03.attackCooldown = 0;
            });
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

  handleEnemy03_bBehavior() {
    if (this.enemy03_bLife <= 0 || !this.enemy03_b) return;

    if (this.enemy03_bisHit) {
      this.enemy03_b.setVelocityX(0);

      if (this.enemy03_b.hitbox) {
        this.enemy03_b.hitbox.destroy();
        this.enemy03_b.hitbox = null;
      }

      if (!this.enemy03_b.hitCooldown) {
        this.enemy03_b.hitCooldown = this.time.delayedCall(500, () => {
          this.enemy03_bisHit = false;
          this.enemy03_b.hitCooldown = null;
          this.enemy03_b.canAttack = true;
          this.enemy03_b.attackCooldown = 0;
          if (!this.enemy03_b.anims.isPlaying) {
            this.enemy03_b.anims.play("enemy03_idle", true);
          }
        });
      }
      this.enemy03_b.isAttacking = false;
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy03_b.x,
      this.enemy03_b.y,
      this.player.x,
      this.player.y
    );

    const chaseDistance = 600;

    if (this.enemy03_b.isAttacking || this.enemy03_b.postAttackCooldown) {
      this.enemy03_b.setVelocityX(0);
      return;
    }

    if (distanceToPlayer < chaseDistance) {
      const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.enemy03_b.x) ||
        (!this.player.flipX && this.player.x < this.enemy03_b.x);

      const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

      if (distanceToPlayer > minimumAttackDistance) {
        if (this.player.x < this.enemy03_b.x) {
          this.enemy03_b.setVelocityX(-this.enemy03_b.speed * 2.8);
          this.enemy03_b.direction = -1;
        } else {
          this.enemy03_b.setVelocityX(this.enemy03_b.speed * 2.8);
          this.enemy03_b.direction = 1;
        }
        this.enemy03_b.anims.play("enemy03_walk", true);
      } else {
        this.enemy03_b.setVelocityX(0);
        if (this.enemy03_b.canAttack && this.enemy03_b.attackCooldown <= 0) {
          this.enemy03_b.isAttacking = true;
          this.enemy03_b.canAttack = false;
          this.enemy03_b.attackCooldown = 1500;

          if (!this.enemy03_bisHit) {
            this.hitSound03.play();
          }

          this.enemy03_b.anims.play("enemy03_attack", true);

          this.enemy03_b.on('animationupdate', (animation, frame) => {
            if (animation.key === "enemy03_attack" && frame.index === 2 && !this.enemy03_b.hitbox) {
              this.createEnemyHitbox(this.enemy03_b);
            }
          });

          this.enemy03_b.on('animationcomplete-enemy03_attack', () => {
            this.enemy03_b.isAttacking = false;
            this.enemy03_b.canAttack = true;

            if (this.enemy03_b.hitbox) {
              this.enemy03_b.hitbox.destroy();
              this.enemy03_b.hitbox = null;
            }

            this.enemy03_b.anims.play("enemy03_idle", true);
            this.enemy03_b.postAttackCooldown = true;

            this.time.delayedCall(600, () => {
              this.enemy03_b.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy03_b.x,
                this.enemy03_b.y,
                this.player.x,
                this.player.y
              );
              if (currentDistanceToPlayer <= this.enemy03_b.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                this.enemy03_b.anims.play("enemy03_attack", true);
                this.hitSound03.play();
              } else if (currentDistanceToPlayer < this.enemy03_b.attackRange) {
                this.enemy03_b.anims.play("enemy03_walk", true);
              } else {
                this.enemy03_b.anims.play("enemy03_idle", true);
              }
              this.enemy03_b.attackCooldown = 0;
            });
          });
        } else {
          if (!this.enemy03_b.anims.isPlaying) {
            this.enemy03_b.anims.play("enemy03_idle", true);
          }
        }
      }
    } else {
      if (this.enemy03_b.body.onFloor()) {
        if (this.enemy03_b.isPatrolling) {
          const patrolLeftLimit = this.enemy03_b.initialX - 100;
          const patrolRightLimit = this.enemy03_b.initialX + 100;

          if (this.enemy03_b.x <= patrolLeftLimit) {
            this.enemy03_b.direction = 1;
            this.enemy03_b.setVelocityX(this.enemy03_b.speed);
          } else if (this.enemy03_b.x >= patrolRightLimit) {
            this.enemy03_b.direction = -1;
            this.enemy03_b.setVelocityX(-this.enemy03_b.speed);
          } else {
            this.enemy03_b.setVelocityX(this.enemy03_b.speed * this.enemy03_b.direction);
          }
          if (!this.enemy03_b.anims.isPlaying || this.enemy03_b.anims.currentAnim.key !== "enemy03_walk") {
            this.enemy03_b.anims.play("enemy03_walk", true);
          }
        } else {
          this.enemy03_b.setVelocityX(0);
          if (!this.enemy03_b.anims.isPlaying || this.enemy03_b.anims.currentAnim.key !== "enemy03_idle") {
            this.enemy03_b.anims.play("enemy03_idle", true);
          }
        }
      } else {
        this.enemy03_b.setVelocityX(0);
        if (!this.enemy03_b.anims.isPlaying || this.enemy03_b.anims.currentAnim.key !== "enemy03_idle") {
          this.enemy03_b.anims.play("enemy03_idle", true);
        }
      }
    }

    this.enemy03_b.flipX = this.enemy03_b.direction === 1;
  }


  handleEnemyLife() {
    if (this.enemy01) {
      if (this.enemy01Life <= 0) {
        this.enemy01.body.enable = false;
        this.enemy01.anims.play("enemy01_death");
        this.enemyDeathSound.play();
        this.enemy01.on("animationcomplete", () => {
          this.enemy01.destroy();
          this.enemy01.setActive(false);
          this.enemy01.setVisible(false);
          this.enemy01 = null;
        });
      }
    }

    if (this.enemy02) {
      if (this.enemy02Life <= 0) {
        this.enemy02.body.enable = false;
        this.enemy02.anims.play("enemy02_death");
        this.enemyDeathSound.play();
        this.enemy02.on("animationcomplete", () => {
          this.enemy02.destroy();
          this.enemy02.setActive(false);
          this.enemy02.setVisible(false);
          this.enemy02 = null;
        });
      }
    }

    if (this.enemy02_b) {
      if (this.enemy02_bLife <= 0) {
        this.enemy02_b.body.enable = false;
        this.enemy02_b.anims.play("enemy02_death");
        this.enemyDeathSound.play();
        this.enemy02_b.on("animationcomplete", () => {
          this.enemy02_b.destroy();
          this.enemy02_b.setActive(false);
          this.enemy02_b.setVisible(false);
          this.enemy02_b = null;
        });
      }
    }

    if (this.enemy03) {
      if (this.enemy03Life <= 0) {
        this.enemy03.body.enable = false;
        this.enemy03.disableBody();
        this.enemy03.anims.play("enemy03_death");
        this.enemyDeathSound.play();
        this.enemy03.on("animationcomplete", () => {
          console.log("this boy dead, function handleEnemyLife");
          this.enemy03.destroy();
          this.enemy03.setActive(false);
          this.enemy03.setVisible(false);
          this.enemy03 = null;
        });
      }
    }

    if (this.enemy03_b) {
      if (this.enemy03_bLife <= 0) {
        this.enemy03_b.body.enable = false;
        this.enemy03_b.anims.play("enemy03_death");
        this.enemyDeathSound.play();
        this.surpriseSound.stop();
        this.time.delayedCall(2050, () => {
          if (!this.isMuted) {
            this.bgMusic.play();
          }
        });
        this.enemy03_b.on("animationcomplete", () => {
          this.enemy03_b.destroy();
          this.enemy03_b.setActive(false);
          this.enemy03_b.setVisible(false);
          this.enemy03_b = null;
        });
      }
    }

    if (this.enemy04) {
      if (this.enemy04Life <= 0 /*&& this.enemy04*/ ) {
        this.enemy04.disableBody();
        this.enemy04.body.enable = false;
        this.enemy04.anims.play("enemy04_death");
        this.enemyDeathSound.play();
        this.enemy04.on("animationcomplete", () => {
          this.enemy04.destroy();
          this.enemy04.setActive(false);
          this.enemy04.setVisible(false);
          this.enemy04.destroy();
          this.enemy04 = null;
        });
      }
    }

    if (this.enemy05) {
      if (this.enemy05Life <= 0 /*&& this.enemy05*/ ) {
        this.enemy05.disableBody();
        this.enemy05.body.enable = false;
        this.enemy05.anims.play("enemy05_death");
        this.enemyDeathSound.play();
        this.enemy05.on("animationcomplete", () => {
          this.enemy05.destroy();
          this.enemy05.setActive();
          this.enemy05.setVisible(false);
          this.enemy05 = null;
        });
      }
    }
  }

  handlePlayerIsHit() {
    if (this.player.alpha === 1) {
      this.playerLife--;
      //this.playerIsHit = true;
      this.hitSound01.play();
      let flashTween = this.tweens.add({
        targets: this.player,
        alpha: {
          from: 0.33,
          to: 0.66
        },
        ease: "Linear",
        duration: 100,
        repeat: 3,
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
          this.itemPickupSound.play();
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
          this.hitSound05.play();

          this.time.delayedCall(5000, () => {
            if (!daggerHitEnemy) {
              let explosion = this.add.sprite(dagger.x, dagger.y, "dagger_hit");
              explosion.setScale(2).setDepth(1);
              explosion.play("dagger_hit");
              this.hitSound06.play();
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
            case this.enemy03_b:
              if (this.enemy03_bLife > 0) {
                this.enemy03_bLife--;
                this.enemy03_b.play("enemy03_hit", true);
                this.enemy03_bisHit = true;
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
          this.hitSound06.play();
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
      this.jumpSound.play();
    }
    if (this.player.body.onFloor() && !this.playerHasLanded) {
      this.landingSound.play();
      this.playerHasLanded = true;
    }
    if (!this.player.body.onFloor()) {
      this.playerHasLanded = false;
    }

    // Reset le jumpcount
    if (this.player.body.onFloor()) {
      this.jumpCount = 0;
    }

    if (this.keys.left.isDown && this.player.body.onFloor() || this.keys.right.isDown && this.player.body.onFloor()) {
      if (!this.isWalking) {
        this.walkingSound.play();
        this.isWalking = true;
      }
    } else {
      if (this.isWalking) {
        this.walkingSound.stop();
        this.isWalking = false;
      }
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
    this.sound.stopAll();
    this.playerDeathSound.play();
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

    // Désactiver les ennemis
    this.enemies.forEach(enemy => {
      if (enemy && enemy.body) {
        enemy.body.enable = false;
      }
    });

    if (this.player) {
      this.player.setAlpha(0.7);
      this.tweens.killTweensOf(this.player);
    }
  }

  // Combo attaque je laisse en commentaire a revoir plus tard dans N2C

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