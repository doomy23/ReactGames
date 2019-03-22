import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
);

const makeSelectContentHeight = () =>
  createSelector(selectGlobal, globalState => globalState.get('contentHeight'));

const makeSelectContentWidth = () =>
  createSelector(selectGlobal, globalState => globalState.get('contentWidth'));

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectLocation, 
  makeSelectContentHeight,
  makeSelectContentWidth
};
