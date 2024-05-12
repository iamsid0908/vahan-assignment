import React, { useState, useEffect } from "react";
import "./Userlist.css";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Userlist() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [flag, setFlag] = useState(false);

  const data11 = {
    name,
    email,
    dob: date,
    phone,
  };
  const { toast } = useToast();

  useEffect(() => {
    fetch("http://localhost:9000/v1/get-user", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success !== false) {
          setData(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("err");
      });
  }, [flag]);

  const handleInserSubmit = (e) => {
    e.preventDefault();
    console.log("hii");
    fetch("http://localhost:9000/v1/insert-user", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data11),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        toast({
          variant: "destructive",
          title: "Success.",
          description: "User is created.",
        });
        setFlag(!flag);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error.",
          description: "User is not created.",
        });
        console.error("Error fetching user:", error);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    fetch("http://localhost:9000/v1/delete-user", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        toast({
          variant: "destructive",
          title: "Success.",
          description: "User is created.",
        });
        setFlag(!flag);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error.",
          description: "User is not deleted.",
        });
        console.error("Error fetching user:", error);
      });
  };

  return (
    <div className="userlist">
      <div className="hlo">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-600 text-white text-center "
            >
              Insert User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Insert profile</DialogTitle>
              <DialogDescription>Insert user from here</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="sid"
                  className="col-span-3"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  placeholder="@gmail.com"
                  className="col-span-3"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  PhoneNo
                </Label>
                <Input
                  id="username"
                  placeholder="87xxxx"
                  className="col-span-3"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  DateOfBirth
                </Label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleInserSubmit}>
                Save User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="user-container">
        {data.map((item) => (
          <div className="cardsss">
            <img
              src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715385600&semt=ais_user"
              width="200"
              height="200"
              className="user-img"
            />
            <h2 className="user-name1">{item.name}</h2>
            <Link to={`/user-details/${item.id}`}>
              <Button className="view-detail-btn">View Details</Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your user and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userlist;
