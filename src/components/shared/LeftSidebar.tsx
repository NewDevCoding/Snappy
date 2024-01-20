import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/srclib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
// import sidebarLinks from "@/constants/leftSidebarLinks";
import { INavLink } from "@/types";

const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
  },
];

const LeftSidebar = () => {

    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation()

    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess])
    return (
      <nav className="leftsidebar">
        <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
                <img 
                    src="/assets/images/logo.svg" 
                    alt="logo" 
                    width={170}
                    height={36}
                />
        </Link>
        <Link to={`/profile/${user.id}`} className="flrx gap-3 items-center">
          <img src={user.imageURL || "/assets/icons/profile.svg"} alt="profile" className="h-14 w-14 rounded-full" />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
            </p>
            <p className="small-regular text-light-3">
              @{user.username}
            </p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink)=> {
            const isActive = pathname === link.route;

            return (
             <li key={link.label}
              className={`leftsidebar-link group ${
              isActive && 'bg-primary-500'
             }`}>
              <NavLink
                to={link.route}
                className="flex gap-4 items-center p-4"
                >
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'}`}
                  />
                {link.label}
              </NavLink>

             </li>
            )
          })}
          
        </ul>
          
        </div>
        <Button 
          variant="ghost" 
          className="shad-button_ghost" 
          onClick={() => signOut()}>
                    <img 
                    src="/assets/icons/logout.svg" 
                    alt="logout" 
                    />
                    <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>
    )
}

export default LeftSidebar