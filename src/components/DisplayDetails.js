function DisplayDetails({employees}){
    return(
        <div className="display-container">
            <div className="display-header">
            <h4 className="display-heading">Employee Details</h4>
            </div>

{employees.map((data)=>{
    const {id, name,surname, email, image, dateOfBirth, biography, position,
        cellPhone} = data

        return(<div className="display-card" key={cellPhone} >
                
                <div className="display-card-image">
                    <img src={image} alt="profile-pic" />
                </div>
                <div className="display-card-content"> 
                    <p> {biography}</p>
                    <p>{name} {surname}</p>
                    <p> {email}</p>
                    <p>{dateOfBirth}</p>
                    <p> {position}</p>
                    <p> {cellPhone}</p>
                
                </div>
                </div>
)
})}
                   </div>
    )
}

export default DisplayDetails