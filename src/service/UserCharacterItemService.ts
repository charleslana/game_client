import api from '@/config/api';
import type IUserCharacterItem from '@/interface/IUserCharacterItem';

export default class UserCharacterItemService {
  private static baseUrl = '/user/character/item';

  static async getAll(): Promise<IUserCharacterItem[]> {
    const response = await api.get(`${this.baseUrl}`);
    return response.data as IUserCharacterItem[];
  }

  static async get(id: number): Promise<IUserCharacterItem> {
    const response = await api.get(`${this.baseUrl}/${id}`);
    return response.data as IUserCharacterItem;
  }
}
