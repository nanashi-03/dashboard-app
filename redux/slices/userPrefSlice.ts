import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PreferencesState = {
    favoriteCities: string[];
    favoriteCrypto: string | null;
};

const initialState: PreferencesState = {
    favoriteCities: [],
    favoriteCrypto: null,
};

const userPrefSlice = createSlice({
    name: 'userPref',
    initialState,
    reducers: {
        addFavoriteCity: (state, action: PayloadAction<string>) => {
            if (!state.favoriteCities.includes(action.payload)) {
                state.favoriteCities.push(action.payload);
            }
        },
        removeFavoriteCity: (state, action: PayloadAction<string>) => {
            state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
        },
        setFavoriteCrypto: (state, action: PayloadAction<string>) => {
            state.favoriteCrypto = action.payload;
        },
        removeFavoriteCrypto: (state) => {
            state.favoriteCrypto = null;
        }
    },
});

export const {
    addFavoriteCity,
    removeFavoriteCity,
    setFavoriteCrypto,
    removeFavoriteCrypto
} = userPrefSlice.actions;

export default userPrefSlice.reducer;
