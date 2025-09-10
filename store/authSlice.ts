import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../lib/api"

interface AuthState {
  user: null | { id: string; name: string; email: string; role: string }
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

// async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/login", { email, password })
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Login failed")
    }
  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/register", payload)
      return res.data
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Registration failed")
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
