const {contextBridge, ipcRenderer} = require('electron')
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src/js/settings.json');

contextBridge.exposeInMainWorld('api', {
    //função para carregar os dados do settings.json de maneira atualizada
    loadSettings: () =>  {
        const data = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(data);
    },

    //função para salvar os dados no settings.json
    saveSettings: (newData) => {
        fs.writeFileSync(jsonPath, JSON.stringify(newData, null, 2));
    },

    //função que toca um som de beep ao terminar o contador
    playSound: (audio, durationSec = 8) => {
        audio.play();
        setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        }, durationSec * 1000);
    },

    //função para abrir a janela de configurações
    openSettingsWindow: () => ipcRenderer.send('open-settings-window'),
});