// ============================================================================
// Cross-Situational Statistical Learning (CSSL) Task — Version 2.0.0
// Grounded in Yu & Smith (2007, Psychological Science) and
// Yu & Smith (2011, Developmental Science: attention & eye-movement dynamics)
// ============================================================================

const TASK_VERSION = '2.0.0';

const CONFIG = {
    participantId: '',
    numPairs: 18,
    repetitions: 6,
    objectsPerTrial: 4,          // 4x4 condition presented in symmetric 2x2 quadrants
    trialDuration: 12000,        // 12,000 ms (Yu & Smith, 2007 4x4 standard)
    initialSilence: 1200,        // 1,200 ms visual preview before Word 1 onset (Yu & Smith, 2011)
    wordSoa: 2700,               // 2,700 ms onset-to-onset window per word (1200 + 4 * 2700 = 12000 ms)
    wordInterval: 1000,          // Nominal inter-word pause metadata
    iti: 1000,                   // 1,000 ms central '+' fixation between learning trials
    afcIti: 750,                 // Central '+' interval between 4AFC trials
    afcCenterLeadMs: 150,        // Brief visual onset lead after clicking '+' before word audio
    minOnsetResponseMs: 300,     // Minimum latency from word onset (Yu & Smith, 2011: 100ms + 200ms)
    responseMode: 'mouse',       // 'mouse' (center '+' click -> 2x2 click) | 'keyboard' (2x2 R/U/F/J)
    responseWindow: 'onset300',  // 'onset300' | 'offset'
    seedMode: 'fixed_a',         // 'fixed_a' | 'fixed_b' | 'random'
    testBlocks: 2,
    maxSpuriousCooccur: 2,       // Cap off-diagonal word-object co-occurrences (<= 2 of 6)
    audioBasePath: 'audio',
    audioExtension: 'mp3'
};

const FIXED_SEEDS = {
    fixed_a: 20110314,
    fixed_b: 20070518
};

// 2x2 Quadrant Physical Key Mapping (Left hand: R=Top-Left, F=Bottom-Left; Right hand: U=Top-Right, J=Bottom-Right)
// Uses KeyboardEvent.code so Japanese IME state (全角/かな) never blocks responses.
const AFC_KEY_CODES = ['KeyR', 'KeyU', 'KeyF', 'KeyJ'];
const AFC_KEY_LABELS = ['R', 'U', 'F', 'J'];
const QUADRANT_NAMES = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

function getAFCPositionForEvent(e) {
    if (!e) return null;
    if (e.code) {
        const codeIdx = AFC_KEY_CODES.indexOf(e.code);
        if (codeIdx >= 0) return codeIdx + 1;
    }
    const lower = String(e.key || '').toLowerCase();
    const fallbackKeys = ['r', 'u', 'f', 'j'];
    const keyIdx = fallbackKeys.indexOf(lower);
    return keyIdx >= 0 ? keyIdx + 1 : null;
}

// ============================================================================
// Pseudoword Lists
// ============================================================================

// Full 24-word pool present in audio/*.mp3
const PSEUDOWORDS = [
    'bosa', 'manu', 'colat', 'kita', 'daxen', 'feppa',
    'golit', 'hismo', 'jober', 'lunto', 'moffy', 'nalip',
    'pimwit', 'regli', 'sumbat', 'tever', 'vosek', 'wugson',
    'blicket', 'gazzer', 'toma', 'ziffin', 'cheem', 'noba'
];

// Curated 18-word subset for Japanese speakers:
// Retains Yu & Smith core disyllables (bosa, manu, colat, regli, gazzer) while excluding
// Japanese real-word homophones ('kita', 'toma', 'noba'), monosyllable ('cheem'),
// English compound-like ('wugson'), and longest -y adjective-like ('moffy').
const CURATED_PSEUDOWORDS_18 = [
    'bosa', 'manu', 'colat', 'regli', 'gazzer', 'daxen',
    'feppa', 'golit', 'hismo', 'jober', 'lunto', 'nalip',
    'pimwit', 'sumbat', 'tever', 'vosek', 'ziffin', 'blicket'
];

// ============================================================================
// Streamlined Familiarization Practice (2 learning slides -> 4 feedbacked 4AFC)
// ============================================================================

const PRACTICE_CONFIG = {
    enabled: true,
    learningTrials: 2,
    testTrials: 4,
    trialDuration: 7600,
    initialSilence: 1000,
    wordSoa: 1650,
    audioBasePath: 'audio_check',
    audioBasePathFallback: '../audio_check',
    audioExtension: 'mp3'
};

// 8 non-overlapping practice items (excludes fish to avoid any conceptual overlap)
const PRACTICE_ITEMS = [
    { id: 'check_1', label: 'apple', emoji: '🍎' },
    { id: 'check_2', label: 'banana', emoji: '🍌' },
    { id: 'check_3', label: 'cat', emoji: '🐱' },
    { id: 'check_4', label: 'carrot', emoji: '🥕' },
    { id: 'check_6', label: 'cherry', emoji: '🍒' },
    { id: 'check_7', label: 'dog', emoji: '🐶' },
    { id: 'check_9', label: 'grape', emoji: '🍇' },
    { id: 'check_11', label: 'orange', emoji: '🍊' }
];

// ============================================================================
// 24 Unnameable Abstract Novel Shapes (SVG)
// Modeled after Yu & Smith (2011, p. 5 & Fig. 5) and NOUN-style low-nameability
// principles: asymmetric sculptural silhouettes, non-canonical apertures, and
// unique solid hues with no recognizable everyday icons (no hearts, fish, stars, etc.)
// ============================================================================

const NOVEL_OBJECTS = [
    // 0: Asymmetric anvil-pedestal with angled left spur (inspired by Yu & Smith 2011 Fig. 5 #1)
    `<svg viewBox="0 0 100 100"><path fill="#e05a47" stroke="#9e3526" stroke-width="2" d="M36 16 L66 16 L60 54 L78 58 L74 70 L22 70 L22 58 L38 54 L24 34 L36 32 Z"/></svg>`,

    // 1: Bulbous offset crook on flat base (inspired by Yu & Smith 2011 Fig. 5 #2)
    `<svg viewBox="0 0 100 100"><path fill="#38b2ac" stroke="#237a76" stroke-width="2" d="M34 78 L34 52 C20 48 18 22 40 18 C60 15 68 34 56 48 L54 64 L82 64 L82 78 Z"/></svg>`,

    // 2: Central vertical spindle with dual asymmetric loops (inspired by Yu & Smith 2011 Fig. 5 #3)
    `<svg viewBox="0 0 100 100"><path fill="#8b5cf6" stroke="#5b34b8" stroke-width="2" fill-rule="evenodd" d="M45 12 L55 12 L55 38 C64 30 84 34 84 52 C84 70 64 72 55 62 L55 88 L45 88 L45 58 C36 68 16 64 16 46 C16 28 36 26 45 36 Z M68 46 A8 8 0 1 0 68 58 A8 8 0 1 0 68 46 Z M32 40 A8 8 0 1 0 32 52 A8 8 0 1 0 32 40 Z"/></svg>`,

    // 3: Asymmetric multi-fin spindle (inspired by Yu & Smith 2011 Fig. 5 #4)
    `<svg viewBox="0 0 100 100"><path fill="#eab308" stroke="#a17705" stroke-width="2" d="M50 10 C56 10 58 26 64 32 C74 34 86 38 86 46 C86 54 72 56 64 62 C58 68 56 88 48 88 C42 88 42 70 34 64 C22 60 14 56 14 48 C14 40 28 38 36 30 C42 24 44 10 50 10 Z"/></svg>`,

    // 4: Offset four-limb bent pinwheel (inspired by Yu & Smith 2011 Fig. 5 #5)
    `<svg viewBox="0 0 100 100"><path fill="#ec4899" stroke="#9d174d" stroke-width="2" d="M44 12 L58 16 L54 40 L84 34 L86 48 L58 54 L70 84 L56 88 L44 60 L16 70 L12 56 L38 44 Z"/></svg>`,

    // 5: Irregular organic ridge-polyhedron (inspired by Yu & Smith 2011 Fig. 5 #6)
    `<svg viewBox="0 0 100 100"><path fill="#22c55e" stroke="#15803d" stroke-width="2" d="M32 16 L52 24 L74 14 L70 40 L88 52 L66 64 L72 86 L46 74 L24 84 L28 58 L12 42 L34 36 Z"/></svg>`,

    // 6: Perforated asymmetric arch-block
    `<svg viewBox="0 0 100 100"><path fill="#3b82f6" stroke="#1d4ed8" stroke-width="2" fill-rule="evenodd" d="M18 76 L24 26 C26 16 52 14 62 24 L84 48 L78 76 L56 76 L56 58 L38 58 L38 76 Z M46 30 A9 9 0 1 0 46 48 A9 9 0 1 0 46 30 Z"/></svg>`,

    // 7: Skewed Y-yoke with crossbar notch
    `<svg viewBox="0 0 100 100"><path fill="#f97316" stroke="#c2410c" stroke-width="2" d="M20 20 L36 16 L48 44 L68 22 L82 32 L58 58 L64 86 L44 86 L40 58 L16 42 Z"/></svg>`,

    // 8: Double-pocketed biomorphic slab
    `<svg viewBox="0 0 100 100"><path fill="#06b6d4" stroke="#0e7490" stroke-width="2" fill-rule="evenodd" d="M26 22 C48 12 82 20 84 44 C86 68 68 86 42 82 C18 78 14 62 22 48 C28 38 14 28 26 22 Z M42 34 A7 7 0 1 0 42 48 A7 7 0 1 0 42 34 Z M62 52 A8 8 0 1 0 62 68 A8 8 0 1 0 62 52 Z"/></svg>`,

    // 9: Stepped cantilever bracket silhouette
    `<svg viewBox="0 0 100 100"><path fill="#a855f7" stroke="#6b21a8" stroke-width="2" d="M22 18 L78 18 L78 36 L46 36 L46 52 L68 52 L62 70 L38 70 L38 86 L22 86 Z"/></svg>`,

    // 10: Tri-lobe asymmetrical amoeba with hollow core
    `<svg viewBox="0 0 100 100"><path fill="#84cc16" stroke="#4d7c0f" stroke-width="2" fill-rule="evenodd" d="M46 14 C64 14 66 34 78 40 C90 46 88 68 72 74 C56 80 48 68 34 78 C18 88 10 66 20 52 C30 38 28 14 46 14 Z M50 42 L60 52 L48 60 L40 48 Z"/></svg>`,

    // 11: Angled saddle-horn polygon
    `<svg viewBox="0 0 100 100"><path fill="#f43f5e" stroke="#be123c" stroke-width="2" d="M16 62 L26 24 L44 28 L42 48 L64 42 L74 18 L86 24 L78 74 L56 82 L52 62 Z"/></svg>`,

    // 12: Skewed torus-tail form
    `<svg viewBox="0 0 100 100"><path fill="#14b8a6" stroke="#0f766e" stroke-width="2" fill-rule="evenodd" d="M56 16 C78 16 88 36 80 56 C74 72 56 76 42 72 L26 88 L14 76 L30 60 C22 44 32 16 56 16 Z M56 32 A12 12 0 1 0 56 56 A12 12 0 1 0 56 32 Z"/></svg>`,

    // 13: Zigzag terrace monolith
    `<svg viewBox="0 0 100 100"><path fill="#eab308" stroke="#854d0e" stroke-width="2" d="M30 14 L62 18 L54 38 L82 40 L74 62 L50 60 L58 86 L22 82 L30 52 L16 46 Z"/></svg>`,

    // 14: Asymmetric tuning-clamp with side lobe
    `<svg viewBox="0 0 100 100"><path fill="#6366f1" stroke="#3730a3" stroke-width="2" d="M24 18 L40 18 L40 54 L60 54 L60 26 L76 26 L76 44 C88 46 88 64 76 66 L76 72 L46 72 L46 86 L28 86 L28 68 L24 68 Z"/></svg>`,

    // 15: Hooked comma-wedge with rectangular cutout
    `<svg viewBox="0 0 100 100"><path fill="#fb7185" stroke="#9f1239" stroke-width="2" fill-rule="evenodd" d="M22 30 C22 14 58 12 74 26 C88 38 84 68 64 80 C44 92 18 82 22 64 L40 62 C40 72 58 70 62 58 C66 46 54 36 38 38 L22 40 Z M54 24 L66 28 L62 38 L50 34 Z"/></svg>`,

    // 16: Offset bridge-trapezoid with upper horn
    `<svg viewBox="0 0 100 100"><path fill="#10b981" stroke="#065f46" stroke-width="2" d="M52 12 L68 16 L62 42 L86 48 L80 82 L62 82 L64 62 L36 62 L32 82 L14 78 L22 42 L46 42 Z"/></svg>`,

    // 17: Bi-lobed diagonal dumbbell-blade
    `<svg viewBox="0 0 100 100"><path fill="#d946ef" stroke="#86198f" stroke-width="2" d="M26 18 C42 14 50 28 46 40 L64 52 C74 44 88 54 84 70 C80 86 60 88 52 74 L36 60 C22 68 12 54 16 38 C18 28 18 20 26 18 Z"/></svg>`,

    // 18: Asymmetric C-frame with internal tooth
    `<svg viewBox="0 0 100 100"><path fill="#38bdf8" stroke="#0369a1" stroke-width="2" d="M20 20 L80 20 L80 42 L62 42 L62 34 L38 34 L38 50 L54 50 L54 62 L38 62 L38 72 L76 72 L72 86 L20 86 Z"/></svg>`,

    // 19: Skewed tri-wing boomerang polygon
    `<svg viewBox="0 0 100 100"><path fill="#f59e0b" stroke="#92400e" stroke-width="2" d="M44 12 L60 20 L54 46 L86 54 L80 70 L48 64 L32 88 L18 78 L34 52 L14 34 L24 22 L42 36 Z"/></svg>`,

    // 20: Sculptural keyhole-Gourd with flat side
    `<svg viewBox="0 0 100 100"><path fill="#a3e635" stroke="#3f6212" stroke-width="2" fill-rule="evenodd" d="M30 16 L66 16 C76 28 62 42 74 52 C88 64 80 86 56 86 L30 86 L30 56 L42 56 L42 42 L30 42 Z M54 62 A8 8 0 1 0 54 76 A8 8 0 1 0 54 62 Z"/></svg>`,

    // 21: Crooked caliper silhouette
    `<svg viewBox="0 0 100 100"><path fill="#c084fc" stroke="#6b21a8" stroke-width="2" d="M36 14 L68 18 L82 44 L68 52 L58 34 L44 34 L40 60 L66 66 L62 86 L24 78 L18 46 Z"/></svg>`,

    // 22: Asymmetric winged plinth
    `<svg viewBox="0 0 100 100"><path fill="#fb923c" stroke="#9a3412" stroke-width="2" d="M46 14 L58 14 L62 36 L86 30 L82 48 L62 52 L68 74 L80 74 L80 86 L20 86 L20 74 L36 74 L38 48 L16 40 L22 26 L42 34 Z"/></svg>`,

    // 23: Perforated angled boomerang-slab
    `<svg viewBox="0 0 100 100"><path fill="#2dd4bf" stroke="#115e59" stroke-width="2" fill-rule="evenodd" d="M22 22 L56 16 L84 46 L74 84 L48 80 L54 54 L18 58 Z M52 30 L64 42 L54 46 L46 36 Z"/></svg>`
];

// ============================================================================
// State Management
// ============================================================================

const STATE = {
    phase: 'setup',
    pairs: [],
    pairMap: new Map(),
    wordMap: new Map(),
    cooccurMatrix: new Map(), // pairId -> Map(otherPairId -> count)

    learningTrials: [],
    learningTrialLogs: [],
    learningWordEvents: [],

    practiceLearningTrials: [],
    practiceTrials: [],
    practiceData: [],

    afcTrials: [],
    afcData: [],

    currentTrialIndex: 0,
    currentTestIndex: 0,
    currentPracticeLearningIndex: 0,
    currentPracticeIndex: 0,

    currentLearningTrialLog: null,
    currentPracticeTrial: null,
    currentAFCTrial: null,

    awaitingCenterClick: false,
    awaitingAFCResponse: false,
    practiceAwaitingCenterClick: false,
    practiceAwaitingResponse: false,

    activeTimers: [],
    activeHoverQuadrant: null,
    activeHoverStartPerf: null,

    experimentStartTime: null,
    experimentStartPerf: null,
    autoDownloaded: false,
    randomSeed: null,
    random: null,

    audioPreloadComplete: false,
    audioPreloadOk: false,
    audioMissing: [],
    practiceAudioPreloadOk: false,
    practiceAudioMissing: []
};

// ============================================================================
// Seeded PRNG & Array Utilities
// ============================================================================

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

function scheduleTimeout(fn, delayMs) {
    const id = setTimeout(() => {
        const idx = STATE.activeTimers.indexOf(id);
        if (idx >= 0) STATE.activeTimers.splice(idx, 1);
        fn();
    }, delayMs);
    STATE.activeTimers.push(id);
    return id;
}

function clearAllScheduledTimeouts() {
    while (STATE.activeTimers.length > 0) {
        clearTimeout(STATE.activeTimers.pop());
    }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
}

// ============================================================================
// Configuration & Dynamic Instruction Sync
// ============================================================================

function readExperimenterConfigFromUI() {
    const modeEl = document.getElementById('cfg-response-mode');
    const durEl = document.getElementById('cfg-trial-duration');
    const blocksEl = document.getElementById('cfg-test-blocks');
    const winEl = document.getElementById('cfg-response-window');
    const seedEl = document.getElementById('cfg-seed-mode');
    const pracEl = document.getElementById('cfg-practice');

    if (modeEl) CONFIG.responseMode = modeEl.value === 'keyboard' ? 'keyboard' : 'mouse';

    if (durEl) {
        const dur = parseInt(durEl.value, 10);
        if (dur === 9000) {
            CONFIG.trialDuration = 9000;
            CONFIG.initialSilence = 1000;
            CONFIG.wordSoa = 2000;
            CONFIG.wordInterval = 1000;
        } else {
            CONFIG.trialDuration = 12000;
            CONFIG.initialSilence = 1200;
            CONFIG.wordSoa = 2700;
            CONFIG.wordInterval = 1000;
        }
    }

    if (blocksEl) {
        const b = parseInt(blocksEl.value, 10);
        CONFIG.testBlocks = (b === 1 || b === 2) ? b : 2;
    }

    if (winEl) {
        CONFIG.responseWindow = winEl.value === 'offset' ? 'offset' : 'onset300';
    }

    if (seedEl) {
        CONFIG.seedMode = ['fixed_a', 'fixed_b', 'random'].includes(seedEl.value)
            ? seedEl.value
            : 'fixed_a';
    }

    if (pracEl) {
        PRACTICE_CONFIG.enabled = pracEl.value === '1';
    }

    updateConfigSummaryBadge();
}

function updateConfigSummaryBadge() {
    readConfigPreviewOnly();
}

function readConfigPreviewOnly() {
    const badge = document.getElementById('config-summary-badge');
    if (!badge) return;
    const modeEl = document.getElementById('cfg-response-mode');
    const durEl = document.getElementById('cfg-trial-duration');
    const blocksEl = document.getElementById('cfg-test-blocks');
    const seedEl = document.getElementById('cfg-seed-mode');

    const modeTxt = modeEl?.value === 'keyboard' ? 'Key(R/U/F/J)' : 'Mouse(+)';
    const durTxt = `${Math.round((parseInt(durEl?.value || '12000', 10)) / 1000)}s`;
    const blkTxt = `${blocksEl?.value || 2}blk`;
    const seedTxt = seedEl?.value === 'random' ? 'Rand' : (seedEl?.value === 'fixed_b' ? 'ListB' : 'ListA');
    badge.textContent = `${modeTxt} · ${durTxt} · ${blkTxt} · ${seedTxt}`;
}

function populateDynamicInstructions() {
    const isMouse = CONFIG.responseMode === 'mouse';
    const timingHint = CONFIG.responseWindow === 'offset'
        ? '単語の再生が終わってから、できるだけ速く正確に選んでください。'
        : '単語が聞こえたら、できるだけ速く正確に対応するものを1つ選んでください。';

    const practiceList = document.getElementById('practice-response-instructions');
    const practiceTestList = document.getElementById('practice-test-response-list');
    const afcList = document.getElementById('afc-response-instructions');
    const pracDiagram = document.getElementById('practice-key-diagram-wrap');
    const afcDiagram = document.getElementById('afc-key-diagram-wrap');

    const totalAfcTrials = CONFIG.numPairs * CONFIG.testBlocks;

    if (isMouse) {
        if (pracDiagram) pracDiagram.style.display = 'none';
        if (afcDiagram) afcDiagram.style.display = 'none';

        const mouseItemsPractice = `
            <li>毎問の最初に、画面中央の「<strong>＋</strong>」ボタンをクリックすると単語が再生されます（視線とカーソルを中央に揃えるためです）。</li>
            <li>${timingHint}</li>
            <li>練習テスト（4問）では、選択後に正解・不正解が表示されます。</li>
        `;
        if (practiceList) practiceList.innerHTML = mouseItemsPractice;
        if (practiceTestList) practiceTestList.innerHTML = mouseItemsPractice;

        if (afcList) {
            afcList.innerHTML = `
                <li>全 ${totalAfcTrials} 問です。毎問、まず画面中央の「<strong>＋</strong>」をクリックすると4つの図形と1つの単語が提示されます。</li>
                <li>${timingHint}</li>
                <li>マウスで最も合うと思う図形を直接クリックしてください（本番では正誤は表示されません）。</li>
                <li>わからない場合も直感で構いませんので、必ず4つの中から1つ選んでください。</li>
            `;
        }
    } else {
        if (pracDiagram) pracDiagram.style.display = 'block';
        if (afcDiagram) afcDiagram.style.display = 'block';

        const keyItemsPractice = `
            <li>画面の4つの位置に合わせて、左手は <strong>R（左上）・F（左下）</strong>、右手は <strong>U（右上）・J（右下）</strong> に指を置いてください（FとJの突起が目印です）。</li>
            <li>中央の「<strong>＋</strong>」を見つめて待ち、${timingHint}</li>
            <li>練習テスト（4問）では、キーを押すと正解・不正解が表示されます。</li>
        `;
        if (practiceList) practiceList.innerHTML = keyItemsPractice;
        if (practiceTestList) practiceTestList.innerHTML = keyItemsPractice;

        if (afcList) {
            afcList.innerHTML = `
                <li>全 ${totalAfcTrials} 問です。左手は <strong>R（左上）・F（左下）</strong>、右手は <strong>U（右上）・J（右下）</strong> に指を置いたままにしてください。</li>
                <li>各問の前に中央の「<strong>＋</strong>」が表示されますので中央を見つめ、${timingHint}</li>
                <li>本番では正誤は表示されません。わからない場合も直感で必ず1つ選んでください。</li>
            `;
        }
    }
}

// ============================================================================
// Audio Preloading & Playback
// ============================================================================

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

function stopActiveAudio() {
    if (activeAudio) {
        try {
            activeAudio.pause();
            activeAudio.currentTime = 0;
        } catch (_) {
            // ignore
        }
        activeAudio = null;
    }
}

function playAudioElement(audio, onEndedCallback, onStartCallback) {
    if (activeAudio && activeAudio !== audio) {
        stopActiveAudio();
    }
    activeAudio = audio;
    audio.currentTime = 0;

    let finished = false;
    let started = false;

    const markStarted = () => {
        if (started) return;
        started = true;
        if (onStartCallback) onStartCallback();
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
        if (onEndedCallback) onEndedCallback(ok);
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

function playAudio(word, onEndedCallback, onStartCallback) {
    playAudioElement(getAudioForWord(word), onEndedCallback, onStartCallback);
}

function playPracticeAudio(id, onEndedCallback, onStartCallback) {
    playAudioElement(getPracticeAudio(id), onEndedCallback, onStartCallback);
}

function preloadAudioFiles(keys, basePath, extension, cache) {
    const uniqueKeys = Array.from(new Set(keys.map(k => String(k || '').toLowerCase())));
    const preloaders = uniqueKeys.map((key) => {
        const audio = getAudioForKey(key, basePath, extension, cache);
        if (audio.readyState >= 2) {
            return Promise.resolve({ key, ok: true });
        }
        return new Promise((resolve) => {
            let settled = false;
            const settle = (ok) => {
                if (settled) return;
                settled = true;
                cleanup();
                resolve({ key, ok });
            };
            const onReady = () => settle(true);
            const onError = () => settle(false);
            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onReady);
                audio.removeEventListener('loadeddata', onReady);
                audio.removeEventListener('error', onError);
            };
            audio.addEventListener('canplaythrough', onReady);
            audio.addEventListener('loadeddata', onReady);
            audio.addEventListener('error', onError);
            audio.load();
        });
    });
    return Promise.all(preloaders);
}

function preloadPracticeAudio() {
    const ids = PRACTICE_ITEMS.map(item => item.id);
    return preloadAudioFiles(ids, PRACTICE_CONFIG.audioBasePath, PRACTICE_CONFIG.audioExtension, PRACTICE_AUDIO_CACHE)
        .then((results) => {
            const missing = results.filter(r => !r.ok);
            if (missing.length === ids.length && PRACTICE_CONFIG.audioBasePathFallback) {
                const fallbackCache = new Map();
                return preloadAudioFiles(
                    ids,
                    PRACTICE_CONFIG.audioBasePathFallback,
                    PRACTICE_CONFIG.audioExtension,
                    fallbackCache
                ).then((fallbackResults) => {
                    const fbMissing = fallbackResults.filter(r => !r.ok);
                    if (fbMissing.length < missing.length) {
                        PRACTICE_AUDIO_CACHE.clear();
                        fallbackCache.forEach((v, k) => PRACTICE_AUDIO_CACHE.set(k, v));
                        PRACTICE_CONFIG.audioBasePath = PRACTICE_CONFIG.audioBasePathFallback;
                        return fallbackResults;
                    }
                    return results;
                });
            }
            return results;
        });
}

function setStartButtonEnabled(enabled) {
    const btn = document.getElementById('start-btn');
    const hint = document.getElementById('start-hint');
    if (btn) btn.disabled = !enabled;
    if (hint) {
        hint.textContent = enabled
            ? '準備完了 —「実験を開始する」ボタンまたは Enter キーで開始します。'
            : '音声ファイルを確認中です。しばらくお待ちください。';
        hint.style.color = enabled ? 'var(--accent-success)' : 'var(--text-muted)';
    }
}

function startAudioPreload() {
    const status = document.getElementById('audio-test-status');
    if (status) {
        status.textContent = '音声ファイルを確認中...';
        status.style.color = 'var(--text-muted)';
    }
    setStartButtonEnabled(false);

    const mainPromise = preloadAudioFiles(PSEUDOWORDS, CONFIG.audioBasePath, CONFIG.audioExtension, AUDIO_CACHE);
    const practicePromise = preloadPracticeAudio();

    Promise.all([mainPromise, practicePromise]).then(([mainResults, practiceResults]) => {
        const missingMain = mainResults.filter(r => !r.ok).map(r => r.key);
        const missingPractice = practiceResults.filter(r => !r.ok).map(r => r.key);
        STATE.audioPreloadComplete = true;
        STATE.audioMissing = missingMain;
        STATE.audioPreloadOk = missingMain.length === 0;
        STATE.practiceAudioMissing = missingPractice;
        STATE.practiceAudioPreloadOk = missingPractice.length === 0;

        if (STATE.audioPreloadOk && STATE.practiceAudioPreloadOk) {
            if (status) {
                status.textContent = '✓ 音声ファイル準備完了';
                status.style.color = 'var(--accent-success)';
            }
            setStartButtonEnabled(true);
        } else {
            if (status) {
                const parts = [];
                if (missingMain.length > 0) parts.push(`本試行:${missingMain.length}件`);
                if (missingPractice.length > 0) parts.push(`練習:${missingPractice.length}件`);
                status.textContent = `✗ 音声ファイル不足 (${parts.join(' / ')})`;
                status.style.color = 'var(--accent-error)';
            }
            setStartButtonEnabled(false);
        }
    });
}

function testAudio() {
    const status = document.getElementById('audio-test-status');
    if (status) {
        status.textContent = 'サンプル音声を再生中...';
        status.style.color = 'var(--text-secondary)';
    }
    playPracticeAudio('check_1', (ok) => {
        if (!status) return;
        if (ok && STATE.audioPreloadOk) {
            status.textContent = '✓ 再生OK（音量を調整したら開始してください）';
            status.style.color = 'var(--accent-success)';
        } else {
            status.textContent = '✗ 音声の再生に失敗しました。出力先を確認してください。';
            status.style.color = 'var(--accent-error)';
        }
    });
}

// ============================================================================
// Experiment Setup & Stimulus Generation (with Spurious Co-occurrence Control)
// ============================================================================

function startExperiment() {
    readExperimenterConfigFromUI();

    const idInput = document.getElementById('participant-id');
    const rawId = idInput ? idInput.value.trim() : '';
    CONFIG.participantId = rawId || 'P000';
    if (idInput) idInput.blur();

    if (!STATE.audioPreloadOk || (PRACTICE_CONFIG.enabled && !STATE.practiceAudioPreloadOk)) {
        const status = document.getElementById('audio-test-status');
        if (status) {
            status.textContent = '✗ 音声ファイルが不足しているため開始できません。';
            status.style.color = 'var(--accent-error)';
        }
        return;
    }

    if (CONFIG.seedMode === 'fixed_a') {
        STATE.randomSeed = FIXED_SEEDS.fixed_a;
    } else if (CONFIG.seedMode === 'fixed_b') {
        STATE.randomSeed = FIXED_SEEDS.fixed_b;
    } else {
        STATE.randomSeed = Date.now();
    }

    STATE.random = createSeededRandom(STATE.randomSeed);
    STATE.autoDownloaded = false;

    generatePairs();
    if (!generateLearningTrials()) {
        return;
    }

    populateDynamicInstructions();

    if (PRACTICE_CONFIG.enabled) {
        STATE.phase = 'practice-instructions';
        showScreen('practice-instructions-screen');
    } else {
        STATE.phase = 'instructions';
        showScreen('instructions-screen');
    }
}

function generatePairs() {
    const wordPool = CONFIG.numPairs <= CURATED_PSEUDOWORDS_18.length
        ? CURATED_PSEUDOWORDS_18
        : PSEUDOWORDS;

    const selectedWords = shuffleArray(wordPool).slice(0, CONFIG.numPairs);
    const selectedObjects = shuffleArray([...Array(NOVEL_OBJECTS.length).keys()]).slice(0, CONFIG.numPairs);

    STATE.pairs = selectedWords.map((word, i) => ({
        word,
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

    if (totalOccurrences % objectsPerTrial !== 0 || STATE.pairs.length < objectsPerTrial * 2) {
        alert('学習試行のパラメータ制約を満たしていません。');
        return false;
    }

    // Search candidate schedules to minimize maximum spurious off-diagonal co-occurrence
    // and off-diagonal variance (maximizing contextual diversity; Kachergis et al., 2009; Yu & Smith, 2011)
    let bestResult = null;
    const searchAttempts = 600;

    for (let attempt = 0; attempt < searchAttempts; attempt++) {
        const candidate = buildLearningTrialsWithConstraints(
            STATE.pairs,
            objectsPerTrial,
            repetitions,
            attempt < 450 ? CONFIG.maxSpuriousCooccur : CONFIG.maxSpuriousCooccur + 1
        );
        if (!candidate) continue;

        if (
            !bestResult ||
            candidate.maxOffDiag < bestResult.maxOffDiag ||
            (candidate.maxOffDiag === bestResult.maxOffDiag && candidate.offDiagSqSum < bestResult.offDiagSqSum)
        ) {
            bestResult = candidate;
            if (bestResult.maxOffDiag <= CONFIG.maxSpuriousCooccur && attempt >= 80) {
                break;
            }
        }
    }

    if (!bestResult) {
        alert('学習試行の生成に失敗しました。');
        return false;
    }

    STATE.learningTrials = assignBalancedSpatialAndWordOrders(bestResult.rawTrials, objectsPerTrial);
    STATE.cooccurMatrix = bestResult.cooccurMatrix;
    return true;
}

function buildLearningTrialsWithConstraints(pairs, objectsPerTrial, repetitions, maxCooccurCap) {
    const totalTrials = (pairs.length * repetitions) / objectsPerTrial;
    const counts = new Map(pairs.map(p => [p.pairId, repetitions]));
    const cooccur = new Map(pairs.map(p => [p.pairId, new Map()]));
    const rawTrials = [];
    let prevIds = new Set();

    for (let t = 0; t < totalTrials; t++) {
        const available = pairs.filter(p => (counts.get(p.pairId) || 0) > 0 && !prevIds.has(p.pairId));
        if (available.length < objectsPerTrial) return null;

        const chosen = [];
        for (let slot = 0; slot < objectsPerTrial; slot++) {
            const stepCandidates = available.filter(p => {
                if (chosen.some(c => c.pairId === p.pairId)) return false;
                for (const c of chosen) {
                    const cur = cooccur.get(p.pairId).get(c.pairId) || 0;
                    if (cur >= maxCooccurCap) return false;
                }
                return true;
            });

            if (stepCandidates.length === 0) return null;

            // Prioritize items with highest remaining count (prevents endgame deadlocks)
            // and lowest existing co-occurrence with already chosen items in this trial
            const scored = shuffleArray(stepCandidates).map(p => {
                const rem = counts.get(p.pairId) || 0;
                let coSum = 0;
                for (const c of chosen) {
                    coSum += (cooccur.get(p.pairId).get(c.pairId) || 0);
                }
                return { pair: p, rem, coSum };
            });

            scored.sort((a, b) => {
                if (b.rem !== a.rem) return b.rem - a.rem;
                return a.coSum - b.coSum;
            });

            const topRem = scored[0].rem;
            const topPool = scored.filter(s => s.rem >= topRem - 1 && s.coSum === scored[0].coSum);
            const pick = topPool[randomInt(topPool.length)].pair;
            chosen.push(pick);
        }

        // Update counts and symmetric off-diagonal co-occurrence matrix
        const trialPairs = chosen.map(pair => {
            const rem = (counts.get(pair.pairId) || 0) - 1;
            counts.set(pair.pairId, rem);
            return { ...pair, rep: repetitions - rem };
        });

        for (let i = 0; i < trialPairs.length; i++) {
            for (let j = i + 1; j < trialPairs.length; j++) {
                const a = trialPairs[i].pairId;
                const b = trialPairs[j].pairId;
                cooccur.get(a).set(b, (cooccur.get(a).get(b) || 0) + 1);
                cooccur.get(b).set(a, (cooccur.get(b).get(a) || 0) + 1);
            }
        }

        rawTrials.push({ trialNum: t + 1, pairs: trialPairs });
        prevIds = new Set(trialPairs.map(p => p.pairId));
    }

    if ([...counts.values()].some(r => r !== 0)) return null;

    let maxOffDiag = 0;
    let offDiagSqSum = 0;
    for (const [, rowMap] of cooccur.entries()) {
        for (const [, c] of rowMap.entries()) {
            if (c > maxOffDiag) maxOffDiag = c;
            offDiagSqSum += c * c;
        }
    }

    return { rawTrials, cooccurMatrix: cooccur, maxOffDiag, offDiagSqSum };
}

function assignBalancedSpatialAndWordOrders(rawTrials, objectsPerTrial) {
    // Balance how often each pair occupies each 2x2 quadrant (0..3) and each temporal word slot (0..3)
    // while keeping spatial position and temporal word order strictly uncoupled on each trial.
    const posCounts = new Map(STATE.pairs.map(p => [p.pairId, Array(objectsPerTrial).fill(0)]));
    const wordSlotCounts = new Map(STATE.pairs.map(p => [p.pairId, Array(objectsPerTrial).fill(0)]));

    return rawTrials.map(rt => {
        const items = shuffleArray(rt.pairs);
        const quadrantOrdered = Array(objectsPerTrial).fill(null);
        const openQuadrants = shuffleArray([...Array(objectsPerTrial).keys()]);

        // Assign each item to the open quadrant it has visited least so far
        items.forEach(item => {
            const pCounts = posCounts.get(item.pairId);
            openQuadrants.sort((qA, qB) => pCounts[qA] - pCounts[qB]);
            const bestQ = openQuadrants.shift();
            quadrantOrdered[bestQ] = item;
            pCounts[bestQ]++;
        });

        // Assign temporal word order independently from spatial quadrant order,
        // avoiding identical spatial-to-temporal index order (0,1,2,3)
        let wordOrdered = shuffleArray(quadrantOrdered);
        let guard = 0;
        while (
            guard < 12 &&
            wordOrdered.every((item, idx) => item.pairId === quadrantOrdered[idx].pairId)
        ) {
            wordOrdered = shuffleArray(quadrantOrdered);
            guard++;
        }
        wordOrdered.forEach((item, wIdx) => {
            wordSlotCounts.get(item.pairId)[wIdx]++;
        });

        return {
            trialNum: rt.trialNum,
            pairs: quadrantOrdered,
            objects: quadrantOrdered.map(p => p.objectIndex),
            words: wordOrdered.map(p => p.word)
        };
    });
}

// ============================================================================
// 4AFC Test Trial Generation (Balanced Quadrants + Balanced Foil Co-occurrence)
// ============================================================================

function generateAFCTestTrials() {
    const blocks = CONFIG.testBlocks;
    const trials = [];
    const disallowMap = new Map();
    const distractorCount = CONFIG.objectsPerTrial - 1;

    for (let block = 1; block <= blocks; block++) {
        const blockTrials = buildAFCBlockTrials(STATE.pairs, distractorCount, disallowMap);
        const targetPositions = buildBalancedTargetPositions(blockTrials.length, CONFIG.objectsPerTrial);

        // Prevent >3 consecutive targets in the exact same quadrant
        let posOrder = targetPositions;
        for (let tries = 0; tries < 30; tries++) {
            let maxRun = 1;
            let run = 1;
            for (let i = 1; i < posOrder.length; i++) {
                run = posOrder[i] === posOrder[i - 1] ? run + 1 : 1;
                if (run > maxRun) maxRun = run;
            }
            if (maxRun <= 2) break;
            posOrder = shuffleArray(targetPositions);
        }

        blockTrials.forEach((trial, index) => {
            const targetPosition = posOrder[index];
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

    // Ensure boundary between Block 1 last word and Block 2 first word doesn't repeat the same target word
    if (blocks > 1 && trials.length >= CONFIG.numPairs * 2) {
        const b1Last = trials[CONFIG.numPairs - 1];
        const b2First = trials[CONFIG.numPairs];
        if (b1Last.targetPair.pairId === b2First.targetPair.pairId) {
            const swapIdx = CONFIG.numPairs + 1;
            [trials[CONFIG.numPairs], trials[swapIdx]] = [trials[swapIdx], trials[CONFIG.numPairs]];
            trials[CONFIG.numPairs].blockTrial = 1;
            trials[swapIdx].blockTrial = 2;
        }
    }

    STATE.afcTrials = trials;
}

function buildAFCBlockTrials(pairs, distractorCount, disallowMap = new Map()) {
    const maxAttempts = 250;
    const maxPerPair = distractorCount;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const targetOrder = shuffleArray([...pairs]);
        const counts = new Map(pairs.map(p => [p.pairId, 0]));
        const trials = [];
        let ok = true;

        for (const targetPair of targetOrder) {
            const candidates = pairs.filter(
                p => p.pairId !== targetPair.pairId && counts.get(p.pairId) < maxPerPair
            );
            if (candidates.length < distractorCount) {
                ok = false;
                break;
            }

            const chosen = pickDistractorsBalanced(
                targetPair,
                candidates,
                counts,
                distractorCount,
                disallowMap.get(targetPair.pairId)
            );
            if (!chosen) {
                ok = false;
                break;
            }
            chosen.forEach(pair => {
                counts.set(pair.pairId, counts.get(pair.pairId) + 1);
            });
            trials.push({ targetPair, distractors: chosen });
        }

        if (ok) return trials;
    }

    const fallbackOrder = shuffleArray([...pairs]);
    return fallbackOrder.map(targetPair => ({
        targetPair,
        distractors: shuffleArray(pairs.filter(p => p.pairId !== targetPair.pairId)).slice(0, distractorCount)
    }));
}

function pickDistractorsBalanced(targetPair, candidates, counts, distractorCount, disallowedSignatures) {
    const coMap = STATE.cooccurMatrix.get(targetPair.pairId) || new Map();

    // Sort candidates by usage count first, then mix 1 co-occurring competitor + non-co-occurring foils
    // so every target faces comparable foil competition (~1.0 mean co-occurrence across the 3 foils)
    const ranked = shuffleArray(candidates).sort((a, b) => counts.get(a.pairId) - counts.get(b.pairId));
    const pool = ranked.slice(0, Math.min(ranked.length, 9));

    let bestCombo = null;
    let bestScore = Infinity;

    for (let i = 0; i < pool.length; i++) {
        for (let j = i + 1; j < pool.length; j++) {
            for (let k = j + 1; k < pool.length; k++) {
                const combo = [pool[i], pool[j], pool[k]].slice(0, distractorCount);
                const sig = buildDistractorSignature(combo);
                if (disallowedSignatures && disallowedSignatures.has(sig)) continue;

                const usageSum = combo.reduce((s, p) => s + counts.get(p.pairId), 0);
                const coSum = combo.reduce((s, p) => s + (coMap.get(p.pairId) || 0), 0);
                // Ideal coSum across 3 foils out of 17 other pairs (total 18 co-occurrences) is ~3.18 -> target 3
                const coPenalty = Math.abs(coSum - 3) * 1.5;
                const score = usageSum * 2 + coPenalty + rand() * 0.25;
                if (score < bestScore) {
                    bestScore = score;
                    bestCombo = combo;
                }
            }
        }
    }

    return bestCombo;
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
    const extras = shuffleArray(Array.from({ length: positionsCount }, (_, i) => i + 1)).slice(0, remainder);
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
    remainingPositions.forEach((pos, idx) => {
        options[pos - 1] = shuffledDistractors[idx].pairId;
    });
    return options;
}

function buildDistractorSignature(distractors) {
    return distractors.map(p => p.pairId).sort((a, b) => a - b).join('-');
}

// ============================================================================
// Stage Rendering Helpers (Central Fixation '+' & 2x2 Quadrants)
// ============================================================================

function renderEmptyFixationStage(objectsContainerId, centerAnchorId, captionText = '') {
    const container = document.getElementById(objectsContainerId);
    const anchor = document.getElementById(centerAnchorId);
    if (container) {
        container.classList.remove('afc-clickable');
        container.innerHTML = Array.from({ length: CONFIG.objectsPerTrial }, () =>
            '<div class="object-wrapper empty-slot"></div>'
        ).join('');
    }
    if (anchor) {
        anchor.innerHTML = `
            <div class="fixation-cross">+</div>
            ${captionText ? `<div class="center-caption">${captionText}</div>` : ''}
        `;
    }
}

function renderCenterClickPrompt(objectsContainerId, centerAnchorId, onCenterClick) {
    const container = document.getElementById(objectsContainerId);
    const anchor = document.getElementById(centerAnchorId);
    if (container) {
        container.classList.remove('afc-clickable');
        container.innerHTML = Array.from({ length: CONFIG.objectsPerTrial }, () =>
            '<div class="object-wrapper empty-slot"></div>'
        ).join('');
    }
    if (anchor) {
        anchor.innerHTML = `
            <button type="button" class="center-start-btn" id="center-trigger-btn" aria-label="中央をクリックして再生">+</button>
            <div class="center-caption">「＋」をクリック</div>
        `;
        const btn = document.getElementById('center-trigger-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                onCenterClick();
            }, { once: true });
        }
    }
}

// ============================================================================
// Practice Phase (2 Learning Trials -> 4 Feedbacked 4AFC Trials)
// ============================================================================

function generatePracticeLearningTrials() {
    const items = shuffleArray(PRACTICE_ITEMS);
    const perTrial = CONFIG.objectsPerTrial;
    const trials = [];
    for (let i = 0; i < PRACTICE_CONFIG.learningTrials * perTrial && i + perTrial <= items.length; i += perTrial) {
        const chunk = items.slice(i, i + perTrial);
        let wordOrder = shuffleArray(chunk);
        if (wordOrder.every((it, idx) => it.id === chunk[idx].id)) {
            wordOrder = [chunk[1], chunk[3], chunk[0], chunk[2]];
        }
        trials.push({
            trial: trials.length + 1,
            items: chunk,
            wordOrder
        });
    }
    return trials;
}

function generatePracticeTrials() {
    const shownItems = STATE.practiceLearningTrials.flatMap(t => t.items);
    const pool = shownItems.length >= PRACTICE_CONFIG.testTrials ? shownItems : PRACTICE_ITEMS;
    const targets = shuffleArray(pool).slice(0, PRACTICE_CONFIG.testTrials);
    const positions = buildBalancedTargetPositions(targets.length, CONFIG.objectsPerTrial);

    return targets.map((target, i) => {
        const distractors = shuffleArray(pool.filter(item => item.id !== target.id))
            .slice(0, CONFIG.objectsPerTrial - 1);
        const options = Array(CONFIG.objectsPerTrial).fill(null);
        const targetPos = positions[i];
        options[targetPos - 1] = target;
        let dIdx = 0;
        for (let p = 0; p < CONFIG.objectsPerTrial; p++) {
            if (!options[p]) options[p] = distractors[dIdx++];
        }
        return {
            trial: i + 1,
            options,
            target,
            targetPosition: targetPos
        };
    });
}

function startPractice() {
    clearAllScheduledTimeouts();
    STATE.phase = 'practice-learning';
    STATE.currentPracticeLearningIndex = 0;
    STATE.practiceLearningTrials = generatePracticeLearningTrials();

    const label = document.getElementById('learning-phase-label');
    if (label) label.textContent = '練習：学習パート';
    const status = document.getElementById('learning-status-text');
    if (status) status.textContent = '';

    showCountdown(() => {
        showScreen('learning-screen');
        // Pre-trial 1 central fixation (1,000 ms) so gaze starts centered
        renderEmptyFixationStage('learning-objects', 'learning-center-anchor');
        document.getElementById('learning-progress').style.width = '0%';
        document.getElementById('learning-counter').textContent = `1 / ${STATE.practiceLearningTrials.length}`;
        scheduleTimeout(() => {
            runPracticeLearningTrial();
        }, CONFIG.iti);
    });
}

function runPracticeLearningTrial() {
    if (STATE.currentPracticeLearningIndex >= STATE.practiceLearningTrials.length) {
        endPracticeLearning();
        return;
    }

    const trial = STATE.practiceLearningTrials[STATE.currentPracticeLearningIndex];
    const total = STATE.practiceLearningTrials.length;

    document.getElementById('learning-progress').style.width =
        `${((STATE.currentPracticeLearningIndex + 1) / total) * 100}%`;
    document.getElementById('learning-counter').textContent =
        `${STATE.currentPracticeLearningIndex + 1} / ${total}`;

    const anchor = document.getElementById('learning-center-anchor');
    if (anchor) anchor.innerHTML = '<div class="fixation-cross subtle">+</div>';

    const objectsContainer = document.getElementById('learning-objects');
    objectsContainer.innerHTML = trial.items.map(item => `
        <div class="object-wrapper">
            <div class="practice-emoji" aria-label="${item.label}">${item.emoji}</div>
        </div>
    `).join('');

    const trialStartPerf = performance.now();

    trial.wordOrder.forEach((item, wIdx) => {
        const targetOnsetMs = PRACTICE_CONFIG.initialSilence + wIdx * PRACTICE_CONFIG.wordSoa;
        const delay = Math.max(0, targetOnsetMs - (performance.now() - trialStartPerf));
        scheduleTimeout(() => {
            if (STATE.phase !== 'practice-learning') return;
            playPracticeAudio(item.id);
        }, delay);
    });

    const endDelay = Math.max(0, PRACTICE_CONFIG.trialDuration - (performance.now() - trialStartPerf));
    scheduleTimeout(() => {
        if (STATE.phase !== 'practice-learning') return;
        STATE.currentPracticeLearningIndex++;
        renderEmptyFixationStage('learning-objects', 'learning-center-anchor');
        scheduleTimeout(() => {
            runPracticeLearningTrial();
        }, CONFIG.iti);
    }, endDelay);
}

function endPracticeLearning() {
    STATE.phase = 'practice-test-instructions';
    showScreen('practice-test-instructions-screen');
}

function startPracticeTest() {
    clearAllScheduledTimeouts();
    STATE.phase = 'practice-test';
    STATE.currentPracticeIndex = 0;
    STATE.practiceData = [];
    STATE.practiceTrials = generatePracticeTrials();
    STATE.practiceAwaitingResponse = false;
    STATE.practiceAwaitingCenterClick = false;

    const label = document.getElementById('afc-phase-label');
    if (label) label.textContent = '練習：テストパート';

    showCountdown(() => {
        showScreen('afc-screen');
        preparePracticeTestTrial();
    });
}

function preparePracticeTestTrial() {
    if (STATE.currentPracticeIndex >= STATE.practiceTrials.length) {
        endPractice();
        return;
    }

    const total = STATE.practiceTrials.length;
    document.getElementById('afc-progress').style.width =
        `${(STATE.currentPracticeIndex / total) * 100}%`;
    document.getElementById('afc-counter').textContent =
        `${STATE.currentPracticeIndex + 1} / ${total}`;

    const statusEl = document.getElementById('afc-status-text');

    if (CONFIG.responseMode === 'mouse') {
        STATE.practiceAwaitingCenterClick = true;
        STATE.practiceAwaitingResponse = false;
        if (statusEl) statusEl.textContent = '中央の「＋」をクリックして音声を再生してください';
        renderCenterClickPrompt('afc-objects', 'afc-center-anchor', () => {
            if (!STATE.practiceAwaitingCenterClick) return;
            STATE.practiceAwaitingCenterClick = false;
            presentPracticeTestStimuli();
        });
    } else {
        STATE.practiceAwaitingCenterClick = false;
        STATE.practiceAwaitingResponse = false;
        if (statusEl) statusEl.textContent = '';
        renderEmptyFixationStage('afc-objects', 'afc-center-anchor');
        scheduleTimeout(() => {
            if (STATE.phase !== 'practice-test') return;
            presentPracticeTestStimuli();
        }, CONFIG.afcIti);
    }
}

function presentPracticeTestStimuli() {
    const currentTrial = STATE.practiceTrials[STATE.currentPracticeIndex];
    const isMouse = CONFIG.responseMode === 'mouse';
    const container = document.getElementById('afc-objects');
    const anchor = document.getElementById('afc-center-anchor');
    const statusEl = document.getElementById('afc-status-text');

    if (anchor) anchor.innerHTML = '<div class="fixation-cross subtle">+</div>';
    if (statusEl) statusEl.textContent = isMouse ? '合う絵をクリックしてください' : 'R / U / F / J キーで選んでください';

    container.classList.toggle('afc-clickable', isMouse);
    container.innerHTML = currentTrial.options.map((item, i) => `
        <div class="object-wrapper" data-practice-id="${item.id}" data-position="${i + 1}">
            ${!isMouse ? `<span class="object-key-badge">${AFC_KEY_LABELS[i]}</span>` : ''}
            <div class="practice-emoji" aria-label="${item.label}">${item.emoji}</div>
        </div>
    `).join('');

    if (isMouse) {
        container.querySelectorAll('.object-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const optionId = wrapper.dataset.practiceId;
                if (optionId) selectPracticeObject(optionId, 'mouse');
            });
        });
    }

    STATE.currentPracticeTrial = {
        trial: currentTrial.trial,
        options: currentTrial.options,
        targetId: currentTrial.target.id,
        targetLabel: currentTrial.target.label,
        audioStartPerf: null,
        audioEndPerf: null,
        audioPlayOk: 0
    };

    STATE.practiceAwaitingResponse = false;

    const leadMs = isMouse ? CONFIG.afcCenterLeadMs : 100;
    scheduleTimeout(() => {
        if (STATE.phase !== 'practice-test') return;
        playPracticeAudio(
            currentTrial.target.id,
            (ok) => {
                if (!STATE.currentPracticeTrial) return;
                STATE.currentPracticeTrial.audioEndPerf = performance.now();
                STATE.currentPracticeTrial.audioPlayOk = ok ? 1 : 0;
                if (CONFIG.responseWindow === 'offset') {
                    STATE.practiceAwaitingResponse = true;
                }
            },
            () => {
                if (!STATE.currentPracticeTrial) return;
                STATE.currentPracticeTrial.audioStartPerf = performance.now();
                if (CONFIG.responseWindow === 'onset300') {
                    scheduleTimeout(() => {
                        if (STATE.phase === 'practice-test' && STATE.currentPracticeTrial?.trial === currentTrial.trial) {
                            STATE.practiceAwaitingResponse = true;
                        }
                    }, CONFIG.minOnsetResponseMs);
                }
            }
        );
    }, leadMs);
}

function selectPracticeObject(optionId, responseSource = '') {
    if (!STATE.practiceAwaitingResponse || !STATE.currentPracticeTrial) return;
    STATE.practiceAwaitingResponse = false;

    const trial = STATE.currentPracticeTrial;
    const responsePerfMs = performance.now();
    const refTime = CONFIG.responseWindow === 'offset'
        ? (trial.audioEndPerf ?? trial.audioStartPerf ?? responsePerfMs)
        : (trial.audioStartPerf ?? responsePerfMs);
    const rtRaw = Math.max(0, responsePerfMs - refTime);
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

    // Show clear visual feedback in practice so participants verify mapping/controls
    const container = document.getElementById('afc-objects');
    container.classList.remove('afc-clickable');
    const chosenEl = container.querySelector(`.object-wrapper[data-practice-id="${optionId}"]`);
    const correctEl = container.querySelector(`.object-wrapper[data-practice-id="${trial.targetId}"]`);
    if (chosenEl) chosenEl.classList.add(correct ? 'correct' : 'incorrect');
    if (!correct && correctEl) correctEl.classList.add('correct');

    const statusEl = document.getElementById('afc-status-text');
    if (statusEl) {
        statusEl.textContent = correct ? '✓ 正解です' : '✗ 正しい選択肢は緑色の枠です';
        statusEl.style.color = correct ? 'var(--accent-success)' : 'var(--accent-warning)';
    }

    scheduleTimeout(() => {
        if (statusEl) statusEl.style.color = 'var(--text-muted)';
        STATE.currentPracticeIndex++;
        preparePracticeTestTrial();
    }, 750);
}

function endPractice() {
    stopActiveAudio();
    STATE.phase = 'instructions';
    showScreen('instructions-screen');
}

// ============================================================================
// Main Learning Phase (True Center Fixation + Preview + SOA-Locked 4 Words)
// ============================================================================

function startLearning() {
    clearAllScheduledTimeouts();
    STATE.phase = 'learning';
    STATE.currentTrialIndex = 0;
    STATE.experimentStartTime = Date.now();
    STATE.experimentStartPerf = performance.now();
    STATE.learningTrialLogs = [];
    STATE.learningWordEvents = [];
    STATE.currentLearningTrialLog = null;

    const label = document.getElementById('learning-phase-label');
    if (label) label.textContent = '学習パート';
    const status = document.getElementById('learning-status-text');
    if (status) status.textContent = '';

    showCountdown(() => {
        showScreen('learning-screen');
        // Initial 1,000 ms central '+' fixation before Trial 1
        renderEmptyFixationStage('learning-objects', 'learning-center-anchor');
        document.getElementById('learning-progress').style.width = '0%';
        document.getElementById('learning-counter').textContent = `1 / ${STATE.learningTrials.length}`;

        scheduleTimeout(() => {
            runLearningTrial();
        }, CONFIG.iti);
    });
}

function showCountdown(callback) {
    showScreen('countdown-screen');
    let count = 3;
    const el = document.getElementById('countdown-number');
    el.textContent = count;

    const tick = () => {
        count--;
        if (count > 0) {
            el.textContent = count;
            scheduleTimeout(tick, 900);
        } else {
            callback();
        }
    };
    scheduleTimeout(tick, 900);
}

function createLearningTrialLog(trial, trialIndex, totalTrials, startTimestamp, startPerfMs) {
    const pairIds = (trial.pairs || []).map(p => p.pairId);
    const objectIndices = trial.objects || [];
    const wordsInTrial = (trial.pairs || []).map(p => p.word);
    const wordOrder = trial.words || [];
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
        trialDurationMs: '',
        quadrantHoverMs: [0, 0, 0, 0]
    };
}

function flushActiveHover(trialLog) {
    if (trialLog && STATE.activeHoverQuadrant !== null && STATE.activeHoverStartPerf !== null) {
        const dt = Math.max(0, performance.now() - STATE.activeHoverStartPerf);
        trialLog.quadrantHoverMs[STATE.activeHoverQuadrant] += Math.round(dt);
    }
    STATE.activeHoverQuadrant = null;
    STATE.activeHoverStartPerf = null;
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

    document.getElementById('learning-progress').style.width =
        `${(trialIndex / total) * 100}%`;
    document.getElementById('learning-counter').textContent =
        `${trialIndex} / ${total}`;

    // Subtle static center cross inside the 2x2 intersection (no number badges, no animations)
    const anchor = document.getElementById('learning-center-anchor');
    if (anchor) anchor.innerHTML = '<div class="fixation-cross subtle">+</div>';

    const objectsContainer = document.getElementById('learning-objects');
    objectsContainer.innerHTML = trial.objects.map((objIdx, qIdx) => `
        <div class="object-wrapper" data-quadrant="${qIdx}">
            ${NOVEL_OBJECTS[objIdx]}
        </div>
    `).join('');

    // Passive pointer dwell tracking (visual style remains completely static)
    STATE.activeHoverQuadrant = null;
    STATE.activeHoverStartPerf = null;
    objectsContainer.querySelectorAll('.object-wrapper').forEach(wrapper => {
        const q = parseInt(wrapper.dataset.quadrant, 10);
        wrapper.addEventListener('pointerenter', () => {
            flushActiveHover(trialLog);
            STATE.activeHoverQuadrant = q;
            STATE.activeHoverStartPerf = performance.now();
        });
        wrapper.addEventListener('pointerleave', () => {
            if (STATE.activeHoverQuadrant === q) {
                flushActiveHover(trialLog);
            }
        });
    });

    // Schedule each of the 4 words on an exact onset-locked SOA clock:
    // onset_k = initialSilence + k * wordSoa (gives Word 1..4 identical attentional windows)
    trial.words.forEach((word, wIdx) => {
        const scheduledOnsetMs = CONFIG.initialSilence + wIdx * CONFIG.wordSoa;
        const delayMs = Math.max(0, scheduledOnsetMs - (performance.now() - trialStartPerfMs));

        scheduleTimeout(() => {
            if (STATE.phase !== 'learning') return;
            playSingleLearningWord(word, wIdx, trialLog);
        }, delayMs);
    });

    // End trial at exact CONFIG.trialDuration
    const endDelayMs = Math.max(0, CONFIG.trialDuration - (performance.now() - trialStartPerfMs));
    scheduleTimeout(() => {
        if (STATE.phase !== 'learning') return;
        flushActiveHover(trialLog);

        const trialEndPerfMs = performance.now();
        const trialEndTimestamp = Date.now();
        trialLog.trialEndTimestamp = trialEndTimestamp;
        trialLog.trialEndPerfMs = trialEndPerfMs;
        trialLog.trialDurationMs = Math.round(trialEndPerfMs - trialLog.trialStartPerfMs);

        STATE.currentTrialIndex++;
        renderEmptyFixationStage('learning-objects', 'learning-center-anchor');

        scheduleTimeout(() => {
            runLearningTrial();
        }, CONFIG.iti);
    }, endDelayMs);
}

function playSingleLearningWord(word, index, trialLog) {
    const queuedStartPerfMs = performance.now();
    const queuedStartTimestamp = Date.now();
    let audioStartPerfMs = null;
    let audioStartTimestamp = null;

    playAudio(
        word,
        (ok) => {
            const audioEndPerfMs = performance.now();
            const audioEndTimestamp = Date.now();
            const startPerfMs = audioStartPerfMs ?? queuedStartPerfMs;
            const startTimestamp = audioStartTimestamp ?? queuedStartTimestamp;
            const pair = STATE.wordMap.get(word);
            const pairId = pair ? pair.pairId : '';
            const objectIndex = pair ? pair.objectIndex : '';
            const onsetFromTrialStartMs = trialLog && typeof trialLog.trialStartPerfMs === 'number'
                ? Math.round(startPerfMs - trialLog.trialStartPerfMs)
                : '';

            STATE.learningWordEvents.push({
                trialNum: trialLog ? trialLog.trialNum : '',
                trialIndex: trialLog ? trialLog.trialIndex : '',
                wordIndex: index + 1,
                word,
                pairId,
                objectIndex,
                audioStartTimestamp: startTimestamp,
                audioEndTimestamp,
                audioStartPerfMs: Math.round(startPerfMs),
                audioEndPerfMs: Math.round(audioEndPerfMs),
                audioDurationMs: Math.round(audioEndPerfMs - startPerfMs),
                onsetFromTrialStartMs,
                playbackOk: ok ? 1 : 0
            });
        },
        () => {
            audioStartPerfMs = performance.now();
            audioStartTimestamp = Date.now();
        }
    );
}

function endLearningPhase() {
    stopActiveAudio();
    STATE.phase = 'afc-instructions';
    showScreen('afc-instructions-screen');
}

// ============================================================================
// Main 4AFC Test Phase (Center '+' Reset & Equidistant 2x2 Selection)
// ============================================================================

function startAFCTest() {
    clearAllScheduledTimeouts();
    STATE.phase = 'afc';
    STATE.currentTestIndex = 0;
    STATE.afcData = [];
    STATE.awaitingCenterClick = false;
    STATE.awaitingAFCResponse = false;
    generateAFCTestTrials();

    const label = document.getElementById('afc-phase-label');
    if (label) label.textContent = 'テストパート';

    showCountdown(() => {
        showScreen('afc-screen');
        prepareAFCTrial();
    });
}

function prepareAFCTrial() {
    if (STATE.currentTestIndex >= STATE.afcTrials.length) {
        endAFCTest();
        return;
    }

    const total = STATE.afcTrials.length;
    document.getElementById('afc-progress').style.width =
        `${(STATE.currentTestIndex / total) * 100}%`;
    document.getElementById('afc-counter').textContent =
        `${STATE.currentTestIndex + 1} / ${total}`;

    const statusEl = document.getElementById('afc-status-text');

    if (CONFIG.responseMode === 'mouse') {
        // Mouse mode: clicking central '+' guarantees gaze & cursor start equidistant to all 4 quadrants
        STATE.awaitingCenterClick = true;
        STATE.awaitingAFCResponse = false;
        if (statusEl) statusEl.textContent = '中央の「＋」をクリックすると単語が再生されます';

        renderCenterClickPrompt('afc-objects', 'afc-center-anchor', () => {
            if (!STATE.awaitingCenterClick) return;
            STATE.awaitingCenterClick = false;
            runAFCTrial();
        });
    } else {
        // Keyboard mode (R/U/F/J): present central '+' during ITI so gaze resets to center
        STATE.awaitingCenterClick = false;
        STATE.awaitingAFCResponse = false;
        if (statusEl) statusEl.textContent = '';
        renderEmptyFixationStage('afc-objects', 'afc-center-anchor');

        scheduleTimeout(() => {
            if (STATE.phase !== 'afc') return;
            runAFCTrial();
        }, CONFIG.afcIti);
    }
}

function runAFCTrial() {
    if (STATE.currentTestIndex >= STATE.afcTrials.length) {
        endAFCTest();
        return;
    }

    const currentTrial = STATE.afcTrials[STATE.currentTestIndex];
    const targetPair = currentTrial.targetPair;
    const isMouse = CONFIG.responseMode === 'mouse';
    const options = currentTrial.options.map(pairId => STATE.pairMap.get(pairId));

    const anchor = document.getElementById('afc-center-anchor');
    if (anchor) anchor.innerHTML = '<div class="fixation-cross subtle">+</div>';

    const statusEl = document.getElementById('afc-status-text');
    if (statusEl) {
        statusEl.textContent = CONFIG.responseWindow === 'offset'
            ? '音声が終わってから選んでください'
            : (isMouse ? '対応する図形をクリックしてください' : 'R / U / F / J キーで選んでください');
    }

    const container = document.getElementById('afc-objects');
    container.classList.toggle('afc-clickable', isMouse);
    container.innerHTML = options.map((pair, i) => `
        <div class="object-wrapper" data-pair-id="${pair.pairId}" data-position="${i + 1}">
            ${!isMouse ? `<span class="object-key-badge">${AFC_KEY_LABELS[i]}</span>` : ''}
            ${NOVEL_OBJECTS[pair.objectIndex]}
        </div>
    `).join('');

    if (isMouse) {
        container.querySelectorAll('.object-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const pairId = parseInt(wrapper.dataset.pairId, 10);
                if (!Number.isNaN(pairId)) {
                    selectAFCObject(pairId, 'mouse');
                }
            });
        });
    }

    const trialStartTimestamp = Date.now();
    const trialStartPerfMs = performance.now();
    const expectedTrialIndex = STATE.currentTestIndex;

    STATE.currentAFCTrial = {
        trialIndexZero: expectedTrialIndex,
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

    const leadMs = isMouse ? CONFIG.afcCenterLeadMs : 100;
    scheduleTimeout(() => {
        if (STATE.phase !== 'afc' || STATE.currentAFCTrial?.trialIndexZero !== expectedTrialIndex) return;

        playAudio(
            targetPair.word,
            (ok) => {
                const active = STATE.currentAFCTrial;
                if (!active || active.trialIndexZero !== expectedTrialIndex) return;

                const audioEndPerfMs = performance.now();
                const audioEndTimestamp = Date.now();
                if (active.audioStartPerfMs === null) {
                    active.audioStartPerfMs = active.trialStartPerfMs;
                    active.audioStartTimestamp = active.trialStartTimestamp;
                }
                active.audioEndPerfMs = audioEndPerfMs;
                active.audioEndTimestamp = audioEndTimestamp;
                active.audioPlayOk = ok ? 1 : 0;

                if (CONFIG.responseWindow === 'offset') {
                    active.onsetTime = audioEndPerfMs;
                    STATE.awaitingAFCResponse = true;
                    if (statusEl) {
                        statusEl.textContent = isMouse
                            ? '対応する図形をクリックしてください'
                            : 'R / U / F / J キーで選んでください';
                    }
                }
            },
            () => {
                const active = STATE.currentAFCTrial;
                if (!active || active.trialIndexZero !== expectedTrialIndex) return;

                const startPerf = performance.now();
                active.audioStartPerfMs = startPerf;
                active.audioStartTimestamp = Date.now();

                if (CONFIG.responseWindow === 'onset300') {
                    active.onsetTime = startPerf;
                    scheduleTimeout(() => {
                        if (
                            STATE.phase === 'afc' &&
                            STATE.currentAFCTrial?.trialIndexZero === expectedTrialIndex &&
                            STATE.currentTestIndex === expectedTrialIndex
                        ) {
                            STATE.awaitingAFCResponse = true;
                        }
                    }, CONFIG.minOnsetResponseMs);
                }
            }
        );
    }, leadMs);
}

function selectAFCObject(pairId, responseSource = '') {
    if (!STATE.awaitingAFCResponse || !STATE.currentAFCTrial) return;
    STATE.awaitingAFCResponse = false;

    const trial = STATE.currentAFCTrial;
    const responsePerfMs = performance.now();
    const responseTimestamp = Date.now();

    stopActiveAudio();

    const rtAnchor = trial.onsetTime ?? trial.audioStartPerfMs ?? trial.trialStartPerfMs;
    const rtRaw = Math.max(0, responsePerfMs - rtAnchor);
    const rtFromOnsetMs = trial.audioStartPerfMs !== null
        ? Math.round((responsePerfMs - trial.audioStartPerfMs) * 1000) / 1000
        : '';
    const rtFromOffsetMs = trial.audioEndPerfMs !== null
        ? Math.round((responsePerfMs - trial.audioEndPerfMs) * 1000) / 1000
        : '';

    const correct = pairId === trial.targetPairId;
    const position = trial.options.indexOf(pairId) + 1;
    const audioDurationMs = trial.audioStartPerfMs !== null && trial.audioEndPerfMs !== null
        ? Math.round(trial.audioEndPerfMs - trial.audioStartPerfMs)
        : '';

    // Visual acknowledgment of selection (neutral indigo highlight; no accuracy feedback in test)
    const container = document.getElementById('afc-objects');
    container.classList.remove('afc-clickable');
    const chosenEl = container.querySelector(`.object-wrapper[data-position="${position}"]`);
    if (chosenEl) chosenEl.classList.add('selected');

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
        rtFromOnsetMs,
        rtFromOffsetMs,
        trialStartTimestamp: trial.trialStartTimestamp,
        trialStartPerfMs: trial.trialStartPerfMs,
        audioStartTimestamp: trial.audioStartTimestamp ?? '',
        audioStartPerfMs: trial.audioStartPerfMs ?? '',
        audioEndTimestamp: trial.audioEndTimestamp ?? '',
        audioEndPerfMs: trial.audioEndPerfMs ?? '',
        audioDurationMs,
        audioPlayOk: trial.audioPlayOk ?? 1,
        responsePerfMs,
        responseSource,
        timestamp: responseTimestamp,
        targetPosition: trial.targetPosition,
        option1PairId: trial.options[0],
        option2PairId: trial.options[1],
        option3PairId: trial.options[2],
        option4PairId: trial.options[3]
    });

    scheduleTimeout(() => {
        STATE.currentTestIndex++;
        if (CONFIG.responseMode === 'mouse') {
            // Brief central fixation pause before next trial's '+' click button
            renderEmptyFixationStage('afc-objects', 'afc-center-anchor');
            const statusEl = document.getElementById('afc-status-text');
            if (statusEl) statusEl.textContent = '';
            scheduleTimeout(() => {
                prepareAFCTrial();
            }, 350);
        } else {
            prepareAFCTrial();
        }
    }, 240);
}

function endAFCTest() {
    clearAllScheduledTimeouts();
    stopActiveAudio();
    STATE.phase = 'results';
    calculateResults();
    showScreen('results-screen');
    autoDownloadResults();
}

// ============================================================================
// Results Summary & Chart Rendering (Experimenter Panel)
// ============================================================================

function calculateResults() {
    const afcCorrect = STATE.afcData.filter(d => d.correct === 1).length;
    const afcTotal = STATE.afcData.length;
    const afcAccuracy = afcTotal > 0 ? (afcCorrect / afcTotal) * 100 : 0;

    const chanceLevel = 100 / CONFIG.objectsPerTrial;
    const afcCorrected = ((afcAccuracy - chanceLevel) / (100 - chanceLevel)) * 100;

    const afcMeanRT = afcTotal > 0
        ? STATE.afcData.reduce((s, d) => s + d.rt, 0) / afcTotal
        : 0;

    const rtLabel = CONFIG.responseWindow === 'offset'
        ? '平均RT (音声終了基準 ms)'
        : '平均RT (音声開始基準 ms)';

    document.getElementById('main-results').innerHTML = `
        <div class="result-card">
            <div class="result-value">${afcAccuracy.toFixed(1)}%</div>
            <div class="result-label">4AFC正答率 (${afcCorrect}/${afcTotal})</div>
        </div>
        <div class="result-card">
            <div class="result-value">${afcCorrected.toFixed(1)}%</div>
            <div class="result-label">チャンス補正正答率</div>
        </div>
        <div class="result-card">
            <div class="result-value">${Math.round(afcMeanRT)}</div>
            <div class="result-label">${rtLabel}</div>
        </div>
        <div class="result-card">
            <div class="result-value">${CONFIG.numPairs}</div>
            <div class="result-label">学習ペア数</div>
        </div>
    `;

    document.getElementById('detailed-results').innerHTML = `
        <thead>
            <tr>
                <th>Block</th>
                <th>試行</th>
                <th>単語</th>
                <th>正解位置</th>
                <th>選択位置</th>
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
                    <td>${QUADRANT_NAMES[(d.targetPosition || 1) - 1] || d.targetPosition}</td>
                    <td>${QUADRANT_NAMES[(d.selectedPosition || 1) - 1] || d.selectedPosition}</td>
                    <td>${d.correct ? '✓' : '✗'}</td>
                    <td>${d.rt} ms</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    drawBlockChart();
}

function drawBlockChart() {
    const svg = document.getElementById('learning-chart');
    const heading = document.getElementById('chart-heading');
    const data = STATE.afcData;
    if (!svg || data.length === 0) return;

    const segments = [];
    const labels = [];
    const maxBlock = Math.max(...data.map(d => d.block || 1));

    if (maxBlock > 1) {
        if (heading) heading.textContent = 'テストブロック別正答率';
        for (let b = 1; b <= maxBlock; b++) {
            const blockData = data.filter(d => d.block === b);
            if (blockData.length === 0) continue;
            segments.push((blockData.reduce((s, d) => s + d.correct, 0) / blockData.length) * 100);
            labels.push(`Block ${b}`);
        }
    } else {
        if (heading) heading.textContent = 'テスト前半・後半の正答率';
        const mid = Math.ceil(data.length / 2);
        const halves = [data.slice(0, mid), data.slice(mid)].filter(h => h.length > 0);
        halves.forEach((h, idx) => {
            segments.push((h.reduce((s, d) => s + d.correct, 0) / h.length) * 100);
            labels.push(idx === 0 ? '前半 (1–9)' : '後半 (10–18)');
        });
    }

    const width = 480;
    const height = 200;
    const padding = 44;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const xScale = (i) => segments.length === 1
        ? width / 2
        : padding + (i / (segments.length - 1)) * (width - padding * 2);
    const yScale = (v) => height - padding - (v / 100) * (height - padding * 2);

    svg.innerHTML = `
        <line x1="${padding}" y1="${yScale(25)}" x2="${width - padding}" y2="${yScale(25)}"
              stroke="#ef4444" stroke-width="1.5" stroke-dasharray="6,4"/>
        <text x="${padding - 6}" y="${yScale(25) + 3}" fill="#ef4444" font-size="10" text-anchor="end">25%</text>

        <line x1="${padding}" y1="${yScale(50)}" x2="${width - padding}" y2="${yScale(50)}"
              stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
        <text x="${padding - 6}" y="${yScale(50) + 3}" fill="#64748b" font-size="10" text-anchor="end">50%</text>

        <line x1="${padding}" y1="${yScale(75)}" x2="${width - padding}" y2="${yScale(75)}"
              stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
        <text x="${padding - 6}" y="${yScale(75) + 3}" fill="#64748b" font-size="10" text-anchor="end">75%</text>

        <line x1="${padding}" y1="${yScale(100)}" x2="${width - padding}" y2="${yScale(100)}"
              stroke="#334155" stroke-width="1" stroke-dasharray="4"/>
        <text x="${padding - 6}" y="${yScale(100) + 3}" fill="#64748b" font-size="10" text-anchor="end">100%</text>

        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"
              stroke="#64748b" stroke-width="1.5"/>
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}"
              stroke="#64748b" stroke-width="1.5"/>

        ${segments.length > 1 ? `
            <polyline points="${segments.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ')}"
                      fill="none" stroke="#818cf8" stroke-width="3"/>
        ` : ''}

        ${segments.map((v, i) => `
            <circle cx="${xScale(i)}" cy="${yScale(v)}" r="6" fill="#6366f1"/>
            <text x="${xScale(i)}" y="${yScale(v) - 10}" fill="#f1f5f9" font-size="11" text-anchor="middle">
                ${v.toFixed(1)}%
            </text>
            <text x="${xScale(i)}" y="${height - padding + 20}" fill="#cbd5e1" font-size="11" text-anchor="middle">
                ${labels[i]}
            </text>
        `).join('')}
    `;
}

// ============================================================================
// Data Export (Backward-Compatible Multi-Sheet Excel + True UTF-8 BOM CSV)
// ============================================================================

function setDownloadStatus(message) {
    const el = document.getElementById('download-status');
    if (el) el.textContent = message;
}

function autoDownloadResults() {
    if (STATE.autoDownloaded) return;
    STATE.autoDownloaded = true;

    setDownloadStatus('結果データを自動でダウンロードしています...');

    setTimeout(() => {
        try {
            if (typeof XLSX !== 'undefined') {
                downloadWorkbook();
                setTimeout(() => {
                    setDownloadStatus('Excelファイル (.xlsx) を保存しました。保存されない場合は下のボタンを押してください。');
                }, 500);
            } else {
                // Offline fallback: automatically save CSV if SheetJS CDN could not load
                downloadData();
                setDownloadStatus('オフライン環境のため CSVファイル (.csv) を自動保存しました。');
            }
        } catch (e) {
            console.error('Auto download failed:', e);
            setDownloadStatus('自動保存がブロックされました。下のボタンから保存してください。');
        }
    }, 250);
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
        'trialDurationMs', 'trialStartElapsedMs', 'trialEndElapsedMs',
        'quadrantHoverMs'
    ];

    const logs = STATE.learningTrialLogs.length > 0
        ? STATE.learningTrialLogs
        : STATE.learningTrials.map((trial, idx) =>
            createLearningTrialLog(trial, idx + 1, STATE.learningTrials.length, '', '')
        );
    const experimentStart = typeof STATE.experimentStartTime === 'number' ? STATE.experimentStartTime : null;

    const rows = logs.map(trial => {
        const trialStartTimestampISO = trial.trialStartTimestamp
            ? new Date(trial.trialStartTimestamp).toISOString()
            : '';
        const trialEndTimestampISO = trial.trialEndTimestamp
            ? new Date(trial.trialEndTimestamp).toISOString()
            : '';
        const trialStartElapsedMs = experimentStart && trial.trialStartTimestamp
            ? trial.trialStartTimestamp - experimentStart
            : '';
        const trialEndElapsedMs = experimentStart && trial.trialEndTimestamp
            ? trial.trialEndTimestamp - experimentStart
            : '';

        return [
            trial.trialNum ?? '',
            trial.trialIndex ?? '',
            trial.totalTrials ?? '',
            trial.objectsPerTrial ?? '',
            (trial.pairIds || []).join('|'),
            (trial.objectIndices || []).join('|'),
            (trial.objectPositions || []).join('|'),
            (trial.wordsInTrial || []).join('|'),
            (trial.wordOrder || []).join('|'),
            (trial.wordOrderPairIds || []).join('|'),
            (trial.repList || []).join('|'),
            trial.trialStartTimestamp ?? '',
            trialStartTimestampISO,
            trial.trialStartPerfMs ?? '',
            trial.trialEndTimestamp ?? '',
            trialEndTimestampISO,
            trial.trialEndPerfMs ?? '',
            trial.trialDurationMs ?? '',
            trialStartElapsedMs,
            trialEndElapsedMs,
            (trial.quadrantHoverMs || [0, 0, 0, 0]).join('|')
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

    const rows = STATE.learningWordEvents.map(event => [
        event.trialNum ?? '',
        event.trialIndex ?? '',
        event.wordIndex ?? '',
        event.word ?? '',
        event.pairId ?? '',
        event.objectIndex ?? '',
        event.audioStartTimestamp ?? '',
        event.audioStartTimestamp ? new Date(event.audioStartTimestamp).toISOString() : '',
        event.audioStartPerfMs ?? '',
        event.audioEndTimestamp ?? '',
        event.audioEndTimestamp ? new Date(event.audioEndTimestamp).toISOString() : '',
        event.audioEndPerfMs ?? '',
        event.audioDurationMs ?? '',
        event.onsetFromTrialStartMs ?? '',
        event.playbackOk ?? ''
    ]);

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

function buildPracticeTable() {
    const headers = ['trial', 'targetId', 'targetLabel', 'selectedId', 'correct', 'rt', 'responseSource'];
    const rows = STATE.practiceData.map(d => [
        d.trial ?? '',
        d.targetId ?? '',
        d.targetLabel ?? '',
        d.selectedId ?? '',
        d.correct ?? '',
        d.rt ?? '',
        d.responseSource ?? ''
    ]);
    return { headers, rows };
}

function buildConfigTable() {
    const experimentStartISO = STATE.experimentStartTime
        ? new Date(STATE.experimentStartTime).toISOString()
        : '';
    const rows = [
        ['taskVersion', TASK_VERSION],
        ['participantId', CONFIG.participantId],
        ['seedMode', CONFIG.seedMode],
        ['randomSeed', STATE.randomSeed ?? ''],
        ['responseMode', CONFIG.responseMode],
        ['responseWindow', CONFIG.responseWindow],
        ['spatialLayout', '2x2_equidistant_quadrants'],
        ['experimentStart', STATE.experimentStartTime ?? ''],
        ['experimentStartISO', experimentStartISO],
        ['experimentStartPerfMs', STATE.experimentStartPerf ?? ''],
        ['numPairs', CONFIG.numPairs],
        ['repetitions', CONFIG.repetitions],
        ['objectsPerTrial', CONFIG.objectsPerTrial],
        ['maxSpuriousCooccurCap', CONFIG.maxSpuriousCooccur],
        ['testBlocks', CONFIG.testBlocks],
        ['trialDurationMs', CONFIG.trialDuration],
        ['initialSilenceMs', CONFIG.initialSilence],
        ['wordSoaMs', CONFIG.wordSoa],
        ['wordIntervalMs', CONFIG.wordInterval],
        ['itiMs', CONFIG.iti],
        ['afcItiMs', CONFIG.afcIti],
        ['minOnsetResponseMs', CONFIG.minOnsetResponseMs],
        ['audioBasePath', CONFIG.audioBasePath],
        ['audioExtension', CONFIG.audioExtension],
        ['audioPreloadOk', STATE.audioPreloadOk ? 1 : 0],
        ['audioMissingCount', STATE.audioMissing.length],
        ['audioMissingList', STATE.audioMissing.join('|')],
        ['practiceEnabled', PRACTICE_CONFIG.enabled ? 1 : 0],
        ['practiceLearningTrials', PRACTICE_CONFIG.learningTrials],
        ['practiceTestTrials', PRACTICE_CONFIG.testTrials],
        ['practiceAudioPreloadOk', STATE.practiceAudioPreloadOk ? 1 : 0],
        ['viewportSize', `${window.innerWidth}x${window.innerHeight}`],
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
        return { nTotal, nScored, nCorrect, pc, pcChanceCorrected, meanRt, nMissed, missedRate };
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
        .filter(b => b !== undefined && b !== null)
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

        if (stats.pc !== null) prevPc = stats.pc;
    });

    return { headers, rows };
}

function buildAptitudeNotesTable() {
    const rtAnchorDesc = CONFIG.responseWindow === 'offset'
        ? 'Mean RT (ms) across scored trials; RT is measured from audio end (offset) to response.'
        : 'Mean RT (ms) across scored trials; RT is measured from audio onset to response (both rtFromOnsetMs and rtFromOffsetMs are in Data).';

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
        ['mean_rt', rtAnchorDesc],
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
            const count = countsForWord && optionObjectIndex !== ''
                ? (countsForWord.get(optionObjectIndex) || 0)
                : 0;
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
        'rtRaw', 'rtFromOnsetMs', 'rtFromOffsetMs',
        'trialStartTimestamp', 'trialStartPerfMs',
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
# Cross-Situational Statistical Learning Task Summary (v${TASK_VERSION})
# Participant: ${CONFIG.participantId}
# Experiment Start: ${experimentStartISO}
# Downloaded At: ${new Date().toISOString()}
# Random Seed: ${STATE.randomSeed ?? 'N/A'} (${CONFIG.seedMode})

## Configuration
Number of Pairs: ${CONFIG.numPairs}
Repetitions: ${CONFIG.repetitions}
Objects per Trial: ${CONFIG.objectsPerTrial} (2x2 Equidistant Quadrants)
Response Mode: ${CONFIG.responseMode}
Response Window: ${CONFIG.responseWindow}
Trial Duration: ${CONFIG.trialDuration}ms (Initial Preview ${CONFIG.initialSilence}ms + ${CONFIG.wordSoa}ms x 4 words)
Test Blocks: ${CONFIG.testBlocks}
Test Trials: ${afcTotal}

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
    `.trim();
}

function downloadData() {
    const { headers, rows } = buildDataTable();
    const csvLines = [
        headers.map(toCsvValue).join(','),
        ...rows.map(row => row.map(toCsvValue).join(','))
    ];
    const safeParticipantId = sanitizeFilename(CONFIG.participantId);
    downloadFile(
        csvLines.join('\r\n'),
        `CSSL_${safeParticipantId}_${formatDate()}.csv`,
        'text/csv;charset=utf-8;',
        true
    );
}

function downloadWorkbook() {
    if (typeof XLSX === 'undefined') {
        console.warn('XLSX library unavailable; falling back to CSV export.');
        downloadData();
        setDownloadStatus('Excelライブラリがオフラインのため CSV形式 (.csv) で保存しました。');
        return;
    }

    const { headers, rows } = buildDataTable();
    const summaryLines = buildSummaryText().split('\n').map(line => [line]);
    const learningTable = buildLearningTrialsTable();
    const learningEventsTable = buildLearningEventsTable();
    const pairMapTable = buildPairMapTable();
    const practiceTable = buildPracticeTable();
    const configTable = buildConfigTable();
    const aptitudeTable = buildAptitudeTable();
    const aptitudeNotesTable = buildAptitudeNotesTable();
    const foilTable = buildFoilProbabilityTable();

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([headers, ...rows]), 'Data');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([learningTable.headers, ...learningTable.rows]), 'LearningTrials');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([learningEventsTable.headers, ...learningEventsTable.rows]), 'LearningEvents');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([pairMapTable.headers, ...pairMapTable.rows]), 'PairMap');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([configTable.headers, ...configTable.rows]), 'Config');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([aptitudeTable.headers, ...aptitudeTable.rows]), 'Aptitude');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([aptitudeNotesTable.headers, ...aptitudeNotesTable.rows]), 'AptitudeNotes');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([foilTable.headers, ...foilTable.rows]), 'FoilProbability');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([practiceTable.headers, ...practiceTable.rows]), 'PracticeData');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(summaryLines), 'Summary');

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
    const normalized = String(content).replace(/\r?\n/g, '\r\n');
    const payload = addBom ? `\ufeff${normalized}` : normalized;
    const blob = new Blob([payload], { type });
    downloadBlob(blob, filename);
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

// ============================================================================
// Keyboard & Lifecycle Event Listeners
// ============================================================================

document.addEventListener('keydown', (e) => {
    const activeId = document.querySelector('.screen.active')?.id;
    const activeElement = document.activeElement;
    const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT');

    // Allow Enter inside participant-id field to start immediately when ready
    if (activeId === 'welcome-screen' && e.code === 'Enter') {
        const startBtn = document.getElementById('start-btn');
        if (startBtn && !startBtn.disabled) {
            e.preventDefault();
            startExperiment();
        }
        return;
    }

    if (e.code === 'Space' && !isInput) {
        if (activeId === 'welcome-screen') {
            const startBtn = document.getElementById('start-btn');
            if (startBtn && !startBtn.disabled) {
                e.preventDefault();
                startExperiment();
            }
            return;
        }
        if (activeId === 'practice-instructions-screen') {
            e.preventDefault();
            startPractice();
            return;
        }
        if (activeId === 'practice-test-instructions-screen') {
            e.preventDefault();
            startPracticeTest();
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

    // 2x2 Quadrant Keyboard Selection (R/U/F/J via physical e.code)
    if (CONFIG.responseMode === 'keyboard') {
        if (STATE.phase === 'afc' && STATE.awaitingAFCResponse) {
            const pos = getAFCPositionForEvent(e);
            if (pos) {
                e.preventDefault();
                const wrapper = document.querySelector(`#afc-objects .object-wrapper[data-position="${pos}"]`);
                if (wrapper) {
                    const pairId = parseInt(wrapper.dataset.pairId, 10);
                    if (!Number.isNaN(pairId)) selectAFCObject(pairId, 'key');
                }
            }
        } else if (STATE.phase === 'practice-test' && STATE.practiceAwaitingResponse) {
            const pos = getAFCPositionForEvent(e);
            if (pos) {
                e.preventDefault();
                const wrapper = document.querySelector(`#afc-objects .object-wrapper[data-position="${pos}"]`);
                if (wrapper && wrapper.dataset.practiceId) {
                    selectPracticeObject(wrapper.dataset.practiceId, 'key');
                }
            }
        }
    }
});

['cfg-response-mode', 'cfg-trial-duration', 'cfg-test-blocks', 'cfg-response-window', 'cfg-seed-mode', 'cfg-practice']
    .forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', readConfigPreviewOnly);
    });

window.addEventListener('beforeunload', (e) => {
    if (STATE.phase !== 'setup' && STATE.phase !== 'results') {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Initialize
readConfigPreviewOnly();
startAudioPreload();
console.log(`CSSL Task initialized (v${TASK_VERSION})`);
