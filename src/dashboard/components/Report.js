import React from 'react'

const Report = (props) => {
    let d = new Date(props.booking.timestamp.seconds * 1000);
    return (
        <tr>
            <td>{props.booking.fullName}</td>
            <td>{props.booking.phoneNumber}</td>
            <td>{props.booking.idNumber}</td>
            <td>
                <ul>

                    {props.booking.orderContents.map((item, index) =>
                        <li key={index}>{item.promo}</li>
                    )}
                </ul>
            </td>
            <td>{props.booking.paid === "yes" ? props.booking.amount : "0"} ريال</td>
            <td>{d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()}</td>
            <td /* style={{minWidth: "300px"}} */></td>
        </tr>
    )
}
export default Report