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
    {
      id: 100,
      labelKey: "sidebar.profile",
      link: "/app/profile",
      icon: <ProfileIcon />,
    },
  ];
  switch (user_role) {
    case "admin":
      structure = [
        {
          id: 100,
          labelKey: "sidebar.profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 0,
          labelKey: "sidebar.dashboard",
          link: "/app/dashboard",
          icon: <HomeIcon />,
        },
        {
          id: 200,
          labelKey: "sidebar.admin",
          link: "/app/admin",
          icon: <TableIcon />,
          children: [
            {
              labelKey: "sidebar.fields",
              link: "/app/admin/field",
            },
          ],
        },
        {
          id: 1,
          labelKey: "sidebar.question",
          // badge: 'NodeJS',
          // badgeColor: 'success',
          link: "/app/question",
          icon: <DocumentationIcon />,
          children: [
            {
              labelKey: "sidebar.questionList",
              link: "/app/question",
            },
            {
              labelKey: "sidebar.questionGrid",
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
          labelKey: "sidebar.users",
          link: "/app/user",
          // badge: 'New',
          // badgeColor: 'secondary',
          icon: <PersonIcon />,
          children: [
            {
              labelKey: "sidebar.userList",
              link: "/app/user",
            },
            {
              labelKey: "sidebar.userAdd",
              link: "/app/user/new",
            },
            {
              labelKey: "sidebar.userEdit",
              link: "/app/user/edit",
            },
          ],
        },
        { id: 4, type: "divider" },
        { id: 5, type: "title", labelKey: "sidebar.forStudents" },
        {
          id: 6,
          labelKey: "sidebar.learning",
          link: "/app/learning",
          icon: <UIElementsIcon />,
          children: [
            { labelKey: "sidebar.taskList", link: "/app/learning/task" },
            {
              labelKey: "sidebar.recommended",
              // link: '/app/learning/recommended'
            },
            {
              labelKey: "sidebar.reEnforce",
              // link: '/app/learning/re-enforce',
            },
          ],
        },
        { id: 7, type: "divider" },
        { id: 8, type: "title", labelKey: "sidebar.forTeachers" },
        {
          id: 9,
          labelKey: "sidebar.teaching",
          // link: '/app/teaching',
          icon: <CoreIcon />,
        },
      ];
      break;
    case "user":
      structure = [
        {
          id: 100,
          labelKey: "sidebar.profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 1,
          labelKey: "sidebar.question",
          // badge: 'NodeJS',
          // badgeColor: 'success',
          link: "/app/question",
          icon: <DocumentationIcon />,
          children: [
            {
              labelKey: "sidebar.questionList",
              link: "/app/question",
            },
            {
              labelKey: "sidebar.questionGrid",
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
          labelKey: "sidebar.profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 9,
          labelKey: "sidebar.teaching",
          // link: '/app/teaching',
          icon: <CoreIcon />,
        },
      ];
      break;
    case "student":
      structure = [
        {
          id: 100,
          labelKey: "sidebar.profile",
          link: "/app/profile",
          icon: <ProfileIcon />,
        },
        {
          id: 6,
          labelKey: "sidebar.learning",
          link: "/app/learning",
          icon: <UIElementsIcon />,
          children: [
            { labelKey: "sidebar.taskList", link: "/app/learning/task" },
            {
              labelKey: "sidebar.recommended",
              // link: '/app/learning/recommended'
            },
            {
              labelKey: "sidebar.reEnforce",
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
