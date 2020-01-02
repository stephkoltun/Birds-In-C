# spectrogram FILTER AND MASK example
# but the resulting audio sounds liks shit
import numpy as np
import matplotlib.pyplot as plt
import librosa
import soundfile as sf
import scipy

import librosa.display


#filename = librosa.util.example_audio_file()
filename = "WAV-MP3/owl-phrase1.wav"
#filename = "trimShift-owl.wav"
print(filename)

# 2. Load the audio as a waveform `y`
y, sr = librosa.load(filename)

# And compute the spectrogram magnitude and phase
S_full, phase = librosa.magphase(librosa.stft(y))

# We'll compare frames using cosine similarity, and aggregate similar frames
# by taking their (per-frequency) median value.
#
# To avoid being biased by local continuity, we constrain similar frames to be
# separated by at least X seconds.
# make this a propotion of the overall duration? or keep the same for all phrases
separation = 1
agg = 'median'
aggregate = np.median #orig: np.median
#
# This suppresses sparse/non-repetetitive deviations from the average spectrum,
# and works well to discard vocal elements.
# origin: metric='cosine'
S_filter = librosa.decompose.nn_filter(S_full,
                                       aggregate=aggregate,
                                       width=int(librosa.time_to_frames(separation, sr=sr)))


S_filter = np.minimum(S_full, S_filter)

# We can also use a margin to reduce bleed between the vocals and instrumentation masks.
# Note: the margins need not be equal for foreground and background separation
margin_i, margin_v = 2, 12
power = 2

mask_i = librosa.util.softmask(S_filter,
                               margin_i * (S_full - S_filter),
                               power=power)

mask_v = librosa.util.softmask(S_full - S_filter,
                               margin_v * S_filter,
                               power=power)


S_foreground = mask_v * S_full
S_background = mask_i * S_full


#### WRITE FILES
print('firstlen', len(S_foreground))
print('secondlen', len(S_foreground[0]))

f = open("spectro.txt", "w")
f.write('[\n')
for arr in S_foreground:
    string = np.array2string(arr, separator=',', suppress_small=True,formatter={'float':'{: 0.9f}'.format}).replace('\n', '')
    f.write(string)
    f.write(',\n')
f.write(']')
f.close()
# file format:
# 2D array - outer array is frequency, inner is frame count
# for all files, the outer array will be 1025 long


pitches, magnitudes = librosa.piptrack(S=librosa.amplitude_to_db(S_foreground), sr=sr) # 2D array of [fBin,t]
f = open("pitches.txt", "w")
f.write('[\n')
for arr in pitches:
    string = np.array2string(arr, separator=',', suppress_small=True,formatter={'float':'{: 0.9f}'.format}).replace('\n', '')
    f.write(string)
    f.write(',\n')
f.write(']')
f.close()

f = open("magnitude.txt", "w")
f.write('[\n')
for arr in magnitudes:
    string = np.array2string(arr, separator=',', suppress_small=True,formatter={'float':'{: 0.9f}'.format}).replace('\n', '')
    f.write(string)
    f.write(',\n')
f.write(']')
f.close()


## CREATE VISUAL
plt.figure(figsize=(12, 8))
plt.subplot(3, 1, 1)
librosa.display.specshow(librosa.amplitude_to_db(S_full, ref=np.max),
                         y_axis='log', sr=sr)
plt.title('Full spectrum')
plt.colorbar()

plt.subplot(3, 1, 2)
librosa.display.specshow(librosa.amplitude_to_db(S_background, ref=np.max),
                         y_axis='log', sr=sr)
plt.title('Background')
plt.colorbar()
plt.subplot(3, 1, 3)
librosa.display.specshow(librosa.amplitude_to_db(S_foreground, ref=np.max),
                         y_axis='log', x_axis='frames', sr=sr)
plt.title('Fore_sep: '+ str(separation) + '_pow' + str(power) + '_marginI' + str(margin_i) + '_marginV' + str(margin_v))
plt.colorbar()
plt.tight_layout()
plt.savefig('PNG/owl-phrase1' + '_sep' + str(separation) + '_pow' + str(power) + '_marginI' + str(margin_i) + '_marginV' + str(margin_v) + '_agg-' + agg + '-noMetric.png')
plt.show()




###################
# Plot the spectrum
# plt.figure(figsize=(12, 4))
# librosa.display.specshow(librosa.amplitude_to_db(S_full, ref=np.max),
#                          y_axis='log', x_axis='time', sr=sr)
# plt.colorbar()
# plt.tight_layout()
# plt.show()
