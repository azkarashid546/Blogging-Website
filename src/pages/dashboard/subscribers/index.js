import React from "react";

const index = ({ data, totalSubsribers }) => {
  return (
    <>
      <div className="contact-details">
        <div className="contact-details-heading">
          <h1>Subscribers</h1>
        </div>
        <div className="total-subscibers">
          <span>Total Subscribers : {totalSubsribers}</span>
        </div>
        <div className="user-dashboard-blogs-tables">
          {data.message.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.message.map((v) => (
                  <tr key={v._i}>
                    <td>{v.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ textAlign: "center", fontSize: "40px" }}>
                No Subscribers Here
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps({ params }) {
  const response = await fetch(
    "http://localhost:3000/api/newsletter/getallnewsletter"
  );
  const data = await response.json();

  const totalSubsribers = data.message.length;
  return {
    props: {
      data,
      totalSubsribers,
    },
  };
}
