import { createSlice } from "@reduxjs/toolkit";
const entities = [
  {
    id: "123",
    name: "karthik",
    role: "Admin",
    status: "Active",
    password: "1234",
    confirmPassword: "1234",
    data: "1",
  },
  {
    id: "456",
    name: "selva",
    role: "User",
    status: "Active",
    password: "1234",
    confirmPassword: "1234",
    data: "1",
  },
];

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities,
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, role, status, password, confirmPassword, data } =
        action.payload;
      let existingUser = state.entities.find(
        (user) => user.id === action.payload.id
      );
      if (existingUser) {
        existingUser.id = id;
        existingUser.name = name;
        existingUser.role = role;
        existingUser.status = status;
        existingUser.password = password;
        existingUser.confirmPassword = confirmPassword;
        existingUser.data = data;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
    userDetails(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      const DetailsOfUser = existingUser;
      return DetailsOfUser;
    },
  },
});

export const {
  userAdded,
  userUpdated,
  userDeleted,
  userDetails,
  DetailsOfUser,
} = usersSlice.actions;

export default usersSlice.reducer;
