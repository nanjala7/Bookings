// /src/hooks/useAppointment.jsx

import { useContext } from 'react';
import AppointmentContext from '@/context/AppointmentContext';

const useAppointment = () => useContext(AppointmentContext);

export default useAppointment;