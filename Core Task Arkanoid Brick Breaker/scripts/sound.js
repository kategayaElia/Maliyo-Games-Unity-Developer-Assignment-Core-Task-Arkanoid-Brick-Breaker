// scripts/sound.js

class SoundManager {
  constructor() {
    this.sounds = {
      paddle: new Audio("assets/sounds/paddle_hit.mp3"),
      brick: new Audio("assets/sounds/brick_hit.mp3"),
      wall: new Audio("assets/sounds/wall_hit.mp3"),
      lose: new Audio("assets/sounds/lose.mp3"),
      win: new Audio("assets/sounds/win.mp3")
    };
    this.enabled = true;
    this.musicEnabled = true;
  }

  play(name) {
    if (this.enabled && this.sounds[name]) {
      this.sounds[name].currentTime = 0;
      this.sounds[name].play();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    alert("Sound " + (this.enabled ? "On" : "Off"));
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    alert("Music " + (this.musicEnabled ? "On" : "Off"));
  }
}
