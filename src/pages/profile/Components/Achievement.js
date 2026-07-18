import { makeStyles } from "styles/mui";

import DocIcon from "../Icons/DocIcon";
import ProjectIcon from "../Icons/ProjectIcon";
import UsersIcon from "../Icons/UsersIcon";
import FollowIcon from "../Icons/FollowIcon";

const styles = () => ({
  mediaIndicator: {
    fontSize: 18,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
    "& strong": {
      margin: "1px 0",
    },
    "& span": {
      fontSize: 13,
      opacity: 0.6,
    },
  },
  mediaIconsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    "@media (max-width: 1280px)": {
      marginTop: 40,
    },
  },
  valueLabel: {
    marginBottom: "-8px",
  },
});

const useStyles = makeStyles(styles);

function Achievement({ items }) {
  const classes = useStyles();
  return (
    <div className={classes.mediaIconsWrapper}>
      <div className={classes.mediaIndicator}>
        <DocIcon />
        <strong className={classes.valueLabel}>{items.submits}</strong>
        <span>Submits</span>
      </div>
      <div className={classes.mediaIndicator}>
        <ProjectIcon />
        <strong>{items.questions}</strong>
        <span>Questions</span>
      </div>
      <div className={classes.mediaIndicator}>
        <FollowIcon />
        <strong>{items.stars}</strong>
        <span>Stars</span>
      </div>
      <div className={classes.mediaIndicator}>
        <UsersIcon />
        <strong>{items.courses}</strong>
        <span>Courses</span>
      </div>
    </div>
  );
}

export default Achievement;
