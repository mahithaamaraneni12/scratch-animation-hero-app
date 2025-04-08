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
// App.js
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
      say: "",
    },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastAnimation, setLastAnimation] = useState(null);

  const addSprite = () => {
    const newSprite = {
      id: Date.now(),
      name: `Cat ${sprites.length + 1}`,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      rotation: 0,
      animations: [],
      isActive: false,
      say: "",
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
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        if (sprite.isActive) {
          const newSprite = { ...sprite };

          switch (animation.type) {
            case "move":
              const radians = (newSprite.rotation * Math.PI) / 180;
              newSprite.x += animation.value * Math.cos(radians);
              newSprite.y += animation.value * Math.sin(radians);
              break;
            case "turn":
              newSprite.rotation += animation.value;
              newSprite.rotation %= 360;
              break;
            case "goto":
              if (animation.random) {
                newSprite.x = Math.random() * 400 - 200;
                newSprite.y = Math.random() * 400 - 200;
              } else {
                newSprite.x = animation.x || 0;
                newSprite.y = animation.y || 0;
              }
              break;
            case "say":
              newSprite.say = animation.text;
              if (animation.duration) {
                setTimeout(() => {
                  setSprites((spritesAfterDelay) =>
                    spritesAfterDelay.map((s) =>
                      s.id === sprite.id ? { ...s, say: "" } : s
                    )
                  );
                }, animation.duration * 1000);
              }
              break;
            default:
              break;
          }

          newSprite.animations = [
            ...newSprite.animations,
            { ...animation, id: Date.now() },
          ];
          return newSprite;
        }
        return sprite;
      })
    );

    setLastAnimation(animation);
  };

  const repeatLastAnimation = () => {
    if (lastAnimation) {
      addAnimation(lastAnimation);
    }
  };

  const removeAnimation = (spriteId, animationId) => {
    setSprites((prevSprites) =>
      prevSprites.map((sprite) => {
        if (sprite.id === spriteId) {
          const updatedAnimations = sprite.animations.filter(
            (anim) => anim.id !== animationId
          );

          let newSprite = {
            ...sprite,
            x: 0,
            y: 0,
            rotation: 0,
            animations: updatedAnimations,
            say: "",
          };

          updatedAnimations.forEach((anim) => {
            if (anim.type === "move") {
              const radians = (newSprite.rotation * Math.PI) / 180;
              newSprite.x += anim.value * Math.cos(radians);
              newSprite.y += anim.value * Math.sin(radians);
            } else if (anim.type === "turn") {
              newSprite.rotation += anim.value;
            } else if (anim.type === "goto") {
              newSprite.x = anim.x;
              newSprite.y = anim.y;
            } else if (anim.type === "say") {
              newSprite.say = anim.text;
              if (anim.duration) {
                setTimeout(() => {
                  setSprites((spritesAfterDelay) =>
                    spritesAfterDelay.map((s) =>
                      s.id === sprite.id ? { ...s, say: "" } : s
                    )
                  );
                }, anim.duration * 1000);
              }
            }
          });

          return newSprite;
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
            x: 0,
            y: 0,
            rotation: 0,
            say: "",
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
        say: "",
        currentAnimationIndex: 0,
        isHero: false,
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
            animations: [...sprite.animations, animation],
          };
        }
        return sprite;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-blue-100 pt-6 font-sans min-h-screen overflow-auto">
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-auto bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar
              addAnimation={addAnimation}
              addSprite={addSprite}
              resetSprites={resetSprites}
              repeatLastAnimation={repeatLastAnimation}
            />
            <div className="flex-1 overflow-y-auto">
              <MidArea
                sprites={sprites}
                setSprites={setSprites}
                setActiveSprite={setActiveSprite}
                activeSprite={sprites.find((s) => s.isActive)}
                removeAnimation={removeAnimation}
                clearAnimations={clearAnimations}
                resetSprites={resetSprites}
                moveAnimationToMidArea={moveAnimationToMidArea}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-auto bg-white border-t border-l border-gray-200 rounded-tl-xl ml-0 md:ml-2">
            <PreviewArea
              sprites={sprites}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setSprites={setSprites}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
}





