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
    
    // ========================================
    // Pseudoword List (Research-validated)
    // ========================================
    
    const PSEUDOWORDS = [
        "bosa", "manu", "colat", "kita", "daxen", "feppa",
        "golit", "hismo", "jober", "lunto", "moffy", "nalip",
        "pimwit", "regli", "sumbat", "tever", "vosek", "wugson",
        "blicket", "gazzer", "toma", "ziffin", "cheem", "noba"
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
        afcData: [],
        afcTrials: [],
        
        currentTrialIndex: 0,
        currentTestIndex: 0,
        
        experimentStartTime: null,
        autoDownloaded: false,
        randomSeed: null,
        random: null,
        audioPreloadComplete: false,
        audioPreloadOk: false,
        audioMissing: []
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
    let activeAudio = null;
    
    function getAudioForWord(word) {
        const key = word.toLowerCase();
        if (!AUDIO_CACHE.has(key)) {
            const audio = new Audio(`${CONFIG.audioBasePath}/${key}.${CONFIG.audioExtension}`);
            audio.preload = 'auto';
            AUDIO_CACHE.set(key, audio);
        }
        return AUDIO_CACHE.get(key);
    }
    
    function playAudio(word, callback) {
        const audio = getAudioForWord(word);
        if (activeAudio && activeAudio !== audio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
        }
        activeAudio = audio;
        audio.currentTime = 0;
        
        let finished = false;
        const finish = (ok) => {
            if (finished) return;
            finished = true;
            if (callback) callback(ok);
        };
        
        audio.addEventListener('ended', () => finish(true), { once: true });
        audio.addEventListener('error', () => finish(false), { once: true });
        
        audio.play().catch(() => finish(false));
    }
    
    function preloadAudio(words) {
        const uniqueWords = Array.from(new Set(words.map(word => word.toLowerCase())));
        const preloaders = uniqueWords.map((word) => {
            const audio = getAudioForWord(word);
            if (audio.readyState >= 2) {
                return Promise.resolve({ word, ok: true });
            }
            return new Promise((resolve) => {
                const onReady = () => {
                    cleanup();
                    resolve({ word, ok: true });
                };
                const onError = () => {
                    cleanup();
                    resolve({ word, ok: false });
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
    
    function testAudio() {
        const status = document.getElementById('audio-test-status');
        if (status) {
            status.textContent = '再生中...';
            status.style.color = 'var(--text-muted)';
        }
        
        playAudio(PSEUDOWORDS[0], (ok) => {
            if (!status) return;
            if (ok) {
                if (STATE.audioPreloadComplete && !STATE.audioPreloadOk) {
                    status.textContent = `✗ 音声ファイル不足: ${STATE.audioMissing.length}件`;
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

        preloadAudio(PSEUDOWORDS).then((results) => {
            const missing = results.filter(r => !r.ok).map(r => r.word);
            STATE.audioPreloadComplete = true;
            STATE.audioMissing = missing;
            STATE.audioPreloadOk = missing.length === 0;

            if (missing.length === 0) {
                if (status) {
                    status.textContent = '✓ 音声OK';
                    status.style.color = 'var(--accent-success)';
                }
                setStartButtonEnabled(true);
            } else {
                if (status) {
                    status.textContent = `✗ 音声ファイル不足: ${missing.length}件`;
                    status.style.color = 'var(--accent-error)';
                }
                console.warn('Missing audio files:', missing);
                setStartButtonEnabled(false);
            }
        }).catch((error) => {
            console.error('Audio preload failed:', error);
            STATE.audioPreloadComplete = true;
            STATE.audioPreloadOk = false;
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

        if (!STATE.audioPreloadOk) {
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
        generateLearningTrials();
        
        showScreen('instructions-screen');
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
    }
    
    function generateLearningTrials() {
        STATE.learningTrials = [];
        
        // Create balanced co-occurrence matrix
        // Each pair appears CONFIG.repetitions times
        // Within each trial, 4 objects + 4 words (4x4)
        
        const allPairings = [];
        for (let rep = 0; rep < CONFIG.repetitions; rep++) {
            for (const pair of STATE.pairs) {
                allPairings.push({ ...pair, rep });
            }
        }
        
        // Shuffle
        const shuffled = shuffleArray(allPairings);
        
        // Group into trials of 4
        const objectsPerTrial = CONFIG.objectsPerTrial;
        const numTrials = Math.ceil(shuffled.length / objectsPerTrial);
        
        for (let t = 0; t < numTrials; t++) {
            const trialPairs = shuffled.slice(t * objectsPerTrial, (t + 1) * objectsPerTrial);
            
            if (trialPairs.length < objectsPerTrial) {
                // Pad with random pairs if needed
                while (trialPairs.length < objectsPerTrial) {
                    const randomPair = STATE.pairs[randomInt(STATE.pairs.length)];
                    trialPairs.push({ ...randomPair, rep: -1 });
                }
            }
            
            // Shuffle order within trial
            const shuffledPairs = shuffleArray(trialPairs);
            
            STATE.learningTrials.push({
                trialNum: t + 1,
                pairs: shuffledPairs,
                objects: shuffledPairs.map(p => p.objectIndex),
                words: shuffleArray(shuffledPairs.map(p => p.word))  // Shuffle word order
            });
        }
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
    // Learning Phase
    // ========================================
    
    function startLearning() {
        STATE.phase = 'learning';
        STATE.currentTrialIndex = 0;
        STATE.experimentStartTime = Date.now();
        
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
    
    function runLearningTrial() {
        if (STATE.currentTrialIndex >= STATE.learningTrials.length) {
            endLearningPhase();
            return;
        }
        
        const trial = STATE.learningTrials[STATE.currentTrialIndex];
        const total = STATE.learningTrials.length;
        
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
                STATE.currentTrialIndex++;
                
                // Brief ISI with fixation
                objectsContainer.innerHTML = '<div class="fixation">+</div>';
                
                setTimeout(() => {
                    runLearningTrial();
                }, CONFIG.iti);
            }, remaining);
        });
    }
    
    function playWordsSequentially(words, index, callback) {
        if (index >= words.length) {
            callback();
            return;
        }
        
        const word = words[index];
        
        playAudio(word, () => {
            setTimeout(() => {
                playWordsSequentially(words, index + 1, callback);
            }, CONFIG.wordInterval);
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
            <div class="object-wrapper" data-pair-id="${pair.pairId}" data-position="${i + 1}" onclick="selectAFCObject(${pair.pairId})">
                <span class="object-number">${i + 1}</span>
                ${NOVEL_OBJECTS[pair.objectIndex]}
            </div>
        `).join('');
        
        // Play word
        const audioStatus = document.getElementById('audio-status');
        if (audioStatus) {
            audioStatus.style.display = 'flex';
        }

        // Store trial info
        STATE.currentAFCTrial = {
            block: currentTrial.block,
            blockTrial: currentTrial.blockTrial,
            targetPosition: currentTrial.targetPosition,
            targetPairId: targetPair.pairId,
            targetWord: targetPair.word,
            targetObjectIndex: targetPair.objectIndex,
            options: currentTrial.options,
            onsetTime: null,
            audioStartTime: null,
            audioEndTime: null
        };

        STATE.awaitingAFCResponse = false;
        STATE.currentAFCTrial.audioStartTime = performance.now();

        playAudio(targetPair.word, () => {
            if (audioStatus) {
                audioStatus.style.display = 'none';
            }
            STATE.currentAFCTrial.audioEndTime = performance.now();
            STATE.currentAFCTrial.onsetTime = STATE.currentAFCTrial.audioEndTime;
            STATE.awaitingAFCResponse = true;
        });
    }
    
    function selectAFCObject(pairId) {
        if (!STATE.awaitingAFCResponse) return;
        STATE.awaitingAFCResponse = false;
        
        const trial = STATE.currentAFCTrial;
        const rt = trial.onsetTime ? (performance.now() - trial.onsetTime) : 0;
        const correct = pairId === trial.targetPairId;
        const position = trial.options.indexOf(pairId) + 1;
        
        // Visual feedback
        document.querySelectorAll('.object-wrapper').forEach(el => {
            if (parseInt(el.dataset.pairId) === pairId) {
                el.classList.add(correct ? 'correct' : 'incorrect');
            }
            if (parseInt(el.dataset.pairId) === trial.targetPairId && !correct) {
                el.classList.add('correct');
            }
        });
        
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
            rt: Math.round(rt),
            timestamp: Date.now(),
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

        setDownloadStatus('結果データをダウンロードしています...');

        setTimeout(() => {
            try {
                downloadData();
                downloadWorkbook();
                setTimeout(() => {
                    setDownloadStatus('ダウンロードが始まらない場合は下のボタンを押してください。');
                }, 600);
            } catch (e) {
                console.error('Auto download failed:', e);
                setDownloadStatus('自動ダウンロードに失敗しました。下のボタンから保存してください。');
            }
        }, 200);
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
            'timestamp', 'timestampISO', 'elapsedMs'
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
        const { headers, rows } = buildDataTable();
        const csv = [headers.join(','), ...rows.map(r => r.map(toCsvValue).join(','))].join('\r\n');
        
        const safeParticipantId = sanitizeFilename(CONFIG.participantId);
        downloadFile(csv, `CSSL_${safeParticipantId}_${formatDate()}.csv`, 'text/csv;charset=utf-8', true);
    }
    
    function downloadSummary() {
        const summary = buildSummaryText();
        
        const safeParticipantId = sanitizeFilename(CONFIG.participantId);
        downloadFile(summary, `CSSL_Summary_${safeParticipantId}_${formatDate()}.txt`, 'text/plain;charset=utf-8', true);
    }

    function downloadWorkbook() {
        if (typeof XLSX === 'undefined') {
            console.warn('XLSX library not available. Falling back to summary text.');
            downloadSummary();
            return;
        }

        const { headers, rows } = buildDataTable();
        const summaryText = buildSummaryText();
        const summaryLines = summaryText.split('\n').map(line => [line]);

        const workbook = XLSX.utils.book_new();
        const dataSheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryLines);

        XLSX.utils.book_append_sheet(workbook, dataSheet, 'Data');
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
        // AFC test: 1-4 keys to select
        if (STATE.phase === 'afc' && STATE.awaitingAFCResponse) {
            const keyNum = parseInt(e.key);
            if (keyNum >= 1 && keyNum <= 4) {
                const wrapper = document.querySelector(`.object-wrapper[data-position="${keyNum}"]`);
                if (wrapper) {
                    const pairId = parseInt(wrapper.dataset.pairId);
                    selectAFCObject(pairId);
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
    console.log('Version: 1.0.0');
    
