/**
* ViewTodoPanel.tsx
* Copyright: Microsoft 2017
*
* The Todo item edit view.
*/

import * as RX from 'reactxp';
import { ComponentBase } from 'resub';
import { FontSizes } from '../app/Styles';
import { Todo } from '../models/TodoModels';
import TodosStore from '../stores/TodosStore';

export interface ViewTodoPanelProps extends RX.CommonProps {
    todoId: string;
}

interface ViewTodoPanelState {
    todo: Todo;
}

const _styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        alignSelf: 'stretch',
        margin: 16,
    }),
    todoText: RX.Styles.createTextStyle({
        margin: 8,
        fontSize: FontSizes.size16,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    buttonContainer: RX.Styles.createViewStyle({
        margin: 8,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }),
};
import ImageSource from 'modules/images';


export default class ViewTodoPanel extends ComponentBase<ViewTodoPanelProps, ViewTodoPanelState> {
    protected _buildState(props: ViewTodoPanelProps, initState: boolean): Partial<ViewTodoPanelState> {
        const newState: Partial<ViewTodoPanelState> = {
            todo: TodosStore.getTodoById(props.todoId),
        };

        return newState;
    }

    render() {
        return (
            <RX.View useSafeInsets={true} style={_styles.container}>
                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.token_id : ''}
                </RX.Text>

                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.token_address : ''}
                </RX.Text>

                {this.state.todo ? this.state.todo.class == "1" ? <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ borderRadius: 12, height: 500, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.sergeant} /> : this.state.todo.class == "0" ? <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ borderRadius: 12, height: 500, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.recruit} /> : this.state.todo.class == "2" ? <RX.Image resizeMethod={'resize'} resizeMode={'contain'} style={{ borderRadius: 12, height: 500, alignSelf: 'stretch', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} source={ImageSource.general} /> : null : null}


                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.class == "1" ? "Sergeant" : this.state.todo.class == "0" ? "Recruit" : this.state.todo.class == "2" ? "Genral" : "" : ''}
                </RX.Text>
                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.rare == "1" ? "UnCommon" : this.state.todo.rare == "0" ? "Common" : "Rare" : ''}
                </RX.Text>
                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.owner_of : ''}
                </RX.Text>
                <RX.Text style={_styles.todoText}>
                    {this.state.todo ? this.state.todo.token_uri : ''}
                </RX.Text>
            </RX.View>
        );
    }

}
