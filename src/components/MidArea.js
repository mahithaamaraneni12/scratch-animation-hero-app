
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
      
      if (activeSprite) {
        moveAnimationToMidArea(item.action, activeSprite.id); 
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

    
      {isOver && (
        <div className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded-full">
          <span className="font-semibold">Play</span>
        </div>
      )}
    </div>
  );
}








