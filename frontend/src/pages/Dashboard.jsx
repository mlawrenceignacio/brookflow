import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useNoteStore from "../store/useNoteStore";

import UserProfilePic from "../components/UserProfilePic";
import Spinner from "../components/Spinner";
import ThemeToggleButton from "../components/ThemeToggleButton";
import TimeDisplay from "../components/TimeDisplay";
import RandomFacts from "../components/RandomFacts";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token, logout } = useAuthStore();
  const { notes, getAllNotes } = useNoteStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    <Navigate to="/login" />;
  }

  useEffect(() => {
    async function getNotes() {
      setIsLoading(true);
      await getAllNotes(token);
      setIsLoading(false);
    }

    getNotes();
  }, []);

  return (
    <div
      className={`flex flex-col items-center 2xl:flex-row 2xl:items-start h-screen   xl:h-screen overflow-hidden dark:bg-gray-800`}
    >
      {isLoading ? (
        <div className="w-full h-full relative">
          <Spinner color={"cyan"} />
        </div>
      ) : (
        <>
          <div className="shrink-0 2xl:hidden w-full ">
            <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          </div>

          <div className="hidden h-full dark:bg-gray-900 bg-green-600 2xl:flex flex-col p-5 text-center shrink-0 ">
            <div className="flex flex-col items-center mb-5">
              <h2 className="text-5xl text-white font-bold border-b border-green-100 pb-4 px-8 mb-7">
                Brook<span className="text-green-900">Flow</span>
              </h2>
              <UserProfilePic token={token} />
            </div>

            <div className="flex flex-col text-lg gap-2 px-8 py-3 items-center">
              <ThemeToggleButton />

              <button
                className="bg-red-700 text-white w-[75%] h-12 rounded-full text-center"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {isMenuOpen ? (
            <div className="w-full h-full overflow-hidden">
              <MobileMenu
                handleLogout={handleLogout}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center  h-screen overflow-hidden p-3 2xl:p-5 gap-3 lg:gap-7 2xl:gap-8 overflow-y-auto scrollbar-hidden-sm flex-grow lg:w-[70%] 2xl:w-auto">
              <div className="dark:bg-gray-900 bg-green-700 py-5 w-[100%] sm:w-[80%] xl:w-[80%]  rounded-lg">
                <h2 className="text-center text-white text-2xl lg:text-3xl ">
                  Welcome{" "}
                  <span className="font-bold">
                    {user.username.toUpperCase()}!
                  </span>
                </h2>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 2xl:gap-5 w-[100%] sm:w-[80%] 2xl:w-[80%] dark:bg-gray-900 bg-gray-200 py-5 2xl:py-8 rounded-lg shadow-lg">
                <div className="flex gap-5 justify-center w-[90%] sm:w-[80%] 2xl:w-[80%]">
                  <div className="dark:bg-gray-800 bg-green-400 px-9 sm:px-10 2xl:px-11 py-4 sm:py-7 lg:px-14 2xl:py-8 flex flex-col text-center items-center justify-center rounded-lg border border-black flex-1 sm:flex-none 2xl:flex-none">
                    <p className="text-4xl 2xl:text-5xl font-bold mb-1 text-green-900 dark:text-green-200">
                      {notes.length}
                    </p>
                    <h3 className=" text-xl sm:text-2xl 2xl:text-2xl font-semibold dark:text-white">
                      NOTES
                    </h3>
                  </div>

                  <img
                    src="/dashboardPic.png"
                    alt="Dashboard Picture"
                    className="w-[120px] lg:w-[160px] lg:h-[160px] 2xl:h-[150px] h-[120px] sm:flex-1 lg:flex-none sm:h-full"
                  />

                  <div className="flex-1 hidden 2xl:block">
                    <TimeDisplay />
                  </div>
                </div>

                <div className="flex gap-5 items-center w-[90%] sm:w-[80%] lg:w-[95%]">
                  <div className="block flex-1 h-full  2xl:hidden">
                    <TimeDisplay />
                  </div>

                  <div className=" dark:bg-gray-800 bg-green-600 p-5 2xl:p-8 rounded-lg shrink-0 2xl:h-full lg:flex lg:items-centers lg:justify-center">
                    <Link to="/journal-page">
                      <img
                        src="/noteIcon.png"
                        alt="Note Button Icon of a Book"
                        className="w-[80px] 2xl:w-[100px] h-[80px] 2xl:h-[90px] lg:w-[120px] lg:h-[110px]"
                        data-tooltip-id="journal-tooltip"
                        data-tooltip-content="Journal"
                      />
                      <Tooltip id="journal-tooltip" />
                    </Link>
                  </div>

                  <div className="flex-1 h-full hidden 2xl:block">
                    <RandomFacts />
                  </div>
                </div>

                <div className="flex-1 w-[90%] sm:w-[80%] lg:w-[95%] 2xl:hidden">
                  <RandomFacts />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
