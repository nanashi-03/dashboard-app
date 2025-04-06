import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCrypto } from '@/utils/api';

interface CryptoState {
    data: Record<string, any>;
    loading: boolean;
    error: string | null;
}

const initialState: CryptoState = {
    data: {},
    loading: false,
    error: null,
};

export const getCrypto = createAsyncThunk(
    'crypto/getCrypto',
    async (id: string) => {
        const response = await fetchCrypto(id);
        return { id, data: response };
    }
);

const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCrypto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCrypto.fulfilled, (state, action) => {
                state.loading = false;
                state.data[action.payload.id] = action.payload.data;
            })
            .addCase(getCrypto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch crypto data';
            });
    },
});

export default cryptoSlice.reducer;
