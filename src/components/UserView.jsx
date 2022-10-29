import React from "react";
import GoNewEvent from "./GoNewEvent";
import ResultsOfEvent from "./ResultsOfEvent";

const UserView = ({user}) => {
  return (
      <div className="d-flex flex-column flex-md-row justify-content-around flex-wrap pt-5 m-4 mt-5">
        <div className="mb-3">
          <GoNewEvent user={user}/>
        </div>
        <div className="mb-3">
          <ResultsOfEvent user={user}/>
        </div>
      </div>
  );
};

export default UserView;
