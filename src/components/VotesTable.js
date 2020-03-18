import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
    textAlign: "center"
  }
});

export default function VotesTable() {
  const classes = useStyles();

  const SERVER = process.env.REACT_APP_SERVER;

  const [turdVotes, setTurdVotes] = useState(0);
  let [doucheVotes, setDoucheVotes] = useState(0);
  let [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    axios
      .get(`${SERVER}/blockchain`)
      .then(function(response) {
        // handle success
        //console.log(response);

        for (let i = 0; i < response.data.blockchain.length; i++) {
          console.log(response.data.blockchain[i].vote);

          if (response.data.blockchain[i].vote === "douche") {
            setDoucheVotes(prev => prev + 1);
          }
          if (response.data.blockchain[i].vote === "turd") {
            setTurdVotes(prev => prev + 1);
          } else {
            continue; // skip genesis block
          }
        }

        setTotalVotes(response.data.blockchain.length - 1);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Giant Douche</TableCell>
                <TableCell>Turd Sandwich</TableCell>
                <TableCell>Total Votes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  {doucheVotes}
                </TableCell>
                <TableCell component="th" scope="row">
                  {turdVotes}
                </TableCell>
                <TableCell component="th" scope="row">
                  {totalVotes}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fragment>
  );
}
