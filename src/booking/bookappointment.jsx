import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import "./booking.css";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  

function bookappointment() {
    const [date, setDate]=useState(new Date())
  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button 
  className="DT button" 
  style={{
    backgroundColor: "#4CAF50", // Green background
    border: "none", // Remove border
    color: "white", // White text
    padding: "15px 32px", // Padding
    textAlign: "center", // Centered text
    textDecoration: "none", // No underline
    display: "inline-block", // Inline-block display
    fontSize: "16px", // Font size
    margin: "4px 2px", // Margin
    cursor: "pointer", // Pointer cursor on hover
    borderRadius: "8px", // Rounded corners
    width: "5cm"
  }}
>
  Select date&time
</Button>

      </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select date and time</DialogTitle>
      <DialogDescription>
      <div>
          <div className="grid grid-cols-2">
            {/*calendar*/}
            <div className='flex'>
            <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
  />

           
            </div>

             {/*time slot*/}
             <div></div>


          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default bookappointment
