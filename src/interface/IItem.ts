import type ClassEnum from '@/enum/ClassEnum';
import type ItemConsumableTypeEnum from '@/enum/ItemConsumableTypeEnum';
import type ItemEquipmentTypeEnum from '@/enum/ItemEquipmentTypeEnum';
import type ItemTypeEnum from '@/enum/ItemTypeEnum';

export default interface IItem {
  id: number;
  name: string;
  description: string | null;
  strength: number | null;
  intelligence: number | null;
  dexterity: number | null;
  hp: number | null;
  mp: number | null;
  attack: number | null;
  magicAttack: number | null;
  attackRate: number | null;
  defense: number | null;
  magicDefense: number | null;
  class: ClassEnum | null;
  type: ItemTypeEnum | null;
  equipmentType: ItemEquipmentTypeEnum | null;
  consumableType: ItemConsumableTypeEnum | null;
  levelRequired: number | null;
  strengthRequired: number | null;
  intelligenceRequired: number | null;
  dexterityRequired: number | null;
  durationHour: number | null;
}
