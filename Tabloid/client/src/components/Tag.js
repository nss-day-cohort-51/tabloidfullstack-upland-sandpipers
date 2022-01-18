import React from 'react';
import { Table } from 'reactstrap';

 const Tag = ({tag}) => {
 
    return (
        <tbody>
          <tr>
            <th scope="row">{tag.id}</th>
            <td>{tag.name}</td>
            <td>edit</td>
            <td>delete</td>
          </tr>
        </tbody>
    );
  }

  export default Tag;
