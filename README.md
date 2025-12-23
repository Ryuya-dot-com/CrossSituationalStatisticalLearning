# CSSL Task (Audio-Only)

This folder contains an audio-only Cross-Situational Statistical Learning (CSSL) task.
Participants learn word-object mappings across repeated ambiguous trials and are tested
with a 4AFC recognition test.

## Files

- `CSSL_Task.html`: Main experiment UI.
- `CSSL_Task.js`: Task logic, randomization, data export.
- `audio/`: Pre-generated word audio files (`.mp3`).
- `generate_cssl_audio.py`: Script to generate audio files with gTTS.

## Quick Start

1. Generate audio files (requires internet and gTTS):
   - `pip install gTTS`
   - `python3 generate_cssl_audio.py`
2. Open `CSSL_Task.html` in a browser (or host on GitHub Pages).
3. Enter a participant ID and start the task.

## Audio

- Audio files are required in `audio/` and must be named using lowercase words
  from `PSEUDOWORDS` in `CSSL_Task.js` (for example, `bosa.mp3`).
- On load, the task preloads all expected audio files. If files are missing, the
  Start button stays disabled and a warning is shown.
- The "Audio Test" button plays a sample word.

## Task Flow

1. Learning phase:
   - 4 objects shown per trial.
   - 4 words played per trial (order shuffled).
   - Mappings are learned across trials (single trials are ambiguous).
2. Test phase:
   - 4AFC test, 2 blocks (18 words x 2 = 36 trials).
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
  - `LearningTrials`: learning-phase trials (for co-occurrence analysis).
  - `FoilProbability`: word–object co-occurrence counts/probabilities per test option.
  - `Summary`: overall accuracy, chance-corrected accuracy, mean RT, pair-wise results, and test order.

Manual download buttons (if shown) export the same Excel workbook. Some browsers
may block automatic downloads; allow them or use the manual button.

Key Data-sheet columns:

- `seed`: random seed used for reproducibility.
- `block`, `blockTrial`, `trial`: test indexing.
- `targetWord`, `targetObjectIndex`, `targetPosition`.
- `option1PairId..option4PairId`: option order shown.
- `selectedPairId`, `selectedPosition`, `correct`, `rt`.
- `timestamp`, `timestampISO`, `elapsedMs`.

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

## Hosting Notes

For GitHub Pages, ensure `audio/` is included in the published build. If you need
offline Excel export, replace the CDN `xlsx` script in `CSSL_Task.html` with a
local copy of the library.
