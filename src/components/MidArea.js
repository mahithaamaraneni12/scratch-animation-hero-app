// // import React from "react";

// // export default function MidArea() {
// //   return <div className="flex-1 h-full overflow-auto">{"mid area"} </div>;
// // }
// import React, { useEffect } from "react";

// const detectTouch = (sprite1, sprite2) => {
//   const dx = Math.abs(sprite1.x - sprite2.x);
//   const dy = Math.abs(sprite1.y - sprite2.y);
//   return dx < 50 && dy < 50;
// };

// const swapAnimationsAndSetHero = (sprite1, sprite2, setSprites) => {
//   setSprites((prevSprites) =>
//     prevSprites.map((sprite) => {
//       if (sprite.id === sprite1.id) {
//         return { ...sprite, animations: sprite2.animations, isHero: true };
//       }
//       if (sprite.id === sprite2.id) {
//         return { ...sprite, animations: sprite1.animations, isHero: false };
//       }
//       return sprite;
//     })
//   );
// };

// export default function MidArea({
//   sprites,
//   setActiveSprite,
//   activeSprite,
//   removeAnimation,
//   clearAnimations,
//   resetSprites,
//   setSprites,
// }) {
//   useEffect(() => {
//     for (let i = 0; i < sprites.length; i++) {
//       for (let j = i + 1; j < sprites.length; j++) {
//         const s1 = sprites[i];
//         const s2 = sprites[j];
//         if (detectTouch(s1, s2)) {
//           swapAnimationsAndSetHero(s1, s2, setSprites);
//         }
//       }
//     }
//   }, [sprites, setSprites]);

//   return (
//     <div className="flex-1 h-full overflow-auto p-4 relative">
//       <h2 className="font-bold mb-2">Sprites</h2>
//       <div className="flex flex-wrap mb-4">
//         {sprites.map((sprite, index) => (
//           <div
//             key={sprite.id}
//             className={`m-1 p-2 rounded cursor-pointer ${
//               sprite.isActive ? "bg-blue-300" : "bg-gray-300"
//             }`}
//             onClick={() => setActiveSprite(sprite.id)}
//           >
//             {sprite.name}
//           </div>
//         ))}
//       </div>

//       {activeSprite && (
//         <>
//           <h3 className="font-bold mb-2">Animations for {activeSprite.name}</h3>
//           {activeSprite.animations.map((anim, i) => (
//             <div
//               key={anim.id}
//               className="bg-white shadow p-2 mb-2 flex justify-between"
//             >
//               <span>{anim.name}</span>
//               <button
//                 onClick={() => removeAnimation(activeSprite.id, anim.id)}
//                 className="text-red-500"
//               >
//                 ❌
//               </button>
//             </div>
//           ))}
//           {activeSprite.animations.length > 0 && (
//             <button
//               onClick={() => clearAnimations(activeSprite.id)}
//               className="bg-red-400 text-white px-3 py-1 rounded"
//             >
//               Clear All
//             </button>
//           )}
//         </>
//       )}

//       <button
//         onClick={resetSprites}
//         className="absolute top-0 right-0 m-4 p-3 bg-green-500 hover:bg-green-600 text-white rounded-full"
//       >
//         🔄
//       </button>
//     </div>
//   );
// }
// import React from "react";
// import Icon from "./Icon";

// export default function MidArea({
//   sprites,
//   setActiveSprite,
//   activeSprite,
//   removeAnimation,
//   clearAnimations,
// }) {
//   return (
//     <div className="flex-1 h-full overflow-auto p-4">
//       <div className="mb-4">
//         <h2 className="font-bold mb-2">Sprites</h2>
//         <div className="flex flex-wrap">
//           {sprites.map((sprite, index) => (
//             <div
//               key={sprite.id}
//               className={`m-1 p-2 rounded cursor-pointer ${
//                 sprite.isActive ? "bg-blue-200" : "bg-gray-200"
//               }`}
//               onClick={() => setActiveSprite(sprite.id)}
//             >
//               Action {index + 1}
//             </div>
//           ))}
//         </div>
//       </div>

//       {activeSprite && (
//         <div>
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="font-bold">Animations for {activeSprite.name}</h2>
//             {activeSprite.animations.length > 0 && (
//               <button
//                 onClick={() => clearAnimations(activeSprite.id)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 Clear All
//               </button>
//             )}
//           </div>

//           {activeSprite.animations.length === 0 ? (
//             <p className="text-gray-500">No animations added yet</p>
//           ) : (
//             <div className="bg-gray-100 p-2 rounded">
//               {activeSprite.animations.map((animation, index) => (
//                 <div
//                   key={animation.id}
//                   className="flex items-center justify-between bg-white p-2 my-1 rounded relative"
//                 >
//                   <div className="flex items-center">
//                     {animation.icon && (
//                       <Icon
//                         name={animation.icon}
//                         size={15}
//                         className="text-blue-500 mx-2"
//                       />
//                     )}
//                     <span>{animation.name}</span>
//                   </div>
//                   <button
//                     onClick={() => removeAnimation(activeSprite.id, animation.id)}
//                     className="bg-red-500 text-white hover:bg-red-700 rounded-full p-2 w-8 h-8 flex items-center justify-center absolute top-0 right-0 mt-2 mr-2"
//                   >
//                     <Icon name="trash" size={15} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import React from "react";
import { useDrop } from "react-dnd";
import Icon from "./Icon";
import { FaTrash } from "react-icons/fa";

export default function MidArea({
  sprites,
  setActiveSprite,
  activeSprite,
  removeAnimation,
  clearAnimations,
  resetSprites,
  moveAnimationToMidArea,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "motion-action",
    drop: (item) => {
      // When an animation is dropped, add it to the active sprite's animations
      if (activeSprite) {
        moveAnimationToMidArea(item.action, activeSprite.id); // Append animation to existing ones
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 h-full overflow-auto p-4 relative" ref={drop}>
      <div className="mb-4">
        <h2 className="font-bold mb-2">Sprites</h2>
        <div className="flex flex-wrap">
          {sprites.map((sprite, index) => (
            <div
              key={sprite.id}
              className={`m-1 p-2 rounded cursor-pointer ${sprite.isActive ? "bg-blue-200" : "bg-gray-200"}`}
              onClick={() => setActiveSprite(sprite.id)}
            >
              Action {index + 1}
            </div>
          ))}
        </div>
      </div>

      {activeSprite && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Animations for {activeSprite.name}</h2>
            {activeSprite.animations.length > 0 && (
              <button
                onClick={() => clearAnimations(activeSprite.id)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 my-1 rounded text-sm"
              >
                Clear All
              </button>
            )}
          </div>

          {activeSprite.animations.length === 0 ? (
            <p className="text-gray-500">No animations added yet</p>
          ) : (
            <div className="bg-gray-100 p-2 rounded">
              {activeSprite.animations.map((animation, index) => (
                <div
                  key={animation.id}
                  className="flex items-center justify-between bg-white p-2 my-1 rounded relative"
                >
                  <div className="flex items-center">
                    {animation.icon && (
                      <Icon
                        name={animation.icon}
                        size={15}
                        className="text-blue-500 mx-2"
                      />
                    )}
                    <span>{animation.name}</span>
                  </div>
                  <button
                    onClick={() => removeAnimation(activeSprite.id, animation.id)}
                    className="bg-red-500 text-white hover:bg-red-700 rounded-full p-2 w-8 h-8 flex items-center justify-center absolute top-0 right-0 mt-2 mr-2"
                  >
                    <FaTrash name="trash" size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Green Half Arrow Play Symbol in the Top-Right */}
      {isOver && (
        <div className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded-full">
          <span className="font-semibold">Play</span>
        </div>
      )}
    </div>
  );
}








