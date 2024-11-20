let isMenuMusicPlaying = false;

class Accueil extends Phaser.Scene {
  constructor() {
    super({
      key: "accueil"
    });
  }

  preload() {

    // Image background menu
    this.load.image(
      "bg",
      "./assets/images/backgrounds/Rocky_Level/background1.png"
    );

    // Logo
    this.load.image("logo", "./assets/images/backgrounds/logo.png");

    // Preload le(s) bouton(s) et le(s) menus

    this.load.image("controlesMenu", "./assets/images/ui/controlesMenu.png");
    this.load.image("controlesMenu02", "./assets/images/ui/controlesMenu02.png");

    this.load.image("creditsMenu", "./assets/images/ui/creditsMenu.png");
    this.load.image("quit", "./assets/images/ui/Large_Buttons/Quit_Button.png");
    this.load.image("continue", "./assets/images/ui/Large_Buttons/Continue_Button.png");
    this.load.image("reset", "./assets/images/ui/Large_Buttons/Reset_Button.png");
    this.load.image('pause', './assets/images/ui/pauseMenu.png');
    this.load.image("play", "./assets/images/ui/Large_Buttons/Play_Button.png");
    this.load.image("recommencer", "./assets/images/ui/Small_Buttons/Return_Square_Button.png");
    this.load.image("controls", "./assets/images/ui/Large_Buttons/Controls_Button.png");
    this.load.image("credits", "./assets/images/ui/Small_Buttons/Info_Square_Button.png");
    this.load.image("musique", "./assets/images/ui/Small_Buttons/Music_Square_Button.png");
    this.load.image("audio", "./assets/images/ui/Small_Buttons/Audio_Square_Button.png");
    this.load.image("x", "./assets/images/ui/Small_Buttons/X_Square_Button.png");
    this.load.image("v", "./assets/images/ui/Small_Buttons/V_Square_Button.png");
    this.load.image("bg", "./assets/images/backgrounds/Rocky_Level/background1.png");
    this.load.image("menu", "./assets/images/ui/Small_Buttons/Home_Square_Button.png");

    this.load.image("left_arrow", "./assets/images/ui/Small_Buttons/Back_Square_Button.png");
    this.load.image("right_arrow", "./assets/images/ui/Small_Buttons/Next_Square_Button.png");


    // Preload le Tiled map
    this.load.tilemapTiledJSON("carte_json", "./assets/images/backgrounds/Rocky_Level/carte_rocky.json");

    // Preload les 5 images de tilesets utiliser
    this.load.image("background1_tile", "./assets/images/backgrounds/Rocky_Level/background1.png");
    this.load.image("background2_tile", "./assets/images/backgrounds/Rocky_Level/background2.png");
    this.load.image("background3_tile", "./assets/images/backgrounds/Rocky_Level/background3.png");
    this.load.image("background_main", "./assets/images/backgrounds/Rocky_Level/main_lev_build.png");
    this.load.image("background_other", "./assets/images/backgrounds/Rocky_Level/other_lev_build.png");

    // Preload le joueur spritesheet

    this.load.spritesheet("player_idle_run_jump", "./assets/images/characters/player_spritesheet/idle_run_jump_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("player_attacks", "./assets/images/characters/player_spritesheet/attacks_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("player_hit_death", "./assets/images/characters/player_spritesheet/hit_death_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("player_throw_attack", "./assets/images/characters/player_spritesheet/throw_attack_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("dagger_throw", "./assets/images/characters/player_spritesheet/throw_dagger_sheet.png", {
      frameWidth: 15,
      frameHeight: 16
    });

    // Preload oiseau spritesheet

    this.load.spritesheet("bird", "./assets/images/backgrounds/bird.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    // Preload les items

    this.load.image("heart01", "./assets/images/items/heart01.png");
    this.load.image("diamond01", "./assets/images/items/diamond_big_01.png");

    // Preload les ennemis

    this.load.spritesheet("enemy01", "./assets/images/characters/enemy/enemy01_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy02", "./assets/images/characters/enemy/enemy02_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("enemy03", "./assets/images/characters/enemy/enemy03_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("enemy04", "./assets/images/characters/enemy/enemy04_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    this.load.spritesheet("enemy05", "./assets/images/characters/enemy/enemy05_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });

    // Preload l'élément hud du joueur

    this.load.image("hud", "./assets/images/ui/Gui.png");
    this.load.image("health", "./assets/images/ui/health_sheet.png")

    // Preload effects

    this.load.spritesheet("destroy_effect", "./assets/images/fx/destr_effect_sheet.png", {
      frameWidth: 80,
      frameHeight: 80
    });

    this.load.spritesheet("hit_effect", "./assets/images/fx/hit_effect_sheet.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    // Preload audio

    this.load.audio("gameoverBg", "./assets/audio/music/music-loop-bundle-download_pre2023/Ludum Dare 32 05.ogg");
    this.load.audio("victoryBg", "./assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 09.ogg")
    // ou assets/audio/music/music-loop-bundle-download_pre2023/Ludum Dare 30 01.ogg

    // assets/audio/music/music-loop-bundle-download_pre2023/Ludum Dare 30 01.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/Ludum Dare 28 03.ogg // boss music?
    // assets/audio/music/music-loop-bundle-download_pre2023/Ludum Dare 28 02.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 07.ogg
    //  assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 27.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 28.ogg
    //  assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 29.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 30.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 14.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 13.ogg
    // assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 11.ogg

    this.load.audio("surpriseSfx", "./assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 15.ogg")

    this.load.audio("buttonHoverSfx", "./assets/audio/sfx/10_UI_Menu_SFX/001_Hover_01.wav");

    this.load.audio("buttonConfirmSfx", "./assets/audio/sfx/10_UI_Menu_SFX/013_Confirm_03.wav");

    this.load.audio("pauseSfx", "./assets/audio/sfx/10_UI_Menu_SFX/092_Pause_04.wav");

    this.load.audio("unpauseSfx", "./assets/audio/sfx/10_UI_Menu_SFX/098_Unpause_04.wav");

    this.load.audio("accueilBg01", "./assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 10_01.ogg");

    this.load.audio("accueilBg02", "./assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 10_02.ogg");

    this.load.audio("accueilBg03", "./assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 10_03.ogg");

    this.load.audio("accueilBg04", "./assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 10_04.ogg");

    this.load.audio("accueilBg05", "./assets/audio/music/music-loop-bundle-download_pre2023/Patreon Challenge 10_05.ogg");

    this.load.audio("jeuBg", "./assets/audio/music/music-loop-bundle-download_pre2023/VGMA Challenge 07.ogg");

    this.load.audio("hitSound01", "./assets/audio/sfx/12_Player_Movement_SFX/61_Hit_03.wav");

    this.load.audio("hitSound02", "./assets/audio/sfx/10_Battle_SFX/03_Claw_03.wav");

    this.load.audio("hitSound03", "./assets/audio/sfx/10_Battle_SFX/08_Bite_04.wav");

    this.load.audio("hitSound04", "./assets/audio/sfx/10_Battle_SFX/15_Impact_flesh_02.wav");

    this.load.audio("hitSound05", "./assets/audio/sfx/10_Battle_SFX/22_Slash_04.wav");

    this.load.audio("hitSound06", "./assets/audio/sfx/10_Battle_SFX/77_flesh_02.wav");

    this.load.audio("enemyDeathSound", "./assets/audio/sfx/10_Battle_SFX/69_Enemy_death_01.wav");

    this.load.audio("playerDeathSound", "./assets/audio/sfx/10_UI_Menu_SFX/033_Denied_03.wav");

    this.load.audio("itemPickupSound", "./assets/audio/sfx/10_UI_Menu_SFX/051_use_item_01.wav");

    this.load.audio("attackSound", "./assets/audio/sfx/12_Player_Movement_SFX/56_Attack_03.wav");
    this.load.audio("landingSound", "./assets/audio/sfx/12_Player_Movement_SFX/45_Landing_01.wav");
    this.load.audio("jumpSound", "./assets/audio/sfx/12_Player_Movement_SFX/30_Jump_03.wav");
    this.load.audio("walkingSound", "./assets/audio/sfx/12_Player_Movement_SFX/08_Step_rock_02.wav");

    // assets/audio/sfx/8_Atk_Magic_SFX/04_Fire_explosion_04_medium.wav
    // assets/audio/sfx/8_Atk_Magic_SFX/1 _Ice_explosion_01.wav

  }

  create() {
    //this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.input.keyboard.enabled = true;
    this.input.mouse.enabled = true;
    this.input.mouse.disableContextMenu();
    this.currentBgMusicIndex = -1;

    this.diamondCount = 0;

    let isMuted = this.game.registry.get("isMuted");

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
      .image(config.width / 2, config.height / 2 + 80, "controls")
      .setScale(0.3);

    hudContainer.add(controlsBtn);

    let creditsBtn = this.add
      .image(config.width / 2 - 50, config.height / 2 + 150, "credits")
      .setScale(0.15);

    hudContainer.add(creditsBtn);

    let musicBtn = this.add
      .image(config.width / 2 + 50, config.height / 2 + 150, "musique")
      .setScale(0.15);

    if (isMuted) {
      musicBtn.setTint(0xff0000);
    }

    hudContainer.add(musicBtn);

    // Interactifs

    playBtn.setInteractive();
    controlsBtn.setInteractive();
    creditsBtn.setInteractive();
    musicBtn.setInteractive();

    // Pointerdown, pointerover

    this.addHoverEffectBig(playBtn);
    this.addHoverEffectBig(controlsBtn);
    this.addHoverEffectSmall(creditsBtn);
    this.addHoverEffectSmall(musicBtn);

    playBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    controlsBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    creditsBtn.on('pointerover', () => {
      this.hoverSound.play();
    });

    musicBtn.on('pointerover', () => {
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
        this.scene.start(niveauActuel);
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

      let currentMuteState = this.game.registry.get("isMuted") || 0;
      let newMuteState = currentMuteState ? 0 : 1;
      this.game.registry.set('isMuted', newMuteState);

      if (newMuteState) {
        if (this.currentBgMusic) {
          this.currentBgMusic.pause();
        }
        musicBtn.setTint(0xff0000);
      } else {
        if (this.currentBgMusic) {
          this.currentBgMusic.resume();
        }
        musicBtn.clearTint();
      }
    });

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

    let isMuted = this.game.registry.get("isMuted");
    if (!isMuted) {
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

  update() {}
}