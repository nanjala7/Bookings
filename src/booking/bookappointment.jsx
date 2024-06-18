import React, { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"

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
    <Button className="mt-3 rounded full"> Select date&time</Button>
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
