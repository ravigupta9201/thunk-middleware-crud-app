import React from "react";
import { useState } from "react";
// import { fetchUser } from "../reducers/UserReducer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../reducers/UserReducer";

const Edit = () => {
  let { id } = useParams();
  const state = useSelector((state) => state.api_Fetch);
  const existingUser = state.data?.find((f) => f.id === parseInt(id));
  const { name, email, address } = existingUser;
  console.log(existingUser);
  console.log(name);
  console.log(address);

  const [formData, setFormData] = useState({
    name,
    email,
    address: address.street,
  });

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    const { name, email, address } = formData;
    console.log(address, "address!!!");
    e.preventDefault();
    dispatch(
      updateUser({
        id: existingUser.id,
        name,
        email,
        address,
      })
    );
    navigate("/");
  };

  return (
    <>
      <div className="w-50 m-auto p-4 ">
        <form action="" onSubmit={handleUpdate}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="name"
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="email"
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              placeholder="Address"
              className="form-control"
            />
          </div>
          <button className="btn bg-success text-white my-3">Update</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
