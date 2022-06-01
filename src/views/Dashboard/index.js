import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router";

// css import
import "./Dashboard.scss";

// redux actions
import { setAllProjects } from "../../redux/Project/projectaction";
import {
    setLoadingFalse,
    setLoadingTrue,
} from "../../redux/Loading/loadingAction";

// custom service imports
import { getAllProjects } from "../../services/project.services";
import { getlastUpdatedData } from "../../services/data.services";
import Typography from "@material-ui/core/Typography";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Dashboard = () => {
    // variables
    const isLogged = useSelector((state) => state.auth.isLogged);
    const loading = useSelector((state) => state.loading.loading);
    const dispatch = useDispatch();
    const history = useHistory();
    const tokenStorage = JSON.parse(localStorage.getItem("token"));
    const [showUpdatedProjects, setShowUpdatedProjects] = useState([]);
    const classes = useStyles();

    // navigate to the /project/{projectID}/graph/{dataId}
    const projectClickHandler = (projectID, dataID) => {
        history.push(`/project/${projectID}/graph/${dataID}`);
    };

    useEffect(() => {
        const startup = async () => {
            dispatch(setLoadingTrue());

            if (tokenStorage) {
                const allProjects = await getAllProjects(
                    tokenStorage.token
                ).catch((err) => {
                    console.log(err.message);
                });
                if (allProjects === undefined) {
                    return <Redirect to="/login" />;
                }

                dispatch(setAllProjects(allProjects.data));
                dispatch(setLoadingFalse());

                const getUpdatedProjects = await getlastUpdatedData(
                    tokenStorage.token
                );
                setShowUpdatedProjects(getUpdatedProjects.data);
                console.log(getUpdatedProjects);
            }
        };
        startup();
    }, []);

    // redirect to login if user is not logged in
    if (!isLogged) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="Dashboard__container ">
            <div className="Dashboard__content-container Dashboard-component">
                <Typography variant="h4" className="Dashboard__header">
                    Last Updated
                </Typography>

                {showUpdatedProjects.length === 0 ? (
                    <Typography className="Dashboard__no-data">
                        No data has been sent!!!
                    </Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Parameter</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">Project</TableCell>
                                    <TableCell align="right">
                                        Last Updated
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showUpdatedProjects.map((row) => (
                                    <TableRow
                                        key={row.dataID}
                                        onClick={() =>
                                            projectClickHandler(
                                                row?.projectID,
                                                row.fieldName
                                            )
                                        }
                                        className="Dashboard__table-row"
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.fieldName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.value}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row?.projectName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.createdAt}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
