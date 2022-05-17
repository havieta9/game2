/**
* CurrentUserStore.tsx
* Copyright: Microsoft 2018
*
* Singleton store that maintains information about the currently-signed-in user.
*/

import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { User } from '../models/IdentityModels';

interface userMoralis{
    username:string;
    email:string;
    createdAt:string;
    sessionToken:string;
    emailVerified:boolean;
    updatedAt:string;
    avatar:string;
    objectId:string;
    ethAddress:string;
}

@AutoSubscribeStore
export class CurrentUserStore extends StoreBase {
    // TODO - properly initialize
    private _user: User = {
        id: '1',
        fullName: 'Adam Smith',
        email: 'adam.smith@sample.com',
    };

    private _userMoralis: userMoralis = {
        createdAt: '',
        updatedAt: '',
        emailVerified: false,
        sessionToken: '',
        email: '',
        username: '',
        objectId:'',
        avatar:'',
        ethAddress:''
    }
    setUser(username:string,email:string,createdAt:string,sessionToken:string,updatedAt:string,avatar:string,ethAddress:string) { 
       
        this._userMoralis = {
            createdAt,
            updatedAt,
            emailVerified: false,
            sessionToken,
            email,
            username,
            objectId:'',
            avatar ,
            ethAddress,
        };
        console.log(this._userMoralis)
        this.trigger();

    }
    @autoSubscribe
    getUser(): userMoralis {
        return this._userMoralis
    }
    private _cargando=false
    @autoSubscribe
    getCargando(): boolean {
        return this._cargando
    }
    
    setCargando(isMarket:boolean) { 
 
        this._cargando = isMarket
        this.trigger()
    }
    @autoSubscribe
    getFullName(): string {
        return this._user ? this._user.fullName : '';
    }
    
    private _isLogin: boolean = false
    @autoSubscribe
    getLogin(): boolean {
        return this._isLogin
    }
    setLogin(user: boolean) {
        this._isLogin = user
        this.trigger();

    }
}

export default new CurrentUserStore();
