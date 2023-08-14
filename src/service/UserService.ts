import api from '@/config/api';
import type IUser from '@/interface/IUser';

export default class UserService {
  private static baseUrl = '/user';

  static async getDetails(): Promise<IUser> {
    const response = await api.get(`${this.baseUrl}/details`);
    return response.data as IUser;
  }
}
