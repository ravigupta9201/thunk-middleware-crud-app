import { useSelector, useDispatch } from "react-redux";
import { deleteUser, fetchUser } from "../reducers/UserReducer";
import { Link } from "react-router-dom";

const View = () => {
  const state = useSelector((state) => state.api_Fetch);
  console.log("state:", state);
  const dispatch = useDispatch();

  if (state.isLoading) {
    return <h1>Loading...</h1>;
  } else if (state.isError) {
    return <h1>Error...!</h1>;
  }

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  return (
    <>
      <div>
        <button
          className="btn bg-primary text-white"
          onClick={(e) => dispatch(fetchUser())}
        >
          Fetch Api
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.data?.map((s, index) => (
              <tr key={index}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address.street}</td>
                <td>
                  <Link
                    to={`/edit/${s.id}`}
                    className="btn bg-success text-white mx-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="btn bg-danger text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {state.data?.map((s, index) => (
        <ul key={index}>
          <li>{s.id}</li>
          <li>{s.name}</li>
        </ul>
      ))} */}

        {/* {state.api_Fetch.data &&
        state.api_Fetch.data.map((s) => <li>{s.name}</li>)} */}
      </div>
    </>
  );
};

export default View;
