//parâmetros
const timer = new easytimer.Timer();                                   //Instância da classe Timer
let selectedCycle = 'Focus';                                           //variável para armazenar o ciclo selecionado no array cycles (é inicializado como Focus)   
let timerRunning = false;                                              //variável para armazenar o estado do timer (parado ou ativo)
let focusCyclesCounter = 0;                                            //variável para armazenar quantos ciclos de focos já passaram
const alarm = new Audio('../assets/trim.m4a'); alarm.volume = 0.3;     //alarme tocado quando o temporizador chega a 0

//função para atualizar o label do timer de acordo com o ciclo atual
function updateTimerLabel(){
  const data = window.api.loadSettings();
  document.getElementById('timer').innerText = data[selectedCycle] + ":00"
  document.getElementById('start').innerHTML = '<strong>START</strong>';
}

//função para atualizar o timer para o próximo ciclo
function nextCycle(){
  const data = window.api.loadSettings();
  //se o ciclo atual for 'foco', o próximo ciclo será uma pausa
  if(selectedCycle === 'Focus') {
    //se a quantidade de ciclos passados for igual ao intervalo, o próximo ciclo será a pausa longa
    if(focusCyclesCounter === parseInt(data['LongBreakInterval'])) {
      document.getElementById('LongBreakButton').click();
      focusCyclesCounter = -1; //aqui é atribuido o valor -1, pois quando o ciclo voltar para foco, o contador voltará a ser 0
    }
    
    //se não, o próximo ciclo será a pausa curta
    else {
      document.getElementById('ShortBreakButton').click();
    }
  }
  
  //se o ciclo for uma pausa, o próximo será foco
  else {
    document.getElementById('FocusButton').click();
    focusCyclesCounter += 1;
  }
}

//menu select
const buttons = document.querySelectorAll('.toggle-container button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove a classe ativa de todos
    buttons.forEach(b => b.classList.remove('active'));
    // Adiciona a classe ativa ao clicado
    btn.classList.add('active');
    
    //reseta o temporizador, caso esteja ativo
    timerRunning = false;
    timer.stop();

    // Atualiza a variável com o valor selecionado
    selectedCycle = btn.dataset.value;
    document.getElementById('label').innerText = btn.textContent;
    updateTimerLabel();
  });
});

// variável para Evitar múltiplos listeners
let listenersSet = false; 

document.getElementById('start').addEventListener('click', () => {
  if (!timerRunning) { 
    const data = window.api.loadSettings();

    document.getElementById('start').innerHTML = '<strong>PAUSE</strong>';
    timerRunning = true;

    timer.start({ countdown: true, startValues: { minutes: data[selectedCycle]} });

    if (!listenersSet) { //os eventlisteners são criados somente uma vez
      timer.addEventListener('secondsUpdated', () => {
        document.getElementById('timer').innerText = timer.getTimeValues().toString().substring(3);
      });

      timer.addEventListener('targetAchieved', () => {
        nextCycle();
        window.api.playSound(alarm);
      });

      listenersSet = true;
    }
  } 
  else {
    timer.pause();
    document.getElementById('start').innerHTML = '<strong>START</strong>';
    timerRunning = false;
  }
});

//pular um ciclo pelo botão skip
document.getElementById('skip').addEventListener('click', () => {
  nextCycle();
})

//abrir janela de configurações
document.getElementById('config').addEventListener('click', () => {
  window.api.openSettingsWindow();
})