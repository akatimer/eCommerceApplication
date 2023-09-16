import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import { getCart, removeCart } from '../../../utils/api/clientApi';
import { Cart } from '@commercetools/platform-sdk';

type Props = {
  setCart: React.Dispatch<React.SetStateAction<Cart | undefined>>;
};

const ClearCartBtn: React.FC<Props> = ({ setCart }) => {
  const [open, setOpen] = useState(false);

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
      <Button color="error" sx={{ fontFamily: 'Mulish' }} onClick={handleClickOpen}>
        Clear cart
      </Button>
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontFamily: 'Mulish' }}>Clear cart</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: 'Mulish' }}>
            Are you sure you want to delete all products including all entered promotional codes? It
            will be impossible to cancel this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" sx={{ fontFamily: 'Mulish' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" sx={{ fontFamily: 'Mulish' }} onClick={clearCartHandle} autoFocus>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClearCartBtn;
