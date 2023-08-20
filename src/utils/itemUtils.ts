import images from '@/data/imageData';

export function getItemImage(itemId: number) {
  switch (+itemId) {
    case 1:
      return images.item1;
    case 2:
      return images.item2;
    case 3:
      return images.item3;
    case 4:
      return images.item3;
    default:
      return images.item1;
  }
}
