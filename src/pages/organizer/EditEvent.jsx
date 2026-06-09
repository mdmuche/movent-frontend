import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/common/Navigation/Navbar";
import Footer from "../../components/common/Footer";
import InputField from "../../components/InputField";

import {
  getSingleEvent,
  updateEvent,
} from "../../store/thunks/organizerThunks";

function EditEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    city: "",
    state: "",
    country: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isFree: true,
    ticketPrice: 0,
    totalTickets: 0,
    tags: "",
    entryRequirements: "",
    bannerImage: null,
  });

  // FETCH EVENT
  useEffect(() => {
    const load = async () => {
      try {
        const event = await dispatch(getSingleEvent(id)).unwrap();

        setFormData({
          title: event.title || "",
          description: event.description || "",
          venue: event.venue || "",
          city: event.city || "",
          state: event.state || "",
          country: event.country || "",
          startDate: event.startDate?.split("T")[0] || "",
          endDate: event.endDate?.split("T")[0] || "",
          startTime: event.startTime || "",
          endTime: event.endTime || "",
          isFree: event.isFree ?? true,
          ticketPrice: event.ticketPrice || 0,
          totalTickets: event.totalTickets || 0,
          tags: event.tags?.join(", ") || "",
          entryRequirements: event.entryRequirements?.join(", ") || "",
          bannerImage: null,
        });
      } catch (err) {
        toast.error(err || "Failed to load event");
      }
    };

    load();
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "bannerImage") return;
        if (key === "tags" || key === "entryRequirements") return;

        payload.append(key, formData[key]);
      });

      payload.append("tags", formData.tags);
      payload.append("entryRequirements", formData.entryRequirements);

      if (formData.bannerImage) {
        payload.append("bannerImage", formData.bannerImage);
      }

      const res = await dispatch(updateEvent({ id, data: payload })).unwrap();

      toast.success(res.message || "Event updated");

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Failed to update event");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white px-4 py-10">
        <h1 className="text-3xl font-black mb-6">Edit Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <InputField
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Title"
          />

          <InputField
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            label="Venue"
          />

          <InputField
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Description"
            type="textarea"
          />

          <InputField
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            label="Tags"
          />

          <InputField
            name="entryRequirements"
            value={formData.entryRequirements}
            onChange={handleChange}
            label="Entry Requirements"
          />

          <input
            type="file"
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                bannerImage: e.target.files[0],
              }))
            }
          />

          <button
            type="submit"
            className="bg-cyan-500 text-white px-6 py-3 rounded-xl"
          >
            Update Event
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EditEvent;
