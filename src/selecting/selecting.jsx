// File: src/selecting/Selecting.jsx
import { MultiSelect } from '@mantine/core';
function Selecting() {
  return (
    <MultiSelect
    label="Your favorite libraries"
    placeholder="Pick value"
    data={['React', 'Angular', 'Vue', 'Svelte']}
  />
  );
}

export default Selecting;