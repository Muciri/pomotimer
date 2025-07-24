//lendo os dados do settings.json
window.addEventListener('DOMContentLoaded', () => {
  const dados = window.api.loadSettings();

  document.getElementById("focusInput").value = dados['Focus'];
  document.getElementById("shortPauseInput").value = dados['ShortBreak'];
  document.getElementById("longPauseInput").value = dados['LongBreak'];
  document.getElementById("longPauseInterval").value = dados['LongBreakInterval'];
});

//escrevendo dados no settings.json
document.getElementById('save').addEventListener('click', () => {
  //verifica os valores dos inputs
  const inputs = document.querySelectorAll('input')

  inputs.forEach(input => {
    if(input.value <= 0) {
      input.value = input.min;
    }
  })
  
  //lê os dados nos inputs
  const newData = {
      Focus: document.getElementById("focusInput").value,
      ShortBreak: document.getElementById("shortPauseInput").value,
      LongBreak: document.getElementById("longPauseInput").value,
      LongBreakInterval: document.getElementById("longPauseInterval").value
  };

  //escreve no arquivo JSON
  window.api.saveSettings(newData);

  //fecha a janela
  close();
})