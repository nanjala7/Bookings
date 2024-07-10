import React from 'react'
import styled from 'styled-components';

const cardcontainer= styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 15rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  height: 300px;

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

export default cardcontainer
