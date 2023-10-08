import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://jsonplaceholder.typicode.com/users?_limit=3";

export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await fetch(url);
  return response.json();
});

const ThunkMiddleware = createSlice({
  name: "api_Fetch",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  reducers: {
    // omit reducer case
    updateUser: (state, action) => {
      console.log("STATE: ", state);
      const { id, name, email, address } = action.payload;
      console.log("reducer address", address, id);
      console.log("reducer name", name);
      const user = state.data?.find((f) => f.id == id);
      //   console.log("find variable : ", f);
      console.log("USER", user);
      console.log("stateData", user.address);
      if (user) {
        user.name = name;
        user.email = email;
        user.address.street = address;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      //   const user = state.data?.find((f) => f.id == id);
      //   console.log("deleteUser", user);
      //   if (user) {
      //   state.data = state.data?.filter((f) => f.id !== id);
      return { ...state, data: state.data?.filter((f) => f.id != id) };
      //   }
    },
  },
  //   extraReducers is a function that has a builder which listen to the api
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("Error", action.payload);
    });
  },
});

export const { updateUser, deleteUser } = ThunkMiddleware.actions;

export default ThunkMiddleware.reducer;
