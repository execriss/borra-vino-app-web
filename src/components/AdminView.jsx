import React from "react";
import AddUser from "./AddUser";
import AddEvent from "./AddEvent";
import GoNewEvent from "./GoNewEvent";
import ResultsOfEvent from "./ResultsOfEvent";
import EditEvent from "./EditEvent";


const AdminView = ({user}) => {

  return (
    <>
      <div className="">
        <div className="d-flex flex-column flex-md-row justify-content-between flex-wrap pt-2 m-4">
            <div className="mb-2">
              <AddUser />
            </div>
            <div className="mb-2">
              <AddEvent />
            </div>
            <div className="mb-2">
              <EditEvent />
            </div>
            <div className="mb-2">
              <GoNewEvent user={user}/>
            </div>
            <div className="">
              <ResultsOfEvent user={user}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default AdminView;
