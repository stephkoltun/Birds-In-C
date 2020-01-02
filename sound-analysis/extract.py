# spectrogram FILTER AND MASK example
# but the resulting audio sounds liks shit
import numpy as np
import matplotlib.pyplot as plt
import librosa
import soundfile as sf
import scipy
from pydub import AudioSegment

import librosa.display
import pyrubberband as pyrb


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

primaryPitches = []

for t in range(len(pitches[0])):
    index = magnitudes[:,t].argmax() # compare all mags at time (t) to find which index has the max value
    pitch = pitches[index, t] # get the specified f bin (index) at time (t)
    mag = magnitudes[index,t]
    primaryPitches.append([pitch,mag])


# find where we have loudest note
loudestFreq = [] # [ [fr,pitch,mag] ]
for p in range(len(primaryPitches)):
    if primaryPitches[p][1] > 64.5:
        loudestFreq.append([p,primaryPitches[p][0],primaryPitches[p][1]])

print('loudest')
print(loudestFreq)

# manually picked this out from the array
# should do a number of them and then pick based on the playback
t1 = librosa.frames_to_time(1139, sr=sr) * 1000 #Works in milliseconds
t2 = librosa.frames_to_time(1161, sr=sr) * 1000

# 179,201
# 1135, 1157

newAudio = AudioSegment.from_mp3(filename)
newAudio = newAudio[t1:t2]
newAudio.export('trim-owl_1139-1161.wav', format="wav")

print('dur', newAudio.duration_seconds)



###################
# Plot the spectrum
plt.figure(figsize=(12, 4))
librosa.display.specshow(librosa.amplitude_to_db(S_foreground, ref=np.max),
                         y_axis='log', x_axis='frames', sr=sr)
plt.colorbar()
plt.tight_layout()
plt.show()
