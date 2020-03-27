import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Prompt(props) {
  const [open, setOpen] = useState(false);

  const [blockIndex, setBlockIndex] = useState(null);
  const [hash, setHash] = useState(null);
  const [vote, setVote] = useState(null);
  const [prevHash, setPrevHash] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (props.block !== undefined) {
      setOpen(true);
      setBlockIndex(props.block.blockIndex);
      setVote(props.block.vote);
      setHash(props.block.hash);
      setPrevHash(props.block.prev_hash);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Voter Receipt</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="overline" display="block" gutterBottom>
              Your Block Index: {blockIndex}
              <br />
              Vote: {vote}
              <br />
              Hash: {hash}
              <br />
              Prev_hash: {prevHash}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
