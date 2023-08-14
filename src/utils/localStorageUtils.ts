import type ICharacter from '@/interface/ICharacter';
import type IUser from '@/interface/IUser';
import type IUserCharacter from '@/interface/IUserCharacter';

const loginKey = 'login';
const tokenKey = 'token';
const charactersKey = 'characters';
const userKey = 'user';
const userCharactersKey = 'userCharacters';

export function saveLogin(value: string): void {
  localStorage.setItem(loginKey, JSON.stringify(value));
}

export function getLogin(): string | null {
  const storedValue = localStorage.getItem(loginKey);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeLogin(): void {
  localStorage.removeItem(loginKey);
}

export function saveToken(token: string): void {
  localStorage.setItem(tokenKey, token);
}

export function getToken(): string | null {
  return localStorage.getItem(tokenKey);
}

export function removeToken(): void {
  localStorage.removeItem(tokenKey);
}

export function saveCharacters(characters: ICharacter[]): void {
  localStorage.setItem(charactersKey, JSON.stringify(characters));
}

export function getCharacters(): ICharacter[] | null {
  const storedValue = localStorage.getItem(charactersKey);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeCharacters(): void {
  localStorage.removeItem(charactersKey);
}

export function saveUserDetails(user: IUser): void {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function getUserDetails(): IUser | null {
  const storedValue = localStorage.getItem(userKey);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeUserDetails(): void {
  localStorage.removeItem(userKey);
}

export function saveUserCharacters(userCharacters: IUserCharacter[]): void {
  localStorage.setItem(userCharactersKey, JSON.stringify(userCharacters));
}

export function getUserCharacters(): IUserCharacter[] | null {
  const storedValue = localStorage.getItem(userCharactersKey);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeUserCharacters(): void {
  localStorage.removeItem(userCharactersKey);
}

export function removeAll() {
  removeToken();
  removeCharacters();
  removeUserDetails();
  removeUserCharacters();
}
