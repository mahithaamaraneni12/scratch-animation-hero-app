import React, { useEffect } from "react";
import Icon from "./Icon";


const detectTouch = (sprite1, sprite2) => {
  const distanceX = Math.abs(sprite1.x - sprite2.x);
  const distanceY = Math.abs(sprite1.y - sprite2.y);
  const threshold = 50;
  return distanceX < threshold && distanceY < threshold;
};


const swapAnimationsOnTouch = (sprite1, sprite2, setSprites, sprites) => {
  setSprites(
    sprites.map((sprite) => {
      if (sprite.id === sprite1.id) {
        return { ...sprite, animations: sprite2.animations };
      }
      if (sprite.id === sprite2.id) {
        return { ...sprite, animations: sprite1.animations };
      }
      return sprite;
    })
  );
};

export default function MidArea({
  sprites,
  setActiveSprite,
  activeSprite,
  removeAnimation,
  clearAnimations,
  resetSprites,
  setSprites,
}) {
  
  if (!sprites || sprites.length === 0) {
    return <div>No sprites available</div>;
  }

 
  useEffect(() => {
    
    for (let i = 0; i < sprites.length; i++) {
      for (let j = i + 1; j < sprites.length; j++) {
        const sprite1 = sprites[i];
        const sprite2 = sprites[j];
        
        if (detectTouch(sprite1, sprite2)) {
         
          swapAnimationsOnTouch(sprite1, sprite2, setSprites, sprites);
        }
      }
    }
  }, [sprites]); 

  return (
    <div className="flex-1 h-full overflow-auto p-4 relative">
      <div className="mb-4">
        <h2 className="font-bold mb-2">Sprites</h2>
        <div className="flex flex-wrap">
          {sprites.map((sprite, index) => (
            <div
              key={sprite.id}
              className={`m-1 p-2 rounded cursor-pointer ${
                sprite.isActive ? "bg-blue-200" : "bg-gray-200"
              }`}
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
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        onClick={resetSprites} 
        className="bg-green-500 text-white hover:bg-green-600 rounded-full p-3 w-10 h-10 flex items-center justify-center absolute top-0 right-0 mt-4 mr-4"
      >
        <img
          src="https://scratch.mit.edu/static/blocks-media/default/rotate-right.svg"
          alt="Rotate Right"
          className="w-6 h-6 text-white"
        />
      </button>
    </div>
  );
}





