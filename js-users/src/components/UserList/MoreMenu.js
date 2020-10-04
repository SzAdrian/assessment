import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import LockButton from "./LockButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { IconButton } from "@material-ui/core";
import EditButton from "./EditButton";
import styled from "styled-components";

const MenuStyle = styled(Menu)`
  .MuiMenu-list {
    display: flex;
    flex-direction: column;
  }
  .MuiButton-root {
    width: 100%;
    justify-content: space-around;
  }
  li.MuiListItem-root {
    padding: 0;
  }
`;
export default function MoreMenu({ row }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={row.id}
        data-testid={"more-menu-button"}
        className="lock"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <MenuStyle
        data-testid={"more-menu-list" + row.id}
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem disableGutters={true}>
          {" "}
          <LockButton data-testid={"more-menu-lock-button"} row={row} />
        </MenuItem>

        <MenuItem disableGutters={true}>
          <EditButton
            data-testid="more-menu-edit-button"
            handleClose={handleClose}
            uid={row.id}
          />
        </MenuItem>
      </MenuStyle>
    </>
  );
}
