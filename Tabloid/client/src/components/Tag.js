import React from 'react';
import { Table } from 'reactstrap';

 const Tag = ({tag}) => {
 
    return (
        <tbody>
          <tr>
            <th scope="row">{tag.name}</th>
            <td>edit</td>
            <td>delete</td>
          </tr>
        </tbody>
    );
  }

  export default Tag;
