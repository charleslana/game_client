import api from '@/config/api';
import type IAttribute from '@/interface/IAttribute';
import type IResponse from '@/interface/IResponse';
import type IUserCharacter from '@/interface/IUserCharacter';

export default class UserCharacterService {
  private static baseUrl = '/user/character';

  static async getAll(): Promise<IUserCharacter[]> {
    const response = await api.get(`${this.baseUrl}`);
    return response.data as IUserCharacter[];
  }

  static async create(characterId: number, name: string): Promise<IResponse> {
    const response = await api.post(`${this.baseUrl}/new/${characterId}`, {
      name: name
    });
    return response.data as IResponse;
  }

  static async getProfile(id: number): Promise<IUserCharacter> {
    const response = await api.get(`${this.baseUrl}/profile/${id}`);
    return response.data as IUserCharacter;
  }

  static async delete(characterId: number): Promise<IResponse> {
    const response = await api.delete(`${this.baseUrl}/${characterId}`);
    return response.data as IResponse;
  }

  static async select(id: number): Promise<void> {
    await api.get(`${this.baseUrl}/select/${id}`);
  }

  static async logout(): Promise<void> {
    await api.get(`${this.baseUrl}/logout`);
  }

  static async updateAttribute(attribute: IAttribute): Promise<IResponse> {
    const response = await api.patch(`${this.baseUrl}/attribute`, attribute);
    return response.data as IResponse;
  }
}
