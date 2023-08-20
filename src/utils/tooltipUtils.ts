import { getIndexForClass, getRemainingTime } from '@/utils/utils';
import { getUserCharacter } from '@/utils/localStorageUtils';
import type IUserCharacterItem from '@/interface/IUserCharacterItem';

export function generateTooltipItem(userCharacterItem: IUserCharacterItem): string {
  const characterSelected = getUserCharacter();
  if (characterSelected) {
    return `
    ${
      userCharacterItem.price
        ? `<div>Preço: <span class='text-cyan'>${userCharacterItem.price}</span> Alz</div>`
        : ''
    }
     <div class='text-info'>${userCharacterItem.item.name} ${
       userCharacterItem.enhancement ? `<span>+ ${userCharacterItem.enhancement}</span>` : ''
     }</div>
     ${userCharacterItem.item.description ? `<div>${userCharacterItem.item.description}</div>` : ''}
     ${
       userCharacterItem.item.levelRequired
         ? `<div class=${
             characterSelected.level < userCharacterItem.item.levelRequired ? 'text-danger' : ''
           }>Nível ${userCharacterItem.item.levelRequired} ou mais</div>`
         : ''
     }
     ${
       userCharacterItem.durationTime
         ? `<hr /><div class='text-start'>Duração ${getRemainingTime(
             new Date(userCharacterItem.durationTime.toString())
           )}</div><hr />`
         : `${
             userCharacterItem.item.equipmentType
               ? `<hr /><div class='text-start'>Permanente</div><hr />`
               : ''
           }`
     }
     ${
       userCharacterItem.item.strengthRequired &&
       userCharacterItem.item.intelligenceRequired &&
       userCharacterItem.item.dexterityRequired
         ? `<div class='text-start'>Requerimento ${
             userCharacterItem.item.class
               ? ` <div class=${
                   characterSelected.character.class != userCharacterItem.item.class
                     ? 'text-danger'
                     : ''
                 }>${getIndexForClass(userCharacterItem.item.class)}</div></div>`
               : ''
           }
        <div class='d-flex justify-content-between'>
         <div class='pe-2 ${
           characterSelected.strength < userCharacterItem.item.strengthRequired ? 'text-danger' : ''
         }'>FOR ${userCharacterItem.item.strengthRequired}</div>
         <div class='pe-2 ${
           characterSelected.intelligence < userCharacterItem.item.intelligenceRequired
             ? 'text-danger'
             : ''
         }'>INT ${userCharacterItem.item.intelligenceRequired}</div>
         <div class='pe-2 ${
           characterSelected.dexterity < userCharacterItem.item.dexterityRequired
             ? 'text-danger'
             : ''
         }'>DES ${userCharacterItem.item.dexterityRequired}</div>
        </div><hr />`
         : ''
     }
     ${
       userCharacterItem.item.attack
         ? `<div class='text-start'>Ataque +${userCharacterItem.item.attack}</div>`
         : ''
     }
     ${
       userCharacterItem.item.magicAttack
         ? `<div class='text-start'>Ataque mágico +${userCharacterItem.item.magicAttack}</div>`
         : ''
     }
     ${
       userCharacterItem.item.attackRate
         ? `<div class='text-start'>Taxa de ataque +${userCharacterItem.item.attackRate}</div>`
         : ''
     }
     ${
       userCharacterItem.item.defense
         ? `<div class='text-start'>Defesa +${userCharacterItem.item.defense}</div>`
         : ''
     }
    ${
      userCharacterItem.item.magicDefense
        ? `<div class='text-start'>Defesa mágica +${userCharacterItem.item.magicDefense}</div>`
        : ''
    }
    ${
      userCharacterItem.item.strength
        ? `<div class='text-start'>FOR +${userCharacterItem.item.strength}</div>`
        : ''
    }
    ${
      userCharacterItem.item.intelligence
        ? `<div class='text-start'>INT +${userCharacterItem.item.intelligence}</div>`
        : ''
    }
    ${
      userCharacterItem.item.dexterity
        ? `<div class='text-start'>DES +${userCharacterItem.item.dexterity}</div>`
        : ''
    }
     `;
  }
  return '';
}
