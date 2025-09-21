import sounddevice as sd
import numpy as np
import whisper

# Load Whisper model
model = whisper.load_model("base")  # small/medium/base/large

# Recording settings
duration = 10  # seconds
fs = 16000  # Whisper prefers 16kHz

print("Speak now...")
audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='float32')
sd.wait()
print("Recording done, transcribing...")

# Flatten to 1D array
audio = audio.flatten()

# Transcribe using Whisper
result = model.transcribe(audio, fp16=False)  # fp16=False for CPU
print("Text:", result["text"])
