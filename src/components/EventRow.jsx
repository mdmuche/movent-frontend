import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { approveRejectEvent } from "../store/thunks/adminThunks";

function EventRow({ event }) {
  const dispatch = useDispatch();

  const handleApprove = async () => {
    try {
      const res = await dispatch(
        approveRejectEvent({
          eventId: event._id,
          action: "approve",
        }),
      ).unwrap();

      toast.success(res.message);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleReject = async () => {
    const reason = prompt("Reason for rejection:");

    if (!reason) return;

    try {
      const res = await dispatch(
        approveRejectEvent({
          eventId: event._id,
          action: "reject",
          reason,
        }),
      ).unwrap();

      toast.success(res.message);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <tr>
      <td>
        <div className="font-semibold">{event.title}</div>
        <div className="text-sm text-slate-500">
          {event.category}
        </div>
      </td>

      <td>{event.organizer?.fullName}</td>

      <td>
        {new Date(event.createdAt).toLocaleDateString()}
      </td>

      <td>{event.totalTickets}</td>

      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button
            disabled={event.approvalStatus === "approved"}
            onClick={handleApprove}
            className="px-3 py-1 rounded bg-green-500 text-white text-xs disabled:opacity-50"
          >
            Approve
          </button>

          <button
            disabled={event.approvalStatus === "rejected"}
            onClick={handleReject}
            className="px-3 py-1 rounded bg-red-500 text-white text-xs disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EventRow;