import { createSlice } from "@reduxjs/toolkit";
const datas = [
  {
    id: "12",
    network: "Airtel",
    discription: "Bharat Airtel",
  },
  {
    id: "23",
    network: "jio",
    discription: "Reliance",
  },
];

const NetworksSlice = createSlice({
  name: "networks",
  initialState: {
    datas,
    loading: false,
    networkModal: false,
  },
  reducers: {
    networkAdded(state, action) {
      state.datas.push(action.payload);
    },
    networkUpdated(state, action) {
      const { id, network, discription } = action.payload;
      const existingNetwork = state.datas.find((network) => network.id === id);
      if (existingNetwork) {
        existingNetwork.network = network;
        existingNetwork.discription = discription;
        existingNetwork.id = id;
      }
    },

    networkDeleted(state, action) {
      const { id } = action.payload;
      const existingNetwork = state.datas.find((network) => network.id === id);
      if (existingNetwork) {
        state.datas = state.datas.filter((network) => network.id !== id);
      }
    },

    networkModalHandler(state, action) {
      state.networkModal = action.payload;
    },
  },
});

export const {
  networkAdded,
  networkDeleted,
  networkUpdated,
  networkModalHandler,
} = NetworksSlice.actions;

export default NetworksSlice.reducer;
