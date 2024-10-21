import React from 'react';
import { Button, Form } from 'react-bootstrap';

function Filter() {
  return (
    <>
      <div className="filterSec">
        <div className='filterAction'>
          <Form.Select className='filterSelectBox'>
            <option>Location</option>
            <option>Alaska</option>
            <option>Houston</option>
            <option>Phoenix</option>
          </Form.Select>
          <Form.Select className='filterSelectBox'>
          <option>Skills</option>
          <option>Skills 1</option>
          <option>Skills 2</option>
          <option>Skills 3</option>
        </Form.Select>
        <Form.Select className='filterSelectBox'>
          <option>Urgency</option>
          <option>Urgency 1</option>
          <option>Urgency 2</option>
          <option>Urgency 3</option>
        </Form.Select>
        <Form.Select className='filterSelectBox'>
          <option>Commitment time</option>
          <option>10:09 AM</option>
          <option>10:09 AM</option>
          <option>10:09 AM</option>
        </Form.Select>
        <Form.Select className='filterSelectBox'>
          <option>Interests</option>
          <option>test 1</option>
          <option>test 2</option>
          <option>test 3</option>
        </Form.Select>
      </div>
      <Button className='btnlinkSecondary' variant="link">Reset filters</Button>
      </div>
    </>
  );
}

export default Filter;
