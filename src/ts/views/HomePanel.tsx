/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import { Colors, Fonts, FontSizes, Styles } from '../app/Styles';
interface CreateTodoPanelProps extends RX.CommonProps {
}

interface CreateTodoPanelState {
    todoText: string;
    isCargando: boolean;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
    }),
    text1: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        color: 'white',
    }),
    text4: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        color: 'white',
        textAlign: 'center'
    }),
    text2: RX.Styles.createTextStyle({
        font: Fonts.displayRegular,
        color: 'white',
        textAlign: 'center'
    }),
    text3: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        color: 'white',
        fontSize: FontSizes.size32,
        textAlign: 'center'
    }),
    text5: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        color: 'white',
        fontSize: FontSizes.size14,
        textAlign: 'center'
    }),
    label: RX.Styles.createTextStyle({
        font: Fonts.displayBold,
        fontSize: FontSizes.size20,
        color: 'black',
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        color: Colors.black,
        backgroundColor: 'transparent',
    }),
    editTodoItem: RX.Styles.createTextInputStyle({
        margin: 8,
        height: 32,
        paddingHorizontal: 4,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
    logoContainer: RX.Styles.createViewStyle({
        alignItems: 'center',
        justifyContent: 'flex-start'
    }),
    logoImage: RX.Styles.createImageStyle({
        height: 100,
        width: 300,
    }),
    logoImage2: RX.Styles.createImageStyle({
        height: 100,
        width: 100,
    }),
    logoImage3: RX.Styles.createImageStyle({
        height: 70,
        width: 70,
    }),
};

const Moralis = require('moralis');
const serverUrl = "https://soli2aousjbm.usemoralis.com:2053/server";
const appId = "EYoSle1CvNFbGig2fgrKzv5zsCcjjn2PYn8W2uWO";

Moralis.start({ serverUrl, appId });
import * as UI from '@sproutch/ui';
import ImageSource from 'modules/images';
import CurrentUserStore from '../stores/CurrentUserStore';
import TodosStore from '../stores/TodosStore';
import NavContextStore from '../stores/NavContextStore';
import CreateTodoPanel from './CreateTodoPanel';
export default class HomePanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {


    protected _buildState(props: CreateTodoPanelProps, initState: boolean): Partial<CreateTodoPanelState> {
        const partialState: Partial<CreateTodoPanelState> = {

            isCargando: CurrentUserStore.getCargando(),
        };
        return partialState;
    }


    _onPressTodo = async (e: RX.Types.SyntheticEvent) => {
        e.stopPropagation()
        this.isCargando = true
        CurrentUserStore.setCargando(true)

        await Moralis.enableWeb3()
        let user = await Moralis.User.current()
        if (!user) {

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
                    console.log('entro', JSON.stringify(items))
                    await TodosStore.setTodos(items)

                    if (avatar === undefined) {


                        CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, '', address)
                        CurrentUserStore.setLogin(true)

                    } else {

                        CurrentUserStore.setUser(username, '', createdAt, sessionToken, updatedAt, avatar, address)
                        CurrentUserStore.setLogin(true)
                    }

                    this.isCargando = false
                    CurrentUserStore.setCargando(false)
                    return
                })
                return
            } catch {

                CurrentUserStore.setLogin(false)
                this.isCargando = false
                CurrentUserStore.setCargando(false)
                return
            }

        }
        CurrentUserStore.setCargando(false)
        this.isCargando = false
        CurrentUserStore.setLogin(true)
        return
    };
    isCargando = false
    render() {
        return (
            <RX.ScrollView style={[_styles.container, Styles.statusBarTopMargin, {}]}>

                <RX.Image resizeMethod={'resize'} resizeMode={'cover'} style={{ flex: 1, height: 700, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.background} >
                    <RX.View style={{ flex: 20, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} />
                    <RX.View style={{ flex: 40, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} />
                    <RX.View style={{ flex: 20, alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        {this.isCargando ? <RX.View style={{ width: 250, justifyContent: 'center', alignItems: 'center', }}> <UI.Spinner color='white' size='medium' /></RX.View> :
                            <UI.Button onPress={() => NavContextStore.navigateToTodoList(undefined, true)} style={{ root: [{ marginTop: 25, height: 80, width: 400, }], content: [{ borderColor: 'green', backgroundColor: 'yellow', borderWidth: 3, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="PRE SALE NOW!" />}
                        <RX.View style={{ width: 50 }} />
                        {false ? <RX.View style={{ width: 250, justifyContent: 'center', alignItems: 'center', }}> <UI.Spinner color='white' size='medium' /></RX.View> :
                            <UI.Button onPress={this._onPressTodo} style={{ root: [{ marginTop: 25, height: 80, width: 400, }], content: [{ borderColor: 'green', backgroundColor: 'yellow', borderWidth: 3, borderRadius: 11, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }], label: _styles.label }
                            } elevation={4} variant={"outlined"} label="DOWNLOAD BETA" />}
                    </RX.View >
                </RX.Image>
                <RX.View style={{ backgroundColor: '#918A89', flex: 1, height: 100, alignSelf: 'stretch' }}>
                </RX.View >
                <RX.View style={{ backgroundColor: 'black', flex: 1, height: 420, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center' }}>
                    <RX.View style={_styles.logoContainer}>
                        <RX.Image source={ImageSource.logo2} style={_styles.logoImage} />

                        <RX.Text style={[_styles.text1, { marginBottom: 20, }]}>
                            {'THE WAR IS COMMING..!'}
                        </RX.Text>

                    </RX.View>
                    <RX.Text style={[_styles.text2, { width: 500, alignSelf: 'center' }]}>
                        {'We are a video game Play-To-Earn based on NFTs Blockchain technology on the BSC network. Play with your tank on an all-against-all map or capture the flag before the opposing team. Show off your skills killing enemies and earn CWT in every game you play.'}
                    </RX.Text>

                </RX.View >
                <RX.View style={{ justifyContent: 'center', paddingBottom: 30, alignItems: 'center', alignSelf: 'stretch', backgroundColor: 'black' }}>

                    <RX.Text style={[_styles.text4, { width: 500, alignSelf: 'center' }]}>
                        {'Our Official Social Platforms:'}
                    </RX.Text>
                    <RX.View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 150, alignSelf: 'stretch', backgroundColor: 'black' }}>
                        <RX.Image source={ImageSource.discord} style={_styles.logoImage2} />
                        <RX.View style={{ width: 50 }} />

                        <RX.Image source={ImageSource.telegram} style={_styles.logoImage3} />
                        <RX.View style={{ width: 50 }} />

                        <RX.Image source={ImageSource.twitter} style={_styles.logoImage2} />

                    </RX.View>
                </RX.View>

                <RX.Image resizeMethod={'resize'} resizeMode={'cover'} style={{ flex: 1, height: 800, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.gamemode} >
                    <RX.Text style={[_styles.text5, { alignSelf: 'center', marginBottom: 20, }]}>
                        {'GAME MODES'}
                    </RX.Text>
                    <RX.Text style={[_styles.text3, { marginBottom: 20, marginTop: 20, }]}>
                        {'DEATHMATCH'}
                    </RX.Text>
                    <RX.Image resizeMethod={'scale'} resizeMode={'contain'} style={{ borderRadius: 40, height: 500, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.dm} />

                    <RX.View style={{ height: 50 }} />

                </RX.Image>
                <RX.Image resizeMethod={'resize'} resizeMode={'cover'} style={{ flex: 1, height: 800, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.tank2} >
                    <RX.Text style={[_styles.text3, { marginBottom: 20, }]}>
                        {'CAPTURE THE FLAG'}
                    </RX.Text>
                    <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ borderRadius: 40, height: 500, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.ctf} />

                    <RX.View style={{ height: 50 }} />

                </RX.Image>
                <RX.Image resizeMethod={'resize'} resizeMode={'cover'} style={{ flex: 1, height: 1000, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.global} >
                    <RX.Text style={[_styles.text3, { marginBottom: 20, marginTop: 40, }]}>
                        {'CHOOSE YOU TANK'}
                    </RX.Text>
                    <CreateTodoPanel />
                </RX.Image>
                <RX.View style={{ flex: 1, height: 500, backgroundColor: 'black', alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >
                    <RX.Text style={[_styles.text3, { marginBottom: 20, }]}>
                        {'OUR PARTNERS'}
                    </RX.Text>
                    <RX.View style={{ height: 50 }} />

                </RX.View>
                <RX.View style={{ flex: 1, height: 500, backgroundColor: 'black', alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >
                    <RX.Text style={[_styles.text3, { marginBottom: 20, }]}>
                        {'OUR PARTNERS'}
                    </RX.Text>
                    <RX.View style={{ height: 50 }} />

                </RX.View>
                <RX.View>

                </RX.View>
            </RX.ScrollView >
        );
    }

}
