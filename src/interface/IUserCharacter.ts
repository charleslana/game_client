import type ICharacter from '@/interface/ICharacter';

export default interface IUserCharacter {
  id: number;
  name: string;
  level: number;
  hp: number;
  mp: number;
  strength: number;
  intelligence: number;
  dexterity: number;
  point: number;
  spentPoint: number | null;
  alz: number;
  honor: number;
  nameColor: string | null;
  stamina: number;
  experience: number;
  nameTime: Date;
  vipTime: Date;
  createdAt: Date;
  character: ICharacter;
}
