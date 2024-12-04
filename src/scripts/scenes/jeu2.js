class Jeu2 extends Phaser.Scene {

    constructor() {
        super({
            key: "jeu2",
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
        this.createAnimationKey("plant_idle", "enemy_plant", 0, 7, 8, -1);
        this.createAnimationKey("plant_attack", "enemy_plant", 8, 15, 8, 0);
        this.createAnimationKey("plant_hit", "enemy_plant", 24, 26, 8, 0);
        this.createAnimationKey("plant_death", "destroy_effect", 0, 4, 8, 0);

        // ENEMY 02 - SORCERER DAGGER
        this.createAnimationKey("sorcerer_idle", "enemy_sorcerer", 0, 4, 6, -1);
        this.createAnimationKey("sorcerer_walk", "enemy_sorcerer", 5, 8, 6, -1);
        this.createAnimationKey("sorcerer_attack", "enemy_sorcerer", 10, 13, 8, 0);
        this.createAnimationKey("sorcerer_hit", "enemy_sorcerer", 15, 18, 8, 0);
        this.createAnimationKey("sorcerer_death", "enemy_sorcerer", 20, 24, 8, 0);

        // ENEMY 03 - TANK SORCERER - DAGGER
        this.createAnimationKey("tank_idle", "enemy_tank", 0, 4, 6, -1);
        this.createAnimationKey("tank_walk", "enemy_tank", 6, 11, 6, -1);
        this.createAnimationKey("tank_attack", "enemy_tank", 12, 17, 6, 0);
        this.createAnimationKey("tank_hit", "enemy_tank", 18, 22, 6, 0);
        this.createAnimationKey("tank_death", "enemy_tank", 24, 29, 6, 0);

        // ENEMY 04 - PLAGUE DOCTOR
        this.createAnimationKey("plague_idle", "enemy_plague", 0, 6, 8, -1);
        this.createAnimationKey("plague_walk", "enemy_plague", 7, 12, 8, -1);
        this.createAnimationKey("plague_attack", "enemy_plague", 13, 19, 8, 0);
        this.createAnimationKey("plague_hit", "enemy_plague", 25, 27, 8, 0);
        this.createAnimationKey("plague_death", "destroy_effect", 0, 4, 8, 0);

    }

    create() {

        niveau = "jeu2";

        const sauvegarde = JSON.parse(localStorage.getItem('sauvegardeJeu'));

        if (sauvegarde) {
            checkpoint = sauvegarde.checkpoint;
            niveau = sauvegarde.niveau;
            this.diamondCount = sauvegarde.nbDiamant;
            this.playerLife = sauvegarde.nbVie;
        }

        this.input.mouse.disableContextMenu();

        /* Commence le "cutscene" 

        this.game.cutscenePlayed = false;
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

        this.bgMusic = this.sound.add("jeuBg2", {
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
                this.scene.launch("pause02");
                this.surpriseSound.pause();
                this.bgMusic.pause();
                this.scene.pause();
                this.isPaused = true;
            } else {
                this.unpauseSound.play();
                this.scene.stop("pause02");
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
            key: "carte_crystal"
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

        const background01 = maCarte.addTilesetImage("background01", "crystal_background01_tile");
        const background02 = maCarte.addTilesetImage("background02", "crystal_background02_tile");
        const background03 = maCarte.addTilesetImage("background03", "crystal_background03_tile");
        const main_lev_build_1 = maCarte.addTilesetImage("main_lev_build_1", "crystal_background_main");
        const main_lev_build_2 = maCarte.addTilesetImage("main_lev_build_2", "crystal_background_other");
        const rocks = maCarte.addTilesetImage("rocks", "crystal_background_rocks");

        // ---------------- CRÉATION CALQUES BACKGROUND  ----------------

        // (Non collision)

        const background_sky = maCarte.createLayer("background_sky", [background01], 0, 0);
        const background_sky_front01 = maCarte.createLayer("background_sky_front01", [background02], 0, 0);
        const background_sky_front02 = maCarte.createLayer("background_sky_front02", [background03], 0, 0)
        const background_behind01 = maCarte.createLayer("background_behind01", [main_lev_build_2], 0, 0);
        const background_behind02 = maCarte.createLayer("background_behind02", [main_lev_build_2], 0, 0);
        const background_behind03 = maCarte.createLayer("background_behind03", [rocks], 0, 0);
        const background_trees = maCarte.createLayer("background_trees", [main_lev_build_1], 0, 0);
        const background_front01 = maCarte.createLayer("background_front01", [main_lev_build_1], 0, 0);


        // this.backgroundParallax = [background_sky, background_sky_front01, background_sky_front02, background_behind01, background_behind02, background_behind03];

        // (Avec collision)

        const collisionLayer01 = maCarte.createLayer("background_main01", [main_lev_build_1], 0, 0);
        const collisionLayer02 = maCarte.createLayer("background_main02", [main_lev_build_1], 0, 0);
        const collisionLayer03 = maCarte.createLayer("background_main03", [main_lev_build_1], 0, 0);
        const collisionLayer04 = maCarte.createLayer("background_main04", [main_lev_build_1], 0, 0);
        const collisionDanger = maCarte.createLayer("background_danger", [main_lev_build_1], 0, 0); // Pour blesser le joueur

        // ---------------- CRÉATION DES ENNEMIS ----------------

        this.createPlant01();

        this.createSorcerer01();
        this.createSorcerer02();

        this.createTank01();
        this.createTank02();

        this.createPlague01();

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
        collisionLayer03.setCollisionByProperty({
            collision: true
        });
        collisionLayer04.setCollisionByProperty({
            collision: true
        });

        collisionDanger.setCollisionByProperty({
            collision: true
        })

        // COLLISION DU JOUEUR AVEC LES CALQUES

        this.physics.add.collider(this.player, collisionLayer01);
        this.physics.add.collider(this.player, collisionLayer02);
        this.physics.add.collider(this.player, collisionLayer03);
        this.physics.add.collider(this.player, collisionLayer04);
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
        this.physics.add.collider(this.enemies, collisionLayer03);
        this.physics.add.collider(this.enemies, collisionLayer04);


        // COLLISION DAGGER AVEC LES CALQUES

        this.physics.add.collider(this.dagger, collisionLayer01);
        this.physics.add.collider(this.dagger, collisionLayer02);
        this.physics.add.collider(this.dagger, collisionLayer03);
        this.physics.add.collider(this.dagger, collisionLayer04);
        this.physics.add.collider(this.dagger, collisionDanger);

        // COLLISION JOUEUR ET HORS NIVEAU

        this.createExitOverlap();

        // COLLISION SURPRISE

        this.createSurpriseOverlap();

        // ----------------  RESCALE DE LA MAP (* 2) ---------------- 

        // (Alternative pour ne pas faire un zoom avec la caméra et que tout marche correctement)

        background_sky.setScale(2);
        background_sky_front01.setScale(2);
        background_sky_front02.setScale(2);
        background_behind01.setScale(2);
        background_behind02.setScale(2);
        background_behind03.setScale(2);
        background_front01.setScale(2);
        background_trees.setScale(2);
        collisionLayer01.setScale(2);
        collisionLayer02.setScale(2);
        collisionLayer03.setScale(2);
        collisionLayer04.setScale(2);
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

            if (!this.tank02.active) {
                this.tank02.setActive(true);
                this.tank02.setVisible(true);
                this.tank02.isHit = false;
                this.tank02.canAttack = true;
                this.tank02.attackCooldown = 0;
                this.tank02.anims.play("tank_walk", true);
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
                    this.scene.stop("jeu2");
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

                    this.scene.start("victoire");
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
            this.handlePlayerIsHit(2);
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

    createSorcerer01() {
        this.sorcerer01 = this.physics.add.sprite(800, config.height / 2 - 50, "sorcerer_idle");
        this.sorcerer01.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
        this.sorcerer01.setScale(3).setDepth(1);
        this.sorcerer01isHit = false;
        this.sorcerer01.hitCooldown = null

        this.sorcerer01.speed = 50;
        this.sorcerer01.direction = 1;
        this.sorcerer01.initialX = this.sorcerer01.x;

        this.sorcerer01.attackRange = 250;
        this.sorcerer01.attackCooldown = 0;
        this.sorcerer01.canAttack = true;
        this.sorcerer01.patrolTimer = 0;
        this.sorcerer01.isPatrolling = true;
        this.sorcerer01.patrolLeftLimit = this.sorcerer01.initialX - 100;
        this.sorcerer01.patrolRightLimit = this.sorcerer01.initialX + 100;
        this.sorcerer01.anims.play("sorcerer_idle", true);
    }

    createSorcerer02() {
        this.sorcerer02 = this.physics.add.sprite(2032, 744, "sorcerer_idle");
        this.sorcerer02.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
        this.sorcerer02.setScale(3).setDepth(1);
        this.sorcerer02isHit = false;
        this.sorcerer02.hitCooldown = null

        this.sorcerer02.speed = 50;
        this.sorcerer02.direction = 1;
        this.sorcerer02.initialX = this.sorcerer02.x;

        this.sorcerer02.attackRange = 250;
        this.sorcerer02.attackCooldown = 0;
        this.sorcerer02.canAttack = true;
        this.sorcerer02.patrolTimer = 0;
        this.sorcerer02.isPatrolling = true;
        this.sorcerer02.patrolLeftLimit = this.sorcerer02.initialX - 100;
        this.sorcerer02.patrolRightLimit = this.sorcerer02.initialX + 100;
        this.sorcerer02.anims.play("sorcerer_idle", true);
    }

    createTank01() {
        this.tank01 = this.physics.add.sprite(1200, config.height / 2 - 50, "tank_idle");
        this.tank01.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
        this.tank01.setScale(3).setDepth(1);
        this.tank01isHit = false;
        this.tank01.hitCooldown = null

        this.tank01.speed = 50;
        this.tank01.direction = 1;
        this.tank01.initialX = this.tank01.x;

        this.tank01.attackRange = 250;
        this.tank01.attackCooldown = 0;
        this.tank01.canAttack = true;
        this.tank01.patrolTimer = 0;
        this.tank01.isPatrolling = true;
        this.tank01.patrolLeftLimit = this.tank01.initialX - 100;
        this.tank01.patrolRightLimit = this.tank01.initialX + 100;
        this.tank01.anims.play("tank_idle", true);
    }

    createTank02() {
        this.tank02 = this.physics.add.sprite(2430, 1160, "tank_idle");
        this.tank02.body.setBounce(0).setSize(13, 22).setOffset(10, 10).setCollideWorldBounds(true);
        this.tank02.setScale(3).setDepth(1);
        this.tank02.setTint(0xFF6666);
        this.tank02isHit = false;
        this.tank02.hitCooldown = null;

        this.tank02.setActive(false);
        this.tank02.setVisible(false);

        this.tank02.speed = 50;
        this.tank02.direction = -1;
        this.tank02.initialX = this.tank02.x;

        this.tank02.attackRange = 250;
        this.tank02.attackCooldown = 0;
        this.tank02.canAttack = true;
        this.tank02.patrolTimer = 0;
        this.tank02.isPatrolling = true;
        this.tank02.patrolLeftLimit = this.tank02.initialX - 100;
        this.tank02.patrolRightLimit = this.tank02.initialX + 100;
        this.tank02.anims.play("tank_idle", true);
    }

    createPlague01() {

        this.plague01 = this.physics.add.sprite(config.width / 2 + 100, config.height / 2 + 800, "plague_idle");
        this.plague01.body.setBounce(0).setSize(20, 44).setOffset(10, 20).setCollideWorldBounds(true);
        this.plague01.setScale(2).setDepth(1);
        this.plague01isHit = false;
        this.plague01.hitCooldown = null;

        this.plague01.speed = 50;
        this.plague01.direction = 1;
        this.plague01.initialX = this.plague01.x;
        this.plague01.stunned = false;

        this.plague01.attackRange = 350;
        this.plague01.attackCooldown = 0;
        this.plague01.canAttack = true;
        this.plague01.patrolTimer = 0;
        this.plague01.isPatrolling = true;
        this.plague01.patrolLeftLimit = this.plague01.initialX - 100;
        this.plague01.patrolRightLimit = this.plague01.initialX + 100;
        this.plague01.anims.play("plague_idle", true);

    }

    createEnemyLife() {
        this.plant01Life = 6;
        this.sorcerer01Life = 8;
        this.sorcerer02Life = 8;
        this.tank01Life = 10;
        this.tank02Life = 16;
        this.plague01Life = 7;

        this.enemies = [this.plant01, this.sorcerer01, this.sorcerer02, this.tank01, this.tank02, this.plague01];
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
                                this.plant01Life -= 2;
                                this.plant01isHit = true;
                                this.plant01.play("plant_hit", true);
                                this.hitSound03.play();
                            }
                            break;
                        case this.sorcerer01:
                            if (this.sorcerer01Life > 0) {
                                this.sorcerer01Life -= 2;
                                this.sorcerer01isHit = true;
                                this.sorcerer01.play("sorcerer_hit", true);
                                this.hitSound03.play();
                            }
                            break;
                        case this.sorcerer02:
                            if (this.sorcerer02Life > 0) {
                                this.sorcerer02Life -= 2;
                                this.sorcerer02isHit = true;
                                this.sorcerer02.play("sorcerer_hit", true);
                                this.hitSound03.play();
                            }
                            break;
                        case this.tank01:
                            if (this.tank01Life > 0) {
                                this.tank01Life -= 2;
                                this.tank01isHit = true;
                                this.tank01.play("tank_hit", true);
                                this.hitSound04.play();
                            }
                            break;
                        case this.tank02:
                            if (this.tank02Life > 0) {
                                this.tank02Life -= 2;
                                this.tank02isHit = true;
                                this.tank02.play("tank_hit", true);
                                this.hitSound04.play();
                            }
                            break;
                        case this.plague01:
                            if (this.plague01Life > 0) {
                                this.plague01Life -= 2;
                                this.plague01isHit = true
                                this.plague01.play("plague_hit", true);
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
            this.handlePlayerIsHit(1);
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

    createEnemyHitboxD(enemy) {

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
            this.handlePlayerIsHit(3);
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

    update() {
        if (!this.playerIsDead) {
            //this.handleParallax();
            this.handlePlayerMovement();
            this.handlePlayerAnimations();

            if (this.plant01 && this.plant01.active) {
                this.handlePlant01Behavior();
            }
            if (this.sorcerer01 && this.sorcerer01.active) {
                this.handleSorcerer01Behavior();
            }
            if (this.sorcerer02 && this.sorcerer02.active) {
                this.handleSorcerer02Behavior();
            }
            if (this.tank01 && this.tank01.active) {
                this.handleTank01Behavior();
            }
            if (this.tank02 && this.tank02.active) {
                this.handleTank02Behavior();
            }

            if (this.plague01 && this.plague01.active) {
                this.handlePlague01Behavior();
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

    handleSorcerer01Behavior() {
        if (this.sorcerer01Life <= 0 || !this.sorcerer01) return;

        if (this.sorcerer01) {

            const maxChaseDistance = 500;

            if (this.sorcerer01isHit) {
                this.sorcerer01.setVelocityX(0);

                if (this.sorcerer01.hitbox) {
                    this.sorcerer01.hitbox.destroy();
                    this.sorcerer01.hitbox = null;
                }

                if (!this.sorcerer01.hitCooldown) {
                    this.sorcerer01.hitCooldown = this.time.delayedCall(500, () => {
                        this.sorcerer01isHit = false;
                        this.sorcerer01.hitCooldown = null;
                        this.sorcerer01.isPatrolling = true;
                        this.sorcerer01.canAttack = true;
                        this.sorcerer01.attackCooldown = 0;
                        if (!this.sorcerer01.anims.isPlaying) {
                            this.sorcerer01.anims.play("sorcerer_idle", true);
                        }
                    });
                }
                this.sorcerer01.isAttacking = false;
                return;
            }

            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.sorcerer01.x,
                this.sorcerer01.y,
                this.player.x,
                this.player.y
            );

            const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
                this.sorcerer01.x,
                this.sorcerer01.y,
                this.sorcerer01.initialX,
                this.sorcerer01.y
            );

            const patrolLeftLimit = this.sorcerer01.initialX - 100;
            const patrolRightLimit = this.sorcerer01.initialX + 100;
            const chaseSpeedMultiplier = 2;

            if (this.sorcerer01.isAttacking || this.sorcerer01.postAttackCooldown) {
                this.sorcerer01.setVelocityX(0);
                return;
            }

            if (distanceFromOriginalSpot > maxChaseDistance) {
                this.sorcerer01.initialX = this.sorcerer01.x;
                this.sorcerer01.patrolLeftLimit = this.sorcerer01.initialX - 100;
                this.sorcerer01.patrolRightLimit = this.sorcerer01.initialX + 100;

                this.sorcerer01.isPatrolling = true;
                this.sorcerer01.direction = (this.sorcerer01.x > this.sorcerer01.initialX) ? -1 : 1;
                this.sorcerer01.setVelocityX(this.sorcerer01.speed * this.sorcerer01.direction);
                return;
            }

            if (this.sorcerer01.isAttacking) {
                this.sorcerer01.setVelocityX(0);
                return;
            }

            if (this.sorcerer01.postAttackCooldown) {
                return;
            }

            if (distanceToPlayer < this.sorcerer01.attackRange) {
                const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.sorcerer01.x) ||
                    (!this.player.flipX && this.player.x < this.sorcerer01.x);

                const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

                if (distanceToPlayer > minimumAttackDistance) {
                    if (this.player.x < this.sorcerer01.x) {
                        this.sorcerer01.setVelocityX(-this.sorcerer01.speed * chaseSpeedMultiplier);
                        this.sorcerer01.direction = -1;
                    } else {
                        this.sorcerer01.setVelocityX(this.sorcerer01.speed * chaseSpeedMultiplier);
                        this.sorcerer01.direction = 1;
                    }
                    this.sorcerer01.anims.play("sorcerer_walk", true);
                } else {
                    this.sorcerer01.setVelocityX(0);
                    if (this.sorcerer01.canAttack && this.sorcerer01.attackCooldown <= 0) {
                        this.sorcerer01.isAttacking = true;
                        this.sorcerer01.canAttack = false;
                        this.sorcerer01.attackCooldown = 1500;


                        this.sorcerer01.anims.play("sorcerer_attack", true);

                        this.sorcerer01.on('animationupdate', (animation, frame) => {
                            if (animation.key === "sorcerer_attack" && frame.index === 2 && !this.sorcerer01.hitbox) {

                                if (!this.sorcerer01isHit) {
                                    this.hitSound02.play();

                                    this.createEnemyHitbox(this.sorcerer01);
                                }
                            }
                        });

                        this.sorcerer01.on('animationcomplete-sorcerer_attack', () => {
                            this.sorcerer01.isAttacking = false;
                            this.sorcerer01.canAttack = true;

                            if (this.sorcerer01.hitbox) {
                                this.sorcerer01.hitbox.destroy();
                                this.sorcerer01.hitbox = null;
                            }

                            this.sorcerer01.anims.play("sorcerer_idle", true);
                            this.sorcerer01.postAttackCooldown = true;

                            this.time.delayedCall(600, () => {
                                this.sorcerer01.postAttackCooldown = false;
                                const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                                    this.sorcerer01.x,
                                    this.sorcerer01.y,
                                    this.player.x,
                                    this.player.y
                                );
                                if (currentDistanceToPlayer <= this.sorcerer01.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                                    this.sorcerer01.anims.play("sorcerer_attack", true);
                                } else if (currentDistanceToPlayer < this.sorcerer01.attackRange) {
                                    this.sorcerer01.anims.play("sorcerer_walk", true);
                                } else {
                                    this.sorcerer01.anims.play("sorcerer_idle", true);
                                }
                                this.sorcerer01.attackCooldown = 0;
                            });
                        });
                    } else {
                        if (!this.sorcerer01.anims.isPlaying) {
                            this.sorcerer01.anims.play("sorcerer_idle", true);
                        }
                    }
                }
            } else {
                if (this.sorcerer01.body.onFloor()) {
                    if (this.sorcerer01.isPatrolling) {
                        if (this.sorcerer01.x <= patrolLeftLimit) {
                            this.sorcerer01.direction = 1;
                            this.sorcerer01.setVelocityX(this.sorcerer01.speed);
                        } else if (this.sorcerer01.x >= patrolRightLimit) {
                            this.sorcerer01.direction = -1;
                            this.sorcerer01.setVelocityX(-this.sorcerer01.speed);
                        } else {
                            this.sorcerer01.setVelocityX(this.sorcerer01.speed * this.sorcerer01.direction);
                        }
                        if (!this.sorcerer01.anims.isPlaying || this.sorcerer01.anims.currentAnim.key !== "sorcerer_walk") {
                            this.sorcerer01.anims.play("sorcerer_walk", true);
                        }
                    } else {
                        this.sorcerer01.setVelocityX(0);
                        if (!this.sorcerer01.anims.isPlaying || this.sorcerer01.anims.currentAnim.key !== "sorcerer_idle") {
                            this.sorcerer01.anims.play("sorcerer_idle", true);
                        }
                    }
                } else {
                    this.sorcerer01.setVelocityX(0);
                    if (!this.sorcerer01.anims.isPlaying || this.sorcerer01.anims.currentAnim.key !== "sorcerer_idle") {
                        this.sorcerer01.anims.play("sorcerer_idle", true);
                    }
                }
            }
            this.sorcerer01.flipX = this.sorcerer01.direction === 1;
        }
    }

    handleSorcerer02Behavior() {
        if (this.sorcerer02Life <= 0 || !this.sorcerer02) return;

        if (this.sorcerer02) {

            const maxChaseDistance = 500;

            if (this.sorcerer02isHit) {
                this.sorcerer02.setVelocityX(0);

                if (this.sorcerer02.hitbox) {
                    this.sorcerer02.hitbox.destroy();
                    this.sorcerer02.hitbox = null;
                }

                if (!this.sorcerer02.hitCooldown) {
                    this.sorcerer02.hitCooldown = this.time.delayedCall(500, () => {
                        this.sorcerer02isHit = false;
                        this.sorcerer02.hitCooldown = null;
                        this.sorcerer02.isPatrolling = true;
                        this.sorcerer02.canAttack = true;
                        this.sorcerer02.attackCooldown = 0;
                        if (!this.sorcerer02.anims.isPlaying) {
                            this.sorcerer02.anims.play("sorcerer_idle", true);
                        }
                    });
                }
                this.sorcerer02.isAttacking = false;
                return;
            }

            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.sorcerer02.x,
                this.sorcerer02.y,
                this.player.x,
                this.player.y
            );

            const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
                this.sorcerer02.x,
                this.sorcerer02.y,
                this.sorcerer02.initialX,
                this.sorcerer02.y
            );

            const patrolLeftLimit = this.sorcerer02.initialX - 100;
            const patrolRightLimit = this.sorcerer02.initialX + 100;
            const chaseSpeedMultiplier = 2;

            if (this.sorcerer02.isAttacking || this.sorcerer02.postAttackCooldown) {
                this.sorcerer02.setVelocityX(0);
                return;
            }

            if (distanceFromOriginalSpot > maxChaseDistance) {
                this.sorcerer02.initialX = this.sorcerer02.x;
                this.sorcerer02.patrolLeftLimit = this.sorcerer02.initialX - 100;
                this.sorcerer02.patrolRightLimit = this.sorcerer02.initialX + 100;

                this.sorcerer02.isPatrolling = true;
                this.sorcerer02.direction = (this.sorcerer02.x > this.sorcerer02.initialX) ? -1 : 1;
                this.sorcerer02.setVelocityX(this.sorcerer02.speed * this.sorcerer02.direction);
                return;
            }

            if (this.sorcerer02.isAttacking) {
                this.sorcerer02.setVelocityX(0);
                return;
            }

            if (this.sorcerer02.postAttackCooldown) {
                return;
            }

            if (distanceToPlayer < this.sorcerer02.attackRange) {
                const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.sorcerer02.x) ||
                    (!this.player.flipX && this.player.x < this.sorcerer02.x);

                const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

                if (distanceToPlayer > minimumAttackDistance) {
                    if (this.player.x < this.sorcerer02.x) {
                        this.sorcerer02.setVelocityX(-this.sorcerer02.speed * chaseSpeedMultiplier);
                        this.sorcerer02.direction = -1;
                    } else {
                        this.sorcerer02.setVelocityX(this.sorcerer02.speed * chaseSpeedMultiplier);
                        this.sorcerer02.direction = 1;
                    }
                    this.sorcerer02.anims.play("sorcerer_walk", true);
                } else {
                    this.sorcerer02.setVelocityX(0);
                    if (this.sorcerer02.canAttack && this.sorcerer02.attackCooldown <= 0) {
                        this.sorcerer02.isAttacking = true;
                        this.sorcerer02.canAttack = false;
                        this.sorcerer02.attackCooldown = 1500;

                        this.sorcerer02.anims.play("sorcerer_attack", true);

                        this.sorcerer02.on('animationupdate', (animation, frame) => {
                            if (animation.key === "sorcerer_attack" && frame.index === 2 && !this.sorcerer02.hitbox) {
                                if (!this.sorcerer02isHit) {
                                    this.hitSound02.play();
                                    this.createEnemyHitbox(this.sorcerer02);
                                }

                            }
                        });

                        this.sorcerer02.on('animationcomplete-sorcerer_attack', () => {
                            this.sorcerer02.isAttacking = false;
                            this.sorcerer02.canAttack = true;

                            if (this.sorcerer02.hitbox) {
                                this.sorcerer02.hitbox.destroy();
                                this.sorcerer02.hitbox = null;
                            }

                            this.sorcerer02.anims.play("sorcerer_idle", true);
                            this.sorcerer02.postAttackCooldown = true;

                            this.time.delayedCall(600, () => {
                                this.sorcerer02.postAttackCooldown = false;
                                const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                                    this.sorcerer02.x,
                                    this.sorcerer02.y,
                                    this.player.x,
                                    this.player.y
                                );
                                if (currentDistanceToPlayer <= this.sorcerer02.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                                    this.sorcerer02.anims.play("sorcerer_attack", true);
                                } else if (currentDistanceToPlayer < this.sorcerer02.attackRange) {
                                    this.sorcerer02.anims.play("sorcerer_walk", true);
                                } else {
                                    this.sorcerer02.anims.play("sorcerer_idle", true);
                                }
                                this.sorcerer02.attackCooldown = 0;
                            });
                        });

                    } else {
                        if (!this.sorcerer02.anims.isPlaying) {
                            this.sorcerer02.anims.play("sorcerer_idle", true);
                        }
                    }
                }
            } else {
                if (this.sorcerer02.body.onFloor()) {
                    if (this.sorcerer02.isPatrolling) {
                        if (this.sorcerer02.x <= patrolLeftLimit) {
                            this.sorcerer02.direction = 1;
                            this.sorcerer02.setVelocityX(this.sorcerer02.speed);
                        } else if (this.sorcerer02.x >= patrolRightLimit) {
                            this.sorcerer02.direction = -1;
                            this.sorcerer02.setVelocityX(-this.sorcerer02.speed);
                        } else {
                            this.sorcerer02.setVelocityX(this.sorcerer02.speed * this.sorcerer02.direction);
                        }
                        if (!this.sorcerer02.anims.isPlaying || this.sorcerer02.anims.currentAnim.key !== "sorcerer_walk") {
                            this.sorcerer02.anims.play("sorcerer_walk", true);
                        }
                    } else {
                        this.sorcerer02.setVelocityX(0);
                        if (!this.sorcerer02.anims.isPlaying || this.sorcerer02.anims.currentAnim.key !== "sorcerer_idle") {
                            this.sorcerer02.anims.play("sorcerer_idle", true);
                        }
                    }
                } else {
                    this.sorcerer02.setVelocityX(0);
                    if (!this.sorcerer02.anims.isPlaying || this.sorcerer02.anims.currentAnim.key !== "sorcerer_idle") {
                        this.sorcerer02.anims.play("sorcerer_idle", true);
                    }
                }
            }
            this.sorcerer02.flipX = this.sorcerer02.direction === 1;
        }
    }

    handleTank01Behavior() {
        if (this.tank01Life <= 0 || !this.tank01) return;

        if (this.tank01) {
            const maxChaseDistance = 350;

            if (this.tank01isHit) {
                this.tank01.setVelocityX(0);

                if (this.tank01.hitbox) {
                    this.tank01.hitbox.destroy();
                    this.tank01.hitbox = null;
                }

                if (!this.tank01.hitCooldown) {
                    this.tank01.hitCooldown = this.time.delayedCall(1000, () => {
                        this.tank01isHit = false;
                        this.tank01.hitCooldown = null;
                        this.tank01.isPatrolling = true;
                        this.tank01.canAttack = true;
                        this.tank01.attackCooldown = 0;
                        if (!this.tank01.anims.isPlaying) {
                            this.tank01.anims.play("tank_idle", true);
                        }
                    });
                }
                this.tank01.isAttacking = false;
                return;
            }

            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.tank01.x,
                this.tank01.y,
                this.player.x,
                this.player.y
            );

            const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
                this.tank01.x,
                this.tank01.y,
                this.tank01.initialX,
                this.tank01.y
            );

            const patrolLeftLimit = this.tank01.initialX - 100;
            const patrolRightLimit = this.tank01.initialX + 100;
            const chaseSpeedMultiplier = 2;

            if (this.tank01.isAttacking || this.tank01.postAttackCooldown) {
                this.tank01.setVelocityX(0);
                return;
            }

            if (distanceFromOriginalSpot > maxChaseDistance) {
                this.tank01.initialX = this.tank01.x;
                this.tank01.patrolLeftLimit = this.tank01.initialX - 100;
                this.tank01.patrolRightLimit = this.tank01.initialX + 100;

                this.tank01.isPatrolling = true;
                this.tank01.direction = (this.tank01.x > this.tank01.initialX) ? -1 : 1;

                this.tank01.setVelocityX(this.tank01.speed * this.tank01.direction);

                return;
            }

            if (this.tank01.isAttacking) {
                this.tank01.setVelocityX(0);
                return;
            }

            if (this.tank01.postAttackCooldown) {
                return;
            }

            if (distanceToPlayer < this.tank01.attackRange) {
                const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.tank01.x) ||
                    (!this.player.flipX && this.player.x < this.tank01.x);

                const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

                if (distanceToPlayer > minimumAttackDistance) {
                    if (this.player.x < this.tank01.x) {
                        this.tank01.setVelocityX(-this.tank01.speed * chaseSpeedMultiplier);
                        this.tank01.direction = -1;
                    } else {
                        this.tank01.setVelocityX(this.tank01.speed * chaseSpeedMultiplier);
                        this.tank01.direction = 1;
                    }
                    this.tank01.anims.play("tank_walk", true);
                } else {
                    this.tank01.setVelocityX(0);
                    if (this.tank01.canAttack && this.tank01.attackCooldown <= 0) {
                        this.tank01.isAttacking = true;
                        this.tank01.canAttack = false;
                        this.tank01.attackCooldown = 1500;

                        this.tank01.anims.play("tank_attack", true);
                        this.tank01.on('animationupdate', (animation, frame) => {
                            if (animation.key === "tank_attack" && frame.index === 2 && !this.tank01.hitbox) {
                                this.time.delayedCall(490, () => {
                                    if (!this.tank01isHit) {
                                        this.hitSound02.play();
                                        this.createEnemyHitbox(this.tank01);
                                    }
                                });
                            }
                        });

                        this.tank01.on('animationcomplete-tank_attack', () => {
                            this.tank01.isAttacking = false;
                            this.tank01.canAttack = true;
                            if (this.tank01.hitbox) {
                                this.tank01.hitbox.destroy();
                                this.tank01.hitbox = null;
                            }

                            this.tank01.anims.play("tank_idle", true);
                            this.tank01.postAttackCooldown = true;

                            this.time.delayedCall(600, () => {
                                this.tank01.postAttackCooldown = false;
                                const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                                    this.tank01.x,
                                    this.tank01.y,
                                    this.player.x,
                                    this.player.y
                                );
                                if (currentDistanceToPlayer <= this.tank01.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                                    this.tank01.anims.play("tank_attack", true);
                                } else if (currentDistanceToPlayer < this.tank01.attackRange) {
                                    this.tank01.anims.play("tank_walk", true);
                                } else {
                                    this.tank01.anims.play("tank_idle", true);
                                }
                                this.tank01.attackCooldown = 0;
                            });
                        });
                    } else {
                        if (!this.tank01.anims.isPlaying) {
                            this.tank01.anims.play("tank_idle", true);
                        }
                    }
                }
            } else {
                if (this.tank01.body.onFloor()) {
                    if (this.tank01.isPatrolling) {
                        if (this.tank01.x <= patrolLeftLimit) {
                            this.tank01.direction = 1;
                            this.tank01.setVelocityX(this.tank01.speed);
                        } else if (this.tank01.x >= patrolRightLimit) {
                            this.tank01.direction = -1;
                            this.tank01.setVelocityX(-this.tank01.speed);
                        } else {
                            this.tank01.setVelocityX(this.tank01.speed * this.tank01.direction);
                        }
                        if (!this.tank01.anims.isPlaying || this.tank01.anims.currentAnim.key !== "tank_walk") {
                            this.tank01.anims.play("tank_walk", true);
                        }
                    } else {
                        this.tank01.setVelocityX(0);
                        if (!this.tank01.anims.isPlaying || this.tank01.anims.currentAnim.key !== "tank_idle") {
                            this.tank01.anims.play("tank_idle", true);
                        }
                    }
                } else {
                    this.tank01.setVelocityX(0);
                    if (!this.tank01.anims.isPlaying || this.tank01.anims.currentAnim.key !== "tank_idle") {
                        this.tank01.anims.play("tank_idle", true);
                    }
                }
            }
            this.tank01.flipX = this.tank01.direction === 1;
        }
    }

    handleTank02Behavior() {
        if (this.tank02Life <= 0 || !this.tank02 || !this.tank02.active) return;

        if (this.tank02.active) {

            if (this.tank02isHit) {
                this.tank02.setVelocityX(0);

                if (this.tank02.hitbox) {
                    this.tank02.hitbox.destroy();
                    this.tank02.hitbox = null;
                }

                if (!this.tank02.hitCooldown) {
                    this.tank02.hitCooldown = this.time.delayedCall(1000, () => {
                        this.tank02isHit = false;
                        this.tank02.hitCooldown = null;
                        this.tank02.canAttack = true;
                        this.tank02.attackCooldown = 0;
                        if (!this.tank02.anims.isPlaying) {
                            this.tank02.anims.play("tank_idle", true);
                        }
                    });
                }
                this.tank02.isAttacking = false;
                return;
            }

            const distanceToPlayer = Phaser.Math.Distance.Between(
                this.tank02.x,
                this.tank02.y,
                this.player.x,
                this.player.y
            );

            const chaseDistance = 600;

            if (this.tank02.isAttacking || this.tank02.postAttackCooldown) {
                this.tank02.setVelocityX(0);
                return;
            }

            if (distanceToPlayer < chaseDistance) {
                const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.tank02.x) ||
                    (!this.player.flipX && this.player.x < this.tank02.x);

                const minimumAttackDistance = isPlayerFacingEnemy ? 45 : 85;

                if (distanceToPlayer > minimumAttackDistance) {
                    if (this.player.x < this.tank02.x) {
                        this.tank02.setVelocityX(-this.tank02.speed * 2.8);
                        this.tank02.direction = -1;
                    } else {
                        this.tank02.setVelocityX(this.tank02.speed * 2.8);
                        this.tank02.direction = 1;
                    }
                    this.tank02.anims.play("tank_walk", true);
                } else {
                    this.tank02.setVelocityX(0);
                    if (this.tank02.canAttack && this.tank02.attackCooldown <= 0) {
                        this.tank02.isAttacking = true;
                        this.tank02.canAttack = false;
                        this.tank02.attackCooldown = 1500;


                        this.tank02.anims.play("tank_attack", true);

                        this.tank02.on('animationupdate', (animation, frame) => {
                            if (animation.key === "tank_attack" && frame.index === 2 && !this.tank02.hitbox) {

                                this.time.delayedCall(490, () => {
                                    if (!this.tank02isHit) {
                                        this.hitSound02.play();
                                        this.createEnemyHitboxD(this.tank02);
                                    }
                                });
                            }
                        });

                        this.tank02.on('animationcomplete-tank_attack', () => {
                            this.tank02.isAttacking = false;
                            this.tank02.canAttack = true;

                            if (this.tank02.hitbox) {
                                this.tank02.hitbox.destroy();
                                this.tank02.hitbox = null;
                            }

                            this.tank02.anims.play("tank_idle", true);
                            this.tank02.postAttackCooldown = true;

                            this.time.delayedCall(600, () => {
                                this.tank02.postAttackCooldown = false;
                                const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                                    this.tank02.x,
                                    this.tank02.y,
                                    this.player.x,
                                    this.player.y
                                );
                                if (currentDistanceToPlayer <= this.tank02.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                                    this.tank02.anims.play("tank_attack", true);
                                } else if (currentDistanceToPlayer < this.tank02.attackRange) {
                                    this.tank02.anims.play("tank_walk", true);
                                } else {
                                    this.tank02.anims.play("tank_idle", true);
                                }
                                this.tank02.attackCooldown = 0;
                            });
                        });
                    } else {
                        if (!this.tank02.anims.isPlaying) {
                            this.tank02.anims.play("tank_idle", true);
                        }
                    }
                }
            } else {
                if (this.tank02.body.onFloor()) {
                    if (this.tank02.isPatrolling) {
                        const patrolLeftLimit = this.tank02.initialX - 100;
                        const patrolRightLimit = this.tank02.initialX + 100;

                        if (this.tank02.x <= patrolLeftLimit) {
                            this.tank02.direction = 1;
                            this.tank02.setVelocityX(this.tank02.speed);
                        } else if (this.tank02.x >= patrolRightLimit) {
                            this.tank02.direction = -1;
                            this.tank02.setVelocityX(-this.tank02.speed);
                        } else {
                            this.tank02.setVelocityX(this.tank02.speed * this.tank02.direction);
                        }
                        if (!this.tank02.anims.isPlaying || this.tank02.anims.currentAnim.key !== "tank_walk") {
                            this.tank02.anims.play("tank_walk", true);
                        }
                    } else {
                        this.tank02.setVelocityX(0);
                        if (!this.tank02.anims.isPlaying || this.tank02.anims.currentAnim.key !== "tank_idle") {
                            this.tank02.anims.play("tank_idle", true);
                        }
                    }
                } else {
                    this.tank02.setVelocityX(0);
                    if (!this.tank02.anims.isPlaying || this.tank02.anims.currentAnim.key !== "tank_idle") {
                        this.tank02.anims.play("tank_idle", true);
                    }
                }
            }

            this.tank02.flipX = this.tank02.direction === 1;
        }
    }

    handlePlague01Behavior() {
        if (this.plague01Life <= 0 || !this.plague01 || !this.plague01.active) return;

        const maxChaseDistance = 500;
        const patrolLeftLimit = this.plague01.initialX - 100;
        const patrolRightLimit = this.plague01.initialX + 100;

        if (this.plague01isHit) {
            this.plague01.setVelocityX(0);

            if (this.plague01.hitbox) {
                this.plague01.hitbox.destroy();
                this.plague01.hitbox = null;
            }

            if (!this.plague01.hitCooldown) {
                this.plague01.hitCooldown = this.time.delayedCall(1000, () => {
                    this.plague01isHit = false;
                    this.plague01.hitCooldown = null;
                    this.plague01.canAttack = true;
                    this.plague01.attackCooldown = 0;
                    this.plague01.anims.play("plague_idle", true);
                    this.plague01.isPatrolling = true;
                });
            }

            this.plague01.isAttacking = false;
            this.plague01.anims.play("plague_hit", true);
            this.plague01.anims.currentAnim.loop = false;

            this.plague01.on('animationcomplete-plague_hit', () => {
                this.plague01.anims.play("plague_idle", true);
                this.plague01.isPatrolling = true;
            });

            return;
        }

        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.plague01.x,
            this.plague01.y,
            this.player.x,
            this.player.y
        );

        const distanceFromOriginalSpot = Phaser.Math.Distance.Between(
            this.plague01.x,
            this.plague01.y,
            this.plague01.initialX,
            this.plague01.y
        );

        const chaseSpeedMultiplier = 2;

        if (this.plague01.isAttacking || this.plague01.postAttackCooldown) {
            this.plague01.setVelocityX(0);
            return;
        }


        if (distanceFromOriginalSpot > maxChaseDistance) {
            this.plague01.initialX = this.plague01.x;
            this.plague01.patrolLeftLimit = this.plague01.initialX - 100;
            this.plague01.patrolRightLimit = this.plague01.initialX + 100;

            this.plague01.isPatrolling = true;
            this.plague01.direction = (this.plague01.x > this.plague01.initialX) ? -1 : 1;
            this.plague01.setVelocityX(this.plague01.speed * this.plague01.direction);


            if (this.plague01.direction === -1 && !this.plague01.flipX) {
                this.plague01.flipX = true;
                this.plague01.setOrigin(1, 0.5);
                this.plague01.setOffset(40, 20);
            } else if (this.plague01.direction === 1 && this.plague01.flipX) {
                this.plague01.flipX = false;
                this.plague01.setOrigin(0.5, 0.5);
                this.plague01.setOffset(10, 20);
            }
            return;
        }

        if (distanceToPlayer < this.plague01.attackRange) {
            const isPlayerFacingEnemy = (this.player.flipX && this.player.x > this.plague01.x) ||
                (!this.player.flipX && this.player.x < this.plague01.x);

            const minimumAttackDistance = this.plague01.flipX ? (isPlayerFacingEnemy ? 95 : 135) : (isPlayerFacingEnemy ? 55 : 85);

            if (distanceToPlayer > minimumAttackDistance) {
                if (this.player.x < this.plague01.x) {
                    this.plague01.setVelocityX(-this.plague01.speed * chaseSpeedMultiplier);
                    this.plague01.direction = -1;
                    if (!this.plague01.flipX) {
                        this.plague01.flipX = true;
                        this.plague01.setOrigin(1, 0.5);
                        this.plague01.setOffset(40, 20);
                    }
                } else {
                    this.plague01.setVelocityX(this.plague01.speed * chaseSpeedMultiplier);
                    this.plague01.direction = 1;
                    if (this.plague01.flipX) {
                        this.plague01.flipX = false;
                        this.plague01.setOrigin(0.5, 0.5);
                        this.plague01.setOffset(10, 20);
                    }
                }
                this.plague01.anims.play("plague_walk", true);
            } else {
                this.plague01.setVelocityX(0);
                if (this.plague01.canAttack && this.plague01.attackCooldown <= 0) {
                    this.plague01.isAttacking = true;
                    this.plague01.canAttack = false;
                    this.plague01.attackCooldown = 1500;


                    this.plague01.anims.play("plague_attack", true);

                    this.plague01.on('animationupdate', (animation, frame) => {
                        if (animation.key === "plague_attack" && frame.index === 2 && !this.plague01.hitbox) {
                            this.createEnemyHitboxC(this.plague01);

                            if (!this.plague01isHit) {
                                this.hitSound02.play();
                            }
                        }
                    });

                    this.plague01.on('animationcomplete-plague_attack', () => {
                        this.plague01.isAttacking = false;
                        this.plague01.canAttack = true;

                        if (this.plague01.hitbox) {
                            this.plague01.hitbox.destroy();
                            this.plague01.hitbox = null;
                        }

                        this.plague01.anims.play("plague_idle", true);
                        this.plague01.postAttackCooldown = true;

                        this.time.delayedCall(600, () => {
                            this.plague01.postAttackCooldown = false;
                            const currentDistanceToPlayer = Phaser.Math.Distance.Between(
                                this.plague01.x,
                                this.plague01.y,
                                this.player.x,
                                this.player.y
                            );
                            if (currentDistanceToPlayer <= this.plague01.attackRange && currentDistanceToPlayer <= minimumAttackDistance) {
                                if (this.player.x < this.plague01.x && !this.plague01.flipX) {
                                    this.plague01.flipX = true;
                                    this.plague01.setOrigin(1, 0.5);
                                    this.plague01.setOffset(40, 20);
                                } else if (this.player.x > this.plague01.x && this.plague01.flipX) {
                                    this.plague01.flipX = false;
                                    this.plague01.setOrigin(0.5, 0.5);
                                    this.plague01.setOffset(10, 20);
                                }
                                this.plague01.anims.play("plague_attack", true);

                            } else if (currentDistanceToPlayer < this.plague01.attackRange) {
                                this.plague01.anims.play("plague_walk", true);
                            } else {
                                this.plague01.anims.play("plague_idle", true);
                            }
                            this.plague01.attackCooldown = 0;
                        });
                    });
                } else {
                    if (!this.plague01.anims.isPlaying) {
                        this.plague01.anims.play("plague_idle", true);
                    }
                }
            }
        } else {
            if (this.plague01.body.onFloor()) {
                if (this.plague01.isPatrolling) {
                    if (this.plague01.x <= patrolLeftLimit) {
                        this.plague01.direction = 1;
                        this.plague01.setVelocityX(this.plague01.speed);
                        if (this.plague01.flipX) {
                            this.plague01.flipX = false;
                            this.plague01.setOrigin(0.5, 0.5);
                            this.plague01.setOffset(10, 20);
                        }
                    } else if (this.plague01.x >= patrolRightLimit) {
                        this.plague01.direction = -1;
                        this.plague01.setVelocityX(-this.plague01.speed);
                        if (!this.plague01.flipX) {
                            this.plague01.flipX = true;
                            this.plague01.setOrigin(1, 0.5);
                            this.plague01.setOffset(40, 20);
                        }
                    } else {
                        this.plague01.setVelocityX(this.plague01.speed * this.plague01.direction);
                    }

                    if (!this.plague01.anims.isPlaying || this.plague01.anims.currentAnim.key !== "plague_walk") {
                        this.plague01.anims.play("plague_walk", true);
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

        if (this.sorcerer01) {
            if (this.sorcerer01Life <= 0) {
                this.sorcerer01.body.enable = false;
                this.sorcerer01.anims.play("sorcerer_death");
                this.enemyDeathSound.play();
                this.sorcerer01.on("animationcomplete", () => {
                    //this.sorcerer01.destroy();
                    this.sorcerer01.setActive(false);
                    this.sorcerer01.setVisible(false);
                    this.time.delayedCall(350, () => {
                        this.sorcerer01.destroy();
                        this.sorcerer01 = null;
                    });
                });
            }
        }

        if (this.sorcerer02) {
            if (this.sorcerer02Life <= 0) {
                this.sorcerer02.body.enable = false;
                this.sorcerer02.anims.play("sorcerer_death");
                this.enemyDeathSound.play();
                this.sorcerer02.on("animationcomplete", () => {
                    //this.sorcerer02.destroy();
                    this.sorcerer02.setActive(false);
                    this.sorcerer02.setVisible(false);
                    this.time.delayedCall(350, () => {
                        this.sorcerer02.destroy();
                        this.sorcerer02 = null;
                    });
                });
            }
        }

        if (this.tank01) {
            if (this.tank01Life <= 0) {
                this.tank01.body.enable = false;
                this.tank01.anims.play("tank_death");
                this.enemyDeathSound.play();
                this.tank01.on("animationcomplete", () => {
                    //this.tank01.destroy();
                    this.tank01.setActive(false);
                    this.tank01.setVisible(false);
                    this.time.delayedCall(350, () => {
                        this.tank01.destroy();
                        this.tank01 = null;
                    });
                });
            }
        }

        if (this.tank02) {
            if (this.tank02Life <= 0) {
                this.tank02.body.enable = false;
                this.cameras.main.flash(550);
                this.tank02.anims.play("tank_death");
                this.enemyDeathSound.play();
                this.surpriseSound.stop();
                this.time.delayedCall(2050, () => {
                    if (!this.musicIsMuted) {
                        this.bgMusic.play();
                    }
                });
                this.tank02.on("animationcomplete", () => {
                    //this.tank02.destroy();
                    this.tank02.setActive(false);
                    this.tank02.setVisible(false);
                    this.time.delayedCall(350, () => {
                        this.tank02.destroy();
                        this.tank02 = null;
                    });

                });
            }
        }

        if (this.plague01) {
            if (this.plague01Life <= 0) {
                this.plague01.body.enable = false;
                if (!this.plague01.flipX) {
                    this.plague01.anims.play("plague_death").setPosition(this.plague01.x - 25, this.plague01.y);
                    this.plague01.setOrigin(0.5, 0.5);
                    this.plague01.setOffset(10, 20);
                } else if (this.plague01.flipX) {
                    this.plague01.anims.play("plague_death").setPosition(this.plague01.x + 40, this.plague01.y);
                    this.plague01.setPosition(this.plague01.x, this.plague01.y)
                    this.plague01.setOrigin(1, 0.5);
                    this.plague01.setOffset(40, 20);
                }
                this.enemyDeathSound.play();
                this.time.delayedCall(200, () => {
                    this.plague01.setActive(false);
                    this.plague01.setVisible(false);
                })
                this.time.delayedCall(350, () => {
                    this.plague01.destroy();
                    this.plague01 = null;
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
                        case this.sorcerer01:
                            if (this.sorcerer01Life > 0) {
                                this.sorcerer01.play("sorcerer_hit", true);
                                this.sorcerer01Life--;
                                this.sorcerer01isHit = true;
                            }
                            break;
                        case this.sorcerer02:
                            if (this.sorcerer02Life > 0) {
                                this.sorcerer02.play("sorcerer_hit", true);
                                this.sorcerer02Life--;
                                this.sorcerer02isHit = true;
                            }
                            break;
                        case this.tank01:
                            if (this.tank01Life > 0) {
                                this.tank01Life--;
                                this.tank01.play("tank_hit", true);
                                this.tank01isHit = true;
                            }
                            break;
                        case this.tank02:
                            if (this.tank02Life > 0) {
                                this.tank02Life--;
                                this.tank02.play("tank_hit", true);
                                this.tank02isHit = true;
                            }
                            break;
                        case this.plague01:
                            if (this.plague01Life > 0) {
                                this.plague01Life--;
                                this.plague01.play("plague_hit", true);
                                this.plague01isHit = true;
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

    /*handleParallax() {
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
    } */

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