// Niveles de postura
const levels = [
    {
      postures: [
        { correct: false, img: 'incorrecto1.1.jpg' },
        { correct: true, img: 'correcto1.jpg' },
        { correct: false, img: 'incorrecto1.jpg' }
      ]
    },
    {
      postures: [
        { correct: true, img: 'incorrecto2.jpeg' },
        { correct: false, img: 'correcto2.jpeg' },
        { correct: false, img: 'incorrecto2.2.jpeg' }
      ]
    },
    {
      postures: [
        { correct: false, img: 'incorrecto3.jpeg' },
        { correct: false, img: 'incorrecto3.3.jpeg' },
        { correct: true, img: 'correcto3.jpeg' }
      ]
    }
  ];
  
  let currentLevel = 0;
  let score = 0;
  const levelContainer = document.getElementById('level-container');
  const quizContainer = document.getElementById('quiz-container');
  const scoreContainer = document.getElementById('score-container');
  
  // Cargar el nivel
  function loadLevel() {
    const levelTitle = document.getElementById('level-title');
    const posturesDiv = document.querySelector('.postures');
    const level = levels[currentLevel];
    
    levelTitle.textContent = `Nivel ${currentLevel + 1}`;
    posturesDiv.innerHTML = '';
    
    level.postures.forEach((posture, index) => {
      const img = document.createElement('img');
      img.src = posture.img;
      img.classList.add('posture');
      img.dataset.correct = posture.correct;
      img.addEventListener('click', handlePostureClick);
      posturesDiv.appendChild(img);
    });
  }
  
 function handlePostureClick(event) {
    const isCorrect = event.target.dataset.correct === 'true';
    
    if (isCorrect) {
        alert('¡Bien hecho! Mantener una buena postura es importante. Una mala postura puede causar dolor de espalda, fatiga muscular, problemas en las articulaciones e incluso afectar la digestión.');
        score += 1;
        currentLevel += 1;
      
        if (currentLevel < levels.length) {
            loadLevel();
        } else {
            startQuiz();
        }
    } else {
        alert('Postura incorrecta, intenta de nuevo. Mantener una mala postura puede causar dolores de espalda y otros problemas a largo plazo.');
    }
}

  
  // Preguntas del cuestionario
  const questions = [
    { question: '¿Qué afecta una mala postura?', options: ['Dolor de cabeza', 'Dolor de espalda', 'Ambos'], answer: 2 },
    { question: '¿Cuál es la postura correcta al sentarse?', options: ['Curvar la espalda', 'Mantener la espalda recta', 'Encogerse'], answer: 1 },
    { question: '¿Cuál es una señal de que tienes una mala postura al caminar?', options: ['Caminar mirando hacia abajo', 'Movilizar los brazos al caminar', 'Mantener los hombros rectos'], answer: 1 },
    { question: '¿Cuál de estos problemas puede ser una consecuencia de la mala postura prolongada?', options: ['Mejor equilibrio', ' Problemas digestivos', 'Visión más clara'], answer: 2 },
    { question: '¿Cuál es una postura incorrecta al usar el teléfono móvil?', options: ['Sostenerlo a la altura de los ojos', ' Cambiar de mano regularmente', 'Usarlo con la espalda recta'], answer: 2 },
    { question: '¿Qué sucede cuando adoptamos una postura encorvada durante largos períodos de tiempo?', options: ['Mejora la circulación', ' Se alivia la tensión en el cuello', 'Ambas son correctas'], answer: 3 },
    { question: '¿Cuál es una forma incorrecta de dormir que puede afectar la postura?', options: ['Dormir de costado con una almohada entre las piernas', ' Dormir en una postura fetal con una almohada alta', 'Dormir boca arriba con una almohada baja'], answer: 3 },
  ];
  
  let currentQuestion = 0;
  let timeLeft = 60;
  let timer;
  
  function startQuiz() {
    levelContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    document.querySelector('h1').textContent = 'Juego de Preguntas sobre Posturas'; 
    loadQuestion();
    startTimer();
}

  
  function loadQuestion() {
    if (currentQuestion < questions.length) {
      const question = questions[currentQuestion];
      document.getElementById('question-title').textContent = `Pregunta ${currentQuestion + 1}`;
      document.getElementById('question-text').textContent = question.question;
      const optionsDiv = document.getElementById('options');
      optionsDiv.innerHTML = '';
      
      question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => handleAnswer(index));
        optionsDiv.appendChild(button);
      });
    } else {
      endQuiz();
    }
  }
  
  function handleAnswer(selected) {
    const question = questions[currentQuestion];
    
    if (selected === question.answer) {
      score += 1;
    }
    
    currentQuestion += 1;
    timeLeft = 60;
    loadQuestion();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft -= 1;
      document.getElementById('time-left').textContent = timeLeft;
      
      if (timeLeft === 0) {
        handleAnswer(-1); // Si se acaba el tiempo, pasa a la siguiente pregunta
      }
    }, 1000);
  }
  
  function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    document.getElementById('final-score').textContent = `Tu puntaje final es ${score}`;
  }
  
  // Iniciar el juego
  loadLevel();
  