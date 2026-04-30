import { Draggable } from "@hello-pangea/dnd";
import axios from "../utils/axios";

export default function JobCard({ job, index, onDelete }) {

  const handleDelete = async () => {
    try {
      await axios.delete(`/jobs/${job._id}`);
      onDelete(job._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={job._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "5px",
            background: "white",
            ...provided.draggableProps.style,
          }}
        >
          {/* 🔥 SIMPLE CLEAN UI */}
          <h4>{job.companyName}</h4>
          <p>{job.role}</p>
          <p>Priority: {job.priority}</p>

          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </Draggable>
  );
}