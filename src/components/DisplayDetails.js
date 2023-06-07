import { Table } from "./Table";

function DisplayDetails({ employees }) {
  return (
    <div className="display-container">
      <Table employees={employees} />
    </div>
  );
}

export default DisplayDetails;
