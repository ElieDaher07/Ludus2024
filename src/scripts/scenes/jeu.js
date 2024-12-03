class Jeu extends Phaser.Scene {

  constructor() {
    super({
      key: "jeu",
    });
  }

  preload() {

    // les preloads sont tous dans preload.js

  }


  createAnimationKey(key, spritesheet, firstFrame, lastFrame, frameRate, loop) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers(spritesheet, {
        start: firstFrame,
        end: lastFrame
      }),
      frameRate: frameRate,
      repeat: loop
    });
  }

  createAnimation() {

    // PLAYER 
    this.createAnimationKey("idle", "player_idle_run_jump", 0, 8, 10, -1);
    this.createAnimationKey("walk", "player_idle_run_jump", 9, 16, 10, -1);
    this.createAnimationKey("jump", "player_idle_run_jump", 17, 20, 10, 0);
    this.createAnimationKey("fall", "player_idle_run_jump", 20, 23, 10, 0);
    this.createAnimationKey("attack_1", "player_attacks", 0, 6, 10, 0);
    this.createAnimationKey("throw_attack", "player_throw_attack", 0, 6, 10, 0);
    this.createAnimationKey("dagger_projectile", "dagger_throw", 0, 0, 10, 0);
    this.createAnimationKey("dagger_hit", "dagger_throw", 1, 3, 10, 0);
    this.createAnimationKey("player_hit", "player_hit_death", 5, 7, 10, 0);
    this.createAnimationKey("player_death", "player_hit_death", 0, 4, 10, 0);

    // BIRD
    this.createAnimationKey("bird_bg", "bird", 9, 11, 8, -1);

    // ENEMY 01 - PLANT
    this.createAnimationKey("plant_idle", "enemy01", 0, 7, 8, -1);
    this.createAnimationKey("plant_attack", "enemy01", 8, 15, 8, 0);
    this.createAnimationKey("plant_hit", "enemy01", 24, 26, 8, 0);
    this.createAnimationKey("plant_death", "destroy_effect", 0, 4, 8, 0);

    // ENEMY 02 - SORCERER DAGGER
    this.createAnimationKey("enemy02_idle", "enemy02", 0, 4, 6, -1);
    this.createAnimationKey("enemy02_walk", "enemy02", 5, 8, 6, -1);
    this.createAnimationKey("enemy02_attack", "enemy02", 10, 13, 8, 0);
    this.createAnimationKey("enemy02_hit", "enemy02", 15, 18, 8, 0);
    this.createAnimationKey("enemy02_death", "enemy02", 20, 24, 8, 0);

    // ENEMY 03 - TANK SORCERER - DAGGER
    this.createAnimationKey("enemy03_idle", "enemy03", 0, 4, 6, -1);
    this.createAnimationKey("enemy03_walk", "enemy03", 6, 11, 6, -1);
    this.createAnimationKey("enemy03_attack", "enemy03", 12, 17, 6, 0);
    this.createAnimationKey("enemy03_hit", "enemy03", 18, 22, 6, 0);
    this.createAnimationKey("enemy03_death", "enemy03", 24, 29, 6, 0);

    // ENEMY 04 - PLAGUE DOCTOR
    this.createAnimationKey("enemy04_idle", "enemy04", 0, 6, 8, -1);
    this.createAnimationKey("enemy04_walk", "enemy04", 7, 12, 8, -1);
    this.createAnimationKey("enemy04_attack", "enemy04", 13, 19, 8, 0);
    this.createAnimationKey("enemy04_hit", "enemy04", 25, 27, 8, 0);
    this.createAnimationKey("enemy04_death", "destroy_effect", 0, 4, 8, 0);

  }

  create() {

    niveau = "jeu";

    const sauvegarde = JSON.parse(localStorage.getItem('sauvegardeJeu'));

    if (sauvegarde) {
      checkpoint = sauvegarde.checkpoint;
      niveau = sauvegarde.niveau;
      this.diamondCount = sauvegarde.nbDiamant;
      this.playerLife = sauvegarde.nbVie;
    }

    this.input.mouse.disableContextMenu();

    // Commence le "cutscene" 


    /* this.game.cutscenePlayed = false;
    this.input.keyboard.enabled = false;
    this.input.mouse.enabled = false;

    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.time.delayedCall(1000, () => {
      if (!this.game.cutscenePlayed) {
        this.game.cutscenePlayed = true;
        this.cameras.main.pan(2664, 1160, 3000, 'Linear', true);
        this.cameras.main.once('camerapancomplete', () => {
          this.cameras.main.pan(2664, 1160, 1000, 'Linear', true);
          this.time.delayedCall(1000, () => {
            this.cameras.main.pan(50, 250, 3000, 'Linear');
            this.time.delayedCall(3000, () => {
              this.input.keyboard.enabled = true;
              this.input.mouse.enabled = true;
            });
          });
        });

      } else {
        this.input.keyboard.enabled = true;
        this.input.mouse.enabled = true;
      }
    });
*/

    // Creation variables progression

    this.diamondCount = (sauvegarde) ? sauvegarde.nbDiamant : 0;
    this.diamondMessageCooldown = false;
    this.sceneTransitionInProgress = false;

    this.exitHitbox = this.add.rectangle(2664, 1160, 250, 250, 0x000000, 0).setOrigin(0.5);
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
    this.musicIsMuted = this.game.registry.get("musicIsMuted") || 0;

    if (this.musicIsMuted) {
      this.bgMusic.stop();
    } else {
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
      rate: 3.7,
      detune: -2800
    })

    this.playerDeathSound = this.sound.add("playerDeathSound");
    this.itemPickupSound = this.sound.add("itemPickupSound");
    this.daggerRecuperatedSound = this.sound.add("daggerRecuperated");

    this.daggerRecuperatedSound.setVolume(0.9);

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


    // ---------------- Variables Joueur ----------------

    this.playerLife = (sauvegarde) ? sauvegarde.nbVie : 6;
    this.maxPlayerLife = 8;
    this.playerIsHit = false;
    this.playerIsDead = false;
    this.playerHasLanded = false;
    this.isWalking = false;

    // Variables Sauter et tomber

    this.isFalling = false;
    this.isJumping = false;


    // Variables Jumpcount

    this.jumpCount = 0;
    this.jumpKeyReleased = true;

    // Variables Attaque

    this.isAttacking = false;
    this.isAttackingOrThrowing = false;

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
    this.noDaggerHud = this.add.image(config.width / 2, config.height / 2, "noDagger");
    this.yesDaggerHud = this.add.image(config.width / 2 + 100, config.height / 2, "yesDagger")
    this.textCountNeeded = this.add.text(135, 35, " /4", {
      fontFamily: '"Press Start 2P"',
      fontSize: "25px",
      fill: "#ffffff",
      resolution: 3
    });

    this.textCounter = this.add.text(135, 35, "0", {
      fontFamily: '"Press Start 2P"',
      fontSize: "25px",
      fill: "#ffffff",
      resolution: 3
    });

    this.healthHud.setOrigin(0, 0);
    this.healthHud.setScale(5);

    this.avatarHud.setCrop(5, 5, 55, 30)
    this.avatarHud.setOrigin(0, 0);
    this.avatarHud.setScale(5);
    this.avatarHud.setPosition(-30, -35)

    this.noDaggerHud.setScale(0.06)
    this.noDaggerHud.setPosition(60, 160);

    this.yesDaggerHud.setScale(0.06);
    this.yesDaggerHud.setPosition(65, 160)

    hudContainer.add(this.healthHud);
    hudContainer.add(this.avatarHud);
    hudContainer.add(this.noDaggerHud);
    hudContainer.add(this.yesDaggerHud);
    hudContainer.add(this.textCountNeeded);
    hudContainer.add(this.textCounter);


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

    this.createPlant01();

    this.createEnemy02();
    this.createEnemy02_b();

    this.createEnemy03();
    this.createEnemy03_b();

    this.createEnemy04();

    // VIE ENNEMIS 

    this.createEnemyLife();

    // ------------------------------ CRÉATION DU JOUEUR -------------------------------

    this.player = this.physics.add.sprite(config.width / 2 - 600, config.height / 2, "player_idle_run_jump"); // other spot spot cfg.width / 2 - 200, y  config.height / 2 + 1000
    this.player.body.setBounce(0).setSize(20, 40).setOffset(10, 20).setCollideWorldBounds(true);
    this.player.setScale(2).setDepth(1);

    this.createPlayerLife();

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
      this.handlePlayerIsHit(1);
      this.handleHud();
      this.handleHealthPickup();
      this.cameras.main.shake(300, 0.01);
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

    console.log(`Player Life: ${this.playerLife}`);
    console.log(`Diamond count: ${this.diamondCount}`);
    console.log(`Niveau Jeu: ${niveau}`);

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
        this.surpriseSound.play({
          seek: 6
        });
        this.bgMusic.stop();

      }
    });
  }

  createExitOverlap() {
    this.physics.add.overlap(this.player, this.exitHitbox, () => {
      if (this.diamondCount >= 4 && !this.sceneTransitionInProgress) {

        this.sceneTransitionInProgress = true;
        this.input.keyboard.enabled = false;
        this.input.mouse.enabled = false;
        this.cameras.main.fadeOut(1500, 0, 0, 0);

        this.time.delayedCall(1500, () => {
          this.scene.stop("jeu");
          this.sound.stopAll();

          // SAUVEGARDE
          this.physics.add.overlap(this.player, this.exitHitbox, () => {
            checkpoint++;
            const sauvegarde = {
              niveau: "jeu2",
              nbDiamant: this.diamondCount,
              nbVie: this.playerLife,
              checkpoint: checkpoint,
              // positionX: this.player.x,
              // positionY: this.player.y,
            }
            localStorage.setItem(`sauvegardeJeu`, JSON.stringify(sauvegarde));
          });
          /* if (sauvegarde) {
             this.player.x = sauvegarde.positionX;
             this.player.y = sauvegarde.positionY;
           } */

          this.scene.start("jeu2");
        });
      } else if (!this.diamondMessageCooldown && this.diamondCount < 4) {
        this.showPlayerDialogue("Je ne devrais pas partir avant d'avoir tous les diamants.");
        this.diamondMessageCooldown = true;
      }
    });
  }

  handleDiamondPickup() {
    this.diamonds.forEach((diamond) => {
      this.physics.add.overlap(this.player, diamond, () => {
        this.diamondCount++;
        this.textCounter.setText(this.diamondCount);
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
      this.handlePlayerIsHit(1);
      //console.log(this.playerLife);
      this.handleHealthPickup();
      this.handleHud();
      this.cameras.main.shake(200, 0.01);
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
      const delay = i * Phaser.Math.Between(2000, 4000);
      const bird = new Bird(this, delay);
      this.birds.push(bird);
    }
  }

  createPlant01() {
    this.plant01 = this.physics.add.sprite(config.width / 2 - 100, config.height / 2 + 1000, "plant_idle");
    this.plant01.body.setBounce(0).setSize(20, 0).setOffset(20, 30).setCollideWorldBounds(true);
    this.plant01.setScale(2).setDepth(1);
    this.plant01isHit = false;
    this.plant01.hitCooldown = null;

    this.plant01.direction = 1;
    this.plant01.attackRange = 80;
    this.plant01.attackCooldown = 0;
    this.plant01.canAttack = true;

    this.plant01.anims.play("plant_idle", true);
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

    this.enemy04 = this.physics.add.sprite(config.width / 2 + 100, config.height / 2 + 800, "enemy04_idle");
    this.enemy04.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
    this.enemy04.setScale(2).setDepth(1);
    this.enemy04isHit = false;
    this.enemy04.hitCooldown = null;

    this.enemy04.speed = 50;
    this.enemy04.direction = 1;
    this.enemy04.initialX = this.enemy04.x;
    this.enemy04.stunned = false;

    this.enemy04.attackRange = 350;
    this.enemy04.attackCooldown = 0;
    this.enemy04.canAttack = true;
    this.enemy04.patrolTimer = 0;
    this.enemy04.isPatrolling = true;
    this.enemy04.patrolLeftLimit = this.enemy04.initialX - 100;
    this.enemy04.patrolRightLimit = this.enemy04.initialX + 100;
    this.enemy04.anims.play("enemy04_idle", true);

  }

  createEnemyLife() {
    this.plant01Life = 2;
    this.enemy02Life = 3;
    this.enemy02_bLife = 3;
    this.enemy03Life = 5;
    this.enemy03_bLife = 9;
    this.enemy04Life = 2;

    this.enemies = [this.plant01, this.enemy02, this.enemy02_b, this.enemy03, this.enemy03_b, this.enemy04];
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
        //enemy.hit();
        if (enemy) {
          switch (enemy) {
            case this.plant01:
              if (this.plant01Life > 0) {
                this.plant01Life--;
                this.plant01isHit = true;
                this.plant01.play("plant_hit", true);
                this.hitSound03.play();
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
                this.enemy04isHit = true
                this.enemy04.play("enemy04_hit", true);
                this.hitSound03.play();
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
      this.handlePlayerIsHit(2);
      this.handleHud();
      this.handleHealthPickup();
      this.cameras.main.shake(300, 0.01);
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

  createEnemyHitboxB(enemy) {

    if (enemy.hitbox) return;

    enemy.hitbox = this.add.zone(
      enemy.x + (enemy.flipX ? 45 : -45),
      enemy.y + 30,
      50,
      50
    );
    this.physics.add.existing(enemy.hitbox);
    enemy.hitbox.body.setAllowGravity(false);
    enemy.hitbox.body.setImmovable(true);

    this.physics.add.overlap(enemy.hitbox, this.player, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit(2);
      this.handleHud();
      this.handleHealthPickup();
      this.cameras.main.shake(300, 0.01);
      enemy.hitbox.destroy();
      enemy.hitbox = null;
    });

    this.time.delayedCall(200, () => {
      if (enemy.hitbox) {
        enemy.hitbox.destroy();
        enemy.hitbox = null;
      }
    });
  }

  createEnemyHitboxC(enemy) {

    if (enemy.hitbox) return;

    enemy.hitbox = this.add.zone(
      enemy.x + (enemy.flipX ? -95 : 55),
      enemy.y + 30,
      20,
      20
    );
    this.physics.add.existing(enemy.hitbox);
    enemy.hitbox.body.setAllowGravity(false);
    enemy.hitbox.body.setImmovable(true);

    this.physics.add.overlap(enemy.hitbox, this.player, () => {
      if (this.player.alpha != 1 || this.playerIsDead) return;
      this.handlePlayerIsHit(2);
      this.handleHud();
      this.handleHealthPickup();
      this.cameras.main.shake(300, 0.01);
      enemy.hitbox.destroy();
      enemy.hitbox = null;
    });

    this.time.delayedCall(200, () => {
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

      if (this.plant01 && this.plant01.active) {
        this.handlePlant01Behavior();
      }
      if (this.enemy02 && this.enemy02.active) {
        this.handleEnemy02Behavior();
      }
      if (this.enemy02_b && this.enemy02_b.active) {
        this.handleEnemy02_bBehavior();
      }
      if (this.enemy03 && this.enemy03.active) {
        this.handleEnemy03Behavior();
      }
      if (this.enemy03_b && this.enemy03_b.active) {
        this.handleEnemy03_bBehavior();
      }

      if (this.enemy04 && this.enemy04.active) {
        this.handleEnemy04Behavior();
      }
    }

    //console.log(`Player Position - x: ${this.player.x}, y: ${this.player.y}`);
    //console.log(`Player Life Initialized: ${this.playerLife}, Max Life: ${this.maxPlayerLife}`);
  }

  handlePlant01Behavior() {
    if (!this.plant01 || this.plant01Life <= 0) return;

    if (this.plant01isHit) {
      this.plant01.setVelocityX(0);

      if (this.plant01.hitbox) {
        this.plant01.hitbox.destroy();
        this.plant01.hitbox = null;
      }

      if (!this.plant01.hitCooldown) {
        this.plant01.hitCooldown = this.time.delayedCall(500, () => {
          this.plant01isHit = false;
          this.plant01.hitCooldown = null;
          this.plant01.canAttack = true;
          this.plant01.attackCooldown = 0;
          if (this.plant01 && this.plant01.anims && !this.plant01.anims.isPlaying) {
            this.plant01.anims.play("plant_idle", true);
          }
        });
      }
      this.plant01.isAttacking = false;
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.plant01.x,
      this.plant01.y,
      this.player.x,
      this.player.y
    );

    if (this.player.x > this.plant01.x) {
      this.plant01.flipX = true;
    } else {
      this.plant01.flipX = false;
    }

    if (distanceToPlayer < this.plant01.attackRange) {
      if (this.plant01.canAttack && this.plant01.attackCooldown <= 0 && !this.plant01.isAttacking) {
        this.plant01.isAttacking = true;
        this.plant01.canAttack = false;
        this.plant01.attackCooldown = 1500;

        if (this.plant01 && this.plant01.anims) {
          this.plant01.anims.play("plant_attack", true);
        }

        this.plant01.on('animationupdate', (animation, frame) => {
          if (animation.key === "plant_attack" && frame.index === 6 && !this.plant01.hitbox) {
            this.createEnemyHitboxB(this.plant01);

            if (!this.plant01isHit) {
              this.hitSound02.play();
            }
          }
        });

        this.plant01.on('animationcomplete-plant_attack', () => {
          this.plant01.isAttacking = false;
          this.plant01.canAttack = true;

          if (this.plant01.hitbox) {
            this.plant01.hitbox.destroy();
            this.plant01.hitbox = null;
          }

          this.plant01.anims.play("plant_idle", true);
          this.plant01.postAttackCooldown = true;
          this.time.delayedCall(600, () => {
            this.plant01.postAttackCooldown = false;
          });

          this.plant01.attackCooldown = 0;
        });
      } else {
        if (!this.plant01.isAttacking) {
          this.plant01.setVelocityX(0);
          if (this.plant01 && this.plant01.anims && (!this.plant01.anims.isPlaying || this.plant01.anims.currentAnim.key !== "plant_idle")) {
            this.plant01.anims.play("plant_idle", true);
          }
        }
      }
    } else {
      if (!this.plant01.isAttacking) {
        this.plant01.setVelocityX(0);
        if (this.plant01 && this.plant01.anims && (!this.plant01.anims.isPlaying || this.plant01.anims.currentAnim.key !== "plant_idle")) {
          this.plant01.anims.play("plant_idle", true);
        }
      }
    }
  }

  handleEnemy02Behavior() {
    if (this.enemy02Life <= 0 || !this.enemy02) return;

    if (this.enemy02) {

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


            this.enemy02.anims.play("enemy02_attack", true);

            this.enemy02.on('animationupdate', (animation, frame) => {
              if (animation.key === "enemy02_attack" && frame.index === 2 && !this.enemy02.hitbox) {

                if (!this.enemy02isHit) {
                  this.hitSound02.play();

                  this.createEnemyHitbox(this.enemy02);
                }
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
  }

  handleEnemy02_bBehavior() {
    if (this.enemy02_bLife <= 0 || !this.enemy02_b) return;

    if (this.enemy02_b) {

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

            this.enemy02_b.anims.play("enemy02_attack", true);

            this.enemy02_b.on('animationupdate', (animation, frame) => {
              if (animation.key === "enemy02_attack" && frame.index === 2 && !this.enemy02_b.hitbox) {
                if (!this.enemy02_bisHit) {
                  this.hitSound02.play();
                  this.createEnemyHitbox(this.enemy02_b);
                }

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
  }

  handleEnemy03Behavior() {
    if (this.enemy03Life <= 0 || !this.enemy03) return;

    if (this.enemy03) {
      const maxChaseDistance = 350;

      if (this.enemy03isHit) {
        this.enemy03.setVelocityX(0);

        if (this.enemy03.hitbox) {
          this.enemy03.hitbox.destroy();
          this.enemy03.hitbox = null;
        }

        if (!this.enemy03.hitCooldown) {
          this.enemy03.hitCooldown = this.time.delayedCall(1000, () => {
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

            this.enemy03.anims.play("enemy03_attack", true);
            this.enemy03.on('animationupdate', (animation, frame) => {
              if (animation.key === "enemy03_attack" && frame.index === 2 && !this.enemy03.hitbox) {
                this.time.delayedCall(490, () => {
                  if (!this.enemy03isHit) {
                    this.hitSound02.play();
                    this.createEnemyHitbox(this.enemy03);
                  }
                });
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
  }

  handleEnemy03_bBehavior() {
    if (this.enemy03_bLife <= 0 || !this.enemy03_b || !this.enemy03_b.active) return;

    if (this.enemy03_b.active) {

      if (this.enemy03_bisHit) {
        this.enemy03_b.setVelocityX(0);

        if (this.enemy03_b.hitbox) {
          this.enemy03_b.hitbox.destroy();
          this.enemy03_b.hitbox = null;
        }

        if (!this.enemy03_b.hitCooldown) {
          this.enemy03_b.hitCooldown = this.time.delayedCall(1000, () => {
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


            this.enemy03_b.anims.play("enemy03_attack", true);

            this.enemy03_b.on('animationupdate', (animation, frame) => {
              if (animation.key === "enemy03_attack" && frame.index === 2 && !this.enemy03_b.hitbox) {

                this.time.delayedCall(490, () => {
                  if (!this.enemy03_bisHit) {
                    this.hitSound02.play();
                    this.createEnemyHitbox(this.enemy03_b);
                  }
                });
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
  }

  handleEnemy04Behavior() {
    if (this.enemy04Life <= 0 || !this.enemy04 || !this.enemy04.active) return;

    const maxChaseDistance = 500;
    const patrolLeftLimit = this.enemy04.initialX - 100;
    const patrolRightLimit = this.enemy04.initialX + 100;

    if (this.enemy04isHit) {
      this.enemy04.setVelocityX(0);

      if (this.enemy04.hitbox) {
        this.enemy04.hitbox.destroy();
        this.enemy04.hitbox = null;
      }

      if (!this.enemy04.hitCooldown) {
        this.enemy04.hitCooldown = this.time.delayedCall(1000, () => {
          this.enemy04isHit = false;
          this.enemy04.hitCooldown = null;
          this.enemy04.canAttack = true;
          this.enemy04.attackCooldown = 0;
          this.enemy04.anims.play("enemy04_idle", true);
          this.enemy04.isPatrolling = true;
        });
      }

      this.enemy04.isAttacking = false;
      this.enemy04.anims.play("enemy04_hit", true);
      this.enemy04.anims.currentAnim.loop = false;

      this.enemy04.on('animationcomplete-enemy04_hit', () => {
        this.enemy04.anims.play("enemy04_idle", true);
        this.enemy04.isPatrolling = true;
      });

      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(
      this.enemy04.x,
      this.enemy04.y,
      this.player.x,
      this.player.y
    );

    const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
      this.enemy04.x,
      this.enemy04.y,
      this.enemy04.initialX,
      this.enemy04.y
    );

    const chaseSpeedMultiplier = 2;

    if (this.enemy04.isAttacking || this.enemy04.postAttackCooldown) {
      this.enemy04.setVelocityX(0);
      return;
    }


    if (distanceFromOriginalSpot > maxChaseDistance) {
      this.enemy04.initialX = this.enemy04.x;
      this.enemy04.patrolLeftLimit = this.enemy04.initialX - 100;
      this.enemy04.patrolRightLimit = this.enemy04.initialX + 100;

      this.enemy04.isPatrolling = true;
      this.enemy04.direction = (this.enemy04.x > this.enemy04.initialX) ? -1 : 1;
      this.enemy04.setVelocityX(this.enemy04.speed * this.enemy04.direction);


      if (this.enemy04.direction === -1 && !this.enemy04.flipX) {
        this.enemy04.flipX = true;
        this.enemy04.setOrigin(1, 0.5);
        this.enemy04.setOffset(40, 20);
      } else if (this.enemy04.direction === 1 && this.enemy04.flipX) {
        this.enemy04.flipX = false;
        this.enemy04.setOrigin(0.5, 0.5);
        this.enemy04.setOffset(10, 20);
      }
      return;
    }

    if (distanceToPlayer < this.enemy04.attackRange) {
      const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.enemy04.x) ||
        (!this.player.flipX && this.player.x < this.enemy04.x);

      const minimumAttackDistance = this.enemy04.flipX ? (isPlayerFacingEnemy ? 95 : 135) : (isPlayerFacingEnemy ? 55 : 85);

      if (distanceToPlayer > minimumAttackDistance) {
        if (this.player.x < this.enemy04.x) {
          this.enemy04.setVelocityX(-this.enemy04.speed * chaseSpeedMultiplier);
          this.enemy04.direction = -1;
          if (!this.enemy04.flipX) {
            this.enemy04.flipX = true;
            this.enemy04.setOrigin(1, 0.5);
            this.enemy04.setOffset(40, 20);
          }
        } else {
          this.enemy04.setVelocityX(this.enemy04.speed * chaseSpeedMultiplier);
          this.enemy04.direction = 1;
          if (this.enemy04.flipX) {
            this.enemy04.flipX = false;
            this.enemy04.setOrigin(0.5, 0.5);
            this.enemy04.setOffset(10, 20);
          }
        }
        this.enemy04.anims.play("enemy04_walk", true);
      } else {
        this.enemy04.setVelocityX(0);
        if (this.enemy04.canAttack && this.enemy04.attackCooldown <= 0) {
          this.enemy04.isAttacking = true;
          this.enemy04.canAttack = false;
          this.enemy04.attackCooldown = 1500;


          this.enemy04.anims.play("enemy04_attack", true);

          this.enemy04.on('animationupdate', (animation, frame) => {
            if (animation.key === "enemy04_attack" && frame.index === 2 && !this.enemy04.hitbox) {
              this.createEnemyHitboxC(this.enemy04);

              if (!this.enemy04isHit) {
                this.hitSound02.play();
              }
            }
          });

          this.enemy04.on('animationcomplete-enemy04_attack', () => {
            this.enemy04.isAttacking = false;
            this.enemy04.canAttack = true;

            if (this.enemy04.hitbox) {
              this.enemy04.hitbox.destroy();
              this.enemy04.hitbox = null;
            }

            this.enemy04.anims.play("enemy04_idle", true);
            this.enemy04.postAttackCooldown = true;

            this.time.delayedCall(600, () => {
              this.enemy04.postAttackCooldown = false;
              const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                this.enemy04.x,
                this.enemy04.y,
                this.player.x,
                this.player.y
              );
              if (currentDistanceToPlayer <= this.enemy04.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                if (this.player.x < this.enemy04.x && !this.enemy04.flipX) {
                  this.enemy04.flipX = true;
                  this.enemy04.setOrigin(1, 0.5);
                  this.enemy04.setOffset(40, 20);
                } else if (this.player.x > this.enemy04.x && this.enemy04.flipX) {
                  this.enemy04.flipX = false;
                  this.enemy04.setOrigin(0.5, 0.5);
                  this.enemy04.setOffset(10, 20);
                }
                this.enemy04.anims.play("enemy04_attack", true);

              } else if (currentDistanceToPlayer < this.enemy04.attackRange) {
                this.enemy04.anims.play("enemy04_walk", true);
              } else {
                this.enemy04.anims.play("enemy04_idle", true);
              }
              this.enemy04.attackCooldown = 0;
            });
          });
        } else {
          if (!this.enemy04.anims.isPlaying) {
            this.enemy04.anims.play("enemy04_idle", true);
          }
        }
      }
    } else {
      if (this.enemy04.body.onFloor()) {
        if (this.enemy04.isPatrolling) {
          if (this.enemy04.x <= patrolLeftLimit) {
            this.enemy04.direction = 1;
            this.enemy04.setVelocityX(this.enemy04.speed);
            if (this.enemy04.flipX) {
              this.enemy04.flipX = false;
              this.enemy04.setOrigin(0.5, 0.5);
              this.enemy04.setOffset(10, 20);
            }
          } else if (this.enemy04.x >= patrolRightLimit) {
            this.enemy04.direction = -1;
            this.enemy04.setVelocityX(-this.enemy04.speed);
            if (!this.enemy04.flipX) {
              this.enemy04.flipX = true;
              this.enemy04.setOrigin(1, 0.5);
              this.enemy04.setOffset(40, 20);
            }
          } else {
            this.enemy04.setVelocityX(this.enemy04.speed * this.enemy04.direction);
          }

          if (!this.enemy04.anims.isPlaying || this.enemy04.anims.currentAnim.key !== "enemy04_walk") {
            this.enemy04.anims.play("enemy04_walk", true);
          }
        }
      }
    }
  }

  handleEnemyLife() {
    if (this.plant01) {
      if (this.plant01Life <= 0) {
        this.plant01.body.enable = false;
        this.plant01.anims.play("plant_death");
        this.enemyDeathSound.play();
        this.plant01.on("animationcomplete", () => {
          //this.plant01.destroy();
          this.plant01.setActive(false);
          this.plant01.setVisible(false);
          this.time.delayedCall(350, () => {
            this.plant01.destroy();
            this.plant01 = null;
          });
        });
      }
    }

    if (this.enemy02) {
      if (this.enemy02Life <= 0) {
        this.enemy02.body.enable = false;
        this.enemy02.anims.play("enemy02_death");
        this.enemyDeathSound.play();
        this.enemy02.on("animationcomplete", () => {
          //this.enemy02.destroy();
          this.enemy02.setActive(false);
          this.enemy02.setVisible(false);
          this.time.delayedCall(350, () => {
            this.enemy02.destroy();
            this.enemy02 = null;
          });
        });
      }
    }

    if (this.enemy02_b) {
      if (this.enemy02_bLife <= 0) {
        this.enemy02_b.body.enable = false;
        this.enemy02_b.anims.play("enemy02_death");
        this.enemyDeathSound.play();
        this.enemy02_b.on("animationcomplete", () => {
          //this.enemy02_b.destroy();
          this.enemy02_b.setActive(false);
          this.enemy02_b.setVisible(false);
          this.time.delayedCall(350, () => {
            this.enemy02_b.destroy();
            this.enemy02_b = null;
          });
        });
      }
    }

    if (this.enemy03) {
      if (this.enemy03Life <= 0) {
        this.enemy03.body.enable = false;
        this.enemy03.anims.play("enemy03_death");
        this.enemyDeathSound.play();
        this.enemy03.on("animationcomplete", () => {
          //this.enemy03.destroy();
          this.enemy03.setActive(false);
          this.enemy03.setVisible(false);
          this.time.delayedCall(350, () => {
            this.enemy03.destroy();
            this.enemy03 = null;
          });
        });
      }
    }

    if (this.enemy03_b) {
      if (this.enemy03_bLife <= 0) {
        this.enemy03_b.body.enable = false;
        this.cameras.main.flash(550);
        this.enemy03_b.anims.play("enemy03_death");
        this.enemyDeathSound.play();
        this.surpriseSound.stop();
        this.time.delayedCall(2050, () => {
          if (!this.musicIsMuted) {
            this.bgMusic.play();
          }
        });
        this.enemy03_b.on("animationcomplete", () => {
          //this.enemy03_b.destroy();
          this.enemy03_b.setActive(false);
          this.enemy03_b.setVisible(false);
          this.time.delayedCall(350, () => {
            this.enemy03_b.destroy();
            this.enemy03_b = null;
          });

        });
      }
    }

    if (this.enemy04) {
      if (this.enemy04Life <= 0) {
        this.enemy04.body.enable = false;
        if (!this.enemy04.flipX) {
          this.enemy04.anims.play("enemy04_death").setPosition(this.enemy04.x - 25, this.enemy04.y);
          this.enemy04.setOrigin(0.5, 0.5);
          this.enemy04.setOffset(10, 20);
        } else if (this.enemy04.flipX) {
          this.enemy04.anims.play("enemy04_death").setPosition(this.enemy04.x + 40, this.enemy04.y);
          this.enemy04.setPosition(this.enemy04.x, this.enemy04.y)
          this.enemy04.setOrigin(1, 0.5);
          this.enemy04.setOffset(40, 20);
        }
        this.enemyDeathSound.play();
        this.time.delayedCall(200, () => {
          this.enemy04.setActive(false);
          this.enemy04.setVisible(false);
        })
        this.time.delayedCall(350, () => {
          this.enemy04.destroy();
          this.enemy04 = null;
        });
      }
    }
  }

  handlePlayerIsHit(damage) {
    if (this.player.alpha === 1) {
      this.playerLife -= damage;
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
          if (this.playerLife === 7) {
            this.playerLife += 1;
          } else {
            this.playerLife += 2;
          }
          heart.setActive(false);
          heart.setVisible(false);
          heart.destroy();
          this.itemPickupSound.play();
          this.handleHud();
        } else {
          console.log("MAX HP.");
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
    } else if (this.playerLife <= 0) {
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
          this.yesDaggerHud.setVisible(false);
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
                this.yesDaggerHud.setVisible(true);
                this.daggerRecuperatedSound.play();
              });
            } else {
              daggerThrown = false;
              this.yesDaggerHud.setVisible(true);
              this.daggerRecuperatedSound.play();
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
            case this.plant01:
              if (this.plant01Life > 0) {
                this.plant01.play("plant_hit", true);
                this.plant01Life--;
                this.plant01isHit = true;
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
              if (this.enemy04Life > 0) {
                this.enemy04Life--;
                this.enemy04.play("enemy04_hit", true);
                this.enemy04isHit = true;
              }
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
    // Mouvement avec A et D (gauche-droite)
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

    if (this.isAttackingOrThrowing) return;

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
        enemy.anims.stop();
      }
    });

    if (this.player) {
      this.player.setAlpha(0.7);
      this.tweens.killTweensOf(this.player);
    }
  }
}