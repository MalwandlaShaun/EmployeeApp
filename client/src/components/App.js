import Form from "./Form";
import DisplayDetails from "./DisplayDetails";
//import "./App.css";
import { useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
//import { login } from "../features/auth/authSlice";
import { setEmployees } from "../features/auth/authSlice";
//import { useEffect } from "react";

function App() {
  // const [employees, setEmployees] = useState([]);
  // const [editID, setEditID] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  //const { email, password } = useSelector((state) => state.auth);
  // const state = useSelector((state) => state.auth);
  // console.log(state);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  //useEffect(() => {}, [email, password]);

  // const handleImageUpload = (image) => {
  //   setSelectedImage(image);
  // };

  // const editItem = (id) => {
  //   setIsEditing(true);
  //   setEditID(id);
  // };
  const fetchEmployees = () => {
    axios
      .get("http://localhost:3500/employees")
      .then((response) => {
        const data = response.data;
        console.log(data);

        dispatch(setEmployees(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  //console.log("this is the data in the employees array");
  //console.log(employees);

  return (
    <div className="App">
      <Form />
      <DisplayDetails />
    </div>
  );
}

export default App;
