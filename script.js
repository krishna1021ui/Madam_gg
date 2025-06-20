const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');
const gameBoard = document.getElementById('gameBoard');
const loveMessage = document.getElementById('loveMessage');

const emojis = ['💖','💘','💝','💗','💓','💕','💞','💟','💌','❤️‍🔥','❤️‍🩹','🧡','💛','💚'];
let cards = [];
let flippedCards = [];
let matched = 0;
let loveIndex = 0;

const messages = [
  "Love you 1", "Love you 10", "Love you 100", "Love you 1000",
  "Love you 10000", "Love you ♾️♾️",
  "Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh wiiiiiiiiiiiifffffffffffyyyyyyyyyy",
  "Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh paaattttnnniiii ggggg 💖🧿"
];

startScreen.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  initGame();
});

function initGame() {
  const selected = [...emojis].sort(() => 0.5 - Math.random()).slice(0, 12);
  const gameEmojis = [...selected, ...selected].sort(() => 0.5 - Math.random());
  cards = [];
  gameBoard.innerHTML = '';
  matched = 0;

  gameEmojis.forEach((emoji, index) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.emoji = emoji;
    div.dataset.index = index;
    div.innerText = '';
    div.addEventListener('click', () => flipCard(div));
    gameBoard.appendChild(div);
    cards.push(div);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

  card.innerText = card.dataset.emoji;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [a, b] = flippedCards;
    if (a.dataset.emoji === b.dataset.emoji) {
      matched += 2;
      flippedCards = [];
      if (matched === cards.length) showEnd();
    } else {
      setTimeout(() => {
        a.innerText = '';
        b.innerText = '';
        a.classList.remove('flipped');
        b.classList.remove('flipped');
        flippedCards = [];
      }, 800);
    }
  }
}

function showEnd() {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  nextLoveMessage();
}

function nextLoveMessage() {
  if (loveIndex < messages.length) {
    loveMessage.innerText = messages[loveIndex++];
    startHeartRain();
    setTimeout(nextLoveMessage, 2200);
  }
}

function startHeartRain() {
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = Array.from({length: 30}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 25 + 10,
    speed: Math.random() * 3 + 1,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let heart of hearts) {
      ctx.font = heart.r + "px serif";
      ctx.fillText(heart.emoji, heart.x, heart.y);
      heart.y += heart.speed;
      if (heart.y > canvas.height) heart.y = -20;
    }
    requestAnimationFrame(draw);
  }
  draw();
}
