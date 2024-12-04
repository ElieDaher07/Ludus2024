class Pause02 extends Phaser.Scene {
    constructor() {
        super({
            key: "pause02"
        });
    }

    preload() {

    }

    create() {



        this.customCursor = this.add.image(0, 0, 'cursor').setScale(1).setDepth(1000);
        this.customCursor.setOrigin(0);

        this.unpauseSound = this.sound.add("unpauseSfx");
        this.hoverSound = this.sound.add("buttonHoverSfx");
        this.confirmSound = this.sound.add("buttonConfirmSfx");

        // HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);

        // Interactions avec le(s) bouton(s)

        let pauseImg = this.add.image(config.width / 2, config.height / 2, "pause").setScale(0.5);

        let continueBtn = this.add.image(config.width / 2, (config.height / 2 - 100), "continue").setScale(0.5);

        let quitBtn = this.add.image((config.width / 2), (config.height / 2 + 20), "quit").setScale(0.5);

        quitBtn.setInteractive();
        continueBtn.setInteractive();

        hudContainer.add(pauseImg);
        hudContainer.add(quitBtn);
        hudContainer.add(continueBtn);


        this.input.keyboard.on("keydown-ESC", () => {
            this.unpauseSound.play();
            this.scene.stop("pause02");
            let bgMusic = this.game.registry.get("bgMusic");
            if (bgMusic && !this.game.registry.get("isMuted")) {
                bgMusic.resume();
            }
            this.scene.get("jeu2").isPaused = false;
            this.scene.resume("jeu2");
        });

        quitBtn.on("pointerover", () => {
            this.hoverSound.play();
        })

        quitBtn.on("pointerdown", () => {
            quitBtn.disableInteractive();
            continueBtn.disableInteractive();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.confirmSound.play();
            this.time.delayedCall(1000, () => {
                this.scene.stop("jeu2");
                this.scene.start("accueil");
            });
        });

        continueBtn.on("pointerover", () => {
            this.hoverSound.play();
        })

        continueBtn.on("pointerdown", () => {
            quitBtn.disableInteractive();
            continueBtn.disableInteractive();
            this.unpauseSound.play();
            let bgMusic = this.game.registry.get("bgMusic");
            if (bgMusic && !this.game.registry.get("isMuted")) {
                bgMusic.resume();
            }
            this.scene.get("jeu2").isPaused = false;
            this.scene.resume("jeu2");
            this.scene.stop("pause02");
        });

        this.addHoverEffectBig(quitBtn);
        this.addHoverEffectBig(continueBtn);

        this.confirmSound.setVolume(0.4);
        this.hoverSound.setVolume(0.4);
        this.unpauseSound.setVolume(0.4);

    }

    update() {
        const pointer = this.input.activePointer;
        this.customCursor.setPosition(pointer.x, pointer.y);
    }

    addHoverEffectBig(button) {
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.51,
                scaleY: 0.51,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.5,
                scaleY: 0.5,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
    }
}