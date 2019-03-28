import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectLoaded = () =>
  createSelector(selectGlobal, globalState => globalState.get('loaded'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('user'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState => routerState.get('location').toJS());

const makeSelectContentHeight = () =>
  createSelector(selectGlobal, globalState => globalState.get('contentHeight'));

const makeSelectContentWidth = () =>
  createSelector(selectGlobal, globalState => globalState.get('contentWidth'));

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectLoaded,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectContentHeight,
  makeSelectContentWidth
};
