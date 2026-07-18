import React from "react";
import { makeStyles } from "styles/mui";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TaskItem from "./TaskItem";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

const AntTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid rgba(185, 185, 185, 0.3)`,
  margin: "0 24px",
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 72,
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    fontFamily: ["Roboto", "sans-serif"].join(","),
    "&:hover": {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: theme.palette.text.primary,
    },
  }),
);

const styles = (theme) => ({
  root: {
    maxHeight: 325,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      width: "3px",
    },
    "&::-webkit-scrollbar-track": {
      width: "3px",
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D8D8D8",
      borderRadius: 5,
      outline: "1px solid #D8D8D8",
    },
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
  folderWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const useStyles = makeStyles(styles);

function CustomizedTabs({ items }) {
  const classes = useStyles();

  const [index, setIndex] = React.useState(0);

  const handleChange = (event, index) => {
    setIndex(index);
  };

  const dateOnly = new Date().toISOString().split("T")[0];

  const item0 = items.filter(
    (item) => item.date >= dateOnly && !item.submitted,
  );
  const item1 = items.filter((item) => item.date < dateOnly && !item.submitted);
  const item2 = items.filter((item) => item.submitted);

  return (
    <div className={classes.root}>
      <AntTabs value={index} onChange={handleChange}>
        <AntTab value={0} label="To do" />
        <AntTab value={1} label="Overdue" />
        <AntTab value={2} label="Submitted" />
      </AntTabs>
      <TabPanel value={index} index={0} style={{ padding: 0 }}>
        {item0.map((item, index) => (
          <TaskItem
            key={index}
            title={item.title}
            color={item.color}
            date={item.date}
          />
        ))}
      </TabPanel>
      <TabPanel value={index} index={1}>
        {item1.map((item, index) => (
          <TaskItem
            key={index}
            color={item.color}
            date={item.date}
            title={item.title}
          />
        ))}
      </TabPanel>
      <TabPanel value={index} index={2}>
        {item2.map((item, index) => (
          <TaskItem
            key={index}
            color={item.color}
            date={item.date}
            title={item.title}
          />
        ))}
      </TabPanel>
    </div>
  );
}

export default CustomizedTabs;
