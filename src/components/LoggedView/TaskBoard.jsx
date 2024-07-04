import Column from "./Column";

const backlogTasks = [
  {
    id: 1,
    tag: "Design",
    title: "Create styleguide foundation",
    description: "Create content for peceland App",
    date: "Aug 20, 2021",
    avatars: ["/path/to/avatar1.png", "/path/to/avatar2.png"],
  },
  // Dodaj još taskova...
];

const todoTasks = [
  {
    id: 2,
    tag: "Research",
    title: "Auditing information architecture",
    description: "Create content for peceland App",
    date: "Aug 20, 2021",
    avatars: ["/path/to/avatar3.png"],
  },
  // Dodaj još taskova...
];

const inProgressTasks = [
  {
    id: 3,
    tag: "Planning",
    title: "Listing deliverables checklist",
    description: "Create content for peceland App",
    date: "Sep 20, 2021",
    avatars: ["/path/to/avatar4.png"],
  },
  // Dodaj još taskova...
];

const reviewTasks = [
  {
    id: 4,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar5.png"],
  },
  {
    id: 5,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar6"],
  },
  {
    id: 5,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar6"],
  },
  {
    id: 5,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar6"],
  },
  {
    id: 5,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar6"],
  },
  {
    id: 5,
    tag: "Content",
    title: "Design System",
    description: "Create content for peceland App",
    date: "Aug 16, 2021",
    avatars: ["/path/to/avatar6"],
  },

  // Dodaj još taskova...
];
export default function TaskBoard() {
  return (
    <div className="flex gap-4 text-white">
      <Column title="Backlog" tasks={backlogTasks} />
      <Column title="To Do" tasks={todoTasks} />
      <Column title="In Progress" tasks={inProgressTasks} />
      <Column title="Review" tasks={reviewTasks} />
    </div>
  );
}
