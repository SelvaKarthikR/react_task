import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/UserSlice";
import networksReducer from "./slice/NetworkSlice";
export default configureStore({
  reducer: {
    users: usersReducer,
    networks: networksReducer,
  },
});
