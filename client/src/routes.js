import Index from "views/Index.js";
import Courses from "views/admin/Courses.js";
import Election from "views/admin/Election.js";
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
  }
];
export default routes;
