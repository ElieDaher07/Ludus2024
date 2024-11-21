class Tutoriel02 extends Phaser.Scene {
    constructor() {
        super({
            key: "tutoriel02"
        });
    }

    preload() {
        // les preloads sont tous dans accueil.js pour le moment
    }

    create() {

        // Cursor

        this.customCursor = this.add.image(0, 0, 'cursor').setScale(1).setDepth(1000);
        this.customCursor.setOrigin(0);

        // HUD
        const hudContainer = this.add.container(0, 0).setDepth(1);

        // Sons hover/clic
        this.hoverSound = this.sound.add("buttonHoverSfx");
        this.confirmSound = this.sound.add("buttonConfirmSfx");

        // Background

        let img = this.add.image(config.width / 2, config.height / 2, "bg");
        let scaleX = config.width / img.width;
        let scaleY = config.height / img.height;
        let scale = Math.max(scaleX, scaleY);
        img.setScale(scale);

        // Image contrôles

        let imgControle02 = this.add.image(config.width / 2, config.height / 2, "controlesMenu02");
        imgControle02.setScale(0.5);

        // Boutons

        let xBtn = this.add
            .image(config.width / 2 + 265, config.height / 2 - 295, "x")
            .setScale(0.2);

        let left_arrow = this.add.image(config.width / 2 - 50, config.height / 2 + 220, "left_arrow").setScale(0.3);
        let right_arrow = this.add.image(config.width / 2 + 50, config.height / 2 + 220, "right_arrow").setScale(0.3).setTint(0xB0B0B0);


        hudContainer.add(xBtn);
        hudContainer.add(left_arrow);
        hudContainer.add(right_arrow);

        // Interactifs

        xBtn.setInteractive();
        this.addHoverEffectSmall(xBtn);

        left_arrow.setInteractive();
        this.addHoverEffectMedium(left_arrow);

        left_arrow.on("pointerover", () => {
            this.hoverSound.play();
        })

        left_arrow.on("pointerdown", () => {
            this.scene.start("tutoriel");
            this.confirmSound.play();
        })

        xBtn.on("pointerover", () => {
            this.hoverSound.play();
        })

        xBtn.on("pointerdown", () => {
            this.scene.start("accueil");
            this.confirmSound.play();
        });

        this.confirmSound.setVolume(0.4);
        this.hoverSound.setVolume(0.4);

    }

    addHoverEffectSmall(button) {
        button.setInteractive();
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.22,
                scaleY: 0.22,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.2,
                scaleY: 0.2,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
    }

    addHoverEffectMedium(button) {
        button.setInteractive();
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.32,
                scaleY: 0.32,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.3,
                scaleY: 0.3,
                duration: 100,
                ease: 'Cubic.Out',
            });
        });
    }

    update() {
        const pointer = this.input.activePointer;
        this.customCursor.setPosition(pointer.x, pointer.y);
    }
}