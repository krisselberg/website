import { CSSProperties } from "react";

interface PokeballProps {
  isOpen?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export default function Pokeball({ isOpen = false, onClick, isSelected = false, className = "" }: PokeballProps) {
  return (
    <div 
      className={`pokeball-container ${className}`}
      onClick={onClick}
      style={{
        "--rotation": isOpen ? "-45deg" : "0deg",
        "--top-translate": isOpen ? "-25px" : "0px",
      } as CSSProperties}
    >
      <div className="pokeball">
        <div className="pokeball-base">
          <div className="pokeball-bottom" />
          <div className="pokeball-center">
            <div className="pokeball-button" />
          </div>
        </div>
        <div className="pokeball-top" />
      </div>
      
      <style jsx>{`
        .pokeball-container {
          position: relative;
          width: 96px;
          height: 96px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        
        .pokeball-container:hover {
          transform: scale(1.1);
        }
        
        .pokeball {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          background: transparent;
        }
        
        .pokeball-base {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .pokeball-top {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(to bottom, #ff6b6b 0%, #ee5a52 80%, #d44444 100%);
          border-radius: 50%;
          border: 2px solid #2c2c2c;
          box-sizing: border-box;
          clip-path: polygon(0 0, 100% 0, 100% 44%, 0 44%);
          transform-origin: bottom center;
          transform: translateY(var(--top-translate)) rotateX(var(--rotation));
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          z-index: 3;
        }
        
        .pokeball-top::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 15px;
          width: 30px;
          height: 30px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          filter: blur(10px);
        }
        
        .pokeball-bottom {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(to top, #e0e0e0 0%, #f0f0f0 80%, #ffffff 100%);
          border-radius: 50%;
          border: 2px solid #2c2c2c;
          box-sizing: border-box;
          clip-path: polygon(0 56%, 100% 56%, 100% 100%, 0 100%);
        }
        
        .pokeball-center {
          position: absolute;
          top: 50%;
          left: -3px;
          right: -3px;
          height: 12px;
          background: #2c2c2c;
          transform: translateY(-50%);
          z-index: 5;
        }
        
        .pokeball-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 24px;
          height: 24px;
          background: #f0f0f0;
          border: 4px solid #2c2c2c;
          border-radius: 50%;
          z-index: 15;
          transition: all 0.3s ease;
        }
        
        .pokeball-button::before {
          content: '';
          position: absolute;
          top: 4px;
          left: 4px;
          width: 8px;
          height: 8px;
          background: #7f8c8d;
          border-radius: 50%;
        }
        
        .pokeball-button::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 4px;
          height: 4px;
          background: #ffffff;
          border-radius: 50%;
        }
        
        ${isSelected ? `
          .pokeball {
            animation: shake 0.5s ease-in-out;
          }
          
          .pokeball-button {
            background: #ff6b6b;
            box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
        ` : ''}
        
        ${isOpen ? `
          .pokeball-center {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
        ` : ''}
      `}</style>
    </div>
  );
}