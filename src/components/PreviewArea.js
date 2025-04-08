// import React, { useEffect, useRef } from "react";
// import CatSprite from "./CatSprite";

// export default function PreviewArea({
//   sprites,
//   setSprites,
//   isPlaying,
//   setIsPlaying,
// }) {
//   const animationRef = useRef();
//   const lastTimeRef = useRef(0);

//   const areTouching = (sprite1, sprite2) => {
//     const distanceX = Math.abs(sprite1.x - sprite2.x);
//     const distanceY = Math.abs(sprite1.y - sprite2.y);
//     const threshold = 50;
//     return distanceX < threshold && distanceY < threshold;
//   };

//   const handleCollisionAndSwap = (sprites) => {
//     const newSprites = [...sprites];
//     let heroIndex = -1;

//     for (let i = 0; i < newSprites.length; i++) {
//       for (let j = i + 1; j < newSprites.length; j++) {
//         const a = newSprites[i];
//         const b = newSprites[j];

//         if (areTouching(a, b)) {
//           const temp = [...a.animations];
//           newSprites[i].animations = [...b.animations];
//           newSprites[j].animations = temp;

//           // Mark the first sprite as hero
//           newSprites[i].isHero = true;
//           newSprites[j].isHero = false;

//           heroIndex = i;
//         }
//       }
//     }

//     return newSprites.map((s, idx) => ({
//       ...s,
//       isHero: idx === heroIndex,
//     }));
//   };

//   useEffect(() => {
//     if (!isPlaying) {
//       cancelAnimationFrame(animationRef.current);
//       return;
//     }

//     const animate = (timestamp) => {
//       if (!lastTimeRef.current) lastTimeRef.current = timestamp;
//       const deltaTime = timestamp - lastTimeRef.current;

//       if (deltaTime > 100) {
//         setSprites((prevSprites) => {
//           let updatedSprites = prevSprites.map((sprite) => {
//             if (sprite.animations.length === 0) return sprite;
//             const newSprite = { ...sprite };

//             sprite.animations.forEach((animation) => {
//               switch (animation.type) {
//                 case "move":
//                   const radians = (newSprite.rotation * Math.PI) / 180;
//                   newSprite.x += animation.value * Math.cos(radians);
//                   newSprite.y += animation.value * Math.sin(radians);
//                   break;
//                 case "turn":
//                   newSprite.rotation += animation.value;
//                   newSprite.rotation %= 360;
//                   break;
//                 case "goto":
//                   newSprite.x = animation.x || 0;
//                   newSprite.y = animation.y || 0;
//                   break;
//                 default:
//                   break;
//               }
//             });

//             newSprite.animations = [];
//             return newSprite;
//           });

//           updatedSprites = handleCollisionAndSwap(updatedSprites);
//           return updatedSprites;
//         });

//         lastTimeRef.current = timestamp;
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationRef.current);
//   }, [isPlaying, setSprites]);

//   return (
//     <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
//       {/* <button
//         className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded z-10"
//         onClick={() => setIsPlaying(!isPlaying)}
//       >
//         {isPlaying ? "Stop" : "Play"}
//       </button> */}

//       {sprites.map((sprite) => (
//         <div
//           key={sprite.id}
//           className="absolute transition-transform duration-100"
//           style={{
//             left: "50%",
//             top: "50%",
//             transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
//             filter: sprite.isHero ? "drop-shadow(0 0 10px gold)" : "none",
//             zIndex: sprite.isHero ? 10 : 1,
//           }}
//         >
//           <CatSprite />
//           <div className={`text-xs text-center mt-1 ${sprite.isHero ? 'text-yellow-500 font-bold' : ''}`}>
//             {sprite.name}{sprite.isHero ? ' ⭐' : ''}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// import React, { useEffect, useRef } from "react";
// import CatSprite from "./CatSprite";

// export default function PreviewArea({
//   sprites,
//   setSprites,
//   isPlaying,
//   setIsPlaying,
// }) {
//   const animationRef = useRef();
//   const lastTimeRef = useRef(0);

//   const areTouching = (sprite1, sprite2) => {
//     const distanceX = Math.abs(sprite1.x - sprite2.x);
//     const distanceY = Math.abs(sprite1.y - sprite2.y);
//     const threshold = 50;
//     return distanceX < threshold && distanceY < threshold;
//   };

//   const handleCollisionAndSwap = (sprites) => {
//     const newSprites = [...sprites];
//     let heroIndex = -1;

//     for (let i = 0; i < newSprites.length; i++) {
//       for (let j = i + 1; j < newSprites.length; j++) {
//         const a = newSprites[i];
//         const b = newSprites[j];

//         if (areTouching(a, b)) {
//           const temp = [...a.animations];
//           newSprites[i].animations = [...b.animations];
//           newSprites[j].animations = temp;

//           // Mark the first sprite as hero
//           newSprites[i].isHero = true;
//           newSprites[j].isHero = false;

//           heroIndex = i;
//         }
//       }
//     }

//     return newSprites.map((s, idx) => ({
//       ...s,
//       isHero: idx === heroIndex,
//     }));
//   };

//   useEffect(() => {
//     if (!isPlaying) {
//       cancelAnimationFrame(animationRef.current);
//       return;
//     }

//     const animate = (timestamp) => {
//       if (!lastTimeRef.current) lastTimeRef.current = timestamp;
//       const deltaTime = timestamp - lastTimeRef.current;

//       if (deltaTime > 100) {
//         setSprites((prevSprites) => {
//           let updatedSprites = prevSprites.map((sprite) => {
//             if (sprite.animations.length === 0) return sprite;
//             const newSprite = { ...sprite };

//             sprite.animations.forEach((animation) => {
//               switch (animation.type) {
//                 case "move":
//                   const radians = (newSprite.rotation * Math.PI) / 180;
//                   newSprite.x += animation.value * Math.cos(radians);
//                   newSprite.y += animation.value * Math.sin(radians);
//                   break;
//                 case "turn":
//                   newSprite.rotation += animation.value;
//                   newSprite.rotation %= 360;
//                   break;
//                 case "goto":
//                   newSprite.x = animation.x || 0;
//                   newSprite.y = animation.y || 0;
//                   break;
//                 default:
//                   break;
//               }
//             });

//             newSprite.animations = [];
//             return newSprite;
//           });

//           updatedSprites = handleCollisionAndSwap(updatedSprites);
//           return updatedSprites;
//         });

//         lastTimeRef.current = timestamp;
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationRef.current);
//   }, [isPlaying, setSprites]);

//   return (
//     <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
//       {sprites.map((sprite) => (
//         <div
//           key={sprite.id}
//           className="absolute transition-transform duration-100 text-center"
//           style={{
//             left: "50%",
//             top: "50%",
//             transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
//             zIndex: sprite.isHero ? 10 : 1,
//             filter: sprite.isHero ? "drop-shadow(0 0 10px gold)" : "none",
//           }}
//         >
//           {/* Say bubble */}
//           {sprite.say && (
//             <div className="bg-white border border-gray-400 px-2 py-1 rounded shadow text-sm mb-1 text-black">
//               {sprite.say}
//             </div>
//           )}

//           <CatSprite />

//           <div
//             className={`text-xs mt-1 ${
//               sprite.isHero ? "text-yellow-500 font-bold" : ""
//             }`}
//           >
//             {sprite.name}
//             {sprite.isHero ? " ⭐" : ""}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";
import CatSprite from "./CatSprite";

const SPRITE_SIZE = 80; // Sprite is roughly 80x80px
const TOUCH_DISTANCE = SPRITE_SIZE;

export default function PreviewArea({
  sprites,
  setSprites,
  isPlaying,
  setIsPlaying,
}) {
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  // const areTouching = (a, b) => {
  //   const dx = a.x - b.x;
  //   const dy = a.y - b.y;
  //   const distance = Math.sqrt(dx * dx + dy * dy);
  //   return distance < TOUCH_DISTANCE;
  // };
  const areTouching = (a, b) => {
    const size = SPRITE_SIZE;
  
    const aLeft = a.x - size / 2;
    const aRight = a.x + size / 2;
    const aTop = a.y - size / 2;
    const aBottom = a.y + size / 2;
  
    const bLeft = b.x - size / 2;
    const bRight = b.x + size / 2;
    const bTop = b.y - size / 2;
    const bBottom = b.y + size / 2;
  
    const isOverlap =
      aLeft < bRight &&
      aRight > bLeft &&
      aTop < bBottom &&
      aBottom > bTop;
  
    return isOverlap;
  };
  
  const handleCollisionAndSwap = (sprites) => {
    const newSprites = [...sprites];
    let heroIndex = -1;
    const touchedIds = new Set();

    for (let i = 0; i < newSprites.length; i++) {
      for (let j = i + 1; j < newSprites.length; j++) {
        const a = newSprites[i];
        const b = newSprites[j];

        if (areTouching(a, b)) {
          // Swap animations
          const temp = [...a.animations];
          newSprites[i].animations = [...b.animations];
          newSprites[j].animations = temp;

          // Mark one as hero
          newSprites[i].isHero = true;
          newSprites[j].isHero = false;
          heroIndex = i;

          // Show "Swapped!"
          newSprites[i].swapped = true;
          newSprites[j].swapped = true;
          touchedIds.add(a.id);
          touchedIds.add(b.id);

          setTimeout(() => {
            setSprites((prev) =>
              prev.map((s) =>
                touchedIds.has(s.id) ? { ...s, swapped: false } : s
              )
            );
          }, 2000);
        }
      }
    }

    return newSprites.map((s, idx) => ({
      ...s,
      isHero: idx === heroIndex,
    }));
  };

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;

      if (deltaTime > 300) {
        setSprites((prevSprites) => {
          let updatedSprites = prevSprites.map((sprite) => {
            const newSprite = { ...sprite };
            const currentIndex = newSprite.currentAnimationIndex || 0;
            const animations = newSprite.animations;

            if (currentIndex < animations.length) {
              const animation = animations[currentIndex];

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
                  newSprite.x = animation.x || 0;
                  newSprite.y = animation.y || 0;
                  break;
                case "say":
                  newSprite.say = animation.text;
                  if (animation.duration) {
                    setTimeout(() => {
                      setSprites((prev) =>
                        prev.map((s) =>
                          s.id === newSprite.id ? { ...s, say: "" } : s
                        )
                      );
                    }, animation.duration * 1000);
                  }
                  break;
                default:
                  break;
              }

              newSprite.currentAnimationIndex = currentIndex + 1;
            }

            return newSprite;
          });

          // Detect & swap if touching
          updatedSprites = handleCollisionAndSwap(updatedSprites);

          const allDone = updatedSprites.every(
            (sprite) =>
              (sprite.currentAnimationIndex || 0) >= sprite.animations.length
          );

          if (allDone) setIsPlaying(false);

          return updatedSprites;
        });

        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, setSprites, setIsPlaying]);

  return (
    <div
      className="relative w-full h-full bg-gray-100 p-4"
      style={{ minHeight: "500px" }}
    >
      {/* Play Button */}
      <div className="absolute top-2 right-4 z-20">
        <button
          onClick={() => setIsPlaying(true)}
          disabled={isPlaying}
          className={`px-4 py-2 rounded text-white ${
            isPlaying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          ▶️ Play All Animations
        </button>
      </div>

      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className="absolute transition-transform duration-200 text-center"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
            zIndex: sprite.isHero ? 10 : 1,
            filter: sprite.isHero ? "drop-shadow(0 0 10px gold)" : "none",
          }}
        >
          {sprite.swapped && (
            <div className="bg-yellow-300 border border-yellow-600 px-2 py-1 rounded shadow text-xs font-semibold mb-1 text-black animate-pulse">
              Swapped!
            </div>
          )}
          {sprite.say && (
            <div className="bg-white border border-gray-400 px-2 py-1 rounded shadow text-sm mb-1 text-black">
              {sprite.say}
            </div>
          )}
          <CatSprite />
          <div
            className={`text-xs mt-1 ${
              sprite.isHero ? "text-yellow-500 font-bold" : ""
            }`}
          >
            {sprite.name}
            {sprite.isHero ? " ⭐" : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
