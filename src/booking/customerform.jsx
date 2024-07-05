import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CustomerForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Optionally, reset the form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="firstName"
                      style={{
                        fontSize: '16px',
                        marginRight: '8px',
                        textAlign: 'left',
                      }}
                    >
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Max"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="lastName"
                      style={{
                        fontSize: '16px',
                        marginRight: '8px',
                        textAlign: 'left',
                      }}
                    >
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Robinson"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                      textAlign: 'left',
                    }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label
                    htmlFor="mobileNo"
                    style={{
                      fontSize: '16px',
                      marginRight: '8px',
                      textAlign: 'left',
                    }}
                  >
                    Mobile Number
                  </Label>
                  <Input
                    id="mobileNo"
                    type="tel"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    placeholder="+254 700000000"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Book Now
                </Button>
              </div>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default CustomerForm;
