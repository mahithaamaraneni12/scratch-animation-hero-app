// import React from "react";
// import CatSprite from "./CatSprite";

// export default function PreviewArea() {
//   return (
//     <div className="flex-none h-full overflow-y-auto p-2">
//       <CatSprite />
//     </div>
//   );
// }
// import React, { useEffect, useRef } from "react";
// import CatSprite from "./CatSprite";

// export default function PreviewArea({ sprites, setSprites, isPlaying, setIsPlaying }) {
//   const animationRef = useRef();
//   const lastTimeRef = useRef(0);

//   useEffect(() => {
//     if (!isPlaying) {
//       cancelAnimationFrame(animationRef.current);
//       return;
//     }

//     const animate = (timestamp) => {
//       if (!lastTimeRef.current) lastTimeRef.current = timestamp;
//       const deltaTime = timestamp - lastTimeRef.current;

//       // Update at 10fps (every 100ms)
//       if (deltaTime > 100) {
//         setSprites(prevSprites => {
//           return prevSprites.map(sprite => {
//             if (sprite.animations.length === 0) return sprite;

//             const newSprite = { ...sprite };
            
//             // Process each animation in sequence
//             sprite.animations.forEach(animation => {
//               switch (animation.type) {
//                 case 'move':
//                   const radians = (newSprite.rotation * Math.PI) / 180;
//                   newSprite.x += animation.value * Math.cos(radians);
//                   newSprite.y += animation.value * Math.sin(radians);
//                   break;
//                 case 'turn':
//                   newSprite.rotation += animation.value;
//                   newSprite.rotation = newSprite.rotation % 360;
//                   break;
//                 case 'goto':
//                   newSprite.x = animation.x || 0;
//                   newSprite.y = animation.y || 0;
//                   break;
//                 default:
//                   break;
//               }
//             });

//             return newSprite;
//           });
//         });
//         lastTimeRef.current = timestamp;
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationRef.current);
//   }, [isPlaying, setSprites]);

//   return (
//     <div>
//       <button 
//         className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded z-10"
//         onClick={() => setIsPlaying(!isPlaying)}
//       >
//         {isPlaying ? "Stop" : "Play"}
//       </button>
      
//       <div className="relative w-full h-full" style={{ minHeight: '500px' }}>
//         {sprites.map(sprite => (
//           <div 
//             key={sprite.id}
//             className="absolute transition-transform duration-100"
//             style={{
//               left: '50%',
//               top: '50%',
//               transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
//             }}
//           >
//             <CatSprite />
//             <div className="text-xs text-center mt-1 bg-white bg-opacity-70 px-1 rounded">
//               {sprite.name} (Rot: {Math.round(sprite.rotation)}°)
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({
  sprites,
  setSprites,
  isPlaying,
  setIsPlaying,
}) {
  const animationRef = useRef();
  const lastTimeRef = useRef(0);

  // Detect if two sprites are "touching" (not overlapping, but close enough)
  const areTouching = (sprite1, sprite2) => {
    const distanceX = Math.abs(sprite1.x - sprite2.x);
    const distanceY = Math.abs(sprite1.y - sprite2.y);
    const threshold = 50; // You can adjust based on sprite size
    return distanceX < threshold && distanceY < threshold;
  };

  // Swap animations when they touch
  const handleCollisionAndSwap = (sprites) => {
    const newSprites = [...sprites];
    for (let i = 0; i < newSprites.length; i++) {
      for (let j = i + 1; j < newSprites.length; j++) {
        const a = newSprites[i];
        const b = newSprites[j];
        if (areTouching(a, b)) {
          const temp = [...a.animations];
          newSprites[i].animations = [...b.animations];
          newSprites[j].animations = temp;
        }
      }
    }
    return newSprites;
  };

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;

      if (deltaTime > 100) {
        setSprites((prevSprites) => {
          let updatedSprites = prevSprites.map((sprite) => {
            if (sprite.animations.length === 0) return sprite;
            const newSprite = { ...sprite };

            sprite.animations.forEach((animation) => {
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
                default:
                  break;
              }
            });

            newSprite.animations = [];
            return newSprite;
          });

          // Swap animations if any two touch
          updatedSprites = handleCollisionAndSwap(updatedSprites);
          return updatedSprites;
        });

        lastTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, setSprites]);

  return (
    <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
      <button
        className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded z-10"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>

      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className="absolute transition-transform duration-100"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
          }}
        >
          <CatSprite />
          <div className="text-xs text-center mt-1">{sprite.name}</div>
        </div>
      ))}
    </div>
  );
}
