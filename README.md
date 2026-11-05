# CSSL Task (Audio-Only, v2.0.0)

Audio-only Cross-Situational Statistical Learning (CSSL) task grounded in **Yu & Smith (2007, *Psychological Science*)** and **Yu & Smith (2011, *Developmental Science*)**. Participants learn 18 novel word–object mappings across 27 individually ambiguous 4×4 trials and are assessed with a 4AFC recognition test.

## Methodological Refinements (v2.0.0)

1. **Symmetric 2×2 Equidistant Visual Stage & True Central Fixation (`+`)**
   - All 4 candidate objects are arranged in a fixed **2×2 grid** equidistant from the central fixation cross (`+`), eliminating eccentricity confounds between inner and outer positions and preventing mobile/tablet grid-wrapping mismatches.
   - A centered `+` fixation cross precedes Trial 1 and appears during every inter-trial interval (ITI) in both learning and testing so gaze consistently starts at `(0, 0)` center (Yu & Smith, 2011).
   - Peripheral pulsing animations, hover scaling, and slot numbers (`1..4`) during learning are removed to prevent exogenous gaze disruption and artificial serial-mapping strategies.

2. **Exact SOA-Locked Within-Trial Timing (Yu & Smith, 2007; 2011)**
   - Default learning trial duration is **12,000 ms** (`1,200 ms` initial visual preview silence + 4 words scheduled at `2,700 ms` onset-to-onset intervals: `1.2s, 3.9s, 6.6s, 9.3s`, ending at `12.0s`), giving every spoken word—from Word 1 to Word 4—an identical multimodal attentional registration window ($\eta_{ij}(t)$ in Yu & Smith, 2011).

3. **Intuitive 2×2 Response Operation (Mouse Center-Click Default + 2×2 Keyboard Option)**
   - **Mouse Mode (Default)**: Each 4AFC trial starts when the participant clicks the central `+` button, anchoring both eye gaze and cursor equidistant to all four quadrants before the target word plays. Participants then click the matching object directly.
   - **Keyboard Mode (Selectable in Experimenter Settings)**: Uses spatially congruent 2×2 physical key codes (`KeyR` = Top-Left, `KeyU` = Top-Right, `KeyF` = Bottom-Left, `KeyJ` = Bottom-Right), making input immune to Japanese IME (`全角/かな`) state.
   - **Response Window**: By default (`onset300`), responses are accepted starting `300 ms` after word onset (reflecting ~100 ms initial word recognition + ~200 ms motor planning; Yu & Smith, 2011), avoiding dropped responses when participants recognize a word before audio offset. Both `rtFromOnsetMs` and `rtFromOffsetMs` are logged.

4. **Low-Nameability Novel Shapes & Curated Pseudowords**
   - `NOVEL_OBJECTS` uses 24 asymmetric, low-nameability sculptural silhouettes modeled after Yu & Smith (2011, Fig. 5) rather than recognizable everyday icons, preventing verbal-labeling strategies.
   - When `numPairs <= 18`, `CURATED_PSEUDOWORDS_18` selects 18 disyllabic pseudowords (including Yu & Smith's core items `bosa`, `manu`, `colat`, `regli`, `gazzer`) while excluding items homophonous with Japanese words (`kita`, `toma`, `noba`).

5. **Controlled Co-occurrence Matrix & Reproducible Lists**
   - Learning trial generation enforces: (a) no duplicate pairs within a trial, (b) no repeated pairs across consecutive trials, (c) capped off-diagonal spurious co-occurrences (`<= 2` out of 6) to maximize contextual diversity, and (d) balanced spatial quadrant placement decoupled from temporal word order.
   - Fixed seeds (`fixed_a`, `fixed_b`) are provided by default for individual-differences / aptitude reliability, alongside an optional `random` seed mode.

## Files

- `index.html`: Main experiment UI and collapsible experimenter settings panel.
- `CSSL_Task.js`: Stimulus definitions, constrained schedule generator, timing engine, and data export.
- `CSSL_Task.html`: Legacy redirect entrypoint to `index.html`.
- `audio/`: Pre-generated pseudoword `.mp3` files (24 files).
- `audio_check/`: Pre-generated familiarization practice `.mp3` files.

## Data Output

At task completion, results auto-download as an Excel workbook (`.xlsx`) with a working UTF-8 BOM `.csv` fallback button (`downloadData()`):

- `Data`: Trial-by-trial 4AFC test data (`rt`, `rtRaw`, `rtFromOnsetMs`, `rtFromOffsetMs`, options, accuracy, audio timestamps).
- `LearningTrials`: Trial-level co-occurrence sets, quadrant assignments, word orders, exact durations, and passive pointer quadrant dwell (`quadrantHoverMs`).
- `LearningEvents`: Word-by-word onset/offset timestamps during learning.
- `PairMap`: `pairId` -> `word` -> `objectIndex` mapping.
- `FoilProbability`: Training co-occurrence counts and conditional probabilities for each 4AFC option.
- `PracticeData`: Familiarization practice test trial responses.
- `Config`: Full run configuration, timing parameters, seed mode, and environment metadata.
- `Aptitude` & `AptitudeNotes`: Overall and block-level accuracy, chance-corrected accuracy, `dpc`, and mean RT.
- `Summary`: Human-readable experiment summary and item-level accuracy.
