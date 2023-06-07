import { Table } from "./Table";


function DisplayDetails({ data }) {


  return (
    <div className="display-container">
      
      <Table data={data} />
    </div>
  );
}

export default DisplayDetails;
