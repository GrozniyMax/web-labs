import {useSelector} from 'react-redux';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import "../css/Datatable.css"

function MyTable() {
    let points = useSelector((state)=>state.points);

    function formNumber (columnData) {
        return Number.parseFloat(columnData).toFixed(2);
    }


    return (
        <DataTable value={points}>
            <Column field="x" header="X" alignHeader={"center"} body={(rowData) => formNumber(rowData.x)}/>
            <Column field="y" header="Y" alignHeader={"center"} body={(rowData) => formNumber(rowData.x)}/>
            <Column field="r" header="R" alignHeader={"center"} body={(rowData) => formNumber(rowData.x)}/>
            <Column field="hit" header="Result" alignHeader={"center"}/>
        </DataTable>
    );
}

export default MyTable;
