import api from '@/config/api';
import type IUserCharacter from '@/interface/IUserCharacter';

export default class UserCharacterService {
  private static baseUrl = '/user/character';

  static async getAll(): Promise<IUserCharacter[]> {
    const response = await api.get(`${this.baseUrl}`);
    return response.data as IUserCharacter[];
  }
}
