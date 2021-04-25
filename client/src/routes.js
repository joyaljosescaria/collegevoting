import Index from "views/Index.js";
import Courses from "views/admin/Courses.js";
import Election from "views/admin/Election.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Unverified from "views/admin/Unverified.js";


var routes = [
  {
    path: "/students",
    name: "Students",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/unverified",
    name: "Unverified",
    icon: "ni ni-planet text-blue",
    component: Unverified, 
    layout: "/admin",
  },
  {
    path: "/courses",
    name: "Courses",
    icon: "ni ni-pin-3 text-orange",
    component: Courses,
    layout: "/admin",
  },
  {
    path: "/election",
    name: "Election",
    icon: "ni ni-single-02 text-yellow",
    component: Election,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth/admin",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth/admin",
  },
];
export default routes;
