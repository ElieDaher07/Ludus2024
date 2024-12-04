let isMenuMusicPlaying = false;

class Accueil extends Phaser.Scene {
  constructor() {
    super({
      key: "accueil"
    });
  }

  preload() {}

  create() {

    const sauvegarde = JSON.parse(localStorage.getItem("sauvegardeJeu"));

    if (sauvegarde) {
      checkpoint = sauvegarde.checkpoint;
      niveau = sauvegarde.niveau;
    }

    this.input.setDefaultCursor('none');

    this.customCursor = this.add.image(0, 0, 'cursor').setScale(1).setDepth(1000);
    this.customCursor.setOrigin(0);

    this.input.keyboard.enabled = true;
    this.input.mouse.enabled = true;
    this.input.mouse.disableContextMenu();
    this.currentBgMusicIndex = -1;

    this.diamondCount = 0;

    let musicIsMuted = this.game.registry.get("musicIsMuted");

    this.hoverSound = this.sound.add("buttonHoverSfx");
    this.confirmSound = this.sound.add("buttonConfirmSfx");

    // HUD
    const hudContainer = this.add.container(0, 0).setDepth(1);

    // Background

    let img = this.add.image(config.width / 2, config.height / 2, "bg");
    let scaleX = config.width / img.width;
    let scaleY = config.height / img.height;
    let scale = Math.max(scaleX, scaleY);
    img.setScale(scale);

    // Logo
    const logo = this.add
      .image(0, 0, "logo")
      .setPosition(config.width / 2, 150).setScale(0.7);

    this.tweens.add({
      targets: logo,
      scale: 0.76,
      duration: 900,
      ease: 'Quad.easeInOut',
      repeat: -1,
      yoyo: true

    })

    hudContainer.add(logo);

    // Boutons

    let playBtn = this.add
      .image(config.width / 2, config.height / 2, "play")
      .setScale(0.3);

    hudContainer.add(playBtn);

    let controlsBtn = this.add
      .image(config.width / 2, config.height / 2 + 160, "controls")
      .setScale(0.3);

    let resetBtn = this.add.image(config.width / 2, (config.height / 2 + 80), "reset").setScale(0.3).setTint(0xB0B0B0);

    hudContainer.add(resetBtn);

    hudContainer.add(controlsBtn);

    let creditsBtn = this.add
      .image(config.width / 2 - 50, config.height / 2 + 230, "credits")
      .setScale(0.15);

    hudContainer.add(creditsBtn);

    let musicBtn = this.add
      .image(config.width / 2 + 50, config.height / 2 + 230, "musique")
      .setScale(0.15);

    let audioBtn = this.add.image(config.width / 2, config.height / 2 + 230, "audio").setScale(0.15);

    hudContainer.add(musicBtn);
    hudContainer.add(audioBtn);

    // Interactifs

    playBtn.setInteractive();
    resetBtn.setInteractive();
    controlsBtn.setInteractive();
    creditsBtn.setInteractive();
    musicBtn.setInteractive();
    audioBtn.setInteractive();

    // Pointerdown, pointerover

    this.addHoverEffectBig(playBtn);
    this.addHoverEffectBig(controlsBtn);
    this.addHoverEffectSmall(creditsBtn);
    this.addHoverEffectSmall(musicBtn);
    this.addHoverEffectSmall(audioBtn);

    playBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    controlsBtn.on('pointerover', () => {
      this.hoverSound.play();
    })

    if (checkpoint >= 1) {
      let resetDisabled = false;


      this.addHoverEffectBig(resetBtn);


      resetBtn.clearTint();

      resetBtn.on('pointerover', () => {
        if (!resetDisabled) {

          this.hoverSound.play();
        }
      });

      resetBtn.on("pointerdown", () => {
        if (!resetDisabled) {
          checkpoint = 0;
          niveau = "jeu";
          this.confirmSound.play();
          localStorage.clear();
          resetBtn.setTint(0xB0B0B0);
          resetDisabled = true;
        }
      })

    }

    creditsBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    musicBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    audioBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    playBtn.on("pointerdown", () => {
      playBtn.disableInteractive();
      controlsBtn.disableInteractive();
      creditsBtn.disableInteractive();
      musicBtn.disableInteractive();

      if (this.currentBgMusic) {
        this.currentBgMusic.stop();
      }

      this.confirmSound.play();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        isMenuMusicPlaying = false;
        this.scene.start("jeu2" /*niveau*/ );
      });
    });



    controlsBtn.on("pointerdown", () => {
      playBtn.disableInteractive();
      controlsBtn.disableInteractive();
      creditsBtn.disableInteractive();
      musicBtn.disableInteractive();
      this.confirmSound.play();
      this.scene.start("tutoriel");
    });

    creditsBtn.on("pointerdown", () => {
      playBtn.disableInteractive();
      controlsBtn.disableInteractive();
      creditsBtn.disableInteractive();
      musicBtn.disableInteractive();
      this.confirmSound.play();
      this.scene.start("credits");
    });

    musicBtn.on('pointerdown', () => {
      this.confirmSound.play();

      let currentMuteState = this.game.registry.get("musicIsMuted") || 0;
      let newMuteState = currentMuteState ? 0 : 1;
      this.game.registry.set('musicIsMuted', newMuteState);

      if (newMuteState) {
        if (this.currentBgMusic && this.currentBgMusic.isPlaying) {
          this.currentBgMusic.pause();
        }
        musicBtn.setTint(0xff0000);
      } else {
        if (this.currentBgMusic) {
          if (this.currentBgMusic.isPaused) {
            this.currentBgMusic.resume();
          } else {
            this.currentBgMusic.play();
          }
        }
        musicBtn.clearTint();
      }
    });

    let musicMuteState = this.game.registry.get('musicIsMuted') || 0;
    if (musicMuteState) {
      musicBtn.setTint(0xff0000);
      if (this.currentBgMusic && this.currentBgMusic.isPlaying) {
        this.currentBgMusic.pause();
      }
    } else {
      musicBtn.clearTint();
      if (this.currentBgMusic && this.currentBgMusic.isPaused) {
        this.currentBgMusic.resume();
      }
    }

    audioBtn.on('pointerdown', () => {
      this.confirmSound.play();

      let currentAudioMuteState = this.game.registry.get("audioIsMuted") || 0;
      let newAudioMuteState = currentAudioMuteState ? 0 : 1;

      this.game.registry.set('audioIsMuted', newAudioMuteState);

      if (newAudioMuteState) {
        if (!this.game.sound.mute) {
          this.game.sound.mute = true;
        }
        audioBtn.setTint(0xff0000);
      } else {
        if (this.game.sound.mute) {
          this.game.sound.mute = false;
        }
        audioBtn.clearTint();
      }
    });

    let audioMuteState = this.game.registry.get('audioIsMuted') || 0;
    if (audioMuteState) {
      this.game.sound.mute = true;
      audioBtn.setTint(0xff0000);
    } else {
      this.game.sound.mute = false;
      audioBtn.clearTint();
    }

    this.bgMusics = [
      this.sound.add("accueilBg01"),
      this.sound.add("accueilBg02"),
      this.sound.add("accueilBg03"),
      this.sound.add("accueilBg04"),
      this.sound.add("accueilBg05")
    ];

    if (!this.sound.get('accueilBg01')) {
      this.playNextBgMusic();
    }

    if (!isMenuMusicPlaying) {
      this.playNextBgMusic();
      isMenuMusicPlaying = true;
    }
    this.hoverSound.setVolume(0.4);
    this.currentBgMusic.setVolume(0.4);
    this.confirmSound.setVolume(0.4);
  }

  playNextBgMusic() {
    this.sound.stopByKey('accueilBg01');
    this.sound.stopByKey('accueilBg02');
    this.sound.stopByKey('accueilBg03');
    this.sound.stopByKey('accueilBg04');
    this.sound.stopByKey('accueilBg05');

    this.currentBgMusicIndex = (this.currentBgMusicIndex + 1) % this.bgMusics.length;
    this.currentBgMusic = this.bgMusics[this.currentBgMusicIndex];
    this.currentBgMusic.setVolume(0.4);

    let musicIsMuted = this.game.registry.get("musicIsMuted");
    if (!musicIsMuted) {
      this.currentBgMusic.play();
    }
    this.currentBgMusic.on('complete', () => {
      this.playNextBgMusic();
    });
  }

  addHoverEffectBig(button) {
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

  addHoverEffectSmall(button) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.17,
        scaleY: 0.17,
        duration: 200,
        ease: 'Cubic.Out',
      });
    });
    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.15,
        scaleY: 0.15,
        duration: 200,
        ease: 'Cubic.Out',
      });
    });
  }

  update() {
    const pointer = this.input.activePointer;
    this.customCursor.setPosition(pointer.x, pointer.y);
  }
}