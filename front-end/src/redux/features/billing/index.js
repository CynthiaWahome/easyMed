import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInvoices,
  fetchPatientBillingAppointments,
  fetchPatientBillingLabRequest,
  fetchPatientBillingPrescribedDrug,
  getBillingInvoiceItems,
} from "@/redux/service/billing";

const initialState = {
  patientAppointment: [],
  patientLabRequest: [],
  patientPrescribedDrug: [],
  selectedAppointments: [],
  selectedLabRequests: [],
  selectedPrescribedDrugs: [],
  invoices: [],
  invoiceItems:[]
};

const BillingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    setPatientAppointment: (state, action) => {
      state.patientAppointment = action.payload;
    },
    setPatientLabRequest: (state, action) => {
      state.patientLabRequest = action.payload;
    },
    setPatientPrescrribedDrug: (state, action) => {
      state.patientPrescribedDrug = action.payload;
    },
    setSelectedPrescribedDrug: (state, action) => {
      state.selectedPrescribedDrugs = action.payload;
    },
    setSelectedAppointment: (state, action) => {
      state.selectedAppointments = action.payload;
    },
    setSelectedLabRequest: (state, action) => {
      state.selectedLabRequests = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    setInvoiceItems: (state, action) => {
      state.invoiceItems = action.payload;
    },
  },
});

export const {
  setPatientAppointment,
  setPatientLabRequest,
  setPatientPrescrribedDrug,
  setSelectedAppointment,
  setSelectedLabRequest,
  setSelectedPrescribedDrug,
  setInvoices,
  setInvoiceItems,
} = BillingSlice.actions;

export const getAllPatientBillingAppointments =
  (patient__id) => async (dispatch) => {
    try {
      const response = await fetchPatientBillingAppointments(patient__id);
      dispatch(setPatientAppointment(response));
    } catch (error) {
      console.log("BILLING_ERROR ", error);
    }
  };

export const getAllPatientBillingLabRequest =
  (patient_id) => async (dispatch) => {
    try {
      const response = await fetchPatientBillingLabRequest(patient_id);
      dispatch(setPatientLabRequest(response));
    } catch (error) {
      console.log("BILLING_ERROR ", error);
    }
  };

export const getAllPatientBillingPrescribedDrug =
  (patient_id) => async (dispatch) => {
    try {
      const response = await fetchPatientBillingPrescribedDrug(patient_id);
      dispatch(setPatientPrescrribedDrug(response));
    } catch (error) {
      console.log("BILLING_ERROR ", error);
    }
  };

export const getAllInvoices = (auth) => async (dispatch) => {
  try {
    const response = await fetchInvoices(auth);
    dispatch(setInvoices(response));
  } catch (error) {
    console.log("BILLINGI_ERROR ", error);
  }
};

export const getAllInvoiceItems = (auth) => async (dispatch) => {
  try {
    const response = await getBillingInvoiceItems(auth);
    dispatch(setInvoiceItems(response));
  } catch (error) {
    console.log("BILLING_ITEMS_ERROR ", error);
  }
};

export default BillingSlice.reducer;
