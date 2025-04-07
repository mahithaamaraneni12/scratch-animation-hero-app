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

  const areTouching = (sprite1, sprite2) => {
    const distanceX = Math.abs(sprite1.x - sprite2.x);
    const distanceY = Math.abs(sprite1.y - sprite2.y);
    const threshold = 50;
    return distanceX < threshold && distanceY < threshold;
  };

  const handleCollisionAndSwap = (sprites) => {
    const newSprites = [...sprites];
    let heroIndex = -1;

    for (let i = 0; i < newSprites.length; i++) {
      for (let j = i + 1; j < newSprites.length; j++) {
        const a = newSprites[i];
        const b = newSprites[j];

        if (areTouching(a, b)) {
          const temp = [...a.animations];
          newSprites[i].animations = [...b.animations];
          newSprites[j].animations = temp;

          // Mark the first sprite as hero
          newSprites[i].isHero = true;
          newSprites[j].isHero = false;

          heroIndex = i;
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
      {/* <button
        className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded z-10"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "Stop" : "Play"}
      </button> */}

      {sprites.map((sprite) => (
        <div
          key={sprite.id}
          className="absolute transition-transform duration-100"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(${sprite.x}px - 50%), calc(${sprite.y}px - 50%)) rotate(${sprite.rotation}deg)`,
            filter: sprite.isHero ? "drop-shadow(0 0 10px gold)" : "none",
            zIndex: sprite.isHero ? 10 : 1,
          }}
        >
          <CatSprite />
          <div className={`text-xs text-center mt-1 ${sprite.isHero ? 'text-yellow-500 font-bold' : ''}`}>
            {sprite.name}{sprite.isHero ? ' ⭐' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}
