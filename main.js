'use strict';
function formatTime(time, hours) {
    if (hours) {
        let h = Math.floor(time / 3600);
        time = time - h * 3600;

        let m = Math.floor(time / 60);
        let s = Math.floor(time % 60);

        return h.lead0(2)  + ":" + m.lead0(2) + ":" + s.lead0(2) + " ";
    } else {
        let m = Math.floor(time / 60);
        let s = Math.floor(time % 60);

        return m.lead0(2) + ":" + s.lead0(2) + " ";
    }
}
Number.prototype.lead0 = function(n) {
    let nz = "" + this;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};
window.onload = function(){
    let video = document.querySelector('video');
    let playButton = document.querySelector('.play-button');
    let pauseButton = document.querySelector('.pause-button');
    let play = document.querySelector('.play-controls');
    let sound = document.querySelector('.sound-controls');
    let soundButton = document.querySelector('.sound-button');
    let muteButton = document.querySelector('.mute-button');
    let duration = document.querySelector('.duration');
    let hasHours = false;
    let currentTime = document.querySelector('.current-time');
    let current = document.querySelector('.current');
    let buffered = document.querySelector('.buffered');
    let progressBar = document.querySelector('.progress-bar');

    video.addEventListener('canplay', () => {
        hasHours = (video.duration/3600) >= 1.0;
        duration.textContent = formatTime(video.duration, hasHours);
        currentTime.textContent = formatTime((0), hasHours);
        current.style.width = '0';
    });
    video.addEventListener('progress', () => {
        let buff = video.buffered.end(0) / video.duration;
        buffered.style.width = buff * progressBar.clientWidth + 'px';
    });
    video.addEventListener('timeupdate', () => {
        currentTime.textContent = formatTime(video.currentTime, hasHours);
        current.style.width = video.currentTime/video.duration*progressBar.clientWidth + 'px';
    });

    play.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline-block';
        } else {
            video.pause();
            playButton.style.display = 'inline-block';
            pauseButton.style.display = 'none';
        }
    });
    sound.addEventListener('click', () => {
        if(video.muted) {
            video.muted = false;
            soundButton.style.display = 'inline-block';
            muteButton.style.display = 'none';
        } else {
            video.muted = true;
            soundButton.style.display = 'none';
            muteButton.style.display = 'inline-block';
        }
    });

};