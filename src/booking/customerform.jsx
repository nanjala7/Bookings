import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function customerform() {
  return (
    <Sheet>
  <SheetTrigger>
  <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
          Add customer details
        </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Add your details</SheetTitle>
      <SheetDescription>
      <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name"
                  style={{
                    fontSize: '16px',
                    marginRight: '8px',
                    textAlign: 'left',
                  }}
                  >First name</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name"
                  style={{
                    fontSize: '16px',
                    marginRight: '8px',
                    textAlign: 'left',
                  }}
                  >Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email"
              style={{
                fontSize: '16px',
                marginRight: '8px',
                textAlign: 'left',
              }}
              >Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="MobileNo."
              style={{
                fontSize: '16px',
                marginRight: '8px',
                textAlign: 'left',
              }}
              >Mobile Number</Label>
              <Input id="MobileNo." type="tel" placeholder="+254 700000000" required />
            </div>
            <Button type="submit" className="w-full">
                Book Now
              </Button>
           
          </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}

export default customerform
