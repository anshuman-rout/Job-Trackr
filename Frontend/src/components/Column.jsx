import { Droppable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

export default function Column({ title, jobs, onDelete }) {
  return (
    <Droppable droppableId={title}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            border: "1px solid gray",
            padding: "10px",
            width: "220px",
            minHeight: "300px",
          }}
        >
          <h3>{title.toUpperCase()} ({jobs.length})</h3>

          {jobs.map((job, index) => (
            <JobCard
              key={job._id}
              job={job}
              index={index}
              onDelete={onDelete}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}