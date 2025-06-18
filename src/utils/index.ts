export const routes = [
  {
    href: "/home",
    label: "PDF to Excel",
    icon: "/img/imgPDF2.png",
    icon2: "/img/imgPDFinvert2.png",
    id: "pdf_to_excel"
  },
  {
    href: "/home/history",
    label: "History",
    icon: "/svg/icons/historyicon.svg",
    icon2: "/img/imgHistoryInvert.png",
    id : "history"
  },
  {
    href: "/home/incidents",
    label: "Incidents",
    icon: "/svg/icons/incidentsicon.svg",
    icon2: "/img/imgIncidentsInvert.png",
    id: "incidents"
  },
];

export const routesother = [
  {
    href: "/home/usermanagement/users",
    label: "User management",
    icon: "/svg/icons/configicon.svg",
    icon2: "/img/ajuste.png",
    id:"user_management",
    children: [
      {
        href: "/home/usermanagement/users",
        label: "View users",
        icon: "/img/arrow2.png",
      },
      {
        href: "/home/rolesmanagement/roles",
        label: "View roles",
        icon: "/img/arrow2.png",
      },
    ],
  },
  // { href: "/login", label: "Logout", icon: "/svg/icons/logouticon.svg" },
];

export const descriptions: Record<string, string> = {
  "/home": "Upload your PDFs to convert them to Excel.",
  "/home/history": "Here you can view the history of all conversions.",
  "/home/incidents": "Here you can see all the erros that occur while converting a file",
  "/home/usermanagement": "Here you can create or edit all dashboard users",
  "/home/rolesmanagement": "Here you can create or edit all dashboard roles",
};
export const fieldsInit = [
  { id: 0, name: "item_number", checked: true },
  { id: 1, name: "name", checked: true },
  { id: 2, name: "descripction", checked: true },
  { id: 3, name: "price", checked: true },
  { id: 4, name: "qty", checked: true },
  { id: 5, name: "width", checked: true },
  { id: 6, name: "height", checked: true },
  { id: 7, name: "depth", checked: true },
  { id: 8, name: "widthmm", checked: true },
  { id: 9, name: "heightmm", checked: true },
  { id: 10, name: "depthmm", checked: true },
  { id: 11, name: "unit", checked: true },
  { id: 12, name: "notes", checked: true },
];
