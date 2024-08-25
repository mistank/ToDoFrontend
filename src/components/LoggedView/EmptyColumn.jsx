/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
import "../../App.css";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import CreateStatusPopup from "./CreateStatusPopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";

const apiURL = "http://localhost:8000";

export default function EmptyColumn({
  projectId,
  statuses,
  setStatuses,
  currentProject,
}) {
  const [isHovered, setIsHovered] = useState(false); // State za praćenje hover stanja
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State za praćenje vidljivosti popup forme
  const [newStatus, setNewStatus] = useState(""); // State za praćenje unetog statusa
  const { userInfo } = useContext(AuthContext);
  const isOwner = userInfo.id === currentProject?.user.id;
  const addColumn = () => {
    axios
      .post(
        `${apiURL}/status/${projectId}`,
        {
          name: `${newStatus}`,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      )
      .then((response) => {
        setStatuses([...statuses, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Stilovi koji se primenjuju kada nije hover
  const defaultStyle = {
    animation: "rotate2 0.5s",
  };

  // Stilovi koji se primenjuju na hover
  const hoverStyle = {
    animation: "rotate 0.5s",
  };

  const showPopupForm = () => {
    setIsPopupVisible(true);
    document.body.style.overflow = "hidden"; // Sprečava skrolovanje dok je popup aktivan
  };

  // Funkcija za skrivanje popup forme
  const hidePopupForm = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = "auto"; // Dozvoljava skrolovanje kada se popup zatvori
  };

  return (
    <>
      <div className="flex h-[90%] min-w-[25%] max-w-[30%] rounded-lg pr-8">
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={showPopupForm}
          className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-lg hover:border-2 hover:border-gray-400 hover:border-opacity-50 ${isOwner ? "" : "disabled-button"}`}
          disabled={!isOwner}
        >
          <img
            src={add_cross}
            className="w-24"
            style={isHovered ? hoverStyle : defaultStyle}
          />
        </button>
      </div>
      {isPopupVisible && (
        <CreateStatusPopup
          newStatus={newStatus}
          statuses={statuses}
          addColumn={addColumn}
          onClose={hidePopupForm}
          setNewStatus={setNewStatus}
        />
      )}
    </>
  );
}
