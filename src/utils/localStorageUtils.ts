const loginKey = 'login';

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
