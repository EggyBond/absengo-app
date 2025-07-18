import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const CheckinCheckout = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalCaption, setModalCaption] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Ambil data absensi hari ini dari localStorage
  const today = "3 Sept, Tue, 09:00 - 11:00";
  const attendance = JSON.parse(localStorage.getItem("attendance_history") || "[]");
  let found = attendance.find(item => item.time === today);

  // Jika belum ada data absensi hari ini, status awal "Not Yet"
  const checkinStatus = found ? found.checkin : "Not Yet";
  const checkoutStatus = found ? found.checkout : "Not Yet";
  const alreadyCheckedIn = checkinStatus === "Done";
  const alreadyCheckedOut = checkoutStatus === "Done";

  const saveAttendance = (type) => {
    let attendance = JSON.parse(localStorage.getItem("attendance_history") || "[]");
    let found = attendance.find(item => item.time === today);
    if (!found) {
      found = {
        subject: "Algorithm and Programming",
        lecturer: "Prof. A",
        time: today,
        checkin: "Not Yet",
        checkout: "Not Yet",
      };
      attendance.push(found);
    }
    if (type === "checkin") found.checkin = "Done";
    if (type === "checkout") found.checkout = "Done";
    localStorage.setItem("attendance_history", JSON.stringify(attendance));
  };

  const handleCheckin = () => {
    const gpsVerified = localStorage.getItem("gps_verified") === "true";
    const wifiVerified = localStorage.getItem("wifi_verified") === "true";
    if (!gpsVerified || !wifiVerified) {
      alert("Please complete GPS and WiFi verification first on the Verification page.");
      return;
    }
    setModalCaption("Checking in...");
    setShowModal(true);
    setSuccessMsg("");
    setTimeout(() => {
      setShowModal(false);
      setSuccessMsg("You have successfully checked in!");
      saveAttendance("checkin");
      setTimeout(() => setSuccessMsg(""), 1500); // reload to update status
    }, 1500);
  };

  const handleCheckout = () => {
    const gpsVerified = localStorage.getItem("gps_verified") === "true";
    const wifiVerified = localStorage.getItem("wifi_verified") === "true";
    if (!gpsVerified || !wifiVerified) {
      alert("Please complete GPS and WiFi verification first on the Verification page.");
      return;
    }
    setModalCaption("Checking out...");
    setShowModal(true);
    setSuccessMsg("");
    setTimeout(() => {
      setShowModal(false);
      setSuccessMsg("You have successfully checked out!");
      saveAttendance("checkout");
      setTimeout(() => setSuccessMsg(""), 1500); // reload to update status
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4 flex items-center space-x-1">
            <span className="text-gray-400">Home</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">Check-in & Check-out</span>
          </nav>

          {/* Page Title */}
          <h2 className="text-3xl font-semibold text-center text-blue-900 mb-10">
            AbsenGo Check-in and Check-out
          </h2>

          {/* Content Wrapper */}
          <div className="flex flex-col items-center justify-center space-y-8 md:flex-row md:space-y-0 md:space-x-12">
            {/* Card */}
            <div className="bg-white rounded-lg shadow-md p-6 w-[320px]">
              <h3 className="text-blue-600 text-sm font-semibold mb-4">
                Subject Schedules | Today
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium">Subjects: </span>
                  Algorithm and Programming
                </div>
                <div>
                  <span className="font-medium">Lecturer: </span>
                  Prof. A
                </div>
                <div>
                  <span className="font-medium">Time: </span>
                  {today}
                </div>
                <div>
                  <span className="font-medium">Check-in Status: </span>
                  {checkinStatus}
                </div>
                <div>
                  <span className="font-medium">Check-out Status: </span>
                  {checkoutStatus}
                </div>
              </div>
            </div>

            {/* Check-in and Check-out Section */}
            <div className="space-y-10 text-center">
              <div>
                <p className="text-blue-600 font-medium text-lg mb-2">
                  Check-in Verification
                </p>
                <button
                  className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded shadow ${alreadyCheckedIn ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (alreadyCheckedIn) {
                      alert("You already checked in.");
                    } else {
                      handleCheckin();
                    }
                  }}
                >
                  {alreadyCheckedIn ? "You already checked in" : "Check-in"}
                </button>
              </div>

              <div>
                <p className="text-blue-600 font-medium text-lg mb-2">
                  Check-out Verification
                </p>
                <button
                  className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded shadow ${alreadyCheckedOut ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (alreadyCheckedOut) {
                      alert("You already checked out.");
                    } else {
                      handleCheckout();
                    }
                  }}
                >
                  {alreadyCheckedOut ? "You already checked out" : "Check-out"}
                </button>
              </div>
            </div>
          </div>

          {/* Modal Loading & Success */}
          {(showModal || successMsg) && (
            <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50 transition-opacity duration-300">
              <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-lg animate-pop">
                {showModal && (
                  <>
                    <div className="loader mb-4"></div>
                    <p className="text-blue-700 font-medium">{modalCaption}</p>
                  </>
                )}
                {successMsg && (
                  <>
                    <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-600 font-bold text-xl">{successMsg}</p>
                  </>
                )}
              </div>
            </div>
          )}
          {/* Loader & Pop Up Animation CSS */}
          <style>
            {`
              .loader {
                border: 4px solid #e0e0e0;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
              }
              .animate-pop {
                animation: pop 0.3s cubic-bezier(0.4,0,0.2,1);
              }
              @keyframes pop {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default CheckinCheckout;
