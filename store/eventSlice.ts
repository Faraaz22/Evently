import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "@/lib/api"

export interface Event {
  _id: string
  title: string
  description: string
  date: string
  location: string
  image?: string
  price: Number

}

interface EventState {
  events: Event[]
  loading: boolean
  error: string | null
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
}

// fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/events")
      return res.data.events
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch")
    }
  }
)

// create event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (payload: Omit<Event, "_id">, { rejectWithValue }) => {
    try {
      const res = await api.post("/events", payload)
      return res.data.event
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to create event")
    }
  }
)

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || action.error.message || "Failed to fetch events"
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload)
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || "Failed to create event";
      })
  },
})

export default eventSlice.reducer
