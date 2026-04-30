import { useState } from "react";
import axios from "../utils/axios";

export default function AddJobModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    companyName: "",
    role: "",
    status: "wishlist",
    priority: "medium",
    sector: "",
    location: "",
    ctcOffered: "",
    applyUrl: "",
    notes: "",
    interviewDate: "",
    resultStatus: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.companyName || !form.role) {
    alert("Company and Role are required");
    return;}
    if (form.status === "result" && !form.resultStatus) {
    alert("Result status required when status is result");
    return;}
    console.log("Calling onAdd");
    try {
      const cleanedData = {
      ...form,
      ctcOffered: form.ctcOffered ? Number(form.ctcOffered) : undefined,
      interviewDate: form.interviewDate || undefined,
      sector: form.sector || undefined,
      resultStatus: form.resultStatus || undefined,
    };
    const res = await axios.post("/jobs", cleanedData);

      onAdd(res.data);
      onClose();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  

  return (
    <div style={{
      position: "fixed",
      top: "10%",
      left: "35%",
      width: "300px",
      background: "white",
      padding: "20px",
      border: "1px solid black",
      maxHeight: "80vh",
      overflowY: "auto"
    }}>
      <h3>Add Application</h3>

      <form onSubmit={handleSubmit}>

        {/* REQUIRED */}
        <input placeholder="Company Name"
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />

        <input placeholder="Role"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview</option>
          <option value="result">Result</option>
        </select>

        <select onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <hr />

        {/* OPTIONAL FIELDS */}
        <input placeholder="Sector (IT/Finance/etc)"
          onChange={(e) => setForm({ ...form, sector: e.target.value })}
        />

        <input placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <input type="number" placeholder="CTC Offered"
          onChange={(e) => setForm({ ...form, ctcOffered: e.target.value })}
        />

        <input placeholder="Apply URL"
          onChange={(e) => setForm({ ...form, applyUrl: e.target.value })}
        />

        <textarea placeholder="Notes"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <input type="date"
          onChange={(e) => setForm({ ...form, interviewDate: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, resultStatus: e.target.value })}>
          <option value="">Result Status</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
          <option value="waitlisted">Waitlisted</option>
        </select>

        <br /><br />

        <button type="submit"> Add </button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
    
  );
}