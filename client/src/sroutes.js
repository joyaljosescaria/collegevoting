import Sindex from "views/Sindex.js";
import Profile from "views/examples/Profile.js";
import Nomination from "views/Student/Nomination.js";
import Election from "views/Student/Election.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var sroutes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Sindex,
    layout: "/student",
  },
  {
    path: "/election",
    name: "Election",
    icon: "ni ni-planet text-blue",
    component: Election,
    layout: "/student",
  },
  {
    path: "/nomination",
    name: "Nomination",
    icon: "ni ni-pin-3 text-orange",
    component: Nomination, 
    layout: "/student",
  }
];

export default sroutes;
