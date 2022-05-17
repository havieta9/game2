/*
* TopBarComposite.tsx
* Copyright: Microsoft 2018
*
* Horizontal bar that appears on the top of every view within the app
* when it's using composite layout (as opposed to stack-based layout).
*/

import ImageSource from 'modules/images';
import * as RX from 'reactxp';
import { ComponentBase } from 'resub';

import HoverButton from '../controls/HoverButton';
import NavContextStore from '../stores/NavContextStore';
import { Colors, Fonts, FontSizes } from '../app/Styles';

const _styles = {
    background: RX.Styles.createViewStyle({
        alignSelf: 'stretch',
        height: 80,
        backgroundColor: 'black',
        borderBottomWidth: 1,
        borderColor: Colors.gray66,
        flexDirection: 'row',
        paddingHorizontal: 16,
    }),
    logoContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    barControlsContainer: RX.Styles.createViewStyle({
        flex: 1,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 80,
        width: 200,
    }),
    logoText: RX.Styles.createTextStyle({
        font: Fonts.displaySemibold,
        fontSize: FontSizes.size20,
        marginHorizontal: 4,
        color: Colors.logoColor,
    }),
    linkText: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        fontSize: FontSizes.menuItem,
        marginHorizontal: 8,
        color: Colors.white,
    }),
    linkTextHover: RX.Styles.createTextStyle({
        color: Colors.white,
    }),
    backButtonContainer: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignItems: 'center',
    }),
    backText: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size16,
        color: Colors.white,
    }),

    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size16,
        color: 'white',
    }),

    label2: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size12,
        color: 'white',
    })

}

export interface TopBarCompositeProps extends RX.CommonProps {
    showBackButton: boolean;
    onBack?: () => void;
}

const Moralis = require('moralis');
const serverUrl = "https://soli2aousjbm.usemoralis.com:2053/server";
const appId = "EYoSle1CvNFbGig2fgrKzv5zsCcjjn2PYn8W2uWO";
Moralis.start({ serverUrl, appId });

interface userMoralis {
    username: string;
    email: string;
    createdAt: string;
    sessionToken: string;
    emailVerified: boolean;
    updatedAt: string;
    avatar: string;
    objectId: string;
    ethAddress: string;
}

import * as UI from '@sproutch/ui';
import AccountMenuButton2 from './AccountMenuButton2';
import CurrentUserStore from '../stores/CurrentUserStore';
import TodosStore from '../stores/TodosStore';

interface TopBarCompositeState {
    isLogin: boolean;
    user: userMoralis;
    isCargando: boolean;
}
export default class TopBarComposite extends ComponentBase<TopBarCompositeProps, TopBarCompositeState> {


    protected _buildState(props: TopBarCompositeProps, initState: boolean): Partial<TopBarCompositeState> | undefined {
        const partialState: Partial<TopBarCompositeState> = {

            isCargando: CurrentUserStore.getCargando(),
            isLogin: CurrentUserStore.getLogin(),
            user: CurrentUserStore.getUser(),
        };
        return partialState;
    }


    render(): JSX.Element | null {
        let leftContents: JSX.Element | undefined;

        if (this.props.showBackButton) {
            leftContents = (
                <HoverButton onPress={this._onPressBack} onRenderChild={this._renderBackButton} />
            );
        } else {
            leftContents = (
                <RX.Button onPress={this._onPressLogo}>
                    <RX.View style={_styles.logoContainer}>
                        <RX.Image source={ImageSource.logo} style={_styles.logoImage} />

                    </RX.View>
                </RX.Button>
            );
        }
        return (
            <RX.View style={_styles.background}>
                {leftContents}
                <RX.View style={_styles.barControlsContainer}>

                    <UI.Button onPress={() => NavContextStore.navigateToTodoList(undefined, false, false, true)} style={{ root: [{ alignSelf: 'flex-start', marginLeft: 15, height: 35 }], content: [{ width: 130, borderColor: 'black', borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label2 }
                    } elevation={4} variant={"outlined"} label="TOKENOMICS" />


                    <UI.Button onPress={() => NavContextStore.navigateToTodoList(undefined, false, false, false, true)} style={{ root: [{ alignSelf: 'flex-start', marginLeft: 15, height: 35 }], content: [{ width: 130, borderColor: 'black', borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label2 }
                    } elevation={4} variant={"outlined"} label="ROAD MAP" />


                    <UI.Button onPress={() => RX.Linking.openUrl('https://whitepaper.cryptowartanks.com/')} style={{ root: [{ alignSelf: 'flex-start', marginLeft: 15, height: 35 }], content: [{ width: 130, borderColor: 'black', borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label2 }
                    } elevation={4} variant={"outlined"} label="WHITEPAPER" />


                    {this.state.isLogin ?
                        <AccountMenuButton2 onLogOut={this.onLogOut} username={this.state.user.ethAddress} avatar={this.state.user.avatar === '' ? '' : this.state.user.avatar} onPress={() => null} />
                        : this.state.isCargando ? <RX.View style={{ width: 250, justifyContent: 'center', alignItems: 'center', marginLeft: 100, marginRight: 50 }}> <UI.Spinner color='white' size='medium' /></RX.View> :
                            <UI.Button onPress={this._onPressTodo} iconSlot={iconStyle => (
                                <RX.Image source={ImageSource.metamask} style={{ marginTop: 0, alignSelf: 'center', marginRight: 3, width: 20, height: 20 }} />
                            )} style={{ root: [{ marginRight: 50, marginLeft: 100 }], content: [{ borderWidth: 0, borderColor: 'yellow', width: 250, height: 50, marginBottom: 5, borderRadius: 11, backgroundColor: 'green' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="METAMASK" />
                    }
                </RX.View>
            </RX.View>
        );
    }
    private async onLogOut() {

        CurrentUserStore.setLogin(false)
        CurrentUserStore.setUser('', '', '', '', '', '', '')


        CurrentUserStore.setCargando(false)
        NavContextStore.navigateToTodoList(undefined, false, true)
        await Moralis.User.logOut();
    }

    _onPressTodo = async (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation()
        CurrentUserStore.setCargando(true)

        await Moralis.enableWeb3()

        try {

            await Moralis.switchNetwork('0x4');

            await Moralis.authenticate().then(async (user: any) => {
                let username = user.get('username')
                let createdAt = user.get('createdAt')
                let sessionToken = user.get('sessionToken')
                let updatedAt = user.get('updatedAt')
                let address = user.get('ethAddress')


                let avatar = user.get('avatar')

                const items = await Moralis.Cloud.run('getAllItemsByUser', { ownerAddress: address });
                await TodosStore.setTodos(items)

                if (avatar === undefined) {


                    CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                    CurrentUserStore.setLogin(true)

                } else {

                    CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                    CurrentUserStore.setLogin(true)
                }

                CurrentUserStore.setCargando(false)
            })
            return
        } catch {


            CurrentUserStore.setCargando(false)
        }

    };
    private _onPressBack = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        if (this.props.onBack) {
            this.props.onBack();
        }
    };

    private _renderBackButton = (isHovering: boolean) => (
        <RX.View style={_styles.backButtonContainer}>
            <RX.Text style={[_styles.backText, isHovering ? _styles.linkTextHover : undefined]}>
                {'Back'}
            </RX.Text>
        </RX.View>
    );

    private _onPressLogo = (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation();

        NavContextStore.navigateToTodoList('', false);
    };

}
