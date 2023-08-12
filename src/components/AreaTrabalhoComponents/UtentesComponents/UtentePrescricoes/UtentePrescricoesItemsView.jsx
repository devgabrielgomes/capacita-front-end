// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./UtentePrescricoes.css";
// import { Form, Button, Container, Row, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

// const UtentePrescricoesItemsView = ({ prescription, staffData }) => {
//     return (
//         <>
//             <p><b>Autor:</b> {prescription.user.id}</p>
//             <Table striped bordered>
//                 <thead>
//                     <tr>
//                         <th>Tipo de Prescrição</th>
//                         <th>Exercícios</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>{prescription.exercise.type.name}</td>
//                         <td>
//                             {prescription.exercise.attributes.length > 0 && prescription.exercise.attributes.map((val, key) => {
//                                 return (
//                                     <span key={key}>{val.name}<br /></span>
//                                 )
//                             })}
//                         </td>
//                     </tr>
//                     <tr>
//                         <td colSpan={3}>
//                             <b>Observações: </b>{prescription.exercise.description}
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </>
//     )
// }

// export default UtentePrescricoesItemsView