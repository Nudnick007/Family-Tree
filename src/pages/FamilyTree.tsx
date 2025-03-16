import React, { useState, useRef, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { familyData } from '../data/familyData';
import { FamilyMember } from '../types/family';

// Create a member card component with improved styling and fixed dimensions
const MemberCard: React.FC<{ member: FamilyMember; isSpouse?: boolean }> = ({ member, isSpouse = false }) => {
  return (
    <motion.div 
      className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col items-center w-48 h-40 ${isSpouse ? 'border-l-2 border-gray-600' : ''}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-full border-2 border-white overflow-hidden mb-2">
        <div className="w-16 h-16 flex items-center justify-center bg-gray-700 text-center p-2 text-sm rounded-full">
          {member.name.split(' ')[0]}
        </div>
      </div>
      <div className="w-full h-12 flex items-center justify-center overflow-hidden">
        <p className="font-bold text-center mb-1 text-sm break-words w-full hyphens-auto">
          {member.name}
        </p>
      </div>
    </motion.div>
  );
};

// Component for a couple (person and spouse)
const CoupleUnit: React.FC<{ member: FamilyMember }> = ({ member }) => {
  return (
    <div className="flex flex-row items-center">
      {/* Main person */}
      <MemberCard member={member} />
      
      {/* Horizontal line connecting to spouse if spouse exists */}
      {member.spouse && (
        <div className="w-4 h-px bg-gray-400"></div>
      )}
      
      {/* Spouse card if spouse exists */}
      {member.spouse && (
        <MemberCard 
          member={{ 
            id: `spouse-${member.id}`, 
            name: member.spouse, 
            img: member.spouseImg || "https://via.placeholder.com/100",
            gender: member.gender === "male" ? "female" : "male",
            children: [],
            parents: []
          }} 
          isSpouse={true} 
        />
      )}
    </div>
  );
};

// Arrow component for connecting parent to child
const Arrow: React.FC<{ multipleChildren?: boolean }> = ({ multipleChildren = false }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Vertical line part of the arrow */}
      <div className="w-px h-8 bg-gray-400"></div>
      
      {/* Arrow head */}
      <div className="relative w-3 h-3">
        <div className="absolute w-3 h-3 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
      </div>
      
      {/* Extra vertical line for multiple children */}
      {multipleChildren && <div className="w-px h-4 bg-gray-400"></div>}
    </div>
  );
};

// Horizontal connector for siblings with arrows
const SiblingConnector: React.FC<{ childrenCount: number }> = ({ childrenCount }) => {
  if (childrenCount <= 1) return null;
  
  return (
    <div className="relative w-full">
      <div className="absolute left-0 right-0 bg-gray-400 h-px"></div>
      {/* Vertical arrows for each child */}
      <div className="flex justify-around">
        {Array.from({ length: childrenCount }).map((_, index) => (
          <Arrow key={index} />
        ))}
      </div>
    </div>
  );
};

// Create a custom tree component that renders our family structure
const CustomFamilyTree: React.FC<{ rootId: string }> = ({ rootId }) => {
  // Function to get a member by ID
  const getMemberById = (id: string): FamilyMember | undefined => {
    return familyData.find(member => member.id === id);
  };

  // Function to get children of a member
  const getChildrenOfMember = (id: string): FamilyMember[] => {
    const member = getMemberById(id);
    if (!member) return [];
    
    return member.children.map(childId => getMemberById(childId)).filter(Boolean) as FamilyMember[];
  };

  // Recursive function to render a branch of the family tree
  const renderFamilyBranch = (memberId: string, level: number = 0): JSX.Element => {
    const member = getMemberById(memberId);
    if (!member) return <></>;
    
    const children = getChildrenOfMember(memberId);
    
    return (
      <div className="flex flex-col items-center" key={memberId}>
        {/* Render the current member and spouse as a couple */}
        <CoupleUnit member={member} />
        
        {/* If there are children, render them with arrows */}
        {children.length > 0 && (
          <>
            {/* Arrow connecting parent to children */}
            <Arrow multipleChildren={children.length > 1} />
            
            {/* Horizontal connector for multiple children with arrows */}
            {children.length > 1 && (
              <SiblingConnector childrenCount={children.length} />
            )}
            
            {/* Render all children */}
            <div className={`flex ${children.length > 2 ? 'flex-wrap justify-center' : 'flex-row'} gap-10 mt-4`}>
              {children.map(child => renderFamilyBranch(child.id, level + 1))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full overflow-auto py-10">
      {renderFamilyBranch(rootId)}
    </div>
  );
};

// Zoomable container component
const ZoomablePanContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle zoom in/out
  const handleZoom = (direction: 'in' | 'out') => {
    setScale(prevScale => {
      if (direction === 'in') {
        return Math.min(prevScale + 0.1, 2); // Max zoom: 2x
      } else {
        return Math.max(prevScale - 0.1, 0.5); // Min zoom: 0.5x
      }
    });
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDragPosition({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - startDragPosition.x;
      const deltaY = e.clientY - startDragPosition.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setStartDragPosition({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up event listeners for wheel zooming
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoom('in');
        } else {
          handleZoom('out');
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-gray-800 bg-opacity-70 p-2 rounded-lg">
        <button 
          onClick={() => handleZoom('in')} 
          className="w-10 h-10 bg-gray-700 rounded-full text-white flex items-center justify-center hover:bg-gray-600"
        >
          +
        </button>
        <button 
          onClick={() => handleZoom('out')} 
          className="w-10 h-10 bg-gray-700 rounded-full text-white flex items-center justify-center hover:bg-gray-600"
        >
          -
        </button>
        <button 
          onClick={() => {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          }} 
          className="w-10 h-10 bg-gray-700 rounded-full text-white flex items-center justify-center hover:bg-gray-600 text-xs"
        >
          Reset
        </button>
      </div>

      {/* Current zoom level indicator */}
      <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-70 px-3 py-1 rounded text-white text-sm">
        {Math.round(scale * 100)}%
      </div>

      {/* Zoomable and pannable container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="min-w-full min-h-full flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Main component
const FamilyTree: React.FC = () => {
  const [rootId] = useState("1");

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-900 flex flex-col">
      <h1 className="text-4xl font-bold text-white text-center py-6">Padickaparambil Family Tree</h1>
      <ZoomablePanContainer>
        <CustomFamilyTree rootId={rootId} />
      </ZoomablePanContainer>
    </div>
  );
};

export default FamilyTree;