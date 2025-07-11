import { useState } from "react";

export default function MySwaps() {
  const [activeTab, setActiveTab] = useState("active");
  const [showFilter, setShowFilter] = useState(false);
  const [skillFilter, setSkillFilter] = useState("");
const [categoryFilter, setCategoryFilter] = useState("");
const [distanceFilter, setDistanceFilter] = useState("");


  const activeSwaps = [{ id: 1, name: "Alex", skill: "React", time: "2h" }];
  const mySwaps = [
    { id: 2, name: "Martin", skill: "CSS", time: "1h" },
    { id: 3, name: "Charlie", skill: "Js", time: "3h" },
    { id: 4, name: "Diana", skill: "React", time: "40m" },
  ];

  const swapsToShow = activeTab === "active" ? activeSwaps : mySwaps;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="flex items-center justify-center py-4 border-b shadow-md">
        <img src="/logo.png" alt="SKILLSWAP" className="h-10 mr-2" />
        <h1 className="text-2xl font-bold">SKILLSWAP</h1>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mt-4 mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeTab === "my" ? "bg-green-400 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("my")}
        >
          My Swaps
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeTab === "active" ? "bg-green-400 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active Swaps
        </button>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end px-4 mb-4">
        <button onClick={() => setShowFilter(true)} className="ml-2">
          <img
            src="/filterbtn.png"
            alt="Filter"
            className="h-9 w-6 object-contain"
          />
        </button>
      </div>

      {/* Filter Modal */}
     {showFilter && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white w-80 p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filter by:</h2>

      {/* Skill Input */}
      <input
        type="text"
        placeholder="Skill"
        className="w-full border rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      {/* Category Input */}
      <input
        type="text"
        placeholder="Category"
        className="w-full border rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      {/* Distance Input */}
      <input
        type="text"
        placeholder="Distance"
        className="w-full border rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <button
          className="text-red-500 font-semibold"
          onClick={() => setShowFilter(false)}
        >
          Cancel
        </button>
        <button className="text-green-500 font-semibold">
          Apply
        </button>
      </div>
    </div>
  </div>
)}

      {/* Swaps List */}
      <div className="space-y-6 px-4 mb-24">
        {swapsToShow.length === 0 ? (
          <div className="text-center text-gray-500">
            {activeTab === "active" ? "No active swaps." : "No swap history yet."}
          </div>
        ) : (
          swapsToShow.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="w-16 h-12 rounded-2xl bg-gray-300" />
              {activeTab === "active" ? (
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    My skill: {user.skill}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Duration: {user.time}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500 font-bold">Full Name</p>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Skills to learn: {user.skill}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Time: {user.time}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full flex justify-around items-center py-4 border-t bg-gray-100 z-50">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-gray-400 rounded-full" />
        ))}
      </footer>
    </div>
  );
}
