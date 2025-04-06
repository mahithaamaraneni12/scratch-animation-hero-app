// import React from "react";
// import Sidebar from "./components/Sidebar";
// import MidArea from "./components/MidArea";
// import PreviewArea from "./components/PreviewArea";

// export default function App() {
//   return (
//     <div className="bg-blue-100 pt-6 font-sans">
//       <div className="h-screen overflow-hidden flex flex-row  ">
//         <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
//           <Sidebar /> <MidArea />
//         </div>
//         <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
//           <PreviewArea />
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import MidArea from "./components/MidArea";
// import PreviewArea from "./components/PreviewArea";

// export default function App() {
//   const [sprites, setSprites] = useState([
//     {
//       id: 1,
//       name: "Cat 1",
//       x: 0,
//       y: 0,
//       rotation: 0,
//       animations: [],
//       isActive: true
//     }
//   ]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const addSprite = () => {
//     const newSprite = {
//       id: Date.now(), // Use timestamp for unique ID
//       name: `Cat ${sprites.length + 1}`,
//       x: Math.random() * 200 - 100, // Random position between -100 and 100
//       y: Math.random() * 200 - 100,
//       rotation: 0,
//       animations: [],
//       isActive: false
//     };
//     setSprites([...sprites, newSprite]);
//   };

//   const setActiveSprite = (id) => {
//     setSprites(sprites.map(sprite => ({
//       ...sprite,
//       isActive: sprite.id === id
//     })));
//   };

//   const addAnimation = (animation) => {
//     setSprites(sprites.map(sprite => {
//       if (sprite.isActive) {
//         return {
//           ...sprite,
//           animations: [...sprite.animations, {
//             ...animation,
//             id: Date.now() // Add unique ID to each animation
//           }]
//         };
//       }
//       return sprite;
//     }));
//   };

//   const removeAnimation = (spriteId, animationId) => {
//     setSprites(sprites.map(sprite => {
//       if (sprite.id === spriteId) {
//         return {
//           ...sprite,
//           animations: sprite.animations.filter(anim => anim.id !== animationId)
//         };
//       }
//       return sprite;
//     }));
//   };

//   const clearAnimations = (spriteId) => {
//     setSprites(sprites.map(sprite => {
//       if (sprite.id === spriteId) {
//         return {
//           ...sprite,
//           animations: []
//         };
//       }
//       return sprite;
//     }));
//   };

//   const playAnimations = () => {
//     setIsPlaying(true);
//   };

//   const stopAnimations = () => {
//     setIsPlaying(false);
//   };

//   const resetSprites = () => {
//     setSprites(sprites.map(sprite => ({
//       ...sprite,
//       x: 0,
//       y: 0,
//       rotation: 0,
//       animations: []
//     })));
//     setIsPlaying(false);
//   };

//   return (
//     <div className="bg-blue-100 pt-6 font-sans">
//       <div className="h-screen overflow-hidden flex flex-row">
//         <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
//           <Sidebar 
//             addAnimation={addAnimation} 
//             addSprite={addSprite} 
//             resetSprites={resetSprites}
//           />
//           <MidArea 
//             sprites={sprites} 
//             setActiveSprite={setActiveSprite} 
//             activeSprite={sprites.find(s => s.isActive)}
//             removeAnimation={removeAnimation}
//             clearAnimations={clearAnimations}
//           />
//         </div>
//         <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
//           <PreviewArea 
//             sprites={sprites} 
//             isPlaying={isPlaying} 
//             setIsPlaying={setIsPlaying}
//             setSprites={setSprites}
//             playAnimations={playAnimations}
//             stopAnimations={stopAnimations}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";

export default function App() {
  const [sprites, setSprites] = useState([
    {
      id: 1,
      name: "Cat 1",
      x: 0,
      y: 0,
      rotation: 0,
      animations: [],
      isActive: true,
    },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastAnimation, setLastAnimation] = useState(null); // Track last animation for repeat

  const addSprite = () => {
    const newSprite = {
      id: Date.now(), // Unique ID
      name: `Cat ${sprites.length + 1}`,
      x: Math.random() * 200 - 100, // Random position between -100 and 100
      y: Math.random() * 200 - 100,
      rotation: 0,
      animations: [],
      isActive: false,
    };
    setSprites([...sprites, newSprite]);
  };

  const setActiveSprite = (id) => {
    setSprites(
      sprites.map((sprite) => ({
        ...sprite,
        isActive: sprite.id === id,
      }))
    );
  };

  const addAnimation = (animation) => {
    setSprites(
      sprites.map((sprite) => {
        if (sprite.isActive) {
          const newSprite = { ...sprite };

          // Process animation immediately
          switch (animation.type) {
            case "move":
              const radians = (newSprite.rotation * Math.PI) / 180;
              newSprite.x += animation.value * Math.cos(radians);
              newSprite.y += animation.value * Math.sin(radians);
              break;
            case "turn":
              newSprite.rotation += animation.value;
              newSprite.rotation = newSprite.rotation % 360;
              break;
            case "goto":
              if (animation.random) {
                newSprite.x = Math.random() * 400 - 200; // Random X between -200 and 200
                newSprite.y = Math.random() * 400 - 200; // Random Y between -200 and 200
              } else {
                newSprite.x = animation.x || 0;
                newSprite.y = animation.y || 0;
              }
              break;
            default:
              break;
          }

          // Add the animation to the list so it can still be played if necessary
          newSprite.animations = [
            ...newSprite.animations,
            {
              ...animation,
              id: Date.now(), // Add unique ID to each animation
            },
          ];

          return newSprite;
        }
        return sprite;
      })
    );
    
    // Save the last animation for repeat functionality
    setLastAnimation(animation);
  };

  const repeatLastAnimation = () => {
    if (lastAnimation) {
      addAnimation(lastAnimation); // Repeat the last animation
    }
  };

  const removeAnimation = (spriteId, animationId) => {
    setSprites(
      sprites.map((sprite) => {
        if (sprite.id === spriteId) {
          return {
            ...sprite,
            animations: sprite.animations.filter((anim) => anim.id !== animationId),
          };
        }
        return sprite;
      })
    );
  };

  const clearAnimations = (spriteId) => {
    setSprites(
      sprites.map((sprite) => {
        if (sprite.id === spriteId) {
          return {
            ...sprite,
            animations: [],
          };
        }
        return sprite;
      })
    );
  };

  const resetSprites = () => {
    setSprites(
      sprites.map((sprite) => ({
        ...sprite,
        x: 0,
        y: 0,
        rotation: 0,
        animations: [],
      }))
    );
    setIsPlaying(false);
  };

  const moveAnimationToMidArea = (animation, spriteId) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        if (sprite.id === spriteId) {
          return {
            ...sprite,
            animations: [...sprite.animations, animation], // Add the new animation to the existing list
          };
        }
        return sprite;
      })
    );
  };
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans">
        <div className="h-screen overflow-hidden flex flex-row">
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar
              addAnimation={addAnimation}
              addSprite={addSprite}
              resetSprites={resetSprites}
              repeatLastAnimation={repeatLastAnimation} // Pass repeat function
            />
            <MidArea
              sprites={sprites}
           
  setSprites={setSprites}
              setActiveSprite={setActiveSprite}
              activeSprite={sprites.find((s) => s.isActive)}
              removeAnimation={removeAnimation}
              clearAnimations={clearAnimations}
              resetSprites={resetSprites} // Pass reset function to MidArea
              moveAnimationToMidArea={moveAnimationToMidArea} // Pass the function to handle dropping
            />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea
              sprites={sprites}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setSprites={setSprites}
              playAnimations={() => setIsPlaying(true)}
              stopAnimations={() => setIsPlaying(false)}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

