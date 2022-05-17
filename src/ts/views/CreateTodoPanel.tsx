/**
* CreateTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';

import { FontSizes, Styles } from '../app/Styles';
import { CreateTodoHook } from './CreateTodoHook';

interface CreateTodoPanelProps extends RX.CommonProps {
}

interface CreateTodoPanelState {
    todoText?: string;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        padding: 16,
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
};

export default class CreateTodoPanel extends RX.Component<CreateTodoPanelProps, CreateTodoPanelState> {
    render() {
        return (
            <RX.View useSafeInsets={true} style={[_styles.container, Styles.statusBarTopMargin]}>

                <CreateTodoHook isTiny={false} width={0} height={0} />
            </RX.View>
        );
    }

}
