import { createSelector } from 'reselect';

const selectOnline = state => state.get('online');

const makeSelectOnlineUsersLoading = () =>
  createSelector(selectOnline, onlineState => onlineState.get('loading'));

const makeSelectOnlineUsersLoaded = () =>
  createSelector(selectOnline, onlineState => onlineState.get('loaded'));

const makeSelectOnlineUsersError = () =>
  createSelector(selectOnline, onlineState => onlineState.get('error'));

const makeSelectOnlineUsers = () =>
  createSelector(selectOnline, onlineState => onlineState.get('users'));

export {
  makeSelectOnlineUsersLoading,
  makeSelectOnlineUsersLoaded,
  makeSelectOnlineUsersError,
  makeSelectOnlineUsers
};
