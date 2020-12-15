import { Dispatch, useReducer as useReactReducer } from 'react';

import { CreateChat } from './CreateChatPages';
import { Panels } from './PanelsPages';

export enum Action {
	UPDATE,
}

type State = {
	panelCurrent: Panels;
	setPanelCurrent: (panel: Panels) => void;
	setCreateChat: (chat: CreateChat) => void;
};

let lastState: State = {
	panelCurrent: Panels.Chats,
	setPanelCurrent: () => null,
	setCreateChat: () => null,
};

const reducer = (state: State, action: Action): State => {
	switch (action) {
		case Action.UPDATE:
			return { ...state };
		default:
			return lastState;
	}
};

const Reducer = (state: State, action: Action): State =>
	(lastState = reducer(state, action));

export const useReducer = (): [State, Dispatch<Action>] =>
	useReactReducer(Reducer, lastState, undefined);
