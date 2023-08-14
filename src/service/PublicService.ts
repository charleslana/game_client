import api from '@/config/api';
import type ILogin from '@/interface/ILogin';
import type IRegister from '@/interface/IRegister';
import type IResponse from '@/interface/IResponse';
import type IToken from '@/interface/IToken';

export default class PublicService {
  private static baseUrl = '/public';

  static async register(register: IRegister): Promise<IResponse> {
    const response = await api.post(`${this.baseUrl}/user/register`, register);
    return response.data as IResponse;
  }

  static async login(login: ILogin): Promise<IToken> {
    const response = await api.post(`${this.baseUrl}/user/login`, login);
    return response.data as IToken;
  }
}
