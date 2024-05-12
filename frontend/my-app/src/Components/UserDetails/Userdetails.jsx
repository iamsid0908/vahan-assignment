import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Userdetails.css";
import { useToast } from "@/components/ui/use-toast";

function Userdetails() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [error, setError] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [data, setupdatedata] = useState({});
  const { toast } = useToast();

  useEffect(() => {
    fetch("http://localhost:9000/v1/get-user-by-id", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: params.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        setUser(userData.data);
        setName(userData.data.name);
        setEmail(userData.data.email);
        setPhone(userData.data.phone);
        setDob(userData.data.dob);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching user:", error);
      });
  }, [data]);

  const userObj = {
    id: params.id,
    name,
    email,
    phone,
    dob,
  };
  const handleSubmit = () => {
    fetch("http://localhost:9000/v1/update-user", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (!response) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setupdatedata(res.data);
        toast({
          variant: "destructive",
          title: "Success.",
          description: "User is Updated.",
        });
      })
      .catch((err) => {
        console.error("Error fetching user:", error);
        toast({
          variant: "destructive",
          title: "Error.",
          description: "User is not Updated.",
        });
      });
  };

  return (
    <div className="userdetails">
      <div className="user-con">
        <img
          src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1369675164.1715385600&semt=ais_user"
          width="250"
          height="270"
          className="user-img"
        />
        <div className="user-name">
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="user-name">
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            className="input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="user-name">
          <input
            type="text"
            name="phone"
            defaultValue={user.phone}
            className="input"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="user-name">
          <input
            type="text"
            name="dob"
            defaultValue={user.dob}
            className="input"
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <button onClick={handleSubmit} className="btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default Userdetails;
