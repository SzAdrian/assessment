import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import Skeleton from "react-loading-skeleton";
import _ from "lodash";
import Axios from "axios";
const ModalStyled = styled.div`
  display: block;
  position: fixed;
  z-index: 1000;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 1rem;
    width: 80%;

    max-width: 500px;
    overflow: hidden;
  }

  #close {
    position: absolute;
    right: 1rem;
    /*float: right;*/
    z-index: 1001;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .MuiTextField-root {
    max-width: 350px;
    margin-top: 1.5rem;
    width: 60%;
  }

  .input-container > span,
  .react-loading-skeleton {
    max-width: 350px;
    margin-top: 1rem;
    width: 100%;
  }
  .title {
    text-align: center;
    width: 80%;
  }
  #done {
    margin-top: 1.5rem;
  }

  @media only screen and (hover: none) and (pointer: coarse),
    (max-width: 430px) {
    padding-top: 0;
    .modal-content {
      border-radius: 0;
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      max-width: none;
    }

    .input-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-top: 2rem;
    }
    .MuiTextField-root {
      width: 80%;
    }
    .input-container > span {
      text-align: center;
    }
    .react-loading-skeleton {
      width: 80%;
    }
    #close {
      right: 0;
    }
  }
`;
const statuses = [
  { label: "Active", value: "active" },
  { label: "Locked", value: "locked" },
];
function FormModal(props) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("active");
  const [loadingUser, setLoadingUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { rows, setRows } = useContext(AppContext);
  const history = useHistory();
  const loadUser = useCallback(
    (uid) => {
      setLoadingUser(true);
      Axios.get(process.env.REACT_APP_API_URL + "/users/" + uid + ".json")
        .then((resp) => {
          setLoadingUser(false);
          setUser(resp.data);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
          history.push("/");
        });
    },
    [history]
  );
  useEffect(() => {
    if (props.match.params.uid) {
      loadUser(props.match.params.uid);
    }
  }, [props.match.params.uid, loadUser]);

  useEffect(() => {
    setStatus(user !== null ? user.status : "active");
    setFirstName(user !== null ? user.first_name : "");
    setLastName(user !== null ? user.last_name : "");
  }, [user]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    history.push("/user-table");
  };
  const title = props.match.params.uid ? "Edit User" : "Add New User";

  const EditUserInRows = (uid) =>
    rows.map((r) =>
      r.id.toString() === uid
        ? {
            ...r,
            first_name: firstName,
            last_name: lastName,
            status: status,
            updated_at: new Date().toISOString(),
          }
        : r
    );

  const editUser = () => {
    let uid = props.match.params.uid;
    setLoading(true);

    fetch(process.env.REACT_APP_API_URL + "/users/" + uid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        status: status,
      }),
    })
      .then((resp) => {
        setLoading(false);
        if (resp.ok) {
          setErrors({});
          setRows(EditUserInRows(uid));
        } else {
          return resp.json();
        }
      })
      .then((json) => setErrors({ ...json }))
      .catch((err) => console.log(err));
  };
  const addNewUser = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + "/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        status: status,
      }),
    })
      .then((resp) => {
        setLoading(false);
        if (!resp.ok) {
          resp.json().then((data) => setErrors({ ...data }));
        } else {
          resp.json().then((data) => {
            setErrors({});
            setRows([{ ...data }, ...rows]);
            setFirstName("");
            setLastName("");
            setStatus("active");
          });
        }
      })

      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.match.params.uid) {
      editUser();
    } else {
      addNewUser();
    }
  };

  return (
    <ModalStyled id="myModal" className="modal">
      <Slide
        direction="down"
        in={["new", "edit"].includes(
          history.location.pathname.replace(/^\/([^/]*).*$/, "$1")
        )}
      >
        <div data-testid="modal-content" className="modal-content">
          <IconButton onClick={handleClose} id="close">
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit} className="input-container">
            <Typography
              data-testid="modal-title"
              className="title"
              variant="h4"
              component="h4"
            >
              {title}
            </Typography>
            {loadingUser ? (
              <>
                <Skeleton height={50} />
                <Skeleton height={50} />
                <Skeleton height={50} />
              </>
            ) : (
              <>
                <TextField
                  onChange={(e) => setFirstName(e.target.value)}
                  id="first_name_input"
                  label="First Name"
                  multiline
                  error={_.has(errors, "first_name")}
                  helperText={
                    errors.first_name
                      ? errors.first_name.toString().toUpperCase()
                      : ""
                  }
                  rowsMax={4}
                  variant="outlined"
                  value={firstName}
                />
                <TextField
                  onChange={(e) => setLastName(e.target.value)}
                  id="last_name_input"
                  label="Last Name"
                  multiline
                  error={_.has(errors, "last_name")}
                  helperText={
                    errors.last_name
                      ? errors.last_name.toString().toUpperCase()
                      : ""
                  }
                  rowsMax={4}
                  variant="outlined"
                  value={lastName}
                />
                <TextField
                  id="status-select"
                  select
                  label="Status"
                  value={status}
                  onChange={handleChange}
                  helperText="Please select a user status"
                  variant="outlined"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}

            {loading ? (
              <CircularProgress id="done" />
            ) : (
              <Button
                disabled={loadingUser}
                type="submit"
                id="done"
                variant="contained"
                color="primary"
              >
                Done
              </Button>
            )}
          </form>
        </div>
      </Slide>
    </ModalStyled>
  );
}

export default FormModal;
