class Pause extends Phaser.Scene {
    constructor() {
        super({
            key: "pause"
        });
    }

    preload() {
        this.load.image('pause', './assets/images/ui/pauseMenu.png');
    }

    create() {

        this.unpauseSound = this.sound.add("unpauseSfx");
        this.unpauseSound.setVolume(0.4);

        // HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);

        // Interactions avec le(s) bouton(s)

        let pauseImg = this.add.image(config.width / 2, config.height / 2, "pause");
        let quitBtn = this.add.image(
            (config.width / 2),
            (config.height / 2 - 300),
            "quit"
        ).setScale(0.3);

        quitBtn.setInteractive();
        quitBtn.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);

            this.time.delayedCall(1000, () => {
                this.scene.start("accueil");
            });
        });


        pauseImg.setScale(0.5);

        hudContainer.add(pauseImg);
        hudContainer.add(quitBtn);

        this.input.keyboard.on("keydown-ESC", () => {
            this.unpauseSound.play();
            this.scene.stop("pause");

            let bgMusic = this.game.registry.get("bgMusic");
            if (bgMusic && !this.game.registry.get("isMuted")) {
                bgMusic.resume();
            }

            this.scene.get("jeu").isPaused = false;
            this.scene.resume("jeu");
        });

    }

    update() {}


}