import "./App.css";
import Userdetails from "./Components/UserDetails/Userdetails";
import Userlist from "./Components/UserList/Userlist";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboards from "./Components/UserList/Dashboards";

function App() {
  //TODO insert, delete,image url,while getting all data sort it by created at, and alert,ui
  return (
    <div>
      <Dashboards />
      <Routes>
        <Route path="/" element={<Userlist />} />
        <Route path="/user-details/:id" element={<Userdetails />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
