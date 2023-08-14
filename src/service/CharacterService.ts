import api from '@/config/api';
import type ICharacter from '@/interface/ICharacter';

export default class CharacterService {
  private static baseUrl = '/character';

  static async getAll(): Promise<ICharacter[]> {
    const response = await api.get(`${this.baseUrl}`);
    return response.data as ICharacter[];
  }
}
