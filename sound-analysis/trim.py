# ARCHIVED. Initial attempt to find 'C' in a phrase

# spectrogram FILTER AND MASK example
# but the resulting audio sounds liks shit
import numpy as np
import matplotlib.pyplot as plt
import librosa
import soundfile as sf
import scipy
from pydub import AudioSegment

import librosa.display


#filename = librosa.util.example_audio_file()
filename = "fox-sparrow.mp3"
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

primaryPitches = []

for t in range(len(pitches)):
    index = magnitudes[:,t].argmax() # compare all mags at time (t) to find which index has the max value
    pitch = pitches[index, t] # get the specified f bin (index) at time (t)
    mag = magnitudes[index,t]
    primaryPitches.append([pitch,mag])


# find where we have C notes - ideal is 261.626
minC = 250
maxC = 270
minHighC = 515
maxHighC = 535

cFrames = []
for p in range(len(primaryPitches[0])):
    if (primaryPitches[p][0] >= minC and primaryPitches[p][0] <= maxC) or (primaryPitches[p][0] >= minHighC and primaryPitches[p][0] <= maxHighC) and primaryPitches[p][1] > 0:
        cFrames.append([p,primaryPitches[p][0]])

print(cFrames)

trims = []

for i in range(len(cFrames)):
    seg = cFrames[i]
    start = seg[0]
    end = None
    if (i < len(cFrames)-1):
        # find where it should end
        for n in range(len(cFrames)):
            if (n > i):
                nextSeg = cFrames[n]
                if (nextSeg[0]-seg[0] <= 10):
                    end = nextSeg[0]
                else:
                    break

    if end != None:
        trims.append([start,end])

print('--- trims')
print(trims)


# trim and save out the part of the file

# t1 = librosa.frames_to_time(261, sr=sr) * 1000 #Works in milliseconds
# t2 = librosa.frames_to_time(322, sr=sr) * 1000
# t1 = 4 * 1000 #Works in milliseconds
# t2 = 6 * 1000
# t1 = librosa.frames_to_time(trims[0][0], sr=sr) * 1000 #Works in milliseconds
# t2 = librosa.frames_to_time(trims[0][1], sr=sr) * 1000
# newAudio = AudioSegment.from_mp3(filename)
# newAudio = newAudio[t1:t2]
# newAudio.export('trim-'+filename, format="mp3")



###################
# Plot the spectrum
plt.figure(figsize=(12, 4))
librosa.display.specshow(librosa.amplitude_to_db(S_full, ref=np.max),
                         y_axis='log', x_axis='time', sr=sr)
plt.colorbar()
plt.tight_layout()
plt.show()
