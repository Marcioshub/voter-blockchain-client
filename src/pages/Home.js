import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

import turd from "../images/turd.jpg";
import douche from "../images/douche.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    textAlign: "center"
  },
  input: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  form: {
    display: "flex",
    width: "100%",
    marginTop: theme.spacing(3),
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(3)
  },
  image: {
    height: "300px",
    width: "300px"
  }
}));

export default function Home(props) {
  const classes = useStyles();
  const history = useHistory();

  const [id, setId] = useState("");
  const [secret, setSecret] = useState("");

  const [state, setState] = useState({
    turd: false,
    douche: false
  });

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const SERVER = process.env.REACT_APP_SERVER || "http://localhost:5000";

  function handleChange(v) {
    switch (v) {
      case "turd":
        setState({
          turd: true,
          douche: false
        });
        break;

      case "douche":
        setState({
          turd: false,
          douche: true
        });
        break;

      default:
        return;
    }
  }

  function submitVote() {
    if (id === "" || secret === "") {
      console.log("please do not leave any empty fields");
      setErrorMessage("please do not leave any empty fields");
      setOpen(true);
    }

    if (state.turd || state.douche) {
      console.log("id", id);
      console.log("secret", secret);
      console.log("vote", state.turd);
      axios
        .post(`${SERVER}/vote`, {
          id: id,
          secret: secret,
          vote: state.turd === true ? "turd" : "douche"
        })
        .then(function(response) {
          // handle success
          console.log("yay vote sent", response);
          history.push({
            pathname: "/votes",
            state: {
              hash: response.data.hash,
              vote: response.data.vote,
              prev_hash: response.data.prev_hash,
              blockIndex: response.data.blockIndex
            }
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          setErrorMessage(error.message);
          setOpen(true);
        })
        .then(function() {
          // always executed
        });
    } else {
      console.log("please choose a candidate");
      setErrorMessage("please choose a candidate");
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setErrorMessage("");
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={errorMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <Typography
        style={{ marginTop: "5%" }}
        variant="h3"
        component="h3"
        gutterBottom
      >
        Vote Blockchain
      </Typography>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="body2" gutterBottom>
          Vote for your president without fear of retaliation incase they lose.
          Everyone will be aware that you voted from your id, but they won't be
          able to fiqure out who you voted for. Your vote will be added on a
          blockchain and hashed.
        </Typography>
      </Container>
      <br />
      <div style={{ display: "inlineBlock" }}>
        <img src={douche} alt="douche" className={classes.image} />
        <img src={turd} alt="turd" className={classes.image} />
      </div>

      <CssBaseline />
      <TextField
        className={classes.input}
        inputProps={{ maxLength: 9 }}
        helperText={`${id.length}/9`}
        id="id"
        label="Voter ID"
        variant="outlined"
        onChange={e => setId(e.target.value)}
      />
      <TextField
        className={classes.input}
        type="password"
        inputProps={{ maxLength: 20 }}
        helperText={`${secret.length}/20`}
        id="secret"
        label="Secret"
        variant="outlined"
        onChange={e => setSecret(e.target.value)}
      />
      <br />

      <form className={classes.form} noValidate autoComplete="off">
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">SELECT YOUR VOTE</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.douche}
                  onChange={() => handleChange("douche")}
                  value="douche"
                />
              }
              label="Giant Douche"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.turd}
                  onChange={() => handleChange("turd")}
                  value="turd"
                />
              }
              label="Turd Sandwich"
            />
          </FormGroup>
        </FormControl>
        <br />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={submitVote}
        >
          Submit Vote
        </Button>
      </form>
    </div>
  );
}
