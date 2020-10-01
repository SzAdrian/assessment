import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import LockButton from "./LockButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import EditButton from "./EditButton";
import styled from "styled-components";
export default function MoreMenu({ row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const MenuStyle = styled(Menu)`
    .MuiMenu-list {
      display: flex;
      flex-direction: column;
    }
  `;
  return (
    <>
      <IconButton
        className="lock"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <MenuStyle
        id="more-menu"
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={() => <LockButton row={row} />} />

        <MenuItem
          component={() => (
            <EditButton handleClose={handleClose} uid={row.id} />
          )}
        />
      </MenuStyle>
    </>
  );
}
