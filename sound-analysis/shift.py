# STEP TWO: Shift and Stretch extracted sound clip
# Generates audio files for all required notes and durations
import numpy as np
import soundfile as sf
import pyrubberband as pyrb
import librosa
import librosa.display
import matplotlib.pyplot as plt

print('past import')

unit = 6
noteLengths = {
    'sixteenth': unit/16,
    'eighth': unit/8,
    'eighthdotted': unit/8*1.5,
    'quarter': unit/4,
    'quarterdotted': unit/4*1.5,
    'half': unit/2,
    'halfdotted': unit/2*1.5,
    'halfdottedeighth': unit/2*1.5 + unit/8,
    'halfdottedsixteenth': unit/2*1.5 + unit/16,
    'halfeighth': unit/2 + unit/8,
    'whole': unit,
    'wholequarter': unit + unit/4,
    'wholedotted': unit*1.5,
    'wholedouble': unit*2
}


frequencies = [
  { 'tone': 74, 'note': "A#6/Bb6", 'freq': 1864.66, 'required': False },
  { 'tone': 73, 'note': "A6", 'freq': 1760.0, 'required': False },
  { 'tone': 72, 'note': "G#6-Ab6", 'freq': 1661.22, 'required': False },
  { 'tone': 71, 'note': "G6", 'freq': 1567.98, 'required': False },
  { 'tone': 70, 'note': "F#6-Gb6", 'freq': 1479.98, 'required': False },
  { 'tone': 69, 'note': "F6", 'freq': 1396.91, 'required': False },
  { 'tone': 68, 'note': "E6", 'freq': 1318.51, 'required': False },
  { 'tone': 67, 'note': "D#6-Eb6", 'freq': 1244.51, 'required': False },
  { 'tone': 66, 'note': "D6", 'freq': 1174.66, 'required': False },
  { 'tone': 65, 'note': "C#6-Db6", 'freq': 1108.73, 'required': False },
  { 'tone': 64, 'note': "C6", 'freq': 1046.5, 'required': False },
  { 'tone': 63, 'note': "B5", 'freq': 987.767, 'required': True, 'lengths':['eighth'] },
  { 'tone': 62, 'note': "A#5-Bb5", 'freq': 932.328, 'required': False },
  { 'tone': 61, 'note': "A5", 'freq': 880.0, 'required': True, 'lengths':['eighth','quarterdotted'] },
  { 'tone': 60, 'note': "G#5-Ab5", 'freq': 830.609, 'required': False },
  { 'tone': 59, 'note': "G5", 'freq': 783.991, 'required': True, 'lengths':['eighth','quarter', 'quarterdotted', 'halfdotted'] },
  { 'tone': 58, 'note': "F#5-Gb5", 'freq': 739.989, 'required': True, 'lengths': ['eighth', 'halfdotted', 'halfdottedeighth'] },
  { 'tone': 57, 'note': "F5", 'freq': 698.456, 'required': True, 'lengths':['sixteenth', 'eighth', 'wholedotted'] },
  { 'tone': 56, 'note': "E5", 'freq': 659.255, 'required': True, 'lengths':['sixteenth', 'eighth', 'quarter', 'halfdotted', 'halfeighth'] },
  { 'tone': 55, 'note': "D#5-Eb5", 'freq': 622.254, 'required': False },
  { 'tone': 54, 'note': "D5", 'freq': 587.33, 'required': True, 'lengths':['sixteenth', 'eighth', 'quarter'] },
  { 'tone': 53, 'note': "C#5-Db5", 'freq': 554.365, 'required': False },
  { 'tone': 52, 'note': "C5", 'freq': 523.251, 'required': True, 'lengths':['sixteenth', 'quarter', 'halfdotted', 'whole', 'wholedotted', 'wholedouble'] },
  { 'tone': 51, 'note': "B4", 'freq': 493.883, 'required': True, 'lengths':['sixteenth', 'eighth', 'quarter', 'quarterdotted', 'whole'] },
  { 'tone': 50, 'note': "A#4-Bb4", 'freq': 466.164, 'required': True, 'lengths':['sixteenth','quarter'] },
  { 'tone': 49, 'note': "A4", 'freq': 440.0, 'required': True, 'lengths':['eighth', 'quarterdotted', 'whole'] },
  { 'tone': 48, 'note': "G#4-Ab4", 'freq': 415.305, 'required': False },
  { 'tone': 47, 'note': "G4", 'freq': 391.995, 'required': True, 'lengths':['sixteenth', 'eighth', 'eighthdotted', 'quarter', 'quarterdotted', 'halfdotted', 'whole'] },
  { 'tone': 46, 'note': "F#4-Gb4", 'freq': 369.994, 'required': True, 'lengths':['sixteenth', 'eighth', 'quarterdotted', 'halfdotted', 'whole'] },
  { 'tone': 45, 'note': "F4", 'freq': 349.228, 'required': True, 'lengths':['sixteenth', 'eighth', 'halfdotted', 'halfdottedsixteenth', 'wholequarter', 'wholedouble'] },
  { 'tone': 44, 'note': "E4", 'freq': 329.628, 'required': True, 'lengths':['sixteenth', 'eighth', 'eighthdotted', 'quarter', 'quarterdotted', 'halfdotted'] },
  { 'tone': 43, 'note': "D#4-Eb4", 'freq': 311.127, 'required': False },
  { 'tone': 42, 'note': "D4", 'freq': 293.665, 'required': False },
  { 'tone': 41, 'note': "C#4-Db4", 'freq': 277.183, 'required': False },
  { 'tone': 40, 'note': "C4", 'freq': 261.626, 'required': True, 'lengths':['eighth'] },
  { 'tone': 39, 'note': "B3", 'freq': 246.942, 'required': False },
  { 'tone': 38, 'note': "A#3-Bb3", 'freq': 233.082, 'required': False },
  { 'tone': 37, 'note': "A3", 'freq': 220.0, 'required': False },
  { 'tone': 36, 'note': "G#3-Ab3", 'freq': 207.652, 'required': False },
  { 'tone': 35, 'note': "G3", 'freq': 195.998, 'required': True, 'lengths':['eighthdotted'] },
  { 'tone': 34, 'note': "F#3-Gb3", 'freq': 184.997, 'required': False },
  { 'tone': 33, 'note': "F3", 'freq': 174.614, 'required': False }
]


bird = 'blue-jay'
filename = 'WAV-MP3/' + bird + '/' + bird + '_Trim_441-454.wav'
# owl files: horned-owl_Trim_242-253.wav, horned-owl_Trim-fadeoff_242-263.wav
# sparrow: fox-sparrow_Trim_1898-1913.wav, fox-sparrow_Trim-fadeoff_1898-1923.wav
# parrot: aust-king-parrot_Trim_158-165.wav, aust-king-parrot_Trim-fadeoff_510-527.wav
# jay: blue-jay_Trim_441-454.wav, blue-jay_Trim-fadeoff_166-194.wav
y, sr = librosa.load(filename)
S_full, phase = librosa.magphase(librosa.stft(y))
pitches, magnitudes = librosa.piptrack(S=librosa.amplitude_to_db(S_full), sr=sr)

# pitches, magnitudes, stft = librosa.ifptrack(y, sr)
#pitches = pitches[magnitudes > np.median(magnitudes)]

plt.figure(figsize=(12, 4))
librosa.display.specshow(librosa.amplitude_to_db(S_full, ref=np.max),
                         y_axis='log', x_axis='time', sr=sr)
plt.colorbar()
plt.tight_layout()
plt.show()


def generateLengths(notename, duration, notelength, y, sr):
    name = 'WAV-MP3/' + bird + '/' + bird + '_' + notename + '_' + l + '.wav'
    if (duration >= noteLengths[notelength]):
        trimmed = None
        if (notelength == 'sixteenth' or notelength == 'eighth'):
            playback = duration/noteLengths['quarter']
            quarterTemp = pyrb.time_stretch(y, sr, playback)
            if (notelength == 'sixteenth'):
                trimmed = quarterTemp[int(noteLengths['eighth']*1000):]
                trimmed = trimmed[-int(noteLengths[notelength]*1000):]
            else:
                trimmed = quarterTemp[-int(noteLengths[notelength]*1000):]
        else:
            trimmed = y[:int(noteLengths[notelength]*1000)]
        sf.write(name, trimmed, sr, subtype='PCM_24')
    else:
        playback = duration/noteLengths[notelength]
        timeNote = pyrb.time_stretch(y, sr, playback)
        sf.write(name, timeNote, sr, subtype='PCM_24')

print (pitches)
print('frames', len(pitches[0]))

# identify the note
avgPitches = []
maxMag = 0.0;
minMag = 100000.0;

# find min / max mag to scale the pitch
for t in range(len(magnitudes[0])):
    for k in range(len(magnitudes)):
        m = magnitudes[k][t]
        if (m > maxMag):
            maxMag = m
        if (m < minMag):
            minMag = m

print('min', minMag)
print('max', maxMag)

# deviation from 440hz
cFraction = librosa.pitch_tuning(pitches)
c = cFraction*1200
K = 3986.3

# read some stuff about tuning here: https://steelguitarforum.com/Forum11/HTML/009148.html
# c = K*(np.log10(hzAvg)-np.log10(440))
totalAvg = 10**(c/K + np.log10(440))

print('avg', totalAvg)


# THIS WASN"T REALLY WORKING
# for t in range(len(pitches[0])):
#     sum = 0
#     total = 0
#     for k in range(len(pitches)):
#         p = pitches[k][t]
#         m = magnitudes[k][t]
#         if (np.sum(pitches[k]) > 0):
#             sum = sum + p
#             total += 1
#
#     if (sum != 0 and total != 0):
#         avg = sum/total
#         avgPitches.append(avg)
#
# print(avgPitches)
# print('confirm len', len(avgPitches))
#
# totalAvg = np.sum(avgPitches) / len(pitches[0])
# print('avg', totalAvg)

fuzzyFreq = 5
identifiedPitch = None
for f in frequencies:
    if (totalAvg >= f['freq']-fuzzyFreq and totalAvg <= f['freq']+fuzzyFreq):
        identifiedPitch = f
        break
if (identifiedPitch == None):
    fuzzyFreq = 9  # jay = 9, parrotFade = 20
    for f in frequencies:
        if (totalAvg >= f['freq']-fuzzyFreq and totalAvg <= f['freq']+fuzzyFreq):
            identifiedPitch = f
            break

print('pitch', identifiedPitch)

# save it
sf.write('WAV-MP3/' + bird + '/' + bird + '_' + identifiedPitch['note'] + '.wav', y, sr, subtype='PCM_24')

dur = librosa.get_duration(y=y,sr=sr)
print('orig dur', dur)
# transform it
for f in frequencies:

    if (f['required'] and f['tone'] == identifiedPitch['tone']):
        print('----- FREQ: ', f['note'])
        for l in identifiedPitch['lengths']:
            generateLengths(f['note'], dur, l, y, sr)


    # TONE SHIFT IT
    if (f['required'] == True and f['tone'] != identifiedPitch['tone']):
        print('----- FREQ: ', f['note'])
        semitoneShift = f['tone'] - identifiedPitch['tone']
        shifted = pyrb.pitch_shift(y, sr, semitoneShift)

        for l in f['lengths']:
            generateLengths(f['note'], dur, l, shifted, sr)
