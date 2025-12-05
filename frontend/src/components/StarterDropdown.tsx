"use client";

import { useState, useEffect, useRef } from "react";
import StarterMenuItem from "./StarterMenuItem";
import Image from "next/image";

type Theme = {
  primary: string;
  secondary: string;
  background: string;
};

type Pokemon = {
  name: string;
  sprite: string;
  theme: Theme;
};

const STARTERS: Pokemon[] = [
  {
    name: "Gastly",
    sprite: "https://img.pokemondb.net/sprites/black-white/normal/gastly.png",
    theme: { primary: "#6B7280", secondary: "#4B5563", background: "#1F2937" },
  },
  {
    name: "Charmander", 
    sprite: "https://img.pokemondb.net/sprites/black-white/normal/charmander.png",
    theme: { primary: "#F08030", secondary: "#FF6D3A", background: "#B8572E" },
  },
  {
    name: "Squirtle",
    sprite: "https://img.pokemondb.net/sprites/black-white/normal/squirtle.png", 
    theme: { primary: "#6890F0", secondary: "#4A7CE8", background: "#3B5BA5" },
  },
  {
    name: "Bulbasaur",
    sprite: "https://img.pokemondb.net/sprites/black-white/normal/bulbasaur.png",
    theme: { primary: "#78C850", secondary: "#5AA03A", background: "#4A7C23" },
  },
];

interface Props {
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
}

export default function StarterDropdown({ onThemeChange, currentTheme }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedStarter = STARTERS.find(s => s.theme.background === currentTheme.background)?.name;

  // Close on outside click or escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 400);
    setIsOpen(!isOpen);
  };

  const handleSelect = (pokemon: Pokemon) => {
    onThemeChange(pokemon.theme);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative z-50">
      {isOpen && (
        <div className="dropdown absolute top-full right-0 mt-3 w-16 bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-600/50 overflow-hidden">
          {STARTERS.map((pokemon, index) => (
            <StarterMenuItem
              key={pokemon.name}
              sprite={pokemon.sprite}
              name={pokemon.name}
              isSelected={selectedStarter === pokemon.name}
              onClick={() => handleSelect(pokemon)}
              index={index}
            />
          ))}
        </div>
      )}

      <button
        onClick={handleToggle}
        className="w-12 h-12 transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Choose starter Pokémon"
      >
        <div 
          className={`w-full h-full transition-all duration-300 ${isSpinning ? 'spinning' : ''}`}
          style={{
            transform: isSpinning ? 'rotate(360deg)' : 'rotate(0deg)',
            transition: isSpinning ? 'transform 0.4s linear' : 'none'
          }}
        >
          <Image
            src="/poke-ball.png"
            alt="Pokéball"
            width={64}
            height={64}
            className="w-full h-full object-contain hover:brightness-110"
          />
        </div>
      </button>

      <style jsx>{`
        .dropdown {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}