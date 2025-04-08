// import React from "react";
// import { useDrag } from "react-dnd";
// import Icon from "./Icon";

// export default function Sidebar({ addAnimation, addSprite, resetSprites, repeatLastAnimation, moveAnimationToMidArea }) {
//   const motionActions = [
//     { name: "Move 10 steps", type: "move", value: 10 },
//     { name: "Move -10 steps", type: "move", value: -10 },
//     { name: "Turn 15 degrees", type: "turn", value: 15, icon: "arrow-right" },
//     { name: "Turn -15 degrees", type: "turn", value: -15, icon: "arrow-left" },
//     { name: "Go to x: 0 y: 0", type: "goto", x: 0, y: 0 },
//     { name: "Go to random position", type: "goto", random: true },
//     { name: "Say Hello", type: "say", message: "Hello" },
//     { name: "Say Hello for 1 second", type: "say", message: "Hello", duration: 1000 },
//   ];

//   const handleAddAnimation = (animation) => {
//     addAnimation(animation);
//   };

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "motion-action",
//     item: (action) => ({ action }),
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
//       <div className="font-bold">{"Sprites"}</div>
//       <button
//         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-2 rounded text-sm"
//         onClick={addSprite}
//       >
//         Add Sprite
//       </button>

//       <div className="font-bold mt-4">{"Motion"}</div>
//       {motionActions.map((action, index) => {
//         const [{ isDragging }, drag] = useDrag(() => ({
//           type: "motion-action",
//           item: { action },
//           collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//           }),
//         }));

//         return (
//           <button
//             key={index}
//             ref={drag}
//             className={`flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full ${isDragging ? 'opacity-50' : ''}`}
//             onClick={() => handleAddAnimation(action)}
//           >
//             {action.icon && (
//               <Icon name={action.icon} size={15} className="text-white mr-2" />
//             )}
//             {action.name}
//           </button>
//         );
//       })}

//       <button
//         className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full"
//         onClick={repeatLastAnimation}
//       >
//         Repeat Last Action
//       </button>

//       <button
//         className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full"
//         onClick={resetSprites}
//       >
//         Reset
//       </button>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Icon from "./Icon";

export default function Sidebar({ addAnimation, addSprite, resetSprites, repeatLastAnimation }) {
  const [selectedCategory, setSelectedCategory] = useState("motion");

  const motionActions = [
    { name: "Move 10 steps", type: "move", value: 10 },
    { name: "Move -10 steps", type: "move", value: -10 },
    { name: "Turn 15 degrees", type: "turn", value: 15, icon: "redo" },
    { name: "Turn -15 degrees", type: "turn", value: -15, icon: "undo" },
    { name: "Go to x: 0 y: 0", type: "goto", x: 0, y: 0 },
    { name: "Go to random position", type: "goto", random: true },
  ];

  const looksActions = [
    { name: "Say hello", type: "say", text: "hello" },
    { name: "Say hello for 2 seconds", type: "say", text: "hello", duration: 2 },
    { name: "Say hmm", type: "say", text: "hmm" },
    { name: "Say hmm for 2 seconds", type: "say", text: "hmm", duration: 2 },
    { name: "Change size by 10", type: "changeSize", value: 10 },
    { name: "Set size to 100%", type: "setSize", value: 100 },
  ];

  const eventsActions = [
    { name: "Space key pressed", type: "keyEvent", key: "space" },
    { name: "When this sprite clicked", type: "clickEvent" },
    { name: "Backdrop switches", type: "backdropSwitch" },
    { name: "When I receive message 1", type: "receiveMessage", message: "1" },
    { name: "Broadcast message 1", type: "broadcast", message: "1" },
    { name: "Wait 1 sec", type: "wait", duration: 1 },
  ];

  const controlActions = [
    { name: "Wait 1 sec", type: "wait", duration: 1 },
    { name: "Repeat 10", type: "repeat", times: 10 },
    { name: "Forever", type: "forever" },
  ];

  const colorMap = {
    motion: "bg-blue-500 hover:bg-blue-600",
    looks: "bg-purple-500 hover:bg-purple-600",
    events: "bg-yellow-400 hover:bg-yellow-500",
    control: "bg-green-500 hover:bg-green-600",
  };

  const highlightBadge = (text) => (
    <span className="bg-white text-black px-2 py-0.5 rounded-full text-xs font-bold mx-1">
      {text}
    </span>
  );

  const formatActionName = (action) => {
    const { name, type, value, text } = action;

    if (type === "move" || type === "turn" || type === "changeSize" || type === "setSize") {
      const parts = name.split(/(-?\d+)/);
      return parts.map((part, i) =>
        /^-?\d+$/.test(part) ? <React.Fragment key={i}>{highlightBadge(part)}</React.Fragment> : part
      );
    }

    if (type === "say" && text) {
      const parts = name.split(new RegExp(`\\b(${text})\\b`, "i"));
      return parts.map((part, i) =>
        part.toLowerCase() === text.toLowerCase() ? <React.Fragment key={i}>{highlightBadge(part)}</React.Fragment> : part
      );
    }

    return name;
  };

  const handleAddAnimation = (animation) => {
    addAnimation(animation);
  };

  const renderActions = (actions) =>
    actions.map((action, index) => {
      const [{ isDragging }, drag] = useDrag(() => ({
        type: `${selectedCategory}-action`,
        item: { action },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }));

      return (
        <div
          key={index}
          ref={drag}
          className={`flex items-center flex-wrap ${colorMap[selectedCategory]} text-white px-2 py-1 my-2 text-sm cursor-pointer rounded w-full ${
            isDragging ? "opacity-50" : ""
          }`}
          onClick={() => handleAddAnimation(action)}
        >
          {action.name.includes("Turn") && action.icon && (
            <Icon name={action.icon} size={15} className="text-white mr-2" />
          )}
          {formatActionName(action)}
        </div>
      );
    });

  return (
    <div className="flex flex-row h-full border-r border-gray-200">
      {/* Category Bar */}
      <div className="flex flex-col items-start p-2 pr-3 border-r-2">
        <div className="flex items-center space-x-2 my-2 cursor-pointer" onClick={() => setSelectedCategory("motion")}>
          <span className="w-5 h-5 bg-blue-500 rounded-full"></span>
          <span className="text-base text-black">Motion</span>
        </div>
        <div className="flex items-center space-x-2 my-2 cursor-pointer" onClick={() => setSelectedCategory("looks")}>
          <span className="w-5 h-5 bg-purple-500 rounded-full"></span>
          <span className="text-base text-black">Looks</span>
        </div>
        <div className="flex items-center space-x-2 my-2 cursor-pointer" onClick={() => setSelectedCategory("events")}>
          <span className="w-5 h-5 bg-yellow-400 rounded-full"></span>
          <span className="text-base text-black">Events</span>
        </div>
        <div className="flex items-center space-x-2 my-2 cursor-pointer" onClick={() => setSelectedCategory("control")}>
          <span className="w-5 h-5 bg-green-500 rounded-full"></span>
          <span className="text-base text-black">Control</span>
        </div>
      </div>

      {/* Action Panel */}
      <div className="w-64 flex-none h-full overflow-y-auto flex flex-col items-start p-4 bg-white">
        <div className="font-bold">Sprites</div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-2 rounded text-sm"
          onClick={addSprite}
        >
          Add Sprite
        </button>

        {selectedCategory === "motion" && (
          <>
            <div className="font-bold mt-4">Motion</div>
            {renderActions(motionActions)}
            <button
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-2 rounded text-sm w-full"
              onClick={repeatLastAnimation}
            >
              Repeat Last Action
            </button>
            <button
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full"
              onClick={resetSprites}
            >
              Reset
            </button>
          </>
        )}

        {selectedCategory === "looks" && (
          <>
            <div className="font-bold mt-4">Looks</div>
            {renderActions(looksActions)}
          </>
        )}

        {selectedCategory === "events" && (
          <>
            <div className="font-bold mt-4">Events</div>
            {renderActions(eventsActions)}
          </>
        )}

        {selectedCategory === "control" && (
          <>
            <div className="font-bold mt-4">Control</div>
            {renderActions(controlActions)}
          </>
        )}
      </div>
    </div>
  );
}


