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

import React from "react";
import { useDrag } from "react-dnd";
import Icon from "./Icon";

export default function Sidebar({ addAnimation, addSprite, resetSprites, repeatLastAnimation, moveAnimationToMidArea }) {
  const motionActions = [
    { name: "Move 10 steps", type: "move", value: 10 },
    { name: "Move -10 steps", type: "move", value: -10 },
    { name: "Turn 15 degrees", type: "turn", value: 15, icon: "arrow-right" },
    { name: "Turn -15 degrees", type: "turn", value: -15, icon: "arrow-left" },
    { name: "Go to x: 0 y: 0", type: "goto", x: 0, y: 0 },
    { name: "Go to random position", type: "goto", random: true },
    { name: "Say Hello", type: "say", message: "Hello" },
    { name: "Say Hello for 1 second", type: "say", message: "Hello", duration: 1000 },
  ];

  const handleAddAnimation = (animation) => {
    addAnimation(animation);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "motion-action",
    item: (action) => ({ action }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">{"Sprites"}</div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-2 rounded text-sm"
        onClick={addSprite}
      >
        Add Sprite
      </button>

      <div className="font-bold mt-4">{"Motion"}</div>
      {motionActions.map((action, index) => {
        const [{ isDragging }, drag] = useDrag(() => ({
          type: "motion-action",
          item: { action },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
        }));

        return (
          <button
            key={index}
            ref={drag}
            className={`flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full ${isDragging ? 'opacity-50' : ''}`}
            onClick={() => handleAddAnimation(action)}
          >
            {action.icon && (
              <Icon name={action.icon} size={15} className="text-white mr-2" />
            )}
            {action.name}
          </button>
        );
      })}

      <button
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm w-full"
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
    </div>
  );
}

