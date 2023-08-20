import ClassEnum from '@/enum/ClassEnum';
import images from '@/data/imageData';
import router from '@/router';
import { getToken, getUserCharacter, removeAll } from '@/utils/localStorageUtils';
import { useStore as useLoadingStore } from '@/store/loadingStore';
import { useStore as useDialogStore } from '@/store/dialogStore';
import type { AxiosError } from 'axios';

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
      return images.characterGladiator;
    case 8:
      return images.characterForceGunner;
    case 9:
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
      return images.gladiatorClass;
    case 8:
      return images.forceGunnerClass;
    case 9:
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
      return images.characterGladiatorPortrait;
    case 8:
      return images.characterForceGunnerPortrait;
    case 9:
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
      return 'Gladiador';
    case 8:
      return 'Atirador Arcano';
    case 9:
      return 'Mago Negro';
    default:
      return 'Guerreiro';
  }
}

export function getIndexForClass(classValue: ClassEnum) {
  const classKeys = Object.keys(ClassEnum) as Array<keyof typeof ClassEnum>;
  const index = classKeys.findIndex((key) => ClassEnum[key] === classValue) + 1;
  return getCharacterName(index !== 0 ? index : 0);
}

export const formatNumber = (number: number): string => {
  number = +number;
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

export function checkSession(): void {
  if (!getUserCharacter()) {
    router.push({ name: 'select-character' });
  }
}

export function showError(err: unknown) {
  const error = err as AxiosError<Error>;
  if (error.response && error.response.data.message) {
    const loadingStore = useLoadingStore();
    const dialogStore = useDialogStore();
    dialogStore.show(error.response.data.message);
    loadingStore.hideLoading();
  }
}

export const getRemainingTime = (targetDate: Date): string => {
  const currentDate = new Date();
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  if (timeDifference > 86400000) {
    const daysRemaining = Math.floor(timeDifference / 86400000);
    return `${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'} restante${
      daysRemaining === 1 ? '' : 's'
    }`;
  }
  if (timeDifference > 3600000) {
    const hoursRemaining = Math.floor(timeDifference / 3600000);
    return `${hoursRemaining} ${hoursRemaining === 1 ? 'hora' : 'horas'} restante${
      hoursRemaining === 1 ? '' : 's'
    }`;
  }
  const minutesRemaining = Math.floor(timeDifference / 60000);
  return `${minutesRemaining} ${minutesRemaining === 1 ? 'minuto' : 'minutos'} restante${
    minutesRemaining === 1 ? '' : 's'
  }`;
};
