export interface ViewState {
  x: number;
  y: number;
  scale: number;
}

export interface SettingsState {
  scaleSpeed: number;
  dimension: number;
}

export interface State {
  view: ViewState;
  settings: SettingsState;
}

export const state: State = {
  view: {
    x: 0,
    y: 0,
    scale: 0.5
  },
  settings: {
    scaleSpeed: 1000,
    dimension: 4
  }
};

export const setView = (viewState: ViewState) =>
  (state.view = viewState);
