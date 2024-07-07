/* eslint-disable react/prop-types */
export default function TaskCard({ task }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      className="flex flex-col gap-2 rounded-lg bg-gray-700 p-4"
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between">
        <span className={"rounded px-2 py-1 text-sm font-semibold"}>
          {task.tag}
        </span>
      </div>
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p className="text-gray-400">{task.description}</p>
      <div className="flex items-center justify-between">
        <span>{task.deadline}</span>
        {/* <div className="flex -space-x-2">
          {task.avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="avatar"
              className="h-6 w-6 rounded-full border-2 border-gray-900"
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
