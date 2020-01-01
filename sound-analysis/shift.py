import numpy as np
import soundfile as sf
import pyrubberband as pyrb


yNew, srNew = sf.read('trim-owl.wav')
semitoneAdjust=7
# pitch shift
pitch_shift = pyrb.pitch_shift(yNew, srNew, semitoneAdjust)
sf.write('trimShift-owl.wav', pitch_shift, srNew, subtype='PCM_24')
