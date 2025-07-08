export interface IHero {
  id: string;
  name: string;
  history: string;
  category: string;
  gender: string;
  image: string;
  isRetired: boolean;
  powers: boolean[];
  stats: Stats;
}

export interface Stats {
  strength: number;
  intelligence: number;
  speed: number;
  durability: number;
  energyProjection: number;
  combatSkill: number;
}
