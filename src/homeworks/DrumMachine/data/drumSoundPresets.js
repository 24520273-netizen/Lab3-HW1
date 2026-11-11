export const drumSoundPresets = {
  kick: {
    mode: 'tone',
    durationSeconds: 0.35,
    toneStartHz: 160,
    toneEndHz: 48,
    toneGain: 0.8,
    noiseGain: 0,
    noiseHighpassHz: 0,
  },

  snare: {
    mode: 'hybrid',
    durationSeconds: 0.22,
    toneStartHz: 185,
    toneEndHz: 130,
    toneGain: 0.2,
    noiseGain: 0.42,
    noiseHighpassHz: 1200,
  },

  'closed-hihat': {
    mode: 'noise',
    durationSeconds: 0.09,
    toneStartHz: 0,
    toneEndHz: 0,
    toneGain: 0,
    noiseGain: 0.24,
    noiseHighpassHz: 6500,
  },

  'open-hihat': {
    mode: 'noise',
    durationSeconds: 0.48,
    toneStartHz: 0,
    toneEndHz: 0,
    toneGain: 0,
    noiseGain: 0.22,
    noiseHighpassHz: 5000,
  },

  clap: {
    mode: 'noise',
    durationSeconds: 0.18,
    toneStartHz: 0,
    toneEndHz: 0,
    toneGain: 0,
    noiseGain: 0.4,
    noiseHighpassHz: 1400,
  },

  tom: {
    mode: 'tone',
    durationSeconds: 0.38,
    toneStartHz: 190,
    toneEndHz: 85,
    toneGain: 0.65,
    noiseGain: 0,
    noiseHighpassHz: 0,
  },

  crash: {
    mode: 'noise',
    durationSeconds: 0.95,
    toneStartHz: 0,
    toneEndHz: 0,
    toneGain: 0,
    noiseGain: 0.28,
    noiseHighpassHz: 3500,
  },
}
