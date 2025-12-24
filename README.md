# CSSL Task (Audio-Only)

This folder contains an audio-only Cross-Situational Statistical Learning (CSSL) task.
Participants learn word-object mappings across repeated ambiguous trials and are tested
with a 4AFC recognition test.

## Files

- `index.html`: Main experiment UI (GitHub Pages entrypoint).
- `CSSL_Task.js`: Task logic, randomization, data export.
- `CSSL_Task.html`: Legacy entrypoint (redirects to `index.html`).
- `audio/`: Pre-generated word audio files (`.mp3`).
- `generate_cssl_audio.py`: Script to generate audio files with gTTS.

## Quick Start

1. Generate audio files (requires internet and gTTS):
   - `pip install gTTS`
   - `python3 generate_cssl_audio.py`
2. Open `index.html` in a browser (or host on GitHub Pages).
3. Enter a participant ID and start the task.

## Audio

- Audio files are required in `audio/` and must be named using lowercase words
  from `PSEUDOWORDS` in `CSSL_Task.js` (for example, `bosa.mp3`).
- On load, the task preloads all expected audio files. If files are missing, the
  Start button stays disabled and a warning is shown.
- The "Audio Test" button plays a sample word.

## Task Flow

0. Practice phase (before learning):
   - Keyboard practice using common English words.
   - Audio files are loaded from `../audio_check` (check_1..check_12, 12 trials).
   - Respond with D/F/J/K keys shown on the options.
1. Learning phase:
   - 4 objects shown per trial.
   - 4 words played per trial (order shuffled).
   - Mappings are learned across trials (single trials are ambiguous).
   - Trials are generated without duplicate pairs within a trial.
   - No word-object pair is repeated in consecutive trials.
2. Test phase:
    - 4AFC test, 2 blocks (18 words x 2 = 36 trials).
    - Respond with D/F/J/K keys shown on the objects (keyboard responses only for RT).

## Participant Instructions (Test)

- Place your left hand on D/F and right hand on J/K.
- Each object is labeled D/F/J/K; press the matching key.
- Keep your fingers on the keys and respond as quickly and accurately as possible.
- Do not use the mouse; responses are collected by keyboard only.

## Participant Instructions (Practice)

- You will hear common English words and see four written options.
- Press the key (D/F/J/K) that matches the word you heard.
- This phase is only for keyboard familiarization.

Practice audio mapping:
- check_1: apple
- check_2: banana
- check_3: cat
- check_4: carrot
- check_5: bird
- check_6: cherry
- check_7: dog
- check_8: fish
- check_9: grape
- check_10: rabbit
- check_11: orange
- check_12: potato

Hosting note: ensure `audio_check/` is served alongside this task so
`../audio_check/check_*.mp3` is reachable from `index.html`.
   - Options are precomputed per block:
     - Target position is balanced across the 4 slots.
     - Distractors are balanced within a block.
     - The same distractor set for a target is avoided across blocks.
   - Responses are accepted only after the audio finishes.
   - RT is measured from audio end to response.

## Data Output

Auto-download at the end:

- Excel (`.xlsx`) only, with multiple sheets:
  - `Data`: test trial data.
  - `LearningTrials`: learning-phase trials (co-occurrence sets + timing/position metadata).
  - `LearningEvents`: per-word presentation events with audio timing.
  - `PairMap`: pairId -> word -> objectIndex lookup.
  - `FoilProbability`: word–object co-occurrence counts/probabilities per test option.
  - `Config`: run configuration, timing, audio preload status, environment.
  - `Aptitude`: CSSL aptitude-style summary metrics (overall + block-level).
  - `AptitudeNotes`: definitions for Aptitude metrics and units.
  - `Summary`: overall accuracy, chance-corrected accuracy, mean RT, pair-wise results, and test order.

Manual download buttons (if shown) export the same Excel workbook. Some browsers
may block automatic downloads; allow them or use the manual button.

Key Data-sheet columns:

- `seed`: random seed used for reproducibility.
- `block`, `blockTrial`, `trial`: test indexing.
- `targetWord`, `targetObjectIndex`, `targetPosition`.
- `option1PairId..option4PairId`: option order shown.
- `selectedPairId`, `selectedPosition`, `correct`, `rt`, `rtRaw`.
- `trialStartTimestamp`, `trialStartPerfMs`.
- `audioStartTimestamp`, `audioStartPerfMs`, `audioEndTimestamp`, `audioEndPerfMs`, `audioDurationMs`, `audioPlayOk`.
- `responsePerfMs`, `responseSource`.
- `timestamp`, `timestampISO`, `elapsedMs`.

Key LearningTrials columns:

- `pairIds`, `objectIndices`, `objectPositions`, `wordsInTrial`, `wordOrder`, `wordOrderPairIds`, `repList`.
- `trialStartTimestamp`, `trialEndTimestamp`, `trialDurationMs`, `trialStartElapsedMs`, `trialEndElapsedMs`.

Key LearningEvents columns:

- `trialNum`, `wordIndex`, `word`, `pairId`, `objectIndex`.
- `audioStartTimestamp`, `audioEndTimestamp`, `audioDurationMs`, `onsetFromTrialStartMs`, `playbackOk`.

Key Aptitude columns:

- `scope` (overall or block), `block`, `blockIndex`.
- `n_total`, `n_scored`, `n_correct`, `pc`, `pc_chance_corrected`, `mean_rt`.
- `n_missed`, `missed_rate`, `dpc`, `chance_level`, `rt_unit`.

The `AptitudeNotes` sheet defines what each Aptitude metric means.

The summary sheet includes overall accuracy, chance-corrected accuracy, mean RT,
pair-wise results, and the full test order.

## Configuration

Defaults are defined in `CSSL_Task.js`:

- `numPairs`: 18
- `repetitions`: 6
- `objectsPerTrial`: 4 (4x4)
- `testBlocks`: 2
- `trialDuration`, `wordInterval`, `iti`: timing parameters

If you change the word list or the number of pairs, regenerate audio and ensure
`audio/` contains all required files.

Learning trial generation enforces:
- no duplicate pairs within a trial
- no repeated pairs in consecutive trials
This requires `numPairs >= objectsPerTrial * 2` and
`numPairs * repetitions` divisible by `objectsPerTrial`.

## Hosting Notes

For GitHub Pages, ensure `audio/` is included in the published build. If you need
offline Excel export, replace the CDN `xlsx` script in `index.html` with a
local copy of the library.
