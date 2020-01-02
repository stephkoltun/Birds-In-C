import numpy as np
import soundfile as sf
import pyrubberband as pyrb
import librosa
import librosa.display
import matplotlib.pyplot as plt

from pydub import AudioSegment

y, srNew = sf.read('trim-owl.wav')
fToC = 7 # to a C
cToE = 4
fToE = 11
# pitch shift
cNote = pyrb.pitch_shift(y, srNew, fToC)
eNote = pyrb.pitch_shift(y, srNew, fToE)
print('-e note')
print(eNote)

sf.write('owl-C.wav',cNote, srNew, subtype='PCM_24')
sf.write('owl-E.wav',eNote, srNew, subtype='PCM_24')

#print('done writing')

# first phrase
# c-1/8 0:00.25
# e - 1/4 0:00.5
# c-1/8
# e - 1/4
# c-1/8
# e - 1/4






#sf.write('trimShiftStetch-owl.wav', final, srNew, subtype='PCM_24')




# cPlayback = noteLengths['eighth']/librosa.get_duration(y=cNote, sr=srNew)
# ePlayback = noteLengths['quarter']/librosa.get_duration(y=eNote, sr=srNew)
#
# shortC = pyrb.time_stretch(cNote, srNew, cPlayback)
# print('stretched c')
# print(shortC)
# sf.write('eighthC-owl.wav', shortC, srNew, subtype='PCM_24')
# longE = pyrb.time_stretch(eNote, srNew, ePlayback)
# print('stretched e')
# print(longE)
# sf.write('quarterE-owl.wav', longE, srNew, subtype='PCM_24')
