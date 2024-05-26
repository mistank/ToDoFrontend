const icons = ['book_icon', 'files_icon', 'message_icon', 'projects_icon', 'setting_icon', 'tasks_icon'];

export default function Icons() {
  return (
    // <div className="w-full h-auto space-y-10 flex flex-col">
    <>
      {icons.map((icon) => (
        <button key={icon}>
          <img className="w-full h-7" src={`/src/assets/icons/menu-icons/${icon}.svg`} alt="" />
        </button>
      ))}
    </>

    // </div>
  );
}
