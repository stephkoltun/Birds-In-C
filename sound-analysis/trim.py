# spectrogram FILTER AND MASK example
# but the resulting audio sounds liks shit
import numpy as np
import matplotlib.pyplot as plt
import librosa
import soundfile as sf
import scipy

import librosa.display


#filename = librosa.util.example_audio_file()
filename = "horned-owl.mp3"
print(filename)

# 2. Load the audio as a waveform `y`
y, sr = librosa.load(filename)

# And compute the spectrogram magnitude and phase
S_full, phase = librosa.magphase(librosa.stft(y))

# MIGHT WANT TO USE A DIFFERENT FILTER
# RECONSIDER THIS
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

print(len(pitches))
print(pitches)
print(magnitudes)

primaryPitches = []

for m in magnitudes[200]:
    print(m)

for t in range(len(pitches)):
    index = magnitudes[:,t].argmax() # compare all mags at time (t) to find which index has the max value
    print('index', index)
    print('mag', magnitudes[index,t])
    pitch = pitches[index, t] # get the specified f bin (index) at time (t)
    mag = magnitudes[index,t]
    primaryPitches.append([pitch,mag])

#print(primaryPitches)

# find where we have C notes
minC = 250
maxC = 265

cFrames = []
for p in range(len(primaryPitches)):
    if primaryPitches[p][0] >= minC and primaryPitches[p][0] <= maxC and primaryPitches[p][1] > 30:
        cFrames.append(p)

print(cFrames)


# how to slice a bit of audio
#idx = slice(*librosa.time_to_frames([30, 35], sr=sr))


###################
# Plot the spectrum
plt.figure(figsize=(12, 4))
librosa.display.specshow(librosa.amplitude_to_db(S_full, ref=np.max),
                         y_axis='log', x_axis='time', sr=sr)
plt.colorbar()
plt.tight_layout()
plt.show()
