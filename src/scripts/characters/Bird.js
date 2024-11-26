class Bird {
    constructor(scene) {
        this.scene = scene;
        this.sprite = scene.add.sprite(0, 0, "bird").setDepth(6).setTint(0x808080).setOrigin(0, 0);
        this.sprite.anims.play("bird_bg", true);

        // Déplace l'oiseau de façon aléatoire
        this.move();
    }

    // Fonction récursive pour l'animation du vol d'oiseau
    move() {

        let scale = Phaser.Math.FloatBetween(1, 3);

        const targetY = Phaser.Math.Between(config.height / 2 - 300, config.height / 2 - 200)

        this.sprite.setScale(scale);

        this.sprite.setPosition(0, targetY);

        this.scene.tweens.add({
            targets: this.sprite,
            x: config.width * 2,
            duration: Math.abs(scale - 3) * 10000,
            ease: 'Linear',
            onComplete: () => this.move(),
        });
    }
}