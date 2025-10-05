import React, { useRef } from 'react'
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import Purchase from './Purchase'
import { faTrashAlt, faCheck, faRedo, faTimes, faArchive, faUndoAlt, faCalendarCheck, faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function PrintButton() {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Purchase  />
            <button
                style={{ lineHeight: "100%" }} className={`btn mr-2 btn-outline-dark`}>
                <FontAwesomeIcon icon={faPrint} />
            </button>
        </>
    )
}








