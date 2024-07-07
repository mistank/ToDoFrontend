/* eslint-disable react/prop-types */
export default function PopupForm({
  onClose,
  addColumn,
  setNewStatus,
  newStatus,
  statuses,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90vw] max-w-md rounded-lg bg-[#1E1F25] p-8 text-white shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Add new Status</h2>
        <input
          type="text"
          placeholder="Status name"
          className="mb-4 w-full rounded-lg bg-[#131517] p-2  focus:outline-none"
          onChange={(e) => setNewStatus(e.target.value)}
        />
        {statuses.some((status) => status.name === newStatus) && (
          <p className="mb-4 text-[#D8000C]">Status already exists</p>
        )}
        <div>
          <button
            onClick={() => {
              if (statuses.some((status) => status.name === newStatus)) {
                return;
              }
              addColumn();
              onClose();
            }}
            className="rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Dodaj kolonu
          </button>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
