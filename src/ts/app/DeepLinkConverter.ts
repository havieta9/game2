/*
* DeepLinkConverter.tsx
* Copyright: Microsoft 2018
*
* Converts between app (deep-link) URLs and navigation contexts.
*/

import * as assert from 'assert';

import * as _ from 'lodash';

import NavActions from '../app/NavActions';
import * as NavModels from '../models/NavModels';

import AppConfig from './AppConfig';

export default class DeepLinkConverter {
    static getUrlFromContext(context: NavModels.RootNavContext): string {
        let url = AppConfig.getFrontendBaseUrl();

        if (context.isStackNav) {
            const stackContext = context as NavModels.StackRootNavContext;
            const topViewContext = stackContext.stack[stackContext.stack.length - 1];

            if (topViewContext instanceof NavModels.TodoListViewNavContext) {
                url += '/sales';
                return url;
            } else if (topViewContext instanceof NavModels.ViewTodoViewNavContext) {
                url += '/sales?selected=' + encodeURIComponent(topViewContext.todoId);
                return url;
            } else if (topViewContext instanceof NavModels.NewTodoViewNavContext) {
                url += '/sales?selected=new';
                return url;
            } else if (topViewContext instanceof NavModels.HomeViewNavContext) {
                url = '/';
                return url;
            }else if (topViewContext instanceof NavModels.TokenomicsViewNavContext) {
                url = '/tokenomics';
                return url;
            }else if (topViewContext instanceof NavModels.RoadMapViewNavContext) {
                url = '/roadmap';
                return url;
            }else if (topViewContext instanceof NavModels.WhitePaperViewNavContext) {
                url = '/whitepaper';
                return url;
            }
        } else {
            const compositeContext = context as NavModels.CompositeRootNavContext;
            if (compositeContext instanceof NavModels.TodoRootNavContext) {
                url += '/sales';
                const todoListContext = context as NavModels.TodoRootNavContext;
                if (todoListContext.showNewTodoPanel) {
                    url += '?selected=new';
                } else if (todoListContext.todoList.selectedTodoId) {
                    url += '?selected=' + encodeURIComponent(todoListContext.todoList.selectedTodoId);
                }else if (todoListContext.showHome) {
                    url = '';
                }else if (todoListContext.showTokenomics) {
                    url = 'tokenomics';
                }else if (todoListContext.showRoadMap) {
                    url = 'roadmap';
                }else if (todoListContext.showWhitePaper) {
                    url = 'whitepaper';
                }
                return url;
            } else {
                // TODO - need to implement
                assert.fail('Unimplemented');
            }
        }

        return '';
    }

    static getContextFromUrl(url: string, isStackNav: boolean): NavModels.RootNavContext | undefined {
        const urlObj = new URL(url);
        if (!urlObj) {
            return undefined;
        }

        const pathElements = _.map(_.split(urlObj.pathname, '/'), elem => decodeURIComponent(elem));
        if (pathElements.length < 2) {
            return undefined;
        }

        switch (pathElements[1]) {
            case 'sales':
                let selectedTodoId: string | undefined;
                let showNewPanel = false;

                const selectedValue = urlObj.searchParams.get('selected');
                if (selectedValue === 'new') {
                    showNewPanel = true;
                } else if (selectedValue) {
                    selectedTodoId = selectedValue;
                }

                return NavActions.createTodoListContext(isStackNav, selectedTodoId, showNewPanel);
            case 'home':
                 
                    return NavActions.createTodoListContext(isStackNav, undefined, false,true);
             case 'tokenomics':
                 
                     return NavActions.createTodoListContext(isStackNav, undefined, false,false,true);
            case 'roadmap':
                 
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,true);
            case 'whitepaper':
                 
                    return NavActions.createTodoListContext(isStackNav, undefined, false,false,false,false,true);
                    
            default:
                return undefined;
        }
    }
}
