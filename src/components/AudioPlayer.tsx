import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Disc3 } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onTogglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [useSynth, setUseSynth] = useState(false);

  // Royalty-free acoustic wedding track stream
  const AUDIO_SRC = 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=wedding-love-18342.mp3';

  // Fallback Web Audio API synthesizer in case external CDN is blocked
  const playGentleMelodyNote = (frequency: number, duration = 1.2) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser or network blocks audio stream, fallback to gentle Web Audio synthesizer
          setUseSynth(true);
        });
      }
    } else {
      audio.pause();
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (useSynth && isPlaying) {
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63]; // C, E, G, C5, A, G, E
      let noteIdx = 0;
      synthIntervalRef.current = window.setInterval(() => {
        playGentleMelodyNote(notes[noteIdx % notes.length], 1.6);
        noteIdx++;
      }, 1400);

      return () => {
        if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      };
    }
  }, [useSynth, isPlaying]);

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onError={() => setUseSynth(true)}
      />

      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
          className={`relative p-3.5 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center border ${
            isPlaying
              ? 'bg-[#3F4E3E]/90 text-[#F4EFE6] border-[#C8A97E] ring-4 ring-[#C8A97E]/25 hover:bg-[#344033]'
              : 'bg-white/90 text-[#555] border-stone-300 hover:bg-white'
          }`}
        >
          <Disc3
            className={`w-6 h-6 text-[#C8A97E] ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : 'opacity-60'
            }`}
          />

          <span className="sr-only">
            {isPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}
          </span>

          {/* Sound wave equalizer indicator */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A97E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C8A97E]"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};
