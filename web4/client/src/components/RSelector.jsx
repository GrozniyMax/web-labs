import {useDispatch} from 'react-redux';
import {Dropdown} from "primereact/dropdown";
import {setR} from "../redux/actions.jsx";
import '../css/RSelector.css';
import {useState} from "react";

function RSelector() {
    const values = [
        '1','2','3','4'
    ];
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(values[0]); // Выбираем первый элемент по умолчанию

    function update(val) {
        console.log(`Selected new R value ${val}`);
        setSelected(val);
        dispatch(setR(val))
    }

    return (

        <Dropdown value={selected} onChange={(e) => update(e.value)} options={values}
                  placeholder="Select r value" checkmark={true}  highlightOnSelect={false} className="w-full md:w-14rem" />

        // <Dropdown width={100} height={100} options={values} onChange={(e)=>update(e.value)} value={selected}/>
    );
}


export default RSelector;
