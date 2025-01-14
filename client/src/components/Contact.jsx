import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landLord, setLandLord] = React.useState(null);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    const fetchLandLord = async (userId) => {
      const res = await fetch(`/api/user/${userId}`);

      const data = await res.json();
      setLandLord(data.user);
    };
    fetchLandLord(listing.user._id);
  }, [listing.user._id]);

  return (
    landLord && (
      <div className="flex flex-col gap-2">
        <p>
          Contact <span className="font-semibold">code</span> for{" "}
          <span className="font-semibold">{listing.name}</span>
        </p>
        <textarea
          className="p-3 rounded-md outline-none"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <Link
          to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
          className="p-4 text-center text-white bg-slate-800 rounded-lg font-semibold"
        >
          SEND MESSAGE
        </Link>
      </div>
    )
  );
};

Contact.propTypes = {
  listing: PropTypes.object.isRequired,
};

export default Contact;
