import React, { useEffect, useState } from "react";
import AdvanceTasks from "@/components/AdvanceTasks";

import Add from "@/assets/Add_ring_fill.png";
import ExpandDown from "@/assets/Expand_down.png";
import ExpandUp from "@/assets/Expand_up.png";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdvanceToDoList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogDescription, setDialogDescription] = useState("<>");
  const [subcollectionId, setSubcollectionId] = useState("");

  const [taskName, setTaskName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [breakHours, setBreakHours] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("");
  const [repeat, setRepeat] = useState("");

  const [show, setShow] = useState(false);
  const [subcollectionData, setSubcollectionData] = useState([]);


  // Read GetDOCS
  useEffect(() => {
    const obtainData = async () => {
      try {
        // const currentUser = auth.currentUser;
        const userUID = auth.currentUser.uid;
        const docRef = await getDocs(
          collection(db, "Poro-work-database", userUID, "advance")
        );
        const subDocRef = docRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubcollectionData(subDocRef);
      } catch (error) {
        console.error("does not show bro", error);
      }
    };
    obtainData();
  }, []);

  // Show scheduler
  const handleDateClick = (arg) => {
    setDialogDescription(`${arg.dateStr}`);
    setIsDialogOpen(true);
  };

  // Close scheduler
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDialogDescription("<>");
  };

  // Submit button
  const transferData = async () => {
    event.preventDefault();
    toast.success("Success");
    setIsDialogOpen(false);

    const currentUser = auth.currentUser;
    const userUID = currentUser.uid;
    if (currentUser) {
      await addDoc(collection(db, "Anonymous", userUID, "advance"), {
        task: taskName,
        hour: hours,
        minute: minutes,
        breakHour: breakHours,
        breakMintue: breakMinutes,
        repeat: repeat,
        date: new Date()
      });
    }
    try {
      // Save the input values to Firestore
      // use getDoc to retrieve data with docref.id or doc.id shit
      await addDoc(collection(db, "Poro-work-database", userUID, "advance"), {
        task: taskName,
        hour: hours,
        minute: minutes,
        breakHour: breakHours,
        breakMintue: breakMinutes,
        repeat: repeat,
        date: new Date()
      });

      setTaskName("");
      setHours("");
      setMinutes("");
      setBreakHours("");
      setBreakMinutes("");
      setRepeat("");
    } catch (error) {
      alert.error("Error saving data to Firestore:", error);
    }
  };

  // validates form
  const isFormValid =
    taskName.trim().length >= 3 ||
    hours.trim().length >= 1 ||
    minutes.trim().length >= 1 ||
    breakHours.trim().length >= 1 ||
    breakMinutes.trim().length >= 1 ||
    repeat.trim().length >= 1;

  return (
    <div className="m-5 rounded-2xl">
      <div
        onClick={() => setShow(!show)}
        className="flex justify-between gap-2 h-10 px-4 mb-3 bg-stone-[#101000] rounded-2xl items-center"
      >
        <span className="font-bold">Future Tasks:</span>
        <div className="flex">
          {!show ? (
            <img
              src={Add}
              onClick={handleDateClick}
              className="[filter:brightness(30%)] hover:[filter:brightness(100%)]"
              />
          ) : (
            " "
          )}
          <img
            src={!show ? ExpandUp : ExpandDown}
            onClick={() => setShow(!show)}
            className="[filter:brightness(300%)]"
          />
        </div>
      </div>
      {!show ? (
        subcollectionData.map((document, index) => (
        <AdvanceTasks key={index} task={document.task} time={document.hour} />
      ))
      ) : (
        ""
      )
      }


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <form onSubmit={transferData}>
            <DialogHeader>
              <div className="flex flex-col items-center">
                <DialogTitle className="text-3xl font-bold">
                  Set your Schedule
                </DialogTitle>
                <p className="bg-slate-700 py-1 px-3 rounded-2xl text-md mt-2">
                  Today is {dialogDescription}
                </p>
              </div>
              <DialogDescription className="py-5 text-sm">
                <Label htmlFor="task" className="text-lg">
                  Task Name:
                </Label>
                <Input
                  className="mt-2 text-[16px]"
                  id="task"
                  type="text"
                  required
                  placeholder="Enter Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <Label htmlFor="hours" className="text-lg">
                      Hours
                    </Label>
                    <Input
                      className="mt-2 text-[16px]"
                      id="hours"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Enter hours"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minutes" className="text-lg">
                      Minute
                    </Label>
                    <Input
                      className="mt-2 text-[16px]"
                      id="minutes"
                      type="number"
                      min="1"
                      max="59"
                      placeholder="Enter minutes"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakHour" className="text-lg">
                      Break Hour
                    </Label>
                    <Input
                      className="mt-2 text-[16px]"
                      id="breakHour"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Enter break"
                      value={breakHours}
                      onChange={(e) => setBreakHours(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakMinutes" className="text-lg">
                      Break Minutes
                    </Label>
                    <Input
                      className="mt-2 mb-4 text-[16px] [-moz-appearance: textfield]"
                      id="breakMinutes"
                      type="number"
                      min="1"
                      max="59"
                      placeholder="Enter break"
                      value={breakMinutes}
                      onChange={(e) => setBreakMinutes(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="repeat" className="text-lg">
                    Repeat
                  </Label>
                  <Select id="">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Repeat all day</SelectItem>
                      <SelectItem value="dark">Repeat by week</SelectItem>
                      <SelectItem value="system">Repeat by month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex mt-3">
              <Button
                className="w-20"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-20"
                onClick={transferData}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdvanceToDoList;
