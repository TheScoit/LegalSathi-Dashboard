import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewAttorney = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [attorneyDepartment, setAttorneyDepartment] = useState("");
  const [AttorneyAvatar, setAttorneyAvatar] = useState("");
  const [AttorneyAvatarPreview, setAttorneyAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Criminal Lawyer",
    "Civil Lawyer",
    "Family Lawyer",
    "Employment Lawyer",
    "Contract Lawyer",
    "Corporate Lawyer",
    "Immigration Lawyer",
    "Personal injury Lawyer",
    "Intellectual property Lawyer",
    "Tax Lawyer",
    "Bankruptcy Lawyer",
    "Constitutional Lawyer",
    "DUI Lawyer",
    "Disability Lawyer",
    "Sports Lawyer",
    "International Lawyer",
    "Education Lawyer"
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAttorneyAvatarPreview(reader.result);
      setAttorneyAvatar(file);
    };
  };

  const handleAddNewAttorney = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("AttorneyDepartment", attorneyDepartment);
      formData.append("AttorneyAvatar", AttorneyAvatar);
      await axios
        .post("http://localhost:5757/api/v1/user/attorney/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-doctor-form">
        <h1 className="form-title">REGISTER A NEW ATTORNEY</h1>
        <form onSubmit={handleAddNewAttorney}>
          <div className="first-wrapper">
            <div>
              <img
                src={
                  AttorneyAvatarPreview ? `${AttorneyAvatarPreview}` : "https://i.pinimg.com/474x/93/da/b8/93dab89d3b37d9d243722e331273e606.jpg"
                }
                alt="Doctor Avatar"
              />
              <input className="avatar" type="file" onChange={handleAvatar} />
            </div>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={attorneyDepartment}
                onChange={(e) => {
                  setAttorneyDepartment(e.target.value);
                }}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Register New Attorney</button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAttorney;