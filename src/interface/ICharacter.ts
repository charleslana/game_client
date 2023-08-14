import type ClassEnum from '@/enum/ClassEnum';

export default interface ICharacter {
  id: number;
  name: string;
  description: string;
  class: ClassEnum;
}
