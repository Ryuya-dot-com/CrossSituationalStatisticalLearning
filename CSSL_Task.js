    // ========================================
    // Configuration
    // ========================================
    
    const CONFIG = {
        participantId: '',
        numPairs: 18,
        repetitions: 6,
        trialDuration: 6000,
        wordInterval: 1200,
        iti: 1000,
        objectsPerTrial: 4,  // 4x4 condition
        testBlocks: 2,
        audioBasePath: 'audio',
        audioExtension: 'mp3'
    };

    const TASK_VERSION = '1.4.1';

    const AFC_KEYS = ['d', 'f', 'j', 'k'];
    const AFC_KEY_LABELS = ['D', 'F', 'J', 'K'];

    function getAFCPositionForKey(key) {
        const lower = String(key || '').toLowerCase();
        const index = AFC_KEYS.indexOf(lower);
        return index >= 0 ? index + 1 : null;
    }
    
    // ========================================
    // Pseudoword List (Research-validated)
    // ========================================
    
    const PSEUDOWORDS = [
        "bosa", "manu", "colat", "kita", "daxen", "feppa",
        "golit", "hismo", "jober", "lunto", "moffy", "nalip",
        "pimwit", "regli", "sumbat", "tever", "vosek", "wugson",
        "blicket", "gazzer", "toma", "ziffin", "cheem", "noba"
    ];

    const PRACTICE_CONFIG = {
        enabled: true,
        trials: 12,
        audioBasePath: 'audio_check',
        audioBasePathFallback: '../audio_check',
        audioExtension: 'mp3'
    };

    const PRACTICE_ITEMS = [
        { id: 'check_1', label: 'apple' },
        { id: 'check_2', label: 'banana' },
        { id: 'check_3', label: 'cat' },
        { id: 'check_4', label: 'carrot' },
        { id: 'check_5', label: 'bird' },
        { id: 'check_6', label: 'cherry' },
        { id: 'check_7', label: 'dog' },
        { id: 'check_8', label: 'fish' },
        { id: 'check_9', label: 'grape' },
        { id: 'check_10', label: 'rabbit' },
        { id: 'check_11', label: 'orange' },
        { id: 'check_12', label: 'potato' }
    ];
    
    // ========================================
    // Novel Objects (SVG Definitions)
    // ========================================
    
    const NOVEL_OBJECTS = [
        // Object 1: Spiky blob
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff6b6b"/>
                    <stop offset="100%" style="stop-color:#ee5a5a"/>
                </linearGradient>
            </defs>
            <path d="M50 10 L58 30 L80 25 L68 45 L90 55 L68 60 L75 85 L50 70 L25 85 L32 60 L10 55 L32 45 L20 25 L42 30 Z" fill="url(#grad1)" stroke="#c0392b" stroke-width="2"/>
            <circle cx="42" cy="45" r="5" fill="white"/>
            <circle cx="58" cy="45" r="5" fill="white"/>
        </svg>`,
        
        // Object 2: Triple ring
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4ecdc4"/>
                    <stop offset="100%" style="stop-color:#44a08d"/>
                </linearGradient>
            </defs>
            <circle cx="35" cy="40" r="20" fill="none" stroke="url(#grad2)" stroke-width="8"/>
            <circle cx="65" cy="40" r="20" fill="none" stroke="url(#grad2)" stroke-width="8"/>
            <circle cx="50" cy="65" r="20" fill="none" stroke="url(#grad2)" stroke-width="8"/>
        </svg>`,
        
        // Object 3: Wavy rectangle
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#a855f7"/>
                    <stop offset="100%" style="stop-color:#7c3aed"/>
                </linearGradient>
            </defs>
            <path d="M15 25 Q30 15, 50 25 Q70 35, 85 25 L85 75 Q70 85, 50 75 Q30 65, 15 75 Z" fill="url(#grad3)" stroke="#6b21a8" stroke-width="2"/>
            <line x1="30" y1="40" x2="70" y2="40" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <line x1="30" y1="55" x2="70" y2="55" stroke="white" stroke-width="3" stroke-linecap="round"/>
        </svg>`,
        
        // Object 4: Diamond stack
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f59e0b"/>
                    <stop offset="100%" style="stop-color:#d97706"/>
                </linearGradient>
            </defs>
            <polygon points="50,10 70,30 50,50 30,30" fill="url(#grad4)" stroke="#b45309" stroke-width="2"/>
            <polygon points="50,35 75,55 50,75 25,55" fill="url(#grad4)" stroke="#b45309" stroke-width="2"/>
            <polygon points="50,55 65,70 50,85 35,70" fill="url(#grad4)" stroke="#b45309" stroke-width="2"/>
        </svg>`,
        
        // Object 5: Blob with dots
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#06b6d4"/>
                    <stop offset="100%" style="stop-color:#0891b2"/>
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="40" ry="35" fill="url(#grad5)" stroke="#0e7490" stroke-width="2"/>
            <circle cx="35" cy="40" r="6" fill="white"/>
            <circle cx="50" cy="55" r="6" fill="white"/>
            <circle cx="65" cy="40" r="6" fill="white"/>
        </svg>`,
        
        // Object 6: Cross shape
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ec4899"/>
                    <stop offset="100%" style="stop-color:#db2777"/>
                </linearGradient>
            </defs>
            <path d="M40 15 L60 15 L60 40 L85 40 L85 60 L60 60 L60 85 L40 85 L40 60 L15 60 L15 40 L40 40 Z" fill="url(#grad6)" stroke="#be185d" stroke-width="2"/>
        </svg>`,
        
        // Object 7: Crescent
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8b5cf6"/>
                    <stop offset="100%" style="stop-color:#7c3aed"/>
                </linearGradient>
            </defs>
            <path d="M70 15 A40 40 0 1 1 70 85 A30 30 0 1 0 70 15" fill="url(#grad7)" stroke="#6d28d9" stroke-width="2"/>
        </svg>`,
        
        // Object 8: Arrow shape
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981"/>
                    <stop offset="100%" style="stop-color:#059669"/>
                </linearGradient>
            </defs>
            <polygon points="50,10 85,50 65,50 65,90 35,90 35,50 15,50" fill="url(#grad8)" stroke="#047857" stroke-width="2"/>
        </svg>`,
        
        // Object 9: Hexagon with circle
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad9" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f472b6"/>
                    <stop offset="100%" style="stop-color:#ec4899"/>
                </linearGradient>
            </defs>
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="url(#grad9)" stroke="#be185d" stroke-width="2"/>
            <circle cx="50" cy="50" r="18" fill="white" stroke="#be185d" stroke-width="2"/>
        </svg>`,
        
        // Object 10: Spiral
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad10" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fbbf24"/>
                    <stop offset="100%" style="stop-color:#f59e0b"/>
                </linearGradient>
            </defs>
            <path d="M50 50 Q70 30 60 50 Q50 70 50 50 Q50 30 70 50 Q90 70 50 50 Q10 30 50 50 Q90 70 50 90 Q10 70 50 50" 
                  fill="none" stroke="url(#grad10)" stroke-width="8" stroke-linecap="round"/>
        </svg>`,
        
        // Object 11: Star burst
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad11" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#2563eb"/>
                </linearGradient>
            </defs>
            <polygon points="50,5 56,40 90,35 62,52 80,85 50,62 20,85 38,52 10,35 44,40" fill="url(#grad11)" stroke="#1d4ed8" stroke-width="2"/>
        </svg>`,
        
        // Object 12: Cloud shape
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad12" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#a78bfa"/>
                    <stop offset="100%" style="stop-color:#8b5cf6"/>
                </linearGradient>
            </defs>
            <path d="M25 60 A15 15 0 0 1 35 35 A20 20 0 0 1 70 35 A15 15 0 0 1 80 55 A12 12 0 0 1 75 75 L25 75 A15 15 0 0 1 25 60" 
                  fill="url(#grad12)" stroke="#7c3aed" stroke-width="2"/>
        </svg>`,
        
        // Object 13: Triangle stack
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad13" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#14b8a6"/>
                    <stop offset="100%" style="stop-color:#0d9488"/>
                </linearGradient>
            </defs>
            <polygon points="50,10 80,50 20,50" fill="url(#grad13)" stroke="#0f766e" stroke-width="2"/>
            <polygon points="50,40 85,90 15,90" fill="url(#grad13)" stroke="#0f766e" stroke-width="2"/>
        </svg>`,
        
        // Object 14: Donut
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad14" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fb7185"/>
                    <stop offset="100%" style="stop-color:#f43f5e"/>
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#grad14)" stroke="#e11d48" stroke-width="2"/>
            <circle cx="50" cy="50" r="18" fill="#0a0e14"/>
        </svg>`,
        
        // Object 15: Lightning bolt
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad15" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#facc15"/>
                    <stop offset="100%" style="stop-color:#eab308"/>
                </linearGradient>
            </defs>
            <polygon points="55,5 25,50 45,50 35,95 75,45 52,45 65,5" fill="url(#grad15)" stroke="#ca8a04" stroke-width="2"/>
        </svg>`,
        
        // Object 16: Flower
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad16" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#c084fc"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                </linearGradient>
            </defs>
            <circle cx="50" cy="30" r="15" fill="url(#grad16)" stroke="#9333ea" stroke-width="2"/>
            <circle cx="30" cy="50" r="15" fill="url(#grad16)" stroke="#9333ea" stroke-width="2"/>
            <circle cx="70" cy="50" r="15" fill="url(#grad16)" stroke="#9333ea" stroke-width="2"/>
            <circle cx="50" cy="70" r="15" fill="url(#grad16)" stroke="#9333ea" stroke-width="2"/>
            <circle cx="50" cy="50" r="10" fill="#fbbf24"/>
        </svg>`,
        
        // Object 17: Pill shape
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad17" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#22d3ee"/>
                    <stop offset="100%" style="stop-color:#06b6d4"/>
                </linearGradient>
            </defs>
            <rect x="20" y="35" width="60" height="30" rx="15" fill="url(#grad17)" stroke="#0891b2" stroke-width="2"/>
            <line x1="50" y1="35" x2="50" y2="65" stroke="#0891b2" stroke-width="2"/>
            <circle cx="35" cy="50" r="5" fill="white"/>
        </svg>`,
        
        // Object 18: Heart variant
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad18" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f87171"/>
                    <stop offset="100%" style="stop-color:#ef4444"/>
                </linearGradient>
            </defs>
            <path d="M50 85 L20 55 A20 20 0 0 1 50 30 A20 20 0 0 1 80 55 Z" fill="url(#grad18)" stroke="#dc2626" stroke-width="2"/>
        </svg>`,
        
        // Object 19: Hourglass
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad19" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#818cf8"/>
                    <stop offset="100%" style="stop-color:#6366f1"/>
                </linearGradient>
            </defs>
            <polygon points="25,15 75,15 50,50 75,85 25,85 50,50" fill="url(#grad19)" stroke="#4f46e5" stroke-width="2"/>
            <line x1="20" y1="15" x2="80" y2="15" stroke="#4f46e5" stroke-width="4"/>
            <line x1="20" y1="85" x2="80" y2="85" stroke="#4f46e5" stroke-width="4"/>
        </svg>`,
        
        // Object 20: Leaf
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad20" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#4ade80"/>
                    <stop offset="100%" style="stop-color:#22c55e"/>
                </linearGradient>
            </defs>
            <path d="M50 10 Q90 30 80 70 Q60 90 50 90 Q40 90 20 70 Q10 30 50 10" fill="url(#grad20)" stroke="#16a34a" stroke-width="2"/>
            <path d="M50 25 Q50 55 50 85" fill="none" stroke="#16a34a" stroke-width="3"/>
            <path d="M50 45 Q35 35 25 45" fill="none" stroke="#16a34a" stroke-width="2"/>
            <path d="M50 60 Q65 50 75 60" fill="none" stroke="#16a34a" stroke-width="2"/>
        </svg>`,
        
        // Object 21: Gear
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad21" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#78716c"/>
                    <stop offset="100%" style="stop-color:#57534e"/>
                </linearGradient>
            </defs>
            <path d="M45 15 L55 15 L57 25 L67 27 L73 18 L82 27 L73 33 L77 43 L87 45 L87 55 L77 57 L73 67 L82 73 L73 82 L67 73 L57 77 L55 87 L45 87 L43 77 L33 73 L27 82 L18 73 L27 67 L23 57 L13 55 L13 45 L23 43 L27 33 L18 27 L27 18 L33 27 L43 25 Z" 
                  fill="url(#grad21)" stroke="#44403c" stroke-width="2"/>
            <circle cx="50" cy="50" r="12" fill="#0a0e14"/>
        </svg>`,
        
        // Object 22: Fish
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad22" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fb923c"/>
                    <stop offset="100%" style="stop-color:#f97316"/>
                </linearGradient>
            </defs>
            <ellipse cx="55" cy="50" rx="35" ry="25" fill="url(#grad22)" stroke="#ea580c" stroke-width="2"/>
            <polygon points="15,50 35,35 35,65" fill="url(#grad22)" stroke="#ea580c" stroke-width="2"/>
            <circle cx="75" cy="45" r="5" fill="white"/>
            <circle cx="77" cy="45" r="2" fill="#0a0e14"/>
        </svg>`,
        
        // Object 23: Bell
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad23" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fcd34d"/>
                    <stop offset="100%" style="stop-color:#fbbf24"/>
                </linearGradient>
            </defs>
            <path d="M50 15 Q75 25 75 55 L80 70 L20 70 L25 55 Q25 25 50 15" fill="url(#grad23)" stroke="#d97706" stroke-width="2"/>
            <ellipse cx="50" cy="70" rx="30" ry="8" fill="url(#grad23)" stroke="#d97706" stroke-width="2"/>
            <circle cx="50" cy="82" r="7" fill="url(#grad23)" stroke="#d97706" stroke-width="2"/>
            <circle cx="50" cy="12" r="4" fill="#d97706"/>
        </svg>`,
        
        // Object 24: Mushroom
        `<svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad24" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e879f9"/>
                    <stop offset="100%" style="stop-color:#d946ef"/>
                </linearGradient>
            </defs>
            <ellipse cx="50" cy="40" rx="40" ry="25" fill="url(#grad24)" stroke="#c026d3" stroke-width="2"/>
            <rect x="35" y="55" width="30" height="35" rx="5" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
            <circle cx="35" cy="35" r="8" fill="white" opacity="0.7"/>
            <circle cx="60" cy="28" r="6" fill="white" opacity="0.7"/>
            <circle cx="50" cy="45" r="5" fill="white" opacity="0.7"/>
        </svg>`
    ];
    
    // ========================================
    // State Management
    // ========================================
    
    const STATE = {
        phase: 'setup',
        pairs: [],  // [{word, objectIndex}]
        pairMap: new Map(),
        learningTrials: [],
        learningTrialLogs: [],
        learningWordEvents: [],
        practiceTrials: [],
        practiceData: [],
        afcData: [],
        afcTrials: [],

        currentTrialIndex: 0,
        currentTestIndex: 0,
        currentPracticeIndex: 0,
        currentLearningTrialLog: null,
        currentPracticeTrial: null,
        practiceAwaitingResponse: false,

        experimentStartTime: null,
        experimentStartPerf: null,
        autoDownloaded: false,
        randomSeed: null,
        random: null,
        wordMap: new Map(),
        audioPreloadComplete: false,
        audioPreloadOk: false,
        audioMissing: [],
        practiceAudioPreloadOk: false,
        practiceAudioMissing: []
    };
    
    // ========================================
    // Utilities
    // ========================================

    function createSeededRandom(seed) {
        let t = seed >>> 0;
        return function () {
            t += 0x6D2B79F5;
            let x = t;
            x = Math.imul(x ^ (x >>> 15), x | 1);
            x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
            return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
        };
    }

    function rand() {
        return STATE.random ? STATE.random() : Math.random();
    }

    function randomInt(max) {
        return Math.floor(rand() * max);
    }

    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = randomInt(i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    function ensurePracticeScreens() {
        if (document.getElementById('practice-instructions-screen')) return;
        const host = document.querySelector('.screen')?.parentElement || document.body;
        const screen = document.createElement('div');
        screen.id = 'practice-instructions-screen';
        screen.className = 'screen';
        screen.innerHTML = `
            <div class="screen-content">
                <h2>練習セッション</h2>
                <p>本番の学習に入る前に、キーボード操作の練習を行います。</p>
                <div class="instruction-card">
                    <h3>操作方法</h3>
                    <p>左手は <strong>D・F</strong>、右手は <strong>J・K</strong> に置いてください。</p>
                    <p>画面の各選択肢には <strong>D / F / J / K</strong> のラベルが表示されます。</p>
                    <p>音声が終わったら、聞こえた英単語に対応するラベルのキーを押してください。</p>
                    <p>マウスは使わず、指はキーから離さないでください。</p>
                </div>
                <button class="btn" onclick="startPractice()">練習を開始</button>
            </div>
        `;
        host.appendChild(screen);
    }

    function ensureInstructionHints() {
        const afcScreen = document.getElementById('afc-instructions-screen');
        if (afcScreen && !afcScreen.querySelector('.afc-key-hint')) {
            const hint = document.createElement('p');
            hint.className = 'afc-key-hint';
            hint.textContent = '回答は D / F / J / K のキーボード入力のみです。';
            afcScreen.appendChild(hint);
        }
    }

    function applyDefaultSettingsDisplay() {
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        const baseGrid = `${CONFIG.objectsPerTrial}×${CONFIG.objectsPerTrial}`;
        
        setText('setting-difficulty', baseGrid);
        setText('setting-num-pairs', CONFIG.numPairs);
        setText('setting-repetitions', CONFIG.repetitions);
        setText('setting-trial-duration', CONFIG.trialDuration);
        setText('setting-word-interval', CONFIG.wordInterval);
        setText('setting-iti', CONFIG.iti);
    }
    
    // ========================================
    // Audio Playback (pre-generated files)
    // ========================================
    
    const AUDIO_CACHE = new Map();
    const PRACTICE_AUDIO_CACHE = new Map();
    let activeAudio = null;

    function getAudioForKey(key, basePath, extension, cache) {
        const normalized = String(key || '').toLowerCase();
        if (!cache.has(normalized)) {
            const audio = new Audio(`${basePath}/${normalized}.${extension}`);
            audio.preload = 'auto';
            cache.set(normalized, audio);
        }
        return cache.get(normalized);
    }

    function getAudioForWord(word) {
        return getAudioForKey(word, CONFIG.audioBasePath, CONFIG.audioExtension, AUDIO_CACHE);
    }

    function getPracticeAudio(id) {
        return getAudioForKey(id, PRACTICE_CONFIG.audioBasePath, PRACTICE_CONFIG.audioExtension, PRACTICE_AUDIO_CACHE);
    }

    function playAudioElement(audio, callback, onStart) {
        if (activeAudio && activeAudio !== audio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
        }
        activeAudio = audio;
        audio.currentTime = 0;

        let finished = false;
        let started = false;
        const markStarted = () => {
            if (started) return;
            started = true;
            if (onStart) onStart();
        };
        const cleanup = () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('play', markStarted);
            audio.removeEventListener('playing', markStarted);
        };
        const finish = (ok) => {
            if (finished) return;
            finished = true;
            cleanup();
            if (callback) callback(ok);
        };
        const handleEnded = () => finish(true);
        const handleError = () => finish(false);

        audio.addEventListener('ended', handleEnded, { once: true });
        audio.addEventListener('error', handleError, { once: true });
        audio.addEventListener('play', markStarted, { once: true });
        audio.addEventListener('playing', markStarted, { once: true });

        audio.play().then(() => {
            markStarted();
        }).catch(() => finish(false));
    }

    function playAudio(word, callback, onStart) {
        const audio = getAudioForWord(word);
        playAudioElement(audio, callback, onStart);
    }

    function playPracticeAudio(id, callback, onStart) {
        const audio = getPracticeAudio(id);
        playAudioElement(audio, callback, onStart);
    }

    function preloadAudioFiles(keys, basePath, extension, cache) {
        const uniqueKeys = Array.from(new Set(keys.map(key => String(key || '').toLowerCase())));
        const preloaders = uniqueKeys.map((key) => {
            const audio = getAudioForKey(key, basePath, extension, cache);
            if (audio.readyState >= 2) {
                return Promise.resolve({ key, ok: true });
            }
            return new Promise((resolve) => {
                const onReady = () => {
                    cleanup();
                    resolve({ key, ok: true });
                };
                const onError = () => {
                    cleanup();
                    resolve({ key, ok: false });
                };
                const cleanup = () => {
                    audio.removeEventListener('canplaythrough', onReady);
                    audio.removeEventListener('error', onError);
                };
                audio.addEventListener('canplaythrough', onReady);
                audio.addEventListener('error', onError);
                audio.load();
            });
        });
        return Promise.all(preloaders);
    }

    function preloadAudio(words) {
        return preloadAudioFiles(words, CONFIG.audioBasePath, CONFIG.audioExtension, AUDIO_CACHE);
    }

    function preloadPracticeAudio() {
        const ids = PRACTICE_ITEMS.map(item => item.id);
        return preloadAudioFiles(ids, PRACTICE_CONFIG.audioBasePath, PRACTICE_CONFIG.audioExtension, PRACTICE_AUDIO_CACHE)
            .then((results) => {
                const missing = results.filter(result => !result.ok);
                if (missing.length === ids.length && PRACTICE_CONFIG.audioBasePathFallback) {
                    const fallbackCache = new Map();
                    return preloadAudioFiles(
                        ids,
                        PRACTICE_CONFIG.audioBasePathFallback,
                        PRACTICE_CONFIG.audioExtension,
                        fallbackCache
                    ).then((fallbackResults) => {
                        const fallbackMissing = fallbackResults.filter(result => !result.ok);
                        if (fallbackMissing.length < missing.length) {
                            PRACTICE_AUDIO_CACHE.clear();
                            fallbackCache.forEach((value, key) => {
                                PRACTICE_AUDIO_CACHE.set(key, value);
                            });
                            PRACTICE_CONFIG.audioBasePath = PRACTICE_CONFIG.audioBasePathFallback;
                            return fallbackResults;
                        }
                        return results;
                    });
                }
                return results;
            });
    }
    
    function testAudio() {
        const status = document.getElementById('audio-test-status');
        if (status) {
            status.textContent = '再生中...';
            status.style.color = 'var(--text-muted)';
        }
        
        playAudio(PSEUDOWORDS[0], (ok) => {
            if (!status) return;
            if (ok) {
                const practiceMissing = PRACTICE_CONFIG.enabled && !STATE.practiceAudioPreloadOk;
                if (STATE.audioPreloadComplete && (!STATE.audioPreloadOk || practiceMissing)) {
                    const parts = [];
                    if (!STATE.audioPreloadOk) parts.push(`本試行:${STATE.audioMissing.length}件`);
                    if (practiceMissing) parts.push(`練習:${STATE.practiceAudioMissing.length}件`);
                    status.textContent = `✗ 音声ファイル不足: ${parts.join(' / ')}`;
                    status.style.color = 'var(--accent-error)';
                } else {
                    status.textContent = '✓ 音声OK';
                    status.style.color = 'var(--accent-success)';
                }
            } else {
                status.textContent = '✗ 音声ファイルを確認してください';
                status.style.color = 'var(--accent-error)';
            }
        });
    }

    function setStartButtonEnabled(enabled) {
        const button = document.getElementById('start-experiment');
        if (button) {
            button.disabled = !enabled;
        }
    }

    function startAudioPreload() {
        const status = document.getElementById('audio-test-status');
        if (status) {
            status.textContent = '音声ファイルを確認中...';
            status.style.color = 'var(--text-muted)';
        }
        setStartButtonEnabled(false);

        const mainPromise = preloadAudio(PSEUDOWORDS);
        const practicePromise = PRACTICE_CONFIG.enabled ? preloadPracticeAudio() : Promise.resolve([]);

        Promise.all([mainPromise, practicePromise]).then(([mainResults, practiceResults]) => {
            const missingMain = mainResults.filter(r => !r.ok).map(r => r.key);
            const missingPractice = practiceResults.filter(r => !r.ok).map(r => r.key);
            STATE.audioPreloadComplete = true;
            STATE.audioMissing = missingMain;
            STATE.audioPreloadOk = missingMain.length === 0;
            STATE.practiceAudioMissing = missingPractice;
            STATE.practiceAudioPreloadOk = missingPractice.length === 0;

            const allOk = STATE.audioPreloadOk && STATE.practiceAudioPreloadOk;
            if (allOk) {
                if (status) {
                    status.textContent = '✓ 音声OK';
                    status.style.color = 'var(--accent-success)';
                }
                setStartButtonEnabled(true);
            } else {
                if (status) {
                    const parts = [];
                    if (missingMain.length > 0) parts.push(`本試行:${missingMain.length}件`);
                    if (PRACTICE_CONFIG.enabled && missingPractice.length > 0) {
                        parts.push(`練習:${missingPractice.length}件`);
                    }
                    const detail = parts.length ? parts.join(' / ') : `${missingMain.length + missingPractice.length}件`;
                    status.textContent = `✗ 音声ファイル不足: ${detail}`;
                    status.style.color = 'var(--accent-error)';
                }
                console.warn('Missing audio files:', {
                    main: missingMain,
                    practice: missingPractice
                });
                setStartButtonEnabled(false);
            }
        }).catch((error) => {
            console.error('Audio preload failed:', error);
            STATE.audioPreloadComplete = true;
            STATE.audioPreloadOk = false;
            STATE.practiceAudioPreloadOk = false;
            if (status) {
                status.textContent = '✗ 音声の確認に失敗しました';
                status.style.color = 'var(--accent-error)';
            }
            setStartButtonEnabled(false);
        });
    }
    
    // ========================================
    // Experiment Setup
    // ========================================
    
    function startExperiment() {
        // Gather config
        CONFIG.participantId = document.getElementById('participant-id').value || 'P000';

        if (!STATE.audioPreloadOk || (PRACTICE_CONFIG.enabled && !STATE.practiceAudioPreloadOk)) {
            const status = document.getElementById('audio-test-status');
            if (status) {
                status.textContent = '✗ 音声ファイルを確認してください';
                status.style.color = 'var(--accent-error)';
            }
            return;
        }

        STATE.randomSeed = Date.now();
        STATE.random = createSeededRandom(STATE.randomSeed);
        STATE.autoDownloaded = false;
        
        // Generate pairs
        generatePairs();
        
        // Generate learning trials
        if (!generateLearningTrials()) {
            return;
        }

        ensurePracticeScreens();
        ensureInstructionHints();

        if (PRACTICE_CONFIG.enabled) {
            showScreen('practice-instructions-screen');
        } else {
            showScreen('instructions-screen');
        }
    }
    
    function generatePairs() {
        // Select words and objects
        const selectedWords = shuffleArray(PSEUDOWORDS).slice(0, CONFIG.numPairs);
        const selectedObjects = shuffleArray([...Array(NOVEL_OBJECTS.length).keys()]).slice(0, CONFIG.numPairs);
        
        STATE.pairs = selectedWords.map((word, i) => ({
            word: word,
            objectIndex: selectedObjects[i],
            pairId: i
        }));

        STATE.pairMap = new Map(STATE.pairs.map(pair => [pair.pairId, pair]));
        STATE.wordMap = new Map(STATE.pairs.map(pair => [pair.word, pair]));
    }
    
    function generateLearningTrials() {
        STATE.learningTrials = [];

        const objectsPerTrial = CONFIG.objectsPerTrial;
        const repetitions = CONFIG.repetitions;
        const totalOccurrences = STATE.pairs.length * repetitions;

        if (totalOccurrences % objectsPerTrial !== 0) {
            reportLearningTrialGenerationError(
                `学習試行の生成に失敗しました（${totalOccurrences}が${objectsPerTrial}で割り切れません）。`
            );
            return false;
        }

        if (STATE.pairs.length < objectsPerTrial * 2) {
            reportLearningTrialGenerationError(
                `連続提示の禁止には少なくとも${objectsPerTrial * 2}ペアが必要です。`
            );
            return false;
        }

        const maxAttempts = 500;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const trials = buildLearningTrialsWithConstraints(STATE.pairs, objectsPerTrial, repetitions);
            if (trials) {
                STATE.learningTrials = trials;
                return true;
            }
        }

        reportLearningTrialGenerationError(
            '学習試行の生成に失敗しました。設定値を見直してください。'
        );
        return false;
    }

    function reportLearningTrialGenerationError(message) {
        console.error(message);
        alert(message);
    }

    function buildLearningTrialsWithConstraints(pairs, objectsPerTrial, repetitions) {
        const totalTrials = (pairs.length * repetitions) / objectsPerTrial;
        const counts = new Map(pairs.map(pair => [pair.pairId, repetitions]));
        const trials = [];
        let prevIds = new Set();

        for (let t = 0; t < totalTrials; t++) {
            const candidates = pairs.filter(pair => {
                const remaining = counts.get(pair.pairId) || 0;
                return remaining > 0 && !prevIds.has(pair.pairId);
            });

            if (candidates.length < objectsPerTrial) {
                return null;
            }

            const ranked = shuffleArray(candidates).sort((a, b) => {
                return (counts.get(b.pairId) || 0) - (counts.get(a.pairId) || 0);
            });
            const poolSize = Math.min(ranked.length, Math.max(objectsPerTrial * 2, objectsPerTrial));
            const pool = ranked.slice(0, poolSize);
            const selected = shuffleArray(pool).slice(0, objectsPerTrial);

            const trialPairs = selected.map(pair => {
                const remaining = (counts.get(pair.pairId) || 0) - 1;
                counts.set(pair.pairId, remaining);
                const rep = repetitions - remaining;
                return { ...pair, rep };
            });

            const shuffledPairs = shuffleArray(trialPairs);
            trials.push({
                trialNum: t + 1,
                pairs: shuffledPairs,
                objects: shuffledPairs.map(p => p.objectIndex),
                words: shuffleArray(shuffledPairs.map(p => p.word))
            });
            prevIds = new Set(trialPairs.map(pair => pair.pairId));
        }

        if ([...counts.values()].some(remaining => remaining !== 0)) {
            return null;
        }

        return trials;
    }

    function generateAFCTestTrials() {
        const blocks = CONFIG.testBlocks;
        const trials = [];
        const disallowMap = new Map();
        const distractorCount = CONFIG.objectsPerTrial - 1;

        for (let block = 1; block <= blocks; block++) {
            const blockTrials = buildAFCBlockTrials(STATE.pairs, distractorCount, disallowMap);
            const targetPositions = buildBalancedTargetPositions(blockTrials.length, CONFIG.objectsPerTrial);

            blockTrials.forEach((trial, index) => {
                const targetPosition = targetPositions[index];
                const options = buildAFCOptionOrder(trial.targetPair, trial.distractors, targetPosition);
                const signature = buildDistractorSignature(trial.distractors);
                const existing = disallowMap.get(trial.targetPair.pairId) || new Set();
                existing.add(signature);
                disallowMap.set(trial.targetPair.pairId, existing);

                trials.push({
                    block,
                    blockTrial: index + 1,
                    targetPair: trial.targetPair,
                    distractors: trial.distractors,
                    targetPosition,
                    options
                });
            });
        }

        STATE.afcTrials = trials;
    }

    function buildAFCBlockTrials(pairs, distractorCount, disallowMap = new Map()) {
        const maxAttempts = 200;
        const maxPerPair = distractorCount;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const targetOrder = shuffleArray([...pairs]);
            const counts = new Map(pairs.map(p => [p.pairId, 0]));
            const trials = [];
            let ok = true;

            for (const targetPair of targetOrder) {
                const candidates = pairs.filter(p =>
                    p.pairId !== targetPair.pairId && counts.get(p.pairId) < maxPerPair
                );

                if (candidates.length < distractorCount) {
                    ok = false;
                    break;
                }

                const chosen = pickDistractors(candidates, counts, distractorCount, disallowMap.get(targetPair.pairId));
                if (!chosen) {
                    ok = false;
                    break;
                }
                chosen.forEach(pair => {
                    counts.set(pair.pairId, counts.get(pair.pairId) + 1);
                });

                trials.push({ targetPair, distractors: chosen });
            }

            if (ok) {
                return trials;
            }
        }

        const fallbackOrder = shuffleArray([...pairs]);
        return fallbackOrder.map(targetPair => {
            const disallowed = disallowMap.get(targetPair.pairId);
            let distractors = shuffleArray(
                pairs.filter(p => p.pairId !== targetPair.pairId)
            ).slice(0, distractorCount);
            let attempts = 0;
            while (disallowed && disallowed.has(buildDistractorSignature(distractors)) && attempts < 30) {
                distractors = shuffleArray(
                    pairs.filter(p => p.pairId !== targetPair.pairId)
                ).slice(0, distractorCount);
                attempts++;
            }
            return { targetPair, distractors };
        });
    }

    function buildBalancedTargetPositions(trialCount, positionsCount) {
        const baseCount = Math.floor(trialCount / positionsCount);
        const positions = [];
        for (let pos = 1; pos <= positionsCount; pos++) {
            for (let i = 0; i < baseCount; i++) {
                positions.push(pos);
            }
        }
        const remainder = trialCount - positions.length;
        const extras = shuffleArray(
            Array.from({ length: positionsCount }, (_, i) => i + 1)
        ).slice(0, remainder);
        positions.push(...extras);
        return shuffleArray(positions);
    }

    function buildAFCOptionOrder(targetPair, distractors, targetPosition) {
        const optionCount = CONFIG.objectsPerTrial;
        const options = Array(optionCount).fill(null);
        options[targetPosition - 1] = targetPair.pairId;

        const remainingPositions = [];
        for (let pos = 1; pos <= optionCount; pos++) {
            if (pos !== targetPosition) remainingPositions.push(pos);
        }

        const shuffledDistractors = shuffleArray([...distractors]);
        remainingPositions.forEach((pos, index) => {
            options[pos - 1] = shuffledDistractors[index].pairId;
        });

        return options;
    }

    function buildDistractorSignature(distractors) {
        return distractors
            .map(pair => pair.pairId)
            .sort((a, b) => a - b)
            .join('-');
    }

    function pickDistractors(candidates, counts, distractorCount, disallowedSignatures) {
        const ranked = shuffleArray(candidates).sort((a, b) => {
            return counts.get(a.pairId) - counts.get(b.pairId);
        });

        const initial = ranked.slice(0, distractorCount);
        const initialSignature = buildDistractorSignature(initial);
        if (!disallowedSignatures || !disallowedSignatures.has(initialSignature)) {
            return initial;
        }

        for (let replaceIndex = 0; replaceIndex < distractorCount; replaceIndex++) {
            for (let i = distractorCount; i < ranked.length; i++) {
                const candidate = ranked[i];
                if (initial.some(pair => pair.pairId === candidate.pairId)) continue;
                const updated = initial.slice();
                updated[replaceIndex] = candidate;
                const signature = buildDistractorSignature(updated);
                if (!disallowedSignatures || !disallowedSignatures.has(signature)) {
                    return updated;
                }
            }
        }

        for (let attempt = 0; attempt < 30; attempt++) {
            const sample = shuffleArray(candidates).slice(0, distractorCount);
            const signature = buildDistractorSignature(sample);
            if (!disallowedSignatures || !disallowedSignatures.has(signature)) {
                return sample;
            }
        }

        return null;
    }

    // ========================================
    // Practice Phase (Keyboard Familiarization)
    // ========================================

    function generatePracticeTrials() {
        const trials = [];
        const trialCount = Math.max(1, PRACTICE_CONFIG.trials);
        const targets = shuffleArray(PRACTICE_ITEMS);

        for (let i = 0; i < trialCount; i++) {
            const target = targets[i % targets.length];
            const distractors = shuffleArray(
                PRACTICE_ITEMS.filter(item => item.id !== target.id)
            ).slice(0, CONFIG.objectsPerTrial - 1);
            const options = shuffleArray([target, ...distractors]);

            trials.push({
                trial: i + 1,
                options,
                target
            });
        }

        return trials;
    }

    function startPractice() {
        STATE.phase = 'practice';
        STATE.currentPracticeIndex = 0;
        STATE.practiceData = [];
        STATE.practiceTrials = generatePracticeTrials();

        showCountdown(() => {
            showScreen('afc-screen');
            runPracticeTrial();
        });
    }

    function runPracticeTrial() {
        if (STATE.currentPracticeIndex >= STATE.practiceTrials.length) {
            endPractice();
            return;
        }

        const currentTrial = STATE.practiceTrials[STATE.currentPracticeIndex];
        const total = STATE.practiceTrials.length;

        // Update progress
        document.getElementById('afc-progress').style.width =
            `${(STATE.currentPracticeIndex / total) * 100}%`;
        document.getElementById('afc-counter').textContent =
            `練習 ${STATE.currentPracticeIndex + 1} / ${total}`;

        // Display options as text labels
        const container = document.getElementById('afc-objects');
        container.innerHTML = currentTrial.options.map((item, i) => `
            <div class="object-wrapper" data-practice-id="${item.id}" data-position="${i + 1}">
                <span class="object-number">${AFC_KEY_LABELS[i] || ''}</span>
                <div class="practice-label">${item.label}</div>
            </div>
        `).join('');

        const audioStatus = document.getElementById('audio-status');
        if (audioStatus) {
            audioStatus.style.display = 'flex';
        }

        STATE.currentPracticeTrial = {
            trial: currentTrial.trial,
            options: currentTrial.options,
            targetId: currentTrial.target.id,
            targetLabel: currentTrial.target.label,
            onsetTime: null
        };

        STATE.practiceAwaitingResponse = false;

        playPracticeAudio(currentTrial.target.id, (ok) => {
            if (audioStatus) {
                audioStatus.style.display = 'none';
            }
            STATE.currentPracticeTrial.onsetTime = performance.now();
            STATE.currentPracticeTrial.audioPlayOk = ok ? 1 : 0;
            STATE.practiceAwaitingResponse = true;
        });
    }

    function selectPracticeObject(optionId, responseSource = '') {
        if (!STATE.practiceAwaitingResponse) return;
        STATE.practiceAwaitingResponse = false;

        const trial = STATE.currentPracticeTrial;
        const responsePerfMs = performance.now();
        const rtRaw = trial.onsetTime ? (responsePerfMs - trial.onsetTime) : 0;
        const correct = optionId === trial.targetId;

        STATE.practiceData.push({
            trial: trial.trial,
            targetId: trial.targetId,
            targetLabel: trial.targetLabel,
            selectedId: optionId,
            correct: correct ? 1 : 0,
            rt: Math.round(rtRaw),
            responseSource
        });

        setTimeout(() => {
            STATE.currentPracticeIndex++;
            runPracticeTrial();
        }, 400);
    }

    function endPractice() {
        STATE.phase = 'instructions';
        showScreen('instructions-screen');
    }
    
    // ========================================
    // Learning Phase
    // ========================================
    
    function startLearning() {
        STATE.phase = 'learning';
        STATE.currentTrialIndex = 0;
        STATE.experimentStartTime = Date.now();
        STATE.experimentStartPerf = performance.now();
        STATE.learningTrialLogs = [];
        STATE.learningWordEvents = [];
        STATE.currentLearningTrialLog = null;
        
        showCountdown(() => {
            showScreen('learning-screen');
            runLearningTrial();
        });
    }
    
    function showCountdown(callback) {
        showScreen('countdown-screen');
        let count = 3;
        const el = document.getElementById('countdown-number');
        el.textContent = count;
        
        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                el.textContent = count;
            } else {
                clearInterval(interval);
                callback();
            }
        }, 1000);
    }

    function createLearningTrialLog(trial, trialIndex, totalTrials, startTimestamp, startPerfMs) {
        const pairIds = (trial.pairs || []).map(p => p.pairId);
        const objectIndices = (trial.objects || []);
        const wordsInTrial = (trial.pairs || []).map(p => p.word);
        const wordOrder = (trial.words || []);
        const wordOrderPairIds = wordOrder.map(word => {
            const pair = STATE.wordMap.get(word);
            return pair ? pair.pairId : '';
        });

        return {
            trialNum: trial.trialNum ?? '',
            trialIndex,
            totalTrials,
            objectsPerTrial: objectIndices.length,
            pairIds,
            objectIndices,
            objectPositions: objectIndices.map((_, idx) => idx + 1),
            wordsInTrial,
            wordOrder,
            wordOrderPairIds,
            repList: (trial.pairs || []).map(p => p.rep),
            trialStartTimestamp: startTimestamp,
            trialStartPerfMs: startPerfMs,
            trialEndTimestamp: '',
            trialEndPerfMs: '',
            trialDurationMs: ''
        };
    }
    
    function runLearningTrial() {
        if (STATE.currentTrialIndex >= STATE.learningTrials.length) {
            endLearningPhase();
            return;
        }
        
        const trial = STATE.learningTrials[STATE.currentTrialIndex];
        const total = STATE.learningTrials.length;
        const trialIndex = STATE.currentTrialIndex + 1;
        const trialStartTimestamp = Date.now();
        const trialStartPerfMs = performance.now();
        const trialLog = createLearningTrialLog(trial, trialIndex, total, trialStartTimestamp, trialStartPerfMs);
        STATE.learningTrialLogs.push(trialLog);
        STATE.currentLearningTrialLog = trialLog;
        
        // Update progress
        document.getElementById('learning-progress').style.width = 
            `${(STATE.currentTrialIndex / total) * 100}%`;
        document.getElementById('learning-counter').textContent = 
            `試行 ${STATE.currentTrialIndex + 1} / ${total}`;
        
        // Display objects
        const objectsContainer = document.getElementById('learning-objects');
        objectsContainer.innerHTML = trial.objects.map((objIdx, i) => `
            <div class="object-wrapper">
                <span class="object-number">${i + 1}</span>
                ${NOVEL_OBJECTS[objIdx]}
            </div>
        `).join('');
        
        // Play words sequentially
        playWordsSequentially(trial.words, 0, () => {
            // Wait remaining time then next trial
            const elapsedApprox = trial.words.length * CONFIG.wordInterval;
            const remaining = Math.max(500, CONFIG.trialDuration - elapsedApprox);
            
            setTimeout(() => {
                if (trialLog) {
                    const trialEndPerfMs = performance.now();
                    const trialEndTimestamp = Date.now();
                    trialLog.trialEndTimestamp = trialEndTimestamp;
                    trialLog.trialEndPerfMs = trialEndPerfMs;
                    trialLog.trialDurationMs = Math.round(trialEndPerfMs - trialLog.trialStartPerfMs);
                }
                STATE.currentTrialIndex++;
                
                // Brief ISI with fixation
                objectsContainer.innerHTML = '<div class="fixation">+</div>';
                
                setTimeout(() => {
                    runLearningTrial();
                }, CONFIG.iti);
            }, remaining);
        }, trialLog);
    }
    
    function playWordsSequentially(words, index, callback, trialLog) {
        if (index >= words.length) {
            callback();
            return;
        }
        
        const word = words[index];
        const queuedStartPerfMs = performance.now();
        const queuedStartTimestamp = Date.now();
        let audioStartPerfMs = null;
        let audioStartTimestamp = null;

        playAudio(word, (ok) => {
            const audioEndPerfMs = performance.now();
            const audioEndTimestamp = Date.now();
            const startPerfMs = audioStartPerfMs ?? queuedStartPerfMs;
            const startTimestamp = audioStartTimestamp ?? queuedStartTimestamp;
            const pair = STATE.wordMap.get(word);
            const pairId = pair ? pair.pairId : '';
            const objectIndex = pair ? pair.objectIndex : '';
            const onsetFromTrialStartMs = trialLog && typeof trialLog.trialStartPerfMs === 'number' ?
                Math.round(startPerfMs - trialLog.trialStartPerfMs) : '';

            STATE.learningWordEvents.push({
                trialNum: trialLog ? trialLog.trialNum : '',
                trialIndex: trialLog ? trialLog.trialIndex : '',
                wordIndex: index + 1,
                word,
                pairId,
                objectIndex,
                audioStartTimestamp: startTimestamp,
                audioEndTimestamp: audioEndTimestamp,
                audioStartPerfMs: Math.round(startPerfMs),
                audioEndPerfMs: Math.round(audioEndPerfMs),
                audioDurationMs: Math.round(audioEndPerfMs - startPerfMs),
                onsetFromTrialStartMs,
                playbackOk: ok ? 1 : 0
            });

            setTimeout(() => {
                playWordsSequentially(words, index + 1, callback, trialLog);
            }, CONFIG.wordInterval);
        }, () => {
            audioStartPerfMs = performance.now();
            audioStartTimestamp = Date.now();
        });
    }
    
    function endLearningPhase() {
        STATE.phase = 'afc-instructions';
        showScreen('afc-instructions-screen');
    }
    
    // ========================================
    // 4AFC Test
    // ========================================
    
    function startAFCTest() {
        STATE.phase = 'afc';
        STATE.currentTestIndex = 0;
        STATE.afcData = [];
        generateAFCTestTrials();
        
        showCountdown(() => {
            showScreen('afc-screen');
            runAFCTrial();
        });
    }
    
    function runAFCTrial() {
        if (STATE.currentTestIndex >= STATE.afcTrials.length) {
            endAFCTest();
            return;
        }
        
        const currentTrial = STATE.afcTrials[STATE.currentTestIndex];
        const targetPair = currentTrial.targetPair;
        const total = STATE.afcTrials.length;
        
        // Update progress
        document.getElementById('afc-progress').style.width = 
            `${(STATE.currentTestIndex / total) * 100}%`;
        document.getElementById('afc-counter').textContent = 
            `${STATE.currentTestIndex + 1} / ${total}`;
        
        // Use precomputed option order
        const options = currentTrial.options.map(pairId => STATE.pairMap.get(pairId));
        
        // Display objects
        const container = document.getElementById('afc-objects');
        container.innerHTML = options.map((pair, i) => `
            <div class="object-wrapper" data-pair-id="${pair.pairId}" data-position="${i + 1}">
                <span class="object-number">${AFC_KEY_LABELS[i] || ''}</span>
                ${NOVEL_OBJECTS[pair.objectIndex]}
            </div>
        `).join('');
        
        // Play word
        const audioStatus = document.getElementById('audio-status');
        if (audioStatus) {
            audioStatus.style.display = 'flex';
        }

        // Store trial info
        const trialStartTimestamp = Date.now();
        const trialStartPerfMs = performance.now();

        STATE.currentAFCTrial = {
            block: currentTrial.block,
            blockTrial: currentTrial.blockTrial,
            targetPosition: currentTrial.targetPosition,
            targetPairId: targetPair.pairId,
            targetWord: targetPair.word,
            targetObjectIndex: targetPair.objectIndex,
            options: currentTrial.options,
            onsetTime: null,
            trialStartTimestamp,
            trialStartPerfMs,
            audioStartTimestamp: null,
            audioStartPerfMs: null,
            audioEndTimestamp: null,
            audioEndPerfMs: null,
            audioPlayOk: null
        };

        STATE.awaitingAFCResponse = false;

        playAudio(targetPair.word, (ok) => {
            if (audioStatus) {
                audioStatus.style.display = 'none';
            }
            const audioEndPerfMs = performance.now();
            const audioEndTimestamp = Date.now();
            if (STATE.currentAFCTrial.audioStartPerfMs === null) {
                STATE.currentAFCTrial.audioStartPerfMs = STATE.currentAFCTrial.trialStartPerfMs;
                STATE.currentAFCTrial.audioStartTimestamp = STATE.currentAFCTrial.trialStartTimestamp;
            }
            STATE.currentAFCTrial.audioEndPerfMs = audioEndPerfMs;
            STATE.currentAFCTrial.audioEndTimestamp = audioEndTimestamp;
            STATE.currentAFCTrial.audioPlayOk = ok ? 1 : 0;
            STATE.currentAFCTrial.onsetTime = audioEndPerfMs;
            STATE.awaitingAFCResponse = true;
        }, () => {
            STATE.currentAFCTrial.audioStartPerfMs = performance.now();
            STATE.currentAFCTrial.audioStartTimestamp = Date.now();
        });
    }
    
    function selectAFCObject(pairId, responseSource = '') {
        if (!STATE.awaitingAFCResponse) return;
        STATE.awaitingAFCResponse = false;
        
        const trial = STATE.currentAFCTrial;
        const responsePerfMs = performance.now();
        const responseTimestamp = Date.now();
        const rtRaw = trial.onsetTime ? (responsePerfMs - trial.onsetTime) : 0;
        const correct = pairId === trial.targetPairId;
        const position = trial.options.indexOf(pairId) + 1;
        const audioDurationMs = trial.audioStartPerfMs !== null && trial.audioEndPerfMs !== null ?
            Math.round(trial.audioEndPerfMs - trial.audioStartPerfMs) : '';
        
        // Record data
        STATE.afcData.push({
            seed: STATE.randomSeed,
            block: trial.block,
            blockTrial: trial.blockTrial,
            trial: STATE.currentTestIndex + 1,
            targetPairId: trial.targetPairId,
            targetWord: trial.targetWord,
            targetObjectIndex: trial.targetObjectIndex,
            selectedPairId: pairId,
            selectedPosition: position,
            correct: correct ? 1 : 0,
            rt: Math.round(rtRaw),
            rtRaw: Math.round(rtRaw * 1000) / 1000,
            trialStartTimestamp: trial.trialStartTimestamp,
            trialStartPerfMs: trial.trialStartPerfMs,
            audioStartTimestamp: trial.audioStartTimestamp,
            audioStartPerfMs: trial.audioStartPerfMs,
            audioEndTimestamp: trial.audioEndTimestamp,
            audioEndPerfMs: trial.audioEndPerfMs,
            audioDurationMs,
            audioPlayOk: trial.audioPlayOk,
            responsePerfMs,
            responseSource,
            timestamp: responseTimestamp,
            targetPosition: trial.targetPosition,
            option1PairId: trial.options[0],
            option2PairId: trial.options[1],
            option3PairId: trial.options[2],
            option4PairId: trial.options[3]
        });
        
        setTimeout(() => {
            STATE.currentTestIndex++;
            runAFCTrial();
        }, 600);
    }
    
    function endAFCTest() {
        STATE.phase = 'results';
        calculateResults();
        showScreen('results-screen');
        autoDownloadResults();
    }
    
    // ========================================
    // Results
    // ========================================
    
    function calculateResults() {
        // AFC test results
        const afcCorrect = STATE.afcData.filter(d => d.correct === 1).length;
        const afcTotal = STATE.afcData.length;
        const afcAccuracy = afcTotal > 0 ? (afcCorrect / afcTotal) * 100 : 0;
        
        // Chance-corrected accuracy
        const chanceLevel = 100 / CONFIG.objectsPerTrial;
        const afcCorrected = ((afcAccuracy - chanceLevel) / (100 - chanceLevel)) * 100;
        
        // Mean RT
        const afcMeanRT = STATE.afcData.length > 0 ?
            STATE.afcData.reduce((s, d) => s + d.rt, 0) / STATE.afcData.length : 0;
        
        // Display main results
        document.getElementById('main-results').innerHTML = `
            <div class="result-card">
                <div class="result-value">${afcAccuracy.toFixed(1)}%</div>
                <div class="result-label">4AFC正答率</div>
            </div>
            <div class="result-card">
                <div class="result-value">${afcCorrected.toFixed(1)}%</div>
                <div class="result-label">チャンス補正正答率</div>
            </div>
            <div class="result-card">
                <div class="result-value">${Math.round(afcMeanRT)}</div>
                <div class="result-label">4AFC平均RT (ms)</div>
            </div>
            <div class="result-card">
                <div class="result-value">${CONFIG.numPairs}</div>
                <div class="result-label">学習ペア数</div>
            </div>
        `;
        
        // Detailed results table
        const detailedHTML = `
            <thead>
                <tr>
                    <th>ブロック</th>
                    <th>試行</th>
                    <th>単語</th>
                    <th>正誤</th>
                    <th>RT</th>
                </tr>
            </thead>
            <tbody>
                ${STATE.afcData.map(d => `
                    <tr>
                        <td>${d.block}</td>
                        <td>${d.trial}</td>
                        <td style="font-family: 'IBM Plex Mono', monospace;">${d.targetWord}</td>
                        <td>${d.correct ? '✓' : '✗'}</td>
                        <td>${d.rt} ms</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        document.getElementById('detailed-results').innerHTML = detailedHTML;
        
        // Learning curve chart
        drawLearningChart();
    }
    
    function drawLearningChart() {
        const svg = document.getElementById('learning-chart');
        const data = STATE.afcData;
        
        if (data.length === 0) return;
        
        // Calculate block accuracy (use test blocks if available)
        const blocks = [];
        const maxBlock = Math.max(...data.map(d => d.block || 1));
        if (maxBlock > 1) {
            for (let b = 1; b <= maxBlock; b++) {
                const blockData = data.filter(d => d.block === b);
                if (blockData.length === 0) continue;
                const acc = blockData.reduce((s, d) => s + d.correct, 0) / blockData.length * 100;
                blocks.push(acc);
            }
        } else {
            const blockSize = Math.max(1, Math.floor(data.length / 4));
            for (let i = 0; i < data.length; i += blockSize) {
                const blockData = data.slice(i, i + blockSize);
                const acc = blockData.reduce((s, d) => s + d.correct, 0) / blockData.length * 100;
                blocks.push(acc);
            }
        }
        
        const width = svg.clientWidth || 400;
        const height = 200;
        const padding = 40;
        
        const xScale = (i) => padding + (i / (blocks.length - 1)) * (width - padding * 2);
        const yScale = (v) => height - padding - (v / 100) * (height - padding * 2);
        
        let svgContent = `
            <!-- Grid lines -->
            <line x1="${padding}" y1="${yScale(25)}" x2="${width - padding}" y2="${yScale(25)}" 
                  stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
            <text x="${padding - 5}" y="${yScale(25)}" fill="#64748b" font-size="10" text-anchor="end">25%</text>
            
            <line x1="${padding}" y1="${yScale(50)}" x2="${width - padding}" y2="${yScale(50)}" 
                  stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
            <text x="${padding - 5}" y="${yScale(50)}" fill="#64748b" font-size="10" text-anchor="end">50%</text>
            
            <line x1="${padding}" y1="${yScale(75)}" x2="${width - padding}" y2="${yScale(75)}" 
                  stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
            <text x="${padding - 5}" y="${yScale(75)}" fill="#64748b" font-size="10" text-anchor="end">75%</text>
            
            <line x1="${padding}" y1="${yScale(100)}" x2="${width - padding}" y2="${yScale(100)}" 
                  stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
            <text x="${padding - 5}" y="${yScale(100)}" fill="#64748b" font-size="10" text-anchor="end">100%</text>
            
            <!-- Chance line -->
            <line x1="${padding}" y1="${yScale(25)}" x2="${width - padding}" y2="${yScale(25)}" 
                  stroke="#ef4444" stroke-width="2" stroke-dasharray="8,4"/>
            <text x="${width - padding + 5}" y="${yScale(25)}" fill="#ef4444" font-size="10">チャンス</text>
            
            <!-- Axes -->
            <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" 
                  stroke="#64748b" stroke-width="2"/>
            <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" 
                  stroke="#64748b" stroke-width="2"/>
            
            <!-- Data line -->
            <polyline points="${blocks.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ')}"
                      fill="none" stroke="url(#chartGradient)" stroke-width="3"/>
            
            <!-- Data points -->
            ${blocks.map((v, i) => `
                <circle cx="${xScale(i)}" cy="${yScale(v)}" r="6" fill="#6366f1"/>
                <text x="${xScale(i)}" y="${yScale(v) - 12}" fill="#f1f5f9" font-size="11" text-anchor="middle">
                    ${v.toFixed(0)}%
                </text>
            `).join('')}
            
            <!-- X axis labels -->
            ${blocks.map((_, i) => `
                <text x="${xScale(i)}" y="${height - padding + 20}" fill="#94a3b8" font-size="11" text-anchor="middle">
                    Block ${i + 1}
                </text>
            `).join('')}
            
            <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#6366f1"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                </linearGradient>
            </defs>
        `;
        
        svg.innerHTML = svgContent;
    }
    
    // ========================================
    // Data Export
    // ========================================

    function setDownloadStatus(message) {
        const el = document.getElementById('download-status');
        if (el) {
            el.textContent = message;
        }
    }

    function autoDownloadResults() {
        if (STATE.autoDownloaded) return;
        STATE.autoDownloaded = true;

        setDownloadStatus('Excel結果をダウンロードしています...');

        setTimeout(() => {
            try {
                downloadWorkbook();
                setTimeout(() => {
                    setDownloadStatus('Excelのダウンロードが始まらない場合は下のボタンを押してください。');
                }, 600);
            } catch (e) {
                console.error('Auto download failed:', e);
                setDownloadStatus('Excelの自動ダウンロードに失敗しました。下のボタンから保存してください。');
            }
        }, 200);
    }

    function buildCooccurrenceIndex() {
        const wordTotals = new Map();
        const wordObjectCounts = new Map();

        STATE.learningTrials.forEach(trial => {
            const words = new Set(trial.words || []);
            const objects = new Set(trial.objects || []);

            words.forEach(word => {
                wordTotals.set(word, (wordTotals.get(word) || 0) + 1);
                let objMap = wordObjectCounts.get(word);
                if (!objMap) {
                    objMap = new Map();
                    wordObjectCounts.set(word, objMap);
                }
                objects.forEach(objIdx => {
                    objMap.set(objIdx, (objMap.get(objIdx) || 0) + 1);
                });
            });
        });

        return { wordTotals, wordObjectCounts };
    }

    function buildLearningTrialsTable() {
        const headers = [
            'trialNum', 'trialIndex', 'totalTrials', 'objectsPerTrial',
            'pairIds', 'objectIndices', 'objectPositions',
            'wordsInTrial', 'wordOrder', 'wordOrderPairIds', 'repList',
            'trialStartTimestamp', 'trialStartTimestampISO', 'trialStartPerfMs',
            'trialEndTimestamp', 'trialEndTimestampISO', 'trialEndPerfMs',
            'trialDurationMs', 'trialStartElapsedMs', 'trialEndElapsedMs'
        ];

        const logs = STATE.learningTrialLogs && STATE.learningTrialLogs.length > 0 ?
            STATE.learningTrialLogs :
            STATE.learningTrials.map((trial, idx) =>
                createLearningTrialLog(trial, idx + 1, STATE.learningTrials.length, '', '')
            );
        const experimentStart = typeof STATE.experimentStartTime === 'number' ? STATE.experimentStartTime : null;

        const rows = logs.map(trial => {
            const pairIds = (trial.pairIds || []).join('|');
            const objectIndices = (trial.objectIndices || []).join('|');
            const objectPositions = (trial.objectPositions || []).join('|');
            const wordsInTrial = (trial.wordsInTrial || []).join('|');
            const wordOrder = (trial.wordOrder || []).join('|');
            const wordOrderPairIds = (trial.wordOrderPairIds || []).join('|');
            const repList = (trial.repList || []).join('|');
            const trialStartTimestampISO = trial.trialStartTimestamp ?
                new Date(trial.trialStartTimestamp).toISOString() : '';
            const trialEndTimestampISO = trial.trialEndTimestamp ?
                new Date(trial.trialEndTimestamp).toISOString() : '';
            const trialStartElapsedMs = experimentStart && trial.trialStartTimestamp ?
                trial.trialStartTimestamp - experimentStart : '';
            const trialEndElapsedMs = experimentStart && trial.trialEndTimestamp ?
                trial.trialEndTimestamp - experimentStart : '';
            return [
                trial.trialNum ?? '',
                trial.trialIndex ?? '',
                trial.totalTrials ?? '',
                trial.objectsPerTrial ?? '',
                pairIds,
                objectIndices,
                objectPositions,
                wordsInTrial,
                wordOrder,
                wordOrderPairIds,
                repList,
                trial.trialStartTimestamp ?? '',
                trialStartTimestampISO,
                trial.trialStartPerfMs ?? '',
                trial.trialEndTimestamp ?? '',
                trialEndTimestampISO,
                trial.trialEndPerfMs ?? '',
                trial.trialDurationMs ?? '',
                trialStartElapsedMs,
                trialEndElapsedMs
            ];
        });

        return { headers, rows };
    }

    function buildLearningEventsTable() {
        const headers = [
            'trialNum', 'trialIndex', 'wordIndex',
            'word', 'pairId', 'objectIndex',
            'audioStartTimestamp', 'audioStartTimestampISO', 'audioStartPerfMs',
            'audioEndTimestamp', 'audioEndTimestampISO', 'audioEndPerfMs',
            'audioDurationMs', 'onsetFromTrialStartMs', 'playbackOk'
        ];

        const rows = STATE.learningWordEvents.map(event => {
            const audioStartTimestampISO = event.audioStartTimestamp ?
                new Date(event.audioStartTimestamp).toISOString() : '';
            const audioEndTimestampISO = event.audioEndTimestamp ?
                new Date(event.audioEndTimestamp).toISOString() : '';
            return [
                event.trialNum ?? '',
                event.trialIndex ?? '',
                event.wordIndex ?? '',
                event.word ?? '',
                event.pairId ?? '',
                event.objectIndex ?? '',
                event.audioStartTimestamp ?? '',
                audioStartTimestampISO,
                event.audioStartPerfMs ?? '',
                event.audioEndTimestamp ?? '',
                audioEndTimestampISO,
                event.audioEndPerfMs ?? '',
                event.audioDurationMs ?? '',
                event.onsetFromTrialStartMs ?? '',
                event.playbackOk ?? ''
            ];
        });

        return { headers, rows };
    }

    function buildPairMapTable() {
        const headers = ['pairId', 'word', 'objectIndex'];
        const rows = STATE.pairs.map(pair => [
            pair.pairId ?? '',
            pair.word ?? '',
            pair.objectIndex ?? ''
        ]);
        return { headers, rows };
    }

    function buildConfigTable() {
        const experimentStartISO = STATE.experimentStartTime ?
            new Date(STATE.experimentStartTime).toISOString() : '';
        const rows = [
            ['taskVersion', TASK_VERSION],
            ['participantId', CONFIG.participantId],
            ['randomSeed', STATE.randomSeed ?? ''],
            ['experimentStart', STATE.experimentStartTime ?? ''],
            ['experimentStartISO', experimentStartISO],
            ['experimentStartPerfMs', STATE.experimentStartPerf ?? ''],
            ['numPairs', CONFIG.numPairs],
            ['repetitions', CONFIG.repetitions],
            ['objectsPerTrial', CONFIG.objectsPerTrial],
            ['testBlocks', CONFIG.testBlocks],
            ['trialDurationMs', CONFIG.trialDuration],
            ['wordIntervalMs', CONFIG.wordInterval],
            ['itiMs', CONFIG.iti],
            ['audioBasePath', CONFIG.audioBasePath],
            ['audioExtension', CONFIG.audioExtension],
            ['audioPreloadOk', STATE.audioPreloadOk ? 1 : 0],
            ['audioMissingCount', STATE.audioMissing.length],
            ['audioMissingList', STATE.audioMissing.join('|')],
            ['practiceEnabled', PRACTICE_CONFIG.enabled ? 1 : 0],
            ['practiceTrials', PRACTICE_CONFIG.trials],
            ['practiceAudioBasePath', PRACTICE_CONFIG.audioBasePath],
            ['practiceAudioExtension', PRACTICE_CONFIG.audioExtension],
            ['practiceAudioPreloadOk', STATE.practiceAudioPreloadOk ? 1 : 0],
            ['practiceAudioMissingCount', STATE.practiceAudioMissing.length],
            ['practiceAudioMissingList', STATE.practiceAudioMissing.join('|')],
            ['userAgent', navigator.userAgent || '']
        ];
        return { headers: ['key', 'value'], rows };
    }

    function buildAptitudeTable() {
        const headers = [
            'participantId', 'seed', 'scope', 'block', 'blockIndex',
            'n_total', 'n_scored', 'n_correct',
            'pc', 'pc_chance_corrected', 'mean_rt',
            'n_missed', 'missed_rate', 'dpc',
            'chance_level', 'rt_unit'
        ];

        const chanceLevel = 1 / Math.max(1, CONFIG.objectsPerTrial);
        const rtUnit = 'ms';
        const toNumber = (value, digits) => {
            if (value === null || value === undefined || Number.isNaN(value)) return '';
            return Number(value.toFixed(digits));
        };

        const computeStats = (trials) => {
            const nTotal = trials.length;
            const scored = trials.filter(d => d && (d.correct === 0 || d.correct === 1));
            const nScored = scored.length;
            const nCorrect = scored.reduce((sum, d) => sum + d.correct, 0);
            const pc = nScored > 0 ? (nCorrect / nScored) : null;
            const denom = 1 - chanceLevel;
            const pcChanceCorrected = (pc !== null && denom > 0) ? ((pc - chanceLevel) / denom) : null;
            const rtValues = scored
                .map(d => d.rt)
                .filter(rt => typeof rt === 'number' && Number.isFinite(rt));
            const meanRt = rtValues.length > 0
                ? (rtValues.reduce((sum, rt) => sum + rt, 0) / rtValues.length)
                : null;
            const nMissed = nTotal - nScored;
            const missedRate = nTotal > 0 ? (nMissed / nTotal) : null;
            return {
                nTotal,
                nScored,
                nCorrect,
                pc,
                pcChanceCorrected,
                meanRt,
                nMissed,
                missedRate
            };
        };

        const rows = [];
        const seed = STATE.randomSeed ?? '';
        const participantId = CONFIG.participantId;

        const overallStats = computeStats(STATE.afcData);
        rows.push([
            participantId,
            seed,
            'overall',
            '',
            '',
            overallStats.nTotal,
            overallStats.nScored,
            overallStats.nCorrect,
            toNumber(overallStats.pc, 6),
            toNumber(overallStats.pcChanceCorrected, 6),
            toNumber(overallStats.meanRt, 3),
            overallStats.nMissed,
            toNumber(overallStats.missedRate, 6),
            '',
            toNumber(chanceLevel, 6),
            rtUnit
        ]);

        const blockNumbers = Array.from(new Set(STATE.afcData.map(d => d.block)))
            .filter(block => block !== undefined && block !== null)
            .sort((a, b) => a - b);
        let prevPc = null;

        blockNumbers.forEach((block, index) => {
            const blockTrials = STATE.afcData.filter(d => d.block === block);
            const stats = computeStats(blockTrials);
            const dpc = (prevPc !== null && stats.pc !== null) ? (stats.pc - prevPc) : null;

            rows.push([
                participantId,
                seed,
                'block',
                block,
                index + 1,
                stats.nTotal,
                stats.nScored,
                stats.nCorrect,
                toNumber(stats.pc, 6),
                toNumber(stats.pcChanceCorrected, 6),
                toNumber(stats.meanRt, 3),
                stats.nMissed,
                toNumber(stats.missedRate, 6),
                toNumber(dpc, 6),
                toNumber(chanceLevel, 6),
                rtUnit
            ]);

            if (stats.pc !== null) {
                prevPc = stats.pc;
            }
        });

        return { headers, rows };
    }

    function buildAptitudeNotesTable() {
        const headers = ['field', 'meaning'];
        const rows = [
            ['data_scope', 'Computed from 4AFC test trials in the Data sheet only.'],
            ['participantId', 'Participant ID entered at start.'],
            ['seed', 'Random seed used for trial generation.'],
            ['scope', 'overall = all test trials; block = block-level summary.'],
            ['block', 'Test block number (blank for overall).'],
            ['blockIndex', 'Order of blocks after sorting by block number.'],
            ['n_total', 'Total trials in scope.'],
            ['n_scored', 'Trials with valid accuracy (correct = 0 or 1).'],
            ['n_correct', 'Number of correct trials.'],
            ['pc', 'Proportion correct (n_correct / n_scored).'],
            ['pc_chance_corrected', 'Chance-corrected pc = (pc - chance_level) / (1 - chance_level).'],
            ['mean_rt', 'Mean RT (ms) across scored trials; RT is from audio end to response.'],
            ['n_missed', 'Trials without valid accuracy (n_total - n_scored).'],
            ['missed_rate', 'n_missed / n_total.'],
            ['dpc', 'Change in pc relative to previous block; blank for first block.'],
            ['chance_level', 'Chance performance = 1 / objectsPerTrial.'],
            ['rt_unit', 'Unit for RT values (ms).']
        ];
        return { headers, rows };
    }

    function buildFoilProbabilityTable() {
        const { wordTotals, wordObjectCounts } = buildCooccurrenceIndex();
        const headers = [
            'participantId', 'seed', 'block', 'blockTrial', 'trial',
            'targetPairId', 'targetWord', 'targetObjectIndex',
            'optionIndex', 'optionPairId', 'optionWord', 'optionObjectIndex',
            'isTarget', 'cooccurCount', 'wordTrialCount', 'cooccurProb'
        ];

        const rows = [];

        STATE.afcData.forEach(trial => {
            const optionPairIds = [
                trial.option1PairId,
                trial.option2PairId,
                trial.option3PairId,
                trial.option4PairId
            ];
            const totalTrials = wordTotals.get(trial.targetWord) || 0;
            const countsForWord = wordObjectCounts.get(trial.targetWord);

            optionPairIds.forEach((pairId, index) => {
                const pair = STATE.pairMap.get(pairId);
                const optionWord = pair ? pair.word : '';
                const optionObjectIndex = pair ? pair.objectIndex : '';
                const count = countsForWord && optionObjectIndex !== '' ?
                    (countsForWord.get(optionObjectIndex) || 0) : 0;
                const prob = totalTrials ? (count / totalTrials) : '';
                const isTarget = pairId === trial.targetPairId ? 1 : 0;

                rows.push([
                    CONFIG.participantId,
                    trial.seed ?? '',
                    trial.block ?? '',
                    trial.blockTrial ?? '',
                    trial.trial ?? '',
                    trial.targetPairId ?? '',
                    trial.targetWord ?? '',
                    trial.targetObjectIndex ?? '',
                    index + 1,
                    pairId ?? '',
                    optionWord,
                    optionObjectIndex,
                    isTarget,
                    count,
                    totalTrials,
                    prob
                ]);
            });
        });

        return { headers, rows };
    }

    function buildDataTable() {
        const experimentStart = typeof STATE.experimentStartTime === 'number' ? STATE.experimentStartTime : null;
        const experimentStartISO = experimentStart ? new Date(experimentStart).toISOString() : '';

        const allData = STATE.afcData.map(d => ({
            participantId: CONFIG.participantId,
            experimentStart,
            experimentStartISO,
            ...d,
            timestampISO: d.timestamp ? new Date(d.timestamp).toISOString() : '',
            elapsedMs: experimentStart ? d.timestamp - experimentStart : ''
        }));

        const headers = [
            'participantId', 'seed', 'experimentStart', 'experimentStartISO',
            'block', 'blockTrial', 'trial', 'targetWord', 'targetObjectIndex', 'targetPosition',
            'option1PairId', 'option2PairId', 'option3PairId', 'option4PairId',
            'selectedPairId', 'selectedPosition', 'correct', 'rt',
            'timestamp', 'timestampISO', 'elapsedMs',
            'rtRaw', 'trialStartTimestamp', 'trialStartPerfMs',
            'audioStartTimestamp', 'audioStartPerfMs',
            'audioEndTimestamp', 'audioEndPerfMs', 'audioDurationMs',
            'audioPlayOk', 'responsePerfMs', 'responseSource'
        ];

        const rows = allData.map(d => headers.map(h => d[h] !== undefined ? d[h] : ''));
        return { headers, rows };
    }

    function buildSummaryText() {
        const afcCorrect = STATE.afcData.filter(d => d.correct === 1).length;
        const afcTotal = STATE.afcData.length;
        const experimentStartISO = STATE.experimentStartTime ? new Date(STATE.experimentStartTime).toISOString() : 'N/A';

        return `
# Cross-Situational Statistical Learning Task Summary
# Participant: ${CONFIG.participantId}
# Experiment Start: ${experimentStartISO}
# Downloaded At: ${new Date().toISOString()}
# Random Seed: ${STATE.randomSeed ?? 'N/A'}

## Configuration
Number of Pairs: ${CONFIG.numPairs}
Repetitions: ${CONFIG.repetitions}
Objects per Trial: ${CONFIG.objectsPerTrial} (${CONFIG.objectsPerTrial}x${CONFIG.objectsPerTrial})
Audio Source: ${CONFIG.audioBasePath}/*.${CONFIG.audioExtension}
Trial Duration: ${CONFIG.trialDuration}ms
Word Interval: ${CONFIG.wordInterval}ms
Test Blocks: ${CONFIG.testBlocks}
Test Trials: ${STATE.afcData.length}

## 4AFC Test Results
Correct: ${afcCorrect} / ${afcTotal}
Accuracy: ${afcTotal > 0 ? ((afcCorrect / afcTotal) * 100).toFixed(2) : 0}%
Chance-Corrected: ${afcTotal > 0 ? (((afcCorrect / afcTotal * 100) - (100 / CONFIG.objectsPerTrial)) / (100 - (100 / CONFIG.objectsPerTrial)) * 100).toFixed(2) : 0}%
Mean RT: ${afcTotal > 0 ? Math.round(STATE.afcData.reduce((s, d) => s + d.rt, 0) / afcTotal) : 0}ms

## Pair-wise Results
${STATE.pairs.map(pair => {
    const trials = STATE.afcData.filter(d => d.targetPairId === pair.pairId);
    const correctCount = trials.reduce((s, d) => s + d.correct, 0);
    const meanRt = trials.length > 0 ? Math.round(trials.reduce((s, d) => s + d.rt, 0) / trials.length) : 0;
    const byBlock = trials
        .sort((a, b) => a.block - b.block)
        .map(d => `B${d.block}:${d.correct ? '✓' : '✗'}`)
        .join(' ');
    return `${pair.word}: ${byBlock} (Correct ${correctCount}/${trials.length}, Mean RT ${meanRt}ms)`;
}).join('\n')}

## Test Order
${STATE.afcTrials.map(trial => {
    const optionWords = trial.options.map(id => STATE.pairMap.get(id)?.word ?? id).join(', ');
    return `B${trial.block} T${trial.blockTrial} ${trial.targetPair.word} (pos ${trial.targetPosition}) [${optionWords}]`;
}).join('\n')}
        `.trim();
    }
    
    function downloadData() {
        console.warn('CSV export disabled: Excel output only.');
        downloadWorkbook();
    }
    
    function downloadSummary() {
        console.warn('Summary text export disabled: Excel output only.');
        downloadWorkbook();
    }

    function downloadWorkbook() {
        if (typeof XLSX === 'undefined') {
            console.warn('XLSX library not available. Excel export cannot proceed.');
            setDownloadStatus('✗ Excel出力に必要なXLSXライブラリが見つかりません。');
            return;
        }

        const { headers, rows } = buildDataTable();
        const summaryText = buildSummaryText();
        const summaryLines = summaryText.split('\n').map(line => [line]);
        const learningTable = buildLearningTrialsTable();
        const learningEventsTable = buildLearningEventsTable();
        const pairMapTable = buildPairMapTable();
        const configTable = buildConfigTable();
        const aptitudeTable = buildAptitudeTable();
        const aptitudeNotesTable = buildAptitudeNotesTable();
        const foilTable = buildFoilProbabilityTable();

        const workbook = XLSX.utils.book_new();
        const dataSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryLines);
        const learningSheet = XLSX.utils.aoa_to_sheet([learningTable.headers, ...learningTable.rows]);
        const learningEventsSheet = XLSX.utils.aoa_to_sheet([learningEventsTable.headers, ...learningEventsTable.rows]);
        const pairMapSheet = XLSX.utils.aoa_to_sheet([pairMapTable.headers, ...pairMapTable.rows]);
        const configSheet = XLSX.utils.aoa_to_sheet([configTable.headers, ...configTable.rows]);
        const aptitudeSheet = XLSX.utils.aoa_to_sheet([aptitudeTable.headers, ...aptitudeTable.rows]);
        const aptitudeNotesSheet = XLSX.utils.aoa_to_sheet([aptitudeNotesTable.headers, ...aptitudeNotesTable.rows]);
        const foilSheet = XLSX.utils.aoa_to_sheet([foilTable.headers, ...foilTable.rows]);

        XLSX.utils.book_append_sheet(workbook, dataSheet, 'Data');
        XLSX.utils.book_append_sheet(workbook, learningSheet, 'LearningTrials');
        XLSX.utils.book_append_sheet(workbook, learningEventsSheet, 'LearningEvents');
        XLSX.utils.book_append_sheet(workbook, pairMapSheet, 'PairMap');
        XLSX.utils.book_append_sheet(workbook, configSheet, 'Config');
        XLSX.utils.book_append_sheet(workbook, aptitudeSheet, 'Aptitude');
        XLSX.utils.book_append_sheet(workbook, aptitudeNotesSheet, 'AptitudeNotes');
        XLSX.utils.book_append_sheet(workbook, foilSheet, 'FoilProbability');
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

        const output = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([output], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const safeParticipantId = sanitizeFilename(CONFIG.participantId);
        downloadBlob(blob, `CSSL_${safeParticipantId}_${formatDate()}.xlsx`);
    }
    
    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function downloadFile(content, filename, type, addBom = false) {
        const normalized = normalizeLineEndings(String(content));
        const payload = addBom ? `\ufeff${normalized}` : normalized;
        const blob = new Blob([payload], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function normalizeLineEndings(text) {
        return text.replace(/\r?\n/g, '\r\n');
    }

    function toCsvValue(value) {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (/[",\r\n]/.test(str)) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    }

    function sanitizeFilename(value) {
        const base = String(value || 'P000');
        const safe = base
            .replace(/[\\/:*?"<>|]/g, '_')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_+|_+$/g, '');
        return safe || 'P000';
    }

    function formatDate() {
        const now = new Date();
        return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
    }
    
    // ========================================
    // Event Listeners
    // ========================================
    
    document.addEventListener('keydown', (e) => {
        const activeElement = document.activeElement;
        const isEditingField = activeElement
            && (activeElement.tagName === 'INPUT'
                || activeElement.tagName === 'TEXTAREA'
                || activeElement.isContentEditable);

        if (e.code === 'Space' && !isEditingField) {
            const activeId = document.querySelector('.screen.active')?.id;
            if (activeId === 'welcome-screen') {
                e.preventDefault();
                const startButton = document.getElementById('start-experiment');
                if (startButton && !startButton.disabled) {
                    startExperiment();
                }
                return;
            }
            if (activeId === 'practice-instructions-screen') {
                e.preventDefault();
                startPractice();
                return;
            }
            if (activeId === 'instructions-screen') {
                e.preventDefault();
                startLearning();
                return;
            }
            if (activeId === 'afc-instructions-screen') {
                e.preventDefault();
                startAFCTest();
                return;
            }
        }
        // AFC test: D/F/J/K keys to select
        if (STATE.phase === 'afc' && STATE.awaitingAFCResponse) {
            const keyNum = getAFCPositionForKey(e.key);
            if (keyNum) {
                const wrapper = document.querySelector(`.object-wrapper[data-position="${keyNum}"]`);
                if (wrapper) {
                    const pairId = parseInt(wrapper.dataset.pairId);
                    selectAFCObject(pairId, 'key');
                }
            }
        }
        if (STATE.phase === 'practice' && STATE.practiceAwaitingResponse) {
            const keyNum = getAFCPositionForKey(e.key);
            if (keyNum) {
                const wrapper = document.querySelector(`.object-wrapper[data-position="${keyNum}"]`);
                if (wrapper) {
                    const optionId = wrapper.dataset.practiceId || '';
                    if (optionId) {
                        selectPracticeObject(optionId, 'key');
                    }
                }
            }
        }
    });
    
    // Prevent page refresh during experiment
    window.addEventListener('beforeunload', (e) => {
        if (STATE.phase !== 'setup' && STATE.phase !== 'results') {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // Initialize
    applyDefaultSettingsDisplay();
    startAudioPreload();
    console.log('CSSL Task initialized');
    console.log(`Version: ${TASK_VERSION}`);
    
