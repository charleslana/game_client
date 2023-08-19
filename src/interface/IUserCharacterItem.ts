import type IItem from '@/interface/IItem';

export default interface IUserCharacterItem {
  id: number;
  enhancement: number | null;
  durationTime: Date | null;
  equipped: number | null;
  createdAt: Date;
  item: IItem;
  price: number;
}
