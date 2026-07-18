import React, { useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  TableSortLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

//config
import config from "../../config";

// Material UI icons
import { Close as CloseIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import useStyles from "./styles";

//context
import {
  useFieldsState,
  getFieldsRequest,
  deleteFieldRequest,
} from "../../context/AdminContext";

// components
import Widget from "../../components/Widget";
import { Typography, Button, Link } from "../../components/Wrappers";
// import Notification from "../../components/Notification";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  { id: "field", numeric: true, disablePadding: false, label: "Field" },
  { id: "value", numeric: true, disablePadding: false, label: "Value" },
  { id: "label", numeric: true, disablePadding: false, label: "Label" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "right"}
            padding={headCell.disablePadding ? "none" : null}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function FieldPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useFieldsState();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [backFields, setBackFields] = React.useState(context.fields.fields);

  useEffect(() => {
    getFieldsRequest(context.setFields);
  }, []);

  useEffect(() => {
    setBackFields(context.fields.fields);
  }, [context]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, backFields.length - page * rowsPerPage);

  const deleteField = (id, event) => {
    deleteFieldRequest({
      id,
      navigate,
      pathname: location.pathname,
      dispatch: context.setFields,
    });
    event.stopPropagation();
  };

  const openFieldEdit = (event, id) => {
    navigate(`/app/admin/field/edit/${id}`);
    event.stopPropagation();
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Widget
            disableWidgetMenu
            header={
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box display={"flex"}>
                  <Typography
                    variant="h6"
                    color="text"
                    colorBrightness={"secondary"}
                    noWrap
                  >
                    Fields
                  </Typography>
                  <Box alignSelf="flex-end" ml={1}>
                    <Typography
                      color="text"
                      colorBrightness={"hint"}
                      variant={"caption"}
                    >
                      {backFields.length} total
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant={"contained"}
                  component={RouterLink}
                  to={"/app/admin/field/create"}
                  color={"success"}
                >
                  Create Field
                </Button>
              </Box>
            }
          >
            {config.isBackend && !context.fields.isLoaded ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress size={26} />
              </Box>
            ) : (
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    // onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={backFields.length}
                  />

                  <TableBody>
                    {stableSort(backFields, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            selected={isItemSelected}
                            key={row.id}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell>{row.field}</TableCell>
                            <TableCell padding="none">{row.value}</TableCell>
                            <TableCell padding="none">{row.label}</TableCell>

                            <TableCell>
                              <Box display={"flex"} alignItems={"center"}>
                                <Button
                                  color="success"
                                  size="small"
                                  style={{ marginRight: 16 }}
                                  variant="contained"
                                  onClick={(e) => openFieldEdit(e, row.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  color="secondary"
                                  size="small"
                                  variant="contained"
                                  onClick={(e) => deleteField(row.id, e)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={backFields.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "previous page",
              }}
              nextIconButtonProps={{
                "aria-label": "next page",
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

// eslint-disable-next-line no-unused-vars
function CloseButton({ closeToast, className }) {
  return <CloseIcon className={className} onClick={closeToast} />;
}

export default FieldPage;
