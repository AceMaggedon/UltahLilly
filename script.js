const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const soundBtn = document.getElementById('sound-btn');
const soundIcon = document.getElementById('sound-icon');
const cards = [
    document.getElementById('home-card'),
    document.getElementById('page-1'),
    document.getElementById('page-2'),
    document.getElementById('page-3'),
    document.getElementById('page-4'),
    document.getElementById('page-5'),
    document.getElementById('page-6'),
    document.getElementById('page-7'),
    document.getElementById('page-8'),
    document.getElementById('page-9'),
    document.getElementById('page-10'),
    document.getElementById('page-11'),
    document.getElementById('page-12'),
    document.getElementById('page-13'),
    document.getElementById('page-14'),
    document.getElementById('page-15')
];
const nextButtons = document.querySelectorAll('.next-btn');
const prevButtons = document.querySelectorAll('.prev-btn');
let currentCardIndex = 0;
bgMusic.volume = 0.7;

// --- SONG PLAYLIST SYSTEM ---
const playlist = [
    'music/drift-away.mp3',
    'music/everything-stays.mp3',
    'music/im-just-your-problem.mp3',
    'music/its-over.mp3'
];

let currentSongIndex = Math.floor(Math.random() * playlist.length);

function playSong(index) {
    bgMusic.src = playlist[index];
    bgMusic.play();
}

bgMusic.addEventListener('ended', () => {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentSongIndex);
    currentSongIndex = nextIndex;
    playSong(currentSongIndex);
});

// --- START BUTTON (WE ONLY NEED THIS ONE) ---
startBtn.addEventListener('click', () => {
    playSong(currentSongIndex);
    startScreen.style.opacity = '0';
    startGoldenLeaves();
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 500);
});

// --- SOUND TOGGLE BUTTON ---
soundBtn.addEventListener('click', () => {
    if (bgMusic.muted) {
        bgMusic.muted = false;
        soundIcon.src = 'images/volume-on.svg';
    } else {
        bgMusic.muted = true;
        soundIcon.src = 'images/volume-off.svg';
    }
});

// --- CARD SLIDER SYSTEM ---
function updateCards() {
    cards.forEach((card, index) => {
        if (index < currentCardIndex) {
            card.className = 'card hidden-left'; 
        } else if (index === currentCardIndex) {
            card.className = 'card active';
        } else {
            card.className = 'card hidden-right';
        }
    });
}

nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            updateCards();
        }
    });
});

prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateCards();
        }
    });
});

updateCards();

// --- GOLDEN LEAVES ENGINE ---
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');

    leaf.style.left = Math.random() * 100 + 'vw';

    const size = Math.random() * 10 + 10; 
    leaf.style.width = size + 'px';
    leaf.style.height = size + 'px';

    const fallDuration = Math.random() * 6 + 4; 
    const swayDuration = Math.random() * 3 + 2; 
    
    leaf.style.animation = `fall ${fallDuration}s linear forwards, sway ${swayDuration}s ease-in-out infinite alternate`;
    document.getElementById('leaves-container').appendChild(leaf);

    setTimeout(() => {
        leaf.remove();
    }, fallDuration * 1000);
}

let leafInterval;
function startGoldenLeaves() {
    leafInterval = setInterval(createLeaf, 300);
}