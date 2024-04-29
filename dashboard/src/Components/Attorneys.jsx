import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Attorneys = () => {
  const [attorney, setAttorney] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchAttorneys = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5757/api/v1/user/attorney",
          { withCredentials: true }
        );
        setAttorney(data.attorney);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchAttorneys();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>Attorney</h1>
      <div className="banner">
        {attorney && attorney.length > 0 ? (
          attorney.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.AttorneyAvatar && element.AttorneyAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.AttorneyDepartment}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Attorneys Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Attorneys;