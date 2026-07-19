import {
  Home as HomeIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  BarChart as ChartIcon,
  Map as MapIcon,
  Apps as CoreIcon,
  Description as DescriptionIcon,
  ShoppingCart as ShoppingCartIcon,
  StarBorder as ExtraIcon,
  AddCircle as AddSectionIcon,
  FolderOpen as FolderIcon,
  Description as DocumentationIcon,
  Person as PersonIcon,
  AccountCircle as ProfileIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";

export function getStructure() {
  const user_role = sessionStorage.getItem("user_role");
  let structure = [
    { id: 100, label: "Profile", link: "/app/profile", icon: <ProfileIcon /> },
  ];
  switch (user_role) {
    case "admin":
      structure = [
        {
          id: 100,
          label: "Profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 0,
          label: "Dashboard",
          link: "/app/dashboard",
          icon: <HomeIcon />,
        },
        {
          id: 200,
          label: "Admin",
          link: "/app/admin",
          icon: <TableIcon />,
          children: [
            {
              label: "Fields",
              link: "/app/admin/field",
            },
          ],
        },
        {
          id: 1,
          label: "Question",
          // badge: 'NodeJS',
          // badgeColor: 'success',
          link: "/app/question",
          icon: <DocumentationIcon />,
          children: [
            {
              label: "Question List",
              link: "/app/question",
            },
            {
              label: "Question Grid",
              link: "/app/question/grid",
            },
            // {
            //   label: 'Question Page',
            //   link: '/app/question/id',
            // },
          ],
        },
        {
          id: 2,
          label: "User",
          link: "/app/user",
          // badge: 'New',
          // badgeColor: 'secondary',
          icon: <PersonIcon />,
          children: [
            {
              label: "User List",
              link: "/app/user",
            },
            {
              label: "User Add",
              link: "/app/user/new",
            },
            {
              label: "User Edit",
              link: "/app/user/edit",
            },
          ],
        },
        { id: 4, type: "divider" },
        { id: 5, type: "title", label: "For Students" },
        {
          id: 6,
          label: "Learning",
          link: "/app/learning",
          icon: <UIElementsIcon />,
          children: [
            { label: "Task List", link: "/app/learning/tasks" },
            {
              label: "Recommended",
              // link: '/app/learning/recommended'
            },
            {
              label: "Re-enforce",
              // link: '/app/learning/re-enforce',
            },
          ],
        },
        { id: 7, type: "divider" },
        { id: 8, type: "title", label: "For Teachers" },
        {
          id: 9,
          label: "Teaching",
          // link: '/app/teaching',
          icon: <CoreIcon />,
        },
      ];
      break;
    case "user":
      structure = [
        {
          id: 100,
          label: "Profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 1,
          label: "Question",
          // badge: 'NodeJS',
          // badgeColor: 'success',
          link: "/app/question",
          icon: <DocumentationIcon />,
          children: [
            {
              label: "Question List",
              link: "/app/question",
            },
            {
              label: "Question Grid",
              link: "/app/question/grid",
            },
            // {
            //   label: 'Question Page',
            //   link: '/app/question/id',
            // },
          ],
        },
      ];
      break;
    case "teacher":
      structure = [
        {
          id: 100,
          label: "Profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 9,
          label: "Teaching",
          // link: '/app/teaching',
          icon: <CoreIcon />,
        },
      ];
      break;
    case "student":
      structure = [
        {
          id: 100,
          label: "Profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 6,
          label: "Learning",
          link: "/app/learning",
          icon: <UIElementsIcon />,
          children: [
            { label: "Task List", link: "/app/learning/tasks" },
            {
              label: "Recommended",
              // link: '/app/learning/recommended'
            },
            {
              label: "Re-enforce",
              // link: '/app/learning/re-enforce',
            },
          ],
        },
      ];
      break;
    default:
  }
  return structure;
}

export const structure = getStructure();

export default structure;
