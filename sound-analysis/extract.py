# STEP ONE: Extract small clip of audio from bird song
# Looks for high sound level and extended duration of that magnitude
# Doesn't look for pitch variability in that period, but could in the future

import numpy as np
import matplotlib.pyplot as plt
import librosa
import soundfile as sf
import scipy
from pydub import AudioSegment

import librosa.display


#filename = librosa.util.example_audio_file()
bird = 'aust-king-parrot'
filename = "WAV-MP3/" + bird + ".mp3"
soundMin = {
    'horned-owl': 64.5,
    'fox-sparrow': 56.5,
    'blue-jay': 42,
    'aust-king-parrot': 36
}
durMin = {
    'horned-owl': 10,
    'fox-sparrow': 10,
    'blue-jay': 10,
    'aust-king-parrot': 5
}
print(filename)

# 2. Load the audio as a waveform `y`
y, sr = librosa.load(filename)

# And compute the spectrogram magnitude and phase
S_full, phase = librosa.magphase(librosa.stft(y))

# MIGHT WANT TO USE A DIFFERENT FILTER
S_filter = librosa.decompose.nn_filter(S_full,
                                       aggregate=np.median,
                                       metric='cosine',
                                       width=int(librosa.time_to_frames(2, sr=sr)))
S_filter = np.minimum(S_full, S_filter)
margin_i, margin_v = 2, 10
power = 2

mask_v = librosa.util.softmask(S_full - S_filter,
                               margin_v * S_filter,
                               power=power)
S_foreground = mask_v * S_full


pitches, magnitudes = librosa.piptrack(S=librosa.amplitude_to_db(S_foreground), sr=sr) # 2D array of [fBin,t]

primaryPitches = []

for t in range(len(pitches[0])):
    index = magnitudes[:,t].argmax() # compare all mags at time (t) to find which index has the max value
    pitch = pitches[index, t] # get the specified f bin (index) at time (t)
    mag = magnitudes[index,t]
    primaryPitches.append([pitch,mag])


# find where we have loudest note
loudestFreq = [] # [ [fr,pitch,mag] ]
for p in range(len(primaryPitches)):
    if primaryPitches[p][1] > soundMin[bird]:
        loudestFreq.append([p,primaryPitches[p][0],primaryPitches[p][1]])

print('loudest')
print(loudestFreq)

timingPairs = [] # [0] = frameStart, [1] = frameEnd, [2] = freqs, [3] = magnitudes
timeFuzz = 20;
freqFuzz = 10;
for freq in loudestFreq:
    # [0] = frame
    # [1] = freq
    # [2] = magnitude
    frame = freq[0]
    thisFreq = freq[1]
    thisMag = freq[2]

    appended = False;
    for i in range(len(timingPairs)):
        time = timingPairs[i]
        if (frame <= time[1]+timeFuzz and frame > time[1]):
            timingPairs[i][1] = frame
            timingPairs[i][2].append(thisFreq)
            timingPairs[i][3].append(thisMag)
            appended = True
            break
    if (appended == False):
        timingPairs.append([frame, frame, [thisFreq], [thisMag]])

offset = 5;
longEnoughSeg = []
for timing in timingPairs:
    dur = timing[1] - timing[0]
    if (dur >= durMin[bird]):
        # Extract a clip that includes sound on either side
        t1 = librosa.frames_to_time(timing[0], sr=sr) * 1000 #Works in milliseconds
        t2 = librosa.frames_to_time(timing[1]+offset*2, sr=sr) * 1000
        newAudio = AudioSegment.from_mp3(filename)
        newAudio = newAudio[t1:t2]
        newAudio.export('WAV-MP3/' + bird + '_Trim-fadeoff_'+ str(timing[0]) + '-' + str(timing[1]+offset*2) + '.wav', format="wav")

        # Extract just the clip
        t1 = librosa.frames_to_time(timing[0], sr=sr) * 1000 #Works in milliseconds
        t2 = librosa.frames_to_time(timing[1], sr=sr) * 1000
        newAudio = AudioSegment.from_mp3(filename)
        newAudio = newAudio[t1:t2]
        newAudio.export('WAV-MP3/' + bird + '_Trim_'+ str(timing[0]) + '-' + str(timing[1]) + '.wav', format="wav")


        longEnoughSeg.append(timing)


print('time seg')
print(longEnoughSeg)



#
# ###################
# # Plot the spectrum
# plt.figure(figsize=(12, 4))
# librosa.display.specshow(librosa.amplitude_to_db(S_foreground, ref=np.max),
#                          y_axis='log', x_axis='frames', sr=sr)
# plt.colorbar()
# plt.tight_layout()
# plt.show()
