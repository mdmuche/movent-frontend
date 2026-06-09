import { Calendar, CheckCircle2, Mail } from "lucide-react";

const IconRenderer = ({ type }) => {
  switch (type) {
    case "event_saved":
      return <CheckCircle2 className="text-cyan-500" size={16} />;

    case "event_created":
      return <Calendar className="text-emerald-500" size={16} />;

    default:
      return <Mail className="text-gray-400" size={16} />;
  }
};

export default IconRenderer;
