/* eslint-disable react/prop-types */
export default function ProjectCard({ project }) {
  return (
    <div className="flex w-[32%] flex-col gap-3 rounded-lg border-2 border-[#5F6388] p-5 shadow-xl">
      <div className="flex justify-between">
        <span className={"rounded px-3 py-1 text-sm font-semibold"}>
          {project.category}
        </span>
      </div>
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p className="text-gray-300">{project.summary}</p>
      <div className="flex items-center justify-between">
        <span>{project.deadline}</span>
      </div>
      <div className="flex  justify-end">
        <button>Details</button>
      </div>
    </div>
  );
}
