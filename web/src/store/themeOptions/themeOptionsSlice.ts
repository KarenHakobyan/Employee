import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '..';

const themeOptionsSlice = createSlice({
  name: 'themeOptions',
  initialState: {
    sidebarFixed: true,
    sidebarFooter: true,
    sidebarShadow: false,
    sidebarStyle: 'app-sidebar--dark',
    sidebarUserbox: true,
    sidebarToggleMobile: false,
    sidebarToggle: false,

    // Header

    headerFixed: true,
    headerShadow: true,
    headerBgTransparent: true,
    headerSearchHover: false,
    headerDrawerToggle: false,

    // Main content

    contentBackground: '',
    themeConfiguratorToggle: false,

    // Footer

    footerFixed: false,
    footerShadow: false,
    footerBgTransparent: true,

    // Page title

    pageTitleStyle: '',
    pageTitleBackground: '',
    pageTitleShadow: false,
    pageTitleIconBox: true,
    pageTitleDescription: true,

    // Active Notification item
    sidebarActiveNotifications: [''],
  },
  reducers: {
    sidebarToggleMobile: (state, action) => {
      state.sidebarToggleMobile = action.payload;
    },

    sidebarToggle: (state, action) => {
      state.sidebarToggle = action.payload;
    },

    headerDrawerToggle: (state, action) => {
      state.headerDrawerToggle = action.payload;
    },

    headerSearchHover: (state, action) => {
      state.headerSearchHover = action.payload;
    },

    addSidebarNotificationIcon: (state, action) => {
      if (!state.sidebarActiveNotifications.includes(action.payload)) {
        state.sidebarActiveNotifications = [
          ...state.sidebarActiveNotifications,
          action.payload,
        ];
      }
    },

    removeSidebarNotificationIcon: (state, action) => {
      state.sidebarActiveNotifications = state.sidebarActiveNotifications.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const {
  sidebarToggleMobile,
  sidebarToggle,
  headerDrawerToggle,
  headerSearchHover,
  addSidebarNotificationIcon,
  removeSidebarNotificationIcon,
} = themeOptionsSlice.actions;

export const setSidebarToggleMobile = (toggle: boolean): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(sidebarToggleMobile(toggle));
};

export const setSidebarToggle = (toggle: boolean): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(sidebarToggle(toggle));
};

export const setHeaderDrawerToggle = (toggle: boolean): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(headerDrawerToggle(toggle));
};

export const setHeaderSearchHover = (toggle: boolean): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(headerSearchHover(toggle));
};

export const showSidebarNotificationIcon = (icon: string): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(addSidebarNotificationIcon(icon));
};

export const hideSidebarNotificationIcon = (icon: string): AppThunk => (
  dispatch: AppDispatch
) => {
  dispatch(removeSidebarNotificationIcon(icon));
};

export default themeOptionsSlice;
