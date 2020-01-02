from pydub import AudioSegment
import soundfile as sf
import pyrubberband as pyrb


## INITIAL NOTES MADE FROM ORIGINAL FILE
yC = AudioSegment.from_wav('owl-C.wav')
yE = AudioSegment.from_wav('owl-E.wav')

print('c length', yC.duration_seconds)
print('e length', yE.duration_seconds)


## MAKE DIFFERENT LENGTHS
noteLengths = {
    'eighth': 0.25,
    'quarter': 0.52,
    'half': 1,
    'dottedhalf': 1.5,
    'whole': 2,
}


eighthC = None
quarterE = None


if (yC.duration_seconds > noteLengths['eighth']):
    eighthC = yC[:noteLengths['eighth']*1000]
else:
    print('c not long')


if (yE.duration_seconds > noteLengths['quarter']):
    quarterE = yE[:noteLengths['quarter']*1000]
else:
    print('e not long')
    print('initial dur', yE.duration_seconds)
    print('stretching E')
    playback = (yE.duration_seconds/noteLengths['quarter'])
    print('playback', playback)
    tempY, tempSr = sf.read('owl-E.wav')
    longE = pyrb.time_stretch(tempY, tempSr, playback)
    sf.write('owl-E-long.wav', longE, tempSr, subtype='PCM_24')
    print('new dur', sf.info('owl-E-long.wav').duration)



##### COMPOSE INTO PHRASE

# no crossfade
# final = eighthC + quarterE + eighthC + quarterE + eighthC + quarterE
# final.export("owl-phrase1.wav", format="wav")
#
# # no crossfade
# finalCross = eighthC.append(quarterE, crossfade=100).append(eighthC, crossfade=100).append(quarterE, crossfade=100).append(eighthC, crossfade=100).append(quarterE, crossfade=100)
# finalCross.export("owl-phrase1-cross300.wav", format="wav")
