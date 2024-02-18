import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { updateUser } from "@/redux/service/user";
import { useAuth } from "@/assets/hooks/use-auth";
import { getAllTheUsers } from "@/redux/features/users";

const EditUserDetailsModal = ({ open,setOpen,selectedRowData }) => {
    console.log("ROW_DATA ",selectedRowData);
    const [loading, setLoading] =  useState(false);
    const auth = useAuth();
    const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    first_name: selectedRowData?.first_name || "",
    last_name:  selectedRowData?.last_name || "",
    age: selectedRowData?.age || "",
    phone: selectedRowData?.phone || "",
    email: selectedRowData?.email || "",
    role: selectedRowData?.role || "",
    profession: selectedRowData?.profession || ""
  }

  console.log("ROW_DATA INITIAL VALUES ",initialValues);


  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required!"),
    last_name: Yup.string().required("This field is required!"),
    age: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
    phone: Yup.number().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    role: Yup.string().required("This field is required!"),
  });

  const updateUserDetails = async (formValue) => {
    const payloadData = {
      ...formValue,
      id: selectedRowData?.id
    }

    try {
      setLoading(true)
      await updateUser(payloadData, auth)
      dispatch(getAllTheUsers(auth));
      toast.success("User successfully updated")
      setLoading(false);
      handleClose();


    }catch(error){
      toast.error(error)
      setLoading(false);
    }

  }

  return (
    <section>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={updateUserDetails}
          >

          <Form>
            <section className="space-y-2">
              <h1 className="text-xl font-bold">Edit User Details</h1>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                  />
                  <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                  />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-warning text-xs"
                    />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="date"
                    placeholder="Date of Birth"
                    name="age"
                  />
                  <ErrorMessage
                      name="age"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
              </Grid>
              <Divider />
              <p>Contact Information</p>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="Email"
                    name="email"
                  />
                  <ErrorMessage
                      name="email"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                  />
                  <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
              </Grid>
              <Divider />
              <p>More Details</p>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="Profession"
                    name="profession"
                  />
                  <ErrorMessage
                      name="profession"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    className="border border-gray focus:outline-none p-4 rounded-lg w-full"
                    type="text"
                    placeholder="Role"
                    name="role"
                  />
                  <ErrorMessage
                      name="role"
                      component="div"
                      className="text-warning text-xs"
                  />
                </Grid>
              </Grid>
              <div>
                <div className="flex justify-end gap-2 mt-4">
                <button
                      type="submit"
                      className="bg-primary px-4 py-2 text-white"
                    >
                      {loading && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          ></path>
                        </svg>
                      )}
                      Update User
                  </button>
                </div>
              </div>
            </section>
          </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EditUserDetailsModal;
