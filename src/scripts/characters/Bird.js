class Bird {
    constructor(scene, delay = 0, targetY) {
        this.scene = scene;
        this.sprite = scene.add.sprite(0, 0, "bird").setDepth(0).setTint(0x808080).setOrigin(0, 0).setVisible(false);
        this.targetY = targetY;


        this.scene.time.delayedCall(delay, () => {
            this.sprite.setVisible(true);
            this.sprite.anims.play("bird_bg", true);
            this.move();
        });
    }


    move() {

        let scale = Phaser.Math.FloatBetween(1, 3);

        const speedFactor = Phaser.Math.Clamp((4 - scale), 1, 3);
        const duration = 20000 * speedFactor;

        this.sprite.setScale(scale);

        this.sprite.setPosition(-500, this.targetY);

        this.scene.tweens.add({
            targets: this.sprite,
            x: config.width * 2,
            duration: duration,
            ease: 'Linear',
            onComplete: () => this.move(),
        });
    }
}