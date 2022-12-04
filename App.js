import {useState, useEffect} from "react";
import "./App.css";

function App() {
    const initialValues = { username: "", email: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

const handleChange = (e) => {
    console.log(e.target);
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    
};

const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
};

useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
    }
}, [formErrors]);

const validate = (values) => {
const errors = {}
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
if(!values.username) {
    errors.username = "Username is required";
}
if(!values.email) {
    errors.email = "Email is required";
} else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format";
}
return errors;
};

    return (
        <div className="container">
            <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div className="ui divider">  </div>
                <div className="ui form">  
                <div className="field">  
                <label>Username</label>
                <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange}/>
                </div>
                <p>{formErrors.username}</p>
                <div className="field">  
                <label>Email</label>
                <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleChange}/>
                </div>
                <p>{formErrors.email}</p>
                <button className="fluid ui button blue">Submit</button>
                </div>
               

            </form>
            </div>
    );
}

export default App;