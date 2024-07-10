import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 10vh;
  padding: 0 5%;

  @media (max-width: 600px) {
    padding-top: 5vh;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 15rem;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  height:300px;

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;

const CardHeader = styled.div`
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 10px 0;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

const Button = styled.button`
  background-color: #fbd137;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 250px;
  margin-top: -5px;

  &:hover {
    background-color: FAD5A5;
  }
`;

const StyledLabel = styled(Label)`
  font-size: 20px; /* Increase the text size */
`;

const RadioGroupItemContainer = styled.div`
  padding-top: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 1rem; /* Add space between items */
`;

function Staff({ handleNext }) {
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const fetchStaff = async () => {
    const response = await fetch('https://proartist-f6c2dfe5c27a.herokuapp.com/staff');
    const data = await response.json();
    const formattedStaffOptions = data.map(staff => ({
      value: staff.id,
      label: staff.first_name,
    }));
    setStaffOptions(formattedStaffOptions);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = () => {
    alert(`Selected Staff ID: ${selectedOption}`);
    handleNext();
    // Perform any further actions here (e.g., API call, navigation, etc.)
  };

  return (
    <Container>
      <CardContainer>
        <CardHeader>
          <Title>Staff</Title>
        </CardHeader>
        <RadioGroup
          defaultValue={staffOptions.length > 0 ? staffOptions[0].value : ''}
          onValueChange={(value) => setSelectedOption(value)}
        >
          {staffOptions.map(option => (
            <RadioGroupItemContainer key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <StyledLabel htmlFor={option.value}>{option.label}</StyledLabel>
            </RadioGroupItemContainer>
          ))}
        </RadioGroup>
        <Footer>
          
          <Button onClick={handleSubmit}>Continue</Button>
        </Footer>
      </CardContainer>
    </Container>
  );
}

export default Staff;
