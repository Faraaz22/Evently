import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { RootState } from "./index"

export interface Ticket {
  _id: string;
  userId: string;
  eventId: any;
  quantity: number;
  price: number;
  bookedAt: string;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Book ticket
export const bookTicket = createAsyncThunk(
  "tickets/bookTicket",
  async (
    { eventId, quantity }: { eventId: string; quantity: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token; // ✅ get token correctly

      if (!token) return rejectWithValue("Not authenticated");

      const res = await api.post(
        "/tickets/book",
        { eventId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.ticket;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to book ticket");
    }
  }
);


// Get my tickets
export const fetchMyTickets = createAsyncThunk(
  "tickets/fetchMyTickets",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token; // ✅ get token correctly

      if (!token) return rejectWithValue("Not authenticated");

      const res = await api.get("/tickets/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.tickets;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch tickets");
    }
  }
);


const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(bookTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchMyTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ticketsSlice.reducer;
