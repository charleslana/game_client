import images from '@/data/imageData';
import router from '@/router';

export function logout() {
  router.push({ name: 'login-register' });
}

export function getCharacterImage(characterId: number) {
  switch (characterId) {
    case 1:
      return images.characterWarrior;
    case 2:
      return images.characterBlader;
    default:
      return images.characterWarrior;
  }
}

export function getCharacterClassIcon(characterId: number) {
  switch (characterId) {
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
      return images.characterWarrior;
  }
}

export function getCharacterPortrait(characterId: number) {
  switch (characterId) {
    case 1:
      return images.characterWarriorPortrait;
    case 2:
      return images.characterBladerPortrait;
    default:
      return images.characterWarriorPortrait;
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
