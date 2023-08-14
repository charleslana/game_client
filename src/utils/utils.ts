import images from '@/data/imageData';
import router from '@/router';
import { getToken, removeAll } from './localStorageUtils';

export function logout() {
  removeAll();
  router.push({ name: 'login-register' });
}

export function getCharacterImage(characterId: number) {
  switch (+characterId) {
    case 1:
      return images.characterWarrior;
    case 2:
      return images.characterBlader;
    case 3:
      return images.characterWizard;
    case 4:
      return images.characterForceArcher;
    case 5:
      return images.characterForceShielder;
    case 6:
      return images.characterForceBlader;
    case 7:
      return images.characterForceGunner;
    case 8:
      return images.characterDarkMage;
    default:
      return images.characterWarrior;
  }
}

export function getCharacterClassIcon(characterId: number) {
  switch (+characterId) {
    case 1:
      return images.warriorClass;
    case 2:
      return images.bladerClass;
    case 3:
      return images.wizardClass;
    case 4:
      return images.forceArcherClass;
    case 5:
      return images.forceShielderClass;
    case 6:
      return images.forceBladerClass;
    case 7:
      return images.forceGunnerClass;
    case 8:
      return images.darkMageClass;
    default:
      return images.warriorClass;
  }
}

export function getCharacterPortrait(characterId: number) {
  switch (+characterId) {
    case 1:
      return images.characterWarriorPortrait;
    case 2:
      return images.characterBladerPortrait;
    case 3:
      return images.characterWizardPortrait;
    case 4:
      return images.characterForceArcherPortrait;
    case 5:
      return images.characterForceShielderPortrait;
    case 6:
      return images.characterForceBladerPortrait;
    case 7:
      return images.characterForceGunnerPortrait;
    case 8:
      return images.characterDarkMagePortrait;
    default:
      return images.characterWarriorPortrait;
  }
}

export function getCharacterName(characterId: number) {
  switch (+characterId) {
    case 1:
      return 'Guerreiro';
    case 2:
      return 'Duelista';
    case 3:
      return 'Maga';
    case 4:
      return 'Arqueira Arcana';
    case 5:
      return 'Guardiã Arcana';
    case 6:
      return 'Espadachim Arcano';
    case 7:
      return 'Atirador Arcano';
    case 8:
      return 'Mago Negro';
    default:
      return 'Guerreiro';
  }
}

export const formatNumber = (number: number): string => {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export function formatCompactNumber(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(number);
}

export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const formattedDate: string = new Date(date).toLocaleString('pt-BR', options);
  return formattedDate.replace(',', ' às');
}

export function checkLogged(): void {
  if (!getToken()) {
    router.push({ name: 'login-register' });
  }
}
