# STEP THREE: Assemble individual notes into phrases based on In C notation
from pydub import AudioSegment
import soundfile as sf


phrases = [
    {
        'phrase': '01',
        'notes': ['C4_eighth','E4_quarter','C4_eighth','E4_quarter','C4_eighth','E4_quarter']
    },
    {
        'phrase': '02',
        'notes': ['C4_eighth','E4_eighth','F4_eighth','E4_quarter']
    },
    {
        'phrase': '03',
        'notes': ['rest_eighth','E4_eighth','F4_eighth', 'E4_eighth']
    },
    {
        'phrase': '06',
        'notes': ['C5_wholedouble']
    },
    {
        'phrase': '07',
        'notes': ['rest_quarter','rest_quarter','rest_quarter', 'rest_eighth','C4_eighth','C4_eighth','C4_eighth','rest_eighth','rest_quarter','rest_quarter','rest_quarter','rest_quarter']
    },
    {
        'phrase': '11',
        'notes': ['F4_sixteenth','G4_sixteenth','B4_sixteenth','G4_sixteenth','B4_sixteenth','G4_sixteenth']
    },
    {
        'phrase': '12',
        'notes': ['F4_eighth','G4_eighth','B4_whole','C5_quarter']
    },
    {
        'phrase': '13',
        'notes': ['B4_sixteenth','G4_eighthdotted', 'G4_sixteenth','F4_sixteenth','G4_eighth','rest_eighthdotted','G4_halfdotted'] # THIS ONE ISN'T RIGHT!!
    },
    {
        'phrase': '14',
        'notes': ['C5_whole','B4_whole','G4_halfdotted', 'G4_whole']
    },
    {
        'phrase': '22',
        'notes': ['E4_quarterdotted','E4_quarterdotted','E4_quarterdotted','E4_quarterdotted','E4_quarterdotted','F#4-Gb4_quarterdotted','G4_quarterdotted','A4_quarterdotted','B4_eighth']
    }
]

bird = 'blue-jay'

for phrase in phrases:
    phAudio = AudioSegment.empty()
    for note in phrase['notes']:

        filepath = 'WAV-MP3/' + bird + '/shifted_Notes/' + bird + '_' + note + '.wav'
        loadedNote = AudioSegment.from_wav(filepath)
        if ('rest' in note):
            loadedNote = loadedNote - 100
        phAudio = phAudio + loadedNote
    filename = 'WAV-MP3/' + bird + '/' + bird + '_Phrase' + phrase['phrase'] + '.wav'
    phAudio.export(filename, format="wav")


## INITIAL NOTES MADE FROM ORIGINAL FILE
# yC = AudioSegment.from_wav('owl-C.wav')
# yE = AudioSegment.from_wav('owl-E.wav')
#
# print('c length', yC.duration_seconds)
# print('e length', yE.duration_seconds)


##### COMPOSE INTO PHRASE

# no crossfade
# final = eighthC + quarterE + eighthC + quarterE + eighthC + quarterE
# final.export("owl-phrase1.wav", format="wav")
#
# with crossfade
# finalCross = eighthC.append(quarterE, crossfade=100).append(eighthC, crossfade=100).append(quarterE, crossfade=100).append(eighthC, crossfade=100).append(quarterE, crossfade=100)
# finalCross.export("owl-phrase1-cross300.wav", format="wav")
