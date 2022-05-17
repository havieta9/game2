/**
* index.native.ts
* Copyright: Microsoft 2018
*
* Native implementation of "images" module.
*/

import { ImageSourceBase } from './Images';

// The React Native bundler handles resource paths at build time, so they need
// to be specified as full string literals (as opposed to being constructed
// programmatically in a helper method).

// We use accessors and "require" calls to defer loading of these images into
// memory until they are actually used. If we were to require them upfront,
// app launch times would increase substantially.
class ImageSource implements ImageSourceBase {
    get todoLogo() { return require('../../../images/todo-logo.png'); }
    get todoSmall() { return require('../../../images/todo-small.png'); }
    get logo() { return require('../../../images/logo.png'); }
    get logo2() { return require('../../../images/logo2.png'); }
    get metamask() { return require('../../../images/metamask.png'); }
    get moralis() { return require('../../../images/moralis.png'); }
    get background() { return require('../../../images/background.png'); }
    get box1() { return require('../../../images/box1.png'); }
    get box2() { return require('../../../images/box2.png'); }
    get box3() { return require('../../../images/box3.png'); } 
       get tokenomics() { return require('../../../images/tokenomics.png'); }
       get twitter() { return require('../../../images/twitter.png'); }
       get telegram() { return require('../../../images/telegram.png'); }
       get discord() { return require('../../../images/discord.png'); }

       get alone() { return require('../../../images/alone.jpg'); }
       get dm() { return require('../../../images/dm.png'); }
       get select() { return require('../../../images/select.png'); }
       get lot() { return require('../../../images/lot.jpg'); }
       get gamemode() { return require('../../../images/gamemode.jpg'); }
       get tank2() { return require('../../../images/tank2.jpg'); }
       get global() { return require('../../../images/global.jpg'); }
       get ctf() { return require('../../../images/ctf.png'); }
       get general() { return require('../../../images/general.png'); }
       get recruit() { return require('../../../images/recruit.png'); }
       get sergeant() { return require('../../../images/sergeant.png'); }

}
export default new ImageSource();
