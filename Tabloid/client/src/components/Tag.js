import React from 'react';
import { Button } from 'reactstrap';

const Tag = ({ tag }) => {
  return (
    <tr>
      <th scope="row">{tag.name}</th>
      <td>
        <Button color="primary">edit</Button>{' '}
        <Button color="danger">delete</Button>{' '}
      </td>

    </tr>
  );
}

export default Tag;
