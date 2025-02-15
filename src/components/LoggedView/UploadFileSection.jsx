/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, useRef } from "react";
import { Dropbox } from "dropbox";
import { ThemeContext } from "../../ThemeContext.jsx";
import close from "../../assets/icons/close.png";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadFileSection({ task, projectId }) {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";
  const dropboxAccessToken = import.meta.env.VITE_DROPBOX_ACCESS_TOKEN;

  useEffect(() => {
    fetchFilesForTask();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const fetchAllFiles = async (dbx, path) => {
    let allEntries = [];
    let hasMore = true;
    let cursor = null;

    while (hasMore) {
      try {
        const response = cursor
          ? await dbx.filesListFolderContinue({ cursor })
          : await dbx.filesListFolder({ path });

        if (response.result.entries) {
          allEntries = [...allEntries, ...response.result.entries];
        } else {
          console.error("Unexpected response format:", response);
          hasMore = false;
          break;
        }

        hasMore = response.has_more;
        cursor = response.cursor;
      } catch (error) {
        console.error("Error fetching files from Dropbox:", error);
        hasMore = false;
      }
    }

    return allEntries;
  };

  const fetchFilesForTask = async () => {
    const dbx = new Dropbox({ accessToken: dropboxAccessToken });
    try {
      const entries = await fetchAllFiles(
        dbx,
        `/Project-${projectId}/Task-${task.id}`,
      );
      setFiles(entries);
    } catch (error) {
      console.error("Error fetching files from Dropbox:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Izabrani fajl
    const url = "https://content.dropboxapi.com/2/files/upload"; // Ispravan URL za upload
    const args = {
      path: `/Project-${projectId}/Task-${task.id}/${file.name}`, // Definiši putanju gde se fajl čuva
      mode: "add", // Opcija dodavanja
      autorename: true,
      mute: false,
      strict_conflict: false,
    };

    const uploadFilePromise = () => {
      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dropboxAccessToken}`,
          "Dropbox-API-Arg": JSON.stringify(args), // Ispravno JSON stringovanje
          "Content-Type": "application/octet-stream", // Ispravan tip sadržaja za binarne podatke
        },
        body: file, // Telo zahteva sadrži binarne podatke fajla
      });
    };

    toast
      .promise(uploadFilePromise(), {
        pending: "Uploading file...",
        success: "File uploaded successfully!",
        error: "Failed to upload file",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
        console.log("File uploaded successfully!");
        fetchFilesForTask(); // Osvježi listu fajlova nakon upload-a
      })
      .catch((error) => {
        console.error("Error uploading file to Dropbox:", error);
      });
  };

  const handleDeleteFile = async (filePath) => {
    const url = "https://api.dropboxapi.com/2/files/delete_v2";
    const args = {
      path: filePath, // Putanja do fajla koji želite da obrišete
    };

    const deleteFilePromise = () => {
      return fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dropboxAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args), // Prosledite JSON telo sa putanjom do fajla
      });
    };

    toast
      .promise(deleteFilePromise(), {
        pending: "Deleting file...",
        success: "File deleted successfully!",
        error: "Failed to delete file",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting file: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("File deleted successfully:", result);
        fetchFilesForTask(); // Osvježite listu fajlova nakon brisanja
      })
      .catch((error) => {
        console.error("Error deleting file from Dropbox:", error);
      });
  };

  const handleDownload = async (filePath) => {
    try {
      console.log("File path: ", filePath);
      const response = await fetch(
        "https://content.dropboxapi.com/2/files/download",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${dropboxAccessToken}`,
            "Dropbox-API-Arg": JSON.stringify({ path: filePath }), // Koristimo JSON.stringify
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error downloading file: ${response.statusText}`); // Ispravljen string za interpolaciju
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filePath.split("/").pop(); // Ime fajla
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // Ukloni element nakon preuzimanja
    } catch (error) {
      console.error("Error downloading file from Dropbox:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        theme={darkTheme ? "dark" : "light"}
        transition={Slide}
      />
      <div className="flex h-full w-full flex-col">
        <div className="mb-4 flex w-full flex-shrink-0 items-center justify-between">
          <h2
            style={{
              color: textColor,
            }}
            className="mb-4 text-lg font-semibold"
          >
            Task files
          </h2>
          <button
            className="w-20 translate-y-[-25%] cursor-pointer rounded-md bg-[#5051F9] p-2 font-bold text-white focus:outline-none"
            onClick={handleButtonClick}
          >
            Upload
          </button>
          <input
            ref={fileInputRef}
            className="hidden"
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <ul
          style={{ flex: "1" }}
          className={`${darkTheme ? "scrollbar" : ""} space-y-2 overflow-y-scroll`}
        >
          {files.map((file) => (
            <li
              key={file.id}
              style={{
                transition: "all 0.2s",
              }}
              className="flex items-center justify-between rounded-md bg-gray-400 p-2 hover:bg-gray-500"
            >
              <button
                onClick={() => handleDownload(file.path_display)}
                className="w-[80%] overflow-hidden whitespace-nowrap text-left text-gray-800"
              >
                {file.name}
              </button>
              <button
                className="flex h-7 w-[20%] items-center justify-end pr-5 text-center text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => handleDeleteFile(file.path_display)}
                rel="noopener noreferrer"
              >
                <img src={close} className="h-[50%]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
