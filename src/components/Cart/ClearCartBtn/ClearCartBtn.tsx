import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import React from 'react';
import { getCart, removeCart } from '../../../utils/api/clientApi';
import { Cart } from '@commercetools/platform-sdk';

type Props = {
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

const ClearCartBtn: React.FC<Props> = ({ setCart }) => {
  const [open, setOpen] = React.useState(false);

  const clearCartHandle = (): void => {
    getCart().then((response) => {
      if (response) {
        removeCart(response.body.id, response.body.version).then(() => {
          setCart(undefined);
        });
      }
    });
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Clear cart
      </Button>
      <Dialog maxWidth="xs" sx={{ maxHeight: '100' }} open={open} onClose={handleClose}>
        <DialogTitle>Clear Cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all products including all entered promotional codes? It
            will be impossible to cancel this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clearCartHandle} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClearCartBtn;
