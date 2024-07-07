/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard.jsx";
import { useState } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
export default function Column({ title, tasks, onTaskDrop }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault(); // Ovo omogućava da se ispusti
    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    onTaskDrop(taskId, title); // Pretpostavimo da `onTaskDrop` ažurira stanje
    setIsDragOver(false); // Resetujemo stanje kada se zadatak ispusti
  };

  console.log("Tasks: " + tasks);

  return (
    <div className="h-[100%] min-w-[20%] flex-1 rounded-lg">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div
        className="no-scrollbar flex h-[80vh] flex-col gap-4 overflow-scroll pb-32"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {isDragOver && (
          <div className="flex h-36 w-[100%] justify-center border-4 border-dashed border-[#5F6388] align-middle">
            <img src={add_cross} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
