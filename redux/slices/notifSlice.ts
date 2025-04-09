import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
    id: string;
    type: 'price_alert' | 'weather_alert';
    message: string;
    timestamp: number;
}

interface UIState {
    notifications: Notification[];
}

const initialState: UIState = {
    notifications: [],
};

const notifSlice = createSlice({
    name: 'notif',
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<Notification>) {
            state.notifications.unshift(action.payload);
            if (state.notifications.length > 10) {
                state.notifications.pop();
            }
        },
        clearNotifications(state) {
            state.notifications = [];
        },
    },
});

export const { addNotification, clearNotifications } = notifSlice.actions;

export default notifSlice.reducer;
