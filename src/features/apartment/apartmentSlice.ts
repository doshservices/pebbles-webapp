import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApartmentInitialState } from "./apartmentState";
import { authHeader, header } from "../../utils/headers";
// import toast from 'react-hot-toast'
import config from "../../utils/config";
import { store } from "../../app/store";
import { toast } from "react-hot-toast";
import { reset } from "../authentication/authenticationSlice";

let url = config.liveUrl;

export const get_nearby_apartments = createAsyncThunk(
  "apartments/get_nearby_apartments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.get(`${url}/apartments/near/you`, {
        headers: authHeader(token ? token : "123"),
      });

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        toast.error(message);
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const get_search_apartments = createAsyncThunk(
  "apartments/get_search_apartments",
  async (
    payload: {
      loc: string;
      checkIn: string | Date;
      checkOut: string | Date;
      apartmentType: string;
      state: string;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${url}/apartments-one/search?check_in=${payload.checkIn}&location=${payload.loc}&type=${payload.apartmentType}&check_out=${payload.checkOut}&state=${payload.state}`,
        {
          headers: header,
        }
      );

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const get_all_apartments = createAsyncThunk(
  "apartments/get_all_apartments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${url}/apartments/all-apartments?limit=1000&skip=0`,
        {
          headers: header,
        }
      );
// console.log(response)
      return response.data;

    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

export const get_apartment_by_id = createAsyncThunk(
  "apartments/get_apartment_by_id",
  async (
    payload: {
      id: string | undefined;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(`${url}/apartments/${payload.id}`, {
        headers: header,
      });

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);

      return rejectWithValue(message);
    }
  }
);

export const create_apartment = createAsyncThunk(
  "apartments/create_apartment",
  async (
    payload: {
      apartmentName: String;
      address: String;
      apartmentCountry: String;
      apartmentState: String;
      price: Number;
      typeOfApartment: String;
      facilities: String[];
      featuredImages: String[];
      apartmentImages: String[];
      apartmentInfo: String;
      numberOfBedrooms: Number;
      numberOfToilets: Number;
      numberOfGuests: Number;
      longitude: String;
      latitude: String;
      landmark: any[];
      id?: string;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.post(`${url}/apartments`, payload, {
        headers: authHeader(token ? token : "123"),
      });
      toast.success(response?.data.data.message);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      if (message === "Unauthorized Access. Contact the admin.") {
        store.dispatch(reset());
      }
      return rejectWithValue(message);
    }
  }
);

export const get_apartments_by_user = createAsyncThunk(
  "apartments/get_apartments_by_user",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.get(`${url}/apartments/user`, {
        headers: authHeader(token ? token : "123"),
      });

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const delete_apartment = createAsyncThunk(
  "apartments/delete_apartment",
  async (
    payload: {
      id: string | undefined;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.delete(`${url}/apartments/${payload.id}`, {
        headers: authHeader(token ? token : "123"),
      });

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast(message);

      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const update_apartment = createAsyncThunk(
  "apartments/update_apartment",
  async (
    payload: {
      apartmentName: String;
      address: String;
      apartmentCountry: String;
      apartmentState: String;
      price: Number;
      typeOfApartment: String;
      facilities: String[];
      featuredImages: String[];
      apartmentImages: String[];
      apartmentInfo: String;
      numberOfBedrooms: Number;
      numberOfToilets: Number;
      numberOfGuests: Number;
      longitude: String;
      latitude: String;
      landmark: any[];
      id?: string;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;
    let idd = payload.id;
    delete payload.id;

    try {
      const response = await axios.put(`${url}/apartments/${idd}`, payload, {
        headers: authHeader(token ? token : "123"),
      });
      toast.success(`${payload.apartmentName} updated successfully.`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const save_apartment = createAsyncThunk(
  "apartments/save_apartment",
  async (
    payload: {
      apartmentId: String;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.post(
        `${url}/apartments/save-apartment`,
        payload,
        {
          headers: authHeader(token ? token : "123"),
        }
      );
      toast.success("Apartment has been added to your wishlist.");
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);

      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const get_saved_apartments = createAsyncThunk(
  "apartments/get_saved_apartments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let token: string | null = store.getState()?.auth?.token;

    try {
      const response = await axios.get(`${url}/apartments/save-apartment/all`, {
        headers: authHeader(token ? token : "123"),
      });

      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (
        message === "Unauthorized Access. Contact the admin." ||
        message === "jwt expired"
      ) {
        store.dispatch(reset());
      }

      return rejectWithValue(message);
    }
  }
);

export const { reducer: ApartmentReducer, actions } = createSlice({
  name: "apartments",
  initialState: ApartmentInitialState,
  reducers: {
    apartmentReset: (state) => {
      state.nearbyApartments = null;
      state.userApartments = null;
      state.savedApartments = null;
      state.apartment = null;
      state.createSuccess = null;
    },
    apartment_search_save: (state, action) => {
      state.localApartmentSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_nearby_apartments.fulfilled, (state, action) => {
      state.nearbyApartments = action.payload.data;
      state.isFetchingNearbyApartments = false;
    });
    builder.addCase(get_nearby_apartments.pending, (state, action) => {
      state.isFetchingNearbyApartments = true;
    });
    builder.addCase(get_nearby_apartments.rejected, (state, action) => {
      state.isFetchingNearbyApartments = false;
    });
    builder.addCase(get_search_apartments.fulfilled, (state, action) => {
      state.searchApartments = action.payload.data;
      state.isFetchingSearchApartments = false;
    });
    builder.addCase(get_search_apartments.pending, (state, action) => {
      state.isFetchingSearchApartments = true;
    });
    builder.addCase(get_search_apartments.rejected, (state, action) => {
      state.isFetchingSearchApartments = false;
    });
    builder.addCase(get_all_apartments.fulfilled, (state, action) => {
      state.allApartments = action.payload.data;
      state.isFetchingAllApartments = false;
    });
    builder.addCase(get_all_apartments.pending, (state, action) => {
      state.isFetchingAllApartments = true;
    });
    builder.addCase(get_all_apartments.rejected, (state, action) => {
      state.isFetchingAllApartments = false;
    });
    builder.addCase(get_apartment_by_id.fulfilled, (state, action) => {
      state.apartment = action.payload.data;
      state.isFetchingApartment = false;
    });
    builder.addCase(get_apartment_by_id.pending, (state, action) => {
      state.isFetchingApartment = true;
    });
    builder.addCase(get_apartment_by_id.rejected, (state, action) => {
      state.isFetchingApartment = false;
    });
    builder.addCase(create_apartment.fulfilled, (state, action) => {
      state.createSuccess = action.payload.data;
      state.isCreatingApartment = false;
    });
    builder.addCase(create_apartment.pending, (state, action) => {
      state.isCreatingApartment = true;
    });
    builder.addCase(create_apartment.rejected, (state, action) => {
      state.isCreatingApartment = false;
    });
    builder.addCase(get_apartments_by_user.fulfilled, (state, action) => {
      state.userApartments = action.payload.data;
      state.isFetchingAllApartments = false;
    });
    builder.addCase(get_apartments_by_user.pending, (state, action) => {
      state.isFetchingAllApartments = true;
    });
    builder.addCase(get_apartments_by_user.rejected, (state, action) => {
      state.isFetchingAllApartments = false;
    });
    builder.addCase(delete_apartment.fulfilled, (state, action) => {
      state.deleteSuccess = true;
      state.isDeleting = false;
    });
    builder.addCase(delete_apartment.pending, (state, action) => {
      state.deleteSuccess = false;
      state.isDeleting = true;
    });
    builder.addCase(delete_apartment.rejected, (state, action) => {
      state.isDeleting = false;
      state.deleteSuccess = false;
    });
    builder.addCase(update_apartment.fulfilled, (state, action) => {
      state.createSuccess = action.payload.data;
      state.isCreatingApartment = false;
    });
    builder.addCase(update_apartment.pending, (state, action) => {
      state.isCreatingApartment = true;
    });
    builder.addCase(update_apartment.rejected, (state, action) => {
      state.isCreatingApartment = false;
    });
    builder.addCase(save_apartment.fulfilled, (state, action) => {
      state.savedApartment = action.payload.data;
      state.isSavingApartment = false;
    });
    builder.addCase(save_apartment.pending, (state, action) => {
      state.isSavingApartment = true;
    });
    builder.addCase(save_apartment.rejected, (state, action) => {
      state.isSavingApartment = false;
    });
    builder.addCase(get_saved_apartments.fulfilled, (state, action) => {
      state.savedApartments = action.payload.data;
      state.isSavingApartment = false;
    });
    builder.addCase(get_saved_apartments.pending, (state, action) => {
      state.isSavingApartment = true;
    });
    builder.addCase(get_saved_apartments.rejected, (state, action) => {
      state.isSavingApartment = false;
    });
  },
});

export const { apartmentReset, apartment_search_save } = actions;
