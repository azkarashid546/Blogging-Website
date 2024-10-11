import React from 'react'

const index = ({data}) => {
  return (
    <>
      <div className="contact-details">
        <div className="contact-details-heading">
            <h1>Contact Details</h1>
        </div>
        <div className="user-dashboard-blogs-tables">
            {data.message.length > 0 ? (  <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                    {data.message.map((v)=> (
                    <tr>
                       <td>{v.name}</td>
                       <td>{v.email}</td>
                       <td>{v.contactno}</td>
                       <td>{v.message}</td>
                    </tr>
                    ))}
                    
                </tbody>
              </table>) : (
                  <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ textAlign: "center", fontSize: "40px" }}>
                    No Contacts Here
                  </p>
                </div>
              )}
            
            </div>
      </div>
    </>
  )
}

export default index
export async function getServerSideProps({ params }) {
    const response = await fetch(
      "http://localhost:3000/api/contactus/getallcontact"
    );
    const data = await response.json();
  
    return {
      props: {
        data,
      },
    };
  }
  