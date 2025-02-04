import React,{useEffect, useState} from "react";
import axios from 'axios';
import {  toast } from 'react-toastify';
import EnquiryList from "./enquiry/EnquiryList";
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js'

const Enquiry = () => {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id:""
  });
  let saveEnquiry = (e) => {
    e.preventDefault();
    // let formData={
    //   name:e.target.name.value,
    //   email:e.target.email.value,
    //   phone:e.target.phone.value,
    //   message:e.target.message.value
    // }
       
    if (formData._id) {
      axios.put(`https://enquery-backend.onrender.com/api/website/enquiry/update/${formData._id}`, formData)
      .then((res)=>{
        toast.success("Enquiry updated Successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id:''
        });
        getAllenquiry(); 
      })
      
    }else{
      axios
      .post("https://enquery-backend.onrender.com/api/website/enquiry/insert", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Enquiry Saved Successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        getAllenquiry();
      })
      .catch((err) => {
        console.error("Error saving enquiry:", err);
        toast.error("Failed to save enquiry.");
      });
  };
    }
   
   

  const getAllenquiry = () => {
    axios
      .get("https://enquery-backend.onrender.com/api/website/enquiry/view")
      .then((res) => {
        console.log("API Response:", res.data);
        return res.data;
      })
      .then((finaldata) => {
        if (finaldata.status) {
          setEnquiryList(finaldata.enquiryList);
        } else {
          toast.error("Failed to fetch enquiries.");
        }
      })
      .catch((err) => {
        console.error("Error fetching enquiries:", err);
        toast.error("Error fetching enquiries.");
      });
  };

  useEffect(() => {
    getAllenquiry();
  }, []);

  const getValue = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: inputValue,
    }));
  };
  return (
    <div>
    
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[30px] font-bold text-center text-blue-950">
            Enquiry Form
          </h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <label htmlFor="name" className="font-bold text-blue-950">
                Your Name
              </label>{" "}
              <br />
              <input
                className="w-[100%] border-2 px-2 py-1 rounded-2xl border-solid border-y-black"
                type="text"
                value={formData.name}
                name="name"
                placeholder="Enter Your Name..."
                required
                onChange={getValue}
              />
            </div>
            <div className="py-3">
              <label htmlFor="email" className="  font-bold text-blue-950">
                Your Email
              </label>{" "}
              <br />
              <input
                className="w-[100%] border-2 px-2  py-1 rounded-2xl  border-solid border-y-black"
                type="text"
                name="email"
                value={formData.email}
                placeholder="Enter Your Email..."
                required
                onChange={getValue}
              />
            </div>
            <div className="py-3">
              <label htmlFor="phone" className=" font-bold text-blue-950">
                Your Phone
              </label>{" "}
              <br />
              <input
                className="w-[100%] border-2 px-2  py-1 rounded-2xl border-solid border-y-black"
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Enter Your Phone No..."
                required
                onChange={getValue}
              />
            </div>
            <div className="py-3">
              <label htmlFor="message" className="font-bold text-blue-950">
                Your Message
              </label>{" "}
              <br />
              <textarea
                className="w-[100%] border-2 px-2 py-1 rounded-2xl border-solid border-y-black"
                name="message"
                value={formData.message}
                id=""
                rows="4"
                placeholder="Message..."
                required
                onChange={getValue}
              ></textarea>
            </div>
            <div className="py-3">
              <button
                type="submit"
                className="w-[100%] py-2 text-white bg-blue-950 rounded-2xl object-contain cursor-pointer"
              >
               {
                formData._id? 'update': 'save'
               }
              </button>
            </div>
          </form>
        </div>
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData}/>
      </div>
    </div>
  );
};

export default Enquiry;
