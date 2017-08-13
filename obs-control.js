"use strict";

let settings = require('./config');
const OBSWebSocket = require('obs-websocket-js');
const twitch = new OBSWebSocket();
const mixer = new OBSWebSocket();

twitch.connect({address: 'localhost:4444', password: settings.websocketpassword}).then(function () {
    console.log('Success! We\'re connected & authenticated.');
    return twitch.getSceneList({});
}).then(data => {
    console.log(`${data.scenes.length} Available Scenes!`);
    data.scenes.forEach(scene => {
        if (scene.name !== data.currentScene) {
            console.log('Found a different scene! Switching to Scene:', scene.name);
            twitch.setCurrentScene({'scene-name': 'brb'});
        }
    });
}).catch(err => { // Ensure that you add a catch handler to every Promise chain.
    console.log(err);
});

twitch.onSwitchScenes(data => {
    console.log('New Active Scene:', data.sceneName);
});

// You must add this handler to avoid uncaught exceptions.
twitch.on('error', err => {
    console.error('socket error:', err);
});

mixer.connect({address: 'localhost:4445', password: settings.websocketpassword}).then(function () {
    console.log('Success! We\'re connected & authenticated.');
    return mixer.getSceneList({});
}).then(data => {
    console.log(`${data.scenes.length} Available Scenes!`);
    data.scenes.forEach(scene => {
        if (scene.name !== data.currentScene) {
            console.log('Found a different scene! Switching to Scene:', scene.name);
            mixer.setCurrentScene({'scene-name': 'brb'});
        }
    });
}).catch(err => { // Ensure that you add a catch handler to every Promise chain.
    console.log(err);
});

mixer.onSwitchScenes(data => {
    console.log('New Active Scene:', data.sceneName);
});

// You must add this handler to avoid uncaught exceptions.
mixer.on('error', err => {
    console.error('socket error:', err);
});

exports.switchScene = function (sceneName) {
    mixer.setCurrentScene({'scene-name': sceneName});
    twitch.setCurrentScene({'scene-name': sceneName});
};

exports.toggleStreaming = function () {
    mixer.StartStopStreaming();
    twitch.StartStopStreaming();
};