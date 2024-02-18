import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import dynamic from "next/dynamic";
import { Column, Paging, Pager, Scrolling } from "devextreme-react/data-grid";
import { Grid } from "@mui/material";
import { MdLocalPrintshop } from 'react-icons/md'

import { getAllInvoices } from '@/redux/features/billing';
import { downloadPDF } from '@/redux/service/pdfs';
import { useAuth } from '@/assets/hooks/use-auth';
import CmtDropdownMenu from '@/assets/DropdownMenu';
import { LuMoreHorizontal } from 'react-icons/lu';

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
    ssr: false,
});

const allowedPageSizes = [5, 10, 'all'];

const getActions = () => {
    let actions = [
        {
        action: "print",
        label: "Print",
        icon: <MdLocalPrintshop className="text-success text-xl mx-2" />,
        },
    ];

    return actions;
};

const BilledDataGrid = () => {
    const userActions = getActions();
    const dispatch = useDispatch();
    const auth = useAuth()
    const { invoices } = useSelector((store) => store.billing);

    const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
    const [showInfo, setShowInfo] = useState(true);
    const [showNavButtons, setShowNavButtons] = useState(true);

    const handlePrint = async (data) => {
        try{
            const response = await downloadPDF(data.id, "_invoice_pdf", auth)
            window.open(response.link, '_blank');
            toast.success("got pdf successfully")

        }catch(error){
            console.log(error)
            toast.error(error)
        }
        
    };

    const onMenuClick = async (menu, data) => {
        if (menu.action === "dispense") {
          dispatch(getAllPrescriptionsPrescribedDrugs(data.id, auth))
          setSelectedRowData(data);
          setOpen(true);
        }else if (menu.action === "print"){
          handlePrint(data);
        }
      };
    
      const actionsFunc = ({ data }) => {
        return (
            <CmtDropdownMenu
              sx={{ cursor: "pointer" }}
              items={userActions}
              onItemClick={(menu) => onMenuClick(menu, data)}
              TriggerComponent={
                <LuMoreHorizontal className="cursor-pointer text-xl flex items-center" />
              }
            />
        );
      };
    

    useEffect(()=> {
        if(auth){
            dispatch(getAllInvoices(auth));
        }
    }, [auth]);

    return (
        <section clasName="">
            <DataGrid
                dataSource={invoices}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                remoteOperations={true}
                showColumnLines={true}
                showRowLines={true}
                wordWrapEnabled={true}
                allowPaging={true}
                className="shadow-xl"
                // height={"70vh"}
            >
                <Scrolling rowRenderingMode='virtual'></Scrolling>
                <Paging defaultPageSize={10} />
                <Pager
                    visible={true}
                    allowedPageSizes={allowedPageSizes}
                    showPageSizeSelector={showPageSizeSelector}
                    showInfo={showInfo}
                    showNavigationButtons={showNavButtons}
                />
                <Column
                    dataField="invoice_number"
                    caption="Invoice Number" 
                />
                <Column
                    dataField="invoice_date"
                    caption="Date" 
                />
                <Column
                    dataField="invoice_description"
                    caption="Description" 
                />
                <Column dataField="invoice_amount" caption="Amount" />
                <Column 
                    dataField="status"
                    caption="Status"
                />
                <Column 
                    dataField="" 
                    caption=""
                    cellRender={actionsFunc}
                />
            </DataGrid>
        </section>
    )
}

export default BilledDataGrid;