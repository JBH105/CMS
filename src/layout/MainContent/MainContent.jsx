import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="flex-1 overflow-y-auto relative">
      <div className="max-w-full mx-auto">
        {children}
      </div>
    </main>
  );
};

export default MainContent;