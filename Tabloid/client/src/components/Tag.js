import React from 'react';
import { Table } from 'reactstrap';

const Tag = ({tag}) => {
 
    return (
        <tbody>
          <tr>
            <th scope="row">tag.Id</th>
            <td>tag.Name</td>
            <td>edit</td>
            <td>delete</td>
          </tr>
        </tbody>
    );
  }
