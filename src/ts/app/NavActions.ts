/*
* NavActions.tsx
* Copyright: Microsoft 2018
*
* Constructs navigation contexts.
*/

import * as NavModels from '../models/NavModels';

export default class NavActions {
    static createTodoListContext(useStackNav: boolean, selectedTodoId?: string, showNewTodoPanel = false,showHome=false,showTokenomics=false,showRoadMap=false,showWhitePaper=false) {
        if (useStackNav) {
            const navContext = new NavModels.StackRootNavContext();
            navContext.stack.push(new NavModels.TodoListViewNavContext(selectedTodoId));
            if (showNewTodoPanel) {
                navContext.stack.push(new NavModels.NewTodoViewNavContext());
            } else if (selectedTodoId !== undefined) {
                navContext.stack.push(new NavModels.ViewTodoViewNavContext(selectedTodoId));
            } else if (showHome) {
                navContext.stack.push(new NavModels.HomeViewNavContext());
            }else if (showTokenomics) {
                navContext.stack.push(new NavModels.TokenomicsViewNavContext());
            }else if (showRoadMap) {
                navContext.stack.push(new NavModels.RoadMapViewNavContext());
            }else if (showWhitePaper) {
                navContext.stack.push(new NavModels.WhitePaperViewNavContext());
            }
            return navContext;
        } else {
            return new NavModels.TodoRootNavContext(selectedTodoId, showNewTodoPanel,showHome,showTokenomics,showRoadMap,showWhitePaper);
        }
    }
}
