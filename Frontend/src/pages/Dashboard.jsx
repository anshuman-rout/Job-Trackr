import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Column from "../components/Column";
import AddJobModal from "../components/AddJobModal";
import { DragDropContext } from "@hello-pangea/dnd";

const columns = ["wishlist", "applied", "shortlisted", "interview", "result"];

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔥 FETCH JOBS
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  // 🔥 ADD JOB HANDLER (IMPORTANT)
  const handleAdd = (newJob) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  // 🔥 DELETE JOB
  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
  };

  // 🔥 DRAG & DROP (OPTIMISTIC)
  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    const prevJobs = [...jobs];

    // 🔥 Optimistic UI update
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === draggableId ? { ...job, status: newStatus } : job
      )
    );

    try {
      await axios.put(`/jobs/${draggableId}`, {
        status: newStatus,
      });
    } catch (error) {
      console.log("Update failed, rolling back...", error);
      setJobs(prevJobs);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <>
        {/* 🔥 ADD BUTTON */}
        <button onClick={() => setShowModal(true)}>
          + Add Application
        </button>

        {/* 🔥 COLUMNS */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          {columns.map((col) => (
            <Column
              key={col}
              title={col}
              jobs={jobs.filter((job) => job.status === col)}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* 🔥 MODAL */}
        {showModal && (
          <AddJobModal
            onClose={() => setShowModal(false)}
            onAdd={handleAdd}
          />
        )}
      </>
    </DragDropContext>
  );
}