import type ICharacter from '@/interface/ICharacter';
import type IUser from '@/interface/IUser';
import type IUserCharacter from '@/interface/IUserCharacter';

const loginKey = 'login';
const tokenKey = 'token';
const charactersKey = 'characters';
const userKey = 'user';
const userCharactersKey = 'userCharacters';
const userCharacterKey = 'userCharacter';

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
  if (storedValue) {
    const userCharacters = JSON.parse(storedValue);
    userCharacters.sort((a: IUserCharacter, b: IUserCharacter) => b.id - a.id);
    return userCharacters;
  }
  return null;
}

export function removeUserCharacters(): void {
  localStorage.removeItem(userCharactersKey);
}

export function addUserCharacterToList(userCharacter: IUserCharacter): void {
  const userCharacters = getUserCharacters() || [];
  userCharacters.push(userCharacter);
  saveUserCharacters(userCharacters);
}

export function removeUserCharacterById(id: number): void {
  const userCharacters = getUserCharacters() || [];
  const updatedCharacters = userCharacters.filter((char) => char.id !== id);
  saveUserCharacters(updatedCharacters);
}

export function saveUserCharacter(user: IUserCharacter): void {
  localStorage.setItem(userCharacterKey, JSON.stringify(user));
}

export function getUserCharacter(): IUserCharacter | null {
  const storedValue = localStorage.getItem(userCharacterKey);
  return storedValue ? JSON.parse(storedValue) : null;
}

export function removeUserCharacter(): void {
  localStorage.removeItem(userCharacterKey);
}

export function removeAll() {
  removeToken();
  removeCharacters();
  removeUserDetails();
  removeUserCharacters();
  removeUserCharacter();
}
