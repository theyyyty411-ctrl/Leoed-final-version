import { Button } from "../../../components/Wrappers";
import { Grid, Typography } from "@mui/material";
import Dot from "../../../components/Dot/Dot";
import { makeStyles } from "styles/mui";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const styles = () => ({
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    paddingLeft: 10,
  },
  detailsWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
    paddingLeft: 0,
    width: "100%",
    bottom: 5,
  },
  legendItemsContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

const useStyles = makeStyles(styles);

function DonutChart({ items, total }) {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid
        size={{ xs: 12, md: 12, lg: 12 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: 0,
        }}
      >
        <Typography
          variant={"caption"}
          style={{
            position: "absolute",
            top: 60,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {total}
        </Typography>
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie data={items} innerRadius={40} outerRadius={60} dataKey="value">
              {items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={""} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
      <Grid
        size={{ xs: 12, md: 12, lg: 12 }}
        className={classes.legendItemsContainer}
      >
        {items.map(({ name, color }) => (
          <div key={color} className={classes.legendItemContainer}>
            <Dot color={color} style={{ marginLeft: 5 }} />
            <Typography
              color="text"
              variant={"caption"}
              style={{ fontSize: 14 }}
              noWrap
            >
              &nbsp;{name}&nbsp;
            </Typography>
          </div>
        ))}
      </Grid>
      <div className={classes.detailsWrapper}>
        <Button variant="outlined" color="primary">
          DETAILS
        </Button>
      </div>
    </Grid>
  );
}

export default DonutChart;
