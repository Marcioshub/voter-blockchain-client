import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import VotesTable from "../components/VotesTable";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(5),
    textAlign: "center"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    textAlign: "center",
    margin: theme.spacing(3)
  },
  blockdata: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".55rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem"
    }
  }
}));

export default function Votes() {
  const classes = useStyles();
  const history = useHistory();

  const SERVER = process.env.REACT_APP_SERVER;

  const [blockchain, setBlockchain] = useState(null);

  useEffect(() => {
    createRows();

    // eslint-disable-next-line
  }, []);

  function createRows() {
    //let rows = [];
    let items = [];

    axios
      .get(`${SERVER}/blockchain`)
      .then(function(response) {
        // handle success
        console.log(response.data.blockchain);

        for (let i = 0; i < response.data.blockchain.length; i++) {
          items.push(
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Block {i}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ justifyContent: "center" }}>
                <Typography className={classes.blockdata}>
                  id: {JSON.stringify(response.data.blockchain[i].id)}
                  <br />
                  vote: {JSON.stringify(response.data.blockchain[i].vote)}
                  <br />
                  prev_hash:{" "}
                  {JSON.stringify(response.data.blockchain[i].prev_hash)}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }

        setBlockchain(items);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="md">
        <VotesTable />
        <br />
        {blockchain !== null ? blockchain : null}
      </Container>
      <CssBaseline />
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
        className={classes.button}
      >
        Go Back Home
      </Button>
    </div>
  );
}

/*

akmsdklmaksmdasdmklmdk
*/
