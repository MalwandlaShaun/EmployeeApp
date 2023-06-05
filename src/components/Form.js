import { useState } from "react"

const Form = () => {

const [name, setName] = useState("");
const [surname, setSurname] = useState("");
const [email, setEmail] = useState("");
const [image, setImage] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [biography, setBiography] = useState("");
const [position, setPosition] = useState("");
const [cellPhone, setCellPhone] = useState("");


    return(
        <div className="form-container">
            <h1>Employee Details</h1>
            <form >
                <div className="form-content" >
                    <label htmlFor="name"> Name :</label>
                    <input id="name" type="text" placeholder="Enter Your Name" onChange={(event)=> {
                        setName(event.target.value)
                    }}/>

                    <label htmlFor="surname"> Surname :</label>
                    <input id="surname" type="text" placeholder="Enter Your Surname" onChange={(event)=> {
                        setSurname(event.target.value)
                    }}/>

                    <label htmlFor="email"> Email Address :</label>
                    <input id="email" type="email" placeholder="Enter your Email Adress" onChange={(event)=> {
                        setEmail(event.target.value)
                    }}/>

                    <div className="input-file">
                    <label htmlFor="name"> Upload image :</label>
                    <input type="file" name="image" onChange={(event)=> {
                        setImage(event.target.value)
                    }}/>
                    </div>

                    <label htmlFor="name"> Date Of Birth :</label>
                    <input type="date" id="dob" name="dob" placeholder="Enter your Date Of Birth" onChange={(event)=> {
                        setDateOfBirth(event.target.value)
                    }} />

                    <label htmlFor="name"> Biography :</label>
                    <textarea id="myTextarea" name="message" rows="4" cols="50" placeholder="Enter your Biography" onChange={(event)=> {
                        setBiography(event.target.value)
                    }}></textarea> 

                    <label htmlFor="position"> Position :</label>
                    <input id="position" type="text" placeholder="Enter Your Position" onChange={(event)=> {
                        setPosition(event.target.value)
                    }}/>

                    <label htmlFor="phone"> CellPhone Number :</label>
                    <input id="phone" type="number" placeholder="Enter Your CellPhone Number" onChange={(event)=> {
                        setCellPhone(event.target.value)
                    }}/>

                    <input type="submit" className="submit-btn" />


                </div>

            </form>
        </div>
    )
}

export default Form