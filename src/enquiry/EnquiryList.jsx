import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

function EnquiryList({ data, getAllenquiry, Swal, setFormData }) {
  function deleteRow(delid) {
    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://enquery-backend.onrender.com/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry Deleted Successfully");
            getAllenquiry();
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function editRow(editid) {
    axios
      .get(`https://enquery-backend.onrender.com/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      });
  }
  return (
    <>
      <div className="bg-gray-200 p-4">
        <h2 className="text-[30px] font-bold text-center text-blue-950 mb-4">
          Enquiry List
        </h2>
        <div className="overflow-auto border-2 border-solid border-y-black rounded-2xl">
          <table className="w-[100%] text-center">
            <thead>
              <tr className=" text-white bg-blue-950 ">
                <th className="p-2">SR NO.</th>
                <th className="p-2">NAME</th>
                <th className="p-2">EMAIL</th>
                <th className="p-2">PHONE NO.</th>
                <th className="p-2">MESSAGE</th>
                <th className="p-2">DELETE</th>
                <th className="p-2">UPDATE</th>
              </tr>
            </thead>
            <tbody>
              {data.length >= 1 ? (
                data.map((items, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b-2 border-solid border-black font-bold"
                    >
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{items.name}</td>
                      <td className="p-2">{items.email}</td>
                      <td className="p-2">{items.phone}</td>
                      <td className="p-2">{items.message}</td>
                      <td className="p-2">
                        <button
                          onClick={() => deleteRow(items._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-md cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => editRow(items._id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="bg-white ">
                  <td className="text-center text-[25px]" colSpan={7}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EnquiryList;
