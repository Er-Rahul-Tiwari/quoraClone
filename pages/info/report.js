import React, { useState } from "react";
import NavbarSearch from "../../src/Layouts/NavbarSearch";
import axiosConfig from "../../src/Utils/axiosConfig";
import { Modal, CircularProgress, makeStyles } from "@material-ui/core";
import AlertboxComponent from "../../src/Components/alertboxComponent/alertboxComponent";

const useStyles = makeStyles((theme) => ({
  progress: {
    color: "#ffffff", 
  },
}));

function Report() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success_failure_open, setSuccessFailureOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(false);

  const success_failure = () => {
    return (
      <Modal open={success_failure_open} onClose={handleClose}>
        <AlertboxComponent close={handleClose} message={message} />
      </Modal>
    );
  };

  const handleOpen = () => {
    setSuccessFailureOpen(true);
    document.getElementById("modalbackground").style.filter = "blur(3px)";
  };

  const handleClose = () => {
    setSuccessFailureOpen(false);
    document.getElementById("modalbackground").style.filter = "none";
  };

  const reportIssue = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    if (title && description) {      
      axiosConfig
        .post("/api/misc/report-issue/", data)
        .then((response) => {
          if (response.status != 200) throw new Error();
          setMessage("Your report has been submitted");
          handleOpen();
          document.getElementById("description").value = "";
          document.getElementById("title").value = "";
          setProgress(false);
        })
        .catch((error) => {
          console.log(error);
        });        
    } else {
      setMessage("You need to fill both the fields, title and description");
      handleOpen();
    }
  };

  const submitButton = () => {
    if(progress){
      return(
        <button
            style={{
              backgroundColor: "#4f4f4f",
              color: "floralwhite",
              borderRadius: "2px",
              float: "right",
            }}
            className="btn btn--black"
            type="submit"
          >
            <label
              className="font"
              style={{ cursor: "pointer", padding: "0px 30px 0px 30px", color: "white" }}
            >
              <CircularProgress size={22} className={classes.progress}/>              
            </label>
          </button>
      )
    }
    return (
      <button
        style={{
          backgroundColor: "#4f4f4f",
          color: "floralwhite",
          borderRadius: "2px",
          float: "right",
        }}
        className="btn btn--black"
        type="submit"
      >
        <label
          className="font"
          style={{ cursor: "pointer", padding: "0px 30px 0px 30px" }}
        >
          Submit       
        </label>
      </button>
    );
  };

  return (
    <div className="reports" id="modalbackground">
      {success_failure()}
      <NavbarSearch />
      <div className="arrNavs report__mt">
        {/* <div className="arrNav"> */}
          <svg
            className="arrNav__icon u-margin-bottom-small bp__small--none"
            viewBox="0 0 25 13"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => history.back()}
          >
            <path d="M23.9277 6.71484H1.39802" />
            <path d="M6.16601 11.8755L1.04245 6.82883L6.16601 1.34288" />
          </svg>
          <h2 className="heading-2 weight-600 report__mt font">Report issue</h2>
        {/* </div> */}
      </div>

      <div className="answer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            reportIssue();
            setProgress(true);
          }}
        >
          <div className="report__select font">
            <input
              id="title"
              className="font"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              style={{
                width: "100%",
                outline: "none",
                border: "none",
                fontSize: "16px",
                backgroundColor: "#fafafa",
              }}
              placeholder="Type your issue in brief"
            ></input>
          </div>
          <textarea
            id="description"
            name="message"
            rows="6"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your issue"
            className="report__area u-margin-top-medium font"
            style={{ resize: "none" }}
          ></textarea>
          {submitButton()}
        </form>
      </div>
    </div>
  );
}

export default Report;
