import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import TasksTable from "./TasksTable.jsx";
import { IconButton, Button, ButtonGroup, ButtonToolbar } from "rsuite";
import "rsuite/Button/styles/index.css";
import "rsuite/ButtonGroup/styles/index.css";
import "rsuite/ButtonToolbar/styles/index.css";
import { ThemeContext } from "../../ThemeContext.jsx";

const apiURL = "http://localhost:8000";
export default function TaskListView() {
  const { userInfo } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activeButton, setActiveButton] = useState("Date");
  const [activeSubOption, setActiveSubOption] = useState("Today");
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  const fetchUserTasks = (skip = 0, limit = 100) => {
    axios
      .get(`${apiURL}/tasks-assigned-to-user/${userInfo.id}`, {
        params: { skip, limit },
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const buttonStyles = (isActive, isFirst) => ({
    backgroundColor: isActive ? "#5051F9" : "transparent",
    color: darkTheme ? "white" : isActive ? "white" : "black",
    border: "1px solid #5051F9",
    width: "100px", // Postavite širinu dugmadi
    borderRadius: isFirst ? "20px 0px 0px 20px" : "0px 20px 20px 0px", // Zaobljenje ivica
    padding: "10px 20px", // Dodajte padding za bolji izgled
    textAlign: "center", // Centrirajte tekst
  });

  const subButtonStyles = (isActive) => ({
    backgroundColor: isActive ? "#5051F9" : "transparent",
    color: darkTheme ? "white" : isActive ? "white" : "black",
    border: "1px solid #5051F9",
    width: "100px", // Postavite širinu dugmadi
    borderRadius: "20px", // Zaobljenje ivica
    padding: "10px 20px", // Dodajte padding za bolji izgled
    textAlign: "center", // Centrirajte tekst
    margin: "5px", // Dodajte margin za razmak između dugmadi
  });

  const sortedTasks = tasks.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  );

  const handleToggle = (button) => {
    setActiveButton(button);
  };

  const handleSubToggle = (option) => {
    setActiveSubOption(option);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between pr-8">
        <h2 className="text-3xl font-bold">Your tasks</h2>
        {/* Ubaciti combo box za filtraciju */}
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                style={buttonStyles(activeButton === "Date", true)}
                onClick={() => handleToggle("Date")}
              >
                Date
              </Button>
              <Button
                style={buttonStyles(activeButton === "Priority", false)}
                onClick={() => handleToggle("Priority")}
              >
                Priority
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
      <div className="mb-6 flex items-center justify-between pr-8">
        <ButtonToolbar>
          <ButtonGroup>
            {activeButton === "Date" ? (
              <>
                <Button
                  style={subButtonStyles(activeSubOption === "Today")}
                  onClick={() => handleSubToggle("Today")}
                >
                  Today
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "This week")}
                  onClick={() => handleSubToggle("This week")}
                >
                  This week
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "Next week")}
                  onClick={() => handleSubToggle("Next week")}
                >
                  Next week
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={subButtonStyles(activeSubOption === "High")}
                  onClick={() => handleSubToggle("High")}
                >
                  High
                </Button>
                <Button
                  style={subButtonStyles(activeSubOption === "Medium")}
                  onClick={() => handleSubToggle("Medium")}
                >
                  Medium
                </Button>
                <IconButton
                  style={subButtonStyles(activeSubOption === "Low")}
                  onClick={() => handleSubToggle("Low")}
                >
                  Low
                </IconButton>
              </>
            )}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <TasksTable tasks={tasks} setTasks={setTasks} />
    </>
  );
}
